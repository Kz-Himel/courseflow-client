import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import MissionValues from "@/components/about/MissionValues";
import TeamSection from "@/components/about/TeamSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AboutHero />
        <AboutStats />
        <MissionValues />
        <TeamSection />
      </div>
    </div>
  );
}