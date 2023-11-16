import { useFormHook } from "@/components/form/useForm";
import { Button } from "@/components/shadcn/ui/button";
import { PbTheTextInput } from "@/lib/pb/components/form/PBTheTextInput";
import { ScribblePostsCreate } from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/async";
import { navigate, useMutation, usePageContext } from "rakkasjs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Loader, Plus } from "lucide-react";
import { toast } from "react-toastify";

interface NewScribbleModalProps {}

export function NewScribbleModal({}: NewScribbleModalProps) {
  const page_ctx = usePageContext();
  const mutation = useMutation(
    (post: ScribblePostsCreate) => {
      return tryCatchWrapper(
        page_ctx.locals.pb?.collection("scribble_posts").create(post),
      );
    },
    {
      onSuccess(data) {
        if (data.data) {
          const navigate_to = `/dashboard/scribble/${data.data.id!}`;
          navigate(navigate_to);
        }
        if (data.error) {
          toast(data.error.message, { type: "error", autoClose: false });
        }
      },
      onError(error: any) {
        toast(error.message, { type: "error", autoClose: false });
      },
    },
  );

  const { input, setInput, error, setError, validateInputs } = useFormHook({
    initialValues: {
      title: "",
    },
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn btn-outline btn-sm">
          {" "}
          New Scribble
          <Plus />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Scribble</DialogTitle>
          {/* <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription> */}
        </DialogHeader>
        <div className="">
          <PbTheTextInput
            required
            field_name={"Post Title"}
            field_key={"title"}
            label_classname="font-bold pb-2 "
            onChange={handleChange}
            val={input.title}
            error_message={error.message}
          />
        </div>
        <DialogFooter>
          {/* <DialogCancel>Cancel</DialogCancel> */}
          <Button
            onClick={() => mutation.mutate({ ...input, status: "DRAFT" })}
          >
            {mutation.isLoading ? (
              <>
                Creating <Loader className="animate-spin w-4 h-4" />
              </>
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
