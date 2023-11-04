import { Spinner } from "@/components/navigation/loaders/Spinner";
import { ClientSuspense } from "rakkasjs";
import { lazy } from "react";


const CherryMarkdownEditor = lazy(
  () => import("@/components/editor/CherryMarkdownEditor"),
);

interface MainEditorProps {
  getEditorContent: (letter: string) => void;
  input: string;
  updating?: boolean;
}

export function MainEditor({
  input,
  updating,
  getEditorContent,
}: MainEditorProps) {
  return (
    <div className="flex flex-col h-full w-full items-center   gap-1 ">
      <ClientSuspense fallback={<Spinner size="100px" />}>
        <div
          className="flex min-h-[300px] flex-col h-full items-center justify-center 
            gap-1 w-full 
            max-w-[95%] "
        >
          <CherryMarkdownEditor
            input_string={input}
            // custom_element={(cherry: Cherry | null) => {
            //   return (
            //     <CoverLetterEditorControls
            //     cherry={cherry}
            //     application_input={application_input}
            //     updating={updating}
            //     setCoverLetter={setCoverLetter}
            //   />
            //   );
            // }}
          />
        </div>
      </ClientSuspense>
    </div>
  );
}
