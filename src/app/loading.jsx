// "use client";

import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">

        {/* Brand Spinner */}
        <Spinner
          size="lg"
          color="secondary"
        />

        {/* Brand Text */}
        <div className="text-center">
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#7928CA] via-[#B342F2] to-[#F242C2] bg-clip-text text-transparent">
            ArtHub
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Loading...
          </p>
        </div>

      </div>
    </div>
  );
}