"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Zap, 
  Shield, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity,
  Timer,
  Bug,
  Code,
  Download,
  Calendar
} from "lucide-react"

const metricsData = {
  overview: [
    {
      title: "Test Coverage",
      value: "87.3%",
      change: "+5.2%",
      trend: "up",
      description: "Code coverage across all test suites",
      target: "90%",
      status: "good"
    },
    {
      title: "Bug Detection Rate",
      value: "94.7%",
      change: "+2.1%",
      trend: "up", 
      description: "Bugs found before production",
      target: "95%",
      status: "excellent"
    },
    {
      title: "Test Execution Time",
      value: "12.4 min",
      change: "-18.3%",
      trend: "down",
      description: "Average time for full test suite",
      target: "< 15 min",
      status: "excellent"
    },
    {
      title: "Automation Coverage",
      value: "76.8%",
      change: "+8.4%",
      trend: "up",
      description: "Tests automated vs manual",
      target: "80%",
      status: "good"
    }
  ],
  quality: [
    {
      title: "Critical Bugs",
      value: "3",
      change: "-40%",
      trend: "down",
      description: "High severity issues in production",
      target: "0",
      status: "warning"
    },
    {
      title: "Customer Reported Issues",
      value: "12",
      change: "-25%",
      trend: "down",
      description: "Bugs reported by customers",
      target: "< 10",
      status: "good"
    },
    {
      title: "Mean Time to Resolution",
      value: "4.2 days",
      change: "-15%",
      trend: "down",
      description: "Average time to fix bugs",
      target: "< 3 days",
      status: "warning"
    },
    {
      title: "Regression Rate",
      value: "2.1%",
      change: "-0.8%",
      trend: "down",
      description: "Features breaking after updates",
      target: "< 2%",
      status: "excellent"
    }
  ],
  performance: [
    {
      title: "Page Load Time",
      value: "2.1s",
      change: "-12%",
      trend: "down",
      description: "Average page load duration",
      target: "< 2.5s",
      status: "excellent"
    },
    {
      title: "API Response Time",
      value: "145ms",
      change: "-8%",
      trend: "down",
      description: "Average API response time",
      target: "< 200ms",
      status: "excellent"
    },
    {
      title: "Error Rate",
      value: "0.3%",
      change: "-0.2%",
      trend: "down",
      description: "Application error rate",
      target: "< 0.5%",
      status: "excellent"
    },
    {
      title: "Uptime",
      value: "99.97%",
      change: "+0.1%",
      trend: "up",
      description: "Service availability",
      target: "> 99.9%",
      status: "excellent"
    }
  ],
  efficiency: [
    {
      title: "Tests per Sprint",
      value: "47",
      change: "+15%",
      trend: "up",
      description: "Average tests created per sprint",
      target: "> 40",
      status: "excellent"
    },
    {
      title: "CI/CD Pipeline Time",
      value: "8.3 min",
      change: "-22%",
      trend: "down",
      description: "From commit to deployment",
      target: "< 10 min",
      status: "excellent"
    },
    {
      title: "Test Environment Uptime",
      value: "98.7%",
      change: "+2.1%",
      trend: "up",
      description: "Test environment availability",
      target: "> 98%",
      status: "excellent"
    },
    {
      title: "Flaky Test Rate",
      value: "1.2%",
      change: "-0.5%",
      trend: "down",
      description: "Tests with inconsistent results",
      target: "< 2%",
      status: "excellent"
    }
  ]
}

const statusColors = {
  excellent: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  good: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  critical: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
}

const statusIcons = {
  excellent: CheckCircle,
  good: Target,
  warning: AlertTriangle,
  critical: AlertTriangle
}

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown
}

const projectMetrics = [
  {
    name: "E-Commerce Platform",
    coverage: 92.1,
    bugsFound: 23,
    executionTime: 8.4,
    status: "excellent"
  },
  {
    name: "Mobile Banking App",
    coverage: 85.7,
    bugsFound: 15,
    executionTime: 12.1,
    status: "good"
  },
  {
    name: "API Gateway",
    coverage: 94.3,
    bugsFound: 8,
    executionTime: 6.2,
    status: "excellent"
  },
  {
    name: "Admin Dashboard",
    coverage: 78.9,
    bugsFound: 19,
    executionTime: 15.3,
    status: "good"
  },
  {
    name: "Customer Portal",
    coverage: 81.2,
    bugsFound: 11,
    executionTime: 9.7,
    status: "good"
  }
]

export function Metrics() {
  const [selectedCategory, setSelectedCategory] = useState("overview")
  const [timeRange, setTimeRange] = useState("30d")

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

  const currentMetrics = metricsData[selectedCategory as keyof typeof metricsData]

  return (
    <section id="metrics" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Quality Metrics</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time insights into software quality, testing effectiveness, and 
            continuous improvement metrics across all projects.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex space-x-2">
            {Object.keys(metricsData).map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-1 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {currentMetrics.map((metric, index) => {
            const StatusIcon = statusIcons[metric.status as keyof typeof statusIcons]
            const TrendIcon = trendIcons[metric.trend as keyof typeof trendIcons]
            
            return (
              <motion.div
                key={metric.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <Card className="border-2 border-border hover:border-primary/50 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        metric.status === 'excellent' ? 'bg-green-100 dark:bg-green-900/30' :
                        metric.status === 'good' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        'bg-yellow-100 dark:bg-yellow-900/30'
                      }`}>
                        <StatusIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div className={`flex items-center space-x-1 text-sm font-medium ${
                        metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        <TrendIcon className="h-3 w-3" />
                        <span>{metric.change}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="mb-2">
                      <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.title}</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Target:</span>
                        <span className="font-medium">{metric.target}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            metric.status === 'excellent' ? 'bg-green-500' :
                            metric.status === 'good' ? 'bg-blue-500' :
                            'bg-yellow-500'
                          }`}
                          style={{ 
                            width: `${Math.min(100, (parseFloat(metric.value) / parseFloat(metric.target)) * 100)}%` 
                          }}
                        />
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-3">
                      {metric.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Project Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span>Project Performance Overview</span>
              </CardTitle>
              <CardDescription>
                Individual project metrics and quality indicators
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {projectMetrics.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{project.name}</h4>
                      <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                        {project.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{project.coverage}%</div>
                        <div className="text-xs text-muted-foreground">Coverage</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-500">{project.bugsFound}</div>
                        <div className="text-xs text-muted-foreground">Bugs Found</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-500">{project.executionTime}m</div>
                        <div className="text-xs text-muted-foreground">Exec Time</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Export Options */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex space-x-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export PDF Report</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Generate Dashboard</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Live Monitoring</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
