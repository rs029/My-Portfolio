"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Skills } from "@/components/sections/Skills"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        {/* Placeholder sections - will be implemented */}
        <section id="projects" className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Projects Section</h2>
            <p className="text-muted-foreground">QA Portfolio Projects</p>
          </div>
        </section>
        
        <section id="qa-demo" className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">QA Demo Section</h2>
            <p className="text-muted-foreground">Interactive Bug Demonstrations</p>
          </div>
        </section>
        
        <section id="automation" className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Automation Section</h2>
            <p className="text-muted-foreground">Code Snippets & Frameworks</p>
          </div>
        </section>
        
        <section id="metrics" className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Metrics Section</h2>
            <p className="text-muted-foreground">Impact & Quality Metrics</p>
          </div>
        </section>
        
        <section id="contact" className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Contact Section</h2>
            <p className="text-muted-foreground">Validated Contact Form</p>
          </div>
        </section>
      </main>
    </div>
  )
}
