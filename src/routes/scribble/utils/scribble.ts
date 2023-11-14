import { pb } from "@/lib/pb/client";
import {
  ScribbleApiKeys,
  ScribblePostsResponse,
  ScribblePostsUpdate,
} from "@/lib/pb/db-types";
import { tryCatchWrapper } from "@/utils/async";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { publishToProviders } from "./publish";
import { usePageContext, useSSM } from "rakkasjs";
import {
  DevToArticle,
  DevToPublishResponse,
} from "@/lib/scribble/client/articles";

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

  // const page_ctx = usePageContext();
  const publish_scribble_mutation = useSSM(
    async (
      ctx,
      vars: {
        providers: [(typeof targets)[number]];
        keys: ScribbleApiKeys;
        id: string;
        data: Partial<ScribblePostsResponse>;
      },
    ) => {
      return (await publishToProviders({
        ctx,
        keys: vars.keys,
        providers: ["devto"],
        input: vars.data,
      })) as { data: any; error: any };
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
          console.log(" Publishing data.error ======== ", data.error);
          toast(data.error, { type: "error", autoClose: false });
        }
      },
      onError(error: any) {
        // console.log(" Publishing data.error ======== ", error);
        toast(error.message, { type: "error", autoClose: false });
      },
    },
  );

  // const old_publish_scribble_mutation = useMutation({
  //   mutationFn: (vars: {
  //     providers: [(typeof targets)[number]];
  //     id: string;
  //     data: Partial<ScribblePostsResponse>;
  //   }) => {
  //     return tryCatchWrapper(publishToProviders({ providers: ["devto"], input: vars.data }));
  //   },
  //   onSuccess(data, variables, context) {
  //     if (data.data) {
  //       // qc.invalidateQueries({ queryKey: ["scribble_posts"] });
  //       toast(`Post published successfully`, {
  //         type: "success",
  //       });
  //     }
  //     if (data.error) {
  //       console.log(" Publishing data.error ======== ", data.error);
  //       toast(data.error?.message, { type: "error", autoClose: false });
  //     }
  //   },
  //   onError(error, variables, context) {
  //     console.log(" Publishing data.error ======== ", error);
  //     toast(error.message, { type: "error", autoClose: false });
  //   },
  // });

  return { update_post_mutation, qc, publish_scribble_mutation };
}
