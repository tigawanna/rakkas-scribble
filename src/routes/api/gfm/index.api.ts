import { RequestContext } from "rakkasjs";
import { html, json } from "@hattip/response";
import { readmeStringToHtml } from "./helpers/gfmToHtml/toHtml";
import { readFile } from "fs/promises";

export async function get(ctx: RequestContext) {
  try {
    // const cherryEngineInstance = new CherryEngine({});
    // const htmlContent = cherryEngineInstance.engine.makeHtml("# WEKLCOME")
    const readme = await readFile("TEST-README.md", "utf8");
    // const gfm_html = await readmeStringToHtml(readme)
    // console.log("html", gfm_html)
    // return json(html)
    return json({ readme }, { status: 200 });
  } catch (error) {
    console.log({ error });
    return json({ error }, { status: 400 });
  }
}
