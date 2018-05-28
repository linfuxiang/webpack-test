let fs = require('fs');
let args = process.argv.slice(2);
const htmlDir = './view/',
    cssDir = './src/css/',
    jsDir = './src/js/';
const postfix = {
    html: '.html',
    css: '.css',
    js: '.js',
};
var html_innerText = `<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
    <title></title>
</head>

<body>
    <div class="page" id="app" v-cloak>
    </div>
    <script src="../src/${args[0]}.js"></script>
</body>

</html>`;

var css_innerText = ``;

var js_innerText = `import '@CSS/${args[0]}.css'
import common from '@JS/lib/common.js'`;


if (args && args.length) {
    if (checkFileExist(args[0] + postfix.html, htmlDir)) {
        console.log('\x1B[33m%s\x1B[0m', 'HTML File exists.');
    } else {
        writeFileSync(htmlDir + args[0] + postfix.html, html_innerText);
    }

    if (checkFileExist(args[0] + postfix.css, cssDir)) {
        console.log('\x1B[33m%s\x1B[0m', 'css File exists.');
    } else {
        writeFileSync(cssDir + args[0] + postfix.css, css_innerText);
    }

    if (checkFileExist(args[0] + postfix.js, jsDir)) {
        console.log('\x1B[33m%s\x1B[0m', 'JS File exists.');
    } else {
        writeFileSync(jsDir + args[0] + postfix.js, js_innerText);
    }
} else {
    console.log('\x1B[33m%s\x1B[0m', 'Please provide file name & type name.');
}

function checkFileExist(fileName, directory = './') {
    try {
        return fs.existsSync(directory + fileName);
    } catch (err) {
        console.log('\x1B[31m%s\x1B[0m', err);
        return null;
    }
}

function writeFileSync(fileName, text = '') {
    try {
        fs.writeFileSync(fileName, text);
        console.log('\x1B[32m%s\x1B[0m', 'Write ' + fileName + ' successfully.');
    } catch (err) {
        console.log('\x1B[31m%s\x1B[0m', err);
        return null;
    }
}

function readdirSync(directory = './') {
    try {
        return fs.readdirSync(directory);
    } catch (err) {
        console.log('\x1B[31m%s\x1B[0m', err);
        return null;
    }
}