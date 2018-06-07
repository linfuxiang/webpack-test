let fs = require('fs');
let html_innerText = require('./templates/html')
let css_innerText = require('./templates/scss')
let js_innerText = require('./templates/js')
let vue_innerText = require('./templates/vue')
let mock_innerText = require('./templates/mock')

let args = process.argv.slice(2);
const htmlDir = './view/',
    cssDir = './src/scss/',
    jsDir = './src/js/',
    mockDir = './src/mocker/';
const postfix = {
    html: '.html',
    css: '.scss',
    js: '.js',
    mock: '.js',
};

if (args && args.length == 2 && args[1].toLowerCase() == 'vue') {
    // 创建VUE组件
    if (checkFileExist(args[0] + postfix.vue, vueDir)) {
        console.log('\x1B[33m%s\x1B[0m', 'VUE File exists.');
    } else {
        writeFileSync(vueDir + args[0] + postfix.vue, vue_innerText);
    }
} else if (args && args.length == 2 && args[1].toLowerCase() == 'mock') {
    // 创建Mock模拟数据文件
    if (checkFileExist(args[0] + postfix.mock, mockDir)) {
        console.log('\x1B[33m%s\x1B[0m', 'MOCK File exists.');
    } else {
        writeFileSync(mockDir + args[0] + postfix.mock, vue_innerText);
    }
}else if (args && args.length) {
    // 创建页面HTML/JS/SCSS
    if (checkFileExist(args[0] + postfix.html, htmlDir)) {
        console.log('\x1B[33m%s\x1B[0m', 'HTML File exists.');
    } else {
        writeFileSync(htmlDir + args[0] + postfix.html, html_innerText);
    }

    if (checkFileExist(args[0] + postfix.css, cssDir)) {
        console.log('\x1B[33m%s\x1B[0m', 'CSS File exists.');
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