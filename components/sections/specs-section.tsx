"use client";

import { useRef } from "react";
import { motion, useTransform, type useSpring } from "framer-motion";
import { SpecList } from "../ui/spec-list";

interface SpecsSectionProps {
  scrollY: ReturnType<typeof useSpring>;
}

export function SpecsSection({ scrollY }: SpecsSectionProps) {
  const specsRef = useRef<HTMLDivElement>(null);

  // Specs section parallax effects
  const specsLeftX = useTransform(scrollY, [1800, 2200], [-100, 0]);
  const specsRightX = useTransform(scrollY, [1800, 2200], [100, 0]);
  const specsOpacity = useTransform(scrollY, [1800, 2000], [0, 1]);

  const performanceSpecs = [
    { label: "Acceleration (0-60 mph)", value: "2.8 seconds" },
    { label: "Top Speed", value: "200 mph" },
    { label: "Range", value: "420 miles" },
    { label: "Peak Power", value: "1,020 hp" },
  ];

  const dimensionSpecs = [
    { label: "Length", value: "196.0 inches" },
    { label: "Width", value: "78.2 inches" },
    { label: "Height", value: "54.5 inches" },
    { label: "Weight", value: "4,560 lbs" },
  ];

  const batterySpecs = [
    { label: "Battery Capacity", value: "120 kWh" },
    { label: "Fast Charging (10-80%)", value: "18 minutes" },
    { label: "Charging Rate (max)", value: "350 kW" },
    { label: "Energy Consumption", value: "290 Wh/mile" },
  ];

  const techSpecs = [
    { label: "Display Size", value: "17-inch OLED" },
    { label: "Sound System", value: "22-speaker, 1,200W" },
    { label: "Connectivity", value: "5G, Wi-Fi 6E, Bluetooth 5.2" },
    { label: "Processing Power", value: "14 TFLOPS" },
  ];

  return (
    <section
      id="specs"
      ref={specsRef}
      className="relative min-h-screen bg-zinc-900 py-20"
    >
      <motion.div
        className="absolute inset-0 z-0 opacity-20"
        style={{ y: useTransform(scrollY, [1800, 2400], [100, -100]) }}
      >
        <div className="h-full w-full bg-[url('/gallery-1.jpg')] bg-repeat opacity-30"></div>
      </motion.div>

      <div className="container mx-auto px-6 z-10 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Technical <span className="text-gray-400">Specifications</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Engineered for exceptional performance and efficiency
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            className="space-y-8"
            style={{
              x: specsLeftX,
              opacity: specsOpacity,
            }}
          >
            <SpecList title="Performance" items={performanceSpecs} />
            <SpecList title="Dimensions" items={dimensionSpecs} delay={0.2} />
          </motion.div>

          <motion.div
            className="space-y-8"
            style={{
              x: specsRightX,
              opacity: specsOpacity,
            }}
          >
            <SpecList title="Battery & Charging" items={batterySpecs} />
            <SpecList title="Technology" items={techSpecs} delay={0.2} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
