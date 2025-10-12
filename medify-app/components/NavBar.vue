<template>
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="container-custom">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
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

        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink to="/" class="nav-link">Home</NuxtLink>
          <NuxtLink to="/symptoms" class="nav-link">Symptoms</NuxtLink>
          <NuxtLink to="/interviews" class="nav-link">Interviews</NuxtLink>
          <NuxtLink to="/gallery" class="nav-link">Gallery</NuxtLink>
          <NuxtLink to="/videos" class="nav-link">Videos</NuxtLink>
          <NuxtLink to="/about" class="nav-link">About</NuxtLink>
          <NuxtLink to="/join" class="nav-link">Join Us</NuxtLink>
          
          <!-- Search Button -->
          <NuxtLink to="/search" class="search-button">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <span class="hidden lg:inline">Search</span>
          </NuxtLink>
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
          <NuxtLink to="/symptoms" class="mobile-nav-link" @click="mobileMenuOpen = false">Symptoms</NuxtLink>
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
import { ref, watch, onMounted } from 'vue'
import { searchItems, type SearchItem } from '~/utils/searchData'

const mobileMenuOpen = ref(false)
const mobileSearchOpen = ref(false)
const mobileSearchQuery = ref('')
const mobileSuggestions = ref<SearchItem[]>([])
const mobileSelectedIndex = ref(-1)
const isSearching = ref(false)
const mobileSearchInput = ref<HTMLInputElement>()

let searchTimer: NodeJS.Timeout

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