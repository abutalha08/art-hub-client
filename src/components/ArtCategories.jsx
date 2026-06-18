"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { HiOutlineSparkles } from "react-icons/hi2";

import { LuPaintbrush } from "react-icons/lu";
import { FiMonitor, FiCamera } from "react-icons/fi";
import { GiMoai, GiMountainCave } from "react-icons/gi";
import { FaPencil } from "react-icons/fa6";

const CATEGORIES = [
  {
    id: "painting",
    title: "Painting",
    count: 48,
    countColor: "text-[#7928CA]",
    iconBg: "bg-[#7928CA]/10 text-[#7928CA]",
    Icon: LuPaintbrush,
    href: "/browse?category=painting",
  },
  {
    id: "digital",
    title: "Digital",
    count: 36,
    countColor: "text-[#F242C2]",
    iconBg: "bg-[#F242C2]/10 text-[#F242C2]",
    Icon: FiMonitor,
    href: "/browse?category=digital",
  },
  {
    id: "sculpture",
    title: "Sculpture",
    count: 22,
    countColor: "text-[#00F2FE]",
    iconBg: "bg-[#00F2FE]/10 text-[#00F2FE]",
    Icon: GiMoai,
    href: "/browse?category=sculpture",
  },
  {
    id: "photography",
    title: "Photography",
    count: 31,
    countColor: "text-[#FFB800]",
    iconBg: "bg-[#FFB800]/10 text-[#FFB800]",
    Icon: FiCamera,
    href: "/browse?category=photography",
  },
  {
    id: "landscape",
    title: "Landscape",
    count: 19,
    countColor: "text-[#00F5A0]",
    iconBg: "bg-[#00F5A0]/10 text-[#00F5A0]",
    Icon: GiMountainCave,
    href: "/browse?category=landscape",
  },
  {
    id: "sketch",
    title: "Sketch",
    count: 27,
    countColor: "text-[#FF4B4B]",
    iconBg: "bg-[#FF4B4B]/10 text-[#FF4B4B]",
    Icon: FaPencil,
    href: "/browse?category=sketch",
  },
];

export default function ArtCategories() {
  return (
    <section className="w-full bg-[#0C0C14] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F1F2E]/30">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161622] border border-[#27273A] text-[11px] text-[#8E8E9F] mb-6"
        >
          <HiOutlineSparkles className="text-[#B342F2]" />
          Browse by Type
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">
            Art Categories
          </h2>

          <p className="text-sm sm:text-base text-[#9A9AAF] leading-relaxed">
            Discover art across every medium and style. Filter by category to
            find exactly what speaks to you.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {CATEGORIES.map((cat, index) => {
            const Icon = cat.Icon;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="relative group rounded-2xl bg-[#161622]/50 border border-[#27273A]/60 p-5 flex flex-col items-center text-center overflow-hidden hover:border-[#3A3A54] hover:bg-[#1A1A28]"
              >
                {/* glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-b from-white/5 to-transparent" />

                {/* icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${cat.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}
                >
                  <Icon size={22} />
                </div>

                {/* title */}
                <h3 className="text-sm font-semibold mb-1 group-hover:text-white">
                  {cat.title}
                </h3>

                {/* count */}
                <p className={`text-xs font-medium ${cat.countColor}`}>
                  {cat.count} works
                </p>

                {/* full clickable layer */}
                <Link
                  href={cat.href}
                  className="absolute inset-0 z-10 rounded-2xl"
                  aria-label={`Browse ${cat.title}`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}