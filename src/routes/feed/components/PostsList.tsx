import { tryCatchWrapper } from "@/utils/async";
import { useQuery } from "@tanstack/react-query";
import { usePageContext, useSSQ } from "rakkasjs";
import { getDevToPosts } from "../utils/posts";
import { cn } from "@/components/shadcn/lib/utils";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/shadcn/ui/card";
import { BellIcon, CheckIcon } from "lucide-react";
import { Image } from "@unpic/react";
import { PostCard } from "./PostCard";

interface PostsListProps {

}

export function PostsList({}:PostsListProps){

        const query = useSSQ((ctx) => {
          return tryCatchWrapper(getDevToPosts({ ctx }));
        });
 
  console.log(" ============== DEVTO POSTS ============= ", query.data);
const data = query.data?.data;
return (
  <div className="w-full h-full flex flex-col items-center">
    <h2 className="text-3xl font-bold">Posts</h2>  
    <div className="w-full h-full flex flex-wrap items-center justify-center gap-4">
        {data?.map((item) => {
          return (
            <PostCard item={item} key={item.id}/>
          );
        })}
    </div>
  </div>
);
}
