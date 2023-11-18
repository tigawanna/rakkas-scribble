import { PageProps, useLocation } from "rakkasjs";
import { ScribbleEditor } from "../components/ScribbleEditor";



export default function OneScribblePage({ params }: PageProps) {

  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      <ScribbleEditor scribble_id={params.id} />
    </div>
  );
}
