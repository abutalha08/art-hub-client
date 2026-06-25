"use client";

import { useEffect, useState } from "react";
import { Card, Spinner } from "@heroui/react";
import DashboardHeading from "@/components/DashboardHeading";
import { getAdminAnalytics } from "@/lib/api/admin/data";

export default function AdminAnalyticsOverviewPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data =
          await getAdminAnalytics();

        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner
          color="secondary"
          label="Loading Analytics..."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-4">
      <DashboardHeading
        title="Analytics Overview"
        description="Platform statistics and revenue summary"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* Total Users */}
        <Card className="bg-[#12121C] border border-[#27273A]/40 p-6">
          <p className="text-sm text-gray-400">
            Total Users
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {stats?.totalUsers || 0}
          </h2>
        </Card>

        {/* Total Artists */}
        <Card className="bg-[#12121C] border border-[#27273A]/40 p-6">
          <p className="text-sm text-gray-400">
            Total Artists
          </p>

          <h2 className="text-3xl font-bold text-purple-400 mt-2">
            {stats?.totalArtists || 0}
          </h2>
        </Card>

        {/* Artworks Sold */}
        <Card className="bg-[#12121C] border border-[#27273A]/40 p-6">
          <p className="text-sm text-gray-400">
            Total Artworks Sold
          </p>

          <h2 className="text-3xl font-bold text-green-400 mt-2">
            {stats?.totalArtworksSold || 0}
          </h2>
        </Card>

        {/* Revenue */}
        <Card className="bg-[#12121C] border border-[#27273A]/40 p-6">
          <p className="text-sm text-gray-400">
            Total Revenue
          </p>

          <h2 className="text-3xl font-bold text-pink-400 mt-2">
            ${stats?.totalRevenue || 0}
          </h2>
        </Card>

      </div>
    </div>
  );
}