import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { FiHeart, FiShare2, FiCheckCircle } from "react-icons/fi";
import { baseURL } from "@/lib/api/baseUrl";

import BuyNowWidget from "@/components/BuyNowWidget";

/* ---------------- Fetch Function ---------------- */
const fetchArtwork = async (id) => {
  try {
    const res = await fetch(`${baseURL}/api/single-artworks/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch artwork");
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

/* ---------------- Page ---------------- */
export default async function ArtworkDetailsPage({ params }) {
    
  const { id } = await params;
  const artwork = await fetchArtwork(id);

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F] text-slate-400">
        Artwork not found or failed to load.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0A0A0F] text-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-10 md:py-14 space-y-10">

        {/* 🔙 Back Button */}
        <div>
          <Link href="/artworks">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-purple-950/40 transition-all duration-200 cursor-pointer group">

              <FaArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />

              <span className="text-sm font-medium">Back</span>

            </div>
          </Link>
        </div>

        {/* 🎯 MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">

          {/* 🖼️ IMAGE SECTION */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="relative w-full h-[340px] sm:h-[450px] md:h-[550px] lg:h-[620px] xl:h-[680px] rounded-[28px] overflow-hidden border border-white/10 shadow-2xl group">

              {artwork?.image && (
                <Image
                  src={artwork.image}
                  alt={artwork.title || "Artwork"}
                  fill
                  className="object-cover"
                  priority
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* floating actions */}
              <div className="absolute top-5 right-5 flex flex-col gap-3 z-10">
                <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center justify-center hover:scale-105 transition">
                  <FiHeart size={18} />
                </button>

                <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center justify-center hover:scale-105 transition">
                  <FiShare2 size={18} />
                </button>
              </div>

            </div>
          </div>

          {/* 📝 CONTENT SECTION */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6 md:space-y-8">

            {/* Category */}
            <span className="inline-block px-3 py-1 text-xs font-medium text-violet-300 bg-violet-950/40 border border-violet-800/30 rounded-full">
              {artwork?.category || "Digital Art"}
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight">
              {artwork?.title}
            </h1>

            {/* Artist */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-xs font-bold">
                {artwork?.artistName?.charAt(0) || "A"}
              </div>

              <div>
                <div className="flex items-center gap-1 text-sm text-slate-200">
                  {artwork?.artistName || "Artist Name"}
                  <FiCheckCircle size={14} className="text-indigo-400" />
                </div>
                <p className="text-xs text-slate-500">Verified Artist</p>
              </div>
            </div>

            {/* Price */}
            <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-purple-400">
              ${artwork?.price ? Number(artwork.price).toLocaleString() : "0"}
            </div>

            {/* Description */}
            <p className="text-slate-400 text-sm md:text-[15px] leading-relaxed max-w-xl">
              {artwork?.description || "No description provided for this artwork."}
            </p>

            {/* INFO GRID */}
            <div className="bg-[#111119] border border-white/10 rounded-2xl p-5 md:p-6 grid grid-cols-2 gap-5">

              <div>
                <p className="text-xs text-slate-500 uppercase">Category</p>
                <p className="text-sm text-slate-200">{artwork?.category}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500 uppercase">Date</p>
                <p className="text-sm text-slate-200">
                  {artwork?.createdAt
                    ? new Date(artwork.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500 uppercase">Medium</p>
                <p className="text-sm text-slate-200">Digital Art</p>
              </div>

              <div>
                <p className="text-xs text-slate-500 uppercase">Status</p>
                <p className="text-sm text-emerald-400">Available</p>
              </div>

            </div>

            {/* 🔥 WIDGET (IMPORTANT PART) */}
            <div className="pt-6">
              <BuyNowWidget
                price={artwork?.price}
                availableStock={artwork?.availableStock || 10}
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}