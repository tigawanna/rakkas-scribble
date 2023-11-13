import { IntroSection } from "./hero-sections/IntroSection";
import { LastStep } from "./hero-sections/LastStep";
import { Features } from "./hero-sections/Features";

interface WelcomePageProps {}

export function WelcomeSection({}: WelcomePageProps) {
  return (
    <div className="w-full h-full min-h-screen bg-base-300 text-base-content">
      <IntroSection />
      {/* <DescriptionBulletPoints/> */}
      <Features />
      <LastStep />
    </div>
  );
}
