import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    base: '/',
    build: {
      outDir: 'assets/',
      manifest: true,
      emptyOutDir: true,
      sourcemap: true,
      minify: isProduction,
      rollupOptions: {
        input: {
          app: path.resolve(__dirname, 'sources/js/script.js'),
          style: path.resolve(__dirname, 'sources/scss/style.scss'),
        },
        output: {
          entryFileNames: isProduction ? 'js/[name].[hash].js' : 'js/[name].js',
          assetFileNames: (assetInfo) => {
            const fileName = assetInfo.names[0] ?? '';
            const ext = path.extname(fileName);
            const name = path.basename(fileName, ext);

            if (/\.(css|map)$/.test(fileName)) {
              return isProduction ? `css/${name}.[hash]${ext}` : `css/${name}${ext}`
            }
            if (/\.(png|jpe?g|gif|svg|webp)$/.test(fileName)) {
              return isProduction ? `images/${name}.[hash]${ext}` : `images/${name}${ext}`
            }
            if (/\.(woff2?|ttf|eot|otf)$/.test(fileName)) {
              return isProduction ? `fonts/${name}.[hash]${ext}` : `fonts/${name}${ext}`
            }
            return isProduction ? `assets/${name}.[hash]${ext}` : `assets/${name}${ext}`
          }
        }
      },
    },
    css: {
      devSourcemap: true,
      sourcemap: true  // Add this line to enable CSS sourcemaps in production
    },
    resolve: {
      alias: {
        '@scripts': path.resolve(__dirname, 'sources/js'),
        '@scss': path.resolve(__dirname, 'sources/scss'),
        '@images': path.resolve(__dirname, 'sources/images'),
        '@fonts': path.resolve(__dirname, 'sources/fonts'),
      },
    }
  }
})
