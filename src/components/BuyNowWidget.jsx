"use client";

import { useSession } from "@/lib/auth-client";
import { buyArtwork } from "@/lib/api/artworks/actions";
// import { getBuyerStats } from "@/lib/api/artworks/actions";
import { Card } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getBuyerStats } from "@/lib/api/purchases/data";
import { getSubscriptionById } from "@/lib/api/subscriptions";

export default function BuyNowWidget({
  price = 0,
  artworkId,
}) {
  const { data: session } = useSession();

  const router = useRouter();
  const pathname = usePathname();

  const user = session?.user;

  // const subscription1 = getSubscriptionById(user?.subscription || 'collector_free');
  // console.log(subscription1);

  const [subscription, setSubscription] = useState(null);

useEffect(() => {
  const loadSubscription = async () => {
    if (!user) return;

    try {
      const data = await getSubscriptionById(
        user.subscription || "collector_free"
      );

      setSubscription(data);
    } catch (error) {
      console.error(error);
    }
  };

  loadSubscription();
}, [user]);

console.log(subscription)

  // subscription plan (FREE)
  // const plan = {
  //   name: "free",
  //   maxPurchase: 3,
  // };

  const [purchaseCount, setPurchaseCount] = useState(0);

  // ✅ REAL API CALL
  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.email) return;

      try {
        const data = await getBuyerStats(user.email);

        setPurchaseCount(data.totalCollection || 0);
      } catch (error) {
        console.error("Failed to fetch buyer stats:", error);
        setPurchaseCount(0);
      }
    };

    fetchStats();
  }, [user]);

  const isBuyer = user?.role === "buyer";

  const isLimitReached = purchaseCount >= subscription?.maxPurchase;

  const handleBuy = async () => {
    if (!user) {
      router.push(`/login?redirect=${pathname}`);
      return;
    }

    if (user.role !== "buyer") {
      toast.warning("Only buyers can purchase this artwork");
      return;
    }

    // ❌ BLOCK IF LIMIT REACHED
    if (isLimitReached) {
      toast.error("Purchase limit reached. Upgrade your subscription.");
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
        router.refresh();
      } else {
        toast.error(result.message || "Purchase failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

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

        {/* LOGIN */}
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

        {/* BUY BUTTON (ONLY IF LIMIT NOT REACHED) */}
        {user && isBuyer && !isLimitReached && (
          <button
            onClick={handleBuy}
            className="w-full h-12 bg-gradient-to-r from-[#7928CA] via-[#B342F2] to-[#F242C2] text-white font-semibold rounded-xl transition hover:opacity-90 active:scale-[0.98]"
          >
            Buy Now
          </button>
        )}

        {/* LIMIT REACHED UI */}
        {user && isBuyer && isLimitReached && (
          <div className="w-full min-h-12 flex flex-col items-center justify-center bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 text-center">
            <p>🚫 Purchase limit reached</p>
            <p className="text-xs text-slate-400 mt-1">
              Upgrade to Pro or Premium to continue buying
            </p>
          </div>
        )}

        {/* ARTIST / ADMIN */}
        {user && !isBuyer && (
          <div className="w-full min-h-12 flex items-center justify-center bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 text-center">
            Only buyers can purchase artworks
          </div>
        )}

        {/* DEBUG (optional remove later) */}
        {user && isBuyer && (
          <p className="text-xs text-slate-500 text-center">
            {purchaseCount} / {subscription?.maxPurchase} artworks purchased
          </p>
        )}

      </div>
    </Card>
  );
}