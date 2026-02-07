"use client"

import { motion } from "framer-motion"
import { ArrowRight, Bug, Shield, CheckCircle, Search, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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

  const floatingIcons = [
    { icon: Bug, delay: 0, x: -100, y: -50 },
    { icon: Shield, delay: 1, x: 100, y: -80 },
    { icon: CheckCircle, delay: 2, x: -80, y: 60 },
    { icon: Search, delay: 3, x: 120, y: 40 },
    { icon: Zap, delay: 4, x: -120, y: -20 },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center gradient-bg dark:gradient-bg-dark relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {floatingIcons.map(({ icon: Icon, delay, x, y }, index) => (
          <motion.div
            key={index}
            className="absolute opacity-20 dark:opacity-30 dark:drop-shadow-[0_0_20px_rgba(59,130,246,0.15)]"
            initial={{ x: 0, y: 0, rotate: 0 }}
            animate={{
              x: [x, x + 20, x],
              y: [y, y + 10, y],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6,
              delay: delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              left: "50%",
              top: "50%",
            }}
          >
            <Icon className="h-8 w-8 text-primary" />
          </motion.div>
        ))}

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* QA Badge */}
        <motion.div
          className="inline-flex items-center space-x-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-8"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-primary font-semibold">Quality Engineering Expert</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
          variants={itemVariants}
        >
          <span className="gradient-text">Quality Analyst</span>
          <br />
          <span className="text-foreground">Automation Engineer</span>
          <br />
          <span className="text-muted-foreground">Quality Advocate</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          I think in edge cases, test scenarios, and failure points.
          <span className="text-primary font-semibold"> Risk-based testing</span> isn't just a methodology—it's how I prevent bugs before they reach production.
          From boundary conditions to user empathy, I ensure quality at every step of the development lifecycle.
        </motion.p>

        {/* QA Mindset Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={itemVariants}
        >
          {[
            "🔍 Edge Case Hunter",
            "🛡️ Risk Mitigator",
            "🐛 Bug Prevention",
            "👥 User Advocate",
            "⚡ Performance Guardian",
            "🔄 Regression Buster",
          ].map((pill, index) => (
            <motion.span
              key={pill}
              className="bg-secondary/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            ><span className="hover:bg-primary hover:text-primary-foreground">
                {pill}
              </span>
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Test Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary/50 hover:border-primary hover:bg-primary/10 px-8 py-4 text-lg font-semibold transition-all duration-300"
              onClick={() => document.getElementById("qa-demo")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore QA Thinking
              <Search className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8"
          variants={itemVariants}
        >
          {[
            { number: "500+", label: "Test Cases" },
            { number: "50+", label: "Bugs Found" },
            { number: "10+", label: "Projects" },
            { number: "99%", label: "Coverage" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-text">{stat.number}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
