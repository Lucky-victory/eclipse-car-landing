"use client"

import { useRef } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { motion, useTransform, type useSpring } from "framer-motion"

interface HeroSectionProps {
  scrollY: ReturnType<typeof useSpring>
}

export function HeroSection({ scrollY }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null)

  // Hero section parallax effects
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroY = useTransform(scrollY, [0, 300], [0, 100])
  const heroContentY = useTransform(scrollY, [0, 300], [0, -50])
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 200], [1, 0])

  return (
    <section id="hero" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: heroY,
          opacity: heroOpacity,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,rgba(0,0,0,0.5)_70%)]"></div>
        <Image src="/car-bg.png" alt="Luxury car background" fill className="object-cover object-center" priority />
      </motion.div>

      <div className="container mx-auto px-6 z-10 relative">
        <motion.div className="max-w-3xl" style={{ y: heroContentY }}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
            <span className="block">THE NEW</span>
            <span className="text-7xl md:text-9xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              ECLIPSE
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Redefining luxury with cutting-edge technology and unparalleled performance
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              className="px-8 py-3 bg-white text-black font-medium rounded-sm hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reserve Now
            </motion.button>
            <motion.button
              className="px-8 py-3 border border-white text-white font-medium rounded-sm hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Features
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        style={{ opacity: scrollIndicatorOpacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  )
}
