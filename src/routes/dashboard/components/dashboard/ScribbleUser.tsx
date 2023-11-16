import { useUser } from "@/lib/rakkas/hooks/useUser";


interface ScribbleUserProps {}

export function ScribbleUser({}: ScribbleUserProps) {
 const {user,user_avatar }= useUser()
  return (
    <div className="w-full h-full flex">
    <div className="w-full h-full flex p-2">
            <img
            src={user_avatar}
            alt="avatar"
            className="h-[300px] w-auto aspect-square object-cover"
          />
      <div className="flex">
        <div className="">{user.email}</div>
        <div className="">{user.github_username}</div>

      </div>
    </div>
    </div>
  );
}
