const express = require('express');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authMiddleware');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Login route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Replace this with your actual user validation logic
    if (username === 'user' && password === 'password') {
        // User is valid, create a token
        const token = jwt.sign({ user_id: username }, config.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }

    // Invalid credentials
    return res.status(401).json({ message: 'Invalid credentials' });
});

// Use the auth middleware for protected routes
app.use('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId, role: req.role });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
