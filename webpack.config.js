var webpack = require('webpack');
var path = require('path');
module.exports = {
  entry:  "./app/main.js",//已多次提及的唯一入口文件
  output: {
    path: "./public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },
   module: {
        // 加载器配置
        loaders: [
      {
            test: /\.js$/,
            loader: 'babel-loader'
        }
    ]       
    }
}