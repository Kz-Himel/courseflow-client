import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import MissionValues from "@/components/about/MissionValues";
import TeamSection from "@/components/about/TeamSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="max-w-6xl mx-auto">
        <AboutHero />
        <AboutStats />
        <MissionValues />
        <TeamSection />
      </div>
    </div>
  );
}