<template>
  <div class="max-w-screen-lg bg-gray-800 text-white">
    <div class="content">
      <h1>
        Wall Editor
      </h1>
      <p>
        Create your own connecting wall with this editor.
        Fill out each field, then generate a link to the playable connecting wall that you can share.
      </p>
    </div>
    <!-- TODO: Separate submission to post to a database -->
    <!-- TODO: Repository of submitted walls -->
    <form action="" @submit.prevent="formatLink" class="pb-8">
      <div class="pb-8 grid grid-cols-1 gap-4 sm:grid-cols-5">
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
          placeholder="Link 3"
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
          placeholder="Link 4"
          required
          class="w-full p-3 border-2 rounded group-4 bg-black"
        >
      </div>
      <!-- Generate Wall -->
      <input
        type="submit"
        value="Generate Wall"
        class="px-3 py-2 rounded
          bg-gray-50 text-black
          font-semibold text-sm tracking-wide uppercase
          cursor-pointer"
      >
    </form>
    <textarea
      :value="url"
      placeholder="Generate link"
      rows="2"
      class="p-3 w-full font-mono text-black"
    />
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
      ],
      url: ''
    }
  },
  methods: {
    formatLink () {
      let arr = []
      this.groups.forEach((group) => {
        arr.push({
          c: group.connection,
          cs: group.clues
        })
      })
      this.url = 'https://connecting-wall.netlify.app/wall/' + window.btoa(JSON.stringify(arr))
    }
  }
}
</script>
