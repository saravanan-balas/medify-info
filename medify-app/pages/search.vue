<template>
  <div>
    <!-- Search Header -->
    <section class="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
      <div class="container-custom">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Search Medical Content
          </h1>
          <p class="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Find information about body systems, health conditions, and medical topics
          </p>
          
          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto">
            <div class="relative">
              <input
                v-model="searchQuery"
                @input="performSearch"
                @keyup.enter="performSearch"
                type="text"
                placeholder="Search for conditions, symptoms, or body systems..."
                class="w-full px-6 py-4 pr-12 text-lg border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none shadow-sm"
              />
              <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Search Results -->
    <section class="py-16">
      <div class="container-custom">
        <!-- Loading State -->
        <div v-if="isSearching" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p class="mt-4 text-gray-600">Searching...</p>
        </div>

        <!-- No Search Query -->
        <div v-else-if="!searchQuery" class="text-center py-12">
          <div class="text-6xl mb-6">🔍</div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Start Your Search</h2>
          <p class="text-gray-600 mb-8">Enter a search term to find relevant medical information</p>
          
          <!-- Popular Searches -->
          <div class="max-w-2xl mx-auto">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Popular Searches</h3>
            <div class="flex flex-wrap gap-2 justify-center">
              <button
                v-for="term in popularSearches"
                :key="term"
                @click="searchQuery = term; performSearch()"
                class="px-4 py-2 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-full text-sm transition-colors"
              >
                {{ term }}
              </button>
            </div>
          </div>
        </div>

        <!-- Search Results -->
        <div v-else-if="searchResults.length > 0">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-2xl font-bold text-gray-900">
              Search Results for "{{ searchQuery }}"
            </h2>
            <span class="text-gray-600">{{ searchResults.length }} result{{ searchResults.length !== 1 ? 's' : '' }}</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="result in searchResults"
              :key="result.id"
              class="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="text-4xl">{{ result.icon }}</div>
                <span class="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                  {{ result.type }}
                </span>
              </div>
              
              <h3 class="text-xl font-semibold text-gray-900 mb-3">
                {{ result.title }}
              </h3>
              
              <p class="text-gray-600 mb-4 text-sm">
                {{ result.description }}
              </p>

              <!-- Highlighted matching text -->
              <div v-if="result.highlight" class="mb-4">
                <p class="text-xs text-gray-500 italic">
                  "...{{ result.highlight }}..."
                </p>
              </div>

              <NuxtLink
                :to="result.url"
                class="inline-flex items-center text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors"
              >
                Learn more
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-else class="text-center py-12">
          <div class="text-6xl mb-6">😕</div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">No Results Found</h2>
          <p class="text-gray-600 mb-8">We couldn't find any content matching "{{ searchQuery }}"</p>
          
          <div class="max-w-md mx-auto">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Try these suggestions:</h3>
            <ul class="text-left text-gray-600 space-y-2">
              <li>• Check your spelling</li>
              <li>• Try different keywords</li>
              <li>• Use more general terms</li>
              <li>• Browse our body systems instead</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Browse Systems -->
    <section v-if="!searchQuery" class="py-16 bg-gray-50">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          Browse Body Systems
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink
            v-for="system in bodySystems"
            :key="system.slug"
            :to="`/systems/${system.slug}`"
            class="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
          >
            <div class="text-6xl mb-4 text-center">{{ system.icon }}</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
              {{ system.title }}
            </h3>
            <p class="text-gray-600 text-sm">{{ system.description }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const route = useRoute()

// Search state
const searchQuery = ref('')
const searchResults = ref([])
const isSearching = ref(false)

// Body systems for browsing
const bodySystems = ref([
  {
    title: 'Nervous System',
    slug: 'nervous-system',
    description: 'The body\'s communication network that controls everything from breathing to thinking',
    icon: '🧠'
  },
  {
    title: 'Heart & Cardiovascular System',
    slug: 'heart',
    description: 'The powerful pump that keeps blood flowing through your entire body',
    icon: '❤️'
  },
  {
    title: 'Lungs & Respiratory System',
    slug: 'lungs',
    description: 'The breathing system that brings oxygen into your body and removes carbon dioxide',
    icon: '🫁'
  },
  {
    title: 'Eyes & Visual System',
    slug: 'eyes',
    description: 'Your window to the world - the complex system that allows you to see',
    icon: '👁️'
  },
  {
    title: 'Kidneys & Urinary System',
    slug: 'kidneys',
    description: 'The body\'s filtration system that removes waste and maintains fluid balance',
    icon: '🫘'
  },
  {
    title: 'Ears & Hearing System',
    slug: 'ears',
    description: 'Your gateway to sound - the complex system that allows you to hear and maintain balance',
    icon: '👂'
  },
  {
    title: 'Digestive System',
    slug: 'digestive-system',
    description: 'The body\'s food processing plant that breaks down what you eat into nutrients your body can use',
    icon: '🍽️'
  }
])

// Popular search terms
const popularSearches = ref([
  'asthma',
  'heart disease',
  'diabetes',
  'high blood pressure',
  'depression',
  'anxiety',
  'headaches',
  'sleep problems',
  'cancer',
  'stroke'
])

// Search function
const performSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }

  isSearching.value = true
  
  try {
    const response = await $fetch('/api/search', {
      method: 'POST',
      body: {
        query: searchQuery.value.trim()
      }
    })
    
    searchResults.value = response.results || []
  } catch (error) {
    console.error('Search error:', error)
    searchResults.value = []
  } finally {
    isSearching.value = false
  }
}

// Initialize search from URL query
onMounted(() => {
  const query = route.query.q as string
  if (query) {
    searchQuery.value = query
    performSearch()
  }
})

// Set page title and meta
useHead({
  title: 'Search - Medify.info',
  meta: [
    { name: 'description', content: 'Search for medical information, health conditions, and body systems on Medify.info' }
  ]
})
</script>
