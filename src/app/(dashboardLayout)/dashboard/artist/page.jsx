"use client";

import DashboardHeading from "@/components/DashboardHeading";
import { Card } from "@heroui/react";
import {
  FaPalette,
  FaHeart,
  FaImage,
  FaDollarSign,
  FaCrown,
} from "react-icons/fa";

const ArtistOverviewPage = () => {
  const stats = {
    totalArtworks: 24,
    totalLikes: 1200,
    totalSales: 85,
    totalRevenue: 42000,
  };

  const isPremium = false;

  return (
    <div className="space-y-6 mt-4 sm:mt-6">

      {/* Heading */}
      <DashboardHeading
        title="Artist Overview"
        description="Track your artworks, engagement, and earnings in real time"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

        <Card className="border border-[#27273A]/40 bg-[#12121C]" radius="lg">
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#8E8E9F] uppercase tracking-wider">
                Total Artworks
              </p>
              <h2 className="text-2xl font-bold text-white">
                {stats.totalArtworks}
              </h2>
            </div>
            <FaPalette className="text-purple-400 text-2xl" />
          </div>
        </Card>

        <Card className="border border-[#27273A]/40 bg-[#12121C]" radius="lg">
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#8E8E9F] uppercase tracking-wider">
                Total Likes
              </p>
              <h2 className="text-2xl font-bold text-white">
                {stats.totalLikes}
              </h2>
            </div>
            <FaHeart className="text-pink-400 text-2xl" />
          </div>
        </Card>

        <Card className="border border-[#27273A]/40 bg-[#12121C]" radius="lg">
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#8E8E9F] uppercase tracking-wider">
                Total Sales
              </p>
              <h2 className="text-2xl font-bold text-white">
                {stats.totalSales}
              </h2>
            </div>
            <FaImage className="text-indigo-400 text-2xl" />
          </div>
        </Card>

        <Card className="border border-[#27273A]/40 bg-[#12121C]" radius="lg">
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#8E8E9F] uppercase tracking-wider">
                Revenue
              </p>
              <h2 className="text-2xl font-bold text-white">
                ${stats.totalRevenue}
              </h2>
            </div>
            <FaDollarSign className="text-green-400 text-2xl" />
          </div>
        </Card>

      </div>

      {/* Premium Section */}
      {!isPremium ? (
        <Card className="border border-[#B342F2]/30 bg-gradient-to-r from-[#7928CA]/10 via-[#B342F2]/5 to-transparent">
          <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <FaCrown className="text-yellow-400" />
                Upgrade to Artist Pro
              </h3>
              <p className="text-xs sm:text-sm text-[#8E8E9F] mt-1 max-w-xl">
                Unlock unlimited uploads, analytics and premium exposure for your artworks.
              </p>
            </div>

            <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#7928CA] to-[#B342F2] text-white text-sm font-semibold hover:scale-105 transition">
              Upgrade Now
            </button>
          </div>
        </Card>
      ) : (
        <Card className="border border-green-500/20 bg-[#12121C]">
          <div className="p-6 text-white">
            🎉 You are a premium artist. Enjoy unlimited features!
          </div>
        </Card>
      )}

    </div>
  );
};

export default ArtistOverviewPage;