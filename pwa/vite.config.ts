import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
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

    // Werkt niet?
    VitePluginFonts({
      typekit: {
        id: 'rjb1sqs', // Temp!
        defer: true,
        injectTo: 'head',
      },
    }),
  ],
})
