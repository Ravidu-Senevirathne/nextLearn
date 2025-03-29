import { NavbarDemo } from "@/Components/Navbar";
import Hero from "@/Components/Hero";
import FeaturesSection from "@/Components/home/FeaturesSection";
import HowItWorks from "@/Components/home/HowItWorks";
import PopularCourses from "@/Components/home/PopularCourses";
import TestimonialsSection from "@/Components/home/TestimonialsSection";
import CallToAction from "@/Components/home/CallToAction";
import Footer from "@/Components/Footer";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-gray-900 to-black">
      <NavbarDemo />
      <Hero />

      {/* Main content sections in matching order */}
      <div className="relative z-10">
        <FeaturesSection />
        <HowItWorks />
        <PopularCourses />
        <TestimonialsSection />
        <CallToAction />
      </div>
      <Footer />
    </main>

  );
}
