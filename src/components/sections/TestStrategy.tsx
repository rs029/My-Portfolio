"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  FileText,
  Shield,
  Zap,
  Calculator,
  Lightbulb,
  Activity
} from "lucide-react"

interface TestStrategy {
  id: string
  title: string
  description: string
  type: 'planning' | 'risk-assessment' | 'estimation' | 'resource-planning'
  status: 'draft' | 'in-progress' | 'approved' | 'archived'
  priority: 'high' | 'medium' | 'low'
  timeline: string[]
  deliverables: string[]
  team: string[]
  risks: string[]
  metrics: string[]
  createdAt: string
  lastUpdated: string
}

interface RiskAssessment {
  id: string
  title: string
  category: 'technical' | 'business' | 'resource' | 'schedule'
  probability: 'high' | 'medium' | 'low'
  impact: 'high' | 'medium' | 'low'
  mitigation: string
  owner: string
  status: 'open' | 'mitigated' | 'accepted'
}

interface EstimationModel {
  id: string
  name: string
  description: string
  factors: string[]
  formula: string
  example: {
    complexity: string
    size: string
    estimatedHours: number
    confidence: number
  }
}

const testStrategies: TestStrategy[] = [
  {
    id: 'TS001',
    title: 'E-commerce Platform Testing Strategy',
    description: 'Comprehensive testing approach for new e-commerce platform launch',
    type: 'planning',
    status: 'approved',
    priority: 'high',
    timeline: [
      'Week 1-2: Requirements analysis and test planning',
      'Week 3-4: Test environment setup',
      'Week 5-8: Test execution',
      'Week 9-10: Regression testing and UAT',
      'Week 11-12: Performance testing and go-live support'
    ],
    deliverables: [
      'Test Plan Document',
      'Test Cases Repository',
      'Traceability Matrix',
      'Risk Assessment Report',
      'Test Execution Reports',
      'UAT Sign-off Documentation'
    ],
    team: [
      'Test Manager',
      'Senior QA Engineer',
      '2 QA Engineers',
      'Performance Test Specialist',
      'Business Analyst'
    ],
    risks: [
      'Tight timeline for delivery',
      'Third-party payment gateway integration',
      'Cross-browser compatibility issues',
      'Performance under peak load'
    ],
    metrics: [
      'Test Case Coverage: >95%',
      'Defect Detection Rate: >90%',
      'Test Execution Rate: 100%',
      'Automation Coverage: 60%',
      'Performance SLA: <2s response time'
    ],
    createdAt: '2024-01-15',
    lastUpdated: '2024-01-20'
  },
  {
    id: 'TS002',
    title: 'Mobile App Regression Testing Strategy',
    description: 'Systematic regression approach for mobile application updates',
    type: 'risk-assessment',
    status: 'in-progress',
    priority: 'medium',
    timeline: [
      'Day 1-2: Impact analysis and scope definition',
      'Day 3-5: Regression test selection',
      'Day 6-10: Test execution across devices',
      'Day 11-12: Cross-platform validation',
      'Day 13-14: Performance and compatibility testing'
    ],
    deliverables: [
      'Regression Test Plan',
      'Device Compatibility Matrix',
      'Test Execution Dashboard',
      'Defect Trend Analysis',
      'Release Recommendation Report'
    ],
    team: [
      'Mobile QA Lead',
      '2 Mobile Test Engineers',
      'Device Lab Coordinator'
    ],
    risks: [
      'Device fragmentation',
      'OS version compatibility',
      'Network condition variations',
      'App store approval delays'
    ],
    metrics: [
      'Regression Coverage: 100%',
      'Device Coverage: >80%',
      'Defect Escape Rate: <2%',
      'Test Cycle Time: <14 days',
      'Automation Reuse: >70%'
    ],
    createdAt: '2024-01-10',
    lastUpdated: '2024-01-18'
  }
]

const riskAssessments: RiskAssessment[] = [
  {
    id: 'RA001',
    title: 'Payment Gateway Integration Risk',
    category: 'technical',
    probability: 'medium',
    impact: 'high',
    mitigation: 'Implement comprehensive API testing with mock payment services, establish fallback mechanisms, and conduct thorough integration testing with multiple payment providers',
    owner: 'Technical Lead',
    status: 'mitigated'
  },
  {
    id: 'RA002',
    title: 'Resource Availability Risk',
    category: 'resource',
    probability: 'high',
    impact: 'medium',
    mitigation: 'Cross-train team members, maintain resource backup pool, and implement flexible scheduling to handle resource conflicts',
    owner: 'Test Manager',
    status: 'open'
  },
  {
    id: 'RA003',
    title: 'Timeline Compression Risk',
    category: 'schedule',
    probability: 'medium',
    impact: 'high',
    mitigation: 'Prioritize critical path testing, implement parallel execution where possible, and maintain contingency buffer for unexpected delays',
    owner: 'Project Manager',
    status: 'accepted'
  }
]

const estimationModels: EstimationModel[] = [
  {
    id: 'EM001',
    name: 'Function Point Analysis',
    description: 'Structured estimation based on functional complexity',
    factors: [
      'Number of user inputs',
      'Number of outputs',
      'Number of inquiries',
      'Number of logical files',
      'Number of interfaces',
      'Complexity adjustment factors'
    ],
    formula: 'Total Effort = (UFP × CAF) / Productivity Factor',
    example: {
      complexity: 'Medium',
      size: '250 Function Points',
      estimatedHours: 400,
      confidence: 85
    }
  },
  {
    id: 'EM002',
    name: 'Use Case Points',
    description: 'Estimation based on user interaction scenarios',
    factors: [
      'Number of actors',
      'Number of use cases',
      'Transaction complexity',
      'Environmental factors',
      'Technical complexity factors'
    ],
    formula: 'UCP = Σ(Use Case Weight × Complexity Factor)',
    example: {
      complexity: 'High',
      size: '45 Use Case Points',
      estimatedHours: 360,
      confidence: 80
    }
  },
  {
    id: 'EM003',
    name: 'Three-Point Estimation',
    description: 'Risk-adjusted estimation using optimistic, likely, and pessimistic scenarios',
    factors: [
      'Best case scenario (Optimistic)',
      'Most likely scenario',
      'Worst case scenario (Pessimistic)',
      'Risk adjustment factor',
      'Team velocity factor'
    ],
    formula: 'E = (O + 4M + P) / 6',
    example: {
      complexity: 'Medium',
      size: 'Story Points',
      estimatedHours: 24,
      confidence: 75
    }
  }
]

export function TestStrategy() {
  const [activeTab, setActiveTab] = useState<'strategy' | 'risk-assessment' | 'estimation'>('strategy')
  const [selectedStrategy, setSelectedStrategy] = useState<TestStrategy | null>(null)

  const handleTabChange = (value: string) => {
    if (value === 'strategy' || value === 'risk-assessment' || value === 'estimation') {
      setActiveTab(value)
    }
  }

  const getTypeColor = (type: TestStrategy['type']) => {
    switch (type) {
      case 'planning': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'risk-assessment': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'estimation': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'resource-planning': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getPriorityColor = (priority: TestStrategy['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getStatusColor = (status: TestStrategy['status']) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
      case 'archived': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getProbabilityColor = (probability: RiskAssessment['probability']) => {
    switch (probability) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getImpactColor = (impact: RiskAssessment['impact']) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getRiskStatusColor = (status: RiskAssessment['status']) => {
    switch (status) {
      case 'mitigated': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'open': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'accepted': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  return (
    <section id="test-strategy" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="gradient-text">Test Strategy & Planning</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Strategic test planning, risk assessment, and resource estimation. 
            Data-driven approaches to comprehensive quality assurance.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="strategy" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Test Strategies</span>
            </TabsTrigger>
            <TabsTrigger value="risk-assessment" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Risk Assessment</span>
            </TabsTrigger>
            <TabsTrigger value="estimation" className="flex items-center space-x-2">
              <Calculator className="h-4 w-4" />
              <span>Estimation Models</span>
            </TabsTrigger>
          </TabsList>

          {/* Test Strategies Tab */}
          <TabsContent value="strategy" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {testStrategies.map((strategy, index) => (
                <motion.div
                  key={strategy.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{strategy.title}</CardTitle>
                          <CardDescription className="text-sm">{strategy.description}</CardDescription>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className={getTypeColor(strategy.type)}>
                            {strategy.type}
                          </Badge>
                          <Badge className={getPriorityColor(strategy.priority)}>
                            {strategy.priority}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {/* Timeline */}
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Timeline
                          </h4>
                          <div className="space-y-1">
                            {strategy.timeline.map((item, timelineIndex) => (
                              <div key={timelineIndex} className="text-sm text-muted-foreground pl-6 relative">
                                <div className="absolute left-0 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                                  <span className="text-xs text-white font-bold">{timelineIndex + 1}</span>
                                </div>
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Team */}
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Team Composition
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {strategy.team.map((member, memberIndex) => (
                              <Badge key={memberIndex} variant="outline" className="text-xs">
                                {member}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Key Metrics */}
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Success Metrics
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            {strategy.metrics.map((metric, metricIndex) => (
                              <div key={metricIndex} className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                                <span className="text-sm">{metric}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedStrategy(strategy)}
                            className="flex-1"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                          >
                            <Shield className="h-4 w-4 mr-2" />
                            Export Plan
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Risk Assessment Tab */}
          <TabsContent value="risk-assessment" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {riskAssessments.map((risk, index) => (
                <motion.div
                  key={risk.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        {risk.title}
                      </CardTitle>
                      <CardDescription>Risk assessment and mitigation planning</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Risk Matrix */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Probability</h4>
                            <Badge className={getProbabilityColor(risk.probability)}>
                              {risk.probability}
                            </Badge>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Impact</h4>
                            <Badge className={getImpactColor(risk.impact)}>
                              {risk.impact}
                            </Badge>
                          </div>
                        </div>

                        {/* Risk Details */}
                        <div>
                          <h4 className="font-semibold mb-2">Category</h4>
                          <Badge variant="outline" className="mb-3">
                            {risk.category}
                          </Badge>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Mitigation Strategy</h4>
                          <p className="text-sm text-muted-foreground p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                            {risk.mitigation}
                          </p>
                        </div>

                        {/* Owner and Status */}
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold mb-1">Risk Owner</h4>
                            <Badge variant="outline">{risk.owner}</Badge>
                          </div>
                          <div className="text-right">
                            <h4 className="font-semibold mb-1">Status</h4>
                            <Badge className={getRiskStatusColor(risk.status)}>
                              {risk.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Estimation Models Tab */}
          <TabsContent value="estimation" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {estimationModels.map((model, index) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-primary" />
                        {model.name}
                      </CardTitle>
                      <CardDescription>{model.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Factors */}
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4" />
                            Key Factors
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {model.factors.map((factor, factorIndex) => (
                              <li key={factorIndex} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span>{factor}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Formula */}
                        <div>
                          <h4 className="font-semibold mb-2">Formula</h4>
                          <div className="p-3 bg-muted rounded-md font-mono text-sm">
                            {model.formula}
                          </div>
                        </div>

                        {/* Example */}
                        <div>
                          <h4 className="font-semibold mb-2">Example Calculation</h4>
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="font-medium">Complexity:</span>
                                <Badge variant="outline">{model.example.complexity}</Badge>
                              </div>
                              <div>
                                <span className="font-medium">Size:</span>
                                <Badge variant="outline">{model.example.size}</Badge>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="font-medium">Estimated:</span>
                                <span className="font-bold">{model.example.estimatedHours}h</span>
                              </div>
                              <div>
                                <span className="font-medium">Confidence:</span>
                                <span className="font-bold">{model.example.confidence}%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Activity className="h-4 w-4 mr-2" />
                            Use Model
                          </Button>
                          <Button size="sm" variant="outline">
                            <Zap className="h-4 w-4 mr-2" />
                            Calculate
                          </Button>
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
