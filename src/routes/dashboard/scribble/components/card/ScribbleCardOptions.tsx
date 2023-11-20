import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { ScribblePostsResponse } from "@/lib/pb/db-types";
import {
  ChevronRightCircle,
  Edit2,
  ExternalLink,
  MoreVertical,
} from "lucide-react";
import { Link } from "rakkasjs";
import { useState } from "react";

interface ScribbleCardOptionsProps {
  post: ScribblePostsResponse;
}

export function ScribbleCardOptions({ post }: ScribbleCardOptionsProps) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu modal open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <MoreVertical />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 " align="end" forceMount>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              target="_blank"
              href={post.publishers?.devto?.url}
              className="flex gap-2 p-1 w-full justify-between"
            >
              <div className="flex gap-2 p-1 w-full justify-between">
                open post in devto <ExternalLink className="w-4 h-4" />
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              href={"/dashboard/scribble/editor/" + post.id}
              className="flex gap-2 p-1 w-full justify-between"
            >
              <div className="flex gap-2 p-1 w-full justify-between">
                open in editor <Edit2 className="w-4 h-4" />
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              href={"/dashboard/scribble/" + post.id}
              className="flex gap-2 p-1 w-full justify-between"
            >
              <div className="flex gap-2 p-1 w-full justify-between">
                view details <ChevronRightCircle className="w-4 h-4" />
              </div>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        {/* theme toggle */}
        {/* <ThemeToggle /> */}
        <DropdownMenuSeparator />
        {/* logout button */}
        {/* <CurrentUserSection setOpen={setOpen} /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

{
  /* <Link
              target="_blank"
              href={post.publishers?.devto?.url}
              className="text-sm text-info hover:text-info/50"
            >
              <div className="flex gap-2 p-1">
                open post in devto <ExternalLink className="w-4 h-4" />
              </div>
            </Link>
            <Link
              href={"/dashboard/scribble/" + post.id}
              className="text-sm text-info hover:text-info/50"
            >
              <div className="flex gap-2 p-1">
                View post <ExternalLink className="w-4 h-4" />
              </div>
            </Link> */
}
