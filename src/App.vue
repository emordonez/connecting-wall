<template>
  <div class="flex flex-col-reverse justify-between min-h-screen min-w-full bg-black sm:flex-col">
    <Header />
    <RouterView :key="$route.fullPath" class="flex-grow w-full p-3 mx-auto sm:p-6" />
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
