import { Buffer } from "@std/io/buffer";
import { Bytes } from "./types.ts";
import { IndexAny } from "./util_index.ts";
import { HtmlEntities } from "./html_entity.ts";

export const HtmlEscapedChars = "&'<>\"\r";
export const HtmlReplacementTable: Array<string> = [
  "\u20AC",
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
  "\u0178",
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

export function HtmlUnescapeEntity(
  bytes: Uint8Array,
  dst: number,
  src: number,
  attribute: boolean,
): { dst: number; src: number } {
  let i = 1;
  const s = bytes.slice(src);

  if (s.length <= 1) {
    bytes[dst] = bytes[src];
    return { dst: dst + 1, src: src + 1 };
  }

  if (s[i] === "#".charCodeAt(0)) {
    if (s.length <= 3) {
      bytes[dst] = bytes[src];
      return { dst: dst + 1, src: src + 1 };
    }
    i++;
    let c = s[i];
    let hex = false;
    if (c === "x".charCodeAt(0) || c === "X".charCodeAt(0)) {
      hex = true;
      i++;
    }

    let x = 0;
    while (i < s.length) {
      c = s[i];
      i++;
      if (hex) {
        if ("0".charCodeAt(0) <= c && c <= "9".charCodeAt(0)) {
          x = 16 * x + c - "0".charCodeAt(0);
          continue;
        } else if ("a".charCodeAt(0) <= c && c <= "f".charCodeAt(0)) {
          x = 16 * x + c - "a".charCodeAt(0) + 10;
          continue;
        } else if ("A".charCodeAt(0) <= c && c <= "F".charCodeAt(0)) {
          x = 16 * x + c - "A".charCodeAt(0) + 10;
          continue;
        }
      } else if ("0".charCodeAt(0) <= c && c <= "9".charCodeAt(0)) {
        x = 10 * x + c - "0".charCodeAt(0);
        continue;
      }
      if (c !== ";".charCodeAt(0)) {
        i--;
      }
      break;
    }

    if (i <= 3) {
      bytes[dst] = bytes[src];
      return { dst: dst + 1, src: src + 1 };
    }

    if (0x80 <= x && x <= 0x9F) {
      x = HtmlReplacementTable[x - 0x80].charCodeAt(0);
    } else if (x === 0 || (0xD800 <= x && x <= 0xDFFF) || x > 0x10FFFF) {
      x = 0xFFFD;
    }

    const encoded = new TextEncoder().encode(String.fromCodePoint(x));
    bytes.set(encoded, dst);
    return { dst: dst + encoded.length, src: src + i };
  }

  for (i = 1; i < s.length; i++) {
    const c = s[i];
    if (
      ("a".charCodeAt(0) <= c && c <= "z".charCodeAt(0)) ||
      ("A".charCodeAt(0) <= c && c <= "Z".charCodeAt(0)) ||
      ("0".charCodeAt(0) <= c && c <= "9".charCodeAt(0))
    ) {
      continue;
    }
    if (c !== ";".charCodeAt(0)) {
      i--;
    }
    break;
  }

  const max = i < 1 ? 1 : i;
  const entityName = new TextDecoder().decode(s.slice(1, max));
  if (entityName === "") {
    // No-op.
  } else if (
    attribute &&
    entityName[entityName.length - 1] !== ";" &&
    s.length > i &&
    s[i] === "=".charCodeAt(0)
  ) {
    // No-op.
  } else if (HtmlEntities[entityName]) {
    const encoded = new TextEncoder().encode(HtmlEntities[entityName]);
    bytes.set(encoded, dst);
    return { dst: dst + encoded.length, src: src + i };
  } else if (!attribute) {
    let maxLen = entityName.length - 1;
    if (maxLen > 6) {
      maxLen = 6;
    }
    for (let j = maxLen; j > 1; j--) {
      if (HtmlEntities[entityName.slice(0, j)]) {
        const encoded = new TextEncoder().encode(
          HtmlEntities[entityName.slice(0, j)],
        );
        bytes.set(encoded, dst);
        return { dst: dst + encoded.length, src: src + j + 1 };
      }
    }
  }

  const dst1 = dst + i;
  const src1 = src + i;
  bytes.set(bytes.slice(src, src1), dst);
  return { dst: dst1, src: src1 };
}
