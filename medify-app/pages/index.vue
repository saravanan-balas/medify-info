<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-50 to-primary-100 py-8 md:py-12">
      <div class="container-custom">
        <div class="text-center">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Medical Awareness <span class="text-primary-600">Made Simple</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
            By students, for students and families. Understanding common health issues in everyday language.
          </p>
          
          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto mb-6">
            <SearchBar />
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/symptoms" class="btn-primary">
              Explore Symptoms
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </NuxtLink>
            <NuxtLink to="/about" class="btn-secondary">
              Learn About Us
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Body Systems Section -->
    <section class="py-16">
      <div class="container-custom">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          Body Systems
        </h2>
        <p class="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Explore different body systems to understand how they work, why they're critical, and learn about common health issues affecting each system.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SystemCard 
            v-for="system in bodySystems" 
            :key="system.slug"
            :title="system.title"
            :description="system.description"
            :slug="system.slug"
            :icon="system.icon"
          />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Why Choose Medify.info?
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Simple Language</h3>
            <p class="text-gray-600">Medical information explained in everyday terms that everyone can understand.</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Visual Learning</h3>
            <p class="text-gray-600">Images, diagrams, and videos to help you better understand health conditions.</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">By Students, For Students</h3>
            <p class="text-gray-600">Created by students who understand what you need to know about health.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
      <div class="container-custom text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Join Our Mission
        </h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Help us spread health awareness and make medical information accessible to everyone.
        </p>
        <NuxtLink to="/join" class="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center gap-2">
          Become a Volunteer
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
</script>