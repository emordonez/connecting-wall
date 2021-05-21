<template>
  <div class="flex justify-center items-center max-w-screen-xl bg-hero-floating-cogs">
    <!-- TODO: Modal transitions -->
    <Modal
      v-if="!started && showModal"
      :title="'Ready?'"
      :content="'You\'ll have three minutes to solve the wall. ' +
        'Click to select or unselect items, looking for four groups of four connected items. ' +
        'Beware of red herrings!'
      "
      :buttonText="'Begin'"
      @toggleModal="toggleModal"
    />
    <Modal 
      v-if="outOfTime && showModal"
      :title="'You ran out of time!'"
      :content="'You can see the solution and still get points for the connections of the groups ' +
        'you didn\'t find.'"
      :buttonText="'Continue'"
      @toggleModal="toggleModal"
    />
    <div
      class="relative flex flex-col w-11/12 py-3 mx-auto sm:py-6"
      :class="showModal ? 'filter blur' : 'filter-none'"
    >
      <ConnectingWall
        ref="wall"
        :completed="completed"
        :groups="groups"
        :outOfTime="outOfTime"
        @solvedWall="solvedWall"
      />
      <h2 v-if="completed" class="my-6 text-white text-2xl text-center">
        You solved the wall! What are the connections?
      </h2>
      <h2 v-if="outOfTime" class="my-6 text-white text-2xl text-center">
        What are the connections?
      </h2>
      <Timer
        v-else
        :timeLimit="timeLimit"
        :started="started"
        :completed="completed"
        class="my-6"
      />
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
      timeLimit: 3,
      started: false,
      completed: false,
      outOfTime: false,
      showModal: true
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
    groups () {
      for (let i = 0; i < data.length; i++) {
        // Prop comes in cast as a String
        if (data[i].id === Number(this.id)) {
          return data[i].groups
        }
      }

      // Default wall
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
    }
  },  
  methods: {
    checkIfSolved () {
      if (!this.completed) {
        this.outOfTime = true
        this.showModal = true
      }
    },
    solvedWall (isSolved) {
      this.completed = isSolved
      this.checkIfSolved()
    },
    toggleModal () {
      this.showModal = !this.showModal
      if (!this.started) {
        this.started = true
        setTimeout(this.checkIfSolved, this.timeLimit * 1000)
      }
      if (this.outOfTime) {
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
