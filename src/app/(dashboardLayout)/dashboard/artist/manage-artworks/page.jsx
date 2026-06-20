"use client";

import React, { useEffect, useState } from "react";
import { Card, Chip, Spinner, Button, Tooltip } from "@heroui/react";
import DashboardHeading from "@/components/DashboardHeading";
import { useSession } from "@/lib/auth-client";
import { myArtworks } from "@/lib/api/artworks/data";

import { FiEdit3 } from "react-icons/fi";
import DeleteArtworkModal from "@/components/DeleteArtworkModal";
import EditArtworkModal from "@/components/EditArtworkModal";

export default function ManageArtworkTable() {
  const { data: session } = useSession();

  const [artworks, setArtworks] = useState([]);
  const [loadingArtworks, setLoadingArtworks] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const handleEditClick = (artwork) => {
    setSelectedArtwork(artwork);
    setIsEditOpen(true);
  };

  const loadArtworks = async () => {
    if (!session?.user?.email) return;

    try {
      setLoadingArtworks(true);
      const artworkData = await myArtworks(session.user.email);
      setArtworks(Array.isArray(artworkData) ? artworkData : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingArtworks(false);
    }
  };

  useEffect(() => {
    loadArtworks();
  }, [session]);

  return (
    <div className="space-y-6 mt-6 px-2 sm:px-4 md:px-0">
      <DashboardHeading
        title="Manage Artworks"
        description="View, update and manage all your published artworks"
      />

      <Card className="bg-[#0C0C14]/60 border border-[#27273A]/40 p-4 rounded-2xl">
        {loadingArtworks ? (
          <div className="flex justify-center py-10">
            <Spinner color="secondary" label="Loading..." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-b border-[#27273A]/50">
                  <th className="p-4 text-xs text-[#8E8E9F]">Artwork</th>
                  <th className="p-4 text-xs text-[#8E8E9F]">Category</th>
                  <th className="p-4 text-xs text-[#8E8E9F]">Price</th>
                  <th className="p-4 text-xs text-[#8E8E9F]">Status</th>
                  <th className="p-4 text-xs text-[#8E8E9F] text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {artworks.map((artwork) => (
                  <tr
                    key={artwork._id}
                    className="border-b border-[#27273A]/20 hover:bg-[#12121C]/40"
                  >
                    <td className="p-4 text-white">
                      <div>
                        <h4 className="font-semibold">
                          {artwork.title}
                        </h4>
                        <p className="text-xs text-[#8E8E9F]">
                          {artwork.description?.slice(0, 60)}
                        </p>
                      </div>
                    </td>

                    <td className="p-4 text-[#D1D1DB]">
                      {artwork.category}
                    </td>

                    <td className="p-4 text-[#4ADE80] font-semibold">
                      ${artwork.price}
                    </td>

                    <td className="p-4">
                      <Chip
                        size="sm"
                        className="bg-[#B342F2]/15 text-[#D28CFF]"
                      >
                        {artwork.isApproved ? "Published" : "Pending"}
                      </Chip>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        
                        {/* EDIT */}
                        <Tooltip content="Edit">
                          <Button
                            isIconOnly
                            size="sm"
                            onPress={() => handleEditClick(artwork)}
                          >
                            <FiEdit3 />
                          </Button>
                        </Tooltip>

                        {/* DELETE (SELF HANDLED MODAL) */}
                        <DeleteArtworkModal
                          id={artwork._id}
                          title={artwork.title}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* EDIT MODAL */}
      {isEditOpen && (
        <EditArtworkModal
          isModalOpen={isEditOpen}
          setIsModalOpen={setIsEditOpen}
          editingArtwork={selectedArtwork}
        />
      )}
    </div>
  );
}