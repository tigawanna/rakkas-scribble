import { PageProps} from "rakkasjs"
import { ScribbleEditor } from "./components/ScribbleEditor";


export default function EditScribblePage({params}:PageProps) {
   return (
    <div className="w-full flex flex-col h-screen ">
        <ScribbleEditor scribble_id={params.id} />
      </div>
);}
