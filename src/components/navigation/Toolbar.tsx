import { ClientSuspense, Link } from "rakkasjs";
import { MiniSettingsModal } from "./mini-settings/MiniSettings";
import { Home } from "lucide-react";
import React from "react";
const BreadCrumbs = React.lazy(() => import("./BreadCrumbs"));

interface ToolbarProps {}

export function Toolbar({}: ToolbarProps) {
  return (
    <header
      className="w-full flex gap-4 justify-between  text-primary-content bg-primary
      px-2 py-1 sticky top-0 z-30"
    >
      <Link href="/" className="text-2xl font-bold">
        <Home/>
      </Link>
      <div className="flex gap-4">
        <ClientSuspense fallback={<div></div>}>
        <BreadCrumbs />
        </ClientSuspense>
        <MiniSettingsModal />
      </div>
    </header>
  );
}
