import { BellIcon, Share2Icon, Clapperboard } from "lucide-react";
import { FaReact } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import AnimatedBeamMultipleOutputDemo from "@/components/magicui/animated-beam-multiple-outputs";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import Marquee from "@/components/magicui/marquee";
import AnimatedListDemo from "@/components/magicui/animted-list-demo";

const files = [
  {
    name: "Ecommerce Website",
    body: "Ecommerce is the activity of buying or selling products on the internet, and the platform that enables this is an ecommerce website.",
  },
  {
    name: "Responsive Design",
    body: "Responsive design is a design approach that makes web pages render well on a variety of devices and window or screen sizes.",
  },
  {
    name: "CRM",
    body: "CRM stands for Customer Relationship Management. It is a system that manages customer interactions and data to improve business relationships.",
  },
  {
    name: "SEO",
    body: "SEO stands for Search Engine Optimization. It is the process of optimizing a website to improve its ranking in search engine results pages.",
  },
  {
    name: "Media Production",
    body: "Media production is the process of creating media content, such as videos, images, and audio.",
  },
];

const features = [
  {
    Icon: FaReact,
    name: "Web Development",
    description: "We develop websites for your business.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: CiMobile3,
    name: "Mobile App",
    description: "Get better ui/ux for your mobile app",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: Share2Icon,
    name: "Integrations",
    description: "Supports 100+ integrations and counting.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: Clapperboard,
    name: "Media Production",
    description: "We develop AI based short films and commercials with motion graphics for your brand.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      />
    ),
  },
];

export function BentoDemo() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
