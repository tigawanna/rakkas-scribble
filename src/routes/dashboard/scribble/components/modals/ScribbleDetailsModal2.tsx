import { Loader, X } from "lucide-react";
import { useState } from "react";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { useScribblePostsMutation } from "../utils/mutation";
import  ScribbleDetailsForm  from "../ScribbleDetailsForm";
import { Button } from "@/components/shadcn/ui/button";

interface ScribbleDetailsModalProps {
  scribble: ScribblePostsResponse;
  input: Partial<ScribblePostsResponse>;
  setInput: React.Dispatch<
    React.SetStateAction<Partial<ScribblePostsResponse>>
  >;
}

export function ScribbleDetailsModal({
  scribble,
  input,
  setInput,
}: ScribbleDetailsModalProps) {
  const [open, setOpen] = useState(false);
  const { update_post_mutation } = useScribblePostsMutation();
  return (
    <dialog id="scribble_details_modal" className="modal">
      <div className="modal-box">
        <div className="w-full  h-full flex flex-col  items-center justify-center gap-3 z-50">
          <ScribbleDetailsForm
            input={input}
            setInput={setInput}
            scribble={scribble}
          />
          <Button
            onClick={() =>
              update_post_mutation.mutate(
                { id: scribble?.id, data: input },
                {
                  onSuccess(data, variables, context) {
                    setOpen(false);
                  },
                },
              )
            }
          >
            {update_post_mutation.isPending ? (
              <>
                Updating <Loader className="animate-spin w-4 h-4" />
              </>
            ) : (
              "Update"
            )}
          </Button>
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm  ">
              <div className="flex gap-2 items-center">
                {" "}
                <>Close</>
                <X />
              </div>
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
