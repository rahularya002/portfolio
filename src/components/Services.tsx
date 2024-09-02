import Link from "next/link";
import Image from "next/image";
import AnimatedShinyText from "./magicui/animated-shiny-text";
import { CodeIcon, SmartphoneIcon, TypeIcon, FilmIcon, StoreIcon } from "./Icons";
import ShinyButton from "./magicui/shiny-button";
import BoxReveal from "./magicui/box-reveal";

export default function Services() {
  return (
    <section
      id="services"
      className="w-full min-h-screen flex items-center justify-center bg-muted"
      style={{
        background: "linear-gradient(180deg, rgba(226, 215, 216) 0%, rgba(241, 245, 249, 1) 100%)",
      }}
    >
      <div className="container px-4 md:px-6 py-12 lg:py-16">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out rounded-sm hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Our Services</span>
          </AnimatedShinyText>
          <BoxReveal boxColor={"#5046e6"} duration={0.3}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mx-auto">
              Elevating Your Digital Presence
            </h2>
          </BoxReveal>
          <BoxReveal boxColor={"#5046e6"} duration={0.3}>
            <p className="max-w-[900px] text-muted-foreground text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl mx-auto">
              From web development to mobile apps, UX/UI design, ad films with AI, short movie production, and
              digital marketing, we've got you covered.
            </p>
          </BoxReveal>
        </div>
        <div className="mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl items-center py-12 lg:gap-12">
          {[
            {
              image: "/wd.jpg",
              icon: <CodeIcon className="h-8 w-8 text-primary" />,
              title: "Web Development",
              description: "Crafting responsive and scalable web applications.",
            },
            {
              image: "/mad.jpg",
              icon: <SmartphoneIcon className="h-8 w-8 text-primary" />,
              title: "Mobile App Development",
              description: "Building innovative and user-friendly mobile apps.",
            },
            {
              image: "/ui.jpg",
              icon: <TypeIcon className="h-8 w-8 text-primary" />,
              title: "UX/UI Design",
              description: "Crafting intuitive and visually appealing user experiences.",
            },
            {
              image: "/ai.jpg",
              icon: <FilmIcon className="h-8 w-8 text-primary" />,
              title: "Ad Films with AI",
              description: "Leveraging AI technology to create captivating ad films.",
            },
            {
              image: "/sf.jpg",
              icon: <FilmIcon className="h-8 w-8 text-primary" />,
              title: "Short Movie Production",
              description: "Crafting captivating short films to showcase your brand.",
            },
            {
              image: "/dm.jpg",
              icon: <StoreIcon className="h-8 w-8 text-primary" />,
              title: "Digital Marketing",
              description: "Crafting effective digital marketing strategies to reach your target audience.",
            },
          ].map((service, index) => (
            <ServiceCard
              key={index}
              image={service.image}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  image: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ServiceCard({ image, icon, title, description }: ServiceCardProps) {
  return (
    <div className="relative flex flex-col justify-center space-y-4 group">
      <div className="relative overflow-hidden rounded-lg mx-auto">
        <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className="rounded-lg object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          style={{ aspectRatio: "300/200", objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-50 mix-blend-overlay transition-opacity duration-300 ease-in-out group-hover:opacity-75 rounded-lg"></div>
      </div>
      <div className="grid gap-1">
        {icon}
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground text-base sm:text-lg">{description}</p>
        <ShinyButton text="Learn More">
          <Link
            href="#"
            className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Learn More
          </Link>
        </ShinyButton>
      </div>
    </div>
  );
}
