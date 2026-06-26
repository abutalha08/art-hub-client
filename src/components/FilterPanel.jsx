"use client";

import {
  Card,
  Input,
  Button,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectIndicator,
  SelectPopover,
  ListBox,
  ListBoxItem,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FaSearch, FaSlidersH, FaUndoAlt, FaDollarSign } from "react-icons/fa";

const CATEGORIES = [
  "All Categories",
  "Digital Art",
  "Painting",
  "Illustration",
  "3D Art",
  "Photography",
  "Abstract",
  "Other",
];

export default function FilterPanel() {

  const [search, setSearch] = useState("");
const [category, setCategory] = useState("");
const [sort, setSort] = useState("");

const router = useRouter();

  console.log(search, category);

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (search) {
      params.set("search", search);
    }
    if (category) {
      params.set("category", category);
    }
    if (sort) {
    params.set("sort", sort);
  }

  params.set("page", "1");
  
    router.push(`/artworks?${params.toString()}`);
  };
  const handleReset = () => {
    setSearch("");
    setCategory("");
    setSort("");

    router.push("/artworks")
  }

  return (
    <Card
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border border-[#27273A]/50
        bg-[#07070F]/70
        backdrop-blur-2xl
        p-5
        md:p-6
        lg:p-7
        shadow-[0_24px_60px_rgba(0,0,0,0.8)]
      "
    >
      {/* PREMIUM SOFT GLOW BACKGROUNDS */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#B342F2]/8 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#7928CA]/8 blur-[90px] rounded-full pointer-events-none" />

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-5
          items-end
          relative
          z-10
        "
      >
        {/* 🔍 SEARCH ARTWORK */}
        <div className="flex flex-col gap-2.5 w-full">
          <Label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#8E8E9F]/80 pl-1">
            Search Artwork
          </Label>
          <Input

          value={search}
            onChange={e => setSearch(e.target.value)}
            id="search-title"
            placeholder="Search by title..."
            startContent={
              <FaSearch className="text-[#A78BFA] text-xs opacity-80 group-focus-within:opacity-100 transition-opacity" />
            }
            classNames={{
              inputWrapper:
                "bg-[#0D0D16] h-11 border border-[#27273A]/60 rounded-xl hover:border-[#B342F2]/40 focus-within:border-[#B342F2] focus-within:shadow-[0_0_15px_rgba(179,66,242,0.15)] transition-all duration-300",
              input:
                "text-white placeholder:text-[#52526B] text-sm font-medium",
            }}
          />
        </div>

        {/* 🎨 CATEGORY SELECT */}
        <div className="flex flex-col gap-2.5 w-full">
          <Label htmlFor="filter-category" className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#8E8E9F]/80 pl-1">
            Category
          </Label>
          
          <div className="relative group">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-12 bg-slate-900/60 border border-white/10 rounded-xl px-3 text-white text-sm outline-none focus:border-blue-500"
            >
              <option value="">All Categories</option>

              {CATEGORIES.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className="bg-slate-900 text-white"
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* sorting */}
        <div className="flex flex-col gap-2.5 w-full">
          <Label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#8E8E9F]/80 pl-1">
    Sort By
  </Label>

  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    className="w-full h-12 bg-slate-900/60 border border-white/10 rounded-xl px-3 text-white text-sm outline-none focus:border-blue-500"
  >
    <option value="">Newest</option>
    <option value="price-low-high">
      Price: Low → High
    </option>
    <option value="price-high-low">
      Price: High → Low
    </option>
  </select>
        </div>

        {/* ⚡ CONTROL BUTTONS */}
        <div className="flex gap-3 w-full">
          {/* APPLY BUTTON */}
          <Button
          onClick={handleApplyFilters}
            className="
    flex-1
    h-11
    rounded-xl
    font-bold
    text-xs
    uppercase
    tracking-wider
    text-white
    bg-gradient-to-r
    from-[#4F46E5]   /* Deep Indigo */
    via-[#7C3AED]    /* Royal Violet */
    to-[#6D28D9]     /* Dark Purple */
    shadow-[0_4px_20px_rgba(124,58,237,0.2)]
    hover:shadow-[0_4px_25px_rgba(124,58,237,0.35)]
    hover:opacity-95
    active:scale-[0.98]
    transition-all
    duration-300
  "
            startContent={
              <FaSlidersH size={12} className="mr-0.5 text-[#C4B5FD]" />
            }
          >
            Apply
          </Button>

          {/* RESET BUTTON */}
          <Button
          onClick={handleReset}
            isIconOnly
            variant="light"
            title="Reset Filters"
            className="
              h-11
              w-11
              min-w-11
              rounded-xl
              text-[#8E8E9F]
              hover:text-white
              bg-[#0D0D16]
              hover:bg-[#121222]
              border border-[#27273A]/60
              hover:border-[#8E8E9F]/30
              active:scale-[0.95]
              transition-all
              duration-300
            "
          >
            <FaUndoAlt size={12} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
