<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 py-12">
    <div class="container-custom">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg mb-6">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-primary-800 bg-clip-text text-transparent mb-4">
          Common Symptoms Guide
        </h1>
        <p class="text-lg text-gray-600 mb-2 max-w-3xl mx-auto leading-relaxed">
          Click on any symptom card below to learn about the most common related condition, or explore our body systems for comprehensive health information.
        </p>
        <div class="flex items-center justify-center space-x-4 text-sm text-primary-600">
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>12 symptoms available</span>
          </div>
          <div class="w-px h-4 bg-primary-300"></div>
          <NuxtLink to="/" class="flex items-center space-x-2 hover:text-primary-700 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            <span>Explore Body Systems</span>
          </NuxtLink>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div v-if="symptoms.length === 0" class="col-span-full text-center py-12">
          <div class="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">No symptoms found</h3>
          <p class="text-gray-500">Try searching with different keywords or browse all symptoms below.</p>
        </div>
        
        <div 
          v-for="symptom in symptoms" 
          :key="symptom.name" 
          @click="navigateToFirstCondition(symptom)"
          class="relative bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:shadow-primary-100/50 hover:-translate-y-1 hover:border-primary-300 transition-all duration-300 cursor-pointer group overflow-hidden"
        >
          <!-- Background decoration -->
          <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-50 to-primary-100 rounded-bl-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
          
          <!-- Icon and title section -->
          <div class="relative flex items-start mb-4">
            <div class="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
              <span class="text-primary-600 text-2xl">{{ symptom.icon }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors leading-tight">{{ symptom.name }}</h3>
              <div class="w-12 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full mt-2 group-hover:w-16 transition-all duration-300"></div>
            </div>
          </div>
          
          <!-- Description -->
          <p class="text-gray-600 mb-5 leading-relaxed">{{ symptom.description }}</p>
          
          <!-- Related conditions section -->
          <div class="space-y-3">
            <p class="text-sm font-semibold text-gray-800 flex items-center">
              <svg class="w-4 h-4 mr-1 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Related conditions:
            </p>
            <div class="flex flex-wrap gap-2">
              <NuxtLink 
                v-for="condition in symptom.conditions" 
                :key="condition.slug"
                :to="`/ailments/${condition.slug}`"
                @click.stop
                class="inline-flex items-center text-sm bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 px-4 py-2 rounded-full hover:from-primary-100 hover:to-primary-200 hover:text-primary-800 hover:shadow-md transition-all duration-200 transform hover:scale-105 border border-primary-200 hover:border-primary-300"
              >
                {{ condition.name }}
                <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </NuxtLink>
            </div>
            
            <!-- Hover instruction -->
            <div class="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
              <p class="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                Click to view {{ symptom.conditions[0]?.name || 'related condition' }}
              </p>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg class="w-5 h-5 text-primary-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')

// Function to navigate to the first related condition when card is clicked
const navigateToFirstCondition = (symptom: any) => {
  if (symptom.conditions && symptom.conditions.length > 0) {
    navigateTo(`/ailments/${symptom.conditions[0].slug}`)
  }
}

const allSymptoms = [
  {
    name: 'Nausea',
    icon: '🤢',
    description: 'Feeling sick or queasy in your stomach',
    conditions: [
      { name: 'Travel Sickness', slug: 'travel-sickness' },
      { name: 'Vomiting', slug: 'vomiting' },
      { name: 'Acid Reflux', slug: 'acid-reflux' }
    ]
  },
  {
    name: 'Stomach Pain',
    icon: '🤕',
    description: 'Discomfort or cramping in the abdomen',
    conditions: [
      { name: 'Belly Pain', slug: 'belly-pain' },
      { name: 'Constipation', slug: 'constipation' },
      { name: 'Bloating', slug: 'bloating' }
    ]
  },
  {
    name: 'Changes in Bowel Movements',
    icon: '🚽',
    description: 'Unusual patterns in toilet habits',
    conditions: [
      { name: 'Constipation', slug: 'constipation' },
      { name: 'Diarrhea', slug: 'diarrhea' },
      { name: 'Blood in Poop', slug: 'blood-in-poop' }
    ]
  },
  {
    name: 'Heartburn',
    icon: '🔥',
    description: 'Burning sensation in chest or throat',
    conditions: [
      { name: 'Acid Reflux', slug: 'acid-reflux' },
      { name: 'Belly Pain', slug: 'belly-pain' }
    ]
  },
  {
    name: 'Bloating',
    icon: '🎈',
    description: 'Feeling full or swollen in the belly',
    conditions: [
      { name: 'Bloating', slug: 'bloating' },
      { name: 'Constipation', slug: 'constipation' },
      { name: 'Belly Pain', slug: 'belly-pain' }
    ]
  },
  {
    name: 'Dizziness',
    icon: '🌀',
    description: 'Feeling lightheaded or unsteady',
    conditions: [
      { name: 'Travel Sickness', slug: 'travel-sickness' },
      { name: 'Vomiting', slug: 'vomiting' }
    ]
  },
  {
    name: 'Loss of Appetite',
    icon: '🍽️',
    description: 'Not feeling hungry or wanting to eat',
    conditions: [
      { name: 'Belly Pain', slug: 'belly-pain' },
      { name: 'Vomiting', slug: 'vomiting' },
      { name: 'Constipation', slug: 'constipation' }
    ]
  },
  {
    name: 'Fatigue',
    icon: '😴',
    description: 'Feeling very tired or weak',
    conditions: [
      { name: 'Diarrhea', slug: 'diarrhea' },
      { name: 'Vomiting', slug: 'vomiting' },
      { name: 'Blood in Poop', slug: 'blood-in-poop' }
    ]
  },
  {
    name: 'Rectal Bleeding',
    icon: '🩸',
    description: 'Blood seen during bowel movements',
    conditions: [
      { name: 'Blood in Poop', slug: 'blood-in-poop' },
      { name: 'Constipation', slug: 'constipation' }
    ]
  },
  {
    name: 'Chest Pain',
    icon: '💔',
    description: 'Discomfort or pain in the chest area',
    conditions: [
      { name: 'Acid Reflux', slug: 'acid-reflux' },
      { name: 'Belly Pain', slug: 'belly-pain' }
    ]
  },
  {
    name: 'Difficulty Swallowing',
    icon: '🥤',
    description: 'Trouble getting food or liquid down',
    conditions: [
      { name: 'Acid Reflux', slug: 'acid-reflux' },
      { name: 'Belly Pain', slug: 'belly-pain' }
    ]
  },
  {
    name: 'Excessive Burping',
    icon: '💨',
    description: 'Frequent burping or belching',
    conditions: [
      { name: 'Acid Reflux', slug: 'acid-reflux' },
      { name: 'Bloating', slug: 'bloating' }
    ]
  }
]

// Filter symptoms based on search query
const symptoms = computed(() => {
  if (!searchQuery.value) {
    return allSymptoms
  }
  
  const query = searchQuery.value.toLowerCase()
  return allSymptoms.filter(symptom => 
    symptom.name.toLowerCase().includes(query) ||
    symptom.description.toLowerCase().includes(query) ||
    symptom.conditions.some(condition => 
      condition.name.toLowerCase().includes(query)
    )
  )
})
</script>