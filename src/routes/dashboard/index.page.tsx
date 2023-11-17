import { Link, PageProps } from "rakkasjs";
import { Scribbles } from "./scribble/components/Scribbles";
import { ScribbleProfile } from "./components/profile/ScribbleProfile";

export default function DashboardPage({}: PageProps) {
 return (
    <div className="w-full h-full min-h-screen flex flex-col justify-between">
   <ScribbleProfile/>
      <div className="flex p-5">
      <Scribbles page_size={4} show_search={false}/>
        <Link href="/dashboard/scribble" className="w-fit btn btn-sm hover-:text-accent">
          load more 
          </Link>
      S</div>
    </div>
  );
}
