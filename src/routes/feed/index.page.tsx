import { PageProps } from "rakkasjs"
import { PostsList } from "./components/PostsList"
export default function DevToFeedPage({}:PageProps) {
return (
<div className="w-full h-full min-h-screen flex items-center justify-center">
<PostsList/>
</div>
)}
