import ArtCategories from "@/components/ArtCategories";
import CallToAction from "@/components/CallToAction";
import FeaturedArtworks from "@/components/FeaturedArtworks";
import HeroBanner from "@/components/Hero";
import TopArtists from "@/components/TopArtists";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <FeaturedArtworks></FeaturedArtworks>
      <ArtCategories></ArtCategories>
      <TopArtists></TopArtists>
      <CallToAction></CallToAction>
    </div>
  );
}
