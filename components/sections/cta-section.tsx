"use client"

import { motion } from "framer-motion"

export function CTASection() {
  return (
    <section className="relative bg-gradient-to-b from-zinc-900 to-black py-20">
      <div className="container mx-auto px-6 z-10 relative">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Experience the <span className="text-gray-400">Eclipse</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Schedule a test drive today and discover the future of automotive luxury and performance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-4 bg-white text-black font-medium rounded-sm hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reserve Now
            </motion.button>
            <motion.button
              className="px-8 py-4 border border-white text-white font-medium rounded-sm hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact a Specialist
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
