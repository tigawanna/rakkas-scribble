import { Link, PageProps } from "rakkasjs";
import { useOneScribble } from "./components/utils/query";
import { PBTimeStamp } from "@/lib/pb/components/PBTimestamp";
import { ScribbleCardOptions } from "./components/card/ScribbleCardOptions";
import { statusColor } from "./components/utils/helpers";
import { useFormHook } from "@/components/form/useForm";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { randomImageURL } from "@/utils/helpers/others";
import { ScribbleDetailsModal } from "./components/modals/ScribbleDetailsModal";
import { OneDevToPost } from "./components/devto/OneDevToPost";
import { useUser } from "@/lib/rakkas/hooks/useUser";
import { Suspense } from "react";

export default function OneScribblePage({ params }: PageProps) {
  const { user } = useUser();
  const { query } = useOneScribble(params.id);
  const data = query.data?.data;
  const img_url = data?.main_post_image_url;

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
      main_post_image_url: randomImageURL(data?.main_post_image_url),
      last_published_at: data?.last_published_at,
      post_media: data?.post_media,
      publishingDetails: data?.publishingDetails,
      status: data?.status,
      tags: data?.tags,
      user_id: data?.user_id,
    },
  });
  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      {/* top secition  */}

      <div className="w-full h-full">
        <img
          className="w-full aspect-video object-cover h-[200px]"
          src={img_url}
        />
        <div className="flex flex-col justify-between  p-3">
          <div className="flex flex-col p-1 gap-4">
            <div className="text-7xl font-bold ">{data?.title}</div>
            <p className="">{data?.description}</p>
            <div className="text-lg w-full ">{data?.series}</div>
            {data && (
              <ScribbleDetailsModal
                scribble={data}
                input={input}
                setInput={setInput}
              />
            )}
          </div>

          <div className="border-t border-t-accent ">
            <div className="w-full flex justify-between p-1">
              <div className={statusColor(data?.status)}>{data?.status}</div>
              {data && <ScribbleCardOptions post={data} />}
            </div>
            {data && <PBTimeStamp timestamp={data?.created} label="Created" />}
          </div>
        </div>
      </div>
      {/* devto article status */}

      {data?.publishers?.devto?.id && (
        <OneDevToPost
          id={data?.publishers?.devto?.id}
          user={user}
          scribble={data}
        />
      )}
    </div>
  );
}
