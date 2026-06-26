"use client";

import { Button } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function PaginationControls({ currentPage, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    
    router.push(`/artworks?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-4 pt-4">
      {/* PREVIOUS BUTTON */}
      <Button
        isIconOnly
        isDisabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="bg-[#0D0D16] border border-[#27273A]/60 text-[#8E8E9F] hover:text-white rounded-xl h-10 w-10 transition-all duration-300"
      >
        <FaChevronLeft size={12} />
      </Button>

      {/* PAGE INDICATOR */}
      <div className="text-sm font-medium text-[#8E8E9F]">
        Page <span className="text-white font-bold">{currentPage}</span> of{" "}
        <span className="text-white font-bold">{totalPages}</span>
      </div>

      {/* NEXT BUTTON */}
      <Button
        isIconOnly
        isDisabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="bg-[#0D0D16] border border-[#27273A]/60 text-[#8E8E9F] hover:text-white rounded-xl h-10 w-10 transition-all duration-300"
      >
        <FaChevronRight size={12} />
      </Button>
    </div>
  );
}