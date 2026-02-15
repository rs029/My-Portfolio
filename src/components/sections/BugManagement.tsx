"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bug,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  MessageSquare,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  FileText,
  GitBranch,
  Activity,
  Eye,
  Edit,
  Archive,
  Tag
} from "lucide-react"

interface BugReport {
  id: string
  title: string
  description: string
  severity: 'critical' | 'high' | 'medium' | 'low' | 'cosmetic'
  priority: 'p1' | 'p2' | 'p3' | 'p4'
  status: 'open' | 'in-progress' | 'resolved' | 'closed' | 'reopened' | 'deferred'
  category: 'functional' | 'ui' | 'performance' | 'security' | 'compatibility'
  reporter: string
  assignee: string
  createdAt: string
  updatedAt: string
  dueDate: string
  environment: string
  steps: string[]
  expectedBehavior: string
  actualBehavior: string
  attachments: string[]
  tags: string[]
  comments: Comment[]
}

interface Comment {
  id: string
  author: string
  content: string
  createdAt: string
  isInternal: boolean
}

interface BugMetrics {
  total: number
  open: number
  resolved: number
  critical: number
  high: number
  averageResolutionTime: number
  bugTrend: 'increasing' | 'decreasing' | 'stable'
  topCategories: { name: string; count: number }[]
}

const bugReports: BugReport[] = [
  {
    id: 'BUG001',
    title: 'Login Page - Password Reset Not Working',
    description: 'Users cannot reset password using the "Forgot Password" feature. The reset email is not being sent, and users are stuck on the loading screen.',
    severity: 'high',
    priority: 'p1',
    status: 'in-progress',
    category: 'functional',
    reporter: 'John Doe',
    assignee: 'QA Team',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-16',
    dueDate: '2024-01-20',
    environment: 'Production',
    steps: [
      'Navigate to login page',
      'Click "Forgot Password" link',
      'Enter registered email address',
      'Click "Reset Password" button',
      'Observe loading spinner that never resolves'
    ],
    expectedBehavior: 'User should receive password reset email within 2 minutes',
    actualBehavior: 'Loading spinner continues indefinitely, no email received',
    attachments: ['screenshot-loading.png', 'network-logs.txt'],
    tags: ['authentication', 'password-reset', 'email-service'],
    comments: [
      {
        id: 'C001',
        author: 'Dev Team',
        content: 'Investigating email service integration. Initial findings suggest SMTP configuration issue.',
        createdAt: '2024-01-15',
        isInternal: true
      },
      {
        id: 'C002',
        author: 'QA Lead',
        content: 'Impact assessment: Affecting approximately 15% of daily active users. Escalated to P1.',
        createdAt: '2024-01-16',
        isInternal: false
      }
    ]
  },
  {
    id: 'BUG002',
    title: 'Mobile App - Crash on iOS 17',
    description: 'Application crashes when accessing the profile section on iOS 17 devices. Crash occurs consistently after 10-15 seconds of use.',
    severity: 'critical',
    priority: 'p1',
    status: 'open',
    category: 'compatibility',
    reporter: 'Mobile QA',
    assignee: 'iOS Developer',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14',
    dueDate: '2024-01-18',
    environment: 'Production',
    steps: [
      'Open mobile app on iOS 17 device',
      'Login successfully',
      'Navigate to profile section',
      'Wait 10-15 seconds',
      'App crashes to home screen'
    ],
    expectedBehavior: 'Profile section should load and display user information without crashing',
    actualBehavior: 'App crashes consistently when accessing profile section',
    attachments: ['crash-logs-ios17.txt', 'device-info.txt'],
    tags: ['ios', 'crash', 'profile', 'critical'],
    comments: [
      {
        id: 'C003',
        author: 'Mobile QA',
        content: 'Crash reproduced on multiple iOS 17 devices. Memory usage spikes before crash.',
        createdAt: '2024-01-14',
        isInternal: false
      }
    ]
  },
  {
    id: 'BUG003',
    title: 'Dashboard - Slow Loading on Large Data Sets',
    description: 'Dashboard takes 30+ seconds to load when user has more than 1000 records in their account. Performance degrades significantly with data volume.',
    severity: 'medium',
    priority: 'p2',
    status: 'resolved',
    category: 'performance',
    reporter: 'Performance Team',
    assignee: 'Backend Team',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18',
    dueDate: '2024-01-17',
    environment: 'Production',
    steps: [
      'Login with account having 1000+ records',
      'Navigate to dashboard',
      'Observe loading time',
      'Check network requests in developer tools'
    ],
    expectedBehavior: 'Dashboard should load within 5 seconds regardless of data volume',
    actualBehavior: 'Dashboard takes 30+ seconds to load with large datasets',
    attachments: ['performance-screenshot.png', 'network-waterfall.png'],
    tags: ['performance', 'dashboard', 'loading', 'optimization'],
    comments: [
      {
        id: 'C004',
        author: 'Backend Team',
        content: 'Implemented pagination and lazy loading. Performance improved by 80%.',
        createdAt: '2024-01-16',
        isInternal: true
      },
      {
        id: 'C005',
        author: 'QA Team',
        content: 'Verified fix in staging. Dashboard now loads in 3-4 seconds.',
        createdAt: '2024-01-18',
        isInternal: false
      }
    ]
  }
]

const bugMetrics: BugMetrics = {
  total: 156,
  open: 23,
  resolved: 133,
  critical: 8,
  high: 34,
  averageResolutionTime: 4.2,
  bugTrend: 'decreasing',
  topCategories: [
    { name: 'Functional', count: 68 },
    { name: 'Performance', count: 42 },
    { name: 'UI', count: 28 },
    { name: 'Compatibility', count: 18 }
  ]
}

export function BugManagement() {
  const [activeTab, setActiveTab] = useState<'reports' | 'metrics' | 'templates'>('reports')
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBug, setSelectedBug] = useState<BugReport | null>(null)

  const handleTabChange = (value: string) => {
    if (value === 'reports' || value === 'metrics' || value === 'templates') {
      setActiveTab(value)
    }
  }

  const filteredBugs = bugReports.filter(bug => {
    const matchesSeverity = selectedSeverity === 'all' || bug.severity === selectedSeverity
    const matchesStatus = selectedStatus === 'all' || bug.status === selectedStatus
    const matchesSearch = bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bug.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bug.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSeverity && matchesStatus && matchesSearch
  })

  const getSeverityColor = (severity: BugReport['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'cosmetic': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getPriorityColor = (priority: BugReport['priority']) => {
    switch (priority) {
      case 'p1': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'p2': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
      case 'p3': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'p4': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getStatusColor = (status: BugReport['status']) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
      case 'reopened': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
      case 'deferred': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getCategoryColor = (category: BugReport['category']) => {
    switch (category) {
      case 'functional': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'ui': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
      case 'performance': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
      case 'security': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'compatibility': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getTrendIcon = (trend: BugMetrics['bugTrend']) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-red-500" />
      case 'decreasing': return <TrendingDown className="h-4 w-4 text-green-500" />
      case 'stable': return <Activity className="h-4 w-4 text-blue-500" />
      default: return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <section id="bug-management" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="gradient-text">Bug Management & Tracking</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive bug reporting, tracking, and analysis workflow. 
            Industry-standard defect lifecycle management and resolution tracking.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <Bug className="h-4 w-4" />
              <span>Bug Reports</span>
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Metrics</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Templates</span>
            </TabsTrigger>
          </TabsList>

          {/* Bug Reports Tab */}
          <TabsContent value="reports" className="mt-8">
            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search bug reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value)}
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                  <option value="cosmetic">Cosmetic</option>
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Statuses</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                  <option value="reopened">Reopened</option>
                  <option value="deferred">Deferred</option>
                </select>
              </div>
            </div>

            {/* Bug Reports Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredBugs.map((bug, index) => (
                <motion.div
                  key={bug.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{bug.title}</CardTitle>
                          <CardDescription className="text-sm">{bug.description}</CardDescription>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className={getSeverityColor(bug.severity)}>
                            {bug.severity}
                          </Badge>
                          <Badge className={getPriorityColor(bug.priority)}>
                            {bug.priority}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {/* Category and Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className={getCategoryColor(bug.category)}>
                            {bug.category}
                          </Badge>
                          {bug.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Meta Info */}
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>Reporter: {bug.reporter}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>Assignee: {bug.assignee}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Due: {bug.dueDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitBranch className="h-4 w-4" />
                            <span>{bug.environment}</span>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="flex items-center justify-between mb-3">
                          <Badge className={getStatusColor(bug.status)}>
                            {bug.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Updated: {bug.updatedAt}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedBug(bug)}
                            className="flex-1"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Metrics Tab */}
          <TabsContent value="metrics" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Overview Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bug className="h-5 w-5 text-primary" />
                      Total Bugs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{bugMetrics.total}</div>
                      <p className="text-sm text-muted-foreground">All time</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      Open Bugs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">{bugMetrics.open}</div>
                      <p className="text-sm text-muted-foreground">Need attention</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Resolved
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{bugMetrics.resolved}</div>
                      <p className="text-sm text-muted-foreground">Fixed issues</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Trend and Categories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="md:col-span-2 lg:col-span-3"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Bug Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Trend</span>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(bugMetrics.bugTrend)}
                          <span className="font-bold capitalize">{bugMetrics.bugTrend}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Top Categories</h4>
                        <div className="space-y-2">
                          {bugMetrics.topCategories.map((category, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                              <span className="text-sm font-medium">{category.name}</span>
                              <Badge variant="outline">{category.count} bugs</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Bug Report Template
                    </CardTitle>
                    <CardDescription>Standard template for reporting defects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {[
                          'Bug Title',
                          'Severity Level',
                          'Environment',
                          'Steps to Reproduce',
                          'Expected Behavior',
                          'Actual Behavior',
                          'Attachments/Screenshots',
                          'Reporter Information'
                        ].map((field, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 border rounded">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                            <span className="text-sm">{field}</span>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Download Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Archive className="h-5 w-5 text-primary" />
                      Root Cause Analysis Template
                    </CardTitle>
                    <CardDescription>Structured approach to problem analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {[
                          'Problem Description',
                          'Impact Assessment',
                          'Timeline Analysis',
                          'Contributing Factors',
                          'Root Cause Hypothesis',
                          'Verification Steps',
                          'Preventive Measures'
                        ].map((field, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 border rounded">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                            <span className="text-sm">{field}</span>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full">
                        <Archive className="h-4 w-4 mr-2" />
                        Download Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
