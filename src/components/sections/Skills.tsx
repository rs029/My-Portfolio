"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { 
  Bug, 
  Shield, 
  Zap, 
  Globe, 
  Lock, 
  Cpu, 
  Terminal,
  Play,
  CheckCircle,
  AlertTriangle,
  Info,
  Search,
  Users,
  Eye,
  Activity,
  Key,
  FileText,
  GitBranch,
  Package
} from "lucide-react"

const skillsData = {
  manual: [
    { 
      name: "Exploratory Testing", 
      level: "Expert",
      description: "Finding bugs through creative test scenarios",
      usage: "Used for discovering edge cases and usability issues",
      icon: Search,
      color: "text-blue-500 dark:text-blue-400"
    },
    { 
      name: "User Acceptance Testing", 
      level: "Advanced",
      description: "Validating features from end-user perspective",
      usage: "Critical for feature sign-off and release readiness",
      icon: Users,
      color: "text-green-500 dark:text-green-400"
    },
    { 
      name: "Regression Testing", 
      level: "Expert",
      description: "Ensuring new changes don't break existing functionality",
      usage: "Comprehensive regression suite for every release",
      icon: Shield,
      color: "text-purple-500 dark:text-purple-400"
    },
    { 
      name: "Usability Testing", 
      level: "Advanced",
      description: "Evaluating user experience and interface design",
      usage: "Identifying UX friction points and accessibility issues",
      icon: Eye,
      color: "text-orange-500 dark:text-orange-400"
    },
  ],
  automation: [
    { 
      name: "Playwright", 
      level: "Intermediate",
      description: "Modern end-to-end testing framework",
      usage: "Cross-browser regression testing in CI/CD pipeline",
      icon: Play,
      color: "text-blue-600 dark:text-blue-500"
    },
    { 
      name: "Cypress", 
      level: "Intermediate",
      description: "JavaScript-based end-to-end testing",
      usage: "Fast component testing and API integration testing",
      icon: Terminal,
      color: "text-green-600 dark:text-green-500"
    },
    { 
      name: "Selenium WebDriver", 
      level: "Beginner",
      description: "Legacy browser automation framework",
      usage: "Maintaining existing test suites for enterprise clients",
      icon: Globe,
      color: "text-purple-600 dark:text-purple-500"
    },
    // { 
    //   name: "Jest & React Testing Library", 
    //   level: "Advanced",
    //   description: "Unit and integration testing for React apps",
    //   usage: "Component testing with focus on user behavior",
    //   icon: Cpu,
    //   color: "text-orange-600 dark:text-orange-500"
    // },
  ],
  performance: [
    { 
      name: "Load Testing", 
      level: "Beginner",
      description: "Simulating user traffic and server load",
      usage: "Identifying bottlenecks before production deployment",
      icon: Zap,
      color: "text-yellow-500 dark:text-yellow-400"
    },
    { 
      name: "Performance Monitoring", 
      level: "Beginner",
      description: "Real-time performance metrics and alerts",
      usage: "Continuous monitoring of Core Web Vitals and API response times",
      icon: Activity,
      color: "text-red-500 dark:text-red-400"
    },
    { 
      name: "Memory Leak Detection", 
      level: "Beginner",
      description: "Identifying and preventing memory issues",
      usage: "Critical for long-running applications and mobile apps",
      icon: AlertTriangle,
      color: "text-indigo-500 dark:text-indigo-400"
    },
  ],
  api: [
    { 
      name: "REST API Testing", 
      level: "Expert",
      description: "Comprehensive API validation and testing",
      usage: "Automated API testing with Postman and custom scripts",
      icon: Globe,
      color: "text-blue-500 dark:text-blue-400"
    },
    { 
      name: "GraphQL Testing", 
      level: "Advanced",
      description: "Testing GraphQL queries and mutations",
      usage: "Validating schema compliance and performance",
      icon: Terminal,
      color: "text-pink-500 dark:text-pink-400"
    },
    // { 
    //   name: "API Security Testing", 
    //   level: "Intermediate",
    //   description: "Identifying API vulnerabilities and security gaps",
    //   usage: "OWASP security testing and authentication validation",
    //   icon: Lock,
    //   color: "text-red-500 dark:text-red-400"
    // },
  ],
  security: [
    // { 
    //   name: "OWASP Testing", 
    //   level: "Intermediate",
    //   description: "Security testing based on OWASP standards",
    //   usage: "Identifying common web application vulnerabilities",
    //   icon: Lock,
    //   color: "text-red-600 dark:text-red-500"
    // },
    // { 
    //   name: "Penetration Testing", 
    //   level: "Intermediate",
    //   description: "Ethical hacking to find security flaws",
    //   usage: "Simulated attacks to test system defenses",
    //   icon: Shield,
    //   color: "text-orange-600 dark:text-orange-500"
    // },
    { 
      name: "Authentication Testing", 
      level: "Advanced",
      description: "Testing user authentication and authorization",
      usage: "Validating JWT, OAuth, and session management",
      icon: Key,
      color: "text-green-600 dark:text-green-500"
    },
  ],
  tools: [
    { 
      name: "JIRA", 
      level: "Expert",
      description: "Test case management and bug tracking",
      usage: "Comprehensive test planning and defect lifecycle management",
      icon: CheckCircle,
      color: "text-blue-500 dark:text-blue-400"
    },
    // { 
    //   name: "TestRail", 
    //   level: "Advanced",
    //   description: "Test management and reporting",
    //   usage: "Detailed test execution reports and metrics",
    //   icon: FileText,
    //   color: "text-purple-500 dark:text-purple-400"
    // },
    { 
      name: "Linear", 
      level: "Advanced",
      description: "Test management and reporting",
      usage: "Detailed test execution reports and metrics",
      icon: FileText,
      color: "text-purple-500 dark:text-purple-400"
    },
    { 
      name: "GitHub Actions", 
      level: "Advanced",
      description: "CI/CD pipeline automation",
      usage: "Automated testing workflows and deployment gates",
      icon: GitBranch,
      color: "text-black dark:text-white"
    },
    // { 
    //   name: "Docker", 
    //   level: "Intermediate",
    //   description: "Containerized testing environments",
    //   usage: "Consistent testing environments across teams",
    //   icon: Package,
    //   color: "text-blue-600 dark:text-blue-500"
    // },
  ],
}

const SkillChip = ({ skill, index }: { skill: any, index: number }) => {
  const Icon = skill.icon || Bug
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.2)"
            }}
            className="inline-block"
          >
            <Card className="cursor-pointer border-2 border-border hover:border-primary hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${skill.color}`} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-sm">{skill.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{skill.level}</span>
                      <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              i < (skill.level === 'Expert' ? 3 : skill.level === 'Advanced' ? 2 : 1)
                                ? 'bg-primary' 
                                : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-4 bg-background/95 backdrop-blur-sm border border-border shadow-2xl" side="top">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon className={`h-4 w-4 ${skill.color}`} />
              <span className="font-semibold">{skill.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">{skill.description}</p>
            <div className="flex items-center space-x-1 pt-2 border-t border-border">
              <Info className="h-3 w-3 text-primary" />
              <p className="text-xs text-primary">{skill.usage}</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function Skills() {
  const [activeTab, setActiveTab] = useState("manual")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="h-5 w-5 text-primary" />
            <span className="text-primary font-semibold">Technical Expertise</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Skills & Tools</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive quality engineering expertise across manual testing, automation, 
            performance, security, and modern development tools.
          </p>
        </motion.div>

        {/* Interactive Skills Tabs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8 bg-card border border-border">
              {Object.keys(skillsData).map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="capitalize text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(skillsData).map(([category, skills]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold capitalize mb-2">{category} Testing</h3>
                    <p className="text-muted-foreground">
                      {category === 'manual' && 'Hands-on testing expertise with focus on user experience and edge cases'}
                      {category === 'automation' && 'Modern automation frameworks and continuous integration testing'}
                      {category === 'performance' && 'Load testing, monitoring, and performance optimization'}
                      {category === 'api' && 'Comprehensive API testing and validation strategies'}
                      {category === 'security' && 'Security testing and vulnerability assessment'}
                      {category === 'tools' && 'Test management, CI/CD, and development tools'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {skills.map((skill, index) => (
                      <SkillChip key={skill.name} skill={skill} index={index} />
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="text-center border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="text-3xl font-bold gradient-text mb-2">2+</div>
              <p className="text-sm text-muted-foreground">Years of Testing Experience</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-2 border-green-500/20">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-500 mb-2">150+</div>
              <p className="text-sm text-muted-foreground">Automated Test Cases</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-2 border-blue-500/20">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-500 mb-2">10+</div>
              <p className="text-sm text-muted-foreground">Tools & Frameworks</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
