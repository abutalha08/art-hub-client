"use client";

import { Card } from "@heroui/react";
import { FiShoppingBag, FiCalendar } from "react-icons/fi";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { getBuyerStats } from "@/lib/api/purchases/data";

export default function UserDashboard() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [totalCollection, setTotalCollection] = useState(0);

  // ✅ FETCH BUYER STATS (ONLY TOTAL COLLECTION)
  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.email) return;

      try {
        const data = await getBuyerStats(user.email);
        setTotalCollection(data?.totalCollection || 0);
      } catch (error) {
        console.log("BUYER_STATS_ERROR:", error);
      }
    };

    fetchStats();
  }, [user]);

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#050508] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-neutral-400 font-semibold tracking-wide">
            Loading  dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 space-y-10 bg-[#050508] min-h-screen text-white selection:bg-purple-500/30">
      {/* DASHBOARD HEADER */}
      <div className="space-y-2 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
          Welcome Back,{" "}
          <span className="relative inline-block bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.25)] animate-pulse [animation-duration:5s] tracking-wide opacity-95">
            {user?.name || "Collector"}
          </span>
        </h1>
        <p className="text-base text-neutral-400 max-w-xl font-medium">
          Here is a overview of your curated art collection and journey.
        </p>
      </div>

      {/* STATS CARDS CONTAINER (MASSIVE & PASHAPASHI) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* TOTAL COLLECTION CARD */}
        <div className="relative group rounded-3xl p-[1px] bg-gradient-to-b from-neutral-800 to-transparent hover:from-purple-500 hover:to-purple-900 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <Card className="p-8 flex flex-row items-center gap-6 bg-[#0e0e16]/90 backdrop-blur-xl rounded-[23px] border-none h-full transition-all duration-500 group-hover:bg-[#0e0e16]/70">
            {/* Purple Icon Container */}
            <div className="p-5 bg-purple-500/10 rounded-2xl border border-purple-500/20 group-hover:scale-105 group-hover:bg-purple-500/20 group-hover:border-purple-400/40 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.05)]">
              <FiShoppingBag className="text-4xl text-purple-400 group-hover:text-purple-300 transition-colors" />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold tracking-widest text-purple-400/80 uppercase">
                Total Collection
              </p>
              <p className="text-3xl md:text-4xl font-black text-white tracking-tight">
                {totalCollection}{" "} out of 3 {" "}
                <span className="text-lg font-medium text-neutral-400 group-hover:text-neutral-300 transition-colors">
                  Artworks
                </span>
              </p>
            </div>
          </Card>
        </div>

        {/* COLLECTOR SINCE CARD */}
        <div className="relative group rounded-3xl p-[1px] bg-gradient-to-b from-neutral-800 to-transparent hover:from-purple-600 hover:to-neutral-800 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <Card className="p-8 flex flex-row items-center gap-6 bg-[#0e0e16]/90 backdrop-blur-xl rounded-[23px] border-none h-full transition-all duration-500 group-hover:bg-[#0e0e16]/70">
            {/* White/Purple Glossy Icon Container */}
            <div className="p-5 bg-neutral-100/5 rounded-2xl border border-neutral-700 group-hover:scale-105 group-hover:bg-purple-500/10 group-hover:border-purple-500/40 transition-all duration-300">
              <FiCalendar className="text-4xl text-neutral-400 group-hover:text-purple-400 transition-colors" />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
                Collector Since
              </p>
              <p className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-400 bg-clip-text text-transparent tracking-tight">
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
