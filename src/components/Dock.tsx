import React from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image component for using logo
import { InfoIcon, ClipboardIcon, BriefcaseIcon, MailIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/ui/mode-toggle";

// Your logo import
import Logo from "/public/md.jpg"; // Replace with your actual logo path

export type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
  // Replacing the home icon with a logo
  logo: (props: React.HTMLAttributes<HTMLImageElement>) => (
    <Image src={Logo} alt="Logo" {...props} />
  ),
  about: (props: IconProps) => <InfoIcon {...props} />,
  services: (props: IconProps) => <ClipboardIcon {...props} />,
  projects: (props: IconProps) => <BriefcaseIcon {...props} />,
  email: (props: IconProps) => <MailIcon {...props} />,
};

const DATA = {
  navbar: [
    { href: "#home", icon: Icons.logo, label: "Home" }, // Navigate to the Home section
    { href: "#services", icon: Icons.services, label: "Services" }, // Navigate to the Services section
    { href: "#projects", icon: Icons.projects, label: "Projects" },
    { href: "#testimonials", icon: Icons.about, label: "Testimonials" }, // Navigate to the About section // Navigate to the Projects section
    { href: "#contact", icon: Icons.email, label: "Contact Us" }, // Navigate to the Contact section
  ],
};

export function DockDemo() {
  return (
    <div>
      <TooltipProvider>
        <Dock
          direction="middle"
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20"
        >
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full"
                    )}
                    scroll={false} // Disable automatic scrolling behavior from Next.js
                  >
                    {item.icon({ className: "size-4", style: { width: 16, height: 16 } })} {/* Adjust the size as needed */}
                  </Link>
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
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
}