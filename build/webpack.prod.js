const baseWebpackConfig = require('./webpack.config')
const path = require('path');
const {merge} = require('webpack-merge')
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = merge(baseWebpackConfig, {
    mode:'production',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            //favicon: path.resolve('static/img/tbx_logo.ico'),
            minify:{
                removeAttributeQuotes:true,
                collapseWhitespace:true
            }
        }),
        new miniCssExtractPlugin({
            filename:  '[name].[hash:8].css',
            chunkFilename: '[id].[hash:8].css',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
          patterns: [
              { from: path.join(__dirname,'../static'),
                  to: 'static' 
              }
          ],
      })
    ],
    optimization: {//优化项
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    }
})