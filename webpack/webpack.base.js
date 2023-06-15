const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 将打包出来的css抽离出来
const MinniCssExtractPlugin = require('mini-css-extract-plugin')

// 将抽离出来的css进行压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// js压缩
const TerserPlugin = require('terser-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpack = require('webpack')


module.exports = {
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../docs'),
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
      {
          test: /\.s[ac]ss$/i,
          use: [
            MinniCssExtractPlugin.loader,//本质就是创建一个style标签再将输出的css地址引入
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50 * 1024,
              loader: 'file-loader',
              esModule: false,
              outputPath: 'public/imgs',
              name: '[name].[ext]'
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: path.join(__dirname, '../node_modules/'),
        include: path.resolve('src'),
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env'
                ],
                plugins:[
                  ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                  '@babel/plugin-syntax-dynamic-import'
                ]
            }
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, '../src/index.html'),//模板文件地址
        filename: 'index.html',//指定打包后的文件名字
        hash: true//也可给其生成一个hash值
    }),
    new CleanWebpackPlugin({
      dry: false,
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, '../dist')],
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
    new MinniCssExtractPlugin({
      //指定输出的文件名
      filename: 'main.css'
    }),
    new webpack.BannerPlugin('core by Peter Guo'),
    new webpack.HotModuleReplacementPlugin()
  ],
  // minify: { // 压缩打包后的html文件
  //   removeAttributeQuotes: true, // 删除属性双引号
  //   collapseWhitespace: true // 折叠空行变成一行
  // },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {              // 分割代码块，针对多入口
      cacheGroups: {            // 缓存组
        common: {               // 公共模块
          minSize: 0,           // 大于多少抽离
          minChunks: 2,         // 使用多少次以上抽离抽离
          chunks: 'initial'     // 从什么地方开始,刚开始
        },
        vendor: {
          priority: 1,          // 增加权重, (先抽离第三方)
          test: /node_modules/, // 把此目录下的抽离
          minSize: 0,           // 大于多少抽离
          minChunks: 2,         // 使用多少次以上抽离抽离
          chunks: 'initial'     // 从什么地方开始,刚开始
        }
      }
    },
  }
};