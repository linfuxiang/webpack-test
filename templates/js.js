let args = process.argv.slice(2);
var js_innerText = `import '@SCSS/${args[0]}.scss'
import common from '@JS/lib/common.js'`;

module.exports = js_innerText