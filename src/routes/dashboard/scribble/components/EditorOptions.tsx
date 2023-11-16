import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { UseMutationResult } from "@tanstack/react-query";
import { ScribblePostsResponse, ScribblePostsUpdate } from "@/lib/pb/db-types";
import { Loader, PencilRuler, Save } from "lucide-react";
import Cherry from "cherry-markdown";
import { navigate } from "rakkasjs";

interface EditOptionsProps {
  cherry: React.MutableRefObject<Cherry | null>;
  scribble_id: string;
  input: Partial<ScribblePostsResponse>;
  setInput: React.Dispatch<
    React.SetStateAction<Partial<ScribblePostsResponse>>
  >;
  update_post_mutation: UseMutationResult<
    any,
    Error,
    { id: string; data: ScribblePostsUpdate },
    any
  >;
}

export function EditorOptions({
  scribble_id,
  cherry,
  input,
  setInput,
  update_post_mutation,
}: EditOptionsProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <PencilRuler className="w-9 h-9" />
      </PopoverTrigger>
      <PopoverContent
        className="w-fit flex flex-col 
      gap-2 py-2 md:px-3 items-center justify-center rounded-lg"
      >
        <button
          className="btn btn-sm md:tooltip hover:md:tooltip-open md:tooltip-top flex gap-2"
          // data-tip={"save content"}
          onClick={() => {
            update_post_mutation.mutate({
              id: scribble_id,
              data: {
                ...input,
                content: cherry.current?.getMarkdown(),
              },
            });
          }}
        >
          {/* <Save className="w-7 h-7" /> */}
          Save
          {update_post_mutation.isPending && (
            <Loader className="animate-spin" />
          )}
        </button>
        <button
          className="btn btn-sm md:tooltip hover:md:tooltip-open md:tooltip-top flex gap-2"
          // data-tip={"save content"}
          onClick={() => {
            update_post_mutation.mutate(
              {
                id: scribble_id,
                data: {
                  ...input,
                  content: cherry.current?.getMarkdown(),
                },
              },
              {
                onSuccess(data, variables, context) {
                  navigate("/dashboard/scribble/publish/" + scribble_id);
                },
              },
            );
          }}
        >
          Save and Publish
          {update_post_mutation.isPending && (
            <Loader className="animate-spin" />
          )}
        </button>
      </PopoverContent>
    </Popover>
  );
}
