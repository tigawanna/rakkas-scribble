import { getFileURL } from "@/lib/pb/client";
import { PBTimeStamp } from "@/lib/pb/components/PBTimestamp";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { ExternalLink } from "lucide-react";
import { Link } from "rakkasjs";
import { ScribbleCardOptions } from "./ScribbleCardOptions";

interface ScribbleListCardProps {
  post: ScribblePostsResponse;
}

export function ScribbleListCard({ post }: ScribbleListCardProps) {
  const img_url = post.main_post_image_url
function statusColor(status:typeof post.status){
switch(status){
  case "DRAFT":
    return "text-sm text-accent";
  case "PUBLISHED":
    return "text-sm text-success";
  case "REPUBLISHED":
    return "text-sm text-info";
  case "SCHEDULED":
    return "text-sm text-warning"; 
  default :
    return "text-sm";     
}
}
  return (
    <li
      key={post.id}
      className="border border-accent flex flex-col justify-between  shadow hover:brightness-95
      rounded-lg h-[400px] w-[90%] sm:w-[45%] lg:w-[30%] "
    >
      <img
        className="w-full aspect-video object-cover h-[200px]"
          src={img_url}
      />
      <div className="flex flex-col justify-between  p-3">
        <div className="flex flex-col p-1 gap-1">
          <div className="text-3xl font-bold line-clamp-1">{post.title}</div>
          <p className="text-sm line-clamp-3">{post.description}</p>
          <div className="text-lg w-full ">{post.series}</div>
        </div>

        <div className="border-t border-t-accent ">
          <div className="w-full flex justify-between p-1">
            <div className={statusColor(post.status)}>{post.status}</div>
            <ScribbleCardOptions post={post}/>
          </div>
          <PBTimeStamp timestamp={post.created} label="Created" />
        </div>
      </div>
    </li>
  );
}
