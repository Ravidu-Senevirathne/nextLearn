"use client";

import { BackgroundGradientAnimation } from "@/Components/ui/background-gradient-animation";
import { GlareCard } from "@/Components/ui/glare-card";
import { GlowingEffect } from "@/Components/ui/glowing-effect";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useState } from "react";
import { NavbarDemo } from "@/Components/Navbar";
import Footer from "@/Components/Footer";

// Help categories and FAQs
const helpCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "🚀",
  },
  {
    id: "courses",
    title: "Courses & Learning",
    icon: "📚",
  },
  {
    id: "account",
    title: "Account & Settings",
    icon: "👤",
  },
  {
    id: "payments",
    title: "Payments & Billing",
    icon: "💳",
  },
  {
    id: "technical",
    title: "Technical Issues",
    icon: "🛠️",
  },
  {
    id: "certificates",
    title: "Certificates",
    icon: "🎓",
  },
];

const faqs = [
  {
    id: 1,
    question: "How do I enroll in a course?",
    answer: "Browse our catalog, select a course, and click the 'Enroll' button. Follow the prompts to complete enrollment. Some courses are free, while others require payment.",
    category: "getting-started"
  },
  {
    id: 2,
    question: "Can I access courses on mobile devices?",
    answer: "Yes, our platform is fully responsive and works on smartphones, tablets, and computers. You can learn anytime, anywhere.",
    category: "technical"
  },
  {
    id: 3,
    question: "How do I track my progress?",
    answer: "Your progress is automatically tracked in each course. View your dashboard to see completion percentages, upcoming lessons, and achievements.",
    category: "courses"
  },
  {
    id: 4,
    question: "Can I get a refund if I'm not satisfied?",
    answer: "We offer a 30-day money-back guarantee for most courses. Please contact support with your order number to request a refund.",
    category: "payments"
  },
  {
    id: 5,
    question: "How do I reset my password?",
    answer: "Click 'Forgot Password' on the login screen. We'll email you instructions to reset your password securely.",
    category: "account"
  },
  {
    id: 6,
    question: "How do I earn a certificate?",
    answer: "Complete all required course materials and pass any assessments with the minimum score. Certificates are issued automatically upon completion.",
    category: "certificates"
  },
  {
    id: 7,
    question: "Can I download course materials for offline use?",
    answer: "Many courses offer downloadable resources. Look for download links within lesson materials. Video content typically requires an internet connection.",
    category: "courses"
  },
  {
    id: 8,
    question: "How do I update my billing information?",
    answer: "Go to Account Settings > Billing Information to update your payment methods and billing address.",
    category: "payments"
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  // Filter FAQs based on search and category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = 
      searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <NavbarDemo/>
      
      {/* Hero section */}
      <section className="relative h-[40vh] overflow-hidden pt-16 mt-40">
        <div className="absolute inset-0 z-0">
          <BackgroundGradientAnimation
            gradientBackgroundStart="rgb(10, 10, 30)"
            gradientBackgroundEnd="rgb(5, 0, 20)"
            firstColor="20, 70, 160"
            secondColor="100, 60, 180"
            thirdColor="60, 120, 160"
            pointerColor="90, 70, 170"
            size="100%"
            blendingValue="soft-light"
            containerClassName="h-full"
          />
        </div>
        <div className="relative h-full z-10 flex flex-col items-center justify-center px-4 text-center">
          <div className="bg-black/50 p-8 rounded-xl backdrop-blur-md border border-purple-900/30 shadow-xl max-w-3xl w-full">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow-lg">
              How can we help you?
            </h1>
            <div className="flex gap-2">
              <Input
                type="search"
                placeholder="Search for help topics..."
                className="bg-gray-800/70 border-gray-700 text-white text-lg py-6"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="bg-purple-700 hover:bg-purple-600 text-lg px-6">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12 bg-gradient-to-b from-black to-gray-950">
        {/* Help Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Browse Help Topics
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`p-6 rounded-lg border ${
                selectedCategory === "all"
                  ? "bg-purple-900/60 border-purple-500"
                  : "bg-gray-900/40 border-gray-800 hover:border-purple-700"
              } text-center transition-all`}
            >
              <div className="text-4xl mb-2">🔍</div>
              <h3 className="font-medium">All Topics</h3>
            </button>
            
            {helpCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-lg border ${
                  selectedCategory === category.id
                    ? "bg-purple-900/60 border-purple-500"
                    : "bg-gray-900/40 border-gray-800 hover:border-purple-700"
                } text-center transition-all`}
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-medium">{category.title}</h3>
              </button>
            ))}
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-center max-w-3xl mx-auto">
              {filteredFaqs.length === 0 
                ? "No results found. Try a different search term or category." 
                : `Showing ${filteredFaqs.length} help articles`}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFaqs.map((faq) => (
              <GlareCard key={faq.id} className="p-6 h-full">
                <h3 className="text-xl font-bold mb-3 text-white">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </GlareCard>
            ))}
          </div>
        </section>

        {/* Video Tutorials */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Video Tutorials
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Platform Overview", duration: "4:32" },
              { title: "Course Navigation Guide", duration: "6:15" },
              { title: "Managing Your Account", duration: "5:48" }
            ].map((video, i) => (
              <div key={i} className="bg-gray-900 rounded-xl overflow-hidden group hover:ring-2 hover:ring-purple-600 transition-all">
                <div className="h-48 bg-gray-800 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30"></div>
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-purple-600/80 transition-all">
                    <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-sm px-2 py-1 rounded-md">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium">{video.title}</h3>
                  <p className="text-gray-400 text-sm mt-2">Learn how to get the most out of our platform with this step-by-step tutorial.</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section className="mb-16 relative py-16">
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="p-8 rounded-xl bg-black/70 backdrop-blur-md border border-blue-900/30 shadow-lg">
              <div className="relative">
                <GlowingEffect 
                  disabled={false} 
                  glow={true} 
                  blur={3} 
                  spread={8}
                  movementDuration={1.5}
                />
                <div className="relative z-20">
                  <h2 className="text-3xl font-bold mb-6 text-center text-white text-shadow-sm">Still Need Help?</h2>
                  <p className="text-gray-100 mb-6 text-center">
                    Our support team is here to assist you. Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">Your Name</label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        className="bg-gray-800 border-gray-700 text-white w-full"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">Email Address</label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="bg-gray-800 border-gray-700 text-white w-full"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">Your Question</label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Describe your issue or question in detail..."
                        className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                      />
                    </div>
                    
                    <Button className="bg-purple-700 hover:bg-purple-600 font-medium w-full py-6">
                      Submit Support Request
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Help Resources */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Additional Resources
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "User Guides", icon: "📖", description: "Comprehensive documentation on all platform features" },
              { title: "Community Forum", icon: "👥", description: "Connect with other learners and share knowledge" },
              { title: "System Status", icon: "🟢", description: "Check current platform performance and uptime" },
              { title: "Knowledge Base", icon: "🧠", description: "Searchable database of how-to articles and solutions" }
            ].map((resource, i) => (
              <div key={i} className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-blue-700 transition-colors text-center">
                <div className="text-4xl mb-4">{resource.icon}</div>
                <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                <p className="text-gray-400 mb-4">{resource.description}</p>
                <Button variant="outline" className="w-full">
                  Access
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer/>
    </div>
  );
}
