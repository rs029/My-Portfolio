"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Skills } from "@/components/sections/Skills"
import { Projects } from "@/components/sections/Projects"
import { QADemo } from "@/components/sections/QADemo"
import { Automation } from "@/components/sections/Automation"
import { TestDocumentation } from "@/components/sections/TestDocumentation"
import { TestStrategy } from "@/components/sections/TestStrategy"
import { BugManagement } from "@/components/sections/BugManagement"
import { ExploratoryTesting } from "@/components/sections/ExploratoryTesting"
import { MobileTesting } from "@/components/sections/MobileTesting"
import { Metrics } from "@/components/sections/Metrics"
import { Contact } from "@/components/sections/Contact"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, FileText, Code } from "lucide-react"

export default function Home() {
  const [activeView, setActiveView] = useState<'all' | 'manual' | 'automation'>('all')

  const handleTabChange = (value: string) => {
    if (value === 'all' || value === 'manual' || value === 'automation') {
      setActiveView(value)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        
        {/* Testing Navigation Tabs */}
        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeView} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="all" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>All Testing</span>
              </TabsTrigger>
              <TabsTrigger value="manual" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Manual Testing</span>
              </TabsTrigger>
              <TabsTrigger value="automation" className="flex items-center space-x-2">
                <Code className="h-4 w-4" />
                <span>Automation Testing</span>
              </TabsTrigger>
            </TabsList>

            {/* All Testing View */}
            <TabsContent value="all" className="space-y-12 mt-8">
              <Skills />
              <Projects />
              {/* <QADemo /> */}
              <Automation />
              {/* <TestDocumentation /> */}
              {/* <TestStrategy />
              <BugManagement />
              <ExploratoryTesting /> */}
              {/* <UATTesting /> */}
              {/* <MobileTesting /> */}
              {/* <Metrics /> */}
            </TabsContent>

            {/* Manual Testing View */}
            <TabsContent value="manual" className="space-y-12 mt-8">
              {/* <TestDocumentation />
              <TestStrategy />
              <BugManagement />
              <ExploratoryTesting /> */}
              {/* <UATTesting /> */}
              {/* <MobileTesting /> */}
            </TabsContent>

            {/* Automation Testing View */}
            <TabsContent value="automation" className="space-y-12 mt-8">
              <Automation />
            </TabsContent>
          </Tabs>
        </div>
        
        <Contact />
      </main>
    </div>
  )
}
