# 🔐 Secrets - Secure Web Application

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-v5+-blue.svg)](https://expressjs.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Security](https://img.shields.io/badge/Security-JWT%20%2B%20bcrypt-red.svg)](https://jwt.io)

A modern, secure web application built with Node.js and Express that demonstrates robust authentication and security best practices. Users can safely register, login, and manage their accounts with enterprise-level security measures.

## 🌟 Live Demo

🚀 **Deployed Application**: [Your Render Deploy Link Here]

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
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd secrets
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment file
   cp .env.example .env
   
   # Edit .env with your configuration
   # Change the JWT_SECRET and SESSION_SECRET to secure values
   ```

4. **Start the application**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`
   - Register a new account or use existing credentials

## 📁 Project Structure

```
secrets/
├── index.js                 # Main server file
├── package.json             # Dependencies and scripts
├── .env                     # Environment variables
├── README.md               # Project documentation
├── .github/                # GitHub configurations
│   └── copilot-instructions.md
├── public/                 # Static assets
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   └── js/
│       └── app.js          # Client-side JavaScript
├── views/                  # EJS templates
│   ├── login.ejs          # Login page
│   ├── register.ejs       # Registration page
│   ├── dashboard.ejs      # User dashboard
│   └── 404.ejs            # Error page
├── models/                 # Data models (future)
├── routes/                 # Route handlers (future)
└── middleware/             # Custom middleware (future)
```

## 🔐 Security Implementation

### Password Security
- **Minimum Requirements**: 6-20 characters, uppercase, lowercase, number
- **Hashing**: bcryptjs with 12 salt rounds
- **Validation**: Real-time client-side and server-side validation

### Authentication
- **JWT Tokens**: Stateless authentication with 24-hour expiration
- **Secure Cookies**: HTTP-only, secure, SameSite attributes
- **Session Management**: Express-session with secure configuration

### Input Validation
- **Email Validation**: Format validation using validator library
- **XSS Prevention**: Proper input sanitization and output encoding
- **CSRF Protection**: Token-based protection (ready for implementation)

## 🎨 UI/UX Features

### Design Principles
- **Modern Aesthetic**: Clean, professional design
- **Responsive Layout**: Mobile-first approach
- **Accessibility**: WCAG 2.1 compliant
- **Performance**: Optimized CSS and JavaScript

### Interactive Elements
- **Loading States**: Visual feedback during form submission
- **Animations**: Smooth transitions and hover effects
- **Real-time Feedback**: Instant validation messages
- **Progress Indicators**: Password strength meter

## 🌐 Deployment on Render

### Prerequisites
- GitHub repository with your code
- Render account (free tier available)

### Deployment Steps

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Create Render Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name**: secrets-app
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

3. **Environment Variables**
   Add these environment variables in Render:
   ```
   NODE_ENV=production
   JWT_SECRET=your-secure-jwt-secret-here
   SESSION_SECRET=your-secure-session-secret-here
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Your app will be available at the provided URL

### Deployment Checklist
- [ ] Environment variables configured
- [ ] HTTPS enabled (automatic on Render)
- [ ] Secure cookies configured for production
- [ ] Database connected (if using external DB)
- [ ] Error logging enabled
- [ ] Performance monitoring set up

## 📚 API Documentation

### Authentication Endpoints

#### POST /register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123"
}
```

**Response:** Redirect to login page with success message

#### POST /login
Authenticate user and create session.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:** Redirect to dashboard with JWT cookie

#### POST /logout
End user session and clear authentication.

**Response:** Redirect to login page

### Protected Routes

#### GET /dashboard
Access user dashboard (requires authentication).

**Response:** Dashboard page with user information

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration with valid data
- [ ] Registration validation (invalid email, weak password)
- [ ] User login with correct credentials
- [ ] Login validation (invalid email format, wrong password)
- [ ] Dashboard access when authenticated
- [ ] Redirect to login when not authenticated
- [ ] Password show/hide functionality
- [ ] Logout functionality
- [ ] Session persistence across browser restarts
- [ ] Responsive design on mobile devices

### Security Testing
- [ ] SQL injection attempts (when database is added)
- [ ] XSS attack prevention
- [ ] CSRF token validation
- [ ] Session hijacking protection
- [ ] Password complexity enforcement
- [ ] Rate limiting (to be implemented)

## 🚧 Future Enhancements

### Planned Features
- **Database Integration** (MongoDB/PostgreSQL)
- **Email Verification** system
- **Two-Factor Authentication** (2FA)
- **Password Reset** functionality
- **User Profile Management**
- **Admin Dashboard**
- **API Rate Limiting**
- **Audit Logging**
- **Social Media Login** (OAuth)
- **Remember Me** functionality

### Performance Improvements
- **Redis Session Store**
- **Caching Layer**
- **CDN Integration**
- **Image Optimization**
- **Minification & Compression**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Add tests for new functionality
- Update documentation as needed
- Ensure security best practices
- Test thoroughly before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Express.js** team for the excellent web framework
- **bcrypt** contributors for secure password hashing
- **JWT** for stateless authentication
- **Font Awesome** for beautiful icons
- **Google Fonts** for typography
- **Render** for hosting platform

## 📞 Support

If you have any questions or need support:

1. **Check Documentation**: Read through this README thoroughly
2. **Search Issues**: Look through existing GitHub issues
3. **Create Issue**: Open a new issue with detailed description
4. **Contact**: Reach out via email or social media

---

**Built with ❤️ for security and user experience**

*Last updated: January 2025*
