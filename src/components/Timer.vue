<template>
  <div class="h-6 w-full rounded-md bg-blue-200 sm:h-8">
    <div
      class="time-bar rounded-md"
      data-style="smooth"
      :style="inProgress ? `--duration: ${timeLimit};` : ''"
    />
  </div>
</template>

<script>
export default {
  props: {
    // timeLimit is in seconds
    timeLimit: Number,
    started: Boolean,
    completed: Boolean
  },
  computed: {
    // Avoids directly mutating the game progress props
    inProgress () {
      return !this.completed && this.started
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
