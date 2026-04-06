import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// elementPlus按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        // 1. 配置elementPlus采用sass样式配色系统
        ElementPlusResolver({ importStyle: "sass" }),
      ],
    }),
    visualizer({ open: true, filename: 'stats.html', gzipSize: true, brotliSize: true }),
    viteCompression({ verbose: true, disable: false, threshold: 10240, algorithm: 'gzip', ext: '.gz' })
  ],
  resolve: {
    // 实际的路径转换  @  -> src
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 2. 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
        `,
      }
    }
  },
  server: {
    port: 3000,  // 设置开发服务器端口为 3000
    open: true   // 自动打开浏览器
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
          elementPlus: ['element-plus'],
        }
      }
    }
  }
})
