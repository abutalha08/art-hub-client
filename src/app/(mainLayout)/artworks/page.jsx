import { Suspense } from "react";
import { Card } from "@heroui/react";
import FilterPanel from "@/components/FilterPanel";
import ArtworkCard from "@/components/ArtworkCard";
import { fetchArtworks } from "@/lib/api/artworks/data";


export default async function BrowseArtworksPage() {
  const artworks = await fetchArtworks();

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
      <Suspense
        fallback={
          <div className="h-28 w-full rounded-2xl bg-[#0C0C14] border border-[#27273A] animate-pulse" />
        }
      >
        <FilterPanel />
      </Suspense>

      {/* ARTWORKS GRID */}
      <Suspense
        fallback={
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card
                key={i}
                className="bg-[#0C0C14] border border-[#27273A] p-3 animate-pulse"
              >
                <div className="aspect-[4/3] rounded-xl bg-[#161622]" />

                <div className="space-y-3 mt-4">
                  <div className="h-4 bg-[#161622] rounded-lg w-3/4" />
                  <div className="h-3 bg-[#161622] rounded-lg w-full" />
                  <div className="h-3 bg-[#161622] rounded-lg w-2/3" />
                </div>
              </Card>
            ))}
          </div>
        }
      >
        {artworks?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {artworks.map((artwork) => (
              <ArtworkCard
                key={artwork._id}
                artwork={artwork}
                buttonText="View Details"
              />
            ))}
          </div>
        ) : (
          <Card className="bg-[#0C0C14]/80 border border-[#27273A] p-10 rounded-2xl text-center">
            <h3 className="text-white text-xl font-bold">
              No Artworks Found
            </h3>

            <p className="text-[#8E8E9F] mt-2">
              There are no artworks available at the moment.
            </p>
          </Card>
        )}
      </Suspense>
    </div>
  );
}