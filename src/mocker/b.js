module.exports = {
    ['GET /api/b'](req, res) {
        return res.json({
            page: 'b',
            id: 345,
        });
    }
}