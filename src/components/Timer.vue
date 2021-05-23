<template>
  <div class="h-6 w-full rounded-lg bg-blue-200 sm:h-8">
    <div
      class="time-bar rounded-lg"
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
  background: linear-gradient(to bottom, #2563EB, #1E40AF);
  animation: roundtime calc(var(--duration) * 1s) linear forwards;
  transform-origin: left center;
}

@keyframes roundtime {
  to {
    transform: scaleX(0);
  }
}
</style>
