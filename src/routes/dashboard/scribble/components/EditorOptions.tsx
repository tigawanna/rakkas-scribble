import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { UseMutationResult } from "@tanstack/react-query";
import { ScribblePostsResponse, ScribblePostsUpdate } from "@/lib/pb/db-types";
import { Loader, PencilRuler} from "lucide-react";
import Cherry from "cherry-markdown";
import { navigate } from "rakkasjs";
import { ScribbleImagesModal } from "./ScribbleImagesModal";
import { toast } from "react-toastify";
import { ScribbleDetailsModal } from "./ScribbleDetailsModal";

interface EditOptionsProps {
  cherry: React.MutableRefObject<Cherry | null>;
  scribble?: ScribblePostsResponse | null;
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
  scribble,
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
        <ScribbleImagesModal input={input} />
        {scribble && (
          <ScribbleDetailsModal
            scribble={scribble}
            input={input}
            setInput={setInput}
          />
        )}
        <button
          className="btn btn-sm  flex gap-2"
          // data-tip={"save content"}
          onClick={() => {
            if (!scribble) {
              toast("No Scribble present", {
                type: "error",
              });
              return;
            }
            update_post_mutation.mutate({
              id: scribble?.id!,
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
          className="btn btn-sm  flex gap-2"
          // data-tip={"save content"}
          onClick={() => {
            if (!scribble) {
              toast("No Scribble present", {
                type: "error",
              });
              return;
            }
            update_post_mutation.mutate(
              {
                id: scribble?.id!,
                data: {
                  ...input,
                  content: cherry.current?.getMarkdown(),
                },
              },
              {
                onSuccess(data, variables, context) {
                  navigate("/dashboard/scribble/publish/" + scribble?.id!);
                },
              },
            );
          }}
        >
          Save and Publish
        </button>
      </PopoverContent>
    </Popover>
  );
}
