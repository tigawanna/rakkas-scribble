import { copytoClipBoard } from "@/utils/helpers/copy-to-clipboard";
import { useWindowSize } from "@/utils/hooks/useWindowSize";
// import Cherry from 'cherry-markdown/dist/cherry-markdown.core';
import Cherry from "cherry-markdown";
import {
  Copy,
  FileEdit,
  GalleryThumbnails,
  Printer,
  SplitSquareHorizontal,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { EditorOptionsPopOver } from "./EditorOptions";


interface CherryMarkdownEditorProps {
  input_string: string;
  custom_element?: (cherry: Cherry | null) => JSX.Element;
}

export default function CherryMarkdownEditor({
  input_string,
  custom_element,
}: CherryMarkdownEditorProps) {
  const cherry = useRef<Cherry | null>(null);
  const { width } = useWindowSize();
  const theme = [
    { className: "default", label: "Default" },
    { className: "dark", label: "dark" },
    { className: "light", label: "light" },
    { className: "green", label: "green" },
    { className: "red", label: "red" },
    { className: "violet", label: "violet" },
    { className: "blue", label: "blue" },
  ]
  useEffect(() => {
    if (!cherry.current) {
      cherry.current = new Cherry({
        id: "cherry-markdown",
        value: "",
        theme,
        locale: "en_US",
        toolbars: {
          sidebar: ["mobilePreview", "copy", "theme"],
        },

        editor: {
   
          height: "100%",
          // theme: "idea",

          // defaultModel The default mode of the editor after initialization. There are three modes: 1. Double column edit preview mode; 2. Pure editing mode; 3. Preview mode
          // edit&preview: Double column edit preview mode
          // editOnly: Pure editing mode (without preview, you can switch to double column or preview mode through toolbar)
          // previewOnly: Preview mode (there is no edit box, the toolbar only displays the "return to edit" button, which can be switched to edit mode through the toolbar)
          defaultModel: width > 850 ? "edit&preview" : "editOnly",
        },
      });
    }
  }, []);
  useEffect(() => {
    const html_as_markdwon = cherry.current?.engine.makeMarkdown(input_string);
    if (html_as_markdwon) {
      cherry.current?.setMarkdown(html_as_markdwon);
      // cherry.current?.setMarkdown(html_as_markdwon);
    }
  }, [cherry.current, input_string]);
  useEffect(() => {
    cherry.current?.switchModel(width > 850 ? "edit&preview" : "editOnly");
  }, [width]);



  return (
    <div className="w-full h-full flex flex-col gap-2 min-h-[400px]">
      <div className="w-fit flex gap-3 items-center justify-end sticky top-[6%]  z-50">
        {cherry?.current&&<EditorOptionsPopOver cherry={cherry?.current} custom_element={custom_element}/>}
      </div>
      <div
        id="cherry-markdown"
        className="w-full h-full theme__blue"
        data-code-block-theme="coy"
      />
    </div>
  );
}
