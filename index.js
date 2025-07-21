const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const validator = require('validator');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// In-memory user storage (In production, use a proper database)
const users = [];

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-change-in-production';

// Password validation function
function validatePassword(password) {
    const minLength = 6;
    const maxLength = 20;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    return {
        isValid: password.length >= minLength && 
                password.length <= maxLength && 
                hasUpperCase && 
                hasLowerCase && 
                hasNumber,
        errors: {
            length: password.length < minLength || password.length > maxLength,
            uppercase: !hasUpperCase,
            lowercase: !hasLowerCase,
            number: !hasNumber
        }
    };
}

// Middleware to check authentication
function authenticateToken(req, res, next) {
    const token = req.cookies.token || req.session.token;
    
    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.clearCookie('token');
            delete req.session.token;
            return res.redirect('/login');
        }
        req.user = user;
        next();
    });
}

// Routes

// Home route - redirect to login if not authenticated
app.get('/', (req, res) => {
    const token = req.cookies.token || req.session.token;
    if (token) {
        try {
            jwt.verify(token, JWT_SECRET);
            return res.redirect('/dashboard');
        } catch (err) {
            res.clearCookie('token');
            delete req.session.token;
        }
    }
    res.redirect('/login');
});

// Login page
app.get('/login', (req, res) => {
    const token = req.cookies.token || req.session.token;
    if (token) {
        try {
            jwt.verify(token, JWT_SECRET);
            return res.redirect('/dashboard');
        } catch (err) {
            res.clearCookie('token');
            delete req.session.token;
        }
    }
    res.render('login', { error: null, success: req.query.success });
});

// Register page
app.get('/register', (req, res) => {
    const token = req.cookies.token || req.session.token;
    if (token) {
        try {
            jwt.verify(token, JWT_SECRET);
            return res.redirect('/dashboard');
        } catch (err) {
            res.clearCookie('token');
            delete req.session.token;
        }
    }
    res.render('register', { error: null, formData: {} });
});

// Dashboard (protected route)
app.get('/dashboard', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    res.render('dashboard', { user: user });
});

// Register POST
app.post('/register', async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            return res.render('register', { 
                error: 'All fields are required', 
                formData: { name, email } 
            });
        }

        // Email format validation
        if (!validator.isEmail(email)) {
            return res.render('register', { 
                error: 'Please enter a valid email address', 
                formData: { name, email } 
            });
        }

        // Password confirmation
        if (password !== confirmPassword) {
            return res.render('register', { 
                error: 'Passwords do not match', 
                formData: { name, email } 
            });
        }

        // Password validation
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            let errorMessage = 'Password must contain: ';
            const errors = [];
            if (passwordValidation.errors.length) errors.push('6-20 characters');
            if (passwordValidation.errors.uppercase) errors.push('uppercase letter');
            if (passwordValidation.errors.lowercase) errors.push('lowercase letter');
            if (passwordValidation.errors.number) errors.push('number');
            errorMessage += errors.join(', ');
            
            return res.render('register', { 
                error: errorMessage, 
                formData: { name, email } 
            });
        }

        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.render('register', { 
                error: 'User with this email already exists', 
                formData: { name, email } 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const newUser = {
            id: users.length + 1,
            name,
            email,
            password: hashedPassword,
            registeredAt: new Date()
        };

        users.push(newUser);

        // Redirect to login with success message
        res.redirect('/login?success=Registration successful! Please login.');
    } catch (error) {
        console.error('Registration error:', error);
        res.render('register', { 
            error: 'An error occurred during registration', 
            formData: { name: req.body.name, email: req.body.email } 
        });
    }
});

// Login POST
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.render('login', { 
                error: 'Email and password are required', 
                success: null 
            });
        }

        // Email format validation
        if (!validator.isEmail(email)) {
            return res.render('login', { 
                error: 'Please enter a valid email address', 
                success: null 
            });
        }

        // Find user
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.render('login', { 
                error: 'Invalid email or password', 
                success: null 
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.render('login', { 
                error: 'Invalid email or password', 
                success: null 
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Set secure cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            sameSite: 'strict'
        });

        // Also store in session as backup
        req.session.token = token;

        res.redirect('/dashboard');
    } catch (error) {
        console.error('Login error:', error);
        res.render('login', { 
            error: 'An error occurred during login', 
            success: null 
        });
    }
});

// Logout
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destroy error:', err);
        }
        res.redirect('/login');
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404');
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`🔐 Secrets app running on port ${PORT}`);
    console.log(`📱 Access your app at: http://localhost:${PORT}`);
});
