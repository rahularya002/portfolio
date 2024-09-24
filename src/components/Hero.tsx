import Link from "next/link";
import ShimmerButton from "./magicui/shimmer-button";
import Meteors from "./magicui/meteors";
import BoxReveal from "./magicui/box-reveal";

export default function Hero() {
  return (
    <section
      className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/space2.jpg')" }} // Background for the section
      id="#home"
    >
      <Meteors number={20} /> {/* Add meteor background */}
      <div className="container px-4 md:px-6 z-10 flex flex-col justify-end mt-22">
        <div className="flex flex-col items-center space-y-4 text-center mx-auto pb-56 mb-52">
          
            <h1
              className="text-5xl font-bold tracking-tighter sm:text-6xl xl:text-8xl"
              style={{
                backgroundImage: "url('/starry4.jpg')", // Replace with your image path
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                
              }}
            >
              Leading the <br />
              Quantum Revolution
            </h1>
        
          
            <p className="max-w-[600px] md:text-xl mx-auto text-black">
              {/* Crafting exceptional digital experiences for businesses of all sizes. */}
            </p>
       
          
            <div className="flex items-center justify-center">
              <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Get in Touch
                </span>
              </ShimmerButton>
            </div>
          
        </div>
      </div>
    </section>
  );
}
