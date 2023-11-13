import { useWindowSize } from "@/utils/hooks/useWindowSize";
// import Cherry from 'cherry-markdown/dist/cherry-markdown.core';
import Cherry from "cherry-markdown";
import { useEffect, useRef } from "react";
import { CherryTypes } from "./utils/types";
import { usePageContext } from "rakkasjs";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { getFileURL } from "@/lib/pb/client";
import { extraOptions } from "@/routes/dashboard/blog/components/editor-menus/Toobarmenus";

interface CherryMarkdownEditorProps {
  input_string: string;
  post: ScribblePostsResponse;
  cherry_instance?: React.MutableRefObject<Cherry | null>;
  custom_element?: (cherry: Cherry | null) => JSX.Element;
}

export default function CherryMarkdownEditor({
  post,
  input_string,
  cherry_instance,
  custom_element,
}: CherryMarkdownEditorProps) {
  const page_ctx = usePageContext();
  const cherry = cherry_instance ?? useRef<Cherry | null>(null);
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
      customMenu: {
        extra: extraOptions,
      },

      toolbar: [
        "bold",
        "italic",
        "strikethrough",
        "|",
        "color",
        "header",
        "|",
        "list",

        {
          insert: [
            "image",
            "audio",
            "video",
            "link",
            "hr",
            "br",
            "code",
            "formula",
            "toc",
            "table",
            "line-table",
            "bar-table",
            "pdf",
            "word",
          ],
        },
        "graph",
        "settings",
      ],

      sidebar: ["mobilePreview", "copy", "theme", "extra"],
      toolbarRight: ["fullScreen", "export"],
    },

    fileUpload: (file, callback) => {
      console.log("aftre change");
      page_ctx.locals.pb
        ?.collection("scribble_posts")
        .update(post.id, {
          // @ts-expect-error
          post_media: post.post_media ? [...post.post_media, file] : [file],
        })
        .then((res) => {
          console.log("res url === ", res.post_media);
          if (res.post_media) {
            const latest_file = res.post_media[res.post_media.length - 1];
            const post_media_url = getFileURL({
              collection_id_or_name: "scribble_posts",
              file_name: latest_file,
              record_id: post.id,
            });
            // console.log({post_media_url})
            callback(post_media_url, {
              name: latest_file,
            });
          }
        })
        .catch((err) => console.log(err));
      // callback("")
    },
    editor: {
      height: "100%",
      defaultModel: width > 850 ? "edit&preview" : "editOnly",
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
    <div className="w-full  flex  items-center justify-center">
      {/* <div className="w-fit flex gap-3 items-center justify-end  absolute top-[6%] right-[2%]  z-50">
        {cherry?.current && (
          <EditorOptionsPopOver
            cherry={cherry?.current}
            custom_element={custom_element}
          />
        )}
      </div> */}

      {/* <div
        className="bg-pink-600 h-fit min-h-[300px] rounded-lg min-w-[300px] w-fit absolute 
            top-[15%] bottom-[5%] right-[7%] z-50 flex justify-center items-center"
      >
        middle
      </div> */}

      <div
        id="cherry-markdown"
        className="absolute top-[5%] w-full px-2 pr-5 z-40"
      />
    </div>
  );
}
