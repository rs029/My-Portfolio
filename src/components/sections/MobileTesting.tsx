"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Smartphone,
  Tablet,
  Monitor,
  Cpu,
  Wifi,
  WifiOff,
  Battery,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  Download,
  Camera,
  MapPin,
  Zap,
  Compass,
  Target,
  Activity,
  BarChart3
} from "lucide-react"

interface DeviceTest {
  id: string
  deviceName: string
  os: string
  version: string
  screenSize: string
  status: 'pass' | 'fail' | 'blocked' | 'not-tested'
  testDate: string
  tester: string
  testSuite: string[]
  performance: {
    launchTime: number
    memoryUsage: number
    batteryDrain: number
    cpuUsage: number
    networkLatency: number
  }
  compatibility: {
    apps: string[]
    features: string[]
    issues: string[]
  }
  notes: string[]
}

interface CompatibilityMatrix {
  id: string
  title: string
  devices: {
    id: string
    name: string
    os: string
    screenSize: string
    status: 'supported' | 'partial' | 'not-supported'
    issues: string[]
  }[]
}

const deviceTests: DeviceTest[] = [
  {
    id: 'DT001',
    deviceName: 'iPhone 14 Pro',
    os: 'iOS 17.2',
    version: 'Latest',
    screenSize: '2796 x 1290',
    status: 'pass',
    testDate: '2024-01-15',
    tester: 'Mobile QA Team',
    testSuite: [
      'App installation and setup',
      'Login and authentication',
      'Core functionality testing',
      'UI responsiveness verification',
      'Performance under load',
      'Battery consumption analysis',
      'Network connectivity testing',
      'Push notification handling',
      'Background processing verification'
    ],
    performance: {
      launchTime: 2.1,
      memoryUsage: 185,
      batteryDrain: 12,
      cpuUsage: 45,
      networkLatency: 45
    },
    compatibility: {
      apps: [
        'Safari Mobile',
        'Chrome Mobile',
        'App Store',
        'Banking App',
        'Social Media Apps'
      ],
      features: [
        'Face ID authentication',
        'Dark mode support',
        'Push notifications',
        'Background app refresh',
        'Widget support',
        'Split-screen multitasking',
        'Haptic feedback'
      ],
      issues: [
        'Minor UI lag on complex animations',
        'High memory usage with multiple apps open',
        'Battery drain during video playback'
      ]
    },
    notes: [
        'Device performs well within acceptable parameters',
        'All critical functionality working correctly',
        'Consider optimizing memory usage in future updates',
        'Test on various network conditions recommended'
      ]
    }
  ]

const compatibilityMatrices: CompatibilityMatrix[] = [
  {
    id: 'CM001',
    title: 'E-commerce App Compatibility',
    devices: [
      {
        id: 'd1',
        name: 'iPhone 14 Pro',
        os: 'iOS 17.2+',
        screenSize: 'All screen sizes',
        status: 'supported',
        issues: []
      },
      {
        id: 'd2',
        name: 'Samsung Galaxy S24',
        os: 'Android 14+',
        screenSize: 'Large screens only',
        status: 'partial',
        issues: [
          'Minor UI layout issues on ultra-wide screens',
          'Some Samsung-specific features not optimized'
        ]
      },
      {
        id: 'd3',
        name: 'Google Pixel 8',
        os: 'Android 14+',
        screenSize: 'All screen sizes',
        status: 'supported',
        issues: []
      },
      {
        id: 'd4',
        name: 'iPad Air',
        os: 'iPadOS 17+',
        screenSize: 'Tablet layouts only',
        status: 'not-supported',
        issues: [
          'Not optimized for phone layouts',
          'Missing iPhone-specific features',
          'Performance issues with complex interactions'
        ]
      }
    ]
  }
]

export function MobileTesting() {
  const [activeTab, setActiveTab] = useState<'devices' | 'compatibility' | 'performance'>('devices')
  const [selectedDevice, setSelectedDevice] = useState<DeviceTest | null>(null)
  const [selectedOS, setSelectedOS] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const handleTabChange = (value: string) => {
    if (value === 'devices' || value === 'compatibility' || value === 'performance') {
      setActiveTab(value)
    }
  }

  const filteredDevices = deviceTests.filter(device => {
    const matchesOS = selectedOS === 'all' || device.os.toLowerCase().includes(selectedOS.toLowerCase())
    const matchesSearch = device.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.os.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesOS && matchesSearch
  })

  const getStatusColor = (status: DeviceTest['status']) => {
    switch (status) {
      case 'pass': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'fail': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'blocked': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
      case 'not-tested': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getCompatibilityStatusColor = (status: string) => {
    switch (status) {
      case 'supported': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'partial': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'not-supported': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  return (
    <section id="mobile-testing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="gradient-text">Mobile Testing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive device compatibility testing, performance analysis, and mobile-specific validation. 
            Ensuring optimal user experience across all mobile platforms.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="devices" className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4" />
              <span>Device Tests</span>
            </TabsTrigger>
            <TabsTrigger value="compatibility" className="flex items-center space-x-2">
              <Monitor className="h-4 w-4" />
              <span>Compatibility</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center space-x-2">
              <Cpu className="h-4 w-4" />
              <span>Performance</span>
            </TabsTrigger>
          </TabsList>

          {/* Device Tests Tab */}
          <TabsContent value="devices" className="mt-8">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search devices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedOS}
                  onChange={(e) => setSelectedOS(e.target.value)}
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All OS</option>
                  <option value="ios">iOS</option>
                  <option value="android">Android</option>
                  <option value="ipados">iPadOS</option>
                </select>
              </div>
            </div>

            {/* Device Test Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredDevices.map((device, index) => (
                <motion.div
                  key={device.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{device.deviceName}</CardTitle>
                          <CardDescription className="text-sm">
                            {device.os} • {device.screenSize} • {device.version}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className={getStatusColor(device.status)}>
                            {device.status}
                          </Badge>
                          <Badge variant="outline" className="ml-auto">
                            {device.testDate}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {/* Performance Metrics */}
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Performance Metrics
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                              <div className="text-lg font-bold text-blue-600">{device.performance.launchTime}s</div>
                              <div className="text-sm text-muted-foreground">Launch Time</div>
                            </div>
                            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                              <div className="text-lg font-bold text-orange-600">{device.performance.memoryUsage}MB</div>
                              <div className="text-sm text-muted-foreground">Memory Usage</div>
                            </div>
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded">
                              <div className="text-lg font-bold text-red-600">{device.performance.batteryDrain}%/h</div>
                              <div className="text-sm text-muted-foreground">Battery Drain</div>
                            </div>
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                              <div className="text-lg font-bold text-purple-600">{device.performance.cpuUsage}%</div>
                              <div className="text-sm text-muted-foreground">CPU Usage</div>
                            </div>
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                              <div className="text-lg font-bold text-green-600">{device.performance.networkLatency}ms</div>
                              <div className="text-sm text-muted-foreground">Network Latency</div>
                            </div>
                          </div>
                        </div>

                        {/* Compatibility */}
                        <div>
                          <h4 className="font-semibold mb-2">App Compatibility</h4>
                          <div className="space-y-2">
                            <div>
                              <h5 className="font-medium mb-1">Tested Apps</h5>
                              <div className="flex flex-wrap gap-1">
                                {device.compatibility.apps.map((app, appIndex) => (
                                  <Badge key={appIndex} variant="outline" className="text-xs">
                                    {app}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="font-medium mb-1">Features</h5>
                              <div className="flex flex-wrap gap-1">
                                {device.compatibility.features.map((feature, featureIndex) => (
                                  <Badge key={featureIndex} variant="outline" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Issues */}
                        {device.compatibility.issues.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">Issues Found</h4>
                            <div className="space-y-2">
                              {device.compatibility.issues.map((issue, issueIndex) => (
                                <div key={issueIndex} className="flex items-start gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{issue}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedDevice(device)}
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

          {/* Compatibility Tab */}
          <TabsContent value="compatibility" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {compatibilityMatrices.map((matrix, index) => (
                <motion.div
                  key={matrix.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Monitor className="h-5 w-5 text-primary" />
                        {matrix.title}
                      </CardTitle>
                      <CardDescription>Device compatibility and support matrix</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-2">Device</th>
                                <th className="text-left p-2">OS</th>
                                <th className="text-left p-2">Screen Size</th>
                                <th className="text-left p-2">Status</th>
                                <th className="text-left p-2">Issues</th>
                              </tr>
                            </thead>
                            <tbody>
                              {matrix.devices.map((device, deviceIndex) => (
                                <tr key={device.id} className="border-b">
                                  <td className="p-2 font-medium">{device.name}</td>
                                  <td className="p-2">{device.os}</td>
                                  <td className="p-2">{device.screenSize}</td>
                                  <td className="p-2">
                                    <Badge className={getCompatibilityStatusColor(device.status)}>
                                      {device.status}
                                    </Badge>
                                  </td>
                                  <td className="p-2">
                                    {device.issues.length > 0 ? (
                                      <div className="space-y-1">
                                        {device.issues.map((issue, issueIndex) => (
                                          <div key={issueIndex} className="text-xs text-red-600">{issue}</div>
                                        ))}
                                      </div>
                                    ) : (
                                      <span className="text-green-600">None</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="mt-8">
            <div className="text-center py-8">
              <div className="max-w-2xl mx-auto">
                <Cpu className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-2xl font-bold mb-4">Performance Analysis</h3>
                <p className="text-muted-foreground mb-8">
                  Comprehensive mobile performance testing and optimization recommendations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="p-6 border rounded-lg">
                    <h4 className="font-semibold mb-2">Performance Testing</h4>
                    <p className="text-sm text-muted-foreground">CPU, memory, battery, and network performance analysis</p>
                  </div>
                  <div className="p-6 border rounded-lg">
                    <h4 className="font-semibold mb-2">Device Optimization</h4>
                    <p className="text-sm text-muted-foreground">Resource usage and battery optimization</p>
                  </div>
                  <div className="p-6 border rounded-lg">
                    <h4 className="font-semibold mb-2">Network Testing</h4>
                    <p className="text-sm text-muted-foreground">Connectivity and performance under various conditions</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
