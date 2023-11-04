import { PageProps } from "rakkasjs"
import { useState } from "react";
import { MainEditor } from "./components/MainEditor";
export default function NewBlogPage({}:PageProps) {
  const [input, setInput] = useState(`
Job Title: Web Developer`);
  return (
    <div
      className="w-full h-full min-h-screen flex items-center justify-center ">
    <div
      className="w-full h-full min-h-screen flex items-center justify-center fixed top-[5%]">
      <MainEditor input={input} getEditorContent={setInput} />
    </div>
    </div>
  );
}
