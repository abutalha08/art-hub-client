import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import { getMyPurchases, getPurchasedArtworks } from "@/lib/api/purchases/data";
import Image from "next/image";
import Link from "next/link";

export default async function BoughtArtworksPage() {
  const user = await getUserSession();

  if (!user) {
    redirect("/login");
  }

  const purchases = await getPurchasedArtworks(user.email);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">
        Bought Artworks
      </h1>

      {purchases.length === 0 ? (
        <div className="bg-[#111119] border border-white/10 rounded-2xl p-10 text-center text-slate-400">
          You haven't purchased any artwork yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchases.map((artwork) => (
            <div
              key={artwork._id}
              className="bg-[#111119] border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src={artwork?.image}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-white font-semibold text-lg">
                  {artwork.title}
                </h3>

                <p className="text-purple-400 font-bold">
                  ${artwork.price}
                </p>

                <p className="text-sm text-slate-400">
                  Artist: {artwork.artistName}
                </p>

                <Link
                  href={`/artworks/${artwork.artworkId}`}
                  className="inline-block w-full text-center py-2 rounded-xl bg-gradient-to-r from-[#7928CA] via-[#B342F2] to-[#F242C2] text-white font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}