"use client";

import DashboardHeading from "@/components/DashboardHeading";
import { useSession } from "@/lib/auth-client";
import { Card } from "@heroui/react";
import Image from "next/image";
import { FaUserCircle, FaEnvelope, FaCrown } from "react-icons/fa";

const ArtistProfilePage = () => {
  const { data: session, isPending } = useSession();

  const user = session?.user;

  if (isPending) {
    return <div className="text-white mt-10 px-6">Loading profile...</div>;
  }

  if (!user) {
    return <div className="text-red-400 mt-10 px-6">No user found</div>;
  }

  return (
    <div className="space-y-6 mt-6 px-2 sm:px-0">
      {/* Heading */}
      <DashboardHeading
        title="Artist Profile"
        description="Your personal account information"
      />

      {/* Profile Card */}
      <Card className="bg-[#12121C] border border-[#27273A]/40 p-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <Image
              src={user?.image || "https://i.ibb.co/2t0KQzX/default-user.png"}
              alt="profile"
              width={90}
              height={90}
              className="rounded-full object-cover border-2 border-purple-500"
              unoptimized
            />
          </div>

          {/* Info */}
          <div className="space-y-3 text-center sm:text-left">
            {/* Name */}
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <FaUserCircle className="text-purple-400" />
              {user?.name || "Unknown Artist"}
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 text-[#8E8E9F] text-sm">
              <FaEnvelope />
              {user?.email}
            </div>

            {/* Role */}
            <div className="flex items-center gap-2">
              <FaCrown className="text-yellow-400" />
              <span className="text-sm uppercase text-[#8E8E9F]">
                {user?.role || "artist"}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ArtistProfilePage;
