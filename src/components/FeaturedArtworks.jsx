import Link from "next/link";
import ArtworkCard from "@/components/ArtworkCard";
import { getFeaturedArtworks } from "@/lib/api/artworks/data";
import { HiOutlineSparkles } from "react-icons/hi2"; // ব্যাজ আইকনের জন্য

export default async function FeaturedArtworks() {
  const artworks = await getFeaturedArtworks();

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#0C0C14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* 1st Image অনুযায়ী Centered Header */}
        <div className="text-center max-w-2xl mb-12 flex flex-col items-center">
          {/* Curated Selection Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161622] border border-[#27273A] text-[11px] text-[#8E8E9F] mb-5">
            <HiOutlineSparkles className="text-[#B342F2]" />
            Curated Selection
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Featured Artworks
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#9A9AAF] leading-relaxed">
            Hand-picked originals from our most celebrated artists. Each work is
            unique and available for direct purchase.
          </p>
        </div>

        {/* Artworks Grid */}
        <div
          className="
            w-full
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-4
            sm:gap-5
            lg:gap-6
            mb-12
          "
        >
          {artworks?.map((artwork) => (
            <ArtworkCard
              key={artwork._id}
              artwork={artwork}
              buttonText="View Details"
            />
          ))}
        </div>

        {/* 2nd Image অনুযায়ী Centered View All Button */}
        <div className="w-full flex justify-center">
          <Link
            href="/artworks"
            className="
              inline-flex
              items-center
              gap-2
              px-8
              py-3.5
              rounded-full
              text-sm
              font-semibold
              text-[#A78BFA]
              bg-transparent
              border
              border-[#27273A]
              hover:border-[#B342F2]/60
              hover:bg-[#161622]
              transition-all
              duration-300
            "
          >
            View All Artworks <span className="text-base">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
