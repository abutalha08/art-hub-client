"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
      <div className="max-w-xl mx-auto text-center">

        {/* Illustration */}
        <div className="mb-8">
          <h1 className="text-[120px] md:text-[180px] font-black bg-gradient-to-r from-[#B342F2] via-[#F242C2] to-[#7928CA] bg-clip-text text-transparent leading-none">
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Page Not Found
        </h2>

        <p className="text-slate-400 text-sm md:text-base mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        {/* Home Button */}
        <Link href="/">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#7928CA] via-[#B342F2] to-[#F242C2] text-white font-semibold"
            startContent={<FaHome />}
          >
            Back To Home
          </Button>
        </Link>

      </div>
    </div>
  );
}