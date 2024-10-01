"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import MediaProductionSlider from "../MediaProductionSlider";

type Card = {
  id: number;
  name?: string; // Optional
  description?: string; // Optional
  content: JSX.Element | React.ReactNode | string;
  className: string;
  background: React.ReactNode;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);
  const [isMediaProductionExpanded, setIsMediaProductionExpanded] = useState(false);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card.id === selected?.id ? null : card);
    if (card.name === "Media Production") {
      setIsMediaProductionExpanded(!isMediaProductionExpanded);
    } else {
      setIsMediaProductionExpanded(false);
    }
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
    setIsMediaProductionExpanded(false);
  };

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden",
              selected?.id === card.id
                ? "rounded-lg cursor-pointer absolute inset-0 w-full h-full z-50"
                : lastSelected?.id === card.id
                ? "z-40 bg-white rounded-xl h-full w-full"
                : "bg-white rounded-xl h-full w-full"
            )}
            layoutId={`card-${card.id}`}
          >
            <ImageComponent card={card} />
            <div className="relative z-20 p-4 h-full flex flex-col justify-between">
              {card.name === "Media Production" && isMediaProductionExpanded ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4 flex-grow"
                >
                  <MediaProductionSlider isExpanded={isMediaProductionExpanded} />
                </motion.div>
              ) : null}
              {card.content}
            </div>
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
};

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <>
      <motion.img
        layoutId={`image-${card.id}-image`}
        height="500"
        width="500"
        className={cn(
          "object-cover object-top absolute inset-0 h-full w-full transition duration-200"
        )}
        alt="thumbnail"
      />
      {card.background}
    </>
  );
};

const CloseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="absolute top-4 left-4 z-[80] bg-white rounded-full p-2 hover:bg-gray-200 transition-colors duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full z-10"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 100,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative px-8 pb-4 z-[70]"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
