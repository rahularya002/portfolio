"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time?: string;
}

let notifications = [
  {
    name: "Business Presentation",
    description: "Transforming data into visually engaging narratives for impactful presentations.",
    icon: "🎨",
    color: "#FF6B6B",
  },
  {
    name: "Motion Graphics Animation",
    description: "Bringing your ideas to life with captivating animations.",
    icon: "✨",
    color: "#4ECDC4",
  },
  {
    name: "3D Animation",
    description: "Adding depth to your brand with stunning 3D visuals and animations.",
    icon: "🎬",
    color: "#45B7D1",
  },
  {
    name: "3D Logo Reveals",
    description: "Adding depth to your brand with stunning 3D visuals and animations.",
    icon: "🎮",
    color: "#96CEB4",
  },
  {
    name: "Typography ",
    description: "Designing powerful visual text to convey messages with style and clarity.",
    icon: "🎯",
    color: "#FFEEAD",
  },
  {
    name: "Explainer Animation",
    description: "Simplifying complex ideas with animated storytelling",
    icon: "🎪",
    color: "#D4A5A5",
  },
  {
    name: "Invitation Videos",
    description: "Creating personalized invitations to make your events unforgettable",
    icon: "🎭",
    color: "#9B59B6",
  },
  {
    name: "Slideshow",
    description: "Crafting seamless slideshows that capture memories and moments.",
    icon: "🎨",
    color: "#3498DB",
  },
  {
    name: "White Board Animation",
    description: "Illustrating concepts with dynamic whiteboard storytelling.",
    icon: "🎼",
    color: "#E67E22",
  },
  {
    name: "Music Visualization",
    description: "Turning sound into immersive visual experiences.",
    icon: "🎵",
    color: "#1ABC9C",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-full"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export default function AnimatedListDemo({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg border bg-background md:shadow-xl",
        className,
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
