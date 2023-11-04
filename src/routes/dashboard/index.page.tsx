import { useUser } from "@/lib/rakkas/hooks/useUser";
import { Link, PageProps } from "rakkasjs";
import { NewPostModal } from "./blog/components/NewPostModal";
import { Posts } from "./components/Posts";
export default function DashboardPage({}: PageProps) {
  const { user } = useUser();
  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-2">
      <div className="w-full flex flex-col h-full">
        {/*  top section */}
        <div className="w-full flex justify-between p-5">
          <div className="text-4xl font-bold flex items-center gap-3 justify-center">
            Welcome
            <h3 className="text-4xl font-bold text-accent">
              {user?.username}
            </h3>
          </div>
     
        </div>
      </div>
        <div className="w-full h-full min-h-screen flex flex-col gap-2">
          <Posts/>
      </div>
    </div>
  );
}
