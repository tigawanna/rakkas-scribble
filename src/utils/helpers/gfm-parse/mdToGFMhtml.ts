import showdown from "showdown";
import hljs from "highlight.js";
import { gfmStyles, highlightjsStyles } from "./styles";

showdown.extension("highlight", function () {
  function htmlunencode(text: string): string {
    return text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  return [
    {
      type: "output",
      filter: function (text: string, converter: any, options: any): string {
        const left = "<pre><code\\b[^>]*>",
          right = "</code></pre>",
          flags = "g";
        const replacement = function (
          wholeMatch: string,
          match: string,
          left: string,
          right: string,
        ): string {
          match = htmlunencode(match);
          var lang = (left.match(/class=\"([^ \"]+)/) || [])[1];
          left = left.slice(0, 18) + "hljs " + left.slice(18);
          if (lang && hljs.getLanguage(lang)) {
            return (
              left + hljs.highlight(match, { language: lang }).value + right
            );
          } else {
            return left + hljs.highlightAuto(match).value + right;
          }
        };
        return showdown.helper.replaceRecursiveRegExp(
          text,
          replacement,
          left,
          right,
          flags,
        );
      },
    },
  ];
});

export function readmeStringToHtml(text: string) {
  const styleData = gfmStyles;
  const highlightingStyles = highlightjsStyles;

  let pageTitle = "";
  let plausibleDomain = "";
  const converter = new showdown.Converter({
    ghCompatibleHeaderId: true,
    simpleLineBreaks: true,
    ghMentions: true,
    extensions: ["highlight"],
    tables: true,
  });
  converter.setFlavor("github");
  // return converter.makeHtml(readme);

  var preContent =
    `
      <html>
        <head>
          <title>` +
    pageTitle +
    `</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta charset="UTF-8">`;

  if (plausibleDomain.length > 0) {
    preContent +=
      `
          <script defer data-domain="` +
      plausibleDomain +
      `" src="https://plausible.io/js/script.js"></script>
        `;
  }
  preContent += `
        </head>
        <body>
          <div id='content'>
      `;

  let postContent =
    `

          </div>
          <style type='text/css'>` +
    styleData +
    `</style>
          <style type='text/css'>` +
    highlightingStyles +
    `</style>
        </body>
      </html>`;

  //   const html = preContent + converter.makeHtml(text) + postContent;
  const html = preContent + converter.makeHtml(text) + postContent;
  converter.setFlavor("github");
  return html;
}
