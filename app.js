const express = require('express');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authMiddleware');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'user' && password === 'password') {
        const token = jwt.sign({ user_id: username }, config.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
});

app.use('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId, role: req.role });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
