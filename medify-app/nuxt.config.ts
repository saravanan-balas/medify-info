// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/image',
    'nuxt-gtag'
  ],

  components: {
    global: true,
    dirs: ['~/components']
  },

  ssr: true,

  tailwindcss: {
    cssPath: '~/assets/css/main.css'
  },

  content: {
    markdown: {
      anchorLinks: false
    }
  },

  imports: {
    autoImport: true
  },

  app: {
    head: {
      title: 'Medify.info - Medical Awareness for Students',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Simple medical information about common health issues, explained in everyday language for students and families.' },
        { name: 'keywords', content: 'health, medical, student health, family health, common ailments, medical awareness' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  gtag: {
    id: process.env.GOOGLE_ANALYTICS_ID || 'G-9YLW5YHM6B'
  }
})
