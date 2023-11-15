import { PageProps } from "rakkasjs"
import { ScribbleUser } from "./components/dashboard/ScribbleUser"
import { Scribbles } from "./scribble/components/Scribbles"
export default function DashboardPage({}:PageProps) {
return (
<div className="w-full h-full min-h-screen flex flex-col ">
{/* <div className="w-full h-full flex  ">
    <ScribbleUser/>
</div> */}
<Scribbles/>
</div>
)}
