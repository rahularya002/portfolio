import Link from "next/link";
import ShimmerButton from "./magicui/shimmer-button";
import Meteors from "./magicui/meteors";
import BoxReveal from "./magicui/box-reveal";

export default function Hero() {
  return (
    <section
      className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/space2.jpg')" }}
    >
      <Meteors number={20} /> {/* Add meteor background */}
      <div className="container px-4 md:px-6 z-10">
        <div className="flex flex-col items-center justify-center h-full space-y-4 text-center mx-auto">
          <BoxReveal boxColor={"#5046e6"} duration={0.3}>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
              Leading the <br />
              Quantum Revolution
            </h1>
          </BoxReveal>
          <BoxReveal boxColor={"#5046e6"} duration={0.3}>
            <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto text-black">
              Crafting exceptional digital experiences for businesses of all sizes.
            </p>
          </BoxReveal>
          <BoxReveal>
            <div className="flex items-center justify-center">
              <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Learn more
                </span>
              </ShimmerButton>
              
            </div>
          </BoxReveal>
        </div>
      </div>
    </section>
  );
}
