import { DeleteConfirm } from "@/components/modal/DeleteConfirm";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import { dateToString } from "@/utils/helpers/others";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, usePageContext } from "rakkasjs";
import { toast } from "react-toastify";

interface PostCardProps {
item:ScribblePostsResponse
}

export function PostCard({item}:PostCardProps){
    const page_ctx = usePageContext();
    const qc = useQueryClient();
    const delete_mutation = useMutation({
      mutationFn: async (vars: { id: string }) => {
        await page_ctx.locals.pb
          ?.collection("scribble_posts")
          .delete(vars.id);
      },
      onSuccess(data, variables, context) {
        qc.invalidateQueries({ queryKey: ["sherpa_posts"] });
        toast("Post deleted successfully", { type: "success" });
      },
      onError(error, variables, context) {
        toast(error.message, { type: "error", autoClose: false });
      },
    });
    function handleDelete(id: string) {
      delete_mutation.mutate({ id });
    }
      const modal_id = "delete_posts_modal";
return (
  <div
    key={item.id}
    className="flex w-full flex-col justify-center gap-1 rounded-md border p-2 shadow-sm
      shadow-accent hover:border-accent sm:w-[45%] lg:w-[30%] "
  >
    <div className="flex gap-2 items-start justify-between">
      <Link
        href={`/dashboard/blog/${item?.id}`}
        className=" hover:text-accent max-w-[90%] rounded-lg"
      >
        <h3 className="text-xl font-bold">{item?.title}</h3>
        <p className="line-clamp-3 text-sm">{item?.status}</p>
        <h3 className="invert-[20%] line-clamp-1">{item?.tags}</h3>
      </Link>
      <DeleteConfirm
        is_loading={delete_mutation.isPending}
        handleDelete={() => handleDelete(item?.id!)}
        modal_id={modal_id}
      />
    </div>

    <div className=" flex flex-wrap w-[90%] items-center justify-between border-t border-t-accent text-sm">
      <h3>Written on : {dateToString(item.created)}</h3>
      <h3>published on : {dateToString(item.publishingDetails)}</h3>
      <h3>updated on : {dateToString(item.updated)}</h3>
    </div>
  </div>
);
}
