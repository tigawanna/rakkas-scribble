import { getFileURL } from "@/lib/pb/client";
import { useUser } from "@/lib/rakkas/hooks/useUser";
import { UserCircle2 } from "lucide-react";
import usericon from "./user-icon.svg";

interface UserCircleProps {}

export function UserCircle({}: UserCircleProps) {
  const { user } = useUser();
  const user_avatar = user?.avatar
    ? getFileURL({
        collection_id_or_name: "scribble_users",
        file_name: user.avatar,
        record_id: user.id,
      })
    : usericon;
  return (
    <div className="w-7 h-7 flex items-center justify-center rounded-full">
      {user?.email ? (
        <img
          src={user.avatar}
          alt="avatar"
          className="w-7 h-7 rounded-full object-cover"
        />
      ) : (
        <UserCircle2 className="w-7 h-7 rounded-full" />
      )}
    </div>
  );
}
