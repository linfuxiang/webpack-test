import '@SCSS/common/common.scss'
import '@SCSS/a.scss'
import png from '@IMAGES/phoenix.jpg'
import common from '@JS/lib/common'
import Vue from 'vue'
import test from '@VUE/e.vue'

new Vue({
    el: '#app',
    data() {
        return {
            a: 'aaaaa',
        }
    },
    components: {
        test
    },
    methods: {
        getUser() {
            fetch('/api/user', {})
                .then((response) => response.json())
                .then(data => {
                    console.log('data:', data);
                })
        }
    }
})

console.log(png)
document.getElementById('img').src = png
// import 'babel-polyfill'
console.log('%cHello Parcel!', 'color:red;');
common.consoleLog('Hello Parcel!');
common.consoleLog(process.env.NODE_ENV);
// let sett = new Set([1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 6]);
let sett = [1, 2, 3]
let arr = [...sett];
// let sym = Symbol();
console.log(arr, 5 ** 5)
class aaa {
    constructor(name = 1) {
        this.name = name
    }
}

// console.log([...sett]);

fetch('/api/user', {})
    .then((response) => response.json())
    .then(data => {
        console.log('data:', data);
    })

fetch('/api/a', {})
    .then((response) => response.json())
    .then(data => {
        console.log('data:', data);
    })

fetch('/api/b', {})
    .then((response) => response.json())
    .then(data => {
        console.log('data:', data);
    })