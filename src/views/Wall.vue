<template>
  <div class="flex flex-col justify-center items-center max-w-screen-xl bg-hero-floating-cogs">
    <transition-group name="swipe">
      <!-- Start modal, begins the game -->
      <Modal
        v-if="!started && showModal"
        :title="'Ready?'"
        :content="['You have three minutes to solve the wall. Click to select or unselect items.',
          'Look for four groups of four connected items. Beware of red herrings!',
          'After finding two groups, you have three strkes to identify the other two.'
        ]"
        :buttonText="'Begin'"
        @toggleModal="toggleModal"
      />
      <!-- Game over modal, out of time -->
      <Modal 
        v-if="outOfTime && showModal"
        :title="'You ran out of time!'"
        :content="'You can now see the solution and try to identify the remaining connections.'"
        :buttonText="'Continue'"
        @toggleModal="toggleModal"
      />
      <!-- Game over modal, three strikes -->
      <Modal
        v-if="strikesRemaining === 0 && showModal"
        :title="'Three strikes!'"
        :content="'The wall has frozen! But you can now see the remaining two groups.'"
        :buttonText="'Continue'"
        @toggleModal="toggleModal"
      />
    </transition-group>
    <div
      class="relative flex flex-col-reverse w-full py-3 mx-auto sm:flex-col sm:w-11/12 sm:py-6"
      :class="showModal ? 'filter blur' : 'filter-none'"
    >
      <ConnectingWall
        ref="wall"
        :groups="groups"
        :completed="completed"
        :outOfTime="outOfTime"
        @checkIfSolved="checkIfSolved"
        @twoGroupsRemaining="twoGroupsRemaining = true"
        @decrementStrikes="strikesRemaining--"
      />
      <div v-if="finished" class="p-3 border rounded-md mt-3 mb-8 bg-black border-blue-200 select-none sm:my-6">
        <h2 class="text-white text-xl text-center sm:text-2xl">
          {{ message }}
        </h2>
      </div>
      <div v-else class="flex flex-row justify-center items-center mt-3 mb-8 sm:my-6">
        <div
          class="flex flex-row justify-evenly w-1/3 sm:w-1/4"
          :class="twoGroupsRemaining ? 'block' : 'invisible'"
        >
          <span v-for="strike in strikesRemaining" :key="strike" class="dot" />
        </div>
        <Timer
          :timeLimit="timeLimit"
          :started="started"
          :completed="completed"
          class="w-2/3 sm:w-3/4"
        />
      </div>
    </div>
  </div>
</template>

<script>
import data from '@/assets/data.json'
import ConnectingWall from '@/components/ConnectingWall.vue'
import Modal from '@/components/Modal.vue'
import Timer from '@/components/Timer.vue'

export default {
  props: {
    id: String
  },
  components: {
    ConnectingWall,
    Modal,
    Timer
  },
  data () {
    return {
      // timeLimit is in seconds
      timeLimit: 180,
      // timer is a setTimeout to be cleared if the wall is solved in time
      timer: null,
      started: false,
      completed: false,
      outOfTime: false,
      twoGroupsRemaining: false,
      strikesRemaining: 3,
      // Start modal shows at load to begin the game
      showModal: true,
      sounds: {
        ocFlurry: new Audio(require('@/assets/sounds/ocFlurry.mp3')),
        timeUp: new Audio(require('@/assets/sounds/timeUp.mp3'))
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (!this.completed && !this.outOfTime) {
      const answer = window.confirm('You haven\'t solved the wall yet! Are you sure you want to leave?')
      if (answer) {
        next()
      } else {
        next(false)
      }
    }
    next()
  },
  computed: {
    finished () {
      return this.completed || this.outOfTime || this.strikesRemaining === 0
    },
    groups () {
      // If receiving encoded wall
      if (isNaN(this.id)) {
        let groups = []
        let json = JSON.parse(window.atob(this.id))
        json.forEach((group, index) => {
          groups.push({
            "id": index + 1,
            "connection": group.c,
            "clues": group.cs
          })
        })
        return groups
      }
      // If receiving id of saved wall
      else {
        for (let i = 0; i < data.length; i++) {
          // Prop comes in cast as a String
          if (data[i].id === Number(this.id)) {
            return data[i].groups
          }
        }
      }
      // Default wall if saved wall not found
      return [
        {
          "id": 1,
          "connection": "End with a silent letter",
          "clues": ["Crumb", "Autumn", "Coup", "Debris"]
        },
        {
          "id": 2,
          "connection": "Pork products",
          "clues": ["Lechon", "Prosciutto", "Bacon", "Speck"]
        },
        {
          "id": 3,
          "connection": "Small amount",
          "clues": ["Smidgen", "Trace", "Iota", "Morsel"]
        },
        {
          "id": 4,
          "connection": "Terms in backgammon",
          "clues": ["Anchor", "Bear off", "Pip", "Gammon"]
        }
      ]
    },
    message () {
      if (this.completed) {
        return 'You solved the wall! What are the connections?'
      }
      return 'What are the connections of the groups you didn\'t find?'
    }
  },  
  methods: {
    checkIfSolved (inTime) {
      clearTimeout(this.timer)
      if (!inTime) {
        this.sounds.timeUp.play()
        this.outOfTime = true
        this.showModal = true
      } else if (this.strikesRemaining === 0) {
        this.showModal = true
      } else {
        this.sounds.ocFlurry.play()
        this.completed = true
      }
    },
    toggleModal () {
      this.showModal = !this.showModal
      // Start modal, begins the game
      if (!this.started) {
        this.started = true
        this.timer = setTimeout(() => {
          this.checkIfSolved(this.completed)
        }, this.timeLimit * 1000)
      }
      // Game over modal, resolves the wall
      if (this.outOfTime || this.strikesRemaining === 0) {
        setTimeout(this.$refs.wall.resolveWall, 1000)
      }
    }
  },
  watch: {
    // Hack to force reload the router view
    // TODO: Handle to/from edge cases
    $route (to, from) {
      if (to !== from) {
        location.reload()
      }
    }
  }
}
</script>

<style scoped>
.swipe-enter-active,
.swipe-leave-active {
  transition: transform 0.3s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.3s linear;
}

.swipe-enter,
.swipe-leave-to {
  transform: translateY(-75%);
  opacity: 0;
}
</style>
