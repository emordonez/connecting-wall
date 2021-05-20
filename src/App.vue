<template>
  <div class="flex flex-col justify-between min-h-screen min-w-full bg-black">
    <Header />
    <RouterView :key="$route.fullPath" class="flex-grow w-full p-6 mx-auto" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>
