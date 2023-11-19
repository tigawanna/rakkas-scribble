import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { useSSM } from "rakkasjs";
import { toast } from "react-toastify";
import { publishScribbleToDevTo } from "./publish-article";
import { updatePublishedScribbleToDevTo } from "./update-article";

interface PublishScribbleProps {
  data: Partial<ScribblePostsResponse>;
  publish: boolean;
}

export function useDevtoScribble() {
  const update_published_scribble_mutation = useSSM(
    async (ctx, vars: PublishScribbleProps) => {
      return updatePublishedScribbleToDevTo({
        ctx,
        input: vars.data,
        publish: vars.publish,
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
    async (ctx, vars: PublishScribbleProps) => {
      return publishScribbleToDevTo({
        ctx,
        input: vars.data,
        publish: vars.publish,
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
  return {
    update_published_scribble_mutation,
    publish_scribble_mutation,
  };
}
