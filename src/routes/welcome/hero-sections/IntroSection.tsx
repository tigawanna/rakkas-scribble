import { Image } from "@unpic/react";
import { Link } from "rakkasjs";

interface IntroSectionProps {}

export function IntroSection({}: IntroSectionProps) {
  return (
    <section className="w-full h-full flex min-h-screen justify-start items-start">
      <div className="w-full flex flex-col p-5 sm:p-6 sm:mx-auto  lg:flex-row lg:justify-between gap-5">
        <div className="flex min-h-[450px] flex-col justify-center sm:p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left gap-1">
          <h1 className="text-8xl font-bold sm:text-8xl">Scribble</h1>
          <p className="text-3xl  text-accent">Write one , Publish many</p>
          <p className="mt-6 mb-8  font-normal sm:text-lg sm:mb-12">
            Scribble is a powerful rich text editor that is powered by Markdown.
            It has cross publishing features, so you can publish your writing to
            multiple platforms with just a few clicks. Scribbla also has
            built-in AI rewrite features .
            <br />
          </p>

          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <Link href="/editor" className="btn btn-outline">
              Get Started
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-[40%] h-[40%] lg:h-full  flex items-center justify-center ">
          <Image
            src="svg/typewriter.svg"
            alt="hero business page"
            layout="fullWidth"
            className="object-contain w-full max-h-[70%]"
          />
        </div>
      </div>
    </section>
  );
}
