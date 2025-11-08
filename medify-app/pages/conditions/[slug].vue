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
      <section class="bg-gradient-to-br from-primary-50 to-primary-100 py-8 md:py-12">
        <div class="container-custom">
          <div class="text-center">
            <div class="text-6xl md:text-7xl mb-4">{{ condition?.icon }}</div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {{ condition?.title }}
            </h1>
            <p class="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-3">
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
      <div v-if="parsedSections.length > 0">
        <section 
          v-for="(section, index) in parsedSections" 
          :key="index"
          :class="[
            'py-12 md:py-16 transition-colors',
            index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
          ]"
        >
          <div class="container-custom">
            <div class="max-w-4xl mx-auto">
              <div 
                :class="[
                  'prose prose-lg max-w-none',
                  index % 2 === 0 ? '' : 'condition-section-alt'
                ]"
              >
                <div 
                  v-html="section.content"
                  class="condition-section"
                ></div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <!-- Fallback for content without clear sections -->
      <section v-else class="py-16 bg-white">
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

// Parse HTML content into sections based on h2 headings
const parsedSections = computed(() => {
  if (!condition.value?.body) return []
  
  const html = condition.value.body
  const sections: Array<{ title: string; content: string }> = []
  
  // Use regex to split by h2 tags
  const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gi
  const matches = Array.from(html.matchAll(h2Regex))
  
  if (matches.length === 0) {
    // No h2 headings, return entire content as one section
    return [{ title: '', content: html }]
  }
  
  // Handle content before first h2
  if (matches.length > 0 && matches[0].index !== undefined && matches[0].index > 0) {
    const introContent = html.substring(0, matches[0].index)
    if (introContent.trim()) {
      sections.push({
        title: '',
        content: introContent
      })
    }
  }
  
  // Split content by h2 headings
  matches.forEach((match, index) => {
    if (match.index === undefined) return
    
    // Extract title from h2 tag (remove HTML tags)
    let title = match[1]
    // Remove any HTML tags from title
    title = title.replace(/<[^>]+>/g, '').trim()
    
    // Get content from start of this h2 to start of next h2 (or end)
    const startIndex = match.index
    const endIndex = index < matches.length - 1 && matches[index + 1].index !== undefined
      ? matches[index + 1].index!
      : html.length
    
    // Extract the section content
    const sectionContent = html.substring(startIndex, endIndex)
    
    sections.push({
      title: title,
      content: sectionContent
    })
  })
  
  return sections
})

// Set page title and meta
useHead({
  title: `${condition.value?.title} - Medify.info`,
  meta: [
    { name: 'description', content: condition.value?.description }
  ]
})
</script>

<style scoped>
/* Enhanced styling for condition sections */
:deep(.condition-section) {
  @apply space-y-6;
}

:deep(.condition-section h2) {
  @apply text-3xl md:text-4xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-primary-200;
  @apply relative;
}

:deep(.condition-section h2::before) {
  content: '';
  @apply absolute bottom-0 left-0 w-16 h-0.5 bg-primary-500;
}

:deep(.condition-section h3) {
  @apply text-2xl md:text-3xl font-semibold text-gray-800 mt-8 mb-4;
  @apply text-primary-700;
}

:deep(.condition-section h4) {
  @apply text-xl md:text-2xl font-semibold text-gray-700 mt-6 mb-3;
}

:deep(.condition-section p) {
  @apply text-gray-700 leading-relaxed mb-4 text-base md:text-lg;
}

:deep(.condition-section ul),
:deep(.condition-section ol) {
  @apply space-y-3 mb-6 pl-6;
}

:deep(.condition-section ul) {
  @apply list-disc;
}

:deep(.condition-section ol) {
  @apply list-decimal;
}

:deep(.condition-section li) {
  @apply text-gray-700 leading-relaxed text-base md:text-lg;
  @apply mb-2;
}

:deep(.condition-section li strong) {
  @apply font-semibold text-gray-900;
}

:deep(.condition-section strong) {
  @apply font-semibold text-gray-900;
}

:deep(.condition-section code) {
  @apply bg-gray-100 px-2 py-1 rounded text-sm font-mono;
}

:deep(.condition-section blockquote) {
  @apply border-l-4 border-primary-500 pl-6 pr-4 py-2 italic text-gray-600 my-6;
  @apply bg-primary-50 rounded-r;
}

:deep(.condition-section a) {
  @apply text-primary-600 hover:text-primary-700 underline;
  @apply transition-colors;
}

/* Alternate section styling */
:deep(.condition-section-alt h2) {
  @apply border-primary-300;
}

:deep(.condition-section-alt h3) {
  @apply text-primary-600;
}
</style>





