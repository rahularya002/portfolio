
import WorkshopNav from "@/components/component/workshop-nav";
import ThemeProvider from "@/utils/ThemeProvider";
import Footer from "@/components/Footer";
import SignupFormDemo from "@/components/example/signup-form-demo";


export default function Workshop() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WorkshopNav />
      
        <div className="flex justify-center items-center h-[85vh]">
            <SignupFormDemo />
        </div>
      <Footer />
    </ThemeProvider>
  );
}