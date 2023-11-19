import { Icons } from "@/components/icons/Iconts";
import { ScribbleUserResponse } from "@/lib/pb/db-types";
import { getDevtoPostById} from "@/lib/scribble/devto/get";
import { dateToString } from "@/utils/helpers/others";
import { ExternalLink, Heart, Loader, MessageSquare, Tags } from "lucide-react";
import { Link, useSSM, useSSQ } from "rakkasjs";
import { Suspense } from "react";

interface DevToPostProps {
  id: string;
  user: ScribbleUserResponse;
}

export function OneDevToPost({ id, user }: DevToPostProps) {
//   const unpublish_mutation = useSSM(async (ctx) => {
//     console.log({ key: user?.keys?.devto?.key, id });
//     return devtoUnpublishArticle({
//       key: user?.keys?.devto?.key,
//       path: { id: parseInt(id) },
//     });
//   },{onSuccess(data) {
//     console.log(" UNPULISH MUTATION RESPONSE  === ", { data });
//   },})   
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
          <div className="w-full min-h-[200px] flex items-center justify-between p-2 gap-2">
            <div className="w-[40%] h-44 rounded-lg  animate-pulse bg-base-100"></div>
            <div className="w-full  flex flex-col items-center justify-center gap-2">
              <div className="w-full h-10  flex rounded-lg skeleton animate-pulse bg-base-100"></div>
              <div className="w-full h-10  flex rounded-lg animate-pulse bg-base-100"></div>
              <div className="w-full h-10 flex rounded-lg animate-pulse bg-base-100"></div>
              <div className="w-full h-10 flex rounded-lg animate-pulse bg-base-100"></div>
            </div>
          </div>
        }
      >
        <div className="w-full flex flex-col  items-center gap-2 border border-accent rounded-lg p-3">
          <div className="w-full flex justify-between flex-wrap">
            <div className="text-4xl font-bold">{data?.title}</div>
            <div className="">
              {data?.reading_time_minutes} {" minute read"}
            </div>
          </div>
          {/* start of row 1 */}
          <div className="w-full flex items-center justify-between">
            <div className="flex gap-1">
              positive reactions
              <Heart className="text-red-500" />
              {data?.positive_reactions_count}
            </div>
            <div className="flex gap-1">
              total reactions
              <Heart />
              {data?.public_reactions_count}
            </div>
            <div className="flex gap-1">
              replies
              <MessageSquare />
              {data?.comments_count}
            </div>
          </div>
          {/* end of row 1 */}

          {/* start of row 2 */}
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
          {/* end of row 2 */}

          {/* start of row 3 */}
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
          {/* end of row 3 */}

          {/* start of row 4 */}
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
          {/* end of row-4 */}
          {/* start of row 5 */}
          <div className="w-full flex items-center justify-between gap-2 ">
            <Link
              href={data?.url}
              target="_blank"
              className="text-sky-300 hover:underline flex gap-3"
            >
              <div className="w-full flex items-center gap-2 ">
                Read on devTo
              </div>
              <ExternalLink className="w-6 h-6" />
            </Link>
            {/* <button onClick={() => unpublish_mutation.mutate()} 
            disabled={unpublish_mutation.isLoading}
             className="btn btn-sm">
                Unpublish {unpublish_mutation.isLoading && <Loader className="animate-spin h-4 w-4"/>}
            </button> */}
          </div>
          {/* end of row 5 */}
        </div>
      </Suspense>
    </div>
  );
}
