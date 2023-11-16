import { useFormHook } from "@/components/form/useForm";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/async";
import Cherry from "cherry-markdown";
import { ClientSuspense, usePageContext } from "rakkasjs";
import { lazy, useRef } from "react";

import { EditorOptions } from "./EditorOptions";
import { Spinner } from "@/components/navigation/loaders/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useUpdateScribbleMutation } from "./hooks";

const CherryMarkdownEditor = lazy(
  () => import("@/components/editor/CherryMarkdownEditor"),
);

interface ScribbleEditorProps {
  scribble_id: string;
}

export function ScribbleEditor({ scribble_id }: ScribbleEditorProps) {
  const page_ctx = usePageContext();
  const cherry = useRef<Cherry | null>(null);
  const query = useQuery({
    queryKey: ["scribble_posts", scribble_id],
    queryFn: async () => {
      return tryCatchWrapper(
        page_ctx.locals.pb?.collection("scribble_posts").getOne(scribble_id),
      );
    },
  });


  const data = query.data?.data;
  const { input, setInput } = useFormHook<Partial<ScribblePostsResponse>>({
    initialValues: {
      id: data?.id!,
      content: data?.content,
      title: data?.title,
      publishers: data?.publishers,
      main_post_image: data?.main_post_image,
      description: data?.description,
      published_at: data?.published_at,
      series: data?.series,
      main_post_image_url:data?.main_post_image_url ?? "https://picsum.photos/500/900",
      last_published_at: data?.last_published_at,
      post_media: data?.post_media,
      publishingDetails: data?.publishingDetails,
      status: data?.status,
      tags: data?.tags,
      user_id: data?.user_id,
    },
  });
  const { update_post_mutation } = useUpdateScribbleMutation(data?.id!);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ClientSuspense fallback={<Spinner size="100px" />}>
        <div
          className="w-full min-h-screen h-full flex flex-col justify-between 
        gap-3 relative"
        >
          <div className="absolute top-[2%] left-[2%] right-[2%] flex flex-col md:flex-row md:justify-between md:items-center">
            <h2 className="text-2xl md:text-5xl font-bold ">{input?.title}</h2>
          </div>

          <div className="absolute top-[7%] w-full h-full">
            <div className="w-full h-full flex r">
              <CherryMarkdownEditor
                input={input}
                cherry_instance={cherry}
                input_string={input.content ?? ""}
              />
            </div>
          </div>
          <div className="flex flex-col  gap-1  fixed bottom-[10%] right-[7%] z-50">
            <EditorOptions
              scribble_id={data?.id!}
              update_post_mutation={update_post_mutation}
              cherry={cherry}
              input={input}
              setInput={setInput}
            />
          </div>
        </div>
      </ClientSuspense>
    </div>
  );
}
