import { Buffer } from "@std/io/buffer";
import { Bytes } from "./types.ts";
import { IndexAny } from "./util_index.ts";
import { HtmlEntities } from "./html_entity.ts";

export const HtmlEscapedChars = "&'<>\"\r"; // 需要转义的HTML字符
export const HtmlReplacementTable: Array<string> = [
  // Windows-1252字符替换表
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

// 将字符串中的特殊字符转义为HTML实体
export function HtmlEscapeString(s: string): string {
  if (IndexAny(s, HtmlEscapedChars) === -1) { // 如果字符串中没有需要转义的字符
    return s;
  }
  const buffer = new Buffer();
  HtmlEscape(buffer, s); // 转义字符串
  return new TextDecoder().decode(buffer.bytes());
}

// 将字符串中的特殊字符转义为HTML实体，并写入缓冲区
export function HtmlEscape(buffer: Buffer, s: string): void {
  let i = IndexAny(s, HtmlEscapedChars);
  const encoder = new TextEncoder();
  while (i !== -1) {
    buffer.write(encoder.encode(s.slice(0, i))); // 写入转义前的部分
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
        throw new Error("unrecognized escape character"); // 未识别的转义字符
    }
    s = s.slice(i + 1);
    buffer.write(encoder.encode(esc)); // 写入转义后的部分
    i = IndexAny(s, HtmlEscapedChars);
  }
  buffer.write(encoder.encode(s)); // 写入剩余部分
}

// 将字符串中的HTML实体转义回原始字符
export function HtmlUnescapeString(s: string): string {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "&") { // 如果字符串中有转义字符
      return decoder.decode(HtmlUnescape(encoder.encode(s), false));
    }
  }
  return s;
}

// 将字节数组中的HTML实体转义回原始字符
export function HtmlUnescape(b: Bytes, attribute: boolean): Bytes {
  for (let i = 0; i < b.length; i++) {
    if (b[i] === "&".charCodeAt(0)) { // 如果字节数组中有转义字符
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

// 解析并转义HTML实体
export function HtmlUnescapeEntity(
  bytes: Uint8Array,
  dst: number,
  src: number,
  attribute: boolean,
): { dst: number; src: number } {
  let i = 1;
  const s = bytes.slice(src);
  const encoder = new TextEncoder();

  if (s.length <= 1) {
    bytes[dst] = bytes[src];
    return { dst: dst + 1, src: src + 1 };
  }

  if (s[i] === 35) { // ASCII码 '#'，表示数字实体
    if (s.length <= 3) { // 至少需要 "&#."
      bytes[dst] = bytes[src];
      return { dst: dst + 1, src: src + 1 };
    }
    i++;
    let c = s[i];
    let hex = false;
    if (c === 120 || c === 88) { // ASCII码 'x' 和 'X'，表示十六进制
      hex = true;
      i++;
    }

    let x = 0;
    while (i < s.length) {
      c = s[i];
      i++;
      if (hex) {
        if (48 <= c && c <= 57) { // ASCII码 '0' 到 '9'
          x = 16 * x + c - 48;
          continue;
        } else if (97 <= c && c <= 102) { // ASCII码 'a' 到 'f'
          x = 16 * x + c - 97 + 10;
          continue;
        } else if (65 <= c && c <= 70) { // ASCII码 'A' 到 'F'
          x = 16 * x + c - 65 + 10;
          continue;
        }
      } else if (48 <= c && c <= 57) { // ASCII码 '0' 到 '9'
        x = 10 * x + c - 48;
        continue;
      }
      if (c !== 59) { // ASCII码 ';'
        i--;
      }
      break;
    }

    if (i <= 3) { // 没有匹配到字符
      bytes[dst] = bytes[src];
      return { dst: dst + 1, src: src + 1 };
    }

    if (128 <= x && x <= 159) {
      // 将Windows-1252字符替换为UTF-8等价字符
      x = HtmlReplacementTable[x - 128].charCodeAt(0);
    } else if (x === 0 || (55296 <= x && x <= 57343) || x > 1114111) {
      // 将无效字符替换为替换字符
      x = 65533; // Unicode替换字符
    }

    const encoded = encoder.encode(String.fromCodePoint(x));
    bytes.set(encoded, dst);
    return { dst: dst + encoded.length, src: src + i };
  }

  // 消耗尽可能多的字符，匹配命名引用
  while (i < s.length) {
    const c = s[i];
    i++;
    // 小写字符在实体中更常见，所以我们先检查它们
    if ((97 <= c && c <= 122) || (65 <= c && c <= 90) || (48 <= c && c <= 57)) { // ASCII码 'a'-'z', 'A'-'Z', '0'-'9'
      continue;
    }
    if (c !== 59) { // ASCII码 ';'
      i--;
    }
    break;
  }

  const max = i < 1 ? 1 : i;
  const entityName = String.fromCharCode(...s.slice(1, max));
  if (entityName === "") {
    // 无操作
  } else if (attribute && entityName[entityName.length - 1] !== ';' && s.length > i && s[i] === 61) { // ASCII码 '='
    // 无操作
  } else if (HtmlEntities[entityName]) {
    const encoded = encoder.encode(HtmlEntities[entityName]);
    bytes.set(encoded, dst);
    return { dst: dst + encoded.length, src: src + i };
  } else if (!attribute) {
    let maxLen = entityName.length - 1;
    if (maxLen > 6) {
      maxLen = 6;
    }
    for (let j = maxLen; j > 1; j--) {
      if (HtmlEntities[entityName.slice(0, j)]) {
        const encoded = encoder.encode(HtmlEntities[entityName.slice(0, j)]);
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