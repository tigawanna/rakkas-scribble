import { ScribblePostsResponse } from "@/lib/pb/db-types";
import Cherry from "cherry-markdown";
import { Loader, Save } from "lucide-react";
import { useUpdateBlogMutation } from "../useBlogMutation";

interface BlogEditorControlsProps {
  setBlogPost: (post: ScribblePostsResponse) => void;
  post: ScribblePostsResponse;
  updating?: boolean;
  cherry: Cherry | null;
}

export function BlogEditorControls({
  cherry,
  post,
  setBlogPost,
  updating,
}: BlogEditorControlsProps) {
  const { update_post_mutation } = useUpdateBlogMutation();

  return (
    <div className="flex items-center justify-center">
      <button
        className="md:tooltip hover:md:tooltip-open md:tooltip-top text-xs font-normal rounded-full hover:text-accent"
        about={"save content"}
        data-tip={"save content"}
        disabled={update_post_mutation.isPending}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          update_post_mutation.mutate({ id: post.id, data: post });
        }}
      >
        {update_post_mutation.isPending ? (
          <Loader className="animate-spin h-4 w-4" />
        ) : (
          <Save className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
