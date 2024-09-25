"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";
import AnimatedBeamMultipleOutputDemo from "@/components/magicui/animated-beam-multiple-outputs";
import AnimatedListDemo from "@/components/magicui/animted-list-demo";
import { GlobeIcon, Cross2Icon } from "@radix-ui/react-icons";
import { CiMobile3 } from "react-icons/ci";
import { SiReact } from "react-icons/si";
import { TrendingUp, Clapperboard } from "lucide-react";
import Ripple from "@/components/magicui/ripple";
import RetroGrid from "./magicui/retro-grid";
import { useInView } from "react-intersection-observer";

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

const MediaProductionCard = () => (
  <div className="flex flex-col justify-end h-full w-full relative z-10">
    <div className="flex items-start">
      <div className="w-12 h-12 mr-4 flex-shrink-0">
        <Clapperboard className="w-full h-full text-black" />
      </div>
      <div>
        <p className="font-bold text-lg text-black font-montserrat">Media Production</p>
        <p className="font-normal text-sm text-black">We help you produce short films and commercials with the help of AI.</p>
      </div>
    </div>
  </div>
);

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
    thumbnail: "/path/to/web-dev-image.jpg",
    background: (
      <div className="absolute inset-0 z-0 bg-white">
        {AnimatedBeamMultipleOutputDemo && <AnimatedBeamMultipleOutputDemo className="h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]" />}
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="flex flex-col justify-end h-full w-full p-4 relative z-10">
        <div className="flex items-start">
          <div className="w-12 h-12 mr-4 flex-shrink-0">
            <CiMobile3 className="w-full h-full text-black" />
          </div>
          <div>
            <p className="font-bold text-lg text-black font-montserrat">Mobile App Development</p>
            <p className="font-normal text-sm text-black">We develop mobile apps for your brand.</p>
          </div>
        </div>
      </div>
    ),
    className: "col-span-1 rounded-xl min-h-[350px]",
    thumbnail: "/path/to/mobile-dev-image.jpg",
    background: (
      <div className="absolute inset-0 z-0 bg-white">
        {AnimatedListDemo && <AnimatedListDemo className="h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />}
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
    className: "col-span-1 rounded-xl min-h-[350px]",
    thumbnail: "/path/to/seo-image.jpg",
    background: (
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-white">
        {Ripple && (
          <Ripple className="absolute inset-0 h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
        )}
      </div>
    ),
  },
  {
    id: 4,
    name: "Media Production",
    description: "We help you produce short films and commercials with the help of AI.",
    content: (
      <div className="flex flex-col justify-end h-full w-full relative z-10">
        <div className="flex items-start">
          <div className="w-12 h-12 mr-4 flex-shrink-0">
            <Clapperboard className="w-full h-full text-black" />
          </div>
          <div>
            <p className="font-bold text-lg text-black font-montserrat">Media Production</p>
            <p className="font-normal text-sm text-black">We help you produce short films and commercials with the help of AI.</p>
          </div>
        </div>
      </div>
    ),
    className: "md:col-span-2 rounded-xl min-h-[270px]",
    thumbnail: "/path/to/video-editing-image.jpg",
    background: (
      <div className="absolute inset-0 z-0 bg-white">
        {RetroGrid && (
          <RetroGrid className="absolute inset-0 h-full w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
        )}
      </div>
    )
  },
];
