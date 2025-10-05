<template>
  <div class="relative">
    <div class="relative">
      <input
        v-model="searchQuery"
        @input="onSearch"
        @focus="showSuggestions = true"
        @blur="hideSuggestions"
        type="text"
        placeholder="Search for symptoms or conditions..."
        class="w-full px-6 py-4 pl-12 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-primary-500 transition-colors"
      />
      <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    </div>
    
    <!-- Search Suggestions -->
    <div v-if="showSuggestions && filteredSuggestions.length > 0" class="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
      <ul class="py-2">
        <li v-for="suggestion in filteredSuggestions" :key="suggestion.slug">
          <NuxtLink 
            :to="`/ailments/${suggestion.slug}`"
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
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const showSuggestions = ref(false)

const ailments = [
  { title: 'Travel Sickness', slug: 'travel-sickness', description: 'Motion sickness during travel', icon: '🚗' },
  { title: 'Constipation', slug: 'constipation', description: 'Difficulty passing stools', icon: '🚽' },
  { title: 'Belly Pain', slug: 'belly-pain', description: 'Abdominal discomfort', icon: '🤕' },
  { title: 'Acid Reflux', slug: 'acid-reflux', description: 'Heartburn and acid backup', icon: '🔥' },
  { title: 'Diarrhea', slug: 'diarrhea', description: 'Loose, watery stools', icon: '💧' },
  { title: 'Bloating', slug: 'bloating', description: 'Abdominal fullness', icon: '🎈' },
  { title: 'Vomiting', slug: 'vomiting', description: 'Throwing up', icon: '🤢' },
  { title: 'Blood in Poop', slug: 'blood-in-poop', description: 'Blood in stool', icon: '🩸' },
  { title: 'Nausea', slug: 'travel-sickness', description: 'Feeling sick', icon: '🤢' },
  { title: 'Stomach Pain', slug: 'belly-pain', description: 'Pain in stomach area', icon: '🤕' },
  { title: 'Heartburn', slug: 'acid-reflux', description: 'Burning in chest', icon: '🔥' },
]

const filteredSuggestions = computed(() => {
  if (!searchQuery.value) return []
  
  const query = searchQuery.value.toLowerCase()
  return ailments
    .filter(ailment => 
      ailment.title.toLowerCase().includes(query) || 
      ailment.description.toLowerCase().includes(query)
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
</script>