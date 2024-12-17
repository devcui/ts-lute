import { HtmlNode, HtmlNodeTypeEnum } from "./html_node.ts";
import { HtmlWhitespace } from "./html_parse.ts";
import { TrimLeft } from "./util_trim.ts";

export const HtmlQuirkyIDs = [
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
  quirky: boolean;
};

export function HtmlParseDoctype(str: string): HtmlParseDoctypeResult {
  const n = new HtmlNode(HtmlNodeTypeEnum.DoctypeNode);
  let quirky = false;

  // Find the name.
  let space = str.search(HtmlWhitespace);
  console.log(`space: ${space}`);
  if (space === -1) {
    space = str.length;
    console.log(`space adjusted: ${space}`);
  }
  n.Data = str.substring(0, space);
  // The comparison to "html" is case-sensitive.
  if (n.Data !== "html") {
    quirky = true;
  }
  n.Data = n.Data.toLowerCase();
  str = TrimLeft(str.substring(space), HtmlWhitespace);
  console.log(`str after TrimLeft: ${str}`);

  if (str.length < 6) {
    // It can't start with "PUBLIC" or "SYSTEM".
    // Ignore the rest of the string.
    return { node: n, quirky: quirky || str !== "" };
  }

  let key = str.substring(0, 6).toLowerCase();
  str = str.substring(6);
  while (key === "public" || key === "system") {
    str = TrimLeft(str, HtmlWhitespace);
    if (str === "") {
      break;
    }
    const quote = str[0];
    if (quote !== '"' && quote !== "'") {
      break;
    }
    str = str.substring(1);
    const q = str.indexOf(quote);
    let id;
    if (q === -1) {
      id = str;
      str = "";
    } else {
      id = str.substring(0, q);
      str = str.substring(q + 1);
    }
    n.Attr.push({ Key: key, Val: id });
    if (key === "public") {
      key = "system";
    } else {
      key = "";
    }
  }

  if (key !== "" || str !== "") {
    quirky = true;
  } else if (n.Attr.length > 0) {
    if (n.Attr[0].Key === "public") {
      const publicID = n.Attr[0].Val.toLowerCase();
      switch (publicID) {
        case "-//w3o//dtd w3 html strict 3.0//en//":
        case "-/w3d/dtd html 4.0 transitional/en":
        case "html":
          quirky = true;
          break;
        default:
          for (const qid of HtmlQuirkyIDs) {
            if (publicID.startsWith(qid)) {
              quirky = true;
              break;
            }
          }
      }
      // The following two public IDs only cause quirks mode if there is no system ID.
      if (
        n.Attr.length === 1 &&
        (publicID.startsWith("-//w3c//dtd html 4.01 frameset//") ||
          publicID.startsWith("-//w3c//dtd html 4.01 transitional//"))
      ) {
        quirky = true;
      }
    }
    const lastAttr = n.Attr[n.Attr.length - 1];
    if (
      lastAttr.Key === "system" &&
      lastAttr.Val.toLowerCase() ===
        "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd"
    ) {
      quirky = true;
    }
  }

  return { node: n, quirky: quirky };
}
