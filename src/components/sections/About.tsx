"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Shield, Bug, Search, Users, Zap, AlertTriangle, CheckCircle } from "lucide-react"

const qaMindsetCards = [
  {
    icon: Brain,
    title: "How I Break Features",
    description: "I think like a user who wants to break things. What happens if you click twice? What if the network fails? What if the input is malformed?",
    color: "text-red-500 dark:text-red-400",
    // bgColor: "bg-red-50 dark:bg-red-800/60",
    borderColor: "border-red-200 dark:border-red-800",
  },
  {
    icon: Shield,
    title: "How I Prevent Bugs",
    description: "Through risk-based testing, I identify failure points before they reach production. Every edge case is a potential disaster waiting to happen.",
    color: "text-blue-500 dark:text-blue-400",
    // bgColor: "bg-blue-50 dark:bg-blue-800/60",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  {
    icon: Users,
    title: "How I Think Like a User",
    description: "I test with empathy. What would confuse a non-technical user? What happens when someone makes an honest mistake?",
    color: "text-green-500 dark:text-green-400",
    // bgColor: "bg-green-50 dark:bg-green-800/60",
    borderColor: "border-green-200 dark:border-green-800",
  },
  {
    icon: Search,
    title: "Test Scenarios",
    description: "I don't just test happy paths. I explore the dark corners of your application where bugs love to hide.",
    color: "text-purple-500 dark:text-purple-400",
    // bgColor: "bg-purple-50 dark:bg-purple-800/60",
    borderColor: "border-purple-200 dark:border-purple-800",
  },
  {
    icon: AlertTriangle,
    title: "Boundary Conditions",
    description: "Zero, negative numbers, maximum values, null inputs. These are where systems fail most spectacularly.",
    color: "text-orange-500 dark:text-orange-400",
    // bgColor: "bg-orange-50 dark:bg-orange-800/60",
    borderColor: "border-orange-200 dark:border-orange-800",
  },
  {
    icon: Zap,
    title: "Performance Guardian",
    description: "I ensure your app doesn't just work, it works fast. Every millisecond counts when users are waiting.",
    color: "text-yellow-500 dark:text-yellow-400",
    // bgColor: "bg-yellow-50 dark:bg-yellow-800/60",
    borderColor: "border-yellow-200 dark:border-yellow-800",
  },
]

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

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Brain className="h-5 w-5 text-primary" />
            <span className="text-primary font-semibold">QA Mindset</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Quality Thinking</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I don't just find bugs—I prevent them. My approach combines technical expertise with 
            user empathy to ensure quality at every stage of development.
          </p>
        </motion.div>

        {/* QA Mindset Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {qaMindsetCards.map((card, index) => (
            <motion.div
              key={card.title}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                boxShadow: "0 20px 25px -5px hsl(var(--foreground) / 0.1), 0 10px 10px -5px hsl(var(--foreground) / 0.04)"
              }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
            >
              <Card className={`h-full border-2 ${card.borderColor}  hover:shadow-xl hover:border-primary/50 transition-all duration-300`}>
                <CardHeader className="pb-4">
                  <motion.div
                    className={`w-12 h-12 rounded-lg  flex items-center justify-center mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <card.icon className={`h-6 w-6 ${card.color}`} />
                  </motion.div>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    {card.title}
                    <motion.div
                      className="w-2 h-2 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* QA Philosophy Section */}
        <motion.div
          className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="space-y-6">
            <h3 className="text-2xl font-bold gradient-text">Testing Philosophy</h3>
            <div className="space-y-4">
              {[
                "Every bug found is a user's frustration prevented",
                "Quality is not an act, it's a habit",
                "Test early, test often, test automatically",
                "The best bug is the one that never reaches production",
              ].map((philosophy, index) => (
                <motion.div
                  key={philosophy}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-card"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0" />
                  <span className="text-foreground">{philosophy}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold gradient-text">Risk Assessment</h3>
            <div className="space-y-4">
              {[
                { risk: "Critical", areas: "Payment processing, user authentication, data loss", color: "text-red-500 dark:text-red-400" },
                { risk: "High", areas: "Core functionality, performance bottlenecks", color: "text-orange-500 dark:text-orange-400" },
                { risk: "Medium", areas: "UI/UX issues, edge cases in non-critical features", color: "text-yellow-500 dark:text-yellow-400" },
                { risk: "Low", areas: "Cosmetic issues, typos, minor inconsistencies", color: "text-blue-500 dark:text-blue-400" },
              ].map((item, index) => (
                <motion.div
                  key={item.risk}
                  className="p-4 rounded-lg border border-border bg-card"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-bold ${item.color}`}>{item.risk} Risk</span>
                    <div className={`w-3 h-3 rounded-full ${item.color.replace('text', 'bg')}`} />
                  </div>
                  <p className="text-sm text-muted-foreground">{item.areas}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
