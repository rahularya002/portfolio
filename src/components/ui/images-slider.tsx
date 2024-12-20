"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

export const VideoSlider = ({
  videos,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}: {
  videos: string[];
  children: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState<string[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === videos.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = () => {
    setLoading(true);
    // For YouTube videos, we don't need to preload them
    setLoadedVideos(videos);
    setLoading(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // autoplay
    let interval: any;
    if (autoplay) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, []);

  const slideVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotateX: 45,
    },
    visible: {
      scale: 1,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.0],
      },
    },
    upExit: {
      opacity: 1,
      y: "-150%",
      transition: {
        duration: 1,
      },
    },
    downExit: {
      opacity: 1,
      y: "150%",
      transition: {
        duration: 1,
      },
    },
  };

  const areVideosLoaded = loadedVideos.length > 0;

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      )}
      style={{
        perspective: "1000px",
      }}
    >
      {areVideosLoaded && children}
      {areVideosLoaded && overlay && (
        <div
          className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)}
        />
      )}

      {areVideosLoaded && (
        <AnimatePresence>
          <motion.iframe
            key={currentIndex}
            ref={iframeRef}
            src={`${loadedVideos[currentIndex]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${loadedVideos[currentIndex].split('embed/')[1]}`}
            initial="initial"
            animate="visible"
            exit={direction === "up" ? "upExit" : "downExit"}
            variants={slideVariants}
            className="video h-full w-full absolute inset-0 object-cover object-center"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </AnimatePresence>
      )}
    </div>
  );
};
