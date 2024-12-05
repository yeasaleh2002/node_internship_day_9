const jwt = require('jsonwebtoken');
const config = require('../config'); // Ensure this path is correct

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.userId = decoded.user_id; // Pass user_id to the request
        req.role = req.path.split('/')[3]; // Assuming the portal name is the third segment of the path
        next();
    });
};

module.exports = authMiddleware; 