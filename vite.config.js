import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const _dirname = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      $lib: join(_dirname, "src/lib"),
      $assets: join(_dirname, "src/assets"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        popup: join(_dirname, 'popup.html'),
        options: join(_dirname, 'options.html'),
        background: join(_dirname, 'src/background.ts'),
      },
      output: {
        entryFileNames: ai => ai.name === 'background'
          ? 'background.js'
          : 'assets/[name].[hash].js' /* DEFAULT */
      }
    }
  }
})
