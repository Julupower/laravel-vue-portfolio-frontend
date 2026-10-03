<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
    <h1 class="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
    <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">Page Not Found</h2>
    <p class="text-gray-600 dark:text-gray-400 max-w-md mb-8">
      The resource or page you are requesting does not exist or has been moved.
    </p>
    <router-link 
      to="/" 
      class="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
    >
      Return to Projects
    </router-link>
  </div>
</template>

<script setup>
// Component requires no complex logic; template renders fallback view
</script>
