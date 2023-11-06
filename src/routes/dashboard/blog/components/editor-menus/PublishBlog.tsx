import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/async";
import { useMutation } from "@tanstack/react-query";
import { usePageContext, useSSM } from "rakkasjs";
import { useState } from "react";


interface PublishBlogProps {
  input: Partial<ScribblePostsResponse>;
}

export function PublishBlog({ input }: PublishBlogProps) {
    const page_ctx=usePageContext()
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
    mutationFn:()=>tryCatchWrapper(page_ctx.fetch('/api/hello'))
})


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* <Button className="btn btn-outline btn-sm"> </Button> */}
        <button
          className="btn btn-sm md:tooltip hover:md:tooltip-open md:tooltip-top"
          data-tip="sort images"
        >
          {" "}
          Publish
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col gap-3">
        <h3 className="font-bold text-lg">{input.title}</h3>
        <div className="w-full  h-full flex  flex-wrap items-center  gap-3">
          <h2 className="text-xl">Publish to</h2>
          <div className="w-full flex gap-4">
            {targets.map((target) => (
              <div 
              key={target}
              className="w-full flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-accent"
                  id={target}
                  checked={platforms.includes(target)}
                  onChange={handleCheckboxChange}
                />
                <h2 className="font-bold first-letter:capitalize">{target}</h2>
              </div>
            ))}
            </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
        <button className="btn btn-outline" 
        onClick={()=>mutation.mutate()}
        >
            update
        </button>
      </AlertDialogContent>
    </AlertDialog>
  );
}
