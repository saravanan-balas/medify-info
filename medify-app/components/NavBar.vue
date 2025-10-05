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

        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink to="/" class="nav-link">Home</NuxtLink>
          <NuxtLink to="/symptoms" class="nav-link">Symptoms</NuxtLink>
          <NuxtLink to="/interviews" class="nav-link">Interviews</NuxtLink>
          <NuxtLink to="/gallery" class="nav-link">Gallery</NuxtLink>
          <NuxtLink to="/videos" class="nav-link">Videos</NuxtLink>
          <NuxtLink to="/about" class="nav-link">About</NuxtLink>
          <NuxtLink to="/join" class="nav-link">Join Us</NuxtLink>
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

      <div v-if="mobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 border-t">
          <NuxtLink to="/" class="mobile-nav-link" @click="mobileMenuOpen = false">Home</NuxtLink>
          <NuxtLink to="/symptoms" class="mobile-nav-link" @click="mobileMenuOpen = false">Symptoms</NuxtLink>
          <NuxtLink to="/interviews" class="mobile-nav-link" @click="mobileMenuOpen = false">Interviews</NuxtLink>
          <NuxtLink to="/gallery" class="mobile-nav-link" @click="mobileMenuOpen = false">Gallery</NuxtLink>
          <NuxtLink to="/videos" class="mobile-nav-link" @click="mobileMenuOpen = false">Videos</NuxtLink>
          <NuxtLink to="/about" class="mobile-nav-link" @click="mobileMenuOpen = false">About</NuxtLink>
          <NuxtLink to="/join" class="mobile-nav-link" @click="mobileMenuOpen = false">Join Us</NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
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
</style>