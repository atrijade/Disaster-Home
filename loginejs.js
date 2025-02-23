const express = require('express');
const router = express.Router();
const db = require('./server'); // Import Firestore from server.js

// User Registration Route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send('All fields are required.');
    }

    try {
        // Check if user already exists
        const userRef = db.collection('users').doc(email);
        const doc = await userRef.get();

        if (doc.exists) {
            return res.status(400).send('User already exists. Please login.');
        }

        // Create new user in Firestore
        await userRef.set({
            username,
            email,
            password, // Store securely (hashing recommended in production)
        });

        res.redirect('/login');
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Failed to register.');
    }
});

// User Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    try {
        const userRef = db.collection('users').doc(email);
        const doc = await userRef.get();

        if (!doc.exists || doc.data().password !== password) {
            return res.status(401).send('Invalid email or password.');
        }

        // Set session
        req.session.user = { email, username: doc.data().username };
        res.redirect('/');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Failed to login.');
    }
});

module.exports = router;
