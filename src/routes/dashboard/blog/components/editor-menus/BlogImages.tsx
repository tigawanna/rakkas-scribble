import { getFileURL } from "@/lib/pb/client";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { Image } from "@unpic/react";
import { Loader, X } from "lucide-react";
import { useState } from "react";
import { useUpdateBlogMutation } from "../useBlogMutation";

interface BlogImagesProps {
input:ScribblePostsResponse
}

export function BlogImages({input}:BlogImagesProps){
const [imgs,setImgs]=useState(input.post_media)
const { update_post_mutation } = useUpdateBlogMutation();
return (
  <div className="w-full flex flex-col items-center justify-center z-50 bg-red-800 gap-5 p-1">
    <div className="w-full  h-full flex  flex-wrap items-center justify-center gap-3">
      {imgs &&
        imgs.map((item) => {
          const img_url = getFileURL({
            collection_id_or_name: "scribble_posts",
            file_name: item,
            record_id: input.id,
          });
          return (
            <div className="relative ">
              <X
                onClick={() => {
                  setImgs((prev) => {
                    if(prev?.length===1){
                      return []
                    }
                    return prev?.filter((val) => val === item);
                  });
                }}
                className="absolute top-[2%] right-[2%]"
              />
              <Image src={img_url} alt={item} layout="fullWidth" className="h-[150px]"/>
            </div>
          );
        })}
    </div>

{(imgs&&imgs?.length>0&&imgs.length!==input.post_media?.length) && <button
      className="btn btn-sm btn-outline"
      onClick={() => {
        update_post_mutation.mutate({
          id: input.id,
          data: { post_media: imgs },
        });
      }}
      disabled={update_post_mutation.isPending}
    >
      Save Updates{" "}
      {update_post_mutation.isPending && <Loader className="animate-spin" />}
    </button>}
  </div>
);
}
