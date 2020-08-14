module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  productionSourceMap: false,
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:8090', //
          changeOrigin: true, //
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  },
}
