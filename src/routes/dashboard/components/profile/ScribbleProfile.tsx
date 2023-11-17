import { useUser } from "@/lib/rakkas/hooks/useUser";
import { Mail } from "lucide-react";
import { dateToString } from "@/utils/helpers/others";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { tryCatchWrapper } from "@/utils/async";
interface ScribbleProfileProps {}

export function ScribbleProfile({}: ScribbleProfileProps) {
  const { user, user_avatar, page_ctx } = useUser();
//   const query = useSuspenseQuery({
//     queryKey: ["all_scribble_posts", "all"],
//     queryFn: () => {
//       return tryCatchWrapper(
//         page_ctx.locals.pb.collection("scribble_posts").getList(1, 1),
//       );
//     },
//   });
//   const scribble_count = query.data?.data?.totalItems;

  return (
    <div className="w-full flex p-5 justify-between items-center">
      <div className="flex p-5 ">
        <img
          src={user_avatar}
          height={`200`}
          width={`200`}
          className="w-[15%%] h-auto object-cover rounded-full aspect-square"
        />
        <div className="flex flex-col justify-center p-5 h-full gap-2">
          <h1 className="text-6xl font-bold">{user.username}</h1>
          <h4 className="flex gap-2">
            <Mail /> {user.email}
          </h4>
          <h4>Since {dateToString(user.created)}</h4>
          <p>{user.about_me}</p>
        </div>
      </div>
      {/* <div className="h-full flex flex-col justify-center items-center border rounded-xl p-5">
        <h1 className="text-6xl font-bold">{scribble_count}</h1> Posts and
        counting
      </div> */}
    </div>
  );
}
