<template>
  <div>
    <!-- Loading State -->
    <div v-if="pending" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !condition" class="text-center py-12">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Condition Not Found</h1>
      <p class="text-gray-600 mb-6">The health condition you're looking for doesn't exist.</p>
      <NuxtLink to="/" class="btn-primary">Go Back Home</NuxtLink>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Condition Header -->
      <section class="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
        <div class="container-custom">
          <div class="text-center">
            <div class="text-8xl mb-6">{{ condition?.icon }}</div>
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {{ condition?.title }}
            </h1>
            <p class="text-xl text-gray-700 max-w-3xl mx-auto mb-4">
              {{ condition?.description }}
            </p>
            <div class="flex justify-center items-center space-x-4 text-sm text-gray-600">
              <span class="bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                {{ condition?.system }}
              </span>
              <span class="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full">
                {{ condition?.category }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Condition Content -->
      <section class="py-16">
        <div class="container-custom">
          <div class="max-w-4xl mx-auto">
            <div class="prose prose-lg max-w-none">
              <div v-html="condition?.body"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Back to Systems -->
      <section class="py-8 bg-gray-100">
        <div class="container-custom text-center">
          <NuxtLink to="/" class="btn-primary">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back to Body Systems
          </NuxtLink>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const route = useRoute()
const slug = route.params.slug as string

// Fetch condition content
const { data: condition, pending, error } = await useAsyncData(`condition-${slug}`, async () => {
  try {
    // Use our custom API route
    const content = await $fetch(`/api/content/conditions/${slug}`);
    return content;
  } catch (err) {
    throw createError({ statusCode: 404, statusMessage: 'Condition not found' });
  }
})

// Set page title and meta
useHead({
  title: `${condition.value?.title} - Medify.info`,
  meta: [
    { name: 'description', content: condition.value?.description }
  ]
})
</script>





