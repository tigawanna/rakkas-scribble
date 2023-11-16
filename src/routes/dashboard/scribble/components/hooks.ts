import { pb } from "@/lib/pb/client";
import {
  ScribbleApiKeys,
  ScribblePostsResponse,
  ScribblePostsUpdate,
} from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/async";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useSSM } from "rakkasjs";

interface UseScribbleBlogMutationProps {
  // onSuccess: (data: any, variables: any, context: any) => void;
  // onError: (error: any, variables: any, context: any) => void;
}
export function useUpdateScribbleMutation(scribble_id: string) {
  const targets = ["devto", "medium", "hashnode"] as const;
  const qc = useQueryClient();

  const update_post_mutation = useMutation({
    mutationFn: (vars: { id: string; data: ScribblePostsUpdate }) => {
      return tryCatchWrapper(
        pb?.collection("scribble_posts").update(vars.id, vars.data),
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

  return { update_post_mutation, qc };
}
