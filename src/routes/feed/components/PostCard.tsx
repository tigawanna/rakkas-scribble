import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/shadcn/ui/card";
import { DevToArticle } from "@/lib/publish/devto/client/articles";
import { Link } from "rakkasjs";

interface PostCardProps {
  item: DevToArticle["get"]["responses"]["200"]["content"]["application/json"][number];
}

export function PostCard({ item }: PostCardProps) {
  return (
    <Link href={"/feed/" + item.id} className={"w-full"}>
      <Card key={item.id} className="flex flex-col w-[95%]">
        {item.cover_image && (
          <img
            height={300}
            width={300}
            className="w-full h-[300px] object-cover"
            src={item.cover_image}
          />
        )}
        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription className="line-clamp-3">
            {item.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4"></CardContent>
        <CardFooter>
          <div className=" w-full flex items-center flex-wrap gap-2">
            {item.tag_list.map((tag) => {
              return (
                <button
                  key={tag}
                  className="btn btn-sm btn-outline glass lowercase"
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
