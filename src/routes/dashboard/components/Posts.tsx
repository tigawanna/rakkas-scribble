import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { useSearchWithQuery } from "@/utils/hooks/search";
import { navigate, usePageContext} from "rakkasjs"
import { Suspense, useState } from "react";
import { NewPostModal } from "../blog/components/NewPostModal";
import { useQuery } from "@tanstack/react-query";
import { tryCatchWrapper } from "@/utils/async";
import { PostCard } from "./PostCard";
import { numberToArray } from "@/utils/helpers/others";

interface PostsProps {

}

export function Posts({}:PostsProps){
const page_ctx = usePageContext();
const [isRefetching,setIsRefetching] = useState(false);
const { debouncedValue, isDebouncing, keyword, setKeyword } = useSearchWithQuery();
const page_number = parseInt(page_ctx.url.searchParams.get("p") ?? "1") ?? 1;
  function handleChange(e: any) {
    setKeyword(e.target.value);
  }


  const query = useQuery({
    queryKey: ["posts",debouncedValue ,page_number],
    queryFn:()=>{
      return tryCatchWrapper(page_ctx.locals.pb?.collection("scribble_posts").getList(1,1, {
        sort: "-created",
        filter: `title~"${debouncedValue}"`,
        page: page_number
      }))
    }
  })

  const data = query.data?.data
    const total_pages = query?.data?.data?.totalPages;
    const pages_arr = numberToArray(total_pages!);
    function goToPage(page: number) {
      page_ctx.url.searchParams.set("p", page.toString());
      navigate(page_ctx.url);
    }
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <div className="sticky top-[5%] flex flex-wrap w-full items-center justify-evenly p-2 gap-3">
      <div className=" relative flex md:min-w-[50%] min-w-[70%]  items-center justify-center gap-1">
        <TheTextInput
          label_classname="hidden"
          val={keyword}
          field_key={"keyword"}
          placeholder="Search"
          field_name="Search"
          onChange={handleChange}
        />
        {(isRefetching || isDebouncing) && (
          <div className="absolute  flex w-full items-center justify-center gap-3 p-2">
            <span className="loading loading-infinity loading-lg text-warning"></span>
          </div>
        )}
      </div>
      <NewPostModal />
    </div>

    <div className="w-full h-full flex flex-wrap items-center justify-center gap-3 p-2">
      {data?.items.map((item) => {
        return <PostCard key={item.id} item={item} />;
      })}
    </div>
    <div className="join gap2">
      {pages_arr.map((item) => {
        return (
          <button
            key={item}
            onClick={() => goToPage(item)}
            className={
              item === page_number
                ? "join-item btn btn-sm btn-active"
                : "join-item btn btn-sm"
            }
          >
            {item}
          </button>
        );
      })}
    </div>
  </div>
);
}
