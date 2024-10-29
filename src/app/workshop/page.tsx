import WorkshopHero from "@/components/component/workshop-hero";
import WorkshopAccordion from "@/components/component/workshop-accordian";
import WorkshopCards from "@/components/component/workshop-cards";
import WorkshopNav from "@/components/component/workshop-nav";
import ThemeProvider from "@/utils/ThemeProvider";
import WorkshopLogin from "@/components/component/workshop-login";
import WorkshopPricing from "@/components/component/workshop-payment";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator"
import HomeButton from "@/components/HomeButton";


export default function Workshop() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="relative">
        <WorkshopNav />
        <HomeButton />
        <div className="min-h-screen w-full bg-white dark:bg-black overflow-y-auto">
          <div className="relative z-10">
            <WorkshopHero />
            <Separator />
            <WorkshopAccordion />
            <div className="w-[70%] h-[2px] bg-black/40 dark:bg-white/40 my-8 mx-auto"></div>
            <WorkshopCards />
            <div className="w-[70%] h-[2px] bg-black/40 dark:bg-white/40 my-8 mx-auto"></div>
            <WorkshopLogin />
            <div className="w-[70%] h-[2px] bg-black/40 dark:bg-white/40 my-8 mx-auto"></div>
            <WorkshopPricing />
            <Footer />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}