import { LayoutProps, Link } from "rakkasjs"
export default function Layout({children}: LayoutProps) {
return (
<div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
<nav className="w-full flex gap-2">
    <Link href="/dashboard">Dashboard</Link>

</nav>
 {children}
</div>
)}
