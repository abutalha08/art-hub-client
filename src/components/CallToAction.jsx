"use client";

import React from "react";
import { motion } from "motion/react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { IoColorPalette } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";

export default function CallToAction() {
  return (
    <section className="w-full bg-[#0C0C14] py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans selection:bg-[#B342F2]/30">
      <div className="max-w-7xl w-full flex justify-center">

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl rounded-[32px] border border-[#27273A]/40 bg-[#12121C] overflow-hidden px-6 py-16 sm:px-12 sm:py-20 flex flex-col items-center text-center shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
        >

          {/* ambient bg */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[140%] rounded-full bg-[#7928CA]/15 blur-[120px]" />
          <div className="absolute bottom-[-40%] right-[-10%] w-[50%] h-[140%] rounded-full bg-[#B342F2]/10 blur-[120px]" />

          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#201633]/90 border border-[#432371]/50 text-[11px] font-medium text-[#B342F2] mb-6 backdrop-blur-sm z-10"
          >
            <IoColorPalette className="text-[#F242C2] text-xs" />
            <span>For Artists</span>
          </motion.div>

          {/* TITLE */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-wide max-w-2xl leading-[1.2] mb-4 z-10"
          >
            Ready to Sell Your Art?
          </motion.h2>

          {/* SUBTITLE */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-sm sm:text-base text-[#8E8E9F] max-w-xl leading-relaxed mb-10 z-10 font-normal"
          >
            Join 180+ artists reaching global collectors. Set your price, tell
            your story, and let your work find its audience.
          </motion.p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto z-10">

            {/* PRIMARY */}
            <Link href="/login" className="w-full sm:w-auto">
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button
                  radius="xl"
                  className="w-full h-12 sm:h-13 px-8 font-medium text-white text-sm shadow-xl shadow-[#8E32D9]/10 bg-gradient-to-r from-[#7928CA] via-[#B342F2] to-[#F242C2] hover:opacity-95 transition-all"
                  endContent={
                    <motion.span whileHover={{ x: 3 }}>
                      <FiArrowRight className="text-base" />
                    </motion.span>
                  }
                >
                  Start Selling — It's Free
                  <FaArrowRight className="ml-2 text-sm opacity-90" />
                </Button>
              </motion.div>
            </Link>

            {/* SECONDARY */}
            <Link href="/browse" className="w-full sm:w-auto">
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button
                  radius="xl"
                  variant="bordered"
                  className="w-full h-12 sm:h-13 px-8 font-medium text-white text-sm
                  border border-[#3A3A54]/60
                  bg-[#161622]/30
                  hover:bg-[#1E1E30]
                  hover:border-[#4A4A6A]
                  transition-all duration-200"
                >
                  Browse First
                </Button>
              </motion.div>
            </Link>

          </div>
        </motion.div>
      </div>
    </section>
  );
}