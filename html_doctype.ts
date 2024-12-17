import { HtmlNode, HtmlNodeTypeEnum } from "./html_node.ts";
import { HtmlWhitespace } from "./html_parse.ts";
import { StringTrimLeft } from "./util_trim.ts";
import { IndexAny } from "./util_index.ts";
export const HtmlQuirksIDs = [
  "+//silmaril//dtd html pro v0r11 19970101//",
  "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
  "-//as//dtd html 3.0 aswedit + extensions//",
  "-//ietf//dtd html 2.0 level 1//",
  "-//ietf//dtd html 2.0 level 2//",
  "-//ietf//dtd html 2.0 strict level 1//",
  "-//ietf//dtd html 2.0 strict level 2//",
  "-//ietf//dtd html 2.0 strict//",
  "-//ietf//dtd html 2.0//",
  "-//ietf//dtd html 2.1e//",
  "-//ietf//dtd html 3.0//",
  "-//ietf//dtd html 3.2 final//",
  "-//ietf//dtd html 3.2//",
  "-//ietf//dtd html 3//",
  "-//ietf//dtd html level 0//",
  "-//ietf//dtd html level 1//",
  "-//ietf//dtd html level 2//",
  "-//ietf//dtd html level 3//",
  "-//ietf//dtd html strict level 0//",
  "-//ietf//dtd html strict level 1//",
  "-//ietf//dtd html strict level 2//",
  "-//ietf//dtd html strict level 3//",
  "-//ietf//dtd html strict//",
  "-//ietf//dtd html//",
  "-//metrius//dtd metrius presentational//",
  "-//microsoft//dtd internet explorer 2.0 html strict//",
  "-//microsoft//dtd internet explorer 2.0 html//",
  "-//microsoft//dtd internet explorer 2.0 tables//",
  "-//microsoft//dtd internet explorer 3.0 html strict//",
  "-//microsoft//dtd internet explorer 3.0 html//",
  "-//microsoft//dtd internet explorer 3.0 tables//",
  "-//netscape comm. corp.//dtd html//",
  "-//netscape comm. corp.//dtd strict html//",
  "-//o'reilly and associates//dtd html 2.0//",
  "-//o'reilly and associates//dtd html extended 1.0//",
  "-//o'reilly and associates//dtd html extended relaxed 1.0//",
  "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
  "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
  "-//spyglass//dtd html 2.0 extended//",
  "-//sq//dtd html 2.0 hotmetal + extensions//",
  "-//sun microsystems corp.//dtd hotjava html//",
  "-//sun microsystems corp.//dtd hotjava strict html//",
  "-//w3c//dtd html 3 1995-03-24//",
  "-//w3c//dtd html 3.2 draft//",
  "-//w3c//dtd html 3.2 final//",
  "-//w3c//dtd html 3.2//",
  "-//w3c//dtd html 3.2s draft//",
  "-//w3c//dtd html 4.0 frameset//",
  "-//w3c//dtd html 4.0 transitional//",
  "-//w3c//dtd html experimental 19960712//",
  "-//w3c//dtd html experimental 970421//",
  "-//w3c//dtd w3 html//",
  "-//w3o//dtd w3 html 3.0//",
  "-//webtechs//dtd mozilla html 2.0//",
  "-//webtechs//dtd mozilla html//",
];

export type HtmlParseDoctypeResult = {
  node: HtmlNode;
  quirks: boolean;
};

export function HtmlParseDoctype(doc: string): HtmlParseDoctypeResult {
  const node = new HtmlNode(HtmlNodeTypeEnum.DoctypeNode);
  let quirks = false;

  let space = IndexAny(doc, HtmlWhitespace);

  if (space === -1) {
    space = doc.length;
  }
  node.Data = doc.substring(0, space);
  if (node.Data != "html") {
    quirks = true;
  }
  node.Data = node.Data.toLowerCase();
  doc = StringTrimLeft(doc.substring(space, doc.length), HtmlWhitespace);
  if (doc.length < 6) {
    return { node, quirks: quirks || doc !== "" };
  }
  let key = doc.substring(0, 6).toLowerCase();
  doc = doc.substring(6, doc.length);
  while (key === "public" || key === "system") {
    doc = StringTrimLeft(doc, HtmlWhitespace);
    if (doc === "") {
      break;
    }
    const quote = doc[0];
    if (quote != '"' && quote != "'") {
      break;
    }
    doc = doc.substring(1, doc.length);
    const q = doc.indexOf(quote);
    let id: string;
    if (q === -1) {
      id = doc;
      doc = "";
    } else {
      id = doc.substring(0, q);
      doc = doc.substring(q + 1, doc.length);
    }
    node.Attr.push({ Key: key, Val: id });
    if (key === "public") {
      key = "system";
    } else {
      key = "";
    }
  }

  if (key !== "" || doc !== "") {
    quirks = true;
  } else if (node.Attr.length > 0) {
    if (node.Attr[0].Key === "public") {
      const publicId = node.Attr[0].Val.toLowerCase();
      switch (publicId) {
        case "-//w3o//dtd w3 html strict 3.0//en//":
        case "-/w3d/dtd html 4.0 transitional/en":
        case "html":
          quirks = true;
          break;
        default:
          for (const q of HtmlQuirksIDs) {
            if (publicId.startsWith(q)) {
              quirks = true;
              break;
            }
          }
      }
      // The following two public IDs only cause quirks mode if there is no system ID.
      if (
        node.Attr.length === 1 &&
        (publicId.startsWith("-//w3c//dtd html 4.01 frameset//") ||
          publicId.startsWith("-//w3c//dtd html 4.01 transitional//"))
      ) {
        quirks = true;
      }
    }
    if (
      node.Attr[node.Attr.length - 1].Key === "system" &&
      node.Attr[node.Attr.length - 1].Val.toLowerCase() ===
        "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd"
    ) {
      quirks = true;
    }
  }
  return { node, quirks };
}
