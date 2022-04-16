module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://api.privatbank.ua/p24api/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
  ? '/projects/world-clock-vue/'
  : '/'
}