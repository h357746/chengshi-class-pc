const { defineConfig } = require('@vue/cli-service')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const vueConfig = defineConfig({
  runtimeCompiler: true,
  productionSourceMap: false, // 去除map文件
  transpileDependencies: true,
  // assetsDir: 'static', // 设置静态文件目录
  // parallel: false,
  publicPath: './',
  outputDir: './dist/chengshi-class-pc', // 打包输出目录
  devServer: {
    // 代理
    host: 'localhost',
    port: '8080',
    proxy: {
      // 登录接口
      '/ke': {
        target: 'https://chsdemo.chsvision.com/', // API服务器的地址
        changeOrigin: true,
        pathRewrite: {
          '^/ke': 'ke'
        }
      },
      // 数据接口
      '/apigateway': {
        target: 'http://192.168.1.151:9200/', // API服务器的地址http://192.168.1.151:9200/apigateway/cms/api/v1/external/
        changeOrigin: true,
        pathRewrite: {
          '^/apigateway': '/apigateway'
        }
      }
    }
  },
  configureWebpack: {
    // webpack plugins
    // Gzip压缩
    plugins: [
      new CompressionWebpackPlugin({
        test: /\.js|\.css/ // 对匹配的文件类型进行压缩
      }),
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            drop_console: true,
            drop_debugger: false,
            pure_funcs: ['console.log'] // 移除console
          }
        }
      })
    ]
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // If you are using less-loader@5 please spread the lessOptions to options directly
          // ant design 定制主体
          modifyVars: {
            'primary-color': '#3ec29c'
          },
          javascriptEnabled: true
        }
      }
    }
  }

})
module.exports = vueConfig
