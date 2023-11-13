import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { changeTheme } from "./config";
import Cherry from "cherry-markdown";
import { copytoClipBoard } from "@/utils/helpers/copy-to-clipboard";
import {
  Printer,
  Copy,
  SplitSquareHorizontal,
  FileEdit,
  GalleryThumbnails,
  Option,
  MoreVertical,
} from "lucide-react";

interface EditorOptionsPopOverProps {
  cherry: Cherry;
  custom_element: ((cherry: Cherry | null) => JSX.Element) | undefined;
}

export function EditorOptionsPopOver({
  cherry,
  custom_element,
}: EditorOptionsPopOverProps) {
  const theme = [
    { className: "default", label: "Default" },
    { className: "dark", label: "dark" },
    { className: "light", label: "light" },
    { className: "green", label: "green" },
    { className: "red", label: "red" },
    { className: "violet", label: "violet" },
    { className: "blue", label: "blue" },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="bg-base-100 rounded-lg">
          <MoreVertical />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="w-ful h-full bg-base-200">
          <div className="w-full flex flex-col gap-3">
            <div className=" flex gap-2  p-1 m-0 ">
              {theme.map((item) => {
                return (
                  <button
                    key={item.className}
                    className="md:tooltip hover:md:tooltip-open md:tooltip-top text-xs font-normal rounded-full hover:text-accent"
                    type="button"
                    data-tip={item.label}
                    about={item.label}
                    onClick={(e) => {
                      e.stopPropagation();
                      changeTheme(item.className, cherry);
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div className="w-full flex flex-wrap gap-3 items-center">
              <div className="flex flex-wrap gap-3 items-center">
                {custom_element && custom_element(cherry)}
              </div>
              <button
                className="md:tooltip hover:md:tooltip-open md:tooltip-top text-xs font-normal rounded-full hover:text-accent "
                about={"print content"}
                data-tip={"print content"}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  cherry.export("pdf", "resume.md");
                }}
              >
                <Printer className="w-5 h-5" />
              </button>
              <button
                className="md:tooltip hover:md:tooltip-open md:tooltip-top text-xs font-normal rounded-full hover:text-accent"
                about={"copy to clipboard"}
                data-tip={"copy to clipboard"}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const markdown = cherry?.getMarkdown();
                  if (markdown) {
                    copytoClipBoard(markdown);
                  }
                }}
              >
                <Copy className="w-5 h-5" />
              </button>

              <button
                className="md:tooltip hover:md:tooltip-open md:tooltip-top text-xs font-normal rounded-full hover:text-accent"
                type="button"
                about={"editor,preview split-view"}
                data-tip={"editor,preview split-view"}
                onClick={(e) => {
                  e.stopPropagation();
                  cherry.switchModel("edit&preview");
                }}
              >
                <SplitSquareHorizontal className="h-5 w-5" />
              </button>

              <button
                className="md:tooltip hover:md:tooltip-open md:tooltip-top text-xs font-normal hover:text-accent"
                type="button"
                data-tip="editor only view"
                about="editor only view"
                onClick={(e) => {
                  e.stopPropagation();
                  cherry.switchModel("editOnly");
                }}
              >
                <FileEdit className="h-5 w-5" />
              </button>

              <button
                className="md:tooltip hover:md:tooltip-open md:tooltip-top text-xs font-normal hover:text-accent"
                type="button"
                about="preview only view"
                data-tip="preview only view"
                onClick={(e) => {
                  e.stopPropagation();
                  cherry.switchModel("previewOnly");
                }}
              >
                <GalleryThumbnails className="h-5 w-5" />
              </button>
            </div>
            {/* <button onClick={() => changeTheme(cherry?.current, "red")}>red</button> */}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
