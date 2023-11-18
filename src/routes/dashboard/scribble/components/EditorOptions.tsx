import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { BookOpenCheck, Loader, PencilRuler, Save } from "lucide-react";
import Cherry from "cherry-markdown";
import { navigate } from "rakkasjs";
import { ScribbleImagesModal } from "./modals/ScribbleImagesModal";
import { toast } from "react-toastify";
import { ScribbleDetailsModal } from "./modals/ScribbleDetailsModal";
import { useScribblePostsMutation } from "./hooks";

interface EditOptionsProps {
  cherry: React.MutableRefObject<Cherry | null>;
  scribble?: ScribblePostsResponse | null;
  input: Partial<ScribblePostsResponse>;
  setInput: React.Dispatch<
    React.SetStateAction<Partial<ScribblePostsResponse>>
  >;
}

export function EditorOptions({
  scribble,
  cherry,
  input,
  setInput,
}: EditOptionsProps) {
  const { update_post_mutation } = useScribblePostsMutation(false);
  return (
    <Popover>
      <PopoverTrigger>
        <PencilRuler className="w-9 h-9" />
      </PopoverTrigger>
      <PopoverContent
        className="w-fit flex flex-col 
      gap-2 py-2 md:px-3 items-center justify-center rounded-lg"
      >
        {/* edit images */}
        <ScribbleImagesModal input={input} />

        {scribble && (
          <ScribbleDetailsModal
            scribble={scribble}
            input={input}
            setInput={setInput}
          />
        )}
        {/* 
{save edits} */}
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
                  toast(`Saved post ${data?.data?.title} successfully`, {
                    type: "success",
                  });
                },
              },
            );
          }}
        >
          <Save />
          Save edits
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
          <BookOpenCheck />
          Publish
        </button>
      </PopoverContent>
    </Popover>
  );
}
