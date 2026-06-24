"use client";

import { FiLock, FiArrowLeft, FiHome } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6 text-white selection:bg-purple-500/30 font-sans">
      
      {/* OUTER RECTANGLE WITH GLOSSY GRADIENT BORDER (STATIC) */}
      <div className="relative w-full max-w-md rounded-3xl p-[1px] bg-gradient-to-b from-red-500/30 via-neutral-800 to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
        
        {/* MAIN EMBEDDED GLASS CARD */}
        <div className="p-8 md:p-10 bg-[#0e0e16]/90 backdrop-blur-xl rounded-[23px] border-none text-center space-y-6 flex flex-col items-center">
          
          {/* STATIC RED/PURPLE LOCK ICON */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-red-500/10 blur-2xl rounded-full scale-150"></div>
            <div className="relative p-5 bg-red-500/10 rounded-2xl border border-red-500/20 text-red-400 text-4xl shadow-[0_0_20px_rgba(239,68,68,0.1)]">
              <FiLock />
            </div>
          </div>

          {/* ERROR STATUS & HEADLINE */}
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-red-400 uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              Error 401
            </span>
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-neutral-200 to-red-400 bg-clip-text text-transparent pt-2">
              Access Denied
            </h1>
          </div>

          {/* SEPARATOR LINE */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent"></div>

          {/* EXPLANATION DESCRIPTION */}
          <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
            You do not have permission to view this gallery page. Please log in with an authorized account or return to safety.
          </p>

          {/* TWO DUAL BUTTONS */}
          <div className="w-full grid grid-cols-2 gap-4 pt-4">
            
            {/* GO BACK BUTTON */}
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-800 text-neutral-300 font-semibold py-3.5 px-4 rounded-xl text-sm cursor-pointer"
            >
              <FiArrowLeft />
              Go Back
            </button>

            {/* HOME BUTTON */}
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_4px_25px_rgba(168,85,247,0.15)] text-sm"
            >
              <FiHome />
              Home
            </Link>

          </div>

        </div>
      </div>

    </div>
  );
}