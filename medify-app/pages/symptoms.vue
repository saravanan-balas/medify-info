<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 py-12">
    <div class="container-custom">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg mb-6">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-primary-800 bg-clip-text text-transparent mb-4">
          Common Conditions
        </h1>
        <p class="text-lg text-gray-600 mb-2 max-w-3xl mx-auto leading-relaxed">
          Click on any condition below to learn more about its symptoms, causes, and treatments.
        </p>
        <div class="flex items-center justify-center space-x-4 text-sm text-primary-600">
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{{ allConditions.length }} conditions available</span>
          </div>
          <div class="w-px h-4 bg-primary-300"></div>
          <NuxtLink to="/" class="flex items-center space-x-2 hover:text-primary-700 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            <span>Explore Body Systems</span>
          </NuxtLink>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div v-if="conditions.length === 0" class="col-span-full text-center py-12">
          <div class="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">No conditions found</h3>
          <p class="text-gray-500">Try searching with different keywords or browse all conditions below.</p>
        </div>
        
        <NuxtLink 
          v-for="condition in conditions" 
          :key="condition.slug" 
          :to="`/conditions/${condition.slug}`"
          class="relative bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:shadow-primary-100/50 hover:-translate-y-1 hover:border-primary-300 transition-all duration-300 cursor-pointer group overflow-hidden"
        >
          <!-- Background decoration -->
          <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-50 to-primary-100 rounded-bl-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
          
          <!-- Icon and title section -->
          <div class="relative flex items-start mb-4">
            <div class="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
              <span class="text-primary-600 text-2xl">{{ condition.icon }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors leading-tight">{{ condition.name }}</h3>
              <div class="w-12 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full mt-2 group-hover:w-16 transition-all duration-300"></div>
            </div>
          </div>
          
          <!-- Description -->
          <p class="text-gray-600 mb-5 leading-relaxed">{{ condition.description }}</p>
          
          <!-- Hover instruction -->
          <div class="flex items-center justify-end mt-4 pt-3 border-t border-gray-100">
            <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center text-primary-600">
              <span class="text-sm mr-2">Learn more</span>
              <svg class="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')


const allConditions = [
  {
    name: 'Acid Reflux',
    slug: 'acid-reflux',
    icon: '🔥',
    description: 'Stomach acid backing up into the esophagus causing heartburn'
  },
  {
    name: 'Anxiety & Stress',
    slug: 'anxiety-stress',
    icon: '😰',
    description: 'Feelings of worry, nervousness, or tension'
  },
  {
    name: 'Asthma',
    slug: 'asthma',
    icon: '🫁',
    description: 'Breathing condition causing wheezing and shortness of breath'
  },
  {
    name: 'Belly Pain',
    slug: 'belly-pain',
    icon: '🤕',
    description: 'Discomfort or pain in the abdominal area'
  },
  {
    name: 'Bloating',
    slug: 'bloating',
    icon: '🎈',
    description: 'Feeling of fullness or swelling in the abdomen'
  },
  {
    name: 'Blood in Poop',
    slug: 'blood-in-poop',
    icon: '🩸',
    description: 'Presence of blood in bowel movements'
  },
  {
    name: 'Bronchitis',
    slug: 'bronchitis',
    icon: '😷',
    description: 'Inflammation of the bronchial tubes causing cough and mucus'
  },
  {
    name: 'Cataracts',
    slug: 'cataracts',
    icon: '👁️',
    description: 'Clouding of the eye lens affecting vision'
  },
  {
    name: 'Common Cold & Flu',
    slug: 'common-cold-flu',
    icon: '🤧',
    description: 'Viral infections affecting the nose, throat, and airways'
  },
  {
    name: 'Constipation',
    slug: 'constipation',
    icon: '🚽',
    description: 'Difficulty passing stools or infrequent bowel movements'
  },
  {
    name: 'COPD',
    slug: 'copd',
    icon: '💨',
    description: 'Chronic lung disease making it hard to breathe'
  },
  {
    name: 'Depression',
    slug: 'depression',
    icon: '😔',
    description: 'Persistent feelings of sadness and loss of interest'
  },
  {
    name: 'Diarrhea',
    slug: 'diarrhea',
    icon: '💩',
    description: 'Loose, watery stools occurring more frequently than usual'
  },
  {
    name: 'Farsightedness',
    slug: 'hyperopia',
    icon: '🔭',
    description: 'Difficulty seeing nearby objects clearly'
  },
  {
    name: 'Glaucoma',
    slug: 'glaucoma',
    icon: '👓',
    description: 'Eye condition damaging the optic nerve'
  },
  {
    name: 'Headaches & Migraines',
    slug: 'headaches-migraines',
    icon: '🤯',
    description: 'Pain in the head ranging from mild to severe'
  },
  {
    name: 'Hearing Loss',
    slug: 'hearing-loss',
    icon: '👂',
    description: 'Partial or complete inability to hear sounds'
  },
  {
    name: 'Heart Disease',
    slug: 'heart-disease',
    icon: '💔',
    description: 'Various conditions affecting heart function and structure'
  },
  {
    name: 'High Blood Pressure',
    slug: 'hypertension',
    icon: '❤️',
    description: 'Elevated blood pressure that can damage blood vessels'
  },
  {
    name: 'Kidney Stones',
    slug: 'kidney-stones',
    icon: '🪨',
    description: 'Hard deposits forming in the kidneys causing severe pain'
  },
  {
    name: 'Memory Issues',
    slug: 'memory-issues',
    icon: '🧠',
    description: 'Difficulty remembering information or forgetfulness'
  },
  {
    name: 'Nearsightedness',
    slug: 'myopia',
    icon: '🔍',
    description: 'Difficulty seeing distant objects clearly'
  },
  {
    name: 'Pneumonia',
    slug: 'pneumonia',
    icon: '🩺',
    description: 'Lung infection causing inflammation and fluid buildup'
  },
  {
    name: 'Sleep Problems',
    slug: 'sleep-problems',
    icon: '😴',
    description: 'Difficulty falling asleep, staying asleep, or poor sleep quality'
  },
  {
    name: 'Tinnitus',
    slug: 'tinnitus',
    icon: '🔔',
    description: 'Ringing or buzzing sounds in the ears'
  },
  {
    name: 'Travel Sickness',
    slug: 'travel-sickness',
    icon: '🚗',
    description: 'Motion sickness during travel by car, plane, boat or train'
  },
  {
    name: 'UTI',
    slug: 'uti',
    icon: '🚨',
    description: 'Urinary tract infection causing pain and frequent urination'
  },
  {
    name: 'Vomiting',
    slug: 'vomiting',
    icon: '🤮',
    description: 'Forcefully expelling stomach contents through the mouth'
  }
]

// Filter conditions based on search query
const conditions = computed(() => {
  if (!searchQuery.value) {
    return allConditions
  }
  
  const query = searchQuery.value.toLowerCase()
  return allConditions.filter(condition => 
    condition.name.toLowerCase().includes(query) ||
    condition.description.toLowerCase().includes(query)
  )
})
</script>