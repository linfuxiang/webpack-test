let args = process.argv.slice(2);
var mock_innerText = `module.exports = {
    ['GET /api/...'](req, res) {
        return res.json({
        });
    }
}`;

module.exports = mock_innerText