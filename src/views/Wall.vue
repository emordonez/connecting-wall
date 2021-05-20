<template>
  <div class="max-w-screen-xl bg-hero-floating-cogs">
    <div class="flex flex-col w-11/12 py-3 mx-auto sm:py-6">
      <ConnectingWall :completed="completed" :groups="groups" @solvedWall="solvedWall" />
      <h2 v-if="completed" class="my-6 text-white text-2xl text-center">
        You solved the wall! What are the connections?
      </h2>
      <Timer v-else :completed="completed" class="my-6" />
    </div>
  </div>
</template>

<script>
import data from '@/assets/data.json'
import ConnectingWall from '@/components/ConnectingWall.vue'
import Timer from '@/components/Timer.vue'

export default {
  props: {
    id: String
  },
  components: {
    ConnectingWall,
    Timer
  },
  data () {
    return {
      completed: false
    }
  },
  beforeRouteLeave (to, from, next) {
    if (!this.completed) {
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
    solvedWall (isSolved) {
      this.completed = isSolved
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
