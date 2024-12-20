"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/legacy/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function WorkshopAccordion() {
  const [currentImage, setCurrentImage] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);
  const loadMoreRef = useRef(null);

  const images = [
    "/sf.jpg",
    "/mission.jpg",
    "/mad.jpg",
  ];

  const accordionItems = [
    { title: "Introduction to AI ", content: "Learn the basics of Artificial Intelligence" },
    { title: "What is AGI (Artificial General Intelligence)?", content: "Discover the future of AI beyond narrow applications—Artificial General Intelligence—and the ethical implications of its development." },
    { title: "ChatGPT: Revolutionizing Communication", content: "Explore how ChatGPT is transforming customer service, content creation, and automated assistance." },
    { title: "Exploring AI Models: Gemini, Claude etc.", content: "Learn the differences between leading AI models and how each one is specialized for different tasks." },
    { title: "Suno Music: Create Your Own Song with AI", content: "Get hands-on with Suno Music, an AI tool that helps you compose original music in minutes." },
    { title: "AI-Generated Movies: The Future of Filmmaking", content: "Dive into the world of AI-driven content creation and learn how movies can be generated using AI." },
    { title: "AI in Commercial Video Creation", content: "Discover how AI can help you quickly generate high-quality commercial videos for marketing campaigns." },
    { title: "Bonus Content: Exclusive AI Tools & Resources", content: "As a special bonus, we'll share an exclusive AI tool or resource to give your projects an extra edge." },
    { title: "What's Next? Upcoming AI Advancements", content: "Learn about the latest trends and upcoming advancements in AI, from robotics to personal assistants." },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && visibleItems < accordionItems.length) {
          setVisibleItems((prev) => Math.min(prev + 2, accordionItems.length));
        }
      },
      {
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [visibleItems]);

  const handleAccordionChange = (index: number) => {
    setCurrentImage(index % images.length);
  };

  const colorPalettes = [
    "bg-pink-100 text-pink-800", // Light pink
    "bg-blue-100 text-blue-800", // Light blue
    "bg-green-100 text-green-800", // Light green
    "bg-yellow-100 text-yellow-800", // Light yellow
    "bg-purple-100 text-purple-800", // Light purple
    "bg-teal-100 text-teal-800", // Light teal
    "bg-orange-100 text-orange-800", // Light orange
    "bg-red-100 text-red-800", // Light red
    "bg-indigo-100 text-indigo-800", // Light indigo
  ];

  return (
    <div className="min-h-[80vh] flex items-center sm:px-6">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-full md:w-1/2 relative h-[400px] group">
            {images.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt={`Workshop image ${index + 1}`}
                layout="fill"
                priority={index === 0}
                blurDataURL={src}
                placeholder="blur"
                className={`rounded-lg transition-all duration-1000 ${
                  index === currentImage ? "opacity-100 scale-105" : "opacity-0 scale-100"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {accordionItems[currentImage].title}
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col max-h-[600px]">
            <h2 className="text-black dark:text-white text-4xl md:text-5xl font-bold mb-8 text-center">
              What Will You Learn
            </h2>
            <div className="overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
              <Accordion type="single" collapsible className="w-full h-80">
                {accordionItems.slice(0, visibleItems).map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className={`mb-4 ${colorPalettes[index % colorPalettes.length]} rounded-lg`}
                  >
                    <AccordionTrigger
                      onClick={() => handleAccordionChange(index)}
                      className={`text-lg md:text-xl py-3 px-4 hover:bg-opacity-80 transition-colors duration-300 ${colorPalettes[index % colorPalettes.length]}`}
                    >
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 py-4 px-6 rounded-b-lg text-left">
                      <p className="leading-relaxed">{item.content}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {visibleItems < accordionItems.length && (
                <div
                  ref={loadMoreRef}
                  className="w-full h-8 flex items-center justify-center text-gray-500 mt-4"
                >
                  <div className="animate-bounce">↓</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkshopAccordion;
