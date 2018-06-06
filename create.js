let fs = require('fs');
let html_innerText = require('./templates/html')
let css_innerText = require('./templates/scss')
let js_innerText = require('./templates/js')

let args = process.argv.slice(2);
const htmlDir = './view/',
    cssDir = './src/scss/',
    jsDir = './src/js/';
const postfix = {
    html: '.html',
    css: '.scss',
    js: '.js',
};

console.log(args)

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