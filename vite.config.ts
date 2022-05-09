import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return (
    {
      build: {
        outDir: env.VITE_BUILD_PATH
      },
      plugins: [react(),
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 20,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
            },
            {
              name: 'removeEmptyAttrs',
              active: false,
            },
          ],
        },
      }),
      ],
      // server: {
      //   port: 4173,
      //   proxy: {
      //     '/api': {
      //       target: env.VITE_SERVER_URL,
      //       changeOrigin: true,
      //       ws:false,
      //       // rewrite: (path) => path.replace(/^\/api/, '')
      //     }
      //   }
      // }
    }
  );
})

