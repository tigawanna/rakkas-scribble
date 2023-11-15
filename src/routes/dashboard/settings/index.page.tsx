import { PageProps } from "rakkasjs";
import { Providers } from "./components/Publishers";
export default function SettingsPage({}: PageProps) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col  items-center justify-center">
      <Providers />
    </div>
  );
}
