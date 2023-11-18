import { Icons } from "@/components/icons/Iconts";
import { ScribbleUserResponse } from "@/lib/pb/db-types";
import {
  getDevtoPostById,
  getDevtoPublishedPosts,
} from "@/lib/scribble/devto/get";
import { tryCatchWrapper } from "@/utils/async";
import { dateToString } from "@/utils/helpers/others";
import { ExternalLink, Heart, MessageSquare, Tags } from "lucide-react";
import { Link, useSSQ } from "rakkasjs";
import { Suspense } from "react";

interface DevToPostProps {
  id: string;
  user: ScribbleUserResponse;
}

export function OneDevToPost({ id, user }: DevToPostProps) {
  const query = useSSQ(async (ctx) => {
    console.log({ key: user?.keys?.devto?.key, id });
    //    return getDevtoPublishedPosts({key:user?.keys?.devto?.key,query:{page:1,per_page:30}})
    return getDevtoPostById({
      path: { id: parseInt(id) },
      key: user?.keys?.devto?.key,
    });
  });
  const data = query.data?.data;
  console.log({ data });
  return (
    <div className="w-full h-full flex flex-col items-center  bg-base-300 p-3 pb-20">
      <div className="flex gap-3 items-center justify-center">
        {/* <h2 className="text-2xl font-bold">DevTo</h2> */}
        <Icons.devto className="w-16 h-full" />
      </div>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <div className="w-full flex flex-col  items-center gap-2 border border-accent rounded-lg p-3">
          <div className="w-full flex justify-between flex-wrap">
            <div className="text-xl ">{data?.title}</div>
            <div className="">
              {data?.reading_time_minutes} {" minute read"}
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex gap-1">
              <Heart />
              {data?.positive_reactions_count}
            </div>
            <div className="flex gap-1">
              <MessageSquare />
              {data?.comments_count}
            </div>
          </div>
          <div className="w-full flex flex-wrap justify-between gap-2">
            <div className="flex gap-2">
              Published
              <div>{dateToString(data?.published_at)}</div>
            </div>
            <div className="flex gap-2">
              Created
              <div>{dateToString(data?.created_at)}</div>
            </div>
          </div>
          <div className="w-full flex items-center gap-2 ">
            <Tags />
            <div className="w-full flex flex-wrap items-center gap-2 ">
              {data?.tags?.map((tag) => (
                <div
                  className="badge badge-outline badge-lg border-accent"
                  key={tag}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex items-center gap-2 ">
            {data?.flare_tag && (
              <div
                style={{
                  backgroundColor: data?.flare_tag.bg_color_hex,
                  color: data?.flare_tag.text_color_hex,
                }}
              >
                {data?.flare_tag.name}
              </div>
            )}
          </div>

          <div className="w-full flex items-center gap-2 ">
            <Link
              href={data?.url}
              target="_blank"
              className="text-sky-300 hover:underline flex gap-3">
              <div className="w-full flex items-center gap-2 ">
                Read on devTo
              </div>
              <ExternalLink className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
