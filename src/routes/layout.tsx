import { Toolbar } from "@/components/navigation/Toolbar";
import { Nprogress } from "@/components/navigation/nprogress/Nprogress";
import { ClientSuspense, Head, LayoutProps, PageContext, useLocation } from "rakkasjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "cherry-markdown/dist/cherry-markdown.css";
// import "@/components/editor/styles/cherry-markdown.css"
import "./index.css";
import React from "react";


function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center ">
      {/* <Head description={"Resume building assistant"} /> */}
      <ClientSuspense fallback={<div></div>} >
        <Nprogress isAnimating={location && location?.pending ? true : false} />
      </ClientSuspense>
      <Toolbar />
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    </div>
  );
}
Layout.preload = (ctx: PageContext) => {
  return {
    head: {
      title: "Scribble",
      keywords:
        "rich text editor, markdown, cherry, markdown based rich text editor,AI editor",
      description:"cherry markdown based rich text editor "
    },
  };
};



export default Layout;
