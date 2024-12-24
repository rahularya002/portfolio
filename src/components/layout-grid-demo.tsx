"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";
import dynamic from 'next/dynamic';
import { GlobeIcon } from "@radix-ui/react-icons";
import { CiMobile3 } from "react-icons/ci";
import { SiReact } from "react-icons/si";
import { TrendingUp, Clapperboard, Film } from "lucide-react";
import { useInView } from "react-intersection-observer";

const AnimatedBeamMultipleOutputDemo = dynamic(() => import("@/components/magicui/animated-beam-multiple-outputs"), { ssr: false });
const AnimatedListDemo = dynamic(() => import("@/components/magicui/animted-list-demo"), { ssr: false });
const Ripple = dynamic(() => import("@/components/magicui/ripple"), { ssr: false });
const RetroGrid = dynamic(() => import("./magicui/retro-grid"), { ssr: false });
const MediaProductionSlider = dynamic(() => import("./MediaProductionSlider"), { ssr: false });

export function LayoutGridDemo() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (!inView) {
      setExpandedCard(null);
    }
  }, [inView]);

  const handleCardClick = (id: number) => {
    setExpandedCard(id === expandedCard ? null : id);
  };

  const cards = [
    {
      id: 1,
      content: (
        <div className="flex flex-col justify-end h-full w-full p-4 relative z-10">
          <div className="flex items-start">
            <div className="w-12 h-12 mr-4 flex-shrink-0">
              <SiReact className="w-full h-full text-black" />
            </div>
            <div>
              <p className="font-bold text-lg text-black font-montserrat">Web Development</p>
              <p className="font-normal text-sm text-black">We develop websites for your brand.</p>
            </div>
          </div>
        </div>
      ),
      className: "md:col-span-2 rounded-xl pointer-events-none min-h-[350px]",
      background: (
        <div className="absolute inset-0 z-0 bg-white">
          <AnimatedBeamMultipleOutputDemo className="h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]" />
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="flex flex-col justify-end h-full w-full p-4 relative z-10">
          <div className="flex items-start">
            <div className="w-12 h-12 mr-4 flex-shrink-0">
              <Film className="w-full h-full text-black" />
            </div>
            <div>
              <p className="font-bold text-lg text-black font-montserrat">MotionCraft Studios</p>
              <p className="font-normal text-sm text-black">We create animations worth</p>
            </div>
          </div>
        </div>
      ),
      className: "col-span-1 rounded-xl min-h-[350px] pointer-event-none",
      background: (
        <div className="absolute inset-0 z-0 bg-white">
          <AnimatedListDemo className="h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div className="flex flex-col justify-end h-full w-full p-4 relative z-10">
          <div className="flex items-start">
            <div className="w-12 h-12 mr-4 flex-shrink-0">
              <GlobeIcon className="w-full h-full text-black" />
            </div>
            <div>
              <p className="font-bold text-lg text-black font-montserrat">Digital Marketing</p>
              <p className="font-normal text-sm text-black">We help you market your website on search engines.</p>
            </div>
          </div>
        </div>
      ),
      className: "col-span-1 rounded-xl min-h-[350px] pointer-events-none",
      background: (
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-white">
          <Ripple className="absolute inset-0 h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
        </div>
      ),
    },
    {
      id: 4,
      content: (
        <div className="flex flex-col justify-end h-full w-full p-4 relative z-10" onClick={() => handleCardClick(4)}>
          <MediaProductionSlider isExpanded={expandedCard === 4} />
          <div className="flex items-start mt-4">
            <div className="w-12 h-12 mr-4 flex-shrink-0">
              <Clapperboard className="w-full h-full text-black" />
            </div>
            <div>
              <p className="font-bold text-lg text-black font-montserrat">Revolutionizing TVCs with AI</p>
              <p className="font-normal text-sm text-black">Crafting Impactful and Engaging Television Commercials for Modern Brands.</p>
            </div>
          </div>
        </div>
      ),
      className: "md:col-span-2 rounded-xl min-h-[350px]",
      background: (
        <div className="absolute inset-0 z-0 bg-white">
          <RetroGrid className="absolute inset-0 h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
        </div>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div ref={ref} className="h-full w-full">
        <LayoutGrid cards={cards} />
      </div>
    </React.Fragment>
  );
}

const features = [
  {
    Icon: SiReact,
    name: "Web Development",
    description: "We develop websites for your brand.",
    cta: "Learn more",
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: CiMobile3,
    name: "Mobile App Development",
    description: "We develop mobile apps for your brand.",
    cta: "Learn more",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "SEO",
    description: "We help you rank your website on search engines.",
    cta: "Learn more",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: TrendingUp,
    name: "Digital Marketing",
    description: "We help you market your website on search engines.",
    cta: "Learn more",
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
];
