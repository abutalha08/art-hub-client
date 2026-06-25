"use client";

import React from "react";
import { motion } from "motion/react";
import { HiOutlineSparkles } from "react-icons/hi2";

// ✅ সব আইকন এরর-ফ্রি করে ইম্পোর্ট করা হয়েছে
import { LuPaintbrush } from "react-icons/lu";
import { FiMonitor, FiCamera } from "react-icons/fi";
import { TbCube3dSphere } from "react-icons/tb"; 
import { FaPencil } from "react-icons/fa6";
import { MdAutoAwesome, MdOutlineCategory } from "react-icons/md";

const CATEGORIES = [
  {
    id: "digital-art",
    title: "Digital Art",
    iconBg: "bg-[#F242C2]/10 text-[#F242C2]",
    Icon: FiMonitor,
  },
  {
    id: "painting",
    title: "Painting",
    iconBg: "bg-[#00F2FE]/10 text-[#00F2FE]",
    Icon: LuPaintbrush,
  },
  {
    id: "illustration",
    title: "Illustration",
    iconBg: "bg-[#FFB800]/10 text-[#FFB800]",
    Icon: FaPencil,
  },
  {
    id: "3d-art",
    title: "3D Art",
    iconBg: "bg-[#00F5A0]/10 text-[#00F5A0]",
    Icon: TbCube3dSphere,
  },
  {
    id: "photography",
    title: "Photography",
    iconBg: "bg-[#FF4B4B]/10 text-[#FF4B4B]",
    Icon: FiCamera,
  },
  {
    id: "abstract",
    title: "Abstract",
    iconBg: "bg-[#A78BFA]/10 text-[#A78BFA]",
    Icon: MdAutoAwesome,
  },
  {
    id: "other",
    title: "Other",
    iconBg: "bg-[#8E8E9F]/10 text-[#8E8E9F]",
    Icon: MdOutlineCategory,
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
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 sm:gap-5">
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
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="relative group rounded-2xl bg-[#161622]/50 border border-[#27273A]/60 p-5 flex flex-col items-center text-center overflow-hidden hover:border-[#3A3A54] hover:bg-[#1A1A28] transition-colors duration-300"
              >
                {/* glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-b from-white/5 to-transparent" />

                {/* icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${cat.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                >
                  <Icon size={22} />
                </div>

                {/* title */}
                <h3 className="text-xs sm:text-sm font-semibold group-hover:text-white transition-colors tracking-wide">
                  {cat.title}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}