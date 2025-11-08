<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-50 to-primary-100 py-8 md:py-12 relative overflow-hidden">
      <!-- Decorative background elements -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-10 left-10 w-64 h-64 bg-primary-600 rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-secondary-500 rounded-full blur-3xl"></div>
      </div>
      
      <div class="container-custom relative z-10">
        <div class="grid md:grid-cols-[40%_60%] gap-8 items-center">
          <!-- Left: Hero Image -->
          <div class="hidden md:block relative order-2 md:order-1">
            <div class="relative">
              <div class="w-full h-96 rounded-2xl overflow-hidden shadow-xl relative">
                <img 
                  :src="heroImage" 
                  alt="Medical education and healthcare"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-secondary-500/20"></div>
                <!-- Decorative overlay elements -->
                <div class="absolute top-4 right-4 w-24 h-24 bg-white rounded-full opacity-20 backdrop-blur-sm"></div>
                <div class="absolute bottom-4 left-4 w-32 h-32 bg-white rounded-full opacity-20 backdrop-blur-sm"></div>
              </div>
            </div>
          </div>
          
          <!-- Right: Text Content -->
          <div class="text-center md:text-left order-1 md:order-2">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Medical Awareness <span class="text-primary-600">Made Simple</span>
            </h1>
            <p class="text-lg md:text-xl text-gray-700 mb-6 max-w-3xl mx-auto md:mx-0">
              By students, for students and families. Understanding common health issues in everyday language.
            </p>
            
            <!-- Search Bar -->
            <div class="max-w-3xl mx-auto md:mx-0 mb-6">
              <SearchBar />
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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
      </div>
    </section>

    <!-- Body Systems Section -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Body Systems
          </h2>
          <p class="text-center text-gray-600 mb-6 max-w-3xl mx-auto">
            Explore different body systems to understand how they work, why they're critical, and learn about common health issues affecting each system.
          </p>
          <!-- Decorative medical illustration -->
          <div class="flex justify-center items-center gap-4 mb-8 opacity-20">
            <div class="text-4xl">❤️</div>
            <div class="text-4xl">🫁</div>
            <div class="text-4xl">🧠</div>
            <div class="text-4xl">👁️</div>
            <div class="text-4xl">🫘</div>
            <div class="text-4xl">👂</div>
            <div class="text-4xl">🍽️</div>
          </div>
        </div>
        
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
          <div class="text-center bg-gradient-to-br from-primary-50 via-primary-100/50 to-white rounded-xl p-8 hover:shadow-lg transition-shadow overflow-hidden relative border border-primary-100">
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary-200 rounded-full -mr-16 -mt-16 opacity-30"></div>
            <div class="relative">
              <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <svg class="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                <div class="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full opacity-20"></div>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Simple Language</h3>
              <p class="text-gray-600">Medical information explained in everyday terms that everyone can understand.</p>
            </div>
          </div>
          
          <div class="text-center bg-gradient-to-br from-secondary-50 via-secondary-100/50 to-white rounded-xl p-8 hover:shadow-lg transition-shadow overflow-hidden relative border border-secondary-100">
            <div class="absolute top-0 right-0 w-32 h-32 bg-secondary-200 rounded-full -mr-16 -mt-16 opacity-30"></div>
            <div class="relative">
              <div class="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <div class="w-full h-full rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=200&fit=crop&q=80" 
                    alt="Medical education"
                    class="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div class="absolute -top-2 -right-2 w-6 h-6 bg-secondary-500 rounded-full opacity-20"></div>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Visual Learning</h3>
              <p class="text-gray-600">Images, diagrams, and videos to help you better understand health conditions.</p>
            </div>
          </div>
          
          <div class="text-center bg-gradient-to-br from-primary-50 via-primary-100/50 to-white rounded-xl p-8 hover:shadow-lg transition-shadow overflow-hidden relative border border-primary-100">
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary-200 rounded-full -mr-16 -mt-16 opacity-30"></div>
            <div class="relative">
              <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <div class="w-full h-full rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop&q=80" 
                    alt="Students learning"
                    class="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div class="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full opacity-20"></div>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">By Students, For Students</h3>
              <p class="text-gray-600">Created by students who understand what you need to know about health.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-primary-600 to-primary-700 relative overflow-hidden">
      <!-- Decorative background pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 50px 50px;"></div>
      </div>
      
      <!-- Medical icons decoration -->
      <div class="absolute inset-0 opacity-5 flex items-center justify-center">
        <div class="text-9xl">🏥</div>
      </div>
      
      <div class="container-custom text-center relative z-10">
        <div class="max-w-3xl mx-auto">
          <div class="mb-6 flex justify-center">
            <div class="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Mission
          </h2>
          <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Help us spread health awareness and make medical information accessible to everyone.
          </p>
          <NuxtLink to="/join" class="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center gap-2 shadow-lg">
            Become a Volunteer
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import heroImage from '~/assets/hero.png'

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