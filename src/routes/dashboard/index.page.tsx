import { PageProps } from "rakkasjs";
import { Scribbles } from "./scribble/components/Scribbles";

import { ProfileComponenst } from "./components/profile/ProfileComponent";

export default function DashboardPage({}: PageProps) {

  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-between">
      <ProfileComponenst/>
      <div className="flex flex-col p-5">
        </div>
      <Scribbles page_size={4} show_search={false}/>
    </div>
  );
}
