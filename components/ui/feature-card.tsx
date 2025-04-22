"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

interface FeatureCardProps {
  title: string
  description: string
  index: number
  inView: boolean
}

export function FeatureCard({ title, description, index, inView }: FeatureCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    const rect = element.getBoundingClientRect()

    // Calculate mouse position relative to the element
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate tilt based on mouse position
    // Convert to range of -15 to 15 degrees
    const tiltX = ((y / rect.height) * 2 - 1) * -15
    const tiltY = ((x / rect.width) * 2 - 1) * 15

    setTilt({ x: tiltX, y: tiltY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      className="group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-8 rounded-lg hover:bg-zinc-800/50 transition-all duration-300 perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Tilt Container */}
      <motion.div
        className="relative z-10 w-full h-full"
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.8,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Card Content with 3D Effect */}
        <div className="transform-style-3d">
          {/* Orbiting Ring Animation */}
          <motion.div
            className="absolute -inset-px rounded-lg border border-transparent opacity-0 group-hover:opacity-100 overflow-hidden"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <svg className="absolute inset-0 h-full w-full">
              <motion.circle
                cx="50%"
                cy="50%"
                r="49%"
                fill="none"
                stroke="url(#gradientStroke)"
                strokeWidth="1.5"
                strokeDasharray="10,5"
                initial={{ rotate: 0, strokeDashoffset: 0 }}
                animate={{
                  rotate: 360,
                  strokeDashoffset: -100,
                }}
                transition={{
                  duration: 20,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
              <defs>
                <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Glowing Corner Dots */}
          <motion.div
            className="absolute top-0 left-0 w-2 h-2 rounded-full bg-white/70 opacity-0 group-hover:opacity-100"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{ transform: "translateZ(4px)" }}
          />
          <motion.div
            className="absolute top-0 right-0 w-2 h-2 rounded-full bg-white/70 opacity-0 group-hover:opacity-100"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ transform: "translateZ(4px)" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-2 h-2 rounded-full bg-white/70 opacity-0 group-hover:opacity-100"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ transform: "translateZ(4px)" }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-white/70 opacity-0 group-hover:opacity-100"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ transform: "translateZ(4px)" }}
          />

          {/* Feature Icon */}
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-white to-gray-500 rounded-full mb-6 flex items-center justify-center relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="w-10 h-10 bg-zinc-900 rounded-full"></div>
          </motion.div>

          {/* Feature Content */}
          <h3 className="text-2xl font-bold mb-4 relative" style={{ transform: "translateZ(20px)" }}>
            {title}
          </h3>
          <p className="text-gray-400 relative" style={{ transform: "translateZ(15px)" }}>
            {description}
          </p>

          {/* Hover Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/0 to-white/5 rounded-lg opacity-0 group-hover:opacity-100"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* 3D Shadow Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-black/30 blur-md -z-10"
        animate={{
          x: tilt.y * 0.25,
          y: -tilt.x * 0.25,
          opacity: tilt.x !== 0 || tilt.y !== 0 ? 0.5 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      />
    </motion.div>
  )
}
