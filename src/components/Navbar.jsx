"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { FiMenu, FiX, FiGrid, FiUser, FiLogOut } from "react-icons/fi";
import { IoColorPaletteSharp } from "react-icons/io5";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Browse Artworks", href: "/artworks" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownRef = useRef(null);

  const mockUser = {
    name: "Jane Doe",
    email: "jane@example.com",
    role: "artist",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDropdownOpen(false);
    setMobileOpen(false);
  };

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#27273A]/60 bg-[#0C0C14]/90 backdrop-blur-xl py-3.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7928CA] to-[#B342F2] flex items-center justify-center">
            <IoColorPaletteSharp className="text-white text-xl" />
          </div>
          <span className="text-2xl font-bold text-white">
            Art<span className="text-[#B342F2]">Hub</span>
          </span>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden lg:flex items-center gap-2 bg-[#0C0C14] p-1 rounded-2xl">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition ${
                  active ? "text-white" : "text-[#8E8E9F] hover:text-white"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-xl bg-[#201633] border border-[#432371]/60"
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}

          <Link
            href="/dashboard"
            className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition ${
              pathname.startsWith("/dashboard")
                ? "text-white"
                : "text-[#8E8E9F] hover:text-white"
            }`}
          >
            {pathname.startsWith("/dashboard") && (
              <motion.span
                layoutId="activeNavPill"
                className="absolute inset-0 rounded-xl bg-[#201633] border border-[#432371]/60"
              />
            )}
            <span className="relative z-10">Dashboard</span>
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex items-center gap-4">

          {!isLoggedIn ? (
            <>
              <Link href={"/login"}>
              <button className="text-sm text-gray-300 cursor-pointer">Login</button>
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>

              {/* Avatar */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center"
              >
                <Image
                  src={mockUser.image}
                  alt="avatar"
                  width={38}
                  height={38}
                  className="rounded-full border-2 border-[#B342F2]"
                />
              </button>

              {/* DROPDOWN */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-3 w-56 bg-[#161622] border border-[#27273A] rounded-xl p-2"
                  >
                    <div className="px-3 py-2 border-b border-[#27273A]">
                      <p className="text-xs text-[#B342F2] uppercase">
                        {mockUser.role}
                      </p>
                      <p className="text-white font-bold truncate">
                        {mockUser.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {mockUser.email}
                      </p>
                    </div>

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-3 py-2 hover:bg-[#1E1E30] rounded-lg"
                    >
                      <FiGrid /> Dashboard
                    </Link>

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-3 py-2 hover:bg-[#1E1E30] rounded-lg"
                    >
                      <FiUser /> Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-pink-400 hover:bg-pink-500/10 rounded-lg"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* MOBILE MENU (FIXED) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden px-4 py-4 flex flex-col gap-2 border-t border-[#27273A] bg-[#0C0C14]"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive(link.href)
                    ? "bg-[#201633] text-white border border-[#432371]/60"
                    : "text-[#8E8E9F] hover:text-white hover:bg-[#161622]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition ${
                pathname.startsWith("/dashboard")
                  ? "bg-[#201633] text-white border border-[#432371]/60"
                  : "text-[#8E8E9F] hover:text-white hover:bg-[#161622]"
              }`}
            >
              Dashboard
            </Link>

            <div className="mt-2 pt-3 border-t border-[#27273A] flex flex-col gap-2">

              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-[#F242C2] hover:bg-[#F242C2]/10 transition text-left"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link href={"/login"}>
                  <button className="px-4 py-3 rounded-xl text-sm font-medium text-[#8E8E9F] hover:text-white hover:bg-[#161622] transition text-left">
                    Login
                  </button>
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-[#8E32D9] via-[#B342F2] to-[#E032C4] text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}