import { HtmlNode } from "./html_node.ts";

export const HtmlIsSpecialElementMap: { [key: string]: boolean } = {
  "address": true,
  "applet": true,
  "area": true,
  "article": true,
  "aside": true,
  "base": true,
  "basefont": true,
  "bgsound": true,
  "blockquote": true,
  "body": true,
  "br": true,
  "button": true,
  "caption": true,
  "center": true,
  "col": true,
  "colgroup": true,
  "dd": true,
  "details": true,
  "dir": true,
  "div": true,
  "dl": true,
  "dt": true,
  "embed": true,
  "fieldset": true,
  "figcaption": true,
  "figure": true,
  "footer": true,
  "form": true,
  "frame": true,
  "frameset": true,
  "h1": true,
  "h2": true,
  "h3": true,
  "h4": true,
  "h5": true,
  "h6": true,
  "head": true,
  "header": true,
  "hgroup": true,
  "hr": true,
  "html": true,
  "iframe": true,
  "img": true,
  "input": true,
  "isindex": true, // The 'isindex' element has been removed, but keep it for backwards compatibility.
  "keygen": true,
  "li": true,
  "link": true,
  "listing": true,
  "main": true,
  "marquee": true,
  "menu": true,
  "meta": true,
  "nav": true,
  "noembed": true,
  "noframes": true,
  "noscript": true,
  "object": true,
  "ol": true,
  "p": true,
  "param": true,
  "plaintext": true,
  "pre": true,
  "script": true,
  "section": true,
  "select": true,
  "source": true,
  "style": true,
  "summary": true,
  "table": true,
  "tbody": true,
  "td": true,
  "template": true,
  "textarea": true,
  "tfoot": true,
  "th": true,
  "thead": true,
  "title": true,
  "tr": true,
  "track": true,
  "ul": true,
  "wbr": true,
  "xmp": true,
};

export function HtmlIsSpecialElement(element: HtmlNode): boolean {
  switch (element.Namespace) {
    case "html":
    case "":
      return HtmlIsSpecialElementMap[element.Data];
    case "math":
      switch (element.Data) {
        case "mi":
        case "mo":
        case "mn":
        case "ms":
        case "mtext":
        case "annotation-xml":
          return true;
      }
      break;
    case "svg":
      switch (element.Data) {
        case "foreignObject":
        case "desc":
        case "title":
          return true;
      }
      break;
  }
  return false;
}
