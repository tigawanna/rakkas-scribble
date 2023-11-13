import { CherryTypes } from "@/components/editor/utils/types";
import Cherry from "cherry-markdown";
import { useEffect, useRef } from "react";

interface PageMarkdownProps {
  value?: string;
}

export default function PageMarkdown({ value }: PageMarkdownProps) {
  const theme = [
    { className: "default", label: "Default" },
    { className: "dark", label: "dark" },
    { className: "light", label: "light" },
    { className: "green", label: "green" },
    { className: "red", label: "red" },
    { className: "violet", label: "violet" },
    { className: "blue", label: "blue" },
  ];
  const cherry = useRef<Cherry | null>(null);
  const config: Partial<CherryTypes["options"]> = {
    id: "cherry-markdown",
    value: value ?? "",
    theme,
    locale: "en_US",
    toolbars: {
      theme: "dark",
      showToolbar: false,
    },
    editor: {
      height: "100%",
      defaultModel: "previewOnly",
    },
  };
  useEffect(() => {
    if (!cherry.current) {
      cherry.current = new Cherry(config);
      //  how to check for user prefered theme
      if (window && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        cherry.current?.setTheme("dark");
      }
    }
  }, []);
  return <div id="cherry-markdown" />;
}
