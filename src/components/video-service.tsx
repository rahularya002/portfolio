import ExpandableCardDemoGrid from "./blocks/expandable-card-demo-grid";

export default function VideoService() {
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
          <div className="inline-flex items-center justify-center px-4 py-1 transition ease-out rounded-sm hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Our Videos</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mx-auto">
              Elevating Your Digital Presence
            </h2>
          </div>
          <div>
            <p className="max-w-[900px] text-muted-foreground text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl mx-auto">
              From web development to mobile apps, UX/UI design, ad films with AI, short movie production, and
              digital marketing, we've got you covered.
            </p>
          </div>
        </div>
        <div className="flex mx-auto my-12">
          <ExpandableCardDemoGrid />
        </div>
      </div>
    </section>
  );
}
