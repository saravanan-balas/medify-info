<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container-custom">
      <h1 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
        Video Library
      </h1>
      <p class="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Educational videos explaining health topics in simple, easy-to-understand ways
      </p>

      <!-- Filter Tabs -->
      <div class="flex flex-wrap justify-center gap-2 mb-8">
        <button 
          v-for="category in categories" 
          :key="category"
          @click="selectedCategory = category"
          :class="selectedCategory === category ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'"
          class="px-4 py-2 rounded-full font-medium transition-colors hover:bg-primary-100"
        >
          {{ category }}
        </button>
      </div>

      <!-- Video Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="video in filteredVideos" :key="video.id" 
          class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div class="aspect-video bg-gray-200 relative group cursor-pointer">
            <iframe 
              :src="video.embedUrl" 
              class="w-full h-full"
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-1">{{ video.title }}</h3>
            <p class="text-sm text-gray-500 mb-2">{{ video.duration }} • {{ video.views }} views</p>
            <p class="text-sm text-gray-600 mb-3">{{ video.description }}</p>
            <div class="flex items-center justify-between">
              <span class="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded">
                {{ video.category }}
              </span>
              <span class="text-xs text-gray-500">{{ video.level }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Educational Series Section -->
      <div class="mt-12 bg-white rounded-lg shadow-sm p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Educational Series</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Digestive Health 101</h3>
            <p class="text-gray-600 mb-4">A 5-part series covering everything about your digestive system</p>
            <div class="space-y-2">
              <div class="flex items-center text-sm">
                <span class="text-primary-600 mr-2">Episode 1:</span>
                <span class="text-gray-700">How Digestion Works</span>
              </div>
              <div class="flex items-center text-sm">
                <span class="text-primary-600 mr-2">Episode 2:</span>
                <span class="text-gray-700">Common Digestive Problems</span>
              </div>
              <div class="flex items-center text-sm">
                <span class="text-primary-600 mr-2">Episode 3:</span>
                <span class="text-gray-700">Foods for Gut Health</span>
              </div>
            </div>
          </div>
          
          <div class="border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Prevention & Wellness</h3>
            <p class="text-gray-600 mb-4">Learn how to prevent common health issues before they start</p>
            <div class="space-y-2">
              <div class="flex items-center text-sm">
                <span class="text-secondary-500 mr-2">Episode 1:</span>
                <span class="text-gray-700">Healthy Eating Habits</span>
              </div>
              <div class="flex items-center text-sm">
                <span class="text-secondary-500 mr-2">Episode 2:</span>
                <span class="text-gray-700">Exercise for Digestive Health</span>
              </div>
              <div class="flex items-center text-sm">
                <span class="text-secondary-500 mr-2">Episode 3:</span>
                <span class="text-gray-700">Stress and Your Stomach</span>
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

const selectedCategory = ref('All')

const categories = ['All', 'Explanations', 'How-To', 'Prevention', 'Animations']

const videos = [
  {
    id: 1,
    title: 'What Causes Stomach Pain?',
    description: 'Simple explanation of different types of stomach pain',
    category: 'Explanations',
    duration: '5:30',
    views: '1.2K',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 2,
    title: 'How to Manage Acid Reflux',
    description: 'Practical tips for dealing with heartburn',
    category: 'How-To',
    duration: '7:45',
    views: '856',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 3,
    title: 'Preventing Constipation',
    description: 'Daily habits to keep your digestive system healthy',
    category: 'Prevention',
    duration: '6:20',
    views: '2.1K',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 4,
    title: 'Your Digestive System Animated',
    description: 'Fun animation showing how digestion works',
    category: 'Animations',
    duration: '4:15',
    views: '3.5K',
    level: 'Kids',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 5,
    title: 'Motion Sickness Tips',
    description: 'How to prevent and manage travel sickness',
    category: 'How-To',
    duration: '8:00',
    views: '1.8K',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 6,
    title: 'When to See a Doctor',
    description: 'Warning signs that need medical attention',
    category: 'Explanations',
    duration: '9:30',
    views: '4.2K',
    level: 'Important',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
]

const filteredVideos = computed(() => {
  if (selectedCategory.value === 'All') {
    return videos
  }
  return videos.filter(video => video.category === selectedCategory.value)
})
</script>