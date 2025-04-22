"use client"

import type React from "react"

import { useRef, useState } from "react"
import { useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { CarShowcaseSection } from "@/components/sections/car-showcase-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { SpecsSection } from "@/components/sections/specs-section"
import { GallerySection } from "@/components/sections/gallery-section"
import { CTASection } from "@/components/sections/cta-section"

// Custom hook for mouse tracking tilt effect
function useTilt() {
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

  return { tilt, handleMouseMove, handleMouseLeave }
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null)
  const carShowcaseRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  // Scroll progress
  const { scrollY } = useScroll()
  const scrollYSpring = useSpring(scrollY, { stiffness: 100, damping: 30 })

  // Navbar background opacity based on scroll
  const navbarBgOpacity = useTransform(scrollYSpring, [0, 100], [0, 0.9])

  // Hero section parallax effects
  const heroOpacity = useTransform(scrollYSpring, [0, 300], [1, 0])
  const heroY = useTransform(scrollYSpring, [0, 300], [0, 100])
  const heroContentY = useTransform(scrollYSpring, [0, 300], [0, -50])
  const scrollIndicatorOpacity = useTransform(scrollYSpring, [0, 200], [1, 0])

  // Car showcase parallax effects
  const carY = useTransform(scrollYSpring, [300, 800], [50, -50])
  const carOpacity = useTransform(scrollYSpring, [300, 500], [0, 1])
  const carTextY = useTransform(scrollYSpring, [400, 800], [50, -30])
  const carTextOpacity = useTransform(scrollYSpring, [400, 600], [0, 1])

  // Features section in-view detection
  const featuresInView = useInView(featuresRef, { once: false, amount: 0.2 })

  // Specs section parallax effects
  const specsLeftX = useTransform(scrollYSpring, [1800, 2200], [-100, 0])
  const specsRightX = useTransform(scrollYSpring, [1800, 2200], [100, 0])
  const specsOpacity = useTransform(scrollYSpring, [1800, 2000], [0, 1])

  // Gallery section in-view detection
  const galleryInView = useInView(galleryRef, { once: false, amount: 0.2 })

  // State for tilt effect
  const [featureTilts, setFeatureTilts] = useState<{ [key: number]: { x: number; y: number } }>({})

  const handleFeatureMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    const rect = element.getBoundingClientRect()

    // Calculate mouse position relative to the element
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate tilt based on mouse position
    // Convert to range of -15 to 15 degrees
    const tiltX = ((y / rect.height) * 2 - 1) * -15
    const tiltY = ((x / rect.width) * 2 - 1) * 15

    setFeatureTilts((prevTilts) => ({
      ...prevTilts,
      [index]: { x: tiltX, y: tiltY },
    }))
  }

  const handleFeatureMouseLeave = (index: number) => {
    setFeatureTilts((prevTilts) => ({
      ...prevTilts,
      [index]: { x: 0, y: 0 },
    }))
  }

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <Navbar scrollY={scrollYSpring} />
      <HeroSection scrollY={scrollYSpring} />
      <CarShowcaseSection scrollY={scrollYSpring} />
      <FeaturesSection />
      <SpecsSection scrollY={scrollYSpring} />
      <GallerySection />
      <CTASection />
      <Footer />
    </main>
  )
}
