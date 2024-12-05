const config = require('../config'); // Assuming you have a config file

const maintenanceMiddleware = (req, res, next) => {
    if (config.MAINTENANCE_MODE) {
        return res.status(503).json({ message: 'Service is temporarily unavailable. Please try again later.' });
    }
    next();
};

module.exports = maintenanceMiddleware; 