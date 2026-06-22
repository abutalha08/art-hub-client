"use client";

import { Card } from "@heroui/react";
import { FiShoppingBag, FiAward, FiCalendar } from "react-icons/fi";
import { useSession } from "@/lib/auth-client";
import { FaCrown } from "react-icons/fa6";

export default function UserDashboard() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // BetterAuth ডাটাবেজ থেকে ডাইনামিকালি প্রিমিয়াম স্ট্যাটাস রিড করা হচ্ছে
  const isPremium = user?.isPremium || false; 

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#0A0A0F]">
        <div className="w-8 h-8 border-4 border-[#D946EF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-10 text-white min-h-screen bg-[#0A0A0F]">
      
      {/* Welcome Header */}
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-wide leading-tight">
          Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-[#D946EF] font-sans font-bold">{user?.name || "Collector"}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
          Explore your curated digital gallery, manage premium art subscriptions, and update your collector profile.
        </p>
      </div>

      {/* Analytics/Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Total Purchases */}
        <Card className="bg-[#111119] border border-white/[0.05] p-5 sm:p-6 rounded-2xl flex flex-row items-center gap-4 sm:gap-5 shadow-xl">
          <div className="p-3.5 sm:p-4 rounded-xl bg-fuchsia-500/10 text-[#D946EF] shrink-0">
            <FiShoppingBag className="text-xl sm:text-2xl" />
          </div>
          <div>
            <p className="text-[11px] sm:text-xs text-slate-500 uppercase tracking-widest font-semibold">Total Collection</p>
            {/* এখানে পরবর্তীতে ডাইনামিক পারচেজ কাউন্ট বসবে */}
            <p className="text-xl sm:text-2xl font-bold mt-0.5 tracking-tight">0 Artworks</p> 
          </div>
        </Card>

        {/* Current Subscription Tier */}
        <Card className="bg-[#111119] border border-white/[0.05] p-5 sm:p-6 rounded-2xl flex flex-row items-center gap-4 sm:gap-5 shadow-xl">
          <div className="p-3.5 sm:p-4 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
            <FiAward className="text-xl sm:text-2xl" />
          </div>
          <div>
            <p className="text-[11px] sm:text-xs text-slate-500 uppercase tracking-widest font-semibold">Membership Tier</p>
            <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 mt-0.5 capitalize tracking-tight">
              {isPremium ? "Premium Elite" : "Free Plan"}
            </p>
          </div>
        </Card>

        {/* Dynamic Join Date */}
        <Card className="bg-[#111119] border border-white/[0.05] p-5 sm:p-6 rounded-2xl flex flex-row items-center gap-4 sm:gap-5 shadow-xl sm:col-span-2 lg:col-span-1">
          <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
            <FiCalendar className="text-xl sm:text-2xl" />
          </div>
          <div>
            <p className="text-[11px] sm:text-xs text-slate-500 uppercase tracking-widest font-semibold">Collector Since</p>
            <p className="text-base sm:text-lg font-medium mt-0.5 text-slate-200">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "June 2026"}
            </p>
          </div>
        </Card>
      </div>

      {/* Premium Banner Section */}
      <div className="pt-2">
        <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Account Status</h3>
        
        {!isPremium ? (
          <Card className="border border-[#B342F2]/20 bg-gradient-to-br from-[#7928CA]/10 via-[#B342F2]/5 to-transparent rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 tracking-wide">
                  <FaCrown className="text-yellow-400 animate-pulse text-xl" />
                  Upgrade to Collector Pro
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
                  Unlock unlimited artwork purchases (Free plan limit: 3), advanced acquisition analytics, and exclusive VIP access to premium art masterclasses.
                </p>
              </div>

              <button className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#7928CA] to-[#B342F2] text-white text-xs uppercase tracking-wider font-bold hover:opacity-90 active:scale-[0.98] transition-all duration-300 shadow-[0_4px_15px_rgba(179,66,242,0.25)] shrink-0">
                Upgrade Now
              </button>
            </div>
          </Card>
        ) : (
          <Card className="border border-emerald-500/15 bg-[#111119] rounded-2xl shadow-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full w-1 bg-emerald-500" />
            <div className="p-5 sm:p-6 text-xs sm:text-sm font-medium text-emerald-400 flex items-center gap-2.5">
              <FaCrown className="text-yellow-400 text-base shrink-0" />
              <span>🎉 You are verified as a Premium Elite Collector. Enjoy absolute unlimited purchasing capabilities!</span>
            </div>
          </Card>
        )}
      </div>

    </div>
  );
}