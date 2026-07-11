import Image from "next/image";
import HeroSection from "../components/sections/HeroSection"
import Footer from "@/components/shared/Footer";
import PopularCategories from "@/components/sections/PopularCategories";

export default function Home() {
  return (
    <>
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
      <PopularCategories />
      <Footer />
    </div>
    </>
  );
}
