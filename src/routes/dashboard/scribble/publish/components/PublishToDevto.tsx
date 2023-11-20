import { Icons } from "@/components/icons/Iconts";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { Loader } from "lucide-react";
import ScribbleDetailsForm from "../../components/ScribbleDetailsForm";
import { useDevtoScribble } from "@/lib/scribble/devto/useDevTo";

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
  const { publish_scribble_mutation, update_published_scribble_mutation } =
    useDevtoScribble();

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
                    publish: true,
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
                    publish: true,
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
