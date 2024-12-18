import { Buffer } from "@std/io/buffer";
import { Bytes } from "./types.ts";
import { IndexAny } from "./util_index.ts";

export const HtmlEscapedChars = "&'<>\"\r";
export const HtmlReplacementTable: Array<string> = [
  "\u20AC", // First entry is what 0x80 should be replaced with.
  "\u0081",
  "\u201A",
  "\u0192",
  "\u201E",
  "\u2026",
  "\u2020",
  "\u2021",
  "\u02C6",
  "\u2030",
  "\u0160",
  "\u2039",
  "\u0152",
  "\u008D",
  "\u017D",
  "\u008F",
  "\u0090",
  "\u2018",
  "\u2019",
  "\u201C",
  "\u201D",
  "\u2022",
  "\u2013",
  "\u2014",
  "\u02DC",
  "\u2122",
  "\u0161",
  "\u203A",
  "\u0153",
  "\u009D",
  "\u017E",
  "\u0178", // Last entry is 0x9F.
  // 0x00->'\uFFFD' is handled programmatically.
  // 0x0D->'\u000D' is a no-op
];

export function HtmlEscapeString(s: string): string {
  if (IndexAny(s, HtmlEscapedChars) === -1) {
    return s;
  }
  const buffer = new Buffer();
  HtmlEscape(buffer, s);
  return new TextDecoder().decode(buffer.bytes());
}

export function HtmlEscape(buffer: Buffer, s: string): void {
  let i = IndexAny(s, HtmlEscapedChars);
  const encoder = new TextEncoder();
  while (i !== -1) {
    buffer.write(encoder.encode(s.slice(0, i)));
    let esc: string;
    switch (s[i]) {
      case "&":
        esc = "&amp;";
        break;
      case "'":
        // "&#39;" is shorter than "&apos;" and apos was not in HTML until HTML5.
        esc = "&#39;";
        break;
      case "<":
        esc = "&lt;";
        break;
      case ">":
        esc = "&gt;";
        break;
      case '"':
        // "&#34;" is shorter than "&quot;".
        esc = "&#34;";
        break;
      case "\r":
        esc = "&#13;";
        break;
      default:
        throw new Error("unrecognized escape character");
    }

    s = s.slice(i + 1);
    buffer.write(encoder.encode(esc));
    i = IndexAny(s, HtmlEscapedChars);
  }

  buffer.write(encoder.encode(s));
}

export function HtmlUnescapeString(s: string): string {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "&") {
      return decoder.decode(HtmlUnescape(encoder.encode(s), false));
    }
  }
  return s;
}

export function HtmlUnescape(b: Bytes, attribute: boolean): Uint8Array {
  for (let i = 0; i < b.length; i++) {
    if (b[i] === "&".charCodeAt(0)) {
      let { dst, src } = HtmlUnescapeEntity(b, i, i, attribute);
      while (src < b.length) {
        const c = b[src];
        if (c === "&".charCodeAt(0)) {
          const res = HtmlUnescapeEntity(b, dst, src, attribute);
          dst = res.dst;
          src = res.src;
        } else {
          b[dst] = c;
          dst++;
          src++;
        }
      }
      return b.slice(0, dst);
    }
  }
  return b;
}

// unescapeEntity reads an entity like "&lt;" from b[src:] and writes the
// corresponding "<" to b[dst:], returning the incremented dst and src cursors.
// Precondition: b[src] == '&' && dst <= src.
// attribute should be true if parsing an attribute value.
export function HtmlUnescapeEntity(
  bytes: Bytes,
  dst: number,
  src: number,
  attribute: boolean,
): {
  dst: number;
  src: number;
} {
  // https://html.spec.whatwg.org/multipage/syntax.html#consume-a-character-reference

  // i starts at 1 because we already know that s[0] == '&'.
  const index = 1;
  const newBytes = bytes.slice(src, bytes.length);
  if (newBytes.length <= 1) {
    bytes[dst] = bytes[src];
    return { dst: dst + 1, src: src + 1 };
  }

  return { dst, src };
}

export function HtmlLower(b: Bytes): Uint8Array {
  for (let i = 0; i < b.length; i++) {
    const c = b[i];
    if ("A".charCodeAt(0) <= c && c <= "Z".charCodeAt(0)) {
      b[i] = c + "a".charCodeAt(0) - "A".charCodeAt(0);
    }
  }
  return b;
}
