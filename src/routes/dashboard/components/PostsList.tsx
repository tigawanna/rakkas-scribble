import { tryCatchWrapper } from "@/utils/async";
import { usePageContext, useQuery, useSSQ } from "rakkasjs";
import { useEffect } from "react";
import {sort,eq,like,} from "typed-pocketbase"
interface PostsProps {
    keyword:string
  setIsRefetching: React.Dispatch<React.SetStateAction<boolean>>;
}

export function PostsList({keyword,setIsRefetching}:PostsProps){
    const page_ctx=usePageContext()
    const query = useSSQ((ctx)=>{
        return tryCatchWrapper(ctx.locals.pb?.collection("scribble_posts").getList(1, 50, {
          sort: sort("-created"),
        //   filter:like("title",keyword),
        filter:`title~"${keyword}"`,
        }));

    })

    useEffect(()=>{
        setIsRefetching(query.isRefetching)
    },[query.isRefetching])

const data = query.data.data
return (
 <div className='w-full h-full flex items-center justify-center'>
 <div className='w-full h-full flex flex-wrap items-center justify-center'>
    {data?.items.map((item)=>{
        return(
            <div key={item.id} className="flex flex-col gap-2 items-center">
                <h2 className="">{item.title}</h2>
            </div>
        )
    })}
 </div>

 </div>
);
}
