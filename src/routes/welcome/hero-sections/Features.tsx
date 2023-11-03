import { Columns, Globe, Sparkles } from "lucide-react";
interface FeaturesProps {}

export function Features({}: FeaturesProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <h3 className="text-3xl">Features</h3>
      <div className="w-full h-full  flex flex-wrap items-center justify-center">
        <div className="h-full flex items-center justify-center p-3 gap-2">
          <Sparkles />
          <p className="">Rewirite with AI toup your game</p>
        </div>
        <div className="w-full h-full flex items-center justify-center p-3 gap-2">
          <Columns />
          <p className="">Split view / Edit only /Preview only modes</p>
        </div>
        <div className="h-full flex items-center justify-center gap-2">
          <Globe />
          <p className="">Cross publish with ease</p>
        </div>
        h
      </div>
    </div>
  );
}
