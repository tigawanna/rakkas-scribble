import { readmeStringToHtml } from "@/utils/helpers/gfm-parse/mdToGFMhtml";

interface RenderMarkdownAsGFMHTMLProps {
  markdown: string;
}

export function RenderMarkdownAsGFMHTML({
  markdown,
}: RenderMarkdownAsGFMHTMLProps) {
  const innerHTML = readmeStringToHtml(markdown);
  return (
    <iframe
      sandbox=""
      allowFullScreen
      className="w-full h-full min-h-screen"
      srcDoc={innerHTML}
    />
  );
}
