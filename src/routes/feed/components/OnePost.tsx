import { tryCatchWrapper } from "@/utils/async";
import { useSSQ } from "rakkasjs";
import { getOneDevToPost } from "../utils/posts";
import { readmeStringToHtml } from "@/lib/gfm/toHtml";

interface OnePostProps {
  post_id: string;
}

export function OnePost({ post_id }: OnePostProps) {
  const query = useSSQ(async (ctx) => {
    return tryCatchWrapper(getOneDevToPost({ ctx, id: post_id! }));
  });
  const data = query.data.data;
  console.log("data === ", data);
  const post_html = readmeStringToHtml(data?.body_markdown || "");
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center gap-4 p-5">
      {data?.cover_image && (
        <img
          height={300}
          width={300}
          className="w-full h-[300px] object-cover"
          src={data.cover_image}
        />
      )}
      <div className="w-full flex flex-col">
        <h1 className="text-3xl font-bold text-accent">{data?.title}</h1>
        <p className="text-lg ">{data?.description}</p>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: post_html || "" }}
        className="w-[90%] prose"
      />
      {/* <Markdown remarkPlugins={[remarkGfm]}>{data?.body_markdown || ""}</Markdown> */}
      {/* <ClientSuspense fallback={<div>Loading...</div>}> */}
      {/* <ToastUiViewMode value={data?.body_markdown??""}/> */}

      {/* <MarkdownRender value={data?.body_markdown}/> */}
      {/* </ClientSuspense> */}
    </div>
  );
}
