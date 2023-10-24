const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Session = require('../models/Session');

// Middleware 
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// Get all sessions for a user
router.get('/', auth, async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.user });
        res.json(sessions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create a new session
router.post('/', auth, async (req, res) => {
    try {
        const newSession = new Session({
            user: req.user,
            messages: []
        });
        const session = await newSession.save();
        res.json(session);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Add a message to a session
router.post('/:sessionId/messages', auth, async (req, res) => {
    try {
        const session = await Session.findById(req.params.sessionId);
        if (!session) {
            return res.status(404).json({ msg: 'Session not found' });
        }
        if (session.user.toString() !== req.user) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        const newMessage = {
            text: req.body.text
        };
        session.messages.unshift(newMessage);
        await session.save();
        res.json(session.messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
