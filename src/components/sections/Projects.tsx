"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Bug, Eye, Shield, Zap, CheckCircle, AlertTriangle, Search } from "lucide-react"

const projectsData = [
  {
    id: 1,
    title: "CleanKart Login & Dashboard Menu Automation Framework",
    description: "Comprehensive end-to-end testing solution for an SaaS application (172 screens)",
    category: "Automation",
    tech: ["Playwright", "TypeScript", "Cucumber", "BDD-Gherkin"],
    status: "ongoing",
    metrics: {
      testCases: 150,
      coverage: "52.9%",
      bugsFound: 0,
      executionTime: "40 min"
    },
    highlights: [
      "Reduced manual testing time by 10%",
      "Reduced time spent by 50% on sanity testing before production release",
      "Cross-browser compatibility validation"
    ],
    github: "https://github.com/rs029/QDC-Playwright/tree/main/features/step-definitions",
    demo: null
  },
  {
    id: 2,
    title: "Multilingual CRM (GCC Focused)",
    description: "Manual functional and localization testing of a bilingual (Arabic & English) CRM with RTL validation and regional compliance checks.",
    category: "Manual",
    tech: ["Manual Testing", "Localization Testing", "Functional & Regression Testing"],
    status: "in-progress",
    metrics: {
      testCases: 500,
      coverage: "24.41%",
      bugsFound: 257,
      executionTime: "90+ hours"
    },
    highlights: [
      "Identified 250+ functional, global, and localization issues",
      "Validated Arabic (RTL) & English UI across CRM workflows",
      "Reduced language-related production defects significantly"
    ],
    github: null,
    demo: null
  }
  // {
  //   id: 3,
  //   title: "Performance Testing Pipeline",
  //   description: "Load testing solution for high-traffic web applications",
  //   category: "Performance",
  //   tech: ["JMeter", "Gatling", "Docker"],
  //   status: "completed",
  //   metrics: {
  //     testCases: 45,
  //     coverage: "78%",
  //     bugsFound: 8,
  //     executionTime: "25 min"
  //   },
  //   highlights: [
  //     "Identified memory leaks under load",
  //     "Database connection pool optimization",
  //     "CDN performance improvements"
  //   ],
  //   github: "https://github.com/username/performance-tests",
  //   demo: "https://perf.example.com"
  // },
  // {
  //   id: 4,
  //   title: "Mobile App Testing Framework",
  //   description: "Cross-platform mobile application testing solution",
  //   category: "Mobile",
  //   tech: ["Appium", "Java", "TestNG"],
  //   status: "planning",
  //   metrics: {
  //     testCases: 120,
  //     coverage: "0%",
  //     bugsFound: 0,
  //     executionTime: "TBD"
  //   },
  //   highlights: [
  //     "iOS and Android compatibility",
  //     "Gesture and UI testing",
  //     "Device farm integration planned"
  //   ],
  //   github: null,
  //   demo: null
  // },
  // {
  //   id: 5,
  //   title: "Regression Testing Dashboard",
  //   description: "Real-time regression testing monitoring and reporting system",
  //   category: "Tools",
  //   tech: ["React", "Node.js", "MongoDB"],
  //   status: "completed",
  //   metrics: {
  //     testCases: 200,
  //     coverage: "88%",
  //     bugsFound: 31,
  //     executionTime: "15 min"
  //   },
  //   highlights: [
  //     "Real-time test execution monitoring",
  //     "Automated report generation",
  //     "Integration with CI/CD pipeline"
  //   ],
  //   github: "https://github.com/username/regression-dashboard",
  //   demo: "https://dashboard.example.com"
  // },
  // {
  //   id: 6,
  //   title: "Accessibility Testing Toolkit",
  //   description: "WCAG 2.1 compliance testing and validation toolkit",
  //   category: "Accessibility",
  //   tech: ["axe-core", "Selenium", "Python"],
  //   status: "in-progress",
  //   metrics: {
  //     testCases: 67,
  //     coverage: "95%",
  //     bugsFound: 12,
  //     executionTime: "6 min"
  //   },
  //   highlights: [
  //     "Screen reader compatibility testing",
  //     "Keyboard navigation validation",
  //     "Color contrast and readability checks"
  //   ],
  //   github: "https://github.com/username/a11y-toolkit",
  //   demo: null
  // }
]

const statusColors: Record<string, string> = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  "in-progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  ongoing: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  planning: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
}

const statusIcons: Record<string, React.ComponentType<any>> = {
  completed: CheckCircle,
  "in-progress": Zap,
  ongoing: Zap,
  planning: Search
}

const categoryIcons: Record<string, React.ComponentType<any>> = {
  Automation: Bug,
  Manual: Eye,
  Security: Shield,
  Performance: Zap,
  Mobile: Search,
  Tools: AlertTriangle,
  Accessibility: CheckCircle
}

export function Projects() {
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
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">QA Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-world testing projects showcasing comprehensive quality assurance strategies 
            and measurable impact on software delivery.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projectsData.map((project) => {
            const StatusIcon = statusIcons[project.status]
            const CategoryIcon = categoryIcons[project.category]

            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="h-full border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <CategoryIcon className="h-5 w-5 text-primary" />
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                      </div>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                        <StatusIcon className="h-3 w-3" />
                        <span>{project.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-lg mb-2">{project.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-center p-2 bg-muted/50 rounded-lg">
                        <div className="text-lg font-bold text-primary">{project.metrics.testCases}</div>
                        <div className="text-xs text-muted-foreground">Test Cases</div>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded-lg">
                        <div className="text-lg font-bold text-primary">{project.metrics.coverage}</div>
                        <div className="text-xs text-muted-foreground">Coverage</div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Key Achievements:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {project.highlights.slice(0, 2).map((highlight, index) => (
                          <li key={index} className="flex items-start space-x-1">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      {project.github && (
                        <Button size="sm" variant="outline" className="flex-1">
                          <Github className="h-4 w-4 mr-1" />
                          Code
                        </Button>
                      )}
                      {project.demo && (
                        <Button size="sm" className="flex-1">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Demo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Interested in Collaboration?</h3>
            <p className="text-muted-foreground mb-6">
              I'm always open to discussing new testing challenges, automation opportunities, 
              and quality assurance strategies.
            </p>
            <Button size="lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Get in Touch
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
