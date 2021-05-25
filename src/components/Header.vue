<template>
  <header class="w-full px-8 py-4 bg-gray-50">
    <nav class="flex flex-col justify-between items-start space-y-4
      sm:flex-row sm:items-center sm:space-y-0"
    >
      <div class="flex flex-col items-start space-y-2
        sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0"
      >
        <div class="hidden sm:block">
          <img src="@/assets/logo.png" width="32" height="32" alt="Water Wall">
        </div>
        <RouterLink
          v-for="link in links"
          :key="link"
          :to="{ name: link.route }"
          class="py-1 px-2 border-b-2 border-transparent border-b-transparent
            font-semibold tracking-wide uppercase
            hover:border-blue-900"
          >
          {{ link.text }}
        </RouterLink>
      </div>
      <a href="https://github.com/emordonez/connecting-wall" target="_blank"
        class="flex rounded overflow-hidden text-white"
      >
        <button
          class="block px-3 py-2 bg-blue-600
            font-semibold text-sm text-left tracking-wide uppercase
            hover:bg-blue-900"
        >
          See this project on GitHub
        </button>
        <div class="p-2 bg-blue-400">
          <!-- external-link from https://heroicons.com/ -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
        </div>
      </a>
    </nav>
  </header>
</template>

<script>
export default {
  data () {
    return {
      links: [
        {
          route: 'Home',
          text: 'Only Connect'
        },
        {
          route: 'About',
          text: 'About'
        },
        {
          route: 'Editor',
          text: 'Editor'
        }
      ]
    }
  }
}
</script>
