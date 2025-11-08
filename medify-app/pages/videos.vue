<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container-custom">
      <h1 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
        Video Library
      </h1>
      <p class="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
        Educational videos from medical professionals explaining health topics and body systems in simple, easy-to-understand ways. Perfect for students and families.
      </p>
      
      <div class="max-w-3xl mx-auto mb-12 bg-green-50 border border-green-200 rounded-lg p-4">
        <p class="text-sm text-green-800">
          <strong>Educational Content:</strong> All videos are from reputable sources including TED-Ed, medical educators, and professional medical animation channels. Perfect for learning about health and body systems!
        </p>
      </div>

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
            <p class="text-sm text-gray-600 mb-2">{{ video.description }}</p>
            <p class="text-xs text-primary-600 font-medium mb-3">{{ video.doctor }}</p>
            <div class="flex items-center justify-between">
              <span class="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded">
                {{ video.category }}
              </span>
              <span class="text-xs text-gray-500">{{ video.level }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Reference Section -->
      <div class="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Video Reference</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div class="text-center">
            <div class="text-2xl mb-2">🍽️</div>
            <div class="font-medium text-gray-700">Digestive System</div>
            <div class="text-xs text-gray-500">Videos 1, 5</div>
          </div>
          <div class="text-center">
            <div class="text-2xl mb-2">❤️</div>
            <div class="font-medium text-gray-700">Heart Health</div>
            <div class="text-xs text-gray-500">Videos 6-7</div>
          </div>
          <div class="text-center">
            <div class="text-2xl mb-2">🫁</div>
            <div class="font-medium text-gray-700">Lungs & Breathing</div>
            <div class="text-xs text-gray-500">Videos 9, 11</div>
          </div>
          <div class="text-center">
            <div class="text-2xl mb-2">🧠</div>
            <div class="font-medium text-gray-700">Brain & Nervous</div>
            <div class="text-xs text-gray-500">Videos 12-14</div>
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
  // Digestive System Videos
  {
    id: 1,
    title: 'How your digestive system works',
    description: 'TED-Ed animation explaining how food travels through the digestive tract and how nutrients are absorbed',
    category: 'Animations',
    duration: '4:32',
    views: '6.2M',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/Og5xAdC8EUI',
    doctor: 'TED-Ed Educational Animation'
  },
  {
    id: 5,
    title: 'The Digestive System - Crash Course',
    description: 'Comprehensive overview of digestive system anatomy and function for students',
    category: 'Animations',
    duration: '11:53',
    views: '2.1M',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/s06XzaKqELk',
    doctor: 'Crash Course Biology'
  },
  // Heart & Cardiovascular Videos
  {
    id: 6,
    title: 'How Your Heart Works - Medical Animation',
    description: 'Detailed animation explaining heart anatomy, blood flow, and cardiovascular function',
    category: 'Animations',
    duration: '3:45',
    views: '4.5M',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/7XaftdE_h60',
    doctor: 'Nucleus Medical Media'
  },
  {
    id: 7,
    title: 'How Blood Flows Through the Heart',
    description: 'TED-Ed animation explaining the cardiac cycle and blood circulation',
    category: 'Animations',
    duration: '4:28',
    views: '3.2M',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/CWFyxn0qDEU',
    doctor: 'TED-Ed Educational Animation'
  },
  // Respiratory System Videos
  {
    id: 9,
    title: 'How Your Lungs Work',
    description: 'TED-Ed animation explaining the respiratory system and how breathing works',
    category: 'Animations',
    duration: '3:52',
    views: '3.8M',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/8NUxvJS-_0k',
    doctor: 'TED-Ed Educational Animation'
  },
  {
    id: 11,
    title: 'Understanding Asthma',
    description: 'Medical explanation of asthma causes, symptoms, and management',
    category: 'Explanations',
    duration: '4:12',
    views: '1.1M',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/PzfLDi-sL3w',
    doctor: 'American Lung Association'
  },
  // Nervous System Videos
  {
    id: 12,
    title: 'How Your Brain Works',
    description: 'Crash Course explains the nervous system and brain function in simple terms',
    category: 'Explanations',
    duration: '10:08',
    views: '5.2M',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/vHrmiy4W9C0',
    doctor: 'Crash Course Psychology'
  },
  {
    id: 13,
    title: 'The Nervous System - Crash Course',
    description: 'Comprehensive overview of the nervous system anatomy and function',
    category: 'Animations',
    duration: '10:36',
    views: '3.9M',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/qPix_X-9t7E',
    doctor: 'Crash Course Anatomy & Physiology'
  },
  {
    id: 14,
    title: 'Understanding Anxiety and Stress',
    description: 'Medical explanation of how anxiety affects the body and mind',
    category: 'Explanations',
    duration: '5:33',
    views: '2.3M',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/WWloIAQpMcQ',
    doctor: 'TED-Ed Educational Animation'
  },
  // Kidney & Urinary System Videos
  {
    id: 15,
    title: 'How Your Kidneys Work',
    description: 'Medical animation explaining kidney function, filtration, and waste removal',
    category: 'Animations',
    duration: '3:55',
    views: '2.1M',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/FN3MFhYPWWo',
    doctor: 'Nucleus Medical Media'
  },
  {
    id: 16,
    title: 'The Urinary System - Crash Course',
    description: 'Educational overview of the urinary system and kidney function',
    category: 'Animations',
    duration: '10:18',
    views: '1.8M',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/l128tW1H5a8',
    doctor: 'Crash Course Anatomy & Physiology'
  },
]

const filteredVideos = computed(() => {
  if (selectedCategory.value === 'All') {
    return videos
  }
  return videos.filter(video => video.category === selectedCategory.value)
})
</script>