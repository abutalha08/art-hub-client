"use client";

import { Card } from "@heroui/react";
import { FiShoppingBag, FiAward, FiCalendar, FiArrowRight } from "react-icons/fi";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function UserDashboard() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // BetterAuth Loading State (রিলোড দিলে যেন ঠাস করে লগইন পেজে রিডাইরেক্ট না হয়)
  if (isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#0A0A0F]">
        <div className="w-8 h-8 border-4 border-[#D946EF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 p-6 lg:p-10 text-white min-h-screen bg-[#0A0A0F]">
      
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-serif tracking-wide">
          Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-[#D946EF] font-sans font-bold">{user?.name || "Collector"}</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
          Explore your curated digital gallery, manage premium art subscriptions, and update your collector profile.
        </p>
      </div>

      {/* Analytics/Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Purchases */}
        <Card className="bg-[#111119] border border-white/[0.05] p-6 rounded-2xl flex flex-row items-center gap-5 shadow-lg">
          <div className="p-4 rounded-xl bg-fuchsia-500/10 text-[#D946EF]">
            <FiShoppingBag size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Total Collection</p>
            <p className="text-2xl font-bold mt-1 tracking-tight">0 Artworks</p>
          </div>
        </Card>

        {/* Current Subscription Tier */}
        <Card className="bg-[#111119] border border-white/[0.05] p-6 rounded-2xl flex flex-row items-center gap-5 shadow-lg">
          <div className="p-4 rounded-xl bg-indigo-500/10 text-indigo-400">
            <FiAward size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Membership Tier</p>
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 mt-1 capitalize tracking-tight">
              {user?.subscriptionTier || "Free Plan"}
            </p>
          </div>
        </Card>

        {/* Dynamic Join Date */}
        <Card className="bg-[#111119] border border-white/[0.05] p-6 rounded-2xl flex flex-row items-center gap-5 shadow-lg">
          <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-400">
            <FiCalendar size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Collector Since</p>
            <p className="text-lg font-medium mt-1 text-slate-200">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "June 2026"}
            </p>
          </div>
        </Card>
      </div>

      {/* Quick Navigation Panel */}
      <div className="pt-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <Link href="/dashboard/user/purchases">
            <div className="p-5 bg-[#111119] hover:bg-[#161622] border border-white/[0.04] hover:border-violet-500/30 rounded-xl transition-all duration-300 flex justify-between items-center group cursor-pointer">
              <span className="text-sm font-medium text-slate-300 group-hover:text-white">View Purchased Gallery</span>
              <FiArrowRight size={16} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link href="/dashboard/user/subscription">
            <div className="p-5 bg-[#111119] hover:bg-[#161622] border border-white/[0.04] hover:border-violet-500/30 rounded-xl transition-all duration-300 flex justify-between items-center group cursor-pointer">
              <span className="text-sm font-medium text-slate-300 group-hover:text-white">Upgrade Subscription</span>
              <FiArrowRight size={16} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </div>

    </div>
  );
}