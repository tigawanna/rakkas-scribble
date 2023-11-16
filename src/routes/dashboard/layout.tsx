import { LayoutProps, Link } from "rakkasjs";
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
