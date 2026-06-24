"use client";

import { Card } from "@heroui/react";
import { FiShoppingBag, FiCalendar } from "react-icons/fi";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { getBuyerStats } from "@/lib/api/purchases/data";
import { getSubscriptionById } from "@/lib/api/subscriptions";

export default function UserDashboard() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [totalCollection, setTotalCollection] = useState(0);
  const [subscription, setSubscription] = useState(null);

  // ---------------------------
  // FETCH SUBSCRIPTION
  // ---------------------------
  useEffect(() => {
    const loadSubscription = async () => {
      if (!user?.subscription) return;

      try {
        const data = await getSubscriptionById(
          user.subscription || "collector_free"
        );

        setSubscription(data);
      } catch (error) {
        console.error("SUBSCRIPTION_ERROR:", error);
      }
    };

    loadSubscription();
  }, [user]);

  // ---------------------------
  // FETCH PURCHASE STATS
  // ---------------------------
  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.email) return;

      try {
        const data = await getBuyerStats(user.email);
        setTotalCollection(data?.totalCollection || 0);
      } catch (error) {
        console.error("BUYER_STATS_ERROR:", error);
      }
    };

    fetchStats();
  }, [user]);

  // ---------------------------
  // LOADING STATE
  // ---------------------------
  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#050508] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-neutral-400 font-semibold tracking-wide">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // ---------------------------
  // SUBSCRIPTION LIMIT LOGIC (FIXED)
  // ---------------------------
  const maxLimit = subscription?.maxPurchase ?? 3;
  const isUnlimited = maxLimit === -1;

  return (
    <div className="p-6 md:p-12 space-y-10 bg-[#050508] min-h-screen text-white selection:bg-purple-500/30">

      {/* HEADER */}
      <div className="space-y-2 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
          Welcome Back,{" "}
          <span className="relative inline-block bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            {user?.name || "Collector"}
          </span>
        </h1>

        <p className="text-base text-neutral-400 max-w-xl font-medium">
          Here is an overview of your curated art collection and journey.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">

        {/* TOTAL COLLECTION */}
        <div className="relative group rounded-3xl p-[1px] bg-gradient-to-b from-neutral-800 to-transparent hover:from-purple-500 hover:to-purple-900 transition-all duration-500">
          <Card className="p-8 flex flex-row items-center gap-6 bg-[#0e0e16]/90 backdrop-blur-xl rounded-[23px] border-none h-full">

            <div className="p-5 bg-purple-500/10 rounded-2xl border border-purple-500/20">
              <FiShoppingBag className="text-4xl text-purple-400" />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold tracking-widest text-purple-400 uppercase">
                Total Collection
              </p>

              <p className="text-3xl md:text-4xl font-black text-white tracking-tight">
                {totalCollection} out of{" "}
                {isUnlimited ? "Unlimited" : maxLimit}{" "}
                <span className="text-lg font-medium text-neutral-400">
                  Artworks
                </span>
              </p>

              {/* OPTIONAL INFO */}
              {!isUnlimited && (
                <p className="text-xs text-neutral-500">
                  You can buy {maxLimit - totalCollection} more artworks
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* COLLECTOR SINCE */}
        <div className="relative group rounded-3xl p-[1px] bg-gradient-to-b from-neutral-800 to-transparent hover:from-purple-600 hover:to-neutral-800 transition-all duration-500">
          <Card className="p-8 flex flex-row items-center gap-6 bg-[#0e0e16]/90 backdrop-blur-xl rounded-[23px] border-none h-full">

            <div className="p-5 bg-neutral-100/5 rounded-2xl border border-neutral-700">
              <FiCalendar className="text-4xl text-neutral-400" />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
                Collector Since
              </p>

              <p className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-400">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}