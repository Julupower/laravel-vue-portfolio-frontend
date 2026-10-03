<script setup>
	defineProps({
	  project: {
	    type: Object,
	    required: true
	  }
	});

	const getImageUrl = (path) => {
	  if (!path) return 'https://picsum.photos/600/400';
	  if (path.startsWith('http://') || path.startsWith('https://')) return path;

	  // Clean forward slashes to form valid backend url
	  const cleanPath = path.startsWith('/') ? path : `/${path}`;
	  return `http://localhost${cleanPath}`;
	};
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
    <div>
      <!-- Featured Image Container -->
      <div class="w-full h-48 bg-gray-100 overflow-hidden">
        <img 
          :src="getImageUrl(project.image_path)" 
          :alt="project.title || 'Project Image'" 
          class="w-full h-full object-cover object-center"
        />
      </div>

      <!-- Card Body -->
      <div class="p-5">
        <h2 class="text-xl font-bold text-gray-900 mb-2">{{ project.title }}</h2>
        <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ project.description }}</p>

        <!-- Tech Stack Badges -->
        <div v-if="Array.isArray(project.tech_stack)" class="flex flex-wrap gap-1 mb-4">
          <span 
            v-for="tech in project.tech_stack" 
            :key="tech"
            class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>

    <!-- Card Footer -->
    <div class="p-5 pt-0 mt-auto">
      <RouterLink 
        v-if="project.slug"
        :to="{ name: 'projects.show', params: { slug: project.slug } }"
        class="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
      >
        View Details &rarr;
      </RouterLink>
    </div>
  </div>
</template>