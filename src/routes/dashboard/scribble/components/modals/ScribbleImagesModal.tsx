import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Button } from "@/components/shadcn/ui/button";
import { getFileURL } from "@/lib/pb/client";
import { ImageIcon, Loader, X } from "lucide-react";
import { useState } from "react";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { Image } from "@unpic/react";
import { useScribblePostsMutation } from "../utils/mutation";


interface ScribbleImagesModalProps {
  input: Partial<ScribblePostsResponse>;
}

export function ScribbleImagesModal({ input }: ScribbleImagesModalProps) {
  const [imgs, setImgs] = useState(input.post_media);
  const { update_post_mutation } = useScribblePostsMutation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button className="btn h btn-sm"> </Button> */}
        <button
          className="btn btn-sm flex gap-2"
          // data-tip="sort images"
        ><ImageIcon/> manage images
        </button>
      </DialogTrigger>
      <DialogContent className="">
        <div className="w-full  h-full flex  flex-wrap items-center justify-center gap-3">
          {imgs &&
            imgs.map((item, idx) => {
              const img_url = getFileURL({
                collection_id_or_name: "scribble_posts",
                file_name: item,
                record_id: input.id!,
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
        <div className="">
          <h2>{imgs?.length} Images</h2>
          <p className="text-sm font-mono text-warning-content">
            Note:Remove all the deleted inage links from your post after
            deleting the images
          </p>
        </div>
        <DialogFooter>
          {imgs && imgs.length !== input.post_media?.length && (
            <Button
              className="btn btn-sm h"
              onClick={() => {
                update_post_mutation.mutate({
                  id: input.id!,
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
