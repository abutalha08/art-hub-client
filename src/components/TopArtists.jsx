"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { FaCrown, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";

// ✅ ৩ জন টপ সেলস আর্টিস্টের ডামি ডেটা (প্রোজেক্টের প্রয়োজন অনুযায়ী ব্যাকএন্ড থেকে ডেটা ম্যাপ করতে পারবে)
const TOP_ARTISTS = [
  {
    id: "artist-1",
    name: "Abu Talha",
    sales: 120,
    avatar: "https://i.ibb.co/NdpBpWsj/photo-1600180758890-6b94519a8ba6.avif",
    rank: 1,
    badgeBg: "bg-gradient-to-r from-[#FFD700] to-[#FFA500]", // গোল্ড ক্রাউন
  },
  {
    id: "artist-2",
    name: "Rifat Rahman",
    sales: 90,
    avatar: "https://i.ibb.co/Rk9LwYXw/photo-1527980965255-d3b416303d12.avif",
    rank: 2,
    badgeBg: "bg-gradient-to-r from-[#C0C0C0] to-[#A9A9A9]", // সিলভার ক্রাউন
  },
  {
    id: "artist-3",
    name: "Utsho Saha",
    sales: 65,
    avatar: "https://i.ibb.co/XZNMvFpF/photo-1654110455429-cf322b40a906.avif",
    rank: 3,
    badgeBg: "bg-gradient-to-r from-[#CD7F32] to-[#8B4513]", // ব্রোঞ্জ ক্রাউন
  },
];

export default function TopArtists() {
  return (
    <section className="w-full bg-[#0C0C14] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1F1F2E]/30 relative overflow-hidden">
      {/* Background Subtle Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7928CA]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161622] border border border-[#27273A] text-[11px] text-[#8E8E9F] mb-6"
        >
          <HiOutlineSparkles className="text-[#FFD700]" />
          Elite Creators
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">
            Top Artists
          </h2>
          <p className="text-sm sm:text-base text-[#9A9AAF] leading-relaxed">
            Meet the masterminds behind the highest-selling masterpieces. Driven by passion, recognized by collectors globally.
          </p>
        </motion.div>

        {/* Artists Grid (3 Columns Max) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          {TOP_ARTISTS.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative group rounded-3xl bg-gradient-to-b from-[#161622]/80 to-[#0F0F1A]/90 border border-[#27273A]/60 p-6 flex flex-col items-center text-center hover:border-[#B342F2]/40 hover:shadow-[0_20px_40px_rgba(121,40,202,0.1)] transition-all duration-300"
            >
              {/* Rank Crown Badge */}
              <div className={`absolute top-4 right-4 w-8 h-8 rounded-xl ${artist.badgeBg} flex items-center justify-center text-white shadow-md z-10`}>
                <FaCrown size={14} className={artist.rank === 1 ? "animate-bounce" : ""} />
              </div>

              {/* Avatar Wrapper with Neon Gradient Border */}
              <div className="relative w-24 h-24 mb-4 rounded-full p-[3px] bg-gradient-to-tr from-[#7928CA] via-[#B342F2] to-[#F242C2] shadow-lg shadow-[#7928CA]/20">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-[#0C0C14]">
                  <Image
                    src={artist.avatar}
                    alt={artist.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="96px"
                  />
                </div>
              </div>

              {/* Name & Verified Icon */}
              <div className="flex items-center gap-1.5 mb-1 justify-center">
                <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-[#B342F2] transition-colors">
                  {artist.name}
                </h3>
                <FaCheckCircle className="text-[#00F5A0]" size={13} title="Verified Artist" />
              </div>

              {/* Sales Count */}
              <p className="text-sm font-medium text-[#8E8E9F] tracking-wide mb-4">
                <span className="text-white font-extrabold text-base">{artist.sales}</span> Artworks Sold
              </p>

              {/* View Profile Subtle Button */}
              <button className="text-xs font-bold uppercase tracking-widest text-[#B342F2] group-hover:text-white flex items-center gap-1.5 bg-[#12121C] border border-[#27273A]/60 px-4 py-2 rounded-xl transition-all w-full justify-center group-hover:bg-[#B342F2]">
                View Profile
                <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}