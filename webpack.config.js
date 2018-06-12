const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
        chunks: ['commons', key], // 需要添加的JS
        template: filePath, // HTML模版
    }))
})

module.exports = {
    // entry: {
    //     a: './src/js/a.js',
    //     b: './src/js/b.js',
    // },
    entry: entries,
    // output: output,
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
            // cacheDirectory: true,    // 缓存编译内容
        }, {
            test: /\.(htm|html)$/,
            use: ['html-withimg-loader'],
        }, {
            test: /\.vue$/,
            use: ['vue-loader'],
        }]
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.common.js',
            // '@CSS': path.resolve(__dirname, 'src/css'),
            '@SCSS': path.resolve(__dirname, 'src/scss'),
            '@JS': path.resolve(__dirname, 'src/js'),
            '@IMAGES': path.resolve(__dirname, 'src/images'),
            '@VUE': path.resolve(__dirname, 'src/vue'),
        }
    },
    devtool: 'source-map',
    plugins: [
        ...htmlPlugins,
        new VueLoaderPlugin(),
    ]
}