<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container-custom">
      <h1 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
        Common Symptoms Guide
      </h1>
      <p class="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
        Click on any symptom card below to learn about the most common related condition, or click individual condition links for specific information.
      </p>
      
      <!-- Search Bar -->
      <div class="max-w-2xl mx-auto mb-12">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search symptoms (e.g., nausea, pain, bloating)..."
            class="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-if="symptoms.length === 0" class="col-span-full text-center py-12">
          <div class="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">No symptoms found</h3>
          <p class="text-gray-500">Try searching with different keywords or browse all symptoms below.</p>
        </div>
        
        <div 
          v-for="symptom in symptoms" 
          :key="symptom.name" 
          @click="navigateToFirstCondition(symptom)"
          class="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer group"
        >
          <div class="flex items-center mb-3">
            <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-primary-200 transition-colors">
              <span class="text-primary-600 text-lg">{{ symptom.icon }}</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">{{ symptom.name }}</h3>
          </div>
          <p class="text-gray-600 mb-4">{{ symptom.description }}</p>
          <div class="space-y-2">
            <p class="text-sm font-medium text-gray-700">Related conditions:</p>
            <div class="flex flex-wrap gap-2">
              <NuxtLink 
                v-for="condition in symptom.conditions" 
                :key="condition.slug"
                :to="`/ailments/${condition.slug}`"
                @click.stop
                class="text-sm bg-primary-50 text-primary-700 px-3 py-1 rounded-full hover:bg-primary-100 hover:text-primary-800 transition-colors transform hover:scale-105"
              >
                {{ condition.name }}
              </NuxtLink>
            </div>
            <p class="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Click card to view {{ symptom.conditions[0]?.name || 'related condition' }}
            </p>
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