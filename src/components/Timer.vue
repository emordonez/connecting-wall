<template>
  <div class="h-8 w-full rounded-md bg-blue-200">
    <div
      class="time-bar rounded-md"
      data-style="smooth"
      :style="inProgress ? `--duration: ${limit};` : '--duration: 0;'"
    />
  </div>
</template>

<script>
export default {
  props: {
    completed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      // Time limit in seconds
      limit: 180
    }
  },
  computed: {
    // Avoids directly mutating the prop
    inProgress () {
      return !this.completed
    }
  }
}
</script>

<style scoped>
.time-bar[data-style="smooth"] {
  overflow: hidden;
  height: inherit;
  width: inhert;
  background: linear-gradient(to bottom, blue, #000099);
  animation: roundtime calc(var(--duration) * 1s) linear forwards;
  transform-origin: left center;
}

@keyframes roundtime {
  to {
    transform: scaleX(0);
  }
}
</style>
