export const highlightjsStyles = `
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em
}
code.hljs {
  padding: 3px 5px
}
/*

Atom One Dark by Daniel Gamage
Original One Dark Syntax theme from https://github.com/atom/one-dark-syntax

base:    #282c34
mono-1:  #abb2bf
mono-2:  #818896
mono-3:  #5c6370
hue-1:   #56b6c2
hue-2:   #61aeee
hue-3:   #c678dd
hue-4:   #98c379
hue-5:   #e06c75
hue-5-2: #be5046
hue-6:   #d19a66
hue-6-2: #e6c07b

*/
.hljs {
  color: #abb2bf;
  background: #282c34
}
.hljs-comment,
.hljs-quote {
  color: #5c6370;
  font-style: italic
}
.hljs-doctag,
.hljs-keyword,
.hljs-formula {
  color: #c678dd
}
.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
  color: #e06c75
}
.hljs-literal {
  color: #56b6c2
}
.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta .hljs-string {
  color: #98c379
}
.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
  color: #d19a66
}
.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
  color: #61aeee
}
.hljs-built_in,
.hljs-title.class_,
.hljs-class .hljs-title {
  color: #e6c07b
}
.hljs-emphasis {
  font-style: italic
}
.hljs-strong {
  font-weight: bold
}
.hljs-link {
  text-decoration: underline
}
`

export const gfmStyles = `





summary {
    cursor: pointer;
    text-decoration: underline;
}

hr {
    color: #bbb;
    background-color: #bbb;
    height: 1px;
    flex: 0 1 auto;
    margin: 1em 0;
    padding: 0;
    border: none;
}

.hljs-operator {
    color: #868686;
    /* There is a bug where the syntax highlighter would pick no color for e.g. `&& ` symbols in the code samples. Let's overwrite this */
}


/**
 * Links
 */

a {
    color: #0366d6;
    text-decoration: none;
}

a:visited {
    color: #0366d6;
}

a:hover {
    color: #0366d6;
    text-decoration: underline;
}

pre {
    background-color: #f6f8fa;
    border-radius: 3px;
    font-size: 85%;
    line-height: 1.45;
    overflow: auto;
    padding: 16px;
}


/**
  * Code blocks
  */

code {
    background-color: rgba(27, 31, 35, .05);
    border-radius: 3px;
    font-size: 85%;
    margin: 0;
    word-wrap: break-word;
    padding: .2em .4em;
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace;
}

pre>code {
    background-color: transparent;
    border: 0;
    display: inline;
    line-height: inherit;
    margin: 0;
    overflow: visible;
    padding: 0;
    word-wrap: normal;
    font-size: 100%;
}


/**
 * Blockquotes
 */

blockquote {
    margin-left: 30px;
    margin-top: 0px;
    margin-bottom: 16px;
    border-left-width: 3px;
    padding: 0 1em;
    color: #828282;
    border-left: 4px solid #e8e8e8;
    padding-left: 15px;
    font-size: 18px;
    letter-spacing: -1px;
    font-style: italic;
}

blockquote * {
    font-style: normal !important;
    letter-spacing: 0;
    color: #6a737d !important;
}


/**
 * Tables
 */

table {
    border-spacing: 2px;
    display: block;
    font-size: 14px;
    overflow: auto;
    width: 100%;
    margin-bottom: 16px;
    border-spacing: 0;
    border-collapse: collapse;
}

td {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
}

th {
    font-weight: 600;
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
}

tr {
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
}

table tr:nth-child(2n) {
    background-color: #f6f8fa;
}


/**
 * Others
 */

img {
    max-width: 100%;
}

p {
    line-height: 24px;
    font-weight: 400;
    font-size: 16px;
    color: #24292e;
}

ul {
    margin-top: 0;
}

li {
    color: #24292e;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
}

li+li {
    margin-top: 0.25em;
}

* {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: #24292e;
}

a:visited {
    color: #0366d6;
}

h1,
h2,
h3 {
    border-bottom: 1px solid #eaecef;
    color: #111;
    /* Darker */
}

code>* {
    font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace !important;
}
`
