import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    
    // 是否监听所有地址
    host: true,
    // 端口号
    port: 3333,
    // 端口被占用时，是否直接退出
    strictPort: false,
    // 是否自动打开浏览器
    open: true,
    // 反向代理
    proxy: {
      "/api": {
        target: "http://192.168.1.187:13902/api",
        // target: "http://fsconsole.frp.saonian.org/api",
        // 是否为 WebSocket
        ws: false,
        // 是否允许跨域
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    // 是否允许跨域
    cors: true,
  },
  plugins: [
    vue(),
    vueJsx(),
    Components({
      dirs: ['src/components'], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import, 默认配置src/components
      resolvers: [VantResolver()]
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'], //自动引入vue的ref、toRefs、onmounted等，无需在页面中再次引入
      dts: 'src/types/auto-import.d.ts', // 根据引入来源自动生成的类型声明文件路径
      eslintrc: {
        enabled: false // 使用 eslint 配置
      }
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        math: 'always', // 括号内才使用数学计算
        globalVars: {
          // 全局变量
          mainColor: 'red'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    include: ['vue3-video-play'], // 确保优化依赖包括了你的包
  },
 // 打包配置
 build: {
  outDir:'r',
  emptyOutDir: true,
  // 清除console和debugger
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true,
    },
  },
  //警报门槛，限制大文件大小
  // chunkSizeWarningLimit: 1500,
  rollupOptions: {
    output: {
      //对静态文件进行打包处理（文件分类）
      chunkFileNames: 'assets/js/[name]-[hash].js',
      entryFileNames: 'assets/js/[name]-[hash].js',
      assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
    }
  },
},
})
