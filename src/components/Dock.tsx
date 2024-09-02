import React from "react";
import Link from "next/link";
import { HomeIcon, InfoIcon, ClipboardIcon, BriefcaseIcon, MailIcon } from "lucide-react";

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

export type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
  home: (props: IconProps) => <HomeIcon {...props} />,
  about: (props: IconProps) => <InfoIcon {...props} />,
  services: (props: IconProps) => <ClipboardIcon {...props} />,
  projects: (props: IconProps) => <BriefcaseIcon {...props} />,
  email: (props: IconProps) => <MailIcon {...props} />,
};

const DATA = {
  navbar: [
    { href: "#", icon: Icons.home, label: "Home" },
    { href: "#", icon: Icons.about, label: "About" },
    { href: "#", icon: Icons.services, label: "Services" },
    { href: "#", icon: Icons.projects, label: "Projects" },
    { href: "#", icon: Icons.email, label: "Contact Us" },
  ],
};

export function DockDemo() {
  return (
    <div>
      <TooltipProvider>
        <Dock direction="middle" className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full",
                    )}
                  >
                    <item.icon className="size-4" />
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
