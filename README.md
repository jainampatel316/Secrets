# 🔐 Secrets - Secure Web Application

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-v5+-blue.svg)](https://expressjs.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Security](https://img.shields.io/badge/Security-JWT%20%2B%20bcrypt-red.svg)](https://jwt.io)

A modern, secure web application built with Node.js and Express that demonstrates robust authentication and security best practices. Users can safely register, login, and manage their accounts with enterprise-level security measures.

## 🌟 Live Demo

🚀 **Deployed Application**: [https://secrets-lrli.onrender.com](https://secrets-lrli.onrender.com)

## ✨ Features

### 🔒 Security Features
- **Secure User Registration** with email format validation
- **Strong Password Requirements** (uppercase, lowercase, number, 6-20 characters)
- **Password Hashing** using bcryptjs with salt rounds
- **JWT Authentication** with secure HTTP-only cookies
- **Session Management** with express-session
- **XSS Protection** through proper input validation
- **CSRF Protection** considerations implemented

### 🎨 User Experience
- **Responsive Design** - Works on all devices
- **Real-time Validation** - Instant feedback on form inputs
- **Password Visibility Toggle** - Show/hide password functionality
- **Modern UI** - Beautiful gradient design with animations
- **User Dashboard** - Secure area displaying user information
- **Activity Tracking** - Shows recent account activities

### 🔧 Technical Features
- **MVC Architecture** - Clean separation of concerns
- **Environment Configuration** - Secure handling of secrets
- **Error Handling** - Comprehensive error management
- **Input Sanitization** - Protection against malicious inputs
- **Secure Cookies** - HTTP-only and secure flags
- **Session Timeout** - Automatic logout after inactivity

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **EJS** - Templating engine
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **express-session** - Session management
- **cookie-parser** - Cookie handling
- **validator** - Input validation
- **dotenv** - Environment variables

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid/Flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jainampatel316/Secrets.git
   cd secrets
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file with:
   ```
   JWT_SECRET=your-secure-jwt-secret
   SESSION_SECRET=your-secure-session-secret
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
secrets/
├── index.js                 # Main server file
├── package.json             # Dependencies and scripts
├── public/                  # Static assets
│   ├── css/style.css        # Stylesheet
│   └── js/app.js            # Client-side JavaScript
└── views/                   # EJS templates
    ├── login.ejs            # Login page
    ├── register.ejs         # Registration page
    ├── dashboard.ejs        # User dashboard
    └── 404.ejs              # Error page
```

##  License

This project is licensed under the MIT License.
