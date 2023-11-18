import { Link, PageProps } from "rakkasjs";
import { Scribbles } from "./scribble/components/Scribbles";


export default function DashboardPage({}: PageProps) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-between">
      <Scribbles show_profile={false} />
    </div>
  );
}
