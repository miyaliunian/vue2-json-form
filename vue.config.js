const path = require("path")
const webpack = require("webpack")
const resolve = (dir) => path.join(__dirname, dir)
console.log("当前运行时:", process.env.VUE_APP_TYPE)
module.exports = {
  publicPath: "./",
  lintOnSave: false,
  pages: {
    index: {
      entry: "examples/main.js",
      template: "public/index.html",
      filename: "index.html",
    },
  },
  devServer: {
    disableHostCheck: true,
    open: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("packages"))

    config.module
      .rule("js")
      .include.add(path.resolve(__dirname, "packages"))
      .end()
      .use("babel")
      .loader("babel-loader")
      .tap((options) => {
        return options
      })
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => {
        return Object.assign(options, { limit: 100 * 1024 })
      })
  },
}
