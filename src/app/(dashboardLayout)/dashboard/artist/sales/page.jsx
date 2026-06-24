"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getArtistSales } from "@/lib/api/purchases/data";

export default function ArtistSalesPage() {
  const { data: session } = useSession();

  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      if (!session?.user?.email) return;

      try {
        const data = await getArtistSales(
          session.user.email
        );

        setSales(data || []);
      } catch (error) {
        console.error(
          "Failed to fetch sales:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [session]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-white text-lg">
          Loading sales history...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Sales History
        </h1>

        <p className="text-slate-400 mt-2">
          View all purchased artworks and revenue details.
        </p>
      </div>

      {/* Empty State */}
      {sales.length === 0 ? (
        <div className="bg-[#111119] border border-white/10 rounded-2xl p-10 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">
            No Sales Yet
          </h3>

          <p className="text-slate-400">
            Your sales history will appear here once buyers purchase your artworks.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-white/10 bg-[#111119]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#171722] border-b border-white/10">
                    <th className="p-4 text-left text-slate-300 font-semibold">
                      Artwork Title
                    </th>

                    <th className="p-4 text-left text-slate-300 font-semibold">
                      Buyer Name
                    </th>

                    <th className="p-4 text-left text-slate-300 font-semibold">
                      Purchase Date
                    </th>

                    <th className="p-4 text-left text-slate-300 font-semibold">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {sales.map((sale) => (
                    <tr
                      key={sale._id}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition"
                    >
                      <td className="p-4 text-white font-medium">
                        {sale.title}
                      </td>

                      <td className="p-4 text-slate-300">
                        {sale.buyerName}
                      </td>

                      <td className="p-4 text-slate-400">
                        {new Date(
                          sale.purchasedAt
                        ).toLocaleString("en-BD", {
                          timeZone: "Asia/Dhaka",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>

                      <td className="p-4 font-bold text-green-400">
                        ${sale.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-4 md:hidden">
            {sales.map((sale) => (
              <div
                key={sale._id}
                className="bg-[#111119] border border-white/10 rounded-2xl p-5"
              >
                <div className="space-y-3">

                  <div>
                    <p className="text-xs uppercase text-slate-500">
                      Artwork
                    </p>

                    <p className="text-white font-semibold">
                      {sale.title}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-slate-500">
                      Buyer
                    </p>

                    <p className="text-slate-300">
                      {sale.buyerName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-slate-500">
                      Purchase Date
                    </p>

                    <p className="text-slate-400 text-sm">
                      {new Date(
                        sale.purchasedAt
                      ).toLocaleString("en-BD", {
                        timeZone: "Asia/Dhaka",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-slate-500">
                      Amount
                    </p>

                    <p className="text-green-400 font-bold text-lg">
                      ${sale.price}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}