"use client";
import React from "react";
import Image from "next/legacy/image";
import { InfoIcon, ClipboardIcon, BriefcaseIcon, MailIcon, MessageSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/magicui/dock";

import Link from "next/link";

// Your logo import
import Logo from "/public/md.jpg"; // Replace with your actual logo path

export type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
  logo: (props: React.HTMLAttributes<HTMLImageElement>) => (
    <Image src={Logo} alt="Logo" {...props} width={24} height={24}/>
  ),
  about: (props: IconProps) => <InfoIcon {...props} />,
  services: (props: IconProps) => <ClipboardIcon {...props} />,
  projects: (props: IconProps) => <BriefcaseIcon {...props} />,
  email: (props: IconProps) => <MailIcon {...props} />,
  testimonials: (props: IconProps) => <MessageSquareIcon {...props} />,
};

const DATA = {
  navbar: [
    { to: "#home", icon: Icons.logo, label: "Home" },
    { to: "#services", icon: Icons.services, label: "Services" },
    { to: "#projects", icon: Icons.projects, label: "Projects" },
    { to: "#testimonials", icon: Icons.testimonials, label: "Testimonials" },
    { to: "#contact", icon: Icons.email, label: "Contact Us" },
  ],
};

// Custom ScrollButton component
const ScrollButton = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button> & { to: string }>(
  ({ to, children, ...props }, ref) => (
    <Button
      {...props}
      ref={ref}
      onClick={() => {
        const element = document.getElementById(to);
        if (element) {
          const offsetTop = element.offsetTop;
          window.scrollTo({
            top: offsetTop - 90,
            behavior: 'smooth'
          });
        }
      }}
    >
      {children}
    </Button>
  )
);
ScrollButton.displayName = "ScrollButton";

export function DockDemo() {
  return (
    <div>
      <TooltipProvider>
        <Dock
          direction="middle"
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-white"
        >
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ScrollButton
                    to={item.to.slice(1)} // Remove the '#' from the beginning
                    variant="ghost"
                    size="icon"
                    className="size-12 rounded-full cursor-pointer"
                  >
                    {item.icon({ className: "size-4", style: { width: 16, height: 16 } })}
                  </ScrollButton>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full" />
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/about">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-12 rounded-full cursor-pointer"
                  >
                    <InfoIcon className="size-4" style={{ width: 16, height: 16 }} />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>About</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
          {/* <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/blogs">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-12 rounded-full cursor-pointer"
                  >
                    <BookType className="size-4" style={{ width: 16, height: 16 }} />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Blogs</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon> */}
        </Dock>
      </TooltipProvider>
    </div>
  );
}