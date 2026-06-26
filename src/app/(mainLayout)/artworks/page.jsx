import { Suspense } from "react";
import { Card } from "@heroui/react";
import FilterPanel from "@/components/FilterPanel";
import ArtworkCard from "@/components/ArtworkCard";
import { fetchArtworks } from "@/lib/api/artworks/data";
import PaginationControls from "@/components/PaginationControls"; // নতুন ইম্পোর্ট

export default async function BrowseArtworksPage({ searchParams }) {
  const sParams = await searchParams;
  const search = sParams.search || "";
  const category = sParams.category || "";
  const sort = sParams.sort || "";
  
  // কারেন্ট পেজ এবং প্রতি পেজে কয়টি করে আইটেম দেখাবে (এখানে ৬টি দেওয়া হলো)
  const currentPage = Number(sParams.page) || 1;
  const ITEMS_PER_PAGE = 8; 

  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (sort) params.set("sort", sort);
  
  // ডাটা ব্যাকএন্ড থেকে নিয়ে আসা (সার্চ ও ফিল্টার করা ডাটা)
  const allArtworks = await fetchArtworks(params);

  // 📝 ক্লায়েন্ট সাইড পেজিনেশন লজিক (Slicing)
  const totalItems = allArtworks?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedArtworks = allArtworks?.slice(startIndex, endIndex) || [];

  return (
    <div className="min-h-screen py-8 sm:py-12 lg:py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-8 lg:space-y-12">

      {/* HEADER */}
      <div className="text-center md:text-left space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
          Browse Artworks
        </h1>
        <p className="text-[#8E8E9F] text-sm sm:text-base max-w-2xl">
          Discover unique digital art, paintings, illustrations, photography,
          and creative masterpieces from talented artists around the world.
        </p>
      </div>

      {/* FILTER PANEL */}
      <Suspense fallback={<div className="h-28 w-full rounded-2xl bg-[#0C0C14] border border-[#27273A] animate-pulse" />}>
        <FilterPanel />
      </Suspense>

      {/* ARTWORKS GRID */}
      <Suspense
        fallback={
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-[#0C0C14] border border-[#27273A] p-3 animate-pulse">
                <div className="aspect-[4/3] rounded-xl bg-[#161622]" />
                <div className="space-y-3 mt-4">
                  <div className="h-4 bg-[#161622] rounded-lg w-3/4" />
                  <div className="h-3 bg-[#161622] rounded-lg w-full" />
                </div>
              </Card>
            ))}
          </div>
        }
      >
        {displayedArtworks.length > 0 ? (
          <div className="space-y-10"> {/* পেজিনেশনের জন্য স্পেসিং */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
              {displayedArtworks.map((artwork) => (
                <ArtworkCard
                  key={artwork._id}
                  artwork={artwork}
                  buttonText="View Details"
                />
              ))}
            </div>

            {/* 🎛️ পেজিনেশন কন্ট্রোল UI (শুধুমাত্র ১ পেজের বেশি ডাটা থাকলে দেখাবে) */}
            {totalPages > 1 && (
              <PaginationControls 
                currentPage={currentPage} 
                totalPages={totalPages} 
              />
            )}
          </div>
        ) : (
          <Card className="bg-[#0C0C14]/80 border border-[#27273A] p-10 rounded-2xl text-center">
            <h3 className="text-white text-xl font-bold">No Artworks Found</h3>
            <p className="text-[#8E8E9F] mt-2">There are no artworks available for this selection.</p>
          </Card>
        )}
      </Suspense>
    </div>
  );
}