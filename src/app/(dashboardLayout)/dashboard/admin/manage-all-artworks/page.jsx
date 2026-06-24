"use client";

import { useEffect, useState } from "react";
import { Card } from "@heroui/react";
import toast from "react-hot-toast";

import DashboardHeading from "@/components/DashboardHeading";
import DeleteArtworkModal from "@/components/DeleteArtworkModal";

import { getAllArtworks } from "@/lib/api/artworks/data";

export default function AdminManageAllArtworks() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArtworks = async () => {
    try {
      const data = await getAllArtworks();

      setArtworks(data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load artworks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  // Remove deleted artwork instantly from UI
  const handleDeleteSuccess = (deletedId) => {
    setArtworks((prev) =>
      prev.filter(
        (artwork) => artwork._id !== deletedId
      )
    );
  };

  return (
    <div className="space-y-6 mt-4 sm:mt-6">
      <DashboardHeading
        title="Manage All Artworks"
        description="View and manage all artworks across ArtHub"
      />

      <Card className="bg-[#12121C] border border-[#27273A]/40">

        {/* Desktop + Tablet */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-[#27273A]">
                <th className="p-4 text-left text-gray-400">
                  Artwork Title
                </th>

                <th className="p-4 text-left text-gray-400">
                  Artist Name
                </th>

                <th className="p-4 text-left text-gray-400">
                  Category
                </th>

                <th className="p-4 text-left text-gray-400">
                  Price
                </th>

                <th className="p-4 text-center text-gray-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center p-10 text-white"
                  >
                    Loading...
                  </td>
                </tr>
              ) : artworks.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center p-10 text-white"
                  >
                    No Artworks Found
                  </td>
                </tr>
              ) : (
                artworks.map((artwork) => (
                  <tr
                    key={artwork._id}
                    className="border-b border-[#27273A]/30 hover:bg-[#181824] transition"
                  >
                    <td className="p-4 text-white font-medium">
                      {artwork.title}
                    </td>

                    <td className="p-4 text-gray-300">
                      {artwork.artistName}
                    </td>

                    <td className="p-4 text-gray-300">
                      {artwork.category}
                    </td>

                    <td className="p-4 text-green-400 font-semibold">
                      ${artwork.price}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center">
                        <DeleteArtworkModal
                          id={artwork._id}
                          title={artwork.title}
                          onSuccess={() =>
                            handleDeleteSuccess(
                              artwork._id
                            )
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden p-4 space-y-4">
          {loading ? (
            <div className="text-center py-8 text-white">
              Loading...
            </div>
          ) : artworks.length === 0 ? (
            <div className="text-center py-8 text-white">
              No Artworks Found
            </div>
          ) : (
            artworks.map((artwork) => (
              <div
                key={artwork._id}
                className="rounded-2xl border border-[#27273A]/40 bg-[#181824] p-4 space-y-3"
              >
                <div>
                  <p className="text-xs text-[#8E8E9F]">
                    Artwork Title
                  </p>

                  <h3 className="text-white font-semibold">
                    {artwork.title}
                  </h3>
                </div>

                <div>
                  <p className="text-xs text-[#8E8E9F]">
                    Artist Name
                  </p>

                  <p className="text-gray-300">
                    {artwork.artistName}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#8E8E9F]">
                    Category
                  </p>

                  <p className="text-gray-300">
                    {artwork.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#8E8E9F]">
                    Price
                  </p>

                  <p className="text-green-400 font-semibold">
                    ${artwork.price}
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <DeleteArtworkModal
                    id={artwork._id}
                    title={artwork.title}
                    onSuccess={() =>
                      handleDeleteSuccess(
                        artwork._id
                      )
                    }
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}