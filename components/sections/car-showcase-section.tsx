"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useTransform, type useSpring } from "framer-motion"

interface CarShowcaseSectionProps {
  scrollY: ReturnType<typeof useSpring>
}

export function CarShowcaseSection({ scrollY }: CarShowcaseSectionProps) {
  const carShowcaseRef = useRef<HTMLDivElement>(null)

  // Car showcase parallax effects
  const carY = useTransform(scrollY, [300, 800], [50, -50])
  const carOpacity = useTransform(scrollY, [300, 500], [0, 1])
  const carTextY = useTransform(scrollY, [400, 800], [50, -30])
  const carTextOpacity = useTransform(scrollY, [400, 600], [0, 1])

  return (
    <section
      ref={carShowcaseRef}
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden py-20"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,rgba(0,0,0,1)_70%)]"></div>
      </div>

      <div className="container mx-auto px-6 z-10 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="lg:w-3/5 relative"
            style={{
              y: carY,
              opacity: carOpacity,
            }}
          >
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full">
              <Image src="/car-main.png" alt="Eclipse luxury car" fill className="object-contain" priority />
            </div>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl -z-10"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 5,
                ease: "easeInOut",
              }}
            ></motion.div>
          </motion.div>

          <motion.div
            className="lg:w-2/5"
            style={{
              y: carTextY,
              opacity: carTextOpacity,
            }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
              Designed for the <span className="text-gray-400">Future</span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              The Eclipse combines sleek aesthetics with aerodynamic efficiency. Its dual-tone exterior with illuminated
              contours creates a distinctive presence on the road, while the lightweight carbon fiber chassis ensures
              optimal performance.
            </p>
            <motion.ul
              className="space-y-4 text-lg"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {[
                "Adaptive LED lighting system",
                "Carbon fiber reinforced body",
                "Aerodynamic design with 0.21 drag coefficient",
                "Panoramic glass roof with electrochromic tinting",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-3 relative"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <motion.div
                    className="w-3 h-3 bg-gradient-to-br from-white to-gray-500 rounded-full mb-0 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className="w-2 h-2 bg-zinc-900 rounded-full"></div>
                  </motion.div>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
