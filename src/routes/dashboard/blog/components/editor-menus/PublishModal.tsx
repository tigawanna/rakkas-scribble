import { TheStringListInput } from "@/components/form/inputs/StringListInput";
import { DialogFooter } from "@/components/shadcn/ui/dialog";
import { PbTheTextAreaInput } from "@/lib/pb/components/form/PBTheTextAreaInput";
import { PbTheImagePicker } from "@/lib/pb/components/form/PbTheImagePicker";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/async";
import { useMutation } from "@tanstack/react-query";
import Cherry from "cherry-markdown";
import { usePageContext } from "rakkasjs";
import { useState } from "react";

interface PublishModalProps {
  cherry: Cherry | null;
  input: Partial<ScribblePostsResponse>;
  setInput: React.Dispatch<
    React.SetStateAction<Partial<ScribblePostsResponse>>
  >;
}

export function PublishModal({ cherry, input, setInput }: PublishModalProps) {
  const page_ctx = usePageContext();
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
    mutationFn: () => {
      return tryCatchWrapper(
        page_ctx.locals.pb
          ?.collection("scribble_posts")
          .update(input.id!, input),
      );
    },
  });
  return (
    <dialog id="publish_modal" className="modal">
      <div className="modal-box">
        <div className="w-full h-full flex flex-col gap-2">
          <h3 className="font-bold text-2xl">{input.title}</h3>
          <PbTheTextAreaInput
            field_key={"description"}
            field_name={"description"}
            label_classname="text-accent"
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
          <TheStringListInput
            editing={true}
            field_key={"tags"}
            field_name={"tags"}
            value={input.tags}
            input={input}
            setInput={setInput}
          />
          <h2 className="text-sm  text-accent">Publish to</h2>
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
                <h2 className="font-bold first-letter:capitalize">{target}</h2>
              </div>
            ))}
          </div>
          <DialogFooter>
            {/* <DialogCancel>Cancel</DialogCancel> */}
          </DialogFooter>
          <button className="btn btn-outline" onClick={() => mutation.mutate()}>
            update
          </button>
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
