// https://vitejs.dev/config/
import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve('index.js'),
      name: 'spc-kit-ui',
      fileName: 'spcKitUI',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'jsxRuntime',
          'react-dom': 'reactDom',
        },
      },
    },
  },
})
