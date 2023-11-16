import { PageProps } from "rakkasjs";
import { Scribbles } from "./components/Scribbles";
export default function ScribblePage({}: PageProps) {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      <Scribbles />
    </div>
  );
}
