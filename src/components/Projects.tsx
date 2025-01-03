import IconCloudDemo from "@/components/Icon";
import ShinyButton from "./magicui/shiny-button";
import Link from "next/link";
import BoxReveal from "./magicui/box-reveal";

export default function Projects() {
  return (
    <section
      id="#projects"
      className="relative w-full py-12 md:py-18 lg:py-20 overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(135deg, #e0eafc, #cfdef3)", // Light space gradient
      }}
    >
      <div className="container relative px-4 md:px-6 z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex flex-col items-center justify-center h-full space-y-4 text-center mx-auto">
            
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Work</div>
           
            
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl dark:text-black">Showcasing Our Expertise</h2>
          
            
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-black-300">
                Check out some of our recent projects and see how we've helped our clients succeed.
              </p>
           
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4 lg:pr-8">
            <IconCloudDemo />
          </div>
          <div className="flex flex-col justify-center space-y-6 py-6 m-8">
            <div className="grid gap-1">
              <h3 className="text-xl font-bold dark:text-black">E-commerce</h3>
              <p className="text-muted-foreground">
                Designed and developed a modern e-commerce platform for a leading retail brand.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-xl font-bold dark:text-black">Mobile App</h3>
              <p className="text-muted-foreground">
                Crafted a user-friendly mobile app for a leading healthcare provider.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-xl font-bold dark:text-black">Web Apps</h3>
              <p className="text-muted-foreground">
                Crafted a user-friendly Web app for a leading healthcare provider.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-xl font-bold dark:text-black">Digital Marketing</h3>
              <p className="text-muted-foreground">
                Crafted a user-friendly Web app for a leading healthcare provider.
              </p>
            </div>
            <Link href="/about">
              <ShinyButton text="Learn More" className="bg-transparent border border-primary text-primary">
                <span className="inline-flex h-8 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Learn More
                </span>
              </ShinyButton>
            </Link>
            {/* Add more projects here if needed */}
          </div>
        </div>
      </div>
    </section>
  );
}
