import Image from "next/image";
import HeroSection from "../components/sections/HeroSection"
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <>
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
      <Footer />
    </div>
    </>
  );
}
