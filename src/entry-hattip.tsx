import { createRequestHandler } from "rakkasjs";
import { cookie } from "@hattip/cookie";
import { TypedPocketBase } from "typed-pocketbase";
import PocketBase from "pocketbase";
import { Schema } from "./lib/pb/db-types";

export default createRequestHandler({
  middleware: {
    // HatTip middleware to be injected
    // before the page routes handler.
    beforePages: [
      cookie(),
      (ctx) => {
     	ctx.locals.pb = new PocketBase(
          import.meta.env.RAKKAS_PB_URL,
        ) as TypedPocketBase<Schema>;
        // load the store data from the request cookie string
        ctx.locals.pb.authStore.loadFromCookie(
          ctx.request.headers.get("cookie") || "",
        );
      },
    ],
    // HatTip middleware to be injected
    // after the page routes handler but
    // before the API routes handler
    beforeApiRoutes: [],
    // HatTip middleware to be injected
    // after the API routes handler but
    // before the 404 handler
    beforeNotFound: [],
  },

  createPageHooks(requestContext) {
    return {
      emitBeforeSsrChunk() {
        // Return a string to emit into React's
        // SSR stream just before React emits a
        // chunk of the page.
        return "";
      },

      emitToDocumentHead() {
        const cookie_theme = requestContext?.cookie?.theme;
        return `
     <link rel="icon" type="image/svg+xml" href="/site.svg" />
     <script>
      (function() {
        document.documentElement.setAttribute("data-theme", "${cookie_theme}");
      })();
     </script>
     `
      },

      extendPageContext(ctx) {
        const request = ctx.requestContext?.request;
        if (!request) return;


        if (!ctx.locals.pb) {
          ctx.locals.pb = new PocketBase(
            import.meta.env.RAKKAS_PB_URL,
          ) as TypedPocketBase<Schema>;
          // load the store data from the request cookie string
          ctx.locals.pb.authStore.loadFromCookie(
            request.headers.get("cookie") || "",
          );
        }
        try {
          if (ctx.locals.pb.authStore.isValid) {
            const user = ctx?.locals?.pb;
            ctx.queryClient.setQueryData("user", user?.authStore?.model);
            // console.log("===VALID USER , UPDATING POCKETBASE USER= ===");
          } else {
            // console.log("====INVALID USER , LOGGING OUT POCKETBASE= ===");
            ctx.locals.pb.authStore.clear();
            ctx.queryClient.setQueryData("user", null);
          }
        } catch (_) {
          // clear the auth store on failed refresh
          ctx.locals.pb.authStore.clear();
        }
      },

      wrapApp(app) {
        // Wrap the Rakkas application in some provider
        // component (only on the server).
        return app;
      },

      // wrapSsrStream(stream) {
      // 	const { readable, writable } = new TransformStream({
      // 		transform(chunk, controller) {
      // 			// You can transform the chunks of the
      // 			// React SSR stream here.
      // 			controller.enqueue(chunk);
      // 		},
      // 	});

      // 	stream.pipeThrough(writable);

      // 	return readable;
      // },
    };
  },
});
