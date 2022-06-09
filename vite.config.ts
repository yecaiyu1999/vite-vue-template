import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// vite 提供的操作env配置变量的方法loadEnv
import { loadEnv } from 'vite'
// nodejs写法，获取项目目录
import path from 'path'

// element-plus按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 图标
import PurgeIcons from 'vite-plugin-purge-icons'
// 一个针对 index.html，提供压缩和基于 ejs 模板功能的 vite 插件。
import { createHtmlPlugin } from 'vite-plugin-html'
// setup语法糖name增强，使vue3语法糖支持name属性。
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

import { createVitePlugins } from './build/vite/plugin'

const pathResolve = (dirPath) => path.resolve(process.cwd(), dirPath)

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  console.log('command=', command)
  const isBuild = command === 'build' // command = serve or build

  return defineConfig({
    plugins: [
      vue(),
      ...createVitePlugins(isBuild),
      vueSetupExtend(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      PurgeIcons({
        /* PurgeIcons Options */
        content: ['**/*.html', '**/*.js', '**/*.vue']
      }),
      createHtmlPlugin({
        minify: true,
        /**
         * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
         * @default src/main.ts
         */
        entry: '/src/main.ts',
        /**
         * 需要注入 index.html ejs 模版的数据
         */
        inject: {
          data: {
            title: loadEnv(mode, process.cwd()).VITE_APP_TITLE,
            injectScript: ''
          },
          tags: [
            {
              injectTo: 'body-prepend',
              tag: 'div',
              attrs: {
                id: 'app'
              }
            }
          ]
        }
      })
    ],
    // 服务器配置
    server: {
      host: '0.0.0.0',
      port: Number(loadEnv(mode, process.cwd()).VITE_APP_PORT),
      strictPort: true, // 端口被占用直接退出
      https: false, // 默认用http方式
      // open: true, // 在开发服务器启动时自动在浏览器中打开应用程序
      proxy: {
        // 代理配置
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_APP_BASE_URL,
          changeOrigin: true, // 跨域配置
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      hmr: {
        overlay: true // 屏蔽服务器报错
      }
    },
    resolve: {
      // 设置项目文件导入路径
      alias: [
        {
          find: /\/@\//,
          replacement: `${pathResolve('src')}/`
        }
      ]
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
        // 给导入的路径最后加上 ;
        scss: {
          additionalData: '@import "/@/assets/css/global.scss";'
        }
      }
    }
  })
}
