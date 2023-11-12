import { LayoutProps, Link } from "rakkasjs"
export default function Layout({children}: LayoutProps) {
    //  randowm number between 2 and 5
    const random_number = Math.floor(Math.random() * (15 - 2 + 1)) + 2
return (
<div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
<Link href={"/feed/test/"+random_number}>Test page</Link>
 {children}
</div>
)}
