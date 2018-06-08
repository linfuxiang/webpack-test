let fs = require('fs')
let func = {
    removeDir(dir) {
        let files
    	try {
    		files = fs.readdirSync(dir)
    	} catch(err) {
    		console.log('\x1B[32m%s\x1B[0m', 'Directory not exists.')
    		return false
    	}
        if (files && files.length) {
            for (var f of files) {
                let stat = fs.statSync(dir + '/' + f)
                if (stat.isDirectory()) {
                    func.removeDir(dir + '/' + f)
                } else if (stat.isFile()) {
                    fs.unlinkSync(dir + '/' + f)
                }
                let inner_file = fs.readdirSync(dir)
                if (inner_file && !inner_file.length) {
                    fs.rmdirSync(dir)
                }
            }
        } else {
            // 无任何文件，直接删除目录
            fs.rmdirSync(dir)
        }
    },
    checkFileExist(fileName, directory = './') {
        try {
            return fs.existsSync(directory + fileName);
        } catch (err) {
            console.log('\x1B[31m%s\x1B[0m', err);
            return null;
        }
    },
    writeFileSync(fileName, text = '') {
        try {
            fs.writeFileSync(fileName, text);
            console.log('\x1B[32m%s\x1B[0m', 'Write ' + fileName + ' successfully.');
        } catch (err) {
            console.log('\x1B[31m%s\x1B[0m', err);
            return null;
        }
    },
    readdirSync(directory = './') {
        try {
            return fs.readdirSync(directory);
        } catch (err) {
            console.log('\x1B[31m%s\x1B[0m', err);
            return null;
        }
    },
}

module.exports = func