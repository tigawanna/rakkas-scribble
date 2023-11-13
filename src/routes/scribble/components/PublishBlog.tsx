import {
  Dialog,
   DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { pb } from "@/lib/pb/client";
import { PbTheTextAreaInput } from "@/lib/pb/components/form/PBTheTextAreaInput";
import { PbTheImagePicker } from "@/lib/pb/components/form/PbTheImagePicker";
import { ScribblePostsResponse} from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/async";
import { useMutation} from "@tanstack/react-query";
import Cherry from "cherry-markdown";
import { useState } from "react";


interface PublishBlogProps {
  cherry: Cherry | null;
  input: Partial<ScribblePostsResponse>;
  setInput: React.Dispatch<
    React.SetStateAction<Partial<ScribblePostsResponse>>
  >;
}

export function PublishBlog({ input,setInput }: PublishBlogProps) {

  const targets = ["devto", "medium", "hashnode"] as const;
  const [platforms, setPlatforms] = useState<
    Array<"devto" | "medium" | "hashnode" | "">
  >([""]);

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const platform = e.target.id as "devto" | "medium" | "hashnode";
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter((p) => p !== platform));
    } else {
      setPlatforms([...platforms, platform]);
    }
  }


  const mutation = useMutation({
    mutationFn:()=>{
      return tryCatchWrapper(pb?.collection("scribble_posts").create(input))
    }
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button className="btn h btn-sm"> </Button> */}
        <button
          className="btn btn-sm md:tooltip hover:md:tooltip-open md:tooltip-top"
          data-tip="sort images"
        >
          {" "}
          Publish
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90%] w-full">
        <div className="w-full h-full overflow-y-scroll">
       
            <h3 className="font-bold text-2xl">{input.title}</h3>
            <PbTheTextAreaInput
            field_key={"description"}
            field_name={"description"}
            value={input.description}
             onChange={(e) => {
              setInput((prev) => ({ ...prev, description: e.target.value }));
             }}
            />
            <div className="w-full">
            <PbTheImagePicker
              collection_id_or_name="scribble_posts"
              record_id={input.id}
              file_name={input.main_post_image}
              setFileImage={(file) => {
                // @ts-expect-error
                setInput((prev) => ({ ...prev, main_post_image: file }));
              }}
            />

            </div>
            <h2 className="text-xl">Publish to</h2>
            <div className="w-full flex gap-4">
              {targets.map((target) => (
                <div key={target} className="w-full flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-accent border-4 border-accent"
                    id={target}
                    checked={platforms.includes(target)}
                    onChange={handleCheckboxChange}
                  />
                  <h2 className="font-bold first-letter:capitalize">
                    {target}
                  </h2>
                </div>
              ))}
       
          </div>
          <DialogFooter>
            {/* <DialogCancel>Cancel</DialogCancel> */}
          </DialogFooter>
          <button className="btn h" onClick={() => mutation.mutate()}>
            update
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
