const config = require('./config');
const path = require('path');
const baseWebpackConfig = require('./webpack.config');
const {merge} = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(baseWebpackConfig, {
    mode:'development',
    devServer:{
        hot:true,
        port:config.PORT,
        progress:true,
        compress:true,
        contentBase:path.join(__dirname,config.OUTPATHNAME) 
    },
    plugins: [
      new HtmlWebpackPlugin({
          filename:'index.html',
          template: 'index.html',
          inject: true,
          //favicon: path.resolve('static/img/tbx_logo.ico')
      }),
      new CopyWebpackPlugin({
        patterns: [
            { from: path.join(__dirname,config.STATICPATH),
                to: 'static' 
            }
        ],
    })
  ],
})