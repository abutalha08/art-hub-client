import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { FiAward, FiArrowUpRight } from "react-icons/fi";

export default function ArtworkCard({ artwork }) {
  return (
    <div className="group relative">
      {/* কার্ডের পেছনে একটা হালকা গ্লো ইফেক্ট যা হোভার করলে চমৎকারভাবে ফুটে উঠবে */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] rounded-[24px] opacity-0 group-hover:opacity-15 blur-xl transition duration-500" />
      
      {/* মেইন কার্ড বডি */}
      <div className="relative overflow-hidden rounded-[24px] bg-[#0A0A14]/90 border border-[#27273A]/40 p-3 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#8B5CF6]/50 hover:shadow-[0_20px_40px_rgba(139,92,246,0.15)] backdrop-blur-md">
        
        {/* IMAGE SECTION */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[#121220]">
          <Image
            src={artwork?.image}
            alt={artwork?.title}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:rotate-[0.5deg]"
            sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
            priority={false}
          />

          {/* গ্লাস-মরফিজম ক্যাটাগরি ব্যাজ */}
          <div className="absolute top-3 right-3 z-10">
            <span className="px-3.5 py-1.5 rounded-xl bg-[#09090E]/60 backdrop-blur-md text-[#E1DDF7] text-[11px] font-semibold tracking-wide uppercase border border-white/10 shadow-lg">
              {artwork?.category}
            </span>
          </div>

          {/* ইমেজের উপর ওভারলে ইফেক্ট (হোভার করলে নিচের দিক থেকে একটা ডার্ক শ্যাডো আসবে) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* CONTENT SECTION */}
        <div className="mt-4 px-1 pb-1">
          {/* টাইটেল এবং প্রাইস */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[18px] md:text-[20px] font-bold text-white tracking-tight transition-colors duration-300 group-hover:text-[#A78BFA] line-clamp-1">
              {artwork?.title}
            </h3>

            {/* প্রাইসটিকে গ্রেডিয়েন্ট লুক দেওয়া হয়েছে */}
            <span className="bg-gradient-to-r from-[#D946EF] to-[#A855F7] bg-clip-text text-transparent font-extrabold text-lg whitespace-nowrap">
              ${Number(artwork?.price).toLocaleString()}
            </span>
          </div>

          {/* আর্টিস্ট ইনফো */}
          <div className="mt-1.5 flex items-center gap-1.5 text-[#8E8E9F]">
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
              <FiAward size={11} className="text-[#A78BFA]" />
            </div>
            <span className="text-[14px] font-medium tracking-wide truncate">
              {artwork?.artistName || "Unknown Artist"}
            </span>
          </div>

          {/* প্রিমিয়াম ইন্টারেক্টিভ বাটন */}
          <div className="mt-4">
            <Link href={`/artworks/${artwork?._id}`} className="block">
              <Button
                size="md"
                endContent={<FiArrowUpRight className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />}
                className="w-full bg-[#131322] hover:bg-gradient-to-r hover:from-[#7928CA] hover:to-[#B342F2] text-[#D1D1DB] hover:text-white border border-[#27273A] hover:border-transparent rounded-xl font-semibold text-xs tracking-wide shadow-md transition-all duration-300"
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}