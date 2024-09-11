"use client"
import React, { useState, useEffect } from "react";
import { GlobeIcon, Cross2Icon } from "@radix-ui/react-icons";
import { CiMobile3 } from "react-icons/ci";
import { SiReact } from "react-icons/si";
import { TrendingUp, Clapperboard } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import AnimatedBeamMultipleOutputDemo from "@/components/magicui/animated-beam-multiple-outputs";
import Marquee from "@/components/magicui/marquee";
import AnimatedListDemo from "@/components/magicui/animted-list-demo";
import RetroGrid from "@/components/magicui/retro-grid";
import Ripple from "@/components/magicui/ripple";

const mediaProductionCards = [
  { 
    Icon: Clapperboard,
    name: "Short Films", 
    description: "AI-assisted short film production", 
    cta: "Learn More",
    className: "col-span-1 row-span-1",
    background: (
      <RetroGrid className="absolute inset-0 h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  { 
    Icon: Clapperboard,
    name: "Commercials", 
    description: "Engaging AI-enhanced commercials", 
    cta: "Learn More",
    className: "col-span-1 row-span-1",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute inset-0 h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  { 
    Icon: Clapperboard,
    name: "Motion Graphics", 
    description: "Eye-catching motion graphics", 
    cta: "Learn More",
    className: "col-span-1 row-span-1",
    background: (
      <AnimatedListDemo className="absolute inset-0 h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  { 
    Icon: Clapperboard,
    name: "Video Editing", 
    description: "Professional video editing services", 
    cta: "Learn More",
    className: "col-span-1 row-span-1",
    background: (
      <Ripple className="absolute inset-0 h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
];

const features = [
  {
    Icon: SiReact,
    name: "Web Development",
    description: "We develop websites for your brand.",
    cta: "Learn more",
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute inset-0 h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: CiMobile3,
    name: "Mobile App Development",
    description: "We develop mobile apps for your brand.",
    cta: "Learn more",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    background: (
      <AnimatedListDemo className="absolute inset-0 h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: GlobeIcon,
    name: "SEO",
    description: "We help you rank your website on search engines.",
    cta: "Learn more",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {/* Additional content goes here */}
      </Marquee>
    ),
  },
  {
    Icon: TrendingUp,
    name: "Digital Marketing",
    description: "We help you market your website on search engines.",
    cta: "Learn more",
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    background: (
      <Ripple className="absolute inset-0 h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
];

const mediaProductionFeature = {
  Icon: Clapperboard,
  name: "Media Production",
  description: "We help you produce short films and commercials with the help of AI.",
  cta: "Show More",
  className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  background: (
    <RetroGrid className="absolute inset-0 h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
  ),
};

export function BentoDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => setModalVisible(true), 10);
    } else {
      setModalVisible(false);
    }
  }, [isModalOpen]);

  const openMediaProductionModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  return (
    <>
      <BentoGrid className="lg:grid-rows-3 lg:grid-cols-3">
        {features.map((feature) => (
          <BentoCard
            key={feature.name}
            {...feature}
            onClick={() => {}} // Remove onClick for non-media production cards
          />
        ))}
        <BentoCard
          {...mediaProductionFeature}
          onClick={openMediaProductionModal}
        />
      </BentoGrid>

      {isModalOpen && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out ${modalVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`bg-white p-6 rounded-lg w-full max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-4rem)] xl:max-w-[1200px] relative transform transition-all duration-300 ease-out ${modalVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'}`}>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <Cross2Icon className="w-6 h-6" />
            </button>
            <h2 className="text-3xl font-bold mb-6 text-center">{mediaProductionFeature.name}</h2>
            <BentoGrid className="grid-cols-2 grid-rows-2 gap-4">
              {mediaProductionCards.map((card, index) => (
                <BentoCard key={index} {...card} onClick={() => {}} />
              ))}
            </BentoGrid>
          </div>
        </div>
      )}
    </>
  );
}
