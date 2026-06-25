"use client";

import React, { useEffect, useState } from "react";
import { Card, Spinner } from "@heroui/react";
import DashboardHeading from "@/components/DashboardHeading";
import { getAllTransactions } from "@/lib/api/admin/data";

export default function ViewTransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const data = await getAllTransactions();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally { // 👈 এখানে 'finally' বানানটি ঠিক করা হয়েছে
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div className="w-full space-y-6 mt-4 px-2 sm:px-4 md:px-0">
      <DashboardHeading
        title="View All Transactions"
        description="Monitor all purchase and subscription transactions"
      />

      {loading ? (
        <div className="flex justify-center items-center py-16 w-full">
          <Spinner label="Loading..." />
        </div>
      ) : (
        <>
          {/* MOBILE & TABLET CARD VIEW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden w-full">
            {transactions.map((transaction) => (
              <Card
                key={transaction._id}
                className="bg-[#12121C] border border-[#27273A]/40 p-4 w-full rounded-2xl shadow-sm"
              >
                <div className="flex flex-col space-y-2.5">
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-white font-bold text-sm tracking-wide">
                      {transaction.transactionType}
                    </p>
                    <span className="text-xs text-gray-500 font-mono bg-[#161622] px-2 py-0.5 rounded border border-[#27273A]/30">
                      #{String(transaction._id).slice(-8)}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs sm:text-sm">
                    <p className="text-gray-400 truncate">
                      <span className="text-gray-500 font-medium">User:</span>{" "}
                      {transaction.userEmail}
                    </p>
                    <p className="text-gray-400 truncate">
                      <span className="text-gray-500 font-medium">Artist:</span>{" "}
                      {transaction.artistEmail}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-[#27273A]/30">
                    <p className="text-green-400 font-bold text-base">
                      ${transaction.amount}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* DESKTOP & WIDE SCREEN TABLE VIEW */}
          <Card className="hidden md:block bg-[#12121C] border border-[#27273A]/40 w-full overflow-hidden rounded-2xl">
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[850px] table-auto border-collapse">
                <thead>
                  <tr className="border-b border-[#27273A] bg-[#0E0E16]/50">
                    <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Transaction ID
                    </th>
                    <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Type
                    </th>
                    <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      User Email
                    </th>
                    <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Artist Email
                    </th>
                    <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Amount
                    </th>
                    <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27273A]/30">
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction._id}
                      className="hover:bg-[#161622]/30 transition-colors"
                    >
                      <td className="p-4 text-sm font-mono text-gray-400">
                        {String(transaction._id).slice(-8)}
                      </td>
                      <td className="p-4 text-sm font-medium text-purple-400">
                        {transaction.transactionType}
                      </td>
                      <td className="p-4 text-sm text-gray-300 max-w-[200px] truncate">
                        {transaction.userEmail}
                      </td>
                      <td className="p-4 text-sm text-gray-300 max-w-[200px] truncate">
                        {transaction.artistEmail}
                      </td>
                      <td className="p-4 text-sm text-green-400 font-bold">
                        ${transaction.amount}
                      </td>
                      <td className="p-4 text-sm text-gray-400">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}