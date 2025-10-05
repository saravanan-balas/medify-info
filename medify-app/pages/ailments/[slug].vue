<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <article class="container-custom">
      <!-- Loading State -->
      <div v-if="pending" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error || !doc" class="text-center py-12">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p class="text-gray-600 mb-6">The health condition you're looking for doesn't exist.</p>
        <NuxtLink to="/" class="btn-primary">Go Back Home</NuxtLink>
      </div>

      <!-- Content -->
      <template v-else>
        <!-- Breadcrumb -->
        <nav class="mb-6">
          <ol class="flex items-center space-x-2 text-sm">
            <li>
              <NuxtLink to="/" class="text-gray-500 hover:text-primary-600">Home</NuxtLink>
            </li>
            <li class="text-gray-400">/</li>
            <li class="text-gray-700 font-medium">{{ doc.title }}</li>
          </ol>
        </nav>

        <div class="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <header class="mb-8 pb-6 border-b">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ doc.title }}</h1>
            <p class="text-lg text-gray-600">{{ doc.description }}</p>
            
            <!-- Share Buttons -->
            <ShareButtons :title="doc.title" :url="currentUrl" class="mt-6" />
          </header>

          <!-- Main Content -->
          <div class="content-section">
            <ContentRenderer v-if="doc" :value="doc" />
          </div>

          <!-- Quick Navigation -->
          <div class="mt-12 p-6 bg-primary-50 rounded-lg">
            <h3 class="text-lg font-semibold text-primary-900 mb-4">Quick Links</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <NuxtLink to="/symptoms" class="text-primary-700 hover:text-primary-900 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
                View All Symptoms
              </NuxtLink>
              <NuxtLink to="/" class="text-primary-700 hover:text-primary-900 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
                Back to Home
              </NuxtLink>
            </div>
          </div>

          <!-- Related Ailments -->
          <div v-if="relatedAilments && relatedAilments.length > 0" class="mt-12">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Related Health Issues</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <NuxtLink 
                v-for="ailment in relatedAilments" 
                :key="ailment._path"
                :to="ailment._path"
                class="ailment-card"
              >
                <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ ailment.title }}</h4>
                <p class="text-gray-600 text-sm">{{ ailment.description }}</p>
              </NuxtLink>
            </div>
          </div>
        </div>
      </template>
    </article>
  </div>
</template>

<script setup>
const route = useRoute();
const slug = route.params.slug;

// Get the specific ailment content
const { data: doc, pending, error } = await useAsyncData(`content-${slug}`, async () => {
  console.log('Looking for content with slug:', slug);
  
  try {
    // Use our custom API route
    const content = await $fetch(`/api/content/ailments/${slug}`);
    console.log('Found content:', content);
    return content;
  } catch (err) {
    console.error('API fetch failed:', err);
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
  }
});

const currentUrl = computed(() => {
  if (process.client) {
    return window.location.href;
  }
  return `https://medify.info/ailments/${slug}`;
});

// Get related ailments
const { data: relatedAilments } = await useAsyncData(`related-${slug}`, async () => {
  try {
    // For now, return a simple list of other ailments
    const ailmentSlugs = ['travel-sickness', 'constipation', 'belly-pain', 'acid-reflux', 'diarrhea', 'bloating', 'vomiting'];
    const otherSlugs = ailmentSlugs.filter(s => s !== slug).slice(0, 3);
    
    const ailments = [];
    for (const ailmentSlug of otherSlugs) {
      try {
        const content = await $fetch(`/api/content/ailments/${ailmentSlug}`);
        ailments.push(content);
      } catch (err) {
        console.error(`Failed to load ${ailmentSlug}:`, err);
      }
    }
    
    return ailments;
  } catch (err) {
    console.error('Error loading related ailments:', err);
    return [];
  }
});

// SEO
useHead({
  title: () => doc.value?.title ? `${doc.value.title} - Medify.info` : 'Medify.info',
  meta: [
    { name: 'description', content: () => doc.value?.description || 'Medical awareness for students and families' },
    { property: 'og:title', content: () => doc.value?.title ? `${doc.value.title} - Medify.info` : 'Medify.info' },
    { property: 'og:description', content: () => doc.value?.description || 'Medical awareness for students and families' },
  ]
});
</script>