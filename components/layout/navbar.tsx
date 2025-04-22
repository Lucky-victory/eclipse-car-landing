"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, useTransform, type useSpring, AnimatePresence } from "framer-motion"

interface NavbarProps {
  scrollY: ReturnType<typeof useSpring>
}

export function Navbar({ scrollY }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Navbar background opacity based on scroll
  const navbarBgOpacity = useTransform(scrollY, [0, 100], [0, 0.9])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{
          backgroundColor: navbarBgOpacity.get() > 0.1 ? `rgba(0, 0, 0, ${navbarBgOpacity.get()})` : "transparent",
          boxShadow: navbarBgOpacity.get() > 0.1 ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter">ECLIPSE</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="#hero" className="hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link href="#features" className="hover:text-gray-300 transition-colors">
              Features
            </Link>
            <Link href="#specs" className="hover:text-gray-300 transition-colors">
              Specifications
            </Link>
            <Link href="#gallery" className="hover:text-gray-300 transition-colors">
              Gallery
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black bg-opacity-95 flex flex-col items-center justify-center space-y-8 text-xl md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="#hero" onClick={() => setMenuOpen(false)} className="hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link href="#features" onClick={() => setMenuOpen(false)} className="hover:text-gray-300 transition-colors">
              Features
            </Link>
            <Link href="#specs" onClick={() => setMenuOpen(false)} className="hover:text-gray-300 transition-colors">
              Specifications
            </Link>
            <Link href="#gallery" onClick={() => setMenuOpen(false)} className="hover:text-gray-300 transition-colors">
              Gallery
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
