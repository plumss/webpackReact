运用wepack从零搭建react项目
文件目录结构如下：该文件目录生成使用自己用nodejs写的tree工具生成 https://blog.csdn.net/sinat_31529197/article/details/115602063?spm=1001.2014.3001.5501
├──webpackReact
    ├──.babelrc
    ├──.gitignore
    ├──build
        ├──config.js
        ├──webpack.config.js
        ├──webpack.dev.js
        ├──webpack.prod.js
    ├──index.html
    ├──md
    ├──package-lock.json
    ├──package.json
    ├──postcss.config.js
    ├──src
        ├──main.js
        ├──pages
            ├──app.js
            ├──index.less
    ├──static
        ├──img
            ├──a.jpeg

1.初始化package.json  npm init -y
2.安装打包,本地服务启动依赖包 npm i webpack webpack-dev-server webpack-cli webpack-merge --save
3.安装react基础包 npm i react react-dom react-router --save
4.安装源代码转换js文件loader npm i babel-loader @babel/core @babel/preset-env @babel/preset-react --save
  并在webpack.config.js 文件中 配置：
  {
    test: /\.(js|jsx)$/,
    use:'babel-loader',
    exclude:/node_modules/
  }
  并在.babelrc 文件中配置：
  {
    "presets": ["@babel/preset-env", "@babel/preset-react"]
  }
5.安装本地开发配置依赖包：npm i html-webpack-plugin  copy-webpack-plugin --save-dev
7.完成以上依赖包安装和webpack配置，基础的本地启动游览器就已经搭建成功，接下来进行图片资源loader配置
8.安装 npm i file-loader html-withimg-loader --save 同时在配置文件中加入 
{
    test:/\.(html|tpl)$/,
    use:['html-withimg-loader']
},
 {
    test:/\.(png|jpe?g|gif)$/,
    use:{
        loader:'url-loader',
        options: {
            limit: 10000,
            outputPath:'img/'
        }
    },
},
以上配置完成后就能愉快的看到有图片的网页了：效果如下：
9.现在整个网页还是光秃秃的，没什么美感，怎么能少了样式，接下来进行样式loader配置
npm i css-loader less-loader less postcss-loader postcss--save
其中postcss 在把less用less-loader编译器转换成css后自动加上游览器兼容前缀，需要单独配置 postcss.config.js，配置信息如下：
module.exports = {
    plugins: [
      [
        "postcss-preset-env",
      ],
    ],
  };

以上配置完成，样式已经生效
9.接下来配置生产打包，进行资源压缩优化
npm i mini-css-extract-plugin terser-webpack-plugin clean-webpack-plugin optimize-css-assets-webpack-plugin --save
问题：
1.Cannot find module 'webpack-cli/bin/config-yargs' 原因webpack-cli版本过高，npm un webpack-cli ,npm i webpack-cli@3