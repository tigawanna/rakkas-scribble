import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { BlogImagesmodal } from "./BlogImagesModal";
import { UseMutationResult } from "@tanstack/react-query";
import { ScribblePostsResponse, ScribblePostsUpdate } from "@/lib/pb/db-types";
import { Loader, PencilRuler, Save } from "lucide-react";
import { PublishBlog } from "./PublishBlog";

interface EditOptionsProps {
  cherry: any;
  blog_id: string;
  input: Partial<ScribblePostsResponse>;
  update_post_mutation: UseMutationResult<
    any,
    Error,
    { id: string; data: ScribblePostsUpdate },
    any
  >;
}

export function EditorOptions({
  blog_id,
  cherry,
  input,
  update_post_mutation,
}: EditOptionsProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <PencilRuler />
      </PopoverTrigger>
      <PopoverContent
        className="w-fit flex flex-col
      gap-5 py-2 md:px-3 items-center justify-center rounded-lg"
      >
        <BlogImagesmodal input={input} />
        <PublishBlog input={input} />
        <button
          className="md:tooltip hover:md:tooltip-open md:tooltip-top flex gap-2"
          data-tip={"save content"}
          onClick={() => {
            update_post_mutation.mutate({
              id: blog_id,
              data: {
                ...input,
                content: cherry.current?.getMarkdown(),
              },
            });
          }}
        >
          <Save className="w-7 h-7" />
          {update_post_mutation.isPending && (
            <Loader className="animate-spin" />
          )}
        </button>
      </PopoverContent>
    </Popover>
  );
}
