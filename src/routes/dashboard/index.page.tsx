import { Link, PageProps } from "rakkasjs";
import { Scribbles } from "./scribble/components/Scribbles";
import { ScribbleProfile } from "./components/profile/ScribbleProfile";

export default function DashboardPage({}: PageProps) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-between">
      <ScribbleProfile />
      <div className="flex flex-col">
        <Scribbles />
      </div>
    </div>
  );
}
