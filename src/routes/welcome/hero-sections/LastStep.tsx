import { Link } from "rakkasjs";
import { Footer } from "./Footer";

interface LastStepProps {}

export function LastStep({}: LastStepProps) {
  return (
    <div className="w-full  h-full flex-col flex items-center justify-between">
      <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
          <Link href="/dashboard" className="btn btn-outline">
            Get Started
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
