import { useFormHook } from "@/components/form/useForm";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/async";
import Cherry from "cherry-markdown";
import { ClientSuspense, usePageContext } from "rakkasjs";
import { lazy, useRef } from "react";
import { EditorOptions } from "./EditorOptions";
import { Spinner } from "@/components/navigation/loaders/Spinner";
import { useQuery } from "@tanstack/react-query";
import { Tags } from "lucide-react";
import { isString } from "@/utils/helpers/string";
import { ScribbleDetailsModal } from "./modals/ScribbleDetailsModal";
import { randomImageURL } from "@/utils/helpers/others";

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
      main_post_image_url:randomImageURL(data?.main_post_image_url),
      last_published_at: data?.last_published_at,
      post_media: data?.post_media,
      publishingDetails: data?.publishingDetails,
      status: data?.status,
      tags: data?.tags,
      user_id: data?.user_id,
    },
  });

  return (
    <div className="w-full h-full flex justify-center items-center">
      <ClientSuspense fallback={<Spinner size="100px" />}>
        <div className="w-full min-h-screen h-full flex flex-col justify-between gap-2 relative">
          <div className="absolute top-[1%] left-[2%] right-[2%] flex flex-col ">
            <div className="relative  flex flex-col h-full card w-full bg-base-100 shadow-xl image-full ">
              <div className="absolute z-40 top-[5%] right-[5%]">
                {data && (
                  <ScribbleDetailsModal
                    scribble={data}
                    input={input}
                    setInput={setInput}
                  />
                )}
              </div>
              <figure>
                <img src={input?.main_post_image_url} alt={input?.title} />
              </figure>

              <div className="absolute  flex flex-col z-40 gap-5">
                <h2 className="text-4xl md:text-7xl font-bold">
                  {input?.title}
                </h2>
                {/* <p className="text-sm line-clamp-2 md:max-w-[90%] font-sans text-accent-content">
                  {input.description}
                </p> */}

                <div className="w-fit flex  gap-2 bg-base-300 rounded-lg">
                  <Tags />
                  <div className="w-full flex flex-wrap gap-2">
                    {input?.tags?.split(",").map((tag) => (
                      <div
                        className="text-sm border-b-4 border-accent  px-2  m-1"
                        key={tag}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                  {isString(input?.series) && (
                    <div className="w-full flex  gap-2">
                      Series {input?.series}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-[20%] w-full h-full">
            <div className="w-full h-full flex ">
              <CherryMarkdownEditor
                input={input}
                cherry_instance={cherry}
                input_string={input.content ?? ""}
              />
            </div>
          </div>
          <div className="flex flex-col  gap-1  fixed bottom-[10%] right-[7%] z-50">
            <EditorOptions
              scribble={data}
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
