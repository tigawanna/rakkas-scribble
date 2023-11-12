import { RequestContext } from "rakkasjs";
import {html, json} from "@hattip/response"
import CherryEngine from "cherry-markdown/dist/cherry-markdown.engine.core";

export async function get(ctx:RequestContext){
    try {
        const cherryEngineInstance = new CherryEngine({});
        const htmlContent = cherryEngineInstance.engine.makeHtml("# WEKLCOME")
        return html(htmlContent)
        } catch (error) {
        return json({error},{status:400})
    }
}
