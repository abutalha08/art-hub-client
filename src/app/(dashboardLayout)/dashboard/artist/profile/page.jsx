"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import { FiUser, FiMail, FiCamera, FiCheck, FiLoader, FiCheckCircle } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { fetchUserProfile, updateUserProfile } from "@/lib/api/users/actions";
import { uploadImage } from "@/utils/uploadImage"; 
import { authClient } from "@/lib/auth-client";

export default function ArtistProfilePage() {
  const router = useRouter(); 
  
  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  const currentUser = session?.user;

  const [dbUser, setDbUser] = useState(null);
  const [displayedImage, setDisplayedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); 
  const [isFetchLoading, setIsFetchLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // ডাটাবেজ থেকে লাইভ ডাটা লোড করা
  useEffect(() => {
    const loadProfileData = async () => {
      if (currentUser?.email) {
        setIsFetchLoading(true);
        const res = await fetchUserProfile(currentUser.email);
        if (res?.success && res?.data) {
          setDbUser(res.data);
          setValue("name", res.data.name);
          setDisplayedImage(res.data.image);
        }
        setIsFetchLoading(false);
      }
    };
    if (currentUser) {
      loadProfileData();
    }
  }, [currentUser, setValue]);

  // ইমেজ চেঞ্জ হ্যান্ডলার
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); 
      setDisplayedImage(URL.createObjectURL(file)); 
    }
  };

  // ফাইনাল সাবমিট হ্যান্ডলার
  const onSubmit = async (data) => {
    if (!currentUser?.email) return toast.error("Artist email not found!");
    
    setIsSubmitting(true);
    try {
      let finalImageUrl = dbUser?.image || currentUser?.image;

      // ১. ছবি আপলোড লজিক
      if (selectedFile) {
        finalImageUrl = await uploadImage(selectedFile); 
      }

      // ২. ব্যাকএন্ড এপিআই-তে রিকোয়েস্ট পাঠানো
      const response = await updateUserProfile(currentUser.email, {
        name: data.name,
        image: finalImageUrl,
      });

      if (response?.success) {
        setDisplayedImage(finalImageUrl);
        setSelectedFile(null); 
        setDbUser((prev) => ({ ...prev, name: data.name, image: finalImageUrl }));
        
        toast.success("Artist profile updated successfully!");
        
        // ১ সেকেন্ড পর পেজটি অটোমেটিক হার্ড রিফ্রেশ হবে (ক্যাশ থেকে বাঁচার জন্য)
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(response?.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("ARTIST_PROFILE_SUBMIT_ERROR:", error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSessionLoading || (currentUser && isFetchLoading)) {
    return (
      <div className="w-full min-h-screen bg-[#0C0C14] flex flex-col justify-center items-center text-white">
        <FiLoader className="animate-spin text-[#B342F2] mb-4" size={40} />
        <p className="text-sm text-[#8E8E9F] tracking-widest uppercase">Loading Artist Profile...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="w-full min-h-screen bg-[#0C0C14] flex justify-center items-center text-white">
        <p className="text-sm text-red-400">Please log in to manage your artist profile.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#0C0C14] text-white py-16 px-4 sm:px-6 lg:px-8 flex justify-center items-center relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#7928CA]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#F242C2]/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-xl bg-[#161622]/60 border border-[#27273A]/80 rounded-3xl p-6 sm:p-10 backdrop-blur-md relative z-10"
      >
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
              Artist Profile
            </h2>
            <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#27273A] text-[#A78BFA] inline-flex items-center gap-1.5">
              <FiCheckCircle size={12} className="text-yellow-400" />
              {dbUser?.role || currentUser?.role || "Artist"}
            </span>
          </div>
          <p className="text-sm text-[#8E8E9F] mt-1">
            Update your public artist identity and gallery profile avatar.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Avatar Area */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#27273A]/40">
            <div className="relative w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-[#7928CA] to-[#F242C2]">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-[#0C0C14]">
                <Image
                  src={displayedImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"}
                  alt="Artist Avatar"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-0 right-0 bg-[#B342F2] p-2 rounded-full border border-[#0C0C14] text-white shadow-md cursor-pointer hover:bg-[#8A3FD9] transition-colors z-20"
              >
                <FiCamera size={14} />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <div className="text-center sm:text-left space-y-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#8E8E9F]">
                Display Picture
              </p>
              <p className="text-xs text-[#535366]">
                Click the camera icon to set your artist profile cover.
              </p>
            </div>
          </div>

          {/* Full Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-[#8E8E9F]">
              Artist Name
            </label>
            <div className="relative flex items-center">
              <FiUser className="absolute left-4 text-[#535366]" size={18} />
              <input
                type="text"
                placeholder="Enter your professional artist name"
                className={`w-full bg-[#12121C] border ${errors.name ? 'border-red-500' : 'border-[#27273A]'} rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-[#535366] focus:outline-none focus:border-[#B342F2] transition-colors`}
                {...register("name", { required: "Artist name is required" })}
              />
            </div>
            {errors.name && (
              <span className="text-xs text-red-500 font-medium">{errors.name.message}</span>
            )}
          </div>

          {/* Email (Read Only) */}
          <div className="space-y-1.5 opacity-60">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold uppercase tracking-widest text-[#8E8E9F]">
                Registered Email
              </label>
              <span className="text-[10px] bg-[#27273A] text-[#8E8E9F] px-2 py-0.5 rounded-md">
                Verified
              </span>
            </div>
            <div className="relative flex items-center cursor-not-allowed">
              <FiMail className="absolute left-4 text-[#535366]" size={18} />
              <input
                type="email"
                disabled
                value={currentUser?.email || ""}
                className="w-full bg-[#0F0F16] border border-[#27273A]/50 rounded-xl py-3.5 pl-11 pr-4 text-sm text-[#8E8E9F] cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-[#7928CA] to-[#B342F2] hover:from-[#8A3FD9] hover:to-[#C052FF] text-white font-semibold text-sm py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-[#7928CA]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin" size={16} />
                  Saving Identity...
                </>
              ) : (
                <>
                  <FiCheck size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}