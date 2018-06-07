module.exports = {
    ['GET /api/a'](req, res) {
        return res.json({
            page: 'a',
            id: 123,
        });
    }
}