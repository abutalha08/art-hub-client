"use client";

import DashboardHeading from "@/components/DashboardHeading";
import { getArtistStats } from "@/lib/api/artworks/actions";
import { useSession } from "@/lib/auth-client";
import { Card } from "@heroui/react";
import { useEffect, useState } from "react";
import {
  FaPalette,
  FaHeart,
  FaDollarSign,
  FaCrown,
} from "react-icons/fa";

const ArtistOverviewPage = () => {
  const { data: session } = useSession();

  const [stats, setStats] = useState({
    totalArtworks: 0,
    totalArtworkValue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!session?.user?.email) return;

      try {
        const data = await getArtistStats(
          session.user.email
        );
        console.log("Artist Stats:", data);

        setStats({
          totalArtworks: data.totalArtworks || 0,
          totalArtworkValue: data.totalArtworkValue || 0,
        });
      } catch (error) {
        console.error("Failed to fetch artist stats:", error);
      }
    };

    fetchStats();
  }, [session]);

 

  return (
    <div className="space-y-6 mt-4 sm:mt-6">
      {/* Heading */}
      <DashboardHeading
        title="Artist Overview"
        description="Track your artworks, engagement, and earnings in real time"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

        {/* Total Artworks */}
        <Card
          className="border border-[#27273A]/40 bg-[#12121C]"
          radius="lg"
        >
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

        {/* Artwork Value */}
        <Card
          className="border border-[#27273A]/40 bg-[#12121C]"
          radius="lg"
        >
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#8E8E9F] uppercase tracking-wider">
                Artwork Value
              </p>

              <h2 className="text-2xl font-bold text-white">
                ${stats.totalArtworkValue}
              </h2>
            </div>

            <FaDollarSign className="text-green-400 text-2xl" />
          </div>
        </Card>

        {/* Placeholder Likes */}
        

        {/* Average Price */}
        <Card
          className="border border-[#27273A]/40 bg-[#12121C]"
          radius="lg"
        >
          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#8E8E9F] uppercase tracking-wider">
                Average Price
              </p>

              <h2 className="text-2xl font-bold text-white">
                {stats.totalArtworks > 0
                  ? `$${Math.round(
                      stats.totalArtworkValue /
                        stats.totalArtworks
                    )}`
                  : "$0"}
              </h2>
            </div>

            <FaDollarSign className="text-yellow-400 text-2xl" />
          </div>
        </Card>

      </div>

      
        
      
    </div>
  );
};

export default ArtistOverviewPage;