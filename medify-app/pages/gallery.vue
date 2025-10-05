<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container-custom">
      <h1 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
        Image Library
      </h1>
      <p class="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Visual guides and diagrams to help you better understand health conditions
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

      <!-- Image Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="image in filteredImages" :key="image.id" 
          class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          @click="selectedImage = image">
          <div class="aspect-video bg-gray-100 p-4">
            <div class="w-full h-full bg-gray-200 rounded flex items-center justify-center">
              <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-1">{{ image.title }}</h3>
            <p class="text-sm text-gray-600">{{ image.description }}</p>
            <span class="inline-block mt-2 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {{ image.category }}
            </span>
          </div>
        </div>
      </div>

      <!-- Image Modal -->
      <div v-if="selectedImage" 
        class="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
        @click="selectedImage = null">
        <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto" @click.stop>
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h2 class="text-2xl font-bold text-gray-900">{{ selectedImage.title }}</h2>
                <p class="text-gray-600 mt-1">{{ selectedImage.description }}</p>
              </div>
              <button @click="selectedImage = null" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div class="bg-gray-100 rounded-lg p-8">
              <div class="aspect-video bg-gray-200 rounded flex items-center justify-center">
                <svg class="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 p-4 bg-gray-50 rounded">
              <p class="text-sm text-gray-600">
                <strong>Educational Note:</strong> {{ selectedImage.educationalNote }}
              </p>
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
const selectedImage = ref(null)

const categories = ['All', 'Digestive System', 'Symptoms', 'Prevention', 'Treatment']

const images = [
  {
    id: 1,
    title: 'The Digestive System',
    description: 'Overview of how your digestive system works',
    category: 'Digestive System',
    educationalNote: 'The digestive system breaks down food into nutrients your body can absorb. Understanding how it works helps you recognize when something is wrong.'
  },
  {
    id: 2,
    title: 'Common Stomach Pain Locations',
    description: 'Where different types of pain occur in the abdomen',
    category: 'Symptoms',
    educationalNote: 'Different areas of abdominal pain can indicate different conditions. This diagram helps identify where pain is located.'
  },
  {
    id: 3,
    title: 'How Acid Reflux Happens',
    description: 'Visual explanation of acid reflux mechanism',
    category: 'Digestive System',
    educationalNote: 'Acid reflux occurs when stomach acid backs up into the esophagus, causing heartburn and discomfort.'
  },
  {
    id: 4,
    title: 'Proper Hydration Guide',
    description: 'How much water you should drink daily',
    category: 'Prevention',
    educationalNote: 'Staying properly hydrated is essential for digestive health and preventing constipation.'
  },
  {
    id: 5,
    title: 'BRAT Diet Foods',
    description: 'Foods to eat when recovering from stomach issues',
    category: 'Treatment',
    educationalNote: 'The BRAT diet (Bananas, Rice, Applesauce, Toast) helps settle upset stomachs and firm up stools.'
  },
  {
    id: 6,
    title: 'Warning Signs to See a Doctor',
    description: 'Symptoms that require medical attention',
    category: 'Symptoms',
    educationalNote: 'Certain symptoms indicate serious conditions that need immediate medical evaluation.'
  }
]

const filteredImages = computed(() => {
  if (selectedCategory.value === 'All') {
    return images
  }
  return images.filter(img => img.category === selectedCategory.value)
})
</script>