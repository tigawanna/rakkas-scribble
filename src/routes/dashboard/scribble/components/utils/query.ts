import { tryCatchWrapper } from "@/utils/async";
import { useQuery } from "@tanstack/react-query";
import { usePageContext } from "rakkasjs";

export function useOneScribble(scribble_id: string) {
  const page_ctx = usePageContext();
  const queryKey = ["scribble_posts", scribble_id] as const;
  const query = useQuery({
    queryKey,
    queryFn: async () => {
      return tryCatchWrapper(
        page_ctx.locals.pb?.collection("scribble_posts").getOne(scribble_id),
      );
    },
  });
  return { query, queryKey, page_ctx };
}
