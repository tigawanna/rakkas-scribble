import { pb } from "@/lib/pb/client";
import {
  ScribblePostsCreate,
ScribblePostsUpdate,
} from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/async";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";



interface UseScribbleBlogMutationProps {
  // onSuccess: (data: any, variables: any, context: any) => void;
  // onError: (error: any, variables: any, context: any) => void;
}
export function useScribblePostsMutation(show_toast=true) {

  const qc = useQueryClient();
  const posts_collection ="scribble_posts"

  const update_post_mutation = useMutation({
    mutationFn: (vars: { id: string; data: ScribblePostsUpdate }) => {
      return tryCatchWrapper(
        pb?.collection(posts_collection).update(vars.id, vars.data),
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
        qc.invalidateQueries({ queryKey: [posts_collection ] });
        if(show_toast){
          toast(`Updated post ${data.data.title} successfully`, {
            type: "success",
          });

        }
          
      }
    },
    onError(error, variables, context) {
        toast(error.message, { type: "error", autoClose: false });
    },
  });
  const create_post_mutation = useMutation({
    mutationFn: (vars: {data: ScribblePostsCreate }) => {
      return tryCatchWrapper(
        pb?.collection(posts_collection ).create(vars.data),
      );
    },
    onSuccess(data, variables, context) {
      if (data.error) {
        toast(`creating post failed`, {
          type: "error",
        });
        return;
      }
      if (data.data) {
        qc.invalidateQueries({ queryKey: [posts_collection ] });
        if(show_toast){
          toast(`new scribble created ${data.data.title} successfully`, {
            type: "success",
          });

        }
          
      }
    },
    onError(error, variables, context) {
        toast(error.message, { type: "error", autoClose: false });
    },
  });

  return { create_post_mutation,update_post_mutation, qc };
}
