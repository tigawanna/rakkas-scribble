import { useFormHook } from "@/components/form/useForm";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/async";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { PageProps, usePageContext } from "rakkasjs"
import { PublishToDevto } from "./components/PublishToDevto";
export default function PublishScribblePage({params}:PageProps) {
const page_ctx = usePageContext();
const scribble_id = params.id;
  const query = useSuspenseQuery({
    queryKey: ["scribble", scribble_id],
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
      contentMarkdown: data?.contentMarkdown,
      publishers: data?.publishers,
      main_post_image: data?.main_post_image ?? "https://picsum.photos/500/900",
      description: data?.description,
      published_at: data?.published_at,
      series: data?.series,
     last_published_at: data?.last_published_at,
     post_media: data?.post_media,
      publishingDetails: data?.publishingDetails,
      status: data?.status,
      tags: data?.tags,
      user_id: data?.user_id,
     main_post_image_url: data?.main_post_image_url,
    },
  });

if(!data){
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
        <div className="text-warning text-lg ">
            No matches found for scribble id {scribble_id}
        </div>
    </div>
    )
}

return (
<div className="w-full h-full min-h-screen flex flex-wrap  items-center justify-center p-5">
    <div className="w-[90%]">
        <PublishToDevto input={input} setInput={setInput} scribble={data}/>
    </div>
</div>
)}