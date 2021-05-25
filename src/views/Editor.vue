<template>
  <div class="max-w-screen-lg bg-gray-800 text-white">
    <div class="content">
      <h1>
        Question Editor
      </h1>
      <p>
        Coming soon: Create your own walls!
      </p>
    </div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-5">
      <!-- Group 1 -->
      <div v-for="i in 4" :key="i">
        <input
          v-model="groups[0].clues[i - 1]"
          :placeholder="`Clue ${i}`"
          required
          class="w-full p-3 border-2 rounded group-1"
        >
      </div>
      <input
        v-model="groups[0].connection"
        placeholder="Link 1"
        required
        class="w-full p-3 border-2 rounded group-1 bg-black"
      >
      <!-- Group 2 -->
      <div v-for="i in 4" :key="i">
        <input
          v-model="groups[1].clues[i - 1]"
          :placeholder="`Clue ${i}`"
          required
          class="w-full p-3 border-2 rounded group-2"
        >
      </div>
      <input
        v-model="groups[1].connection"
        placeholder="Link 2"
        required
        class="w-full p-3 border-2 rounded group-2 bg-black"
      >
      <!-- Group 3 -->
      <div v-for="i in 4" :key="i">
        <input
          v-model="groups[2].clues[i - 1]"
          :placeholder="`Clue ${i}`"
          required
          class="w-full p-3 border-2 rounded group-3"
        >
      </div>
      <input
        v-model="groups[2].connection"
        placeholder="Link 1"
        required
        class="w-full p-3 border-2 rounded group-3 bg-black"
      >
      <!-- Group 4 -->
      <div v-for="i in 4" :key="i">
        <input
          v-model="groups[3].clues[i - 1]"
          :placeholder="`Clue ${i}`"
          required
          class="w-full p-3 border-2 rounded group-4"
        >
      </div>
      <input
        v-model="groups[3].connection"
        placeholder="Link 1"
        required
        class="w-full p-3 border-2 rounded group-4 bg-black"
      >
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      groups: [
        {
          "id": 1,
          "connection": "",
          "clues": [],
        },
        {
          "id": 2,
          "connection": "",
          "clues": [],
        },
        {
          "id": 3,
          "connection": "",
          "clues": [],
        },
        {
          "id": 4,
          "connection": "",
          "clues": [],
        }                        
      ]
    }
  }
}
</script>
