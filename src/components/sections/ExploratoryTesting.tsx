"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Compass,
  Search,
  Clock,
  Map,
  Lightbulb,
  Target,
  FileText,
  Zap,
  Eye,
  Download,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  Timer,
  Brain,
  GitBranch,
  Activity
} from "lucide-react"

interface TestSession {
  id: string
  title: string
  charter: string
  objective: string
  timebox: number // minutes
  tester: string
  date: string
  duration: number // actual minutes spent
  status: 'planned' | 'in-progress' | 'completed' | 'paused'
  coverage: {
    features: string[]
    areas: string[]
    heuristics: string[]
  }
  findings: {
    bugs: number
    issues: number
    observations: string[]
    questions: string[]
    ideas: string[]
  }
  notes: string[]
  attachments: string[]
}

interface Heuristic {
  id: string
  name: string
  description: string
  category: 'usability' | 'functionality' | 'consistency' | 'security' | 'performance'
  examples: string[]
}

interface MindMap {
  id: string
  centralIdea: string
  branches: {
    id: string
    text: string
    children: string[]
  }[]
}

const testSessions: TestSession[] = [
  {
    id: 'ETS001',
    title: 'Mobile App Checkout Flow',
    charter: 'Explore the mobile application checkout process to identify usability issues and potential blockers that might prevent users from completing purchases.',
    objective: 'Discover critical usability issues and performance bottlenecks in the checkout flow before the upcoming holiday shopping season.',
    timebox: 90,
    tester: 'Sarah Johnson',
    date: '2024-01-15',
    duration: 87,
    status: 'completed',
    coverage: {
      features: [
        'Product selection and filtering',
        'Shopping cart operations',
        'Address form validation',
        'Payment method selection',
        'Order review and confirmation'
      ],
      areas: [
        'Product catalog',
        'Shopping cart',
        'Checkout process',
        'Payment gateway',
        'Order confirmation'
      ],
      heuristics: [
        'Visibility of system status',
        'Match between system and real world',
        'User control and freedom',
        'Consistency and standards'
      ]
    },
    findings: {
      bugs: 3,
      issues: 7,
      observations: [
        'Users struggle to find coupon code input',
        'Payment method selection is confusing',
        'Cart updates are not immediately visible',
        'Error messages are not descriptive enough',
        'Performance degrades with cart items > 10'
      ],
      questions: [
        'Why do users abandon cart at payment step?',
        'Is the coupon functionality discoverable?',
        'Are there accessibility issues with payment forms?'
      ],
      ideas: [
        'Implement progressive disclosure for payment options',
        'Add cart summary sidebar',
        'Improve error messaging and recovery flows',
        'Add performance optimization for large carts'
      ]
    },
    notes: [
      'Critical path testing completed successfully',
      'Performance issues identified in cart operations',
      'Next session should focus on payment optimization',
      'Consider accessibility testing for screen readers'
    ],
    attachments: ['checkout-flow-map.png', 'usability-issues.pdf', 'session-notes.txt']
  },
  {
    id: 'ETS002',
    title: 'Admin Dashboard Data Management',
    charter: 'Investigate the admin dashboard data entry and management features to identify efficiency opportunities and potential data integrity issues.',
    objective: 'Evaluate the usability and efficiency of admin dashboard data operations, focusing on bulk operations and data validation.',
    timebox: 60,
    tester: 'Mike Chen',
    date: '2024-01-16',
    duration: 60,
    status: 'completed',
    coverage: {
      features: [
        'User management interface',
        'Bulk data operations',
        'Search and filtering',
        'Data validation and error handling',
        'Export and reporting functionality'
      ],
      areas: [
        'User management section',
        'Data entry forms',
        'Bulk operations panel',
        'Search and filter interface',
        'Reports and exports'
      ],
      heuristics: [
        'Recognition rather than recall',
        'Efficiency of use',
        'Good aesthetic design',
        'Help and documentation'
      ]
    },
    findings: {
      bugs: 2,
      issues: 5,
      observations: [
        'Bulk delete confirmation is unclear',
        'Search functionality is slow with large datasets',
        'Data validation messages are inconsistent',
        'Export options are hidden in sub-menus',
        'No keyboard shortcuts for common operations'
      ],
      questions: [
        'Can we implement undo functionality for bulk operations?',
        'How can we improve search performance?',
        'Are there accessibility issues with data tables?',
        'Should we add keyboard navigation support?'
      ],
      ideas: [
        'Implement progressive disclosure for advanced options',
        'Add keyboard shortcuts and navigation',
        'Improve search indexing and caching',
        'Add data validation preview before submission'
      ]
    },
    notes: [
      'Admin dashboard shows good overall usability',
      'Bulk operations need improvement in error prevention',
      'Performance optimization needed for large datasets',
      'Consider adding data import/export wizards'
    ],
    attachments: ['admin-dashboard-heuristics.pdf', 'bulk-operations-video.mp4', 'session-recording.webm']
  }
]

const heuristics: Heuristic[] = [
  {
    id: 'H001',
    name: 'Visibility of System Status',
    description: 'The system should always keep users informed about what is going on, through appropriate feedback within reasonable time.',
    category: 'usability',
    examples: [
      'Progress indicators for long operations',
      'Clear error messages and recovery options',
      'Status updates for background processes',
      'Notifications for system changes'
    ]
  },
  {
    id: 'H002',
    name: 'Match Between System and Real World',
    description: 'The system should speak the users language, using words, phrases, and concepts familiar to the user.',
    category: 'usability',
    examples: [
      'Industry-standard terminology',
      'Consistent use of icons and symbols',
      'Familiar interaction patterns',
      'Real-world metaphors and analogies'
    ]
  },
  {
    id: 'H003',
    name: 'User Control and Freedom',
    description: 'Users should feel in control of the system and free to perform actions without unintended consequences.',
    category: 'usability',
    examples: [
      'Undo/redo functionality',
      'Confirmation dialogs for destructive actions',
      'Easy navigation and escape routes',
      'Customizable settings and preferences'
    ]
  },
  {
    id: 'H004',
    name: 'Consistency and Standards',
    description: 'The system should be consistent within itself and with industry standards.',
    category: 'consistency',
    examples: [
      'Consistent terminology and language',
      'Uniform visual design patterns',
      'Standard interaction behaviors',
      'Platform conventions adherence'
    ]
  },
  {
    id: 'H005',
    name: 'Error Prevention and Recovery',
    description: 'The system should prevent errors from occurring and help users recover from them when they do occur.',
    category: 'functionality',
    examples: [
      'Input validation and constraints',
      'Clear error messages and recovery paths',
      'Graceful degradation on errors',
      'Data protection and backup mechanisms'
    ]
  },
  {
    id: 'H006',
    name: 'Recognition Rather Than Recall',
    description: 'Users should not have to remember information from one part of the dialogue to another.',
    category: 'usability',
    examples: [
      'Visible information and options',
      'Contextual help and guidance',
      'Progressive disclosure of complexity',
      'Consistent layout and organization'
    ]
  },
  {
    id: 'H007',
    name: 'Efficiency of Use',
    description: 'The system should be efficient to use, allowing users to accomplish tasks with minimal effort and time.',
    category: 'performance',
    examples: [
      'Streamlined workflows',
      'Minimized steps and clicks',
      'Keyboard shortcuts and power features',
      'Optimized response times'
    ]
  }
]

const mindMaps: MindMap[] = [
  {
    id: 'MM001',
    centralIdea: 'E-commerce Testing Challenges',
    branches: [
      {
        id: 'b1',
        text: 'Cross-browser Compatibility',
        children: [
          'Safari mobile issues',
          'Chrome desktop performance',
          'Firefox form validation'
        ]
      },
      {
        id: 'b2',
        text: 'Payment Gateway Testing',
        children: [
          'Multiple provider support',
          'Security compliance',
          'Error handling scenarios'
        ]
      },
      {
        id: 'b3',
        text: 'Mobile Device Fragmentation',
        children: [
          'iOS vs Android differences',
          'Screen size variations',
          'OS version compatibility'
        ]
      }
    ]
  }
]

export function ExploratoryTesting() {
  const [activeTab, setActiveTab] = useState<'sessions' | 'heuristics' | 'mindmaps'>('sessions')
  const [selectedSession, setSelectedSession] = useState<TestSession | null>(null)

  const handleTabChange = (value: string) => {
    if (value === 'sessions' || value === 'heuristics' || value === 'mindmaps') {
      setActiveTab(value)
    }
  }

  const getStatusColor = (status: TestSession['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'planned': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getCategoryColor = (category: Heuristic['category']) => {
    switch (category) {
      case 'usability': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
      case 'functionality': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'consistency': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'security': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'performance': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  return (
    <section id="exploratory-testing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="gradient-text">Exploratory Testing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Session-based testing, heuristics analysis, and mind mapping techniques. 
            Uncovering hidden defects through structured exploration.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="sessions" className="flex items-center space-x-2">
              <Compass className="h-4 w-4" />
              <span>Test Sessions</span>
            </TabsTrigger>
            <TabsTrigger value="heuristics" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Heuristics</span>
            </TabsTrigger>
            <TabsTrigger value="mindmaps" className="flex items-center space-x-2">
              <Map className="h-4 w-4" />
              <span>Mind Maps</span>
            </TabsTrigger>
          </TabsList>

          {/* Test Sessions Tab */}
          <TabsContent value="sessions" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {testSessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{session.title}</CardTitle>
                          <CardDescription className="text-sm">{session.charter}</CardDescription>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className={getStatusColor(session.status)}>
                            {session.status}
                          </Badge>
                          <Badge variant="outline" className="ml-auto">
                            {session.duration}/{session.timebox}min
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {/* Session Info */}
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            <span>{session.objective}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Timer className="h-4 w-4" />
                            <span>{session.date} • {session.tester}</span>
                          </div>
                        </div>

                        {/* Coverage Areas */}
                        <div>
                          <h4 className="font-semibold mb-2">Coverage Areas</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div>
                              <h5 className="font-medium mb-1">Features</h5>
                              <div className="flex flex-wrap gap-1">
                                {session.coverage.features.map((feature, featureIndex) => (
                                  <Badge key={featureIndex} variant="outline" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="font-medium mb-1">Areas</h5>
                              <div className="flex flex-wrap gap-1">
                                {session.coverage.areas.map((area, areaIndex) => (
                                  <Badge key={areaIndex} variant="outline" className="text-xs">
                                    {area}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Findings Summary */}
                        <div>
                          <h4 className="font-semibold mb-2">Findings Summary</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded">
                              <div className="text-2xl font-bold text-red-600">{session.findings.bugs}</div>
                              <div className="text-sm text-muted-foreground">Bugs</div>
                            </div>
                            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                              <div className="text-2xl font-bold text-orange-600">{session.findings.issues}</div>
                              <div className="text-sm text-muted-foreground">Issues</div>
                            </div>
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                              <div className="text-2xl font-bold text-blue-600">{session.findings.observations.length}</div>
                              <div className="text-sm text-muted-foreground">Observations</div>
                            </div>
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                              <div className="text-2xl font-bold text-green-600">{session.findings.questions.length}</div>
                              <div className="text-sm text-muted-foreground">Questions</div>
                            </div>
                          </div>
                        </div>

                        {/* Key Insights */}
                        <div>
                          <h4 className="font-semibold mb-2">Key Insights</h4>
                          <div className="space-y-2">
                            {session.findings.ideas.slice(0, 3).map((idea, ideaIndex) => (
                              <div key={ideaIndex} className="flex items-start gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                                <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{idea}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedSession(session)}
                            className="flex-1"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Report
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Heuristics Tab */}
          <TabsContent value="heuristics" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {heuristics.map((heuristic, index) => (
                <motion.div
                  key={heuristic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        {heuristic.name}
                      </CardTitle>
                      <CardDescription>{heuristic.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="mb-3">
                          <Badge className={getCategoryColor(heuristic.category)}>
                            {heuristic.category}
                          </Badge>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Examples</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {heuristic.examples.map((example, exampleIndex) => (
                              <li key={exampleIndex} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Mind Maps Tab */}
          <TabsContent value="mindmaps" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mindMaps.map((mindMap, index) => (
                <motion.div
                  key={mindMap.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Map className="h-5 w-5 text-primary" />
                        {mindMap.centralIdea}
                      </CardTitle>
                      <CardDescription>Visual exploration and idea organization</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center mb-4">
                          <div className="inline-flex items-center gap-2 p-3 bg-primary/10 rounded-full">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">{mindMap.centralIdea.charAt(0)}</span>
                            </div>
                            <span className="text-lg font-medium">{mindMap.centralIdea.slice(1)}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {mindMap.branches.map((branch, branchIndex) => (
                            <div key={branch.id} className="flex items-start gap-3 p-3 border-l-2 border-muted pl-4">
                              <div className="w-4 h-4 bg-primary rounded-full flex-shrink-0 mt-1" />
                              <div className="flex-1">
                                <h4 className="font-semibold mb-2">{branch.text}</h4>
                                <div className="flex flex-wrap gap-1">
                                  {branch.children.map((child, childIndex) => (
                                    <Badge key={childIndex} variant="outline" className="text-xs">
                                      {child}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
