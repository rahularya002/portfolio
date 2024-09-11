"use client";
import { cn } from "@/lib/utils"; // Ensure this utility is working properly in your project
import { useState } from "react";

// Define the prop types for CardDemo
interface CardProps {
  title: string;
  description: string;
}

export default function CardDemo({ title, description }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="max-w-xs w-full">
      <div
        className={cn(
          "group w-full cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
          // Main background image
          "bg-[url(https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80)] bg-cover",
          "transition-all duration-500"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Show video background when hovered */}
        {isHovered && (
          <div 
            className="absolute inset-0 z-10"
            style={{
              backgroundImage: "url(/videos/vito-x.gif)", // Make sure the URL is correct
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
        {/* Overlay for the black effect */}
        <div className="absolute inset-0 bg-black opacity-50 z-20" />
        
        {/* Text content */}
        <div className="text relative z-30 mb-2">
          <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative leading-tight mb-10">
            {title}
          </h1>
          <p className="text-gray-100 text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
