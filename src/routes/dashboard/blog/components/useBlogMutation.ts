import { ScribblePostsUpdate } from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/async";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePageContext } from "rakkasjs";
import { toast } from "react-toastify";

export function useUpdateBlogMutation() {
  const page_ctx = usePageContext();
  const qc = useQueryClient();
  const update_post_mutation = useMutation({
    mutationFn: (vars: { id: string; data: ScribblePostsUpdate }) => {
      return tryCatchWrapper(
        page_ctx.locals.pb
          ?.collection("scribble_posts")
          .update(vars.id, vars.data),
      );
    },
    onSuccess(data, variables, context) {
      if (data.error) {
        toast(`Updated post failed`, {
          type: "error",
        });
        return;
      }
      if (data.data) {
        qc.invalidateQueries({ queryKey: ["scribble_posts"] });
        toast(`Updated post ${data.data.title} successfully`, {
          type: "success",
        });
      }
    },
    onError(error, variables, context) {
      toast(error.message, { type: "error", autoClose: false });
    },
  });
  return { update_post_mutation, page_ctx };
}
