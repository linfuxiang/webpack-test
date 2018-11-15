/**
 * 测试环境
 */
const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const fs = require('fs')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 抽出CSS
// const CleanWebpackPlugin = require('clean-webpack-plugin') // 清理输出文件夹，无法删除项目文件外的文件

let cdn_url = require('./config/test.config')
let config = require('./webpack.config')
let fs_utils = require('./utils/fs')

// 原生CSS
let extractCss = new ExtractTextPlugin('css/[name]-raw.[chunkhash].css')
// Sass编译
let extractScss = new ExtractTextPlugin('css/[name].[chunkhash].css')

let output = {}
config.output = {
    filename: 'js/[name].[chunkhash].js',
    path: cdn_url.house,
}
cdn_url.cdn && (config.output.publicPath = cdn_url.cdn)

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
            publicPath: `${cdn_url.cdn}images/`,
            outputPath: `images/`
        }
    }],
}, ...config.module.rules]

config.plugins = [
    // new CleanWebpackPlugin(cdn_url.house),   // 无法删除项目文件外的文件
    extractCss,
    extractScss,
    ...config.plugins
]

config.optimization = {
    splitChunks: {
        // name: "common",
        // filename: 'common.[chunkhash].js',
        cacheGroups: {
            // commons: {
            //     test: /[\\/]node_modules[\\/]/,
            //     name: 'vendors',
            //     chunks: 'all'
            // },
            commons: {
                name: 'commons',
                chunks: 'initial',
                minChunks: 2
            },
        }
    }
}

fs_utils.removeDir(cdn_url.house.replace('\\', '/'))

module.exports = config