<script setup>
import { defineProps } from 'vue';

defineProps({
  projects: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="project-list-view">
    <h1>Portfolio Projects</h1>
  </div>
</template>
