const path = require('path');
const config = require('./config');
function resolve (dir) {
    return path.join(__dirname,dir)
}
module.exports = {
    entry: resolve('../src/main.js'),
    output: {
        path:resolve('../dist'),
        filename: '[name].js',
    },
    resolve: {
        alias: {
          '@': resolve('../src/pages')
        }
    },
    module: {
        rules: [
            {
                test:/\.(html|tpl)$/,
                use:['html-withimg-loader']
            },
            {
                test:/\.(png|jpe?g|gif)$/,
                use:{
                    loader:'file-loader',
                    options: {
                        limit: 10000,
                        outputPath:'img/'
                    }
                },
            },
            {
                test: /\.(js|jsx)$/,
                use:'babel-loader',
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                    ]
                },
                {
                    test:/\.less$/,
                    use:[
                        'style-loader', // 从 JS 中创建样式节点
                        'css-loader', //转化 CSS 为 CommonJS
                        'postcss-loader', //CSS自动添加浏览器前缀
                        'less-loader' //编译 Less 为 CSS
                    ]
                }
        ]
    }
}