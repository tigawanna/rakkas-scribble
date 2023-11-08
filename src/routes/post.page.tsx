import { ScribbleUserResponse } from "@/lib/pb/db-types"
import { DevToApiClient } from "@/lib/publish/devto/client/articles"
import { tryCatchWrapper } from "@/utils/async"
import { PageProps, useSSQ } from "rakkasjs"
export default function Page({}:PageProps) {
    const query = useSSQ(async(ctx) => {
    const user_res = await tryCatchWrapper(ctx.locals.pb.collection("scribble_user").authRefresh<ScribbleUserResponse>())
    if (user_res.data && user_res.data.record.keys?.devto?.key) {
      const devTo = new DevToApiClient(user_res.data.record.keys?.devto?.key);
     return tryCatchWrapper(devTo.list({query:{}}))
     
    }})


    console.log("=====QUERY ======= ",query.data)
    const data  = query.data?.data
    console.log("====== DATA ====== ",data)
return (
<div className="w-full h-full min-h-screen flex items-center justify-center">
<div className="w-full h-full flex flex-wrap gap-5 items-center justify-center">
{data?.map((item)=>{
    return (
        <div className="w-full border boredr-accent">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            {item.cover_image&&<img alt={item.title} src={item.cover_image} height={300} width={300}/>}
        </div>
    )
})}
</div>
</div>
)}
