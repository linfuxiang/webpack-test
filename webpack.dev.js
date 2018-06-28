/**
 * 开发环境
 */
const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 抽出CSS
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清理输出文件夹
const apiMocker = require('webpack-api-mocker') // 清理输出文件夹

let config = require('./webpack.config')

// 原生CSS
let extractCss = new ExtractTextPlugin('css/[name]-raw.css')
// Sass编译
let extractScss = new ExtractTextPlugin('css/[name].css')

let output = {}
config.output = {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dev'),
    // publicPath: 'https://cdn-test.jinxidao.com/',
}

config.module.rules = [{
    test: /\.css$/,
    // use: ['style-loader', 'css-loader'],
    use: extractCss.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader'], // loader需要按照此先后顺序，否则报错
    }),
}, {
    test: /\.scss$/,
    use: extractScss.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader', 'sass-loader'], // loader需要按照此先后顺序，否则报错
    }),
}, {
    test: /\.(png|jpeg|jpg|gif)$/,
    use: [{
        loader: 'file-loader',
        options: {
            // limit: 8192,
            name: '[name].[ext]',
            publicPath: '../images/',
            outputPath: 'images/'
        }
    }],
}, ...config.module.rules]

config.plugins = [
    new CleanWebpackPlugin(['dev']),
    extractCss,
    extractScss,
    ...config.plugins
]

// config.optimization = {
//     splitChunks: {
//         // name: "common",
//         // filename: 'common.[chunkhash].js',
//         cacheGroups: {
//             // vendors: {
//             //     test: /[\\/]node_modules[\\/]/,
//             //     name: 'vendors',
//             //     chunks: 'all'
//             // },
//             commons: {
//                 name: 'commons',
//                 chunks: 'initial',
//                 minChunks: 2
//             },
//         }
//     }
// }

config.optimization = {
    splitChunks: {
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
            },
            default: {
                minChunks: 2,
                reuseExistingChunk: true,
            },
        }
    }
}

config.devServer = {
    before(app) {
        apiMocker(app, path.resolve('./src/mocker/index.js'))
    }
}

module.exports = config