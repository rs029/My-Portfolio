import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

// Rate limiting store (in-memory for production, consider Redis for scale)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds
const RATE_LIMIT_MAX_REQUESTS = 5 // Max 5 requests per hour per IP

// Zod schema for validation
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  projectType: z.string().min(1, 'Project type is required'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be less than 2000 characters')
})

// Rate limiting middleware
function rateLimit(ip: string): { allowed: boolean; error?: string } {
  const now = Date.now()
  const existing = rateLimitStore.get(ip)

  if (!existing || now > existing.resetTime) {
    // First request or window reset
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true }
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { 
      allowed: false, 
      error: 'Too many requests. Please try again later.' 
    }
  }

  existing.count++
  return { allowed: true }
}

// HTML Email Template
function generateEmailTemplate(data: z.infer<typeof contactSchema>) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Portfolio Contact</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          border-bottom: 2px solid #e9ecef;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #2c3e50;
          margin: 0;
          font-size: 24px;
        }
        .header p {
          color: #6c757d;
          margin: 5px 0 0 0;
          font-size: 14px;
        }
        .field {
          margin-bottom: 20px;
        }
        .field-label {
          font-weight: 600;
          color: #495057;
          margin-bottom: 5px;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .field-value {
          background-color: #f8f9fa;
          padding: 12px;
          border-radius: 5px;
          border-left: 4px solid #007bff;
          word-wrap: break-word;
        }
        .message-field {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
          border-left: 4px solid #28a745;
          white-space: pre-wrap;
          font-family: inherit;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e9ecef;
          font-size: 12px;
          color: #6c757d;
          text-align: center;
        }
        .project-badge {
          display: inline-block;
          background-color: #007bff;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 New Portfolio Contact</h1>
          <p>Sent from your QA portfolio website</p>
        </div>
        
        <div class="field">
          <div class="field-label">Name</div>
          <div class="field-value">${data.name}</div>
        </div>
        
        <div class="field">
          <div class="field-label">Email</div>
          <div class="field-value">${data.email}</div>
        </div>
        
        ${data.company ? `
        <div class="field">
          <div class="field-label">Company</div>
          <div class="field-value">${data.company}</div>
        </div>
        ` : ''}
        
        <div class="field">
          <div class="field-label">Project Type</div>
          <div class="field-value">
            <span class="project-badge">${data.projectType}</span>
          </div>
        </div>
        
        <div class="field">
          <div class="field-label">Message</div>
          <div class="message-field">${data.message}</div>
        </div>
        
        <div class="footer">
          <p>This email was sent from your portfolio contact form on ${new Date().toLocaleString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
              request.headers.get('x-real-ip') || 
              'unknown'
    
    // Apply rate limiting
    const rateLimitResult = rateLimit(ip)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: rateLimitResult.error || 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    
    try {
      const validatedData = contactSchema.parse(body)
      
      // Initialize Resend
      if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not configured')
        return NextResponse.json(
          { error: 'Email service is not configured' },
          { status: 500 }
        )
      }

      const resend = new Resend(process.env.RESEND_API_KEY)

      // Send email
      const { data, error } = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>', // Use Resend's default domain
        to: process.env.CONTACT_EMAIL || 'rs029singh@gmail.com', // Your email
        replyTo: validatedData.email,
        subject: `Portfolio Contact - ${validatedData.projectType}`,
        html: generateEmailTemplate(validatedData)
      })

      if (error) {
        console.error('Resend error:', error)
        return NextResponse.json(
          { error: 'Failed to send email. Please try again later.' },
          { status: 500 }
        )
      }

      return NextResponse.json(
        { 
          success: true, 
          message: 'Email sent successfully!',
          data: { id: data?.id }
        },
        { status: 200 }
      )

    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        return NextResponse.json(
          { 
            error: 'Validation failed',
            details: validationError.issues.map((err: z.ZodIssue) => ({
              field: err.path.join('.'),
              message: err.message
            }))
          },
          { status: 400 }
        )
      }
      throw validationError
    }

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Contact API endpoint' },
    { status: 200 }
  )
}
