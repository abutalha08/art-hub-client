import ArtCategories from "@/components/ArtCategories";
import CallToAction from "@/components/CallToAction";
import HeroBanner from "@/components/Hero";
import TopArtists from "@/components/TopArtists";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <ArtCategories></ArtCategories>
      <TopArtists></TopArtists>
      <CallToAction></CallToAction>
    </div>
  );
}
