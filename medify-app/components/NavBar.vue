<template>
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="container-custom">
      <div class="flex justify-between items-center h-16 gap-4">
        <div class="flex items-center flex-shrink-0">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <svg class="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span class="text-xl font-bold text-gray-800">Medify.info</span>
          </NuxtLink>
        </div>

        <!-- Mobile Search Button -->
        <div class="md:hidden flex items-center space-x-2">
          <button 
            @click="mobileSearchOpen = !mobileSearchOpen"
            class="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            aria-label="Search"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </button>
        </div>

        <div class="hidden md:flex items-center space-x-3 flex-1 min-w-0">
          <NuxtLink to="/" class="nav-link whitespace-nowrap">Home</NuxtLink>
          <NuxtLink to="/symptoms" class="nav-link whitespace-nowrap">Common Conditions</NuxtLink>
          <NuxtLink to="/interviews" class="nav-link whitespace-nowrap">Interviews</NuxtLink>
          <NuxtLink to="/gallery" class="nav-link whitespace-nowrap">Gallery</NuxtLink>
          <NuxtLink to="/videos" class="nav-link whitespace-nowrap">Videos</NuxtLink>
          <NuxtLink to="/about" class="nav-link whitespace-nowrap">About</NuxtLink>
          <NuxtLink to="/join" class="nav-link whitespace-nowrap">Join Us</NuxtLink>
          
          <!-- Desktop Search Bar -->
          <div class="flex-1 max-w-sm ml-4 relative min-w-[200px]">
            <div class="relative">
              <input
                ref="desktopSearchInput"
                v-model="desktopSearchQuery"
                @input="debouncedDesktopSearch"
                @focus="onDesktopFocus"
                @blur="hideDesktopSuggestions"
                @keydown="handleDesktopKeyDown"
                type="text"
                placeholder="Search..."
                class="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors bg-white"
                autocomplete="off"
              />
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              
              <!-- Loading indicator -->
              <div v-if="isDesktopSearching" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
              </div>
            </div>
            
            <!-- Desktop Search Suggestions -->
            <div 
              v-if="showDesktopSuggestions && (desktopSuggestions.length > 0 || (desktopSearchQuery.length >= 2 && !isDesktopSearching))" 
              class="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto"
            >
              <!-- Category groups -->
              <div v-if="desktopSuggestions.length > 0" class="py-2">
                <div v-for="category in categorizedDesktopSuggestions" :key="category.name" v-show="category.items.length > 0">
                  <div class="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                    {{ category.label }}
                  </div>
                  <ul>
                    <li v-for="(item, idx) in category.items" :key="item.id">
                      <button
                        type="button"
                        @mousedown.prevent="selectDesktopSuggestion(item)"
                        @mouseover="desktopSelectedIndex = getDesktopGlobalIndex(category.name, idx)"
                        :class="[
                          'w-full text-left px-4 py-2.5 hover:bg-primary-50 transition-colors flex items-center',
                          desktopSelectedIndex === getDesktopGlobalIndex(category.name, idx) ? 'bg-primary-50' : ''
                        ]"
                      >
                        <span class="text-xl mr-3 flex-shrink-0">{{ item.icon }}</span>
                        <div class="flex-grow min-w-0">
                          <p class="font-medium text-gray-900 text-sm" v-html="highlightDesktopMatch(item.title)"></p>
                          <p class="text-xs text-gray-500 truncate">{{ item.description }}</p>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              
              <!-- No results message -->
              <div v-else-if="!isDesktopSearching && desktopSearchQuery.length >= 2" class="p-4 text-center text-gray-500 text-sm">
                <p>No results found for "{{ desktopSearchQuery }}"</p>
                <p class="text-xs mt-2">Try different keywords or browse our categories</p>
              </div>
              
              <!-- View all results link -->
              <div v-if="desktopSearchQuery.trim() && desktopSuggestions.length > 0" class="border-t border-gray-100">
                <button
                  type="button"
                  @mousedown.prevent="viewAllDesktopResults"
                  class="w-full px-4 py-2.5 hover:bg-primary-50 transition-colors text-primary-600 font-medium text-sm flex items-center"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  <span>View all results for "{{ desktopSearchQuery }}"</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="md:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
            <svg v-if="!mobileMenuOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Search Overlay -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div v-if="mobileSearchOpen" class="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-40">
          <div class="relative">
            <input
              ref="mobileSearchInput"
              v-model="mobileSearchQuery"
              @input="debouncedMobileSearch"
              @keydown="handleMobileKeyDown"
              type="text"
              placeholder="Search symptoms, conditions, or body systems..."
              class="w-full px-4 py-3 pl-12 pr-4 text-base border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none bg-white"
              autocomplete="off"
            />
            <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <!-- Loading indicator -->
            <div v-if="isSearching" class="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
            </div>
          </div>
          
          <!-- Mobile Search Suggestions -->
          <div v-if="mobileSuggestions.length > 0" class="mt-3 max-h-60 overflow-y-auto">
            <div class="space-y-1">
              <button
                v-for="(item, idx) in mobileSuggestions"
                :key="item.id"
                @click="selectMobileSuggestion(item)"
                :class="[
                  'w-full text-left px-3 py-2 rounded-lg flex items-center space-x-3 transition-colors',
                  mobileSelectedIndex === idx ? 'bg-primary-50' : 'hover:bg-gray-50'
                ]"
              >
                <span class="text-xl flex-shrink-0">{{ item.icon }}</span>
                <div class="flex-grow min-w-0">
                  <p class="font-medium text-gray-900 text-sm">{{ item.title }}</p>
                  <p class="text-xs text-gray-500 truncate">{{ item.description }}</p>
                </div>
              </button>
            </div>
            
            <!-- View all results -->
            <button
              v-if="mobileSearchQuery.trim()"
              @click="viewAllMobileResults"
              class="w-full mt-2 px-3 py-2 text-primary-600 text-sm font-medium hover:bg-primary-50 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              View all results
            </button>
          </div>
          
          <!-- No results message -->
          <div v-else-if="mobileSearchQuery.length >= 2 && !isSearching" class="mt-3 p-4 text-center text-gray-500 text-sm">
            <p>No results found</p>
          </div>
          
          <!-- Popular searches -->
          <div v-else-if="!mobileSearchQuery" class="mt-3">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Popular Searches</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="term in popularSearches"
                :key="term"
                @click="mobileSearchQuery = term; debouncedMobileSearch()"
                class="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
              >
                {{ term }}
              </button>
            </div>
          </div>
        </div>
      </transition>

      <div v-if="mobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 border-t">
          <NuxtLink to="/" class="mobile-nav-link" @click="mobileMenuOpen = false">Home</NuxtLink>
          <NuxtLink to="/symptoms" class="mobile-nav-link" @click="mobileMenuOpen = false">Common Conditions</NuxtLink>
          <NuxtLink to="/interviews" class="mobile-nav-link" @click="mobileMenuOpen = false">Interviews</NuxtLink>
          <NuxtLink to="/gallery" class="mobile-nav-link" @click="mobileMenuOpen = false">Gallery</NuxtLink>
          <NuxtLink to="/videos" class="mobile-nav-link" @click="mobileMenuOpen = false">Videos</NuxtLink>
          <NuxtLink to="/about" class="mobile-nav-link" @click="mobileMenuOpen = false">About</NuxtLink>
          <NuxtLink to="/join" class="mobile-nav-link" @click="mobileMenuOpen = false">Join Us</NuxtLink>
          
          <!-- Mobile Search Link -->
          <NuxtLink to="/search" class="mobile-nav-link" @click="mobileMenuOpen = false">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              Search
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { searchItems, getCategoryLabel, type SearchItem } from '~/utils/searchData'

const mobileMenuOpen = ref(false)
const mobileSearchOpen = ref(false)
const mobileSearchQuery = ref('')
const mobileSuggestions = ref<SearchItem[]>([])
const mobileSelectedIndex = ref(-1)
const isSearching = ref(false)
const mobileSearchInput = ref<HTMLInputElement>()

// Desktop search state
const desktopSearchQuery = ref('')
const desktopSuggestions = ref<SearchItem[]>([])
const desktopSelectedIndex = ref(-1)
const isDesktopSearching = ref(false)
const showDesktopSuggestions = ref(false)
const desktopSearchInput = ref<HTMLInputElement>()

let searchTimer: NodeJS.Timeout
let desktopSearchTimer: NodeJS.Timeout

const popularSearches = ['asthma', 'heart', 'anxiety', 'headache', 'sleep']

// Debounced mobile search
const debouncedMobileSearch = () => {
  clearTimeout(searchTimer)
  isSearching.value = true
  
  searchTimer = setTimeout(() => {
    if (mobileSearchQuery.value.length >= 2) {
      mobileSuggestions.value = searchItems(mobileSearchQuery.value, 5)
    } else {
      mobileSuggestions.value = []
    }
    isSearching.value = false
  }, 300)
}

// Handle keyboard navigation for mobile
const handleMobileKeyDown = (e: KeyboardEvent) => {
  const total = mobileSuggestions.value.length
  
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      if (total > 0) {
        mobileSelectedIndex.value = (mobileSelectedIndex.value + 1) % total
      }
      break
    
    case 'ArrowUp':
      e.preventDefault()
      if (total > 0) {
        mobileSelectedIndex.value = mobileSelectedIndex.value <= 0 ? total - 1 : mobileSelectedIndex.value - 1
      }
      break
    
    case 'Enter':
      e.preventDefault()
      if (mobileSelectedIndex.value >= 0 && mobileSelectedIndex.value < total) {
        selectMobileSuggestion(mobileSuggestions.value[mobileSelectedIndex.value])
      } else if (mobileSearchQuery.value.trim()) {
        viewAllMobileResults()
      }
      break
    
    case 'Escape':
      e.preventDefault()
      mobileSearchOpen.value = false
      break
  }
}

// Select a mobile suggestion
const selectMobileSuggestion = (item: SearchItem) => {
  navigateTo(item.url)
  mobileSearchQuery.value = ''
  mobileSearchOpen.value = false
  mobileMenuOpen.value = false
}

// View all mobile results
const viewAllMobileResults = () => {
  if (mobileSearchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(mobileSearchQuery.value.trim())}`)
    mobileSearchQuery.value = ''
    mobileSearchOpen.value = false
  }
}

// Close search when menu opens and vice versa
watch(mobileMenuOpen, (newVal) => {
  if (newVal) mobileSearchOpen.value = false
})

watch(mobileSearchOpen, (newVal) => {
  if (newVal) {
    mobileMenuOpen.value = false
    // Focus input when search opens
    setTimeout(() => {
      mobileSearchInput.value?.focus()
    }, 100)
  }
})

// Reset selected index when suggestions change
watch(mobileSuggestions, () => {
  mobileSelectedIndex.value = -1
})

// Desktop search functions
const categorizedDesktopSuggestions = computed(() => {
  const categories = [
    { name: 'system', label: 'Body Systems', items: [] as SearchItem[] },
    { name: 'condition', label: 'Health Conditions', items: [] as SearchItem[] },
    { name: 'ailment', label: 'Common Issues', items: [] as SearchItem[] },
    { name: 'symptom', label: 'Symptoms', items: [] as SearchItem[] },
  ]
  
  desktopSuggestions.value.forEach(item => {
    const category = categories.find(c => c.name === item.category)
    if (category) {
      category.items.push(item)
    }
  })
  
  return categories
})

const getDesktopGlobalIndex = (categoryName: string, localIndex: number) => {
  let globalIdx = 0
  for (const cat of categorizedDesktopSuggestions.value) {
    if (cat.name === categoryName) {
      return globalIdx + localIndex
    }
    globalIdx += cat.items.length
  }
  return -1
}

const getDesktopItemByIndex = (index: number) => {
  let currentIdx = 0
  for (const cat of categorizedDesktopSuggestions.value) {
    if (currentIdx + cat.items.length > index) {
      return cat.items[index - currentIdx]
    }
    currentIdx += cat.items.length
  }
  return null
}

const debouncedDesktopSearch = () => {
  clearTimeout(desktopSearchTimer)
  isDesktopSearching.value = true
  
  desktopSearchTimer = setTimeout(() => {
    if (desktopSearchQuery.value.length >= 2) {
      desktopSuggestions.value = searchItems(desktopSearchQuery.value, 8)
    } else {
      desktopSuggestions.value = []
    }
    isDesktopSearching.value = false
    showDesktopSuggestions.value = true
  }, 300)
}

const handleDesktopKeyDown = (e: KeyboardEvent) => {
  const totalItems = desktopSuggestions.value.length
  
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      if (totalItems > 0) {
        desktopSelectedIndex.value = (desktopSelectedIndex.value + 1) % totalItems
      }
      break
    
    case 'ArrowUp':
      e.preventDefault()
      if (totalItems > 0) {
        desktopSelectedIndex.value = desktopSelectedIndex.value <= 0 ? totalItems - 1 : desktopSelectedIndex.value - 1
      }
      break
    
    case 'Enter':
      e.preventDefault()
      if (desktopSelectedIndex.value >= 0 && desktopSelectedIndex.value < totalItems) {
        const item = getDesktopItemByIndex(desktopSelectedIndex.value)
        if (item) {
          selectDesktopSuggestion(item)
        }
      } else {
        viewAllDesktopResults()
      }
      break
    
    case 'Escape':
      e.preventDefault()
      showDesktopSuggestions.value = false
      desktopSelectedIndex.value = -1
      break
  }
}

const selectDesktopSuggestion = (item: SearchItem) => {
  navigateTo(item.url)
  desktopSearchQuery.value = ''
  showDesktopSuggestions.value = false
  desktopSelectedIndex.value = -1
}

const viewAllDesktopResults = () => {
  if (desktopSearchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(desktopSearchQuery.value.trim())}`)
    desktopSearchQuery.value = ''
    showDesktopSuggestions.value = false
  }
}

const highlightDesktopMatch = (text: string) => {
  if (!desktopSearchQuery.value) return text
  
  const regex = new RegExp(`(${desktopSearchQuery.value})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 rounded">$1</mark>')
}

const onDesktopFocus = () => {
  if (desktopSearchQuery.value.length >= 2) {
    showDesktopSuggestions.value = true
  }
}

const hideDesktopSuggestions = () => {
  setTimeout(() => {
    showDesktopSuggestions.value = false
    desktopSelectedIndex.value = -1
  }, 200)
}

// Reset selected index when desktop suggestions change
watch(desktopSuggestions, () => {
  desktopSelectedIndex.value = -1
})
</script>

<style scoped>
.nav-link {
  @apply text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200;
}

.nav-link.router-link-active {
  @apply text-primary-600 font-semibold;
}

.mobile-nav-link {
  @apply block text-gray-700 hover:text-primary-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium;
}

.mobile-nav-link.router-link-active {
  @apply text-primary-600 bg-primary-50 font-semibold;
}

.search-button {
  @apply flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200;
}

.search-button.router-link-active {
  @apply text-primary-600 bg-primary-50 font-semibold;
}
</style>