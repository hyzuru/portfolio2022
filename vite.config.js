import { defineConfig } from 'vite'
export default defineConfig({
	server: {
			hmr: {
					host: 'localhost',
			},
	},

  build: {
    outDir: '_site',
    rollupOptions: {
      input: '/src/client/main.js',
      output: {
        entryFileNames: 'main.js',
        publicDir: 'main.js',
      }
    },
		commonjsOptions: {
			ignoreTryCatch: false,
		}
  }
})

