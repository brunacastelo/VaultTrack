const healthCheck = (req, res) => {
    res.json({ status: 'OK', message: 'API is running smoothly!!!' });
};

module.exports = { healthCheck };
