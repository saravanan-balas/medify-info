<template>
  <div>
    <!-- System Header -->
    <section class="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
      <div class="container-custom">
        <div class="text-center">
          <div class="text-8xl mb-6">🧠</div>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How Your Nervous System Works
          </h1>
          <p class="text-xl text-gray-700 max-w-3xl mx-auto">
            Understanding the amazing communication network that controls everything from breathing to thinking
          </p>
        </div>
      </div>
    </section>

    <!-- How It Works Content -->
    <section class="py-16">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <div class="prose prose-lg max-w-none">
            <h2>The Brain - Your Personal Command Center</h2>
            <p>Your brain is like a supercomputer that never stops working. It weighs about 3 pounds (about the size of two fists) but contains over 86 billion nerve cells! Here's what it does:</p>
            
            <ul>
              <li><strong>Processes information</strong>: When you see something, hear a sound, or touch something, your brain figures out what it means</li>
              <li><strong>Makes decisions</strong>: Should you cross the street? What should you eat for lunch? Your brain decides</li>
              <li><strong>Stores memories</strong>: Everything you've learned, experienced, and felt is stored here</li>
              <li><strong>Controls emotions</strong>: Happiness, sadness, fear, love - all come from your brain</li>
            </ul>

            <h2>The Spinal Cord - Your Body's Main Highway</h2>
            <p>Your spinal cord is like a super-fast highway running down your back. It's about as thick as your thumb and carries messages at speeds up to 268 miles per hour! It connects your brain to every part of your body.</p>

            <h2>Nerves - The Communication Cables</h2>
            <p>Your body has over 7 trillion nerve cells! They're like tiny electrical wires that:</p>
            
            <ul>
              <li><strong>Carry messages TO your brain</strong>: "My foot hurts!" or "This food tastes good!"</li>
              <li><strong>Carry messages FROM your brain</strong>: "Move your hand!" or "Start digesting that food!"</li>
            </ul>

            <h2>How Messages Travel</h2>
            <p>Think of your nervous system like a telephone network:</p>
            
            <ol>
              <li><strong>Sensor nerves</strong> detect what's happening (like touching something hot)</li>
              <li><strong>They send electrical signals</strong> up your spinal cord to your brain</li>
              <li><strong>Your brain processes</strong> the information and decides what to do</li>
              <li><strong>Motor nerves</strong> carry the brain's response back down</li>
              <li><strong>Your muscles respond</strong> (like pulling your hand away from the hot object)</li>
            </ol>

            <h2>Voluntary vs Automatic Functions</h2>
            
            <h3>Voluntary Control (Things You Choose to Do)</h3>
            <ul>
              <li>Walking, running, dancing</li>
              <li>Talking, singing, laughing</li>
              <li>Writing, drawing, playing instruments</li>
              <li>Eating, drinking, brushing your teeth</li>
            </ul>

            <h3>Automatic Functions (Things That Happen Without Thinking)</h3>
            <ul>
              <li><strong>Breathing</strong> (you don't have to remember to breathe!)</li>
              <li><strong>Heartbeat</strong> (your heart beats automatically)</li>
              <li><strong>Digestion</strong> (your stomach breaks down food)</li>
              <li><strong>Blinking</strong> (your eyes blink to stay moist)</li>
            </ul>

            <h2>Sensory Processing</h2>
            <p>Your nervous system helps you experience the world through your senses:</p>
            
            <ul>
              <li><strong>Sight</strong>: Seeing colors, shapes, movement</li>
              <li><strong>Sound</strong>: Hearing music, voices, danger signals</li>
              <li><strong>Touch</strong>: Feeling soft fabric, hot surfaces, gentle hugs</li>
              <li><strong>Taste</strong>: Enjoying sweet, salty, sour, bitter flavors</li>
              <li><strong>Smell</strong>: Detecting flowers, food, smoke, danger</li>
            </ul>

            <h2>Thinking & Emotions</h2>
            <p>Your nervous system also handles complex mental processes:</p>
            
            <ul>
              <li>Solving problems and making plans</li>
              <li>Feeling happy, sad, excited, or calm</li>
              <li>Learning new skills and remembering old ones</li>
              <li>Being creative and imaginative</li>
            </ul>

            <h2>Emergency Response</h2>
            <p>When danger appears, your nervous system instantly prepares your body to either fight or run away - your heart beats faster, muscles tense up, and you become super alert.</p>

            <h2>Why It's Critical</h2>
            <p>Without your nervous system, you literally couldn't survive. It's the master control system that coordinates everything your body does, from the simplest reflex to the most complex thought.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation -->
    <section class="py-8 bg-gray-100">
      <div class="container-custom text-center">
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/systems/nervous-system" class="btn-primary">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back to Nervous System
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
  title: 'How Your Nervous System Works - Medify.info',
  meta: [
    { name: 'description', content: 'Learn how your nervous system works - the amazing communication network that controls everything from breathing to thinking' }
  ]
})
</script>
