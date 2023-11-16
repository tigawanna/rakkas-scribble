import { PageProps } from "rakkasjs"
import { ScribbleEditor } from "./components/ScribbleEditor";
export default function OneScribblePage({params}:PageProps) {
return (
  <div className="w-full h-full min-h-screen flex items-center justify-center">
    <ScribbleEditor scribble_id={params.id} />
  </div>
);}
