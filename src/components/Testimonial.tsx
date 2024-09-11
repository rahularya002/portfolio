import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import BoxReveal from "./magicui/box-reveal";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatars.githubusercontent.com/u/16860528",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img:   "https://avatars.githubusercontent.com/u/20110627",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatars.githubusercontent.com/u/106103625",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatars.githubusercontent.com/u/59228569",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatars.githubusercontent.com/u/16860528",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatars.githubusercontent.com/u/20110627",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl p-4",
        // light styles
        "bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function TestimonialSection() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900" id="#testimonials">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center h-full space-y-4 text-center mx-auto">
          <BoxReveal boxColor={"#5046e6"} duration={0.3}>
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Testimonials
            </div>
          </BoxReveal>
          <BoxReveal boxColor={"#5046e6"} duration={0.3}>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            What People Says
          </h2>
          </BoxReveal>
          <BoxReveal boxColor={"#5046e6"} duration={0.3}>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
            Check out some of our recent projects and see how we've helped our
            clients succeed.
          </p>
          </BoxReveal>
        </div>

        <Marquee pauseOnHover className="[--duration:20s] py-12">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"
          style={{ zIndex: -1 }}
        ></div>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"
          style={{ zIndex: -1 }}
        ></div>
      </div>
    </section>
  );
}
