const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let htmls = glob.sync('./view/**/*.html')
let entries = {},
    htmlPlugins = []
console.log(htmls)
htmls.forEach(function(filePath) {
    let key = filePath.match(/.*(\S+)\.html$/)[1],
        value = `./src/js/${key}.js`;
    entries[key] = value
    htmlPlugins.push(new HtmlWebpackPlugin({
        filename: `${key}.html`,
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
            use: ['style-loader', 'css-loader']
            // use: ExtractTextPlugin.extract({
            //     fallback: "style-loader",
            //     use: "css-loader"
            // })
        }]
    },
    resolve: {
        alias: {
            '@CSS': path.resolve(__dirname, 'src/css'),
            '@JS': path.resolve(__dirname, 'src/js'),
        }
    },
    devtool: 'source-map',
    plugins: [
        ...htmlPlugins,
        // new ExtractTextPlugin("[name].css"),
    ]
}