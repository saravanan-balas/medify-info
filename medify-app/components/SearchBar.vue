<template>
  <div class="relative">
    <form @submit.prevent="handleSearch">
      <div class="relative">
        <input
          ref="searchInput"
          v-model="searchQuery"
          @input="debouncedSearch"
          @focus="onFocus"
          @blur="hideSuggestions"
          @keydown="handleKeyDown"
          type="text"
          placeholder="Search for symptoms, conditions, or body systems..."
          class="w-full px-6 py-4 pl-12 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-primary-500 transition-colors"
          autocomplete="off"
        />
        <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        
        <!-- Loading indicator -->
        <div v-if="isSearching" class="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
        </div>
      </div>
    </form>
    
    <!-- Search Suggestions -->
    <div 
      v-if="showSuggestions && (filteredSuggestions.length > 0 || (searchQuery.length >= 2 && !isSearching))" 
      class="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto"
    >
      <!-- Category groups -->
      <div v-if="filteredSuggestions.length > 0" class="py-2">
        <div v-for="category in categorizedSuggestions" :key="category.name" v-show="category.items.length > 0">
          <div class="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
            {{ category.label }}
          </div>
          <ul>
            <li v-for="(item, idx) in category.items" :key="item.id">
              <button
                type="button"
                @mousedown.prevent="selectSuggestion(item)"
                @mouseover="selectedIndex = getGlobalIndex(category.name, idx)"
                :class="[
                  'w-full text-left px-4 py-3 hover:bg-primary-50 transition-colors flex items-center',
                  selectedIndex === getGlobalIndex(category.name, idx) ? 'bg-primary-50' : ''
                ]"
              >
                <span class="text-2xl mr-3 flex-shrink-0">{{ item.icon }}</span>
                <div class="flex-grow min-w-0">
                  <p class="font-medium text-gray-900" v-html="highlightMatch(item.title)"></p>
                  <p class="text-sm text-gray-500 truncate">{{ item.description }}</p>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- No results message -->
      <div v-else-if="!isSearching && searchQuery.length >= 2" class="p-4 text-center text-gray-500">
        <p>No results found for "{{ searchQuery }}"</p>
        <p class="text-sm mt-2">Try different keywords or browse our categories</p>
      </div>
      
      <!-- View all results link -->
      <div v-if="searchQuery.trim() && filteredSuggestions.length > 0" class="border-t border-gray-100">
        <button
          type="button"
          @mousedown.prevent="viewAllResults"
          class="w-full px-4 py-3 hover:bg-primary-50 transition-colors text-primary-600 font-medium flex items-center"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <span>View all results for "{{ searchQuery }}"</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { searchItems, getCategoryLabel, type SearchItem } from '~/utils/searchData'

const searchQuery = ref('')
const showSuggestions = ref(false)
const isSearching = ref(false)
const selectedIndex = ref(-1)
const searchInput = ref<HTMLInputElement>()
const filteredSuggestions = ref<SearchItem[]>([])

// Debounce timer
let searchTimer: NodeJS.Timeout

// Group suggestions by category
const categorizedSuggestions = computed(() => {
  const categories = [
    { name: 'system', label: 'Body Systems', items: [] as SearchItem[] },
    { name: 'condition', label: 'Health Conditions', items: [] as SearchItem[] },
    { name: 'ailment', label: 'Common Issues', items: [] as SearchItem[] },
    { name: 'symptom', label: 'Symptoms', items: [] as SearchItem[] },
  ]
  
  filteredSuggestions.value.forEach(item => {
    const category = categories.find(c => c.name === item.category)
    if (category) {
      category.items.push(item)
    }
  })
  
  return categories
})

// Calculate global index for keyboard navigation
const getGlobalIndex = (categoryName: string, localIndex: number) => {
  let globalIdx = 0
  for (const cat of categorizedSuggestions.value) {
    if (cat.name === categoryName) {
      return globalIdx + localIndex
    }
    globalIdx += cat.items.length
  }
  return -1
}

// Get item by global index
const getItemByIndex = (index: number) => {
  let currentIdx = 0
  for (const cat of categorizedSuggestions.value) {
    if (currentIdx + cat.items.length > index) {
      return cat.items[index - currentIdx]
    }
    currentIdx += cat.items.length
  }
  return null
}

// Perform search with debouncing
const debouncedSearch = () => {
  clearTimeout(searchTimer)
  isSearching.value = true
  
  searchTimer = setTimeout(() => {
    if (searchQuery.value.length >= 2) {
      filteredSuggestions.value = searchItems(searchQuery.value, 8)
    } else {
      filteredSuggestions.value = []
    }
    isSearching.value = false
    showSuggestions.value = true
  }, 300)
}

// Handle keyboard navigation
const handleKeyDown = (e: KeyboardEvent) => {
  const totalItems = filteredSuggestions.value.length
  
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      if (totalItems > 0) {
        selectedIndex.value = (selectedIndex.value + 1) % totalItems
      }
      break
    
    case 'ArrowUp':
      e.preventDefault()
      if (totalItems > 0) {
        selectedIndex.value = selectedIndex.value <= 0 ? totalItems - 1 : selectedIndex.value - 1
      }
      break
    
    case 'Enter':
      e.preventDefault()
      if (selectedIndex.value >= 0 && selectedIndex.value < totalItems) {
        const item = getItemByIndex(selectedIndex.value)
        if (item) {
          selectSuggestion(item)
        }
      } else {
        handleSearch()
      }
      break
    
    case 'Escape':
      e.preventDefault()
      showSuggestions.value = false
      selectedIndex.value = -1
      break
  }
}

// Select a suggestion
const selectSuggestion = (item: SearchItem) => {
  navigateTo(item.url)
  searchQuery.value = ''
  showSuggestions.value = false
  selectedIndex.value = -1
}

// View all results
const viewAllResults = () => {
  navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
  searchQuery.value = ''
  showSuggestions.value = false
}

// Highlight matching text
const highlightMatch = (text: string) => {
  if (!searchQuery.value) return text
  
  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 rounded">$1</mark>')
}

const onFocus = () => {
  if (searchQuery.value.length >= 2) {
    showSuggestions.value = true
  }
}

const hideSuggestions = () => {
  setTimeout(() => {
    showSuggestions.value = false
    selectedIndex.value = -1
  }, 200)
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
    searchQuery.value = ''
    showSuggestions.value = false
  }
}

// Reset selected index when suggestions change
watch(filteredSuggestions, () => {
  selectedIndex.value = -1
})
</script>