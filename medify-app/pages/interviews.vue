<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container-custom">
      <h1 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
        Doctor Interviews
      </h1>
      <p class="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Learn from medical professionals as they explain health topics in simple terms
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="interview in interviews" :key="interview.id" class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div class="aspect-video bg-gray-200 relative">
            <iframe 
              :src="interview.embedUrl" 
              class="w-full h-full"
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ interview.title }}</h3>
            <p class="text-sm text-gray-500 mb-3">{{ interview.doctor }} • {{ interview.duration }}</p>
            <p class="text-gray-600 mb-4">{{ interview.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="topic in interview.topics" :key="topic" 
                class="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                {{ topic }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Coming Soon Section -->
      <div class="mt-12 bg-primary-50 rounded-lg p-8 text-center">
        <h2 class="text-2xl font-bold text-primary-900 mb-4">More Interviews Coming Soon!</h2>
        <p class="text-gray-700 mb-6">
          We're working with healthcare professionals to bring you more informative interviews. 
          Have a question you'd like answered? Let us know!
        </p>
        <a href="mailto:info@medify.info" class="btn-primary">
          Suggest a Topic
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const interviews = [
  {
    id: 1,
    title: 'Understanding Stomach Problems',
    doctor: 'Dr. Sarah Johnson',
    duration: '12:45',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'A gastroenterologist explains common stomach issues and when to seek help.',
    topics: ['Belly Pain', 'Acid Reflux', 'Bloating']
  },
  {
    id: 2,
    title: 'Digestive Health Basics',
    doctor: 'Dr. Michael Chen',
    duration: '15:20',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Learn how your digestive system works and how to keep it healthy.',
    topics: ['Constipation', 'Diarrhea', 'Diet']
  },
  {
    id: 3,
    title: 'Motion Sickness Explained',
    doctor: 'Dr. Emily Roberts',
    duration: '10:30',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'An ENT specialist discusses why we get motion sick and how to prevent it.',
    topics: ['Travel Sickness', 'Prevention', 'Treatment']
  }
]
</script>