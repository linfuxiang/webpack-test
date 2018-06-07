const fs = require('fs')

let mockObj = {
    [`GET /api/user`](req, res) {
        return res.json({
            id: 1,
            username: 'kenny',
            sex: 6
        });
    }
}
let files = fs.readdirSync('./src/mocker')

files.forEach(function(item) {
	if(item !== 'index.js') {
		Object.assign(mockObj, require(`./${item}`))
	}
})

module.exports = mockObj