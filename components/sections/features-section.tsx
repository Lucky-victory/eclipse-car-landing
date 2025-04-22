"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FeatureCard } from "../ui/feature-card"

const features = [
  {
    title: "Electric Performance",
    description: "Dual motor all-wheel drive system delivering 0-60 mph in 2.8 seconds with a range of 400+ miles.",
  },
  {
    title: "Advanced Autopilot",
    description: "Level 3 autonomous driving capabilities with 360° sensor coverage and real-time traffic adaptation.",
  },
  {
    title: "Immersive Cockpit",
    description: "17-inch curved OLED display with augmented reality HUD and gesture control interface.",
  },
  {
    title: "Adaptive Suspension",
    description:
      "Electronically controlled air suspension that adjusts ride height and damping based on road conditions.",
  },
  {
    title: "Biometric Access",
    description: "Facial recognition and fingerprint authentication for personalized vehicle settings and security.",
  },
  {
    title: "Wireless Connectivity",
    description: "5G connectivity with over-the-air updates and integrated ecosystem for seamless digital experience.",
  },
]

export function FeaturesSection() {
  const featuresRef = useRef<HTMLDivElement>(null)
  const featuresInView = useInView(featuresRef, { once: false, amount: 0.2 })

  return (
    <section
      id="features"
      ref={featuresRef}
      className="relative min-h-screen bg-gradient-to-b from-black to-zinc-900 py-20"
    >
      <div className="container mx-auto px-6 z-10 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Cutting-Edge <span className="text-gray-400">Features</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience innovation that pushes the boundaries of automotive technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              index={index}
              inView={featuresInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
