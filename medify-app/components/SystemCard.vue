<template>
  <NuxtLink :to="`/systems/${slug}`" class="system-card group">
    <div class="text-4xl mb-4">{{ icon }}</div>
    <h3 class="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
      {{ title }}
    </h3>
    <p class="text-gray-600 text-sm">{{ description }}</p>
    <div class="mt-4 flex items-center text-primary-600 text-sm font-medium">
      Learn more
      <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  title: string
  slug: string
  description: string
  icon: string
}

defineProps<Props>()
</script>

<style scoped>
.system-card {
  @apply bg-gradient-to-br from-white to-primary-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-primary-100 hover:border-primary-300;
}
</style>
