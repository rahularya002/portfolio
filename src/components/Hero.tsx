"use client";
import React from "react";
import ShimmerButton from "./magicui/shimmer-button";
import Meteors from "./magicui/meteors";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const ScrollButton = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button> & { to: string }>(
    ({ to, children, ...props }, ref) => {
      const handleClick = () => {
        const element = document.getElementById(to);
        if (element) {
          const offsetTop = element.offsetTop;
          window.scrollTo({
            top: offsetTop - 90,
            behavior: 'smooth'
          });
        }
      };

      return (
        <Button
          {...props}
          ref={ref}
          onClick={handleClick}
        >
          {children}
        </Button>
      );
    }
  );
  ScrollButton.displayName = "ScrollButton";

  const ScrollShimmerButton = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof ShimmerButton> & { to: string }>(
    ({ to, children, ...props }, ref) => {
      const handleClick = () => {
        const element = document.getElementById(to);
        if (element) {
          const offsetTop = element.offsetTop;
          window.scrollTo({
            top: offsetTop - 90,
            behavior: 'smooth'
          });
        }
      };

      return (
        <ShimmerButton
          {...props}
          ref={ref}
          onClick={handleClick}
        >
          {children}
        </ShimmerButton>
      );
    }
  );
  ScrollShimmerButton.displayName = "ScrollShimmerButton";

  return (
    <section
      className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/space2.jpg')" }}
      id="#home"
    >
      <Meteors number={20} />
      <div className="container px-4 md:px-6 z-10 flex flex-col justify-end mt-22">
        <div className="flex flex-col items-center space-y-4 text-center mx-auto pb-56 mb-52">
          <h1
            className="text-5xl font-bold tracking-tighter sm:text-6xl xl:text-8xl"
            style={{
              backgroundImage: "url('/starry4.jpg')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Leading the <br />
            Quantum Revolution
          </h1>
          <p className="max-w-[600px] md:text-xl mx-auto text-black">
            {/* Crafting exceptional digital experiences for businesses of all sizes. */}
          </p>
          <div className="flex items-center justify-center">
            <ScrollShimmerButton to="contact" className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Get in Touch
              </span>
            </ScrollShimmerButton>
          </div>
        </div>
      </div>
    </section>
  );
}
