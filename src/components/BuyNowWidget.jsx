"use client";

import { useSession } from "@/lib/auth-client";
import { buyArtwork } from "@/lib/api/artworks/actions";
import { Card } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function BuyNowWidget({
  price = 0,
  artworkId,
}) {
  const { data: session } = useSession();

  const router = useRouter();
  const pathname = usePathname();

  const user = session?.user;

  const handleBuy = async () => {
    // Login check
    if (!user) {
      router.push(`/login?redirect=${pathname}`);
      return;
    }

    // Role check
    if (user.role !== "buyer") {
      toast.warning("Only buyers can purchase this artwork");
      return;
    }

    try {
      const result = await buyArtwork({
        artworkId,
        buyerEmail: user.email,
        buyerName: user.name,
      });

      if (result.success) {
        toast.success("Artwork purchased successfully!");
        router.refresh()
      } else {
        toast.error(result.message || "Purchase failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const isBuyer = user?.role === "buyer";

  return (
    <Card className="w-full bg-[#111119] border border-white/10 rounded-2xl p-5 sm:p-6">
      <div className="space-y-5">
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">
            Total Price
          </span>

          <span className="text-2xl sm:text-3xl font-bold text-purple-400">
            ${Number(price).toLocaleString()}
          </span>
        </div>

        {/* Not Logged In */}
        {!user && (
          <button
            onClick={() =>
              router.push(`/login?redirect=${pathname}`)
            }
            className="w-full h-12 bg-gradient-to-r from-[#7928CA] via-[#B342F2] to-[#F242C2] text-white font-semibold rounded-xl"
          >
            Login to Buy
          </button>
        )}

        {/* Buyer */}
        {user && isBuyer && (
          <button
            onClick={handleBuy}
            className="w-full h-12 bg-gradient-to-r from-[#7928CA] via-[#B342F2] to-[#F242C2] text-white font-semibold rounded-xl transition hover:opacity-90 active:scale-[0.98]"
          >
            Buy Now
          </button>
        )}

        {/* Artist/Admin */}
        {user && !isBuyer && (
          <div className="w-full min-h-12 flex items-center justify-center bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 text-center">
            Only buyers can purchase artworks
          </div>
        )}
      </div>
    </Card>
  );
}