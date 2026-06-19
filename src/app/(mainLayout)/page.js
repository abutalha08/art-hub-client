import ArtCategories from "@/components/ArtCategories";
import CallToAction from "@/components/CallToAction";
import HeroBanner from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <ArtCategories></ArtCategories>
      <CallToAction></CallToAction>
    </div>
  );
}
