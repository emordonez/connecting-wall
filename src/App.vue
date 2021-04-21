<template>
  <div class="max-w-screen-xl p-6 mx-auto bg-black">
    <Wall />
  </div>
</template>

<script>
import Wall from './components/TheWall.vue'

export default {
  name: 'App',
  components: {
    Wall
  }
}
</script>
