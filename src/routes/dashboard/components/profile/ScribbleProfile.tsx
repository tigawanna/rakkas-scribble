import { useUser } from "@/lib/rakkas/hooks/useUser";
import { Mail } from "lucide-react";
import { dateToString } from "@/utils/helpers/others";
import { Link } from "rakkasjs";


interface ScribbleProfileProps {
  scribble_count:number
}

export function ScribbleProfile({scribble_count}: ScribbleProfileProps) {
  const { user, user_avatar} = useUser();
 return (
    <div className="w-full flex p-5 flex-wrap justify-center sm:justify-between items-center">
      <div className="flex p-5 flex-wrap justify-center items-center">
        <img
          src={user_avatar}
          height={`200`}
          width={`200`}
          className="w-[60%] sm:w-[30%] lg:w-[25%] h-auto object-cover rounded-full aspect-square"
        />
        <div className="flex flex-col justify-center p-5 h-full gap-2">
          <h1 className="text-6xl font-bold">{user.username}</h1>
          <h4 className="flex gap-2">
            <Mail /> {user.email}
          </h4>
          <h4>Since {dateToString(user.created)}</h4>
          <p className="line-clamp-2">{user.about_me}</p>
          <Link className="text-sm text-info hover:underline" href="/dashboard/profile">
            go to profile
          </Link>
        </div>
      </div>


      <div className="h-full flex flex-col justify-center items-center border rounded-xl p-5">
        <h1 className="text-6xl font-bold">{scribble_count}</h1> Posts and
        counting
      </div>
  
    </div>
  );
}
