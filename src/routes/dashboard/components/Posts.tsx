import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { useSearchWithQuery } from "@/utils/hooks/search";
import { Plus } from "lucide-react";
import {Link, usePageContext} from "rakkasjs"
import { Suspense, useState } from "react";
import { PostsList } from "./PostsList";
import { SkeletonLoader } from "@/components/navigation/loaders/SkeletonLoader";
import { NewPostModal } from "../blog/components/NewPostModal";

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

return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <div className="sticky top-[5%] flex flex-wrap w-full items-center justify-evenly p-2 gap-3">
      <div className=" relative flex md:min-w-[50%] min-w-[70%]  items-center justify-center gap-1">
        <TheTextInput
          label_classname="hidden"
          value={keyword}
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
      <div className="w-full h-full">
    <Suspense fallback={<SkeletonLoader items={6} />}>
        <PostsList keyword={debouncedValue} setIsRefetching={setIsRefetching} />
    </Suspense>
      </div>
  </div>
);
}
