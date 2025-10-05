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
            <img 
              :src="image.imageUrl" 
              :alt="image.title"
              class="w-full h-full object-cover rounded"
              @error="handleImageError"
            />
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
              <img 
                :src="selectedImage.imageUrl" 
                :alt="selectedImage.title"
                class="w-full h-auto rounded"
                @error="handleImageError"
              />
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
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center',
    educationalNote: 'The digestive system breaks down food into nutrients your body can absorb. Understanding how it works helps you recognize when something is wrong.'
  },
  {
    id: 2,
    title: 'Common Stomach Pain Locations',
    description: 'Where different types of pain occur in the abdomen',
    category: 'Symptoms',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&crop=center',
    educationalNote: 'Different areas of abdominal pain can indicate different conditions. This diagram helps identify where pain is located.'
  },
  {
    id: 3,
    title: 'How Acid Reflux Happens',
    description: 'Visual explanation of acid reflux mechanism',
    category: 'Digestive System',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop&crop=center',
    educationalNote: 'Acid reflux occurs when stomach acid backs up into the esophagus, causing heartburn and discomfort.'
  },
  {
    id: 4,
    title: 'Proper Hydration Guide',
    description: 'How much water you should drink daily',
    category: 'Prevention',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-5d4c2b8a1a8a?w=800&h=600&fit=crop&crop=center',
    educationalNote: 'Staying properly hydrated is essential for digestive health and preventing constipation.'
  },
  {
    id: 5,
    title: 'BRAT Diet Foods',
    description: 'Foods to eat when recovering from stomach issues',
    category: 'Treatment',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop&crop=center',
    educationalNote: 'The BRAT diet (Bananas, Rice, Applesauce, Toast) helps settle upset stomachs and firm up stools.'
  },
  {
    id: 6,
    title: 'Warning Signs to See a Doctor',
    description: 'Symptoms that require medical attention',
    category: 'Symptoms',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba0ef08?w=800&h=600&fit=crop&crop=center',
    educationalNote: 'Certain symptoms indicate serious conditions that need immediate medical evaluation.'
  },
  {
    id: 7,
    title: 'Constipation Prevention',
    description: 'Foods and habits that promote regular bowel movements',
    category: 'Prevention',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop&crop=center',
    educationalNote: 'High-fiber foods, adequate water intake, and regular exercise help prevent constipation.'
  },
  {
    id: 8,
    title: 'Motion Sickness Prevention',
    description: 'Tips to prevent travel sickness',
    category: 'Prevention',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&crop=center',
    educationalNote: 'Looking at the horizon, avoiding reading, and sitting in the front seat can help prevent motion sickness.'
  },
  {
    id: 9,
    title: 'Bloating Relief Techniques',
    description: 'Simple methods to reduce bloating',
    category: 'Treatment',
    imageUrl: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&h=600&fit=crop&crop=center',
    educationalNote: 'Gentle exercise, peppermint tea, and avoiding gas-producing foods can help reduce bloating.'
  },
  {
    id: 10,
    title: 'Healthy Gut Bacteria',
    description: 'Foods that promote good digestive health',
    category: 'Prevention',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop&crop=center',
    educationalNote: 'Probiotic foods like yogurt and fermented foods help maintain healthy gut bacteria.'
  },
  {
    id: 11,
    title: 'Stress and Digestion',
    description: 'How stress affects your digestive system',
    category: 'Symptoms',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center',
    educationalNote: 'Stress can cause digestive issues like stomach pain, nausea, and changes in bowel habits.'
  },
  {
    id: 12,
    title: 'When to Seek Medical Help',
    description: 'Red flag symptoms that need immediate attention',
    category: 'Symptoms',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&crop=center',
    educationalNote: 'Severe pain, blood in stool, persistent vomiting, or unexplained weight loss require immediate medical evaluation.'
  }
]

const filteredImages = computed(() => {
  if (selectedCategory.value === 'All') {
    return images
  }
  return images.filter(img => img.category === selectedCategory.value)
})

// Handle image loading errors
const handleImageError = (event) => {
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCA4MEgxMjBWMTIwSDgwVjgwWiIgZmlsbD0iI0QxRTVEQiIvPgo8cGF0aCBkPSJNODUgODVIMTE1VjExNUg4NVY4NVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'
}
</script>