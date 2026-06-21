"use client";

import { Card, Button } from "@heroui/react";
import { FiCheckCircle, FiShoppingBag } from "react-icons/fi";

export default function BuyNowWidget({
  price = 49.99,
  availableStock = 1, // ডিফল্ট হিসেবে ১টি কপি রাখা হলো
}) {
  const isSoldOut = availableStock <= 0;

  return (
    <Card className="bg-[#111119] border border-white/[0.06] p-6 rounded-2xl shadow-xl relative overflow-hidden w-full sticky top-24">
      {/* Background subtle purple glow effect */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-violet-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="space-y-6 relative z-10">

        {/* TITLE */}
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Acquire Artwork
        </h3>

        {/* PRICE SUMMARY */}
        <div className="space-y-3.5 bg-[#0A0A0F]/60 border border-white/[0.04] p-4 rounded-xl">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Total Valuation</span>
            <span className="text-[#D946EF] font-black text-xl tracking-tight">
              {price === 0 ? "Free" : `$${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <Button
          isDisabled={isSoldOut}
          className={`w-full font-bold h-12 uppercase tracking-wider text-xs transition-all duration-300 ${
            isSoldOut
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-[0_4px_20px_rgba(124,58,237,0.25)] hover:shadow-[0_4px_25px_rgba(124,58,237,0.4)] active:scale-[0.98]"
          }`}
          radius="xl"
          startContent={!isSoldOut && <FiShoppingBag size={14} className="mr-0.5" />}
        >
          {isSoldOut ? "Artwork Sold Out" : "Buy Now"}
        </Button>

        {/* TRUST LINE */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 text-center justify-center pt-1 font-medium">
          <FiCheckCircle className="text-emerald-500 shrink-0" size={13} />
          <span>Instant digital delivery • Verified artist collection</span>
        </div>

      </div>
    </Card>
  );
}