import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Edit3,  Loader } from "lucide-react";
import { useState } from "react";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { useScribblePostsMutation } from "../hooks";
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
  const [open,setOpen]=useState(false)
  const { update_post_mutation } = useScribblePostsMutation();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* <Button className="btn h btn-sm"> </Button> */}
        <button
          className="btn btn-sm flex gap-2"
          // data-tip="sort images"
        ><Edit3/>
          Edit details
        </button>
      </DialogTrigger>
      <DialogContent className="h-[90%] overflow-y-scroll">
        <div className="w-full  h-full flex  items-center justify-center gap-3 z-50">
          <ScribbleDetailsForm
            input={input}
            setInput={setInput}
            scribble={scribble}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() =>
              update_post_mutation.mutate({ id: scribble?.id, data: input },{
                onSuccess(data, variables, context) {
                setOpen(false)
              },})
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
