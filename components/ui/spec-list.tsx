"use client"

import { motion } from "framer-motion"

interface SpecItem {
  label: string
  value: string
}

interface SpecListProps {
  title: string
  items: SpecItem[]
  delay?: number
}

export function SpecList({ title, items, delay = 0 }: SpecListProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4 flex items-center">
        <span className="w-8 h-1 bg-white mr-3"></span>
        {title}
      </h3>
      <motion.ul
        className="space-y-4"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: delay,
            },
          },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
      >
        {items.map((item, index) => (
          <motion.li
            key={index}
            className="flex justify-between"
            variants={{
              hidden: { opacity: 0, x: title.includes("Battery") || title.includes("Technology") ? 20 : -20 },
              show: { opacity: 1, x: 0 },
            }}
          >
            <span className="text-gray-400">{item.label}</span>
            <span>{item.value}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
