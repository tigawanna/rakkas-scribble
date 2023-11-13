import { getFileURL } from "@/lib/pb/client";
import { PBTimeStamp } from "@/lib/pb/components/PBTimestamp";
import { tryCatchWrapper } from "@/utils/async";
import { ExternalLink } from "lucide-react";
import { Link, PageProps, useSSQ } from "rakkasjs";
export default function ScribblesPage({}: PageProps) {
  const query = useSSQ(async (ctx) => {
    return tryCatchWrapper(
      ctx.locals.pb?.collection("scribble_posts").getList(1, 10),
    );
  });
  const posts = query.data?.data?.items;
  return (
    <div className="w-full h-full min-h-screen flex  ">
      <div className="w-full h-full flex items-center ">
        <ul className="w-full h-full flex flex-wrap p-3">
          {posts?.map((post) => {
            return (
              <li
                key={post.id}
                className="whitespace-nowrap border border-accent 
               p-1 rounded-lg w-[90%] sm:w-[45%] lg:w-[30%]"
              >
                <img
                  className="w-full aspect-video object-cover"
                  src={getFileURL({
                    collection_id_or_name: "scribble_posts",
                    file_name: post.main_post_image,
                    record_id: post.id,
                  })}
                />
                <div className="text-3xl font-bold">{post.title}</div>
                <div className="text-lg">{post.description}</div>
                <div className="text-lg">{post.series}</div>
                <div className="w-full flex justify-between">
                  <Link
                    target="_blank"
                    href={post.devToBlogUrl}
                    className="text-sm text-sky-700 hover:text-sky-500"
                  >
                    <div className="flex gap-2 p-1">
                      open post in devto <ExternalLink className="w-4 h-4" />
                    </div>
                  </Link>
                  <Link
                    href={"/scribble/" + post.id}
                    className="text-sm text-sky-700 hover:text-sky-500"
                  >
                    <div className="flex gap-2 p-1">
                      View post <ExternalLink className="w-4 h-4" />
                    </div>
                  </Link>
                </div>
                <div className="text-sm ">
                  <PBTimeStamp timestamp={post.created} label="Created" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
