"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  X, 
  Copy, 
  CheckCircle, 
  Download, 
  ExternalLink, 
  Terminal, 
  Code,
  Package,
  FileText,
  Github
} from "lucide-react"

interface CodeModalProps {
  isOpen: boolean
  onClose: () => void
  example: {
    id: string
    title: string
    fullCode: string
    setup?: string
    dependencies?: string[]
    instructions?: string
  }
  framework: string
  onGitHubClick: () => void
}

export function CodeModal({ isOpen, onClose, example, framework, onGitHubClick }: CodeModalProps) {
  const [copiedCode, setCopiedCode] = useState(false)
  const [activeTab, setActiveTab] = useState<'code' | 'setup' | 'dependencies' | 'instructions'>('code')

  useEffect(() => {
    console.log('CodeModal received:', { isOpen, example, framework })
    if (isOpen) {
      setActiveTab('code')
      setCopiedCode(false)
    }
  }, [isOpen, example.id])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const downloadCode = () => {
    const blob = new Blob([example.fullCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${example.id}.${framework === 'jest' ? 'js' : framework === 'selenium' ? 'java' : 'ts'}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const openInGitHub = () => {
    // This would open the actual GitHub repository
    window.open(`https://github.com/username/qa-portfolio/tree/main/examples/${framework}`, '_blank')
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="fixed inset-4 md:inset-8 z-50 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="h-full flex flex-col border-2 border-border">
            {/* Header */}
            <CardHeader className="pb-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Code className="h-5 w-5 text-primary" />
                    <span>{example.title}</span>
                    <Badge variant="outline" className="capitalize">
                      {framework}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Complete code example with setup and dependencies
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" onClick={onGitHubClick}>
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                  <Button size="sm" variant="ghost" onClick={onClose}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex space-x-1 mt-4">
                <Button
                  size="sm"
                  variant={activeTab === 'code' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('code')}
                  className="flex items-center space-x-2"
                >
                  <Terminal className="h-4 w-4" />
                  <span>Code</span>
                </Button>
                {example.setup && (
                  <Button
                    size="sm"
                    variant={activeTab === 'setup' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('setup')}
                    className="flex items-center space-x-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Setup</span>
                  </Button>
                )}
                {example.dependencies && example.dependencies.length > 0 && (
                  <Button
                    size="sm"
                    variant={activeTab === 'dependencies' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('dependencies')}
                    className="flex items-center space-x-2"
                  >
                    <Package className="h-4 w-4" />
                    <span>Dependencies</span>
                  </Button>
                )}
                {example.instructions && (
                  <Button
                    size="sm"
                    variant={activeTab === 'instructions' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('instructions')}
                    className="flex items-center space-x-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Instructions</span>
                  </Button>
                )}
              </div>
            </CardHeader>

            {/* Content */}
            <CardContent className="flex-1 overflow-hidden p-0">
              <div className="h-full overflow-auto">
                {activeTab === 'code' && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Terminal className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {framework === 'selenium' ? 'Java' : 
                           framework === 'jest' ? 'JavaScript/TypeScript' : 
                           'TypeScript'}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(example.fullCode)}
                          className="flex items-center space-x-1"
                        >
                          {copiedCode ? (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              <span>Copy</span>
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={downloadCode}
                          className="flex items-center space-x-1"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </Button>
                      </div>
                    </div>
                    <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                      <code className="text-sm text-foreground whitespace-pre">
                        {example.fullCode}
                      </code>
                    </pre>
                  </div>
                )}

                {activeTab === 'setup' && example.setup && (
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">Setup Configuration</h3>
                      <p className="text-sm text-muted-foreground">
                        Configuration files and setup instructions
                      </p>
                    </div>
                    <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                      <code className="text-sm text-foreground whitespace-pre">
                        {example.setup}
                      </code>
                    </pre>
                  </div>
                )}

                {activeTab === 'dependencies' && example.dependencies && (
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">Dependencies</h3>
                      <p className="text-sm text-muted-foreground">
                        Required packages and versions
                      </p>
                    </div>
                    <div className="space-y-2">
                      {example.dependencies.map((dep, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded">
                          <Package className="h-4 w-4 text-primary" />
                          <code className="text-sm">{dep}</code>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>Install with:</strong> npm install --save-dev {example.dependencies.join(' ')}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'instructions' && example.instructions && (
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">Instructions</h3>
                      <p className="text-sm text-muted-foreground">
                        How to run this example
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <p className="text-sm text-green-800 dark:text-green-300">
                        <strong>Command:</strong> {example.instructions}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
