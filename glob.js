var glob = require('glob')
var pattern = './src/js/**/*.js';
glob(pattern, {}, function (err, files) {
    if(err) 
        console.log(err);
    else
        console.log(files);
})
// nodir: true