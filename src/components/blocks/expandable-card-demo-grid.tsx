"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Play } from 'lucide-react';

export default function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`video-${active.title}-${id}`}>
                {active.type === "youtube" ? (
                  <iframe
                    width="100%"
                    height="315"
                    src={active.src}
                    title={active.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                  ></iframe>
                ) : (
                  <video
                    src={active.src}
                    controls
                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-center text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <div className="mx-auto w-full">
        {["Commercial Ads", "Songs", "Logo Reveals"].map((category) => (
          <div key={category}>
            <h2 className="text-2xl font-bold mb-4 mt-8 text-center">{category}</h2>
            <ul className="grid grid-cols-2 md:grid-cols-4 items-stretch gap-4">
              {cards
                .filter((card) => card.category === category)
                .map((card, index) => (
                  <motion.div
                    layoutId={`card-${card.title}-${id}`}
                    key={card.title}
                    onClick={() => setActive(card)}
                    className="p-4 flex flex-col justify-between h-full hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
                  >
                    <div className="flex gap-4 flex-col w-full">
                      <motion.div layoutId={`video-${card.title}-${id}`}>
                        {card.type === "youtube" ? (
                          <iframe
                            width="100%"
                            height="315"
                            src={card.src}
                            title={card.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="h-60 w-full rounded-lg object-cover object-top"
                          ></iframe>
                        ) : (
                          <div className="relative h-60 w-full rounded-lg overflow-hidden">
                            <video
                              src={card.src}
                              className="h-full w-full object-cover object-top"
                            >
                              Your browser does not support the video tag.
                            </video>
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                              <Play className="w-12 h-12 text-white" />
                            </div>
                          </div>
                        )}
                      </motion.div>
                      <div className="flex justify-center items-center flex-col flex-grow">
                        <motion.h3
                          layoutId={`title-${card.title}-${id}`}
                          className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                        >
                          {card.title}
                        </motion.h3>
                        <motion.p
                          layoutId={`description-${card.description}-${id}`}
                          className="text-neutral-600 dark:text-neutral-400 text-center text-base"
                        >
                          {card.description}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    category: "Commercial Ads",
    type: "youtube",
    description: "I'm not Real | AI-Generated Pet Food Ad | Vito X",
    title: "I'm not Real",
    src: "https://www.youtube.com/embed/BI10VmbVYsk",
    ctaText: "Visit",
    ctaLink: "https://www.youtube.com/embed/BI10VmbVYsk",
    content: () => {
      return (
        <p>
          "Welcome to a world where reality and imagination blur. In this AI-generated ad, Vito X presents a playful and joyful story featuring a bright brown and white puppy and the Vito-X Pet Food. The twist? The product and the entire ad are not real, they're created using artificial intelligence.
          Watch as the adorable puppy interacts with its environment, showcasing how advanced AI can create compelling stories and products that don't actually exist. This ad serves as a powerful demonstration of AI's potential in the world of advertising, marketing, and content creation.
        </p>
      );
    },
  },
  {
    category: "Commercial Ads",
    type: "youtube",
    description: "The Dream | Official Trailer",
    title: "The Dream",
    src: "https://www.youtube.com/embed/5q-tuf4ZQtw",
    ctaText: "Visit",
    ctaLink: "https://www.youtube.com/embed/5q-tuf4ZQtw",
    content: () => {
      return (
        <p>
          In "The Dream," the world as we know it has been torn apart, leaving behind ruins and chaos. Our protagonist, along with other survivors, must navigate this dangerous landscape, facing both external threats and internal struggles. Will they find a way to survive, or will the dream become a nightmare?
        </p>
      );
    },
  },
  {
    category: "Commercial Ads",
    type: "youtube",
    description: "Vito-X: AI-Generated Skin Glowing Cream Ad | Innovative Skincare Concept",
    title: "AI Generated Skin Glowing Cream Ad",
    src: "https://www.youtube.com/embed/7RJ_0m2SQO8",
    ctaText: "Visit",
    ctaLink: "https://www.youtube.com/embed/7RJ_0m2SQO8",
    content: () => {
      return (
        <p>
          Presenting the AI-generated advertisement for Vito-X, an innovative skin glowing cream concept! Created entirely using artificial intelligence, this video showcases a fictional skincare product designed to highlight the possibilities of AI in marketing and beauty. While Vito-X may not be a real product, the ad takes you on a journey to explore the future of beauty concepts through cutting-edge technology.
        </p>
      );
    },
  },
  {
    category: "Commercial Ads",
    type: "youtube",
    description: "Experience the Ultimate Pizza with AI Creativity!",
    title: "Pizza Ad",
    src: "https://www.youtube.com/embed/IM3I8GeJoP4",
    ctaText: "Visit",
    ctaLink: "https://www.youtube.com/embed/IM3I8GeJoP4",
    content: () => {
      return (
        <p>
          Welcome to Vito X! 🍕 Dive into our latest creation where AI meets culinary delight. We've used cutting-edge AI technology to bring you a visually stunning and creatively crafted pizza video that showcases our delicious pizzas in an entirely new light.
          In this video, witness how we blend technology and creativity to highlight the irresistible appeal of our pizzas. From golden-brown crusts to gooey cheese pulls, experience the art of pizza-making like never before.
        </p>
      );
    },
  },
  {
    category: "Songs",
    type: "youtube",
    description: "Waqt - Heartfelt Love Song | Vito-X | Official Music Video 2024",
    title: "AI Generated Music Video",
    src: "https://www.youtube.com/embed/apvT6A1tXd0",
    ctaText: "Watch",
    ctaLink: "https://www.youtube.com/embed/apvT6A1tXd0",
    content: () => {
      return (
        <p>
          Experience the emotional journey of love and time with our latest song 'Waqt' by Vito-X. This soulful track will resonate with everyone who has ever felt the deep connections of love, inspired by the timeless vibe of Arijit Singh. Let the lyrics touch your heart and the music soothe your soul. Don't forget to like, share, and subscribe to Vito-X for more amazing music and videos!
        </p>
      );
    },
  },
  {
    category: "Songs",
    type: "youtube",
    description: "Firse Aashiqui | Romantic Bollywood Song | Vito X Presents",
    title: "AI Genereated Music Video with AI Models",
    src: "https://www.youtube.com/embed/1Wbp_V1tmCw",
    ctaText: "Explore",
    ctaLink: "https://www.youtube.com/embed/1Wbp_V1tmCw",
    content: () => {
      return (
        <p>
            Welcome to Vito X! Dive into the romantic world with our latest Bollywood song, "Firse Aashiqui" This enchanting melody beautifully portrays the depth of love and longing. With its captivating tune and heartfelt lyrics, this song is sure to resonate with anyone who cherishes the emotional journey of romance. Watch the video, experience the magic of love, and don't forget to like, comment, and subscribe to Vito X for more exquisite Bollywood music!
          </p>
        );
    },
  },
  {
    category: "Songs",
    type: "youtube",
    description: "Hum Bane Tum Bane | Vito-X | Love Song 2024",
    title: "AI Generated Video with AI Models",
    src: "https://www.youtube.com/embed/CW6JbgQy-VQ",
    ctaText: "Discover",
    ctaLink: "https://www.youtube.com/embed/CW6JbgQy-VQ",
    content: () => {
      return (
        <p>
          Experience the magic of love with 'Hum Bane Tum Bane' by Vito-X, a soulful track that beautifully captures the emotions of romance and connection. This love song is perfect for anyone who believes in the power of love and relationships. Whether you're looking to share a special moment with someone or get lost in the melody, 'Hum Bane Tum Bane' will touch your heart. Listen now and let the music take you on a journey of love.
        </p>
      );
    },
  },
  {
    category: "Songs",
    type: "youtube",
    description: "Iq Mulaqat | Romantic Bollywood Song | Vito X Presents",
    title: "AI Generated Video with AI Models",
    src: "https://www.youtube.com/embed/fkZVFv5NsVo",
    ctaText: "Watch Show",
    ctaLink: "https://www.youtube.com/embed/fkZVFv5NsVo",
    content: () => {
      return (
        <p>
          "Iq Mulaqat" is the latest romantic Bollywood track presented by Vito X, a heartfelt melody that beautifully captures the essence of love at first sight. This soulful song takes you on an emotional journey where two hearts meet and connect in an unforgettable moment. The enchanting vocals and poetic lyrics will evoke feelings of romance, longing, and passion, making it a perfect anthem for all those in love. Whether you're experiencing the magic of a new relationship or cherishing sweet memories, "Iq Mulaqat" will resonate with your heart. Dive into this mesmerizing romantic experience and let the music sweep you away!
        </p>
      );
    },
  },
  {
    category: "Logo Reveals",
    type: "local",
    description: "Particle Explosion Logo Reveal",
    title: "Particle Explosion",
    src: "/videos/logo-reveal-1.mp4",
    ctaText: "Watch",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Watch as countless particles explode and coalesce to form our dynamic logo in this exciting reveal animation.
        </p>
      );
    },
  },
  {
    category: "Logo Reveals",
    type: "local",
    description: "Glitch Effect Logo Unveiling",
    title: "Glitch Effect",
    src: "/videos/logo-reveal-2.mp4",
    ctaText: "Explore",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Experience our logo emerging through a series of glitches and digital distortions in this modern, tech-inspired reveal.
        </p>
      );
    },
  },
  {
    category: "Logo Reveals",
    type: "local",
    description: "Liquid Motion Logo Animation",
    title: "Liquid Motion",
    src: "/videos/logo-reveal-3.mp4",
    ctaText: "Discover",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Witness our logo flow and morph with mesmerizing liquid-like movements in this smooth and captivating animation.
        </p>
      );
    },
  },
  {
    category: "Logo Reveals",
    type: "local",
    description: "Geometric Shape Formation",
    title: "Geometric Assembly",
    src: "/videos/logo-reveal-4.mp4",
    ctaText: "View",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          See our logo take shape as geometric forms align and combine in this sleek and modern reveal animation.
        </p>
      );
    },
  },
  {
    category: "Logo Reveals",
    type: "local",
    description: "Neon Light Trace Logo Reveal",
    title: "Neon Trace",
    src: "/videos/logo-reveal-5.mp4",
    ctaText: "Experience",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Watch our logo come to life as vibrant neon lights trace its outline in this electrifying reveal animation.
        </p>
      );
    },
  },
  {
    category: "Logo Reveals",
    type: "local",
    description: "3D Rotation Logo Unveiling",
    title: "3D Rotation",
    src: "/videos/logo-reveal-6.mp4",
    ctaText: "Observe",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Explore our logo from every angle as it rotates and transforms in this dynamic 3D reveal animation.
        </p>
      );
    },
  },
  {
    category: "Logo Reveals",
    type: "local",
    description: "Ink Splash Logo Formation",
    title: "Ink Splash",
    src: "/videos/logo-reveal-7.mp4",
    ctaText: "Play",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Delight in the artistic process as ink splashes and splatters coalesce to form our logo in this creative reveal.
        </p>
      );
    },
  },
  {
    category: "Logo Reveals",
    type: "local",
    description: "Cinematic Light Rays Logo Reveal",
    title: "Cinematic Light Rays",
    src: "/videos/logo-reveal-8.mp4",
    ctaText: "Watch",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Be awed by our logo emerging from dramatic light rays in this cinematic and atmospheric reveal animation.
        </p>
      );
    },
  },
];

