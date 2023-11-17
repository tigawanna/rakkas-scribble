import { getFileURL } from "@/lib/pb/client";
import { PBTimeStamp } from "@/lib/pb/components/PBTimestamp";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { ExternalLink } from "lucide-react";
import { Link } from "rakkasjs";

interface ScribbleListCardProps {
  post: ScribblePostsResponse;
}

export function ScribbleListCard({ post }: ScribbleListCardProps) {
  const img_url = import.meta.env.DEV
    ? post.main_post_image_url
    : getFileURL({
        collection_id_or_name: "scribble_posts",
        file_name: post.main_post_image,
        record_id: post.id,
      })
  return (
    <li
      key={post.id}
      className="border border-accent flex flex-col justify-between shadow-accent shadow hover:shadow-sm
      rounded-lg h-[400px] w-[90%] sm:w-[45%] lg:w-[30%] "
    >
      <img
        className="w-full aspect-video object-cover h-[200px]"
          src={img_url}
      />
      <div className="flex flex-col justify-between  p-3">
        <div className="flex flex-col">
          <div className="text-3xl font-bold">{post.title}</div>
          <p className="text-sm line-clamp-3">{post.description}</p>
          <div className="text-lg w-full ">{post.series}</div>
        </div>

        <div className="border-t border-t-accent ">
          <div className="flex justify-between">
            <Link
              target="_blank"
              href={post.publishers?.devto?.url}
              className="text-sm text-info hover:text-info/50"
            >
              <div className="flex gap-2 p-1">
                open post in devto <ExternalLink className="w-4 h-4" />
              </div>
            </Link>
            <Link
              href={"/dashboard/scribble/" + post.id}
              className="text-sm text-info hover:text-info/50"
            >
              <div className="flex gap-2 p-1">
                View post <ExternalLink className="w-4 h-4" />
              </div>
            </Link>
          </div>
          <PBTimeStamp timestamp={post.created} label="Created" />
        </div>
      </div>
    </li>
  );
}
