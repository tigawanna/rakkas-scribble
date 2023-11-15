import { TheStringListInput } from "@/components/form/inputs/StringListInput";
import { ThePicUrlInput } from "@/components/form/inputs/ThePicUrlInput";
import { Icons } from "@/components/icons/Iconts";
import { getFileURL } from "@/lib/pb/client";
import { PbTheTextAreaInput } from "@/lib/pb/components/form/PBTheTextAreaInput";
import { PbTheTextInput } from "@/lib/pb/components/form/PBTheTextInput";
import { PbTheImagePicker } from "@/lib/pb/components/form/PbTheImagePicker";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { publishScribbleToDevTo } from "@/lib/scribble/devto/publish-article";
import { updatePublishedScribbleToDevTo } from "@/lib/scribble/devto/update-article";
import { tryCatchWrapper } from "@/utils/async";
import { Loader } from "lucide-react";
import { usePageContext, useSSM } from "rakkasjs";

import { toast } from "react-toastify";

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
        })
      
    },
    {
      onSuccess(data) {
        console.log(" Publishing data ======== ", data);
        if (data.data) {
          toast(`Scribble published successfully`, {
            type: "success",
          });
        }
        if (data.error) {
          console.log(" Updating data.error ======== ", data.error?.message);
          toast(data.error?.message, { type: "error", autoClose: false });
        }
      },
      onError(error: any) {
        // console.log(" Publishing data.error ======== ", error);
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
      return tryCatchWrapper(
        publishScribbleToDevTo({
          ctx,
          input: vars.data,
        }),
      );
    },
    {
      onSuccess(data) {
        console.log(" Publishing data ======== ", data);
        if (data.data) {
          toast(`Scribble published successfully`, {
            type: "success",
          });
        }
        if (data.error) {
          console.log(" Publishing data.error ======== ", data.error?.message);
          toast(data.error?.message, { type: "error", autoClose: false });
        }
      },
      onError(error: any) {
        // console.log(" Publishing data.error ======== ", error);
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
            {/* <PbTheImagePicker
              collection_id_or_name="scribble_posts"
              record_id={input.id}
              file_name={input.main_post_image}
              setFileImage={(file) => {
                // @ts-expect-error
                setInput((prev) => ({ ...prev, main_post_image: file }));
              }}
            /> */}
          <ThePicUrlInput
          img_url={input.main_post_image_url??""}
          editing
          setInputImage={(url) => {
            if(url){
              setInput((prev) => ({ ...prev, main_post_image_url: url }));

            }
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

          <div className="flex justify-center p-3">
            {scribble.publishers?.devto?.id ? (
              <button
                className="btn btn-sm"
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
                className="btn btn-sm"
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
