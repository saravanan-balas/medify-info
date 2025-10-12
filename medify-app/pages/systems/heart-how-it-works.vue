<template>
  <div>
    <!-- System Header -->
    <section class="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
      <div class="container-custom">
        <div class="text-center">
          <div class="text-8xl mb-6">❤️</div>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How Your Heart & Cardiovascular System Works
          </h1>
          <p class="text-xl text-gray-700 max-w-3xl mx-auto">
            Understanding the powerful pump that keeps blood flowing through your entire body
          </p>
        </div>
      </div>
    </section>

    <!-- How It Works Content -->
    <section class="py-16">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <div class="prose prose-lg max-w-none">
            <h2>The Heart - Your Body's Pump</h2>
            <p>Your heart is a powerful muscle about the size of your fist. It's located in the center of your chest, slightly to the left. Think of it as a pump that never stops working!</p>
            
            <h3>Heart Structure</h3>
            <ul>
              <li><strong>Four chambers</strong>: Two atria (upper) and two ventricles (lower)</li>
              <li><strong>Valves</strong>: One-way doors that keep blood flowing in the right direction</li>
              <li><strong>Muscle walls</strong>: Strong muscle tissue that contracts to pump blood</li>
              <li><strong>Electrical system</strong>: Controls the heartbeat rhythm</li>
            </ul>

            <h2>How Blood Circulation Works</h2>
            <p>Your heart pumps blood through two main circuits:</p>
            
            <h3>Pulmonary Circuit (Lungs)</h3>
            <ol>
              <li>Right side of heart pumps blood to lungs</li>
              <li>Blood picks up oxygen and releases carbon dioxide</li>
              <li>Oxygen-rich blood returns to left side of heart</li>
            </ol>

            <h3>Systemic Circuit (Body)</h3>
            <ol>
              <li>Left side of heart pumps oxygen-rich blood to body</li>
              <li>Blood delivers oxygen and nutrients to all organs</li>
              <li>Blood picks up waste products and carbon dioxide</li>
              <li>Oxygen-poor blood returns to right side of heart</li>
            </ol>

            <h2>The Heartbeat</h2>
            <p>Your heart beats about 100,000 times per day! Here's what happens with each beat:</p>
            
            <ol>
              <li><strong>Relaxation (Diastole)</strong>: Heart chambers fill with blood</li>
              <li><strong>Contraction (Systole)</strong>: Heart chambers squeeze and pump blood out</li>
              <li><strong>Valves close</strong>: Prevent blood from flowing backward</li>
              <li><strong>Cycle repeats</strong>: This happens continuously</li>
            </ol>

            <h2>Blood Vessels - The Delivery System</h2>
            
            <h3>Arteries</h3>
            <ul>
              <li>Carry oxygen-rich blood away from heart</li>
              <li>Have thick, muscular walls</li>
              <li>Branch into smaller vessels</li>
            </ul>

            <h3>Capillaries</h3>
            <ul>
              <li>Tiny vessels where exchange happens</li>
              <li>Deliver oxygen and nutrients to cells</li>
              <li>Pick up waste products</li>
            </ul>

            <h3>Veins</h3>
            <ul>
              <li>Carry oxygen-poor blood back to heart</li>
              <li>Have valves to prevent backflow</li>
              <li>Thinner walls than arteries</li>
            </ul>

            <h2>Blood Pressure</h2>
            <p>Blood pressure is the force of blood pushing against artery walls:</p>
            
            <ul>
              <li><strong>Systolic pressure</strong>: When heart contracts (top number)</li>
              <li><strong>Diastolic pressure</strong>: When heart relaxes (bottom number)</li>
              <li><strong>Normal range</strong>: Less than 120/80 mmHg</li>
            </ul>

            <h2>What Blood Does</h2>
            <p>Your blood is like a delivery service that carries:</p>
            
            <ul>
              <li><strong>Oxygen</strong>: From lungs to all body parts</li>
              <li><strong>Nutrients</strong>: From digestive system to cells</li>
              <li><strong>Hormones</strong>: Chemical messengers throughout body</li>
              <li><strong>Immune cells</strong>: Fight infections and diseases</li>
              <li><strong>Waste products</strong>: To kidneys and lungs for removal</li>
            </ul>

            <h2>Heart Rate</h2>
            <p>Your heart rate (pulse) varies based on activity:</p>
            
            <ul>
              <li><strong>Resting</strong>: 60-100 beats per minute</li>
              <li><strong>Exercise</strong>: Can increase to 150+ beats per minute</li>
              <li><strong>Sleep</strong>: Slows down to conserve energy</li>
              <li><strong>Stress</strong>: Increases due to adrenaline</li>
            </ul>

            <h2>Why It's Critical</h2>
            <p>Without your heart and cardiovascular system, your body wouldn't get the oxygen and nutrients it needs to survive. Every cell in your body depends on this delivery system!</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation -->
    <section class="py-8 bg-gray-100">
      <div class="container-custom text-center">
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/systems/heart" class="btn-primary">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back to Heart System
          </NuxtLink>
          <NuxtLink to="/" class="btn-secondary">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            All Body Systems
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Set page title and meta
useHead({
  title: 'How Your Heart & Cardiovascular System Works - Medify.info',
  meta: [
    { name: 'description', content: 'Learn how your heart and cardiovascular system works - the powerful pump that keeps blood flowing through your entire body' }
  ]
})
</script>
