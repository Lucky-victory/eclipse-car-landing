"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

export function GallerySection() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const galleryInView = useInView(galleryRef, { once: false, amount: 0.2 })

  return (
    <section id="gallery" ref={galleryRef} className="relative bg-black py-20">
      <div className="container mx-auto px-6 z-10 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Gallery</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">Experience the Eclipse from every angle</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              className="relative aspect-[4/3] overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              animate={galleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.5,
                delay: item * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.7 }} className="h-full w-full">
                <Image
                  src={`/gallery-${item}.jpg`}
                  alt={`Eclipse car gallery image ${item}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
