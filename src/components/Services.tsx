import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/legacy/image";
import AnimatedShinyText from "./magicui/animated-shiny-text";
import ShinyButton from "./magicui/shiny-button";
import BoxReveal from "./magicui/box-reveal";
import { LayoutGridDemo } from "./layout-grid-demo";

export default function Services() {
  const [key, setKey] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (!inView) {
      setKey(prevKey => prevKey + 1);
    }
  }, [inView]);

  return (
    <section
      id="services"
      className="w-full min-h-screen flex items-center justify-center bg-muted py-6"
      style={{
        background:
          "linear-gradient(180deg, rgba(226, 215, 216) 0%, rgba(241, 245, 249, 1) 100%)",
      }}
    >
      <div className="container relative px-4 md:px-6 z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out rounded-sm hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Our Services</span>
          </AnimatedShinyText>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mx-auto">
            Elevating Your Digital Presence
          </h2>
          <p className="max-w-[900px] text-muted-foreground text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl mx-auto">
            From web development to mobile apps, UX/UI design, ad films with AI,
            short movie production, and digital marketing, we've got you
            covered.
          </p>
        </div>
        <div ref={ref} className="mx-auto mt-12">
          <LayoutGridDemo key={key} />
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  image: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ServiceCard({
  image,
  icon,
  title,
  description,
}: ServiceCardProps) {
  return (
    <div className="relative flex flex-col justify-center space-y-4 group">
      <div className="relative overflow-hidden rounded-lg mx-auto">
        <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className="rounded-lg object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          style={{ aspectRatio: "300/200", objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-50 mix-blend-overlay transition-opacity duration-300 ease-in-out group-hover:opacity-75 rounded-lg"></div>
      </div>
      <div className="grid gap-1">
        {icon}
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground text-base sm:text-lg">
          {description}
        </p>
        <ShinyButton
          text="Learn More"
          className="bg-transparent border border-primary text-primary"
        >
          <Link
            href="#"
            className="inline-flex h-8 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Learn More
          </Link>
        </ShinyButton>
      </div>
    </div>
  );
}
