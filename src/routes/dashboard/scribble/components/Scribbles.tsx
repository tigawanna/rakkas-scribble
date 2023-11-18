import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { tryCatchWrapper } from "@/utils/async";
import { numberToArray } from "@/utils/helpers/others";
import { useSearchWithQuery } from "@/utils/hooks/search";
import { Search } from "lucide-react";
import { ClientSuspense, navigate, usePageContext } from "rakkasjs";
import { NewScribbleModal } from "./modals/NewScribbleModal";
import { useQuery} from "@tanstack/react-query";
import { ScribbleListCard } from "./card/ScribbleListCard";


interface ScribbbleProps {
  page_size?: number;
  show_search?: boolean;
}

export function Scribbles({page_size=12, show_search=true}: ScribbbleProps) {
  const page_ctx = usePageContext();
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
   useSearchWithQuery();
  const page_number = parseInt(page_ctx.url.searchParams.get("p") ?? "1") ?? 1;

  const query = useQuery({
    queryKey: ["scribble_posts", debouncedValue, page_number],
    queryFn: () => {
      return tryCatchWrapper(
        page_ctx.locals.pb
          ?.collection("scribble_posts")
          .getList(page_number, page_size, {
            sort: "-created",
            filter: `title~"${debouncedValue}"`,
          }),
      );
    },
  });
  function handleChange(e: any) {
    setKeyword(e.target.value);
  }
  const total_pages = query?.data?.data?.totalPages;
  const pages_arr = numberToArray(total_pages!);
  function goToPage(page: number) {
    page_ctx.url.searchParams.set("p", page.toString());
    navigate(page_ctx.url);
  }
  const posts = query.data?.data?.items;
  return (
    <div className="w-full h-full  flex  flex-col  p-2 gap-3">

      {/* header + search bar + add new link */}
      {show_search && (
        <div className="sticky top-[5%]   flex w-full flex-wrap items-center justify-center gap-3 p-2">
          {/* <h3 className="text-2xl font-bold hidden md:flex">Education</h3> */}
          <div className=" relative flex min-w-[70%] items-center  justify-center gap-1 md:min-w-[50%]">
            <TheTextInput
              label_classname="p-1"
              container_classname="flex-row border border-accent justify-center items-center rounded-lg"
              className="active:border-none"
              val={keyword}
              field_key={"keyword"}
              placeholder="Search"
              field_name={<Search />}
              onChange={handleChange}
            />
            <ClientSuspense
              fallback={
                <div className="absolute  flex w-full items-center justify-center gap-3 p-2">
                  <span className="loading loading-infinity loading-lg text-warning"></span>
                </div>
              }
            >
              {(query.isRefetching || isDebouncing) && (
                <div className="absolute  flex w-full items-center justify-center gap-3 p-2">
                  <span className="loading loading-infinity loading-lg text-warning"></span>
                </div>
              )}
            </ClientSuspense>
          </div>

          <NewScribbleModal />
        </div>
      )}
      {!posts && (
        <div className="flex h-full min-h-[70vh] w-full items-center justify-center p-2">
          <div className="rounded-lg border p-2 text-info">
            no matches found
          </div>
        </div>
      )}
      {/* posts list */}
      <div className="w-full h-full flex flex-col items-center md:justify-center">
        {/* <Suspense fallback={<SkeletonLoader items={12} />}> */}
        <ul className="w-full h-full  flex flex-wrap items-center  p-3 gap-5 md:gap-3">
          {posts?.map((post) => {
            return <ScribbleListCard post={post} key={post.id} />;
          })}
        </ul>
        {/* </Suspense> */}
        {show_search && (
          <div className="join ">
            {pages_arr.map((item) => {
              return (
                <button
                  key={item}
                  onClick={() => goToPage(item)}
                  className={
                    item === page_number
                      ? "join-item btn btn-sm btn-active bg-accent"
                      : "join-item btn btn-sm"
                  }
                >
                  {item}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
