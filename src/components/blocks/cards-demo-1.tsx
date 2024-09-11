"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function CardDemo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="max-w-xs w-full">
      <div
        className={cn(
          "group w-full cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
          "bg-[url(https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80)] bg-cover",
          "transition-all duration-500"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && (
          <div 
            className="absolute inset-0 z-10"
            style={{
              backgroundImage: "url(/videos/vito-x.gif)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
        <div className="absolute inset-0 bg-black opacity-50 z-20" />
        <div className="text relative z-30 mb-2">
          <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative leading-tight mb-10">
            AI Short Films
          </h1>
        </div>
      </div>
    </div>
  );
}
