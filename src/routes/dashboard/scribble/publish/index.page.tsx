import { PageProps, navigate } from "rakkasjs"
import { useEffect } from "react"
export default function Page({url}:PageProps) {
useEffect(() => {
    navigate("/dashboard/scribble")
},[])
return (
<div className="w-full h-full min-h-screen flex items-center justify-center">

</div>
)}
