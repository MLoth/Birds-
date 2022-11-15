import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { VitePluginFonts } from 'vite-plugin-fonts'

export default defineConfig({
  // build: {},

  server: {
    host: '0.0.0.0',
  },

  plugins: [
    vue(),

    Unocss({
      rules: [['font-theme', { 'font-family': 'din-condensed, sans-serif;' }]],
    }),

    VitePWA({
      // filename: 'sw.ts',
      strategies: 'generateSW',
    }),

    VitePluginFonts({
      typekit: {
        id: 'rjb1sqs', // Temp!
        defer: true,
        injectTo: 'head',
      },
    }),
  ],
})
