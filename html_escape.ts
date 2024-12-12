import { Buffer } from "@std/io/buffer";

export const HtmlEscapedChars = /[&'<>\"\r]/;

export function HtmlEscape(w: Buffer, s: string): void {
  let i = s.search(HtmlEscapedChars);
  while (i !== -1) {
    w.writeSync(new TextEncoder().encode(s.slice(0, i)));
    let esc: string;
    switch (s[i]) {
      case "&":
        esc = "&amp;";
        break;
      case "'":
        esc = "&#39;";
        break;
      case "<":
        esc = "&lt;";
        break;
      case ">":
        esc = "&gt;";
        break;
      case '"':
        esc = "&#34;";
        break;
      case "\r":
        esc = "&#13;";
        break;
      default:
        throw new Error("unrecognized escape character");
    }
    w.writeSync(new TextEncoder().encode(esc));
    s = s.slice(i + 1);
    i = s.search(HtmlEscapedChars);
  }
  w.writeSync(new TextEncoder().encode(s));
}
