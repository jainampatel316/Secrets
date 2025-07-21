# Render Deployment Configuration

## Build Commands
```bash
npm install
```

## Start Command
```bash
npm start
```

## Environment Variables (to be set in Render dashboard)
```
NODE_ENV=production
JWT_SECRET=your-secure-jwt-secret-minimum-32-characters-long
SESSION_SECRET=your-secure-session-secret-minimum-32-characters-long
```

## Important Notes for Deployment

1. **Generate Secure Secrets**: Use strong, random strings for JWT_SECRET and SESSION_SECRET
   ```bash
   # Generate random secrets (use in Render environment variables)
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Environment**: Set NODE_ENV to 'production' in Render

3. **Health Check**: The app responds to GET requests at the root path

4. **Port**: The app uses process.env.PORT (automatically set by Render)

5. **HTTPS**: Render automatically provides HTTPS certificates

## Post-Deployment Checklist
- [ ] Environment variables configured
- [ ] Application starts without errors
- [ ] Registration form works
- [ ] Login functionality works
- [ ] Dashboard accessible after login
- [ ] Logout redirects properly
- [ ] Password validation working
- [ ] Responsive design on mobile
- [ ] HTTPS enabled (automatic on Render)

## Monitoring
- Check Render logs for any errors
- Test all authentication flows
- Verify security headers are present
- Test password requirements
- Confirm JWT tokens are working

## Security Headers (Future Enhancement)
Consider adding helmet.js for additional security headers:
```bash
npm install helmet
```

Then in index.js:
```javascript
const helmet = require('helmet');
app.use(helmet());
```
