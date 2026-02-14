"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle } from "lucide-react"

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "qa.analyst@portfolio.com",
    href: "mailto:qa.analyst@portfolio.com",
    description: "For project inquiries and collaborations"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    description: "Available for urgent testing consultations"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: null,
    description: "Open to remote and hybrid opportunities"
  }
]

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/username",
    description: "Open source contributions and test automation scripts"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/username",
    description: "Professional network and QA insights"
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: "https://twitter.com/username",
    description: "QA tips and industry updates"
  }
]

const expertiseAreas = [
  "Test Automation",
  "API Testing",
  "Performance Testing",
  "Security Testing",
  "Mobile Testing",
  "CI/CD Integration"
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: ""
  })
  
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setFormStatus("loading")
    
    // Simulate form submission
    setTimeout(() => {
      // Simulate success (90% success rate for demo)
      if (Math.random() > 0.1) {
        setFormStatus("success")
        setFormData({ name: "", email: "", company: "", projectType: "", message: "" })
        setErrors({})
      } else {
        setFormStatus("error")
      }
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to enhance your software quality? Let's discuss how comprehensive testing 
            strategies can drive your project success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Contact Methods */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.label}
                    variants={itemVariants}
                    className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <method.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{method.label}</h4>
                      {method.href ? (
                        <a 
                          href={method.href}
                          className="text-primary hover:underline transition-colors"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-foreground">{method.value}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <social.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                    <div>
                      <h4 className="font-semibold">{social.label}</h4>
                      <p className="text-xs text-muted-foreground">{social.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Expertise Areas */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {expertiseAreas.map((area, index) => (
                  <motion.div
                    key={area}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge variant="secondary" className="px-3 py-1">
                      {area}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Send Me a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and I'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.name ? "border-destructive" : "border-border"
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.email ? "border-destructive" : "border-border"
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Company Field */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Acme Corp"
                    />
                  </div>

                  {/* Project Type Field */}
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      value={formData.projectType}
                      onChange={(e) => handleInputChange("projectType", e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a project type</option>
                      <option value="automation">Test Automation</option>
                      <option value="performance">Performance Testing</option>
                      <option value="security">Security Testing</option>
                      <option value="consulting">QA Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
                        errors.message ? "border-destructive" : "border-border"
                      }`}
                      placeholder="Tell me about your project and testing needs..."
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Form Status Messages */}
                  {formStatus === "success" && (
                    <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md">
                      <p className="text-green-800 dark:text-green-400 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Message sent successfully! I'll get back to you soon.
                      </p>
                    </div>
                  )}

                  {formStatus === "error" && (
                    <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md">
                      <p className="text-red-800 dark:text-red-400 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Something went wrong. Please try again later.
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={formStatus === "loading"}
                  >
                    {formStatus === "loading" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
