const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 原生CSS
let extractCss = new ExtractTextPlugin('./css/[name]-raw.css')
// Sass编译
let extractScss = new ExtractTextPlugin('./css/[name].css')

// 遍历所有HTML文件，根据这些文件进行打包
let htmls = glob.sync('./view/**/*.html')
let entries = {},
    htmlPlugins = []
htmls.forEach(function(filePath) {
    let key = filePath.match(/.*(\S+)\.html$/)[1],
        value = `./src/js/${key}.js`;
    entries[key] = value
    htmlPlugins.push(new HtmlWebpackPlugin({
        filename: `view/${key}.html`,
        chunks: [key],
        template: filePath,
    }))
})

// if(process.env.NODE_ENV === 'development') {

// }

module.exports = {
    // entry: {
    //     a: './src/js/a.js',
    //     b: './src/js/b.js',
    // },
    entry: entries,
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [{
            test: /\.css$/,
            // use: ['style-loader', 'css-loader'],
            use: extractCss.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader'],
            }),
        }, {
            test: /\.scss$/,
            use: extractScss.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader', 'sass-loader'], // loader需要按照此先后顺序，否则报错
            }),
        }]
    },
    resolve: {
        alias: {
            // '@CSS': path.resolve(__dirname, 'src/css'),
            '@SCSS': path.resolve(__dirname, 'src/scss'),
            '@JS': path.resolve(__dirname, 'src/js'),
        }
    },
    devtool: 'source-map',
    plugins: [
        ...htmlPlugins,
        extractCss,
        extractScss,
    ]
}