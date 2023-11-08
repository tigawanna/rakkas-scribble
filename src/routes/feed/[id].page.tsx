import { tryCatchWrapper } from "@/utils/async";
import { PageProps, useSSQ } from "rakkasjs"
import { getOneDevToPost } from "./utils/posts";
export default function Page({params}:PageProps) {
   
    const query = useSSQ(async(ctx) => {
        return tryCatchWrapper(getOneDevToPost({ ctx,id:params.id! }));
    })
const data = query.data.data
console.log("======== QUERY ===========",query.data)
return (
  <div className="w-full h-full min-h-screen flex flex-col items-center justify-center gap-4">
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
    <div dangerouslySetInnerHTML={{ __html: data?.body_html || "" }}/>
        

 
  </div>
);}
