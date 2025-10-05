<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container-custom">
      <h1 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
        Common Symptoms Guide
      </h1>
      <p class="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Click on any symptom below to see related health conditions and learn more about possible causes.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="symptom in symptoms" :key="symptom.name" class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ symptom.name }}</h3>
          <p class="text-gray-600 mb-4">{{ symptom.description }}</p>
          <div class="space-y-2">
            <p class="text-sm font-medium text-gray-700">Related conditions:</p>
            <div class="flex flex-wrap gap-2">
              <NuxtLink 
                v-for="condition in symptom.conditions" 
                :key="condition.slug"
                :to="`/ailments/${condition.slug}`"
                class="text-sm bg-primary-50 text-primary-700 px-3 py-1 rounded-full hover:bg-primary-100 transition-colors"
              >
                {{ condition.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const symptoms = [
  {
    name: 'Nausea',
    description: 'Feeling sick or queasy in your stomach',
    conditions: [
      { name: 'Travel Sickness', slug: 'travel-sickness' },
      { name: 'Vomiting', slug: 'vomiting' },
      { name: 'Acid Reflux', slug: 'acid-reflux' }
    ]
  },
  {
    name: 'Stomach Pain',
    description: 'Discomfort or cramping in the abdomen',
    conditions: [
      { name: 'Belly Pain', slug: 'belly-pain' },
      { name: 'Constipation', slug: 'constipation' },
      { name: 'Bloating', slug: 'bloating' }
    ]
  },
  {
    name: 'Changes in Bowel Movements',
    description: 'Unusual patterns in toilet habits',
    conditions: [
      { name: 'Constipation', slug: 'constipation' },
      { name: 'Diarrhea', slug: 'diarrhea' },
      { name: 'Blood in Poop', slug: 'blood-in-poop' }
    ]
  },
  {
    name: 'Heartburn',
    description: 'Burning sensation in chest or throat',
    conditions: [
      { name: 'Acid Reflux', slug: 'acid-reflux' },
      { name: 'Belly Pain', slug: 'belly-pain' }
    ]
  },
  {
    name: 'Bloating',
    description: 'Feeling full or swollen in the belly',
    conditions: [
      { name: 'Bloating', slug: 'bloating' },
      { name: 'Constipation', slug: 'constipation' },
      { name: 'Belly Pain', slug: 'belly-pain' }
    ]
  },
  {
    name: 'Dizziness',
    description: 'Feeling lightheaded or unsteady',
    conditions: [
      { name: 'Travel Sickness', slug: 'travel-sickness' },
      { name: 'Vomiting', slug: 'vomiting' }
    ]
  },
  {
    name: 'Loss of Appetite',
    description: 'Not feeling hungry or wanting to eat',
    conditions: [
      { name: 'Belly Pain', slug: 'belly-pain' },
      { name: 'Vomiting', slug: 'vomiting' },
      { name: 'Constipation', slug: 'constipation' }
    ]
  },
  {
    name: 'Fatigue',
    description: 'Feeling very tired or weak',
    conditions: [
      { name: 'Diarrhea', slug: 'diarrhea' },
      { name: 'Vomiting', slug: 'vomiting' },
      { name: 'Blood in Poop', slug: 'blood-in-poop' }
    ]
  },
  {
    name: 'Rectal Bleeding',
    description: 'Blood seen during bowel movements',
    conditions: [
      { name: 'Blood in Poop', slug: 'blood-in-poop' },
      { name: 'Constipation', slug: 'constipation' }
    ]
  }
]
</script>