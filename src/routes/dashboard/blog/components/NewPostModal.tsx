import { useFormHook } from "@/components/form/useForm";
import { Button } from "@/components/shadcn/ui/button";
import { PbTheTextInput } from "@/lib/pb/components/form/PBTheTextInput";
import { ScribblePostsCreate } from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/async";
import { navigate, useMutation, usePageContext } from "rakkasjs";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

interface NewPostModalProps {}

export function NewPostModal({}: NewPostModalProps) {
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
          const navigate_to = `/dashboard/blog/${data.data.id!}`;
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="btn btn-outline btn-sm"> New Post</button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Post</AlertDialogTitle>
          {/* <AlertDialogDescription>
          Make changes to your profile here. Click save when you're done.
        </AlertDialogDescription> */}
        </AlertDialogHeader>
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
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
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
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
