const {merge} = require('webpack-merge')
const base = require('./webpack.base.js')
const path = require('path')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 3000,
    contentBase:  path.join(__dirname, '../dist'), // 起服务的地址(即定位到我们的输出文件地址)
    open: true,              // 自动打开浏览器
    compress: true,         // gzip压缩
    progress: true
  },
})
