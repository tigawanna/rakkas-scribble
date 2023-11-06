import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,

  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";
import { Button } from "@/components/shadcn/ui/button";
import { getFileURL } from "@/lib/pb/client";
import { ImageIcon, Loader, X } from "lucide-react";
import { useState } from "react";
import { useUpdateBlogMutation } from "./useBlogMutation";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { Image } from "@unpic/react";

interface BlogImagesmodalProps {
  input: ScribblePostsResponse;
}

export function BlogImagesmodal({input}: BlogImagesmodalProps) {
    const [imgs, setImgs] = useState(input.post_media);
    const { update_post_mutation} = useUpdateBlogMutation();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* <Button className="btn btn-outline btn-sm"> </Button> */}
        <button
          className="md:tooltip hover:md:tooltip-open md:tooltip-top"
          data-tip="sort images"
        >
          <ImageIcon className="w-7 h-7 " />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="">
        <div className="w-full  h-full flex  flex-wrap items-center justify-center gap-3">
          {imgs &&
            imgs.map((item, idx) => {
              const img_url = getFileURL({
                collection_id_or_name: "scribble_posts",
                file_name: item,
                record_id: input.id,
              });
              return (
                <div className="relative " key={item + idx}>
                  <X
                    onClick={() => {
                      setImgs((prev) => {
                        if (prev?.length === 1) {
                          return [];
                        }
                        return prev?.filter((val) => val === item);
                      });
                    }}
                    className="absolute top-[2%] right-[2%]"
                  />
                  <Image
                    src={img_url}
                    alt={item}
                    layout="fullWidth"
                    className="h-[150px] border border-accent rounded-lg"
                  />
                </div>
              );
            })}
        </div>
        <div className="text-lg">
          <h2>{imgs?.length} Images</h2>
          <p className="text-xs font-mono text-warning-content">
            Note:Remove all the deleteed inage links from your post after
            deleting the images
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {imgs && imgs.length !== input.post_media?.length && (
            <Button
              className="btn btn-sm btn-outline"
              onClick={() => {
                update_post_mutation.mutate({
                  id: input.id,
                  data: { post_media: imgs },
                });
              }}
              disabled={update_post_mutation.isPending}
            >
              {imgs.length === 0 ? "Delete all images" : "Save Changes"}{" "}
              {update_post_mutation.isPending && (
                <Loader className="animate-spin" />
              )}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
