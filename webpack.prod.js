/**
 * 线上环境
 */
const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 抽出CSS
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清理输出文件夹

let cdn_url = require('./config/prod.config')
let config = require('./webpack.config')

// 原生CSS
let extractCss = new ExtractTextPlugin('css/[name]-raw.[chunkhash].css')
// Sass编译
let extractScss = new ExtractTextPlugin('css/[name].[chunkhash].css')

// 遍历所有HTML文件，根据这些文件进行打包
let htmls = glob.sync('./view/**/*.html')
let entries = {},
    htmlPlugins = []
htmls.forEach(function(filePath) {
    let key = filePath.match(/.*(\S+)\.html$/)[1],
        value = `./src/js/${key}.js`;
    entries[key] = value
    htmlPlugins.push(new HtmlWebpackPlugin({
        filename: `view/${key}.html`, // 如：view/index.html
        chunks: [key], // 需要添加的JS
        template: filePath, // HTML模版
    }))
})

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
    new CleanWebpackPlugin([cdn_url.house]),
    extractCss,
    extractScss,
    ...config.plugins
]

module.exports = config