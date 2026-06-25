"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Card } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getBuyerStats } from "@/lib/api/purchases/data";
import { getSubscriptionById } from "@/lib/api/subscriptions";

export default function BuyNowWidget({
  price = 0,
  artworkId,
  title,
  artistEmail,
}) {
  const { data: session } = useSession();

  const router = useRouter();
  const pathname = usePathname();

  const user = session?.user;

  const [subscription, setSubscription] = useState(null);
  const [purchaseCount, setPurchaseCount] = useState(0);

  useEffect(() => {
    const loadSubscription = async () => {
      if (!user?.subscription) return;

      try {
        const data = await getSubscriptionById(user.subscription);

        setSubscription(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadSubscription();
  }, [user]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.email) return;

      try {
        const data = await getBuyerStats(user.email);

        setPurchaseCount(data?.totalCollection || 0);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [user]);

  const isBuyer = user?.role === "buyer";

  const isOwnerArtist = user?.role === "artist" && user?.email === artistEmail;

  const isLimitReached =
    subscription &&
    subscription.maxPurchase !== -1 &&
    purchaseCount >= subscription.maxPurchase;

  return (
    <Card className="w-full bg-[#111119] border border-white/10 rounded-2xl p-5 sm:p-6">
      <div className="space-y-5">
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">Total Price</span>

          <span className="text-2xl sm:text-3xl font-bold text-purple-400">
            ${Number(price).toLocaleString()}
          </span>
        </div>

        {/* Owner Artist Controls */}
        {isOwnerArtist && (
          <Link href="/dashboard/artist/manage-artworks" className="block">
            <button className="w-full h-12 border border-purple-500/40 bg-purple-500/10 text-purple-300 font-semibold rounded-xl hover:bg-purple-500/20 transition">
              Edit Artwork
            </button>
          </Link>
        )}

        {/* Not Logged In */}
        {!user && (
          <button
            onClick={() => router.push(`/login?redirect=${pathname}`)}
            className="w-full h-12 bg-gradient-to-r from-[#7928CA] via-[#B342F2] to-[#F242C2] text-white font-semibold rounded-xl cursor-pointer"
          >
            Login to Buy
          </button>
        )}

        {/* Buyer + Can Buy */}
        {user && isBuyer && subscription && !isLimitReached && (
          <form action="/api/payment" method="POST">
            <input type="hidden" name="artworkId" value={artworkId} />

            <input type="hidden" name="title" value={title} />

            <input type="hidden" name="price" value={price} />

            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-[#7928CA] via-[#B342F2] to-[#F242C2] text-white font-semibold rounded-xl transition hover:opacity-90 active:scale-[0.98]"
            >
              Buy Now
            </button>
          </form>
        )}

        {/* Limit Reached */}
        {user && isBuyer && subscription && isLimitReached && (
          <div className="w-full min-h-12 flex flex-col items-center justify-center bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 text-center">
            <p>🚫 Purchase limit reached</p>

            <p className="text-xs text-slate-400 mt-1">
              Upgrade your subscription to continue buying
            </p>
          </div>
        )}

        {/* Artist/Admin */}
        {user && !isBuyer && !isOwnerArtist && (
          <div className="w-full min-h-12 flex items-center justify-center bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 text-center">
            Only buyers can purchase artworks
          </div>
        )}

        {/* Stats */}
        {user && isBuyer && subscription && (
          <p className="text-xs text-slate-500 text-center">
            {purchaseCount} /{" "}
            {subscription.maxPurchase === -1
              ? "Unlimited"
              : subscription.maxPurchase}{" "}
            artworks purchased
          </p>
        )}
      </div>
    </Card>
  );
}
