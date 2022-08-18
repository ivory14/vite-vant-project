import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
// import styleImport, { VantResolve } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Components({
    //   resolvers: [VantResolver()],
    // }),
    // styleImport({
    //   resolves: [VantResolve()],
    //   libs: [{
    //     libraryName: 'vant',
    //     esModule: true,
    //     resolveStyle: name => `../es/${name}/style`
    //   }]
    // })
  ],
  base:'./',
  server: {
    open: '/',
    port: 3000,
    // cors: true, // 是否开启跨域请求
    // proxy: { // 配置代理 https://api.uomg.com/api/image.lofter?format=images
    //   '/api/': {
    //     target: 'https://api.uomg.com/api/', // 请求的真实网址
    //     changeOrigin: true,
    //     // rewrite: path => 
    //   }
    // }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'), // 路径别名
      "@V": resolve(__dirname, 'src/views'),
      "@C": resolve(__dirname, 'src/components'),
      "@A": resolve(__dirname, 'src/assets'),
      "@S": resolve(__dirname, 'src/store'),
      "@R": resolve(__dirname, 'src/router'),
      "@U": resolve(__dirname, 'src/utils'),
      // "@Api": resolve(__dirname, 'src/request/api'),
    },
    extensions: ['.js', '.json', '.ts'] // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
})
