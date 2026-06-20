"use client";

import React, { useEffect, useState } from "react";
import { Card, Chip, Spinner } from "@heroui/react";
import DashboardHeading from "@/components/DashboardHeading";
import { useSession } from "@/lib/auth-client";
import { myArtworks } from "@/lib/api/artworks/data";

export default function ManageArtworkTable() {
  const { data: session } = useSession();

  const [artworks, setArtworks] = useState([]);
  const [loadingArtworks, setLoadingArtworks] = useState(false);

  useEffect(() => {
    if (!session?.user?.email) return;

    const loadArtworks = async () => {
      try {
        setLoadingArtworks(true);

        const artworkData = await myArtworks(session.user.email);

        setArtworks(Array.isArray(artworkData) ? artworkData : []);
      } catch (error) {
        console.error("Error loading artworks:", error);
      } finally {
        setLoadingArtworks(false);
      }
    };

    loadArtworks();
  }, [session]);

  return (
    <div className="space-y-6 mt-6 px-2 sm:px-4 md:px-0">
      <DashboardHeading
        title="Manage Artworks"
        description="View, update and manage all your published artworks from one place"
      />

      <Card className="bg-[#0C0C14]/60 border border-[#27273A]/40 backdrop-blur-xl shadow-2xl rounded-2xl p-2 sm:p-4 overflow-hidden">
        {loadingArtworks ? (
          <div className="flex justify-center py-10">
            <Spinner color="secondary" label="Loading artworks..." />
          </div>
        ) : (
          /* overflow-x-auto নিশ্চিত করে মোবাইলে টেবিলটি ভেঙে যাবে না */
          <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-[#27273A]">
            {/* min-w-max ব্যবহার করায় সব স্ক্রিনেই কলাম স্পেসিং সুন্দর থাকবে */}
            <table className="w-full text-left min-w-max border-collapse">
              <thead>
                <tr className="border-b border-[#27273A]/50">
                  {/* থিম ও রেসপন্সিভ প্যাডিং অ্যাডজাস্টমেন্ট */}
                  <th className="py-4 px-4 sm:px-6 text-[#8E8E9F] text-xs uppercase font-bold tracking-wider">
                    Artwork
                  </th>

                  <th className="py-4 px-4 sm:px-6 text-[#8E8E9F] text-xs uppercase font-bold tracking-wider">
                    Category
                  </th>

                  <th className="py-4 px-4 sm:px-6 text-[#8E8E9F] text-xs uppercase font-bold tracking-wider">
                    Uploaded
                  </th>

                  <th className="py-4 px-4 sm:px-6 text-[#8E8E9F] text-xs uppercase font-bold tracking-wider">
                    Price
                  </th>

                  <th className="py-4 px-4 sm:px-6 text-[#8E8E9F] text-xs uppercase font-bold tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {artworks.length > 0 ? (
                  artworks.map((artwork) => (
                    <tr
                      key={artwork._id}
                      className="border-b border-[#27273A]/20 hover:bg-[#12121C]/40 transition"
                    >
                      {/* টাইটেল এবং ডেসক্রিপশন রেসপন্সিভ উইডথ ও ট্রাঙ্কেট সেটআপ */}
                      <td className="py-4 sm:py-5 px-4 sm:px-6 max-w-[200px] sm:max-w-[300px]">
                        <div>
                          <h4 className="font-semibold text-sm sm:text-base text-white truncate">
                            {artwork.title}
                          </h4>

                          <p className="text-xs text-[#8E8E9F] mt-1 whitespace-normal">
                            {artwork.description?.length > 50
                              ? `${artwork.description.substring(0, 50)}...`
                              : artwork.description}
                          </p>
                        </div>
                      </td>

                      <td className="py-4 sm:py-5 px-4 sm:px-6 text-sm text-[#D1D1DB]">
                        {artwork.category}
                      </td>

                      <td className="py-4 sm:py-5 px-4 sm:px-6 text-sm text-[#D1D1DB]">
                        {artwork.createdAt
                          ? new Date(artwork.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          : "N/A"}
                      </td>

                      <td className="py-4 sm:py-5 px-4 sm:px-6 text-sm sm:text-base font-semibold text-[#4ADE80]">
                        ${artwork.price}
                      </td>

                      <td className="py-4 sm:py-5 px-4 sm:px-6">
                        <Chip
                          size="sm"
                          className="bg-[#B342F2]/15 text-[#D28CFF] border border-[#B342F2]/30 font-medium"
                        >
                          {artwork.isApproved ? "Published" : "Pending"}
                        </Chip>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5} // কমেন্টেড কলাম বাদ দিয়ে এখন অ্যাকচুয়াল কলাম ৫টি, তাই ৫ দেওয়া হলো
                      className="text-center py-10 text-[#8E8E9F] text-sm font-medium"
                    >
                      No artworks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
