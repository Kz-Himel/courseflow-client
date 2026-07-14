import Image from "next/image";
import HeroSection from "../components/sections/HeroSection"
import PopularCategories from "@/components/sections/PopularCategories";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import InstructorsSection from "@/components/sections/InstructorsSection";
import FAQSection from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <>
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
      <PopularCategories />
      <TestimonialsSection />
      <InstructorsSection />
      <FAQSection />
    </div>
    </>
  );
}
