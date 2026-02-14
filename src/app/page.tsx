"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Skills } from "@/components/sections/Skills"
import { Projects } from "@/components/sections/Projects"
import { QADemo } from "@/components/sections/QADemo"
import { Automation } from "@/components/sections/Automation"
import { Metrics } from "@/components/sections/Metrics"
import { Contact } from "@/components/sections/Contact"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <QADemo />
        <Automation />
        <Metrics />
        <Contact />
      </main>
    </div>
  )
}
