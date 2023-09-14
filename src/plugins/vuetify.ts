/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles' // Composables
import { createVuetify } from 'vuetify' // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
import { VInfiniteScroll } from 'vuetify/labs/VInfiniteScroll'
import { en, fr } from 'vuetify/locale'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: { VInfiniteScroll },
  locale: {
    locale: 'fr',
    fallback: 'en',
    messages: { en, fr },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#2772b9',
          'primary-darken-1': '#104987',
          secondary: '#ffcc02',
          background: '#ffe586',
        },
      },
    },
  },
})
