<template>
  <div class="relative">
    <form @submit.prevent="handleSearch">
      <div class="relative">
        <input
          v-model="searchQuery"
          @input="onSearch"
          @focus="showSuggestions = true"
          @blur="hideSuggestions"
          type="text"
          placeholder="Search for symptoms, conditions, or body systems..."
          class="w-full px-6 py-4 pl-12 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-primary-500 transition-colors"
        />
        <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>
    </form>
    
    <!-- Search Suggestions -->
    <div v-if="showSuggestions && filteredSuggestions.length > 0" class="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
      <ul class="py-2">
        <li v-for="suggestion in filteredSuggestions" :key="suggestion.slug">
          <NuxtLink 
            :to="suggestion.url"
            class="block px-4 py-2 hover:bg-gray-50 transition-colors"
            @click="searchQuery = ''"
          >
            <div class="flex items-center">
              <span class="text-2xl mr-3">{{ suggestion.icon }}</span>
              <div>
                <p class="font-medium text-gray-900">{{ suggestion.title }}</p>
                <p class="text-sm text-gray-500">{{ suggestion.description }}</p>
              </div>
            </div>
          </NuxtLink>
        </li>
        <li v-if="searchQuery.trim()" class="border-t border-gray-100">
          <NuxtLink 
            :to="`/search?q=${encodeURIComponent(searchQuery)}`"
            class="block px-4 py-2 hover:bg-gray-50 transition-colors text-primary-600 font-medium"
            @click="searchQuery = ''"
          >
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <span>Search for "{{ searchQuery }}"</span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const showSuggestions = ref(false)

// Combined suggestions from systems and conditions
const suggestions = [
  // Body Systems
  { title: 'Nervous System', slug: 'nervous-system', description: 'Brain, nerves, and mental health', icon: '🧠', url: '/systems/nervous-system' },
  { title: 'Heart & Cardiovascular', slug: 'heart', description: 'Heart, blood vessels, circulation', icon: '❤️', url: '/systems/heart' },
  { title: 'Lungs & Respiratory', slug: 'lungs', description: 'Breathing, lungs, airways', icon: '🫁', url: '/systems/lungs' },
  { title: 'Eyes & Visual System', slug: 'eyes', description: 'Vision, eye health', icon: '👁️', url: '/systems/eyes' },
  { title: 'Kidneys & Urinary', slug: 'kidneys', description: 'Kidneys, bladder, urinary system', icon: '🫘', url: '/systems/kidneys' },
  { title: 'Ears & Hearing', slug: 'ears', description: 'Hearing, balance, ear health', icon: '👂', url: '/systems/ears' },
  { title: 'Digestive System', slug: 'digestive-system', description: 'Stomach, intestines, digestion', icon: '🍽️', url: '/systems/digestive-system' },
  
  // Common Conditions
  { title: 'Asthma', slug: 'asthma', description: 'Breathing difficulties, airway inflammation', icon: '🫁', url: '/conditions/asthma' },
  { title: 'Depression', slug: 'depression', description: 'Persistent sadness, mood disorders', icon: '😔', url: '/conditions/depression' },
  { title: 'High Blood Pressure', slug: 'hypertension', description: 'Elevated blood pressure', icon: '❤️', url: '/conditions/hypertension' },
  { title: 'Headaches & Migraines', slug: 'headaches-migraines', description: 'Head pain, migraine attacks', icon: '🤕', url: '/conditions/headaches-migraines' },
  { title: 'Anxiety & Stress', slug: 'anxiety-stress', description: 'Worry, nervousness, stress', icon: '😰', url: '/conditions/anxiety-stress' },
  { title: 'Sleep Problems', slug: 'sleep-problems', description: 'Insomnia, sleep disorders', icon: '😴', url: '/conditions/sleep-problems' },
  { title: 'Memory Issues', slug: 'memory-issues', description: 'Forgetfulness, cognitive problems', icon: '🧠', url: '/conditions/memory-issues' },
  { title: 'Epilepsy', slug: 'epilepsy', description: 'Seizures, neurological disorder', icon: '⚡', url: '/conditions/epilepsy' },
  
  // Digestive Issues (from original ailments)
  { title: 'Acid Reflux', slug: 'acid-reflux', description: 'Heartburn and acid backup', icon: '🤢', url: '/ailments/acid-reflux' },
  { title: 'Constipation', slug: 'constipation', description: 'Difficulty passing stools', icon: '🚽', url: '/ailments/constipation' },
  { title: 'Diarrhea', slug: 'diarrhea', description: 'Loose, watery stools', icon: '💧', url: '/ailments/diarrhea' },
  { title: 'Bloating', slug: 'bloating', description: 'Abdominal fullness', icon: '🎈', url: '/ailments/bloating' },
  { title: 'Vomiting', slug: 'vomiting', description: 'Throwing up', icon: '🤢', url: '/ailments/vomiting' },
  { title: 'Belly Pain', slug: 'belly-pain', description: 'Abdominal discomfort', icon: '🤕', url: '/ailments/belly-pain' },
  { title: 'Blood in Poop', slug: 'blood-in-poop', description: 'Blood in stool', icon: '🩸', url: '/ailments/blood-in-poop' },
  { title: 'Travel Sickness', slug: 'travel-sickness', description: 'Motion sickness during travel', icon: '🚗', url: '/ailments/travel-sickness' },
  
  // Common Symptoms
  { title: 'Nausea', slug: 'nausea', description: 'Feeling sick or queasy', icon: '🤢', url: '/symptoms' },
  { title: 'Stomach Pain', slug: 'stomach-pain', description: 'Abdominal discomfort', icon: '🤕', url: '/symptoms' },
  { title: 'Heartburn', slug: 'heartburn', description: 'Burning sensation in chest', icon: '🔥', url: '/symptoms' },
  { title: 'Dizziness', slug: 'dizziness', description: 'Feeling lightheaded', icon: '🌀', url: '/symptoms' },
  { title: 'Fatigue', slug: 'fatigue', description: 'Feeling very tired', icon: '😴', url: '/symptoms' },
]

const filteredSuggestions = computed(() => {
  if (!searchQuery.value) return []
  
  const query = searchQuery.value.toLowerCase()
  return suggestions
    .filter(suggestion => 
      suggestion.title.toLowerCase().includes(query) || 
      suggestion.description.toLowerCase().includes(query)
    )
    .slice(0, 5)
})

const onSearch = () => {
  showSuggestions.value = true
}

const hideSuggestions = () => {
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
  }
}
</script>