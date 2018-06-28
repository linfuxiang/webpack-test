import '@SCSS/common/common.scss'
import '@SCSS/b.scss'
import common from '@JS/lib/common'
import Vue from 'vue'

console.log('%cHello Parcel!', 'color:red;');
common.consoleLog('Hello Parcel!');

let sett = new Set([1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 6]);
let arr = [...sett];
let sym = Symbol();
console.log(arr.includes(1), 5 ** 5)

console.log([...sett]);

function timeout1(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}

timeout(100).then((value) => {
    console.log(value);
});