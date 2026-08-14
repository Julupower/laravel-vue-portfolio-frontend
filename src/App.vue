<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <header class="navbar">
      <div class="nav-brand">
        <h2>Portfolio Showcase</h2>
      </div>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 2rem;
}

.nav-brand h2 {
  font-size: 1.25rem;
  color: #1a202c;
  font-weight: 600;
}

.content {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
</style>