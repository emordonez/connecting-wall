<template>
  <div class="fixed z-10 inset-0 overflow-y-auto h-screen w-screen bg-black bg-opacity-80">
    <div class="flex flex-col w-96 max-w-screen p-6 border-2 my-36 mx-auto bg-gray-50">
      <h1 class="pb-6 font-medium text-2xl">
        {{ title }}
      </h1>
      <p class="pb-8 text-lg">
        {{ content }}
      </p>
      <button
        class="block px-3 py-2 bg-blue-600 text-white
          font-semibold tracking-wide uppercase
          hover:bg-blue-900"
        @click="toggle"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    content: String,
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
