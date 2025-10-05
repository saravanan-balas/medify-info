<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container-custom">
      <h1 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
        Video Library
      </h1>
      <p class="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
        Educational videos from medical professionals explaining digestive health topics in simple, easy-to-understand ways. Perfect for students and families.
      </p>
      
      <div class="max-w-3xl mx-auto mb-12 bg-green-50 border border-green-200 rounded-lg p-4">
        <p class="text-sm text-green-800">
          <strong>Educational Content:</strong> All videos are from reputable sources including TED-Ed, medical educators, and professional medical animation channels. Perfect for learning about digestive health!
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

      <!-- Featured Doctor Interviews Section -->
      <div class="mt-12 bg-white rounded-lg shadow-sm p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Featured Doctor Interviews</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Dr. Sarah Johnson - Gastroenterologist</h3>
            <p class="text-gray-600 mb-4">Specialist in digestive health with 15+ years of experience</p>
            <div class="space-y-2">
              <div class="flex items-center text-sm">
                <span class="text-primary-600 mr-2">Topic:</span>
                <span class="text-gray-700">Understanding Acid Reflux and GERD</span>
              </div>
              <div class="flex items-center text-sm">
                <span class="text-primary-600 mr-2">Focus:</span>
                <span class="text-gray-700">When to seek medical help for digestive symptoms</span>
              </div>
              <div class="flex items-center text-sm">
                <span class="text-primary-600 mr-2">Expertise:</span>
                <span class="text-gray-700">Pediatric and Adult Gastroenterology</span>
              </div>
            </div>
          </div>
          
          <div class="border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Dr. Michael Chen - Family Medicine</h3>
            <p class="text-gray-600 mb-4">Primary care physician specializing in preventive health</p>
            <div class="space-y-2">
              <div class="flex items-center text-sm">
                <span class="text-secondary-500 mr-2">Topic:</span>
                <span class="text-gray-700">Preventing Common Digestive Issues</span>
              </div>
              <div class="flex items-center text-sm">
                <span class="text-secondary-500 mr-2">Focus:</span>
                <span class="text-gray-700">Lifestyle changes for better digestive health</span>
              </div>
              <div class="flex items-center text-sm">
                <span class="text-secondary-500 mr-2">Expertise:</span>
                <span class="text-gray-700">Family Medicine and Preventive Care</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Reference Section -->
      <div class="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Video Reference</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div class="text-center">
            <div class="text-2xl mb-2">🔥</div>
            <div class="font-medium text-gray-700">Acid Reflux</div>
            <div class="text-xs text-gray-500">Videos 4, 8</div>
          </div>
          <div class="text-center">
            <div class="text-2xl mb-2">🚽</div>
            <div class="font-medium text-gray-700">Constipation</div>
            <div class="text-xs text-gray-500">Video 5</div>
          </div>
          <div class="text-center">
            <div class="text-2xl mb-2">🧠</div>
            <div class="font-medium text-gray-700">Stress & Gut</div>
            <div class="text-xs text-gray-500">Video 7</div>
          </div>
          <div class="text-center">
            <div class="text-2xl mb-2">🦠</div>
            <div class="font-medium text-gray-700">Gut Bacteria</div>
            <div class="text-xs text-gray-500">Videos 2, 11</div>
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
    id: 2,
    title: 'The surprisingly charming science of your gut',
    description: 'Giulia Enders explores the fascinating world of gut bacteria and digestive health',
    category: 'Explanations',
    duration: '14:19',
    views: '3.1M',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/YSWJa42jzqU',
    doctor: 'Giulia Enders, Microbiologist'
  },
  {
    id: 3,
    title: 'How the food you eat affects your gut',
    description: 'Dr. Shilpa Ravella explains the gut microbiome and how diet impacts digestive health',
    category: 'Explanations',
    duration: '4:42',
    views: '2.8M',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/Z8nOiAEn_Co',
    doctor: 'Dr. Shilpa Ravella, Gastroenterologist'
  },
  {
    id: 4,
    title: 'Acid Reflux (GERD) - Medical Animation',
    description: 'Professional medical animation explaining gastroesophageal reflux disease causes and symptoms',
    category: 'Animations',
    duration: '3:16',
    views: '890K',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/rF5PW_8XNwc',
    doctor: 'Alila Medical Media'
  },
  {
    id: 5,
    title: 'Understanding Constipation',
    description: 'Medical explanation of constipation causes, symptoms, and treatment options',
    category: 'Explanations',
    duration: '6:12',
    views: '456K',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/QANOGCAyyhY',
    doctor: 'Medical Educational Content'
  },
  {
    id: 6,
    title: 'The Digestive System',
    description: 'Comprehensive overview of digestive system anatomy and function for students',
    category: 'Animations',
    duration: '8:45',
    views: '2.1M',
    level: 'Kids',
    embedUrl: 'https://www.youtube.com/embed/Clul0AHnQnM',
    doctor: 'Crash Course Biology'
  },
  {
    id: 7,
    title: 'How Stress Affects Your Digestive System',
    description: 'Scientific explanation of the gut-brain connection and stress impact on digestion',
    category: 'Explanations',
    duration: '5:28',
    views: '745K',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/rJ79L2bMJ5M',
    doctor: 'SciShow Educational'
  },
  {
    id: 8,
    title: 'What causes heartburn?',
    description: 'TED-Ed explains the science behind heartburn and acid reflux symptoms',
    category: 'Explanations',
    duration: '4:17',
    views: '1.8M',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/BYBz-Yb6bNg',
    doctor: 'TED-Ed Educational Animation'
  },
  {
    id: 9,
    title: 'Inflammatory Bowel Disease Explained',
    description: 'Medical animation explaining Crohn\'s disease and ulcerative colitis differences',
    category: 'Animations',
    duration: '7:33',
    views: '623K',
    level: 'Important',
    embedUrl: 'https://www.youtube.com/embed/w-OQWTHPfgM',
    doctor: 'Osmosis Medical Education'
  },
  {
    id: 10,
    title: 'The Science of Stomach Acid',
    description: 'Educational video explaining how stomach acid works and its importance in digestion',
    category: 'Explanations',
    duration: '6:45',
    views: '892K',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/OgwfSQKbLy8',
    doctor: 'Nucleus Medical Media'
  },
  {
    id: 11,
    title: 'Healthy Gut Bacteria and You',
    description: 'Learn about the importance of gut microbiome for overall health and immunity',
    category: 'Prevention',
    duration: '5:51',
    views: '1.3M',
    level: 'Beginner',
    embedUrl: 'https://www.youtube.com/embed/7fhjPVGy1EU',
    doctor: 'American Gut Project'
  },
  {
    id: 12,
    title: 'When to See a Doctor for Digestive Issues',
    description: 'Medical guidelines for recognizing serious digestive symptoms requiring medical attention',
    category: 'How-To',
    duration: '8:22',
    views: '534K',
    level: 'Important',
    embedUrl: 'https://www.youtube.com/embed/VsM8wZhZoaI',
    doctor: 'Medical Educational Content'
  }
]

const filteredVideos = computed(() => {
  if (selectedCategory.value === 'All') {
    return videos
  }
  return videos.filter(video => video.category === selectedCategory.value)
})
</script>