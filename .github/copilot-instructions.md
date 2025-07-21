<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Secrets Web Application - Development Instructions

This is a secure Node.js Express web application focused on user authentication and security best practices.

## Project Structure
- **index.js**: Main server file with Express app, authentication routes, and security middleware
- **views/**: EJS templates for UI (login, register, dashboard, 404)
- **public/**: Static assets (CSS, JavaScript, images)
- **models/**: Data models (currently using in-memory storage)
- **middleware/**: Custom middleware functions
- **routes/**: Route handlers (currently in index.js)

## Key Features Implemented
- User registration with email and password validation
- Secure login with JWT tokens
- Password hashing using bcryptjs (12 salt rounds)
- Email format validation using validator library
- Password requirements: 6-20 characters, uppercase, lowercase, number
- Show/hide password functionality
- Secure HTTP-only cookies
- Session management with express-session
- CSRF protection considerations
- Responsive UI with modern design
- Real-time form validation
- Password strength indicator

## Security Best Practices
- Use bcryptjs for password hashing
- JWT tokens with expiration (24 hours)
- HTTP-only secure cookies
- Input validation and sanitization
- XSS protection through proper templating
- Environment variables for secrets
- Session management with secure settings

## Development Guidelines
- Always validate user input on both client and server side
- Use parameterized queries when implementing database
- Implement rate limiting for authentication endpoints
- Log security events for monitoring
- Use HTTPS in production
- Keep dependencies updated
- Follow principle of least privilege

## Future Enhancements
- Database integration (MongoDB/PostgreSQL)
- Email verification system
- Two-factor authentication
- Password reset functionality
- User profile management
- Admin dashboard
- API rate limiting
- Audit logging

## Code Style
- Use async/await for asynchronous operations
- Implement proper error handling
- Follow RESTful API conventions
- Use meaningful variable and function names
- Add comprehensive comments for complex logic
- Implement proper logging

When making changes:
1. Always consider security implications
2. Test authentication flows thoroughly
3. Validate all user inputs
4. Update documentation as needed
5. Follow existing code patterns and conventions
