<template>
  <div class="max-w-screen-lg bg-gray-800 text-white">
    <h1 class="p-6 font-medium text-4xl">
      The Connecting Wall
    </h1>
    <div class="p-6 text-lg">
      <p class="py-3">
        Inspired by the connecting wall round from the BBC quiz show <i>Only Connect</i>.
        To solve the wall, you must find what uniquely connects 16 seemingly unconnected items.
      </p>
      <p class="py-3">
        Try out some of these walls from the show (Series 11):
      </p>
      <ul v-for="wall in walls" :key="wall.id" class="list-disc list-inside">
        <li class="py-1 ml-6">
          <RouterLink :to="{ name: 'Wall', params: { id: wall.id } }" class="text-blue-200 underline">
            Wall {{ wall.id }}
          </RouterLink>
        </li>
      </ul>
      <p class="py-3">
        You can also create your own walls
        <RouterLink :to="{ name: 'Editor' }" class="text-blue-200 underline"> here</RouterLink>.
      </p>
    </div>
  </div>
</template>

<script>
import walls from '@/assets/data.json'

export default {
  data () {
    return {
      walls
    }
  }
}
</script>
