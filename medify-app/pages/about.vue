<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container-custom">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          About Medify.info
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Making medical information accessible and understandable for everyone
        </p>
      </div>

      <!-- Mission Section -->
      <div class="bg-white rounded-lg shadow-sm p-8 md:p-12 mb-8">
        <h2 class="text-3xl font-bold text-primary-800 mb-6">Our Mission</h2>
        <div class="space-y-4 text-gray-700">
          <p class="text-lg">
            At Medify.info, we believe that understanding health shouldn't require a medical degree. 
            Our mission is to bridge the gap between complex medical information and everyday understanding.
          </p>
          <p class="text-lg">
            Created by students for students and families, we transform medical jargon into simple, 
            clear language that anyone can understand. We want to empower people with knowledge about 
            their health, helping them make informed decisions and know when to seek professional help.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div class="text-center p-6 bg-primary-50 rounded-lg">
            <div class="text-3xl font-bold text-primary-600 mb-2">Simple</div>
            <p class="text-gray-700">Explanations in everyday language</p>
          </div>
          <div class="text-center p-6 bg-secondary-50 rounded-lg">
            <div class="text-3xl font-bold text-secondary-500 mb-2">Visual</div>
            <p class="text-gray-700">Images and videos for better understanding</p>
          </div>
          <div class="text-center p-6 bg-primary-50 rounded-lg">
            <div class="text-3xl font-bold text-primary-600 mb-2">Reliable</div>
            <p class="text-gray-700">Information backed by medical sources</p>
          </div>
        </div>
      </div>

      <!-- Founders Section -->
      <div class="bg-white rounded-lg shadow-sm p-8 md:p-12 mb-8">
        <h2 class="text-3xl font-bold text-primary-800 mb-6">Our Team</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-1">Student Founder</h3>
            <p class="text-gray-600 mb-2">Medical Student</p>
            <p class="text-sm text-gray-500">Passionate about making health education accessible to all</p>
          </div>
          <div class="text-center">
            <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-1">Co-Founder</h3>
            <p class="text-gray-600 mb-2">Public Health Student</p>
            <p class="text-sm text-gray-500">Dedicated to preventive healthcare and community wellness</p>
          </div>
          <div class="text-center">
            <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-1">Co-Founder</h3>
            <p class="text-gray-600 mb-2">Design Student</p>
            <p class="text-sm text-gray-500">Creating visual content that makes learning engaging</p>
          </div>
        </div>
      </div>

      <!-- Values Section -->
      <div class="bg-white rounded-lg shadow-sm p-8 md:p-12">
        <h2 class="text-3xl font-bold text-primary-800 mb-6">Our Values</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Accuracy</h3>
              <p class="text-gray-600">We ensure all information is medically accurate and up-to-date</p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Education</h3>
              <p class="text-gray-600">Empowering people through knowledge and understanding</p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Community</h3>
              <p class="text-gray-600">Building a supportive community of health-aware individuals</p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                </svg>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Accessibility</h3>
              <p class="text-gray-600">Making health information available to everyone, everywhere</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>