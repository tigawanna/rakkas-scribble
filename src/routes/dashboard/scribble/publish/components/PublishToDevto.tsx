import { Icons } from "@/components/icons/Iconts";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { publishScribbleToDevTo } from "@/lib/scribble/devto/publish-article";
import { updatePublishedScribbleToDevTo } from "@/lib/scribble/devto/update-article";
import { Loader } from "lucide-react";
import { usePageContext, useSSM } from "rakkasjs";
import { toast } from "react-toastify";
import { ScribbleDetailsForm } from "../../components/ScribbleDetailsForm";

interface PublishToDevtoProps {
  scribble: ScribblePostsResponse;
  input: Partial<ScribblePostsResponse>;
  setInput: React.Dispatch<
    React.SetStateAction<Partial<ScribblePostsResponse>>
  >;
}

export function PublishToDevto({
  scribble,
  input,
  setInput,
}: PublishToDevtoProps) {
  const page_ctx = usePageContext();

  const update_published_scribble_mutation = useSSM(
    async (
      ctx,
      vars: {
        data: Partial<ScribblePostsResponse>;
      },
    ) => {
      return updatePublishedScribbleToDevTo({
        ctx,
        input: vars.data,
      });
    },
    {
      onSuccess(data) {
        if (data.data) {
          toast(`Scribble published successfully`, {
            type: "success",
          });
        }
        if (data.error) {
          toast(data.error?.message, { type: "error", autoClose: false });
        }
      },
      onError(error: any) {
        toast(error.message, { type: "error", autoClose: false });
      },
    },
  );
  const publish_scribble_mutation = useSSM(
    async (
      ctx,
      vars: {
        data: Partial<ScribblePostsResponse>;
      },
    ) => {
      return publishScribbleToDevTo({
        ctx,
        input: vars.data,
      });
    },
    {
      onSuccess(data) {
        if (data.data) {
          toast(`Scribble published successfully`, {
            type: "success",
          });
        }
        if (data.error) {
          toast(data.error?.message, { type: "error", autoClose: false });
        }
      },
      onError(error: any) {
        toast(error.message, { type: "error", autoClose: false });
      },
    },
  );

  return (
    <div
      className="w-full h-full flex flex-col  items-center justify-center p-3 
    border-accent border-4 rounded-lg"
    >
      <Icons.devto className="w-[30%] h-[100px]" />
      <div className="w-full h-full flex items-center justify-center gap-2 ">
        <div className="w-full h-full flex flex-col gap-2">
          <ScribbleDetailsForm
            input={input}
            setInput={setInput}
            scribble={scribble}
          />
          <div className="flex justify-center p-3">
            {scribble.publishers?.devto?.id ? (
              <button
                className="btn"
                onClick={() =>
                  update_published_scribble_mutation.mutate({
                    data: input,
                  })
                }
              >
                Update{" "}
                {update_published_scribble_mutation.isLoading && (
                  <Loader className="animate-spin h-4 w-4" />
                )}
              </button>
            ) : (
              <button
                className="btn"
                onClick={() =>
                  publish_scribble_mutation.mutate({
                    data: input,
                  })
                }
              >
                Publish{" "}
                {publish_scribble_mutation.isLoading && (
                  <Loader className="animate-spin h-4 w-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
