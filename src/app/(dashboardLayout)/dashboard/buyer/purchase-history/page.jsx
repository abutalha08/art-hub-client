"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getPurchasedArtworks } from "@/lib/api/purchases/data";

export default function BuyerPurchaseHistory() {
  const { data: session } = useSession();

  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.email) return;

      const result = await getPurchasedArtworks(session.user.email);

      setArtworks(result);
      setLoading(false);
    };

    fetchData();
  }, [session]);

  if (loading) {
    return <div className="text-white p-5">Loading...</div>;
  }

  return (
    <div className="p-5 text-white">
      <h2 className="text-2xl font-bold mb-6">Bought Artworks</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-white/10">
          <thead>
            <tr className="bg-[#171722]">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Artist</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Purchase Date</th>
            </tr>
          </thead>

          <tbody>
            {artworks.map((art) => (
              <tr key={art._id} className="border-t border-white/10">
                <td className="p-3">{art.title}</td>
                <td className="p-3">{art.artistName}</td>
                <td className="p-3">{art.category}</td>
                <td className="p-3">${art.price}</td>
                <td className="p-3">
                  {new Date(art.purchasedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
