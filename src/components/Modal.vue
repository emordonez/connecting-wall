<template>
  <div class="fixed z-10 flex flex-col w-72 p-6 border rounded
    border-black bg-gray-50
    sm:w-96"
  >
    <h1 class="pb-6 font-medium text-2xl">
      {{ title }}
    </h1>
    <ul v-if="Array.isArray(content)" class="list-disc list-inside pb-8 text-lg">
      <li v-for="item in content" :key="item" class="py-1">
        {{ item }}
      </li>
    </ul>
    <p v-else class="pb-8 text-lg">
      {{ content }}
    </p>
    <button
      class="block px-3 py-2 rounded bg-blue-600 text-white
        font-semibold tracking-wide uppercase
        hover:bg-blue-900"
      @click="toggle"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    content: [Array, String],
    buttonText: String
  },
  emits: ['toggleModal'],
  methods: {
    toggle () {
      this.$emit('toggleModal')
    }
  }
}
</script>
