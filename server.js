const express = require('express');
const path = require('path');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const session = require('express-session');

// Initialize Firebase Admin SDK
const serviceAccount = require('./my-profile-firestore-firebase-adminsdk-fu202-a42a4cf9dd.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db; // Export Firestore instance

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);

// Static files and view engine
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Import login routes
const loginRoutes = require('./loginejs');
app.use('/', loginRoutes);

// Authentication middleware
const checkAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Protected route (Homepage)
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index', { user: req.session.user });
});

// Login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error during logout:', err);
            res.status(500).send('Failed to log out.');
        } else {
            res.redirect('/login');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
