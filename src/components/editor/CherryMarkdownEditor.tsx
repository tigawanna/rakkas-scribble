import { useWindowSize } from "@/utils/hooks/useWindowSize";
// import Cherry from 'cherry-markdown/dist/cherry-markdown.core';
import Cherry from "cherry-markdown";
import { useEffect, useRef } from "react";
import { EditorOptionsPopOver } from "./EditorOptions";
import { CherryTypes } from "./utils/types";

interface CherryMarkdownEditorProps {
  input_string: string;
  cherry_instance?:React.MutableRefObject<Cherry | null>;
  custom_element?: (cherry: Cherry | null) => JSX.Element;
}

export default function CherryMarkdownEditor({
  input_string,
  cherry_instance,
  custom_element,
}: CherryMarkdownEditorProps) {
  const cherry =cherry_instance?? useRef<Cherry | null>(null);
  const { width } = useWindowSize();
  const theme = [
    { className: "default", label: "Default" },
    { className: "dark", label: "dark" },
    { className: "light", label: "light" },
    { className: "green", label: "green" },
    { className: "red", label: "red" },
    { className: "violet", label: "violet" },
    { className: "blue", label: "blue" },
  ];

  const config: Partial<CherryTypes["options"]> = {
    id: "cherry-markdown",
    value: "",
    theme,
    locale: "en_US",
    toolbars: {
      theme: "dark",
      sidebar: ["mobilePreview", "copy", "theme"],
    },
    // fileUpload:(file,callback)=>{
    //     console.log("fileUpload",file)
    // },
    editor: {
      height: "100%",
      defaultModel: width > 850 ? "edit&preview" : "editOnly",
    },
  };
  useEffect(() => {
    if (!cherry.current) {
      cherry.current = new Cherry(config);
      //  how to check for user prefered theme
      if (window&&window.matchMedia("(prefers-color-scheme: dark)").matches) {
        cherry.current?.setTheme("dark");
      } 
      
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
    <div className="w-full  flex">
      <div className="w-fit flex gap-3 items-center justify-end  absolute top-[6%] right-[2%]  z-50">
        {cherry?.current && (
          <EditorOptionsPopOver
            cherry={cherry?.current}
            custom_element={custom_element}
          />
        )}
      </div>
      <div id="cherry-markdown" className="absolute top-[5%] w-full px-2 pr-5" />
    </div>
  );
}
