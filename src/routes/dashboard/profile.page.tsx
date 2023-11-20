import { PageProps } from "rakkasjs";
import { ProfileComponenst } from "./components/profile/ProfileComponent";
import { Publishers } from "./components/publishers/Publishers";
export default function Page({}: PageProps) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-1 ">
      <h2 className="text-3xl font-bold px-5 py-1">Profile</h2>
      <ProfileComponenst />
      <Publishers />
    </div>
  );
}
