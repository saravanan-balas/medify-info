<template>
  <div>
    <!-- Loading State -->
    <div v-if="pending" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !system" class="text-center py-12">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">System Not Found</h1>
      <p class="text-gray-600 mb-6">The body system you're looking for doesn't exist.</p>
      <NuxtLink to="/" class="btn-primary">Go Back Home</NuxtLink>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- System Header -->
      <section class="bg-gradient-to-br from-primary-50 to-primary-100 py-8">
        <div class="container-custom">
          <div class="text-center">
            <div class="text-6xl mb-4">{{ system?.icon }}</div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {{ system?.title }}
            </h1>
            <p class="text-lg text-gray-700 max-w-3xl mx-auto">
              {{ system?.description }}
            </p>
          </div>
        </div>
      </section>

    <!-- System Function & Importance -->
    <section class="py-8">
      <div class="container-custom">
        <div class="prose prose-lg max-w-none mb-8">
          <ContentRenderer :value="system" />
        </div>
        
        <!-- How It Works Banner -->
        <div class="bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg shadow-lg p-6 text-center">
          <div class="flex flex-col md:flex-row items-center justify-center gap-4">
            <div class="text-5xl md:text-6xl">{{ system?.icon }}</div>
            <div class="flex-1">
              <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-2">{{ system?.title }}</h3>
              <p class="text-gray-600 mb-4">System Diagram</p>
              <NuxtLink 
                :to="`/systems/${route.params.slug}-how-it-works`"
                class="btn-primary inline-flex items-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
                How It Works
              </NuxtLink>
              <p class="text-sm text-gray-500 mt-3">
                Learn how this system functions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Common Health Issues -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          Common Health Issues
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink 
            v-for="issue in healthIssues" 
            :key="issue.title"
            :to="`/conditions/${getConditionSlug(issue.title)}`"
            class="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer border border-gray-200 hover:border-primary-300"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="text-4xl">{{ getConditionIcon(issue.title) }}</div>
              <svg class="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
              {{ issue.title }}
            </h3>
            <p class="text-gray-600 mb-3 text-sm leading-relaxed">
              {{ issue.description }}
            </p>
            <div class="space-y-1.5">
              <div v-if="issue.causes">
                <span class="font-semibold text-gray-800 text-xs">Key Causes:</span>
                <p class="text-xs text-gray-600 mt-0.5">{{ issue.causes }}</p>
              </div>
              <div v-if="issue.symptoms">
                <span class="font-semibold text-gray-800 text-xs">Main Symptoms:</span>
                <p class="text-xs text-gray-600 mt-0.5">{{ issue.symptoms }}</p>
              </div>
              <div v-if="issue.management">
                <span class="font-semibold text-gray-800 text-xs">Quick Help:</span>
                <p class="text-xs text-gray-600 mt-0.5">{{ issue.management }}</p>
              </div>
            </div>
            <div class="mt-4 flex items-center text-primary-600 text-sm font-medium group-hover:text-primary-700">
              Learn more
              <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Prevention Tips -->
    <section class="py-16">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          Prevention Tips
        </h2>
        <div class="max-w-4xl mx-auto">
          <div class="prose prose-lg max-w-none">
            <ContentRenderer :value="system" />
          </div>
        </div>
      </div>
    </section>

    <!-- Back to Systems -->
    <section class="py-8 bg-gray-100">
      <div class="container-custom text-center">
        <NuxtLink to="/" class="btn-primary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to Body Systems
        </NuxtLink>
      </div>
    </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const route = useRoute()
const slug = route.params.slug as string

// Fetch system content
const { data: system, pending, error } = await useAsyncData(`system-${slug}`, async () => {
  try {
    // Use our custom API route
    const content = await $fetch(`/api/content/systems/${slug}`);
    return content;
  } catch (err) {
    throw createError({ statusCode: 404, statusMessage: 'System not found' });
  }
})


// Helper function to clean HTML text and limit length
const cleanText = (html: string, maxLength: number = 100) => {
  let text = html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&amp;/g, '&') // Decode HTML entities
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .split(' ') // Split into words
    .filter(word => word.trim() !== '') // Remove empty words
    .join(' ') // Join back with spaces
    .trim()
  
  // Limit length and add ellipsis if needed
  if (text.length > maxLength) {
    text = text.substring(0, maxLength).trim() + '...'
  }
  
  return text
}

// Extract health issues from the content
const healthIssues = computed(() => {
  if (!system.value) return []
  
  const content = system.value.body || ''
  const issues: any[] = []
  
  // Parse the HTML content to extract health issues
  const sections = content.split('<h2>Common Health Issues</h2>')[1]?.split('<h2>Prevention Tips</h2>')[0]
  if (!sections) return []
  
  // Extract h3 titles and their following content until the next h3
  const issueRegex = /<h3>([^<]*?<strong>([^<]+)<\/strong>)<\/h3>([\s\S]*?)(?=<h3>|$)/g
  
  let match
  while ((match = issueRegex.exec(sections)) !== null) {
    const title = match[2].trim() // Extract just the text inside <strong>
    const content = match[3]
    
    // Extract description from "What it is" paragraph (limit to 60 chars)
    const whatMatch = content.match(/<p><strong>What it is<\/strong>: ([^<]+)<\/p>/)
    const description = whatMatch ? cleanText(whatMatch[1], 60) : ''
    
    // Extract first cause from "Why it happens" section (limit to 40 chars)
    const causesMatch = content.match(/<p><strong>Why it happens<\/strong>:<\/p>[\s\S]*?<ul>[\s\S]*?<li>[\s\S]*?<strong>([^<]+)<\/strong>[\s\S]*?<\/li>/)
    const causes = causesMatch ? cleanText(causesMatch[1], 40) : ''
    
    // Extract first symptom from "What you feel" section (limit to 40 chars)
    const symptomsMatch = content.match(/<p><strong>What you (feel|experience)<\/strong>:<\/p>[\s\S]*?<ul>[\s\S]*?<li>([^<]+)<\/li>/)
    const symptoms = symptomsMatch ? cleanText(symptomsMatch[2], 40) : ''
    
    // Extract first management tip from "How to help yourself" section (limit to 40 chars)
    const managementMatch = content.match(/<p><strong>How to help yourself<\/strong>:<\/p>[\s\S]*?<ul>[\s\S]*?<li>[\s\S]*?<strong>([^<]+)<\/strong>[\s\S]*?<\/li>/)
    const management = managementMatch ? cleanText(managementMatch[1], 40) : ''
    
    issues.push({
      title: title,
      description: description,
      causes: causes,
      symptoms: symptoms,
      management: management
    })
  }
  
  return issues
})

// Helper functions to map condition titles to slugs and icons
const getConditionSlug = (title: string) => {
  // Decode HTML entities and normalize title
  const normalizedTitle = title
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
  
  const slugMap: Record<string, string> = {
    // Respiratory System
    'Asthma': 'asthma',
    'Chronic Obstructive Pulmonary Disease (COPD)': 'copd',
    'Pneumonia': 'pneumonia',
    'Bronchitis': 'bronchitis',
    'Common Cold & Flu': 'common-cold-flu',
    'Sinusitis': 'sinusitis',
    'Sleep Apnea': 'sleep-apnea',
    'Lung Cancer': 'lung-cancer',
    'Tuberculosis (TB)': 'tuberculosis',
    'Pulmonary Embolism': 'pulmonary-embolism',
    
    // Nervous System
    'Headaches & Migraines': 'headaches-migraines',
    'Anxiety & Stress': 'anxiety-stress',
    'Sleep Problems': 'sleep-problems',
    'Memory Issues': 'memory-issues',
    'Depression': 'depression',
    'Epilepsy': 'epilepsy',
    'Parkinson\'s Disease': 'parkinsons-disease',
    'Multiple Sclerosis (MS)': 'multiple-sclerosis',
    
    // Cardiovascular System
    'High Blood Pressure (Hypertension)': 'hypertension',
    'Heart Disease (Coronary Artery Disease)': 'heart-disease',
    'Heart Attack (Myocardial Infarction)': 'heart-attack',
    'Heart Failure': 'heart-failure',
    'Arrhythmia (Irregular Heartbeat)': 'arrhythmia',
    'Peripheral Artery Disease': 'peripheral-artery-disease',
    'Deep Vein Thrombosis (DVT)': 'dvt',
    
    // Eyes & Visual System
    'Myopia (Nearsightedness)': 'myopia',
    'Hyperopia (Farsightedness)': 'hyperopia',
    'Astigmatism': 'astigmatism',
    'Presbyopia': 'presbyopia',
    'Cataracts': 'cataracts',
    'Glaucoma': 'glaucoma',
    'Macular Degeneration': 'macular-degeneration',
    'Diabetic Retinopathy': 'diabetic-retinopathy',
    'Dry Eye Syndrome': 'dry-eye',
    'Conjunctivitis (Pink Eye)': 'conjunctivitis',
    
    // Kidneys & Urinary System
    'Chronic Kidney Disease (CKD)': 'chronic-kidney-disease',
    'Kidney Stones': 'kidney-stones',
    'Urinary Tract Infection (UTI)': 'uti',
    'Bladder Infection': 'bladder-infection',
    'Prostate Problems': 'prostate-problems',
    'Incontinence': 'incontinence',
    'Polycystic Kidney Disease': 'polycystic-kidney',
    'Nephritis': 'nephritis',
    
    // Ears & Hearing System
    'Hearing Loss': 'hearing-loss',
    'Tinnitus': 'tinnitus',
    'Ear Infections': 'ear-infections',
    'Meniere\'s Disease': 'menieres-disease',
    'Vertigo': 'vertigo',
    'Earwax Buildup': 'earwax-buildup',
    'Otosclerosis': 'otosclerosis',
    'Acoustic Neuroma': 'acoustic-neuroma',
    
    // Digestive System
    'Acid Reflux (GERD)': 'acid-reflux',
    'Irritable Bowel Syndrome (IBS)': 'ibs',
    'Crohn\'s Disease': 'crohns-disease',
    'Ulcerative Colitis': 'ulcerative-colitis',
    'Celiac Disease': 'celiac-disease',
    'Gallstones': 'gallstones',
    'Peptic Ulcers': 'peptic-ulcers',
    'Hepatitis': 'hepatitis',
    'Cirrhosis': 'cirrhosis',
    'Pancreatitis': 'pancreatitis'
  }
  return slugMap[normalizedTitle] || normalizedTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

const getConditionIcon = (title: string) => {
  // Decode HTML entities and normalize title
  const normalizedTitle = title
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
  
  const iconMap: Record<string, string> = {
    // Respiratory System
    'Asthma': '🫁',
    'Chronic Obstructive Pulmonary Disease (COPD)': '🫁',
    'Pneumonia': '🫁',
    'Bronchitis': '🫁',
    'Common Cold & Flu': '🤧',
    'Sinusitis': '👃',
    'Sleep Apnea': '😴',
    'Lung Cancer': '🫁',
    'Tuberculosis (TB)': '🫁',
    'Pulmonary Embolism': '🫁',
    
    // Nervous System
    'Headaches & Migraines': '🤕',
    'Anxiety & Stress': '😰',
    'Sleep Problems': '😴',
    'Memory Issues': '🧠',
    'Depression': '😔',
    'Epilepsy': '⚡',
    'Parkinson\'s Disease': '🧠',
    'Multiple Sclerosis (MS)': '🧠',
    
    // Cardiovascular System
    'High Blood Pressure (Hypertension)': '❤️',
    'Heart Disease (Coronary Artery Disease)': '❤️',
    'Heart Attack (Myocardial Infarction)': '❤️',
    'Heart Failure': '❤️',
    'Arrhythmia (Irregular Heartbeat)': '💓',
    'Peripheral Artery Disease': '🦵',
    'Deep Vein Thrombosis (DVT)': '🦵',
    
    // Eyes & Visual System
    'Myopia (Nearsightedness)': '👓',
    'Hyperopia (Farsightedness)': '👓',
    'Astigmatism': '👓',
    'Presbyopia': '👓',
    'Cataracts': '👁️',
    'Glaucoma': '👁️',
    'Macular Degeneration': '👁️',
    'Diabetic Retinopathy': '👁️',
    'Dry Eye Syndrome': '👁️',
    'Conjunctivitis (Pink Eye)': '👁️',
    
    // Kidneys & Urinary System
    'Chronic Kidney Disease (CKD)': '🫘',
    'Kidney Stones': '🫘',
    'Urinary Tract Infection (UTI)': '🫘',
    'Bladder Infection': '🫘',
    'Prostate Problems': '🫘',
    'Incontinence': '🫘',
    'Polycystic Kidney Disease': '🫘',
    'Nephritis': '🫘',
    
    // Ears & Hearing System
    'Hearing Loss': '👂',
    'Tinnitus': '🔔',
    'Ear Infections': '👂',
    'Meniere\'s Disease': '👂',
    'Vertigo': '🌀',
    'Earwax Buildup': '👂',
    'Otosclerosis': '👂',
    'Acoustic Neuroma': '👂',
    
    // Digestive System
    'Acid Reflux (GERD)': '🤢',
    'Irritable Bowel Syndrome (IBS)': '🤢',
    'Crohn\'s Disease': '🤢',
    'Ulcerative Colitis': '🤢',
    'Celiac Disease': '🌾',
    'Gallstones': '🤢',
    'Peptic Ulcers': '🤢',
    'Hepatitis': '🫀',
    'Cirrhosis': '🫀',
    'Pancreatitis': '🫀'
  }
  return iconMap[normalizedTitle] || '🏥'
}

// Expose functions to template
defineExpose({
  getConditionSlug,
  getConditionIcon
})

// Set page title and meta
useHead({
  title: `${system.value?.title} - Medify.info`,
  meta: [
    { name: 'description', content: system.value?.description }
  ]
})
</script>
