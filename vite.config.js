import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const isBuild = mode === 'production';
  return {
    base: '/',
    build: {
      outDir: 'assets/',
      manifest: true,
      emptyOutDir: true,
      sourcemap: !isBuild,
      minify: isBuild,
      rollupOptions: {
        input: {
          app: path.resolve(__dirname, 'sources/js/script.js'),
          style: path.resolve(__dirname, 'sources/scss/style.scss'),
        },
        output: {
          entryFileNames: isBuild ? 'js/[name].[hash].js' : 'js/[name].js',
          assetFileNames: (assetInfo) => {
            const fileName = assetInfo.names[0] ?? '';
            const ext = path.extname(fileName);
            const name = path.basename(fileName, ext);

            if (/\.(css|map)$/.test(fileName)) {
              return isBuild ? `css/${name}.[hash]${ext}` : `css/${name}${ext}`
            }
            if (/\.(png|jpe?g|gif|svg|webp)$/.test(fileName)) {
              return isBuild ? `images/${name}.[hash]${ext}` : `images/${name}${ext}`
            }
            if (/\.(woff2?|ttf|eot|otf)$/.test(fileName)) {
              return isBuild ? `fonts/${name}.[hash]${ext}` : `fonts/${name}${ext}`
            }
            return isBuild ? `assets/${name}.[hash]${ext}` : `assets/${name}${ext}`
          }
        }
      },
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
