import { PageProps } from "rakkasjs"
import { BlogEditor } from "./components/BlogEditor"
export default function EditBlogPage({params}:PageProps) {

return (
<div className="w-full flex h-screen ">
    <div className="w-full h-[90%] fixed top-[2%] left-0 right-0 bottom-[100px]  px-2">
   <BlogEditor blog_id={params.blog}/>

    </div>
</div>
)}
