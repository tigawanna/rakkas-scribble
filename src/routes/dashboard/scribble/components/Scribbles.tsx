import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { Spinner } from "@/components/navigation/loaders/Spinner";
import { getFileURL } from "@/lib/pb/client";
import { PBTimeStamp } from "@/lib/pb/components/PBTimestamp";
import { tryCatchWrapper } from "@/utils/async";
import { numberToArray } from "@/utils/helpers/others";
import { useSearchWithQuery } from "@/utils/hooks/search";
import { Search, ExternalLink } from "lucide-react";
import { Link, navigate, usePageContext, useSSQ } from "rakkasjs";
import { Suspense } from "react";
import { NewScribbleModal } from "./NewScribbleModal";

interface ScribbbleProps {}

export function Scribbles({}: ScribbbleProps) {
  const page_ctx = usePageContext();
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
    useSearchWithQuery();
  const page_number = parseInt(page_ctx.url.searchParams.get("p") ?? "1") ?? 1;
  const query = useSSQ((ctx) => {
    return tryCatchWrapper(
      ctx.locals.pb?.collection("scribble_posts").getList(page_number, 12, {
        sort: "-created",
        filter: `title~"${debouncedValue}"`,
      }),
    );
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
    <div className="w-full h-full min-h-screen flex  flex-col p-2 gap-3">
      {/* header + search bar + add new link */}
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
          {(query.isRefetching || isDebouncing) && (
            <div className="absolute  flex w-full items-center justify-center gap-3 p-2">
              <span className="loading loading-infinity loading-lg text-warning"></span>
            </div>
          )}
        </div>

        {/* <Link href={`/scribble/new`} className="btn btn-sm btn-outline">
          <Plus className="h-7 w-7" />
        </Link> */}
        <NewScribbleModal />
      </div>
      {!posts && (
        <div className="flex h-full min-h-[70vh] w-full items-center justify-center p-2">
          <div className="rounded-lg border p-2 text-info">
            no matches found
          </div>
        </div>
      )}
      {/* posts list */}
      <div className="w-full h-full flex items-center ">
        <Suspense fallback={<Spinner size="60px" />}>
          <ul className="w-full h-full flex flex-wrap p-3 gap-3">
            {posts?.map((post) => {
              return (
                <li
                  key={post.id}
                  className="whitespace-nowrap border border-accent 
               p-1 rounded-lg w-[90%] sm:w-[45%] lg:w-[30%]"
                >
                  <img
                    className="w-full aspect-video object-cover"
                    src={getFileURL({
                      collection_id_or_name: "scribble_posts",
                      file_name: post.main_post_image,
                      record_id: post.id,
                    })}
                  />
                  <div className="text-3xl font-bold">{post.title}</div>
                  <div className="text-lg">{post.description}</div>
                  <div className="text-lg">{post.series}</div>
                  <div className="w-full flex justify-between">
                    <Link
                      target="_blank"
                      href={post.publishers?.devto?.url}
                      className="text-sm text-info hover:text-info/50"
                    >
                      <div className="flex gap-2 p-1">
                        open post in devto <ExternalLink className="w-4 h-4" />
                      </div>
                    </Link>
                    <Link
                      href={"/scribble/" + post.id}
                      className="text-sm text-info hover:text-info/50"
                    >
                      <div className="flex gap-2 p-1">
                        View post <ExternalLink className="w-4 h-4" />
                      </div>
                    </Link>
                  </div>
                  <div className="text-sm ">
                    <PBTimeStamp timestamp={post.created} label="Created" />
                  </div>
                </li>
              );
            })}
          </ul>
        </Suspense>
      </div>
    </div>
  );
}
