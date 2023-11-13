import { TheStringListInput } from "@/components/form/inputs/StringListInput";
import { DialogFooter } from "@/components/shadcn/ui/dialog";
import { PbTheTextAreaInput } from "@/lib/pb/components/form/PBTheTextAreaInput";
import { PbTheTextInput } from "@/lib/pb/components/form/PBTheTextInput";
import { PbTheImagePicker } from "@/lib/pb/components/form/PbTheImagePicker";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import Cherry from "cherry-markdown";
import { useEffect, useState } from "react";

import { Loader, X } from "lucide-react";
import { useUpdateScribbleMutation } from "../utils/scribble";

interface PublishModalProps {
  cherry: Cherry | null;
  input: Partial<ScribblePostsResponse>;
  setInput: React.Dispatch<
    React.SetStateAction<Partial<ScribblePostsResponse>>
  >;
}

export function PublishModal({cherry,input,setInput}:PublishModalProps){

  useEffect(()=>{
    if(cherry){
      setInput((prev)=>{
        return {...prev,contentMarkdown:cherry?.getMarkdown()}
      })
    }
  },[])
  // console.log("INPUT INSIDE PUBLISH MODAL ====  ",input)
    // const targets = ["devto", "medium", "hashnode"] as const;
    const targets = ["devto"] as const;
    const [platforms, setPlatforms] = useState<
      Array<"devto" | "medium" | "hashnode" | "">
    >([""]);
   function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
     const platform = e.target.id as "devto" | "medium" | "hashnode";
     if (platforms.includes(platform)) {
      const new_platforms = platforms.filter((p) => p !== platform);
       setPlatforms(new_platforms);
     } else {
       setPlatforms([...platforms, platform]);
     }
   }
const {update_post_mutation,publish_scribble_mutation}= useUpdateScribbleMutation()
return (
  <dialog id="publish_modal" className="modal">
    <div className="modal-box">
      <div className="w-full h-full flex flex-col gap-2">
        <PbTheTextInput
          field_key={"title"}
          field_name={"title"}
          label_classname="text-accent"
          value={input.title}
          onChange={(e) => {
            setInput((prev) => ({ ...prev, title: e.target.value }));
          }}
        />
        <PbTheTextAreaInput
          field_key={"description"}
          field_name={"description"}
          label_classname="text-accent"
          value={input.description}
          onChange={(e) => {
            setInput((prev) => ({ ...prev, description: e.target.value }));
          }}
        />
        <div className="w-full py-2">
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
          label_classname="text-accent"
          field_key={"tags"}
          field_name={"tags"}
          value={input.tags}
          placeholder="tag1, tag2, tag3"
          input={input}
          setInput={setInput}
        />
        <PbTheTextInput
          field_key={"series"}
          field_name={"series"}
          label_classname="text-accent"
          value={input.series}
          onChange={(e) => {
            setInput((prev) => ({ ...prev, series: e.target.value }));
          }}
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
        <DialogFooter>{/* <DialogCancel>Cancel</DialogCancel> */}</DialogFooter>
        <button
          className="btn "
          onClick={() =>
            publish_scribble_mutation.mutate({
              // @ts-expect-error
              providers: platforms,
              id: input?.id!,
              data: input,
            })
          }>
          Publish{" "}
          {publish_scribble_mutation.isLoading && <Loader className="animate-spin h-4 w-4" />}
        </button>
      </div>
      <div className="modal-action">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn ">
            <X className="text-error" />
            Close{" "}
          </button>
        </form>
      </div>
    </div>
  </dialog>
);
}
