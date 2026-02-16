# Contact Form Setup Guide

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install resend zod
```

### 2. Environment Variables
Copy the example file:
```bash
cp env-example.txt .env.local
```

Update `.env.local` with your actual values:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=your-email@example.com
```

### 3. Get Resend API Key
1. Go to [Resend.com](https://resend.com)
2. Sign up/login
3. Go to API Keys section
4. Create a new API key
5. Copy the key to your `.env.local`

### 4. Update Contact Email
Replace `your-email@example.com` with your actual email address.

## 📧 Email Configuration

### From Email
The API uses Resend's default domain `onboarding@resend.dev` for sending emails. This works out of the box.

### Custom Domain (Optional)
For production, you can:
1. Add your custom domain in Resend dashboard
2. Update the `from` field in the API route

## 🛡️ Security Features

- ✅ Rate limiting (5 requests per hour per IP)
- ✅ Input validation with Zod
- ✅ No API key exposure on client
- ✅ Spam protection
- ✅ Error handling

## 🚀 Deployment (Vercel)

### 1. Environment Variables in Vercel
Add these in your Vercel dashboard:
- `RESEND_API_KEY`
- `CONTACT_EMAIL`

### 2. Automatic Deployment
Push to GitHub and Vercel will automatically deploy.

### 3. Verify Deployment
Test the contact form on your deployed site.

## 🔧 Testing

### Local Testing
```bash
npm run dev
```
Visit `http://localhost:3000` and test the contact form.

### API Testing
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "projectType": "Test Automation",
    "message": "This is a test message."
  }'
```

## 📊 Features

### Form Validation
- Name: 2-100 characters
- Email: Valid email format
- Message: 10-2000 characters
- Company: Optional

### Rate Limiting
- 5 requests per hour per IP
- In-memory storage (for production, consider Redis)

### Email Template
- Professional HTML design
- Responsive layout
- Includes all form data
- Timestamp

## 🐛 Troubleshooting

### Common Issues

1. **"Email service is not configured"**
   - Add `RESEND_API_KEY` to `.env.local`

2. **"Rate limit exceeded"**
   - Wait 1 hour or clear rate limit store

3. **"Validation failed"**
   - Check form field requirements

4. **Email not received**
   - Check spam folder
   - Verify `CONTACT_EMAIL` is correct
   - Check Resend dashboard logs

### Debug Mode
Add console logs to the API route for debugging:
```typescript
console.log('Form data:', validatedData)
console.log('Email response:', { data, error })
```

## 📝 API Response Format

### Success (200)
```json
{
  "success": true,
  "message": "Email sent successfully!",
  "data": { "id": "email-id" }
}
```

### Validation Error (400)
```json
{
  "error": "Validation failed",
  "details": [
    { "field": "email", "message": "Invalid email address" }
  ]
}
```

### Rate Limit (429)
```json
{
  "error": "Too many requests. Please try again later."
}
```

### Server Error (500)
```json
{
  "error": "Internal server error"
}
```

## 🔐 Security Notes

- API key is server-side only
- Rate limiting prevents abuse
- Input sanitization with Zod
- No sensitive data in client logs

## 📈 Production Tips

1. **Monitor email delivery** in Resend dashboard
2. **Set up custom domain** for better deliverability
3. **Consider Redis** for distributed rate limiting
4. **Add analytics** to track form submissions
5. **Set up error monitoring** (Sentry, etc.)

## 🎯 Next Steps

1. ✅ Setup complete
2. ✅ Test locally
3. ✅ Deploy to Vercel
4. ✅ Test on production
5. ✅ Monitor performance

Your contact form is now production-ready! 🎉
