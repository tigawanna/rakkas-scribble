import { PageProps, useSSM } from "rakkasjs"
import { BlogEditor } from "./components/BlogEditor"
export default function EditBlogPage({params}:PageProps) {
return (
  <div className="w-full flex flex-col h-screen ">

    <BlogEditor blog_id={params.blog} />
  </div>
);}
