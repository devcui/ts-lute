export const ItemBacktick = "`".charCodeAt(0);
export const ItemTilde = "~".charCodeAt(0);
export const ItemBang = "!".charCodeAt(0);
export const ItemCrosshatch = "#".charCodeAt(0);
export const ItemAsterisk = "*".charCodeAt(0);
export const ItemOpenParen = "(".charCodeAt(0);
export const ItemCloseParen = ")".charCodeAt(0);
export const ItemHyphen = "-".charCodeAt(0);
export const ItemUnderscore = "_".charCodeAt(0);
export const ItemPlus = "+".charCodeAt(0);
export const ItemEqual = "=".charCodeAt(0);
export const ItemTab = "\t".charCodeAt(0);
export const ItemOpenBracket = "[".charCodeAt(0);
export const ItemCloseBracket = "]".charCodeAt(0);
export const ItemDoublequote = '"'.charCodeAt(0);
export const ItemSinglequote = "'".charCodeAt(0);
export const ItemLess = "<".charCodeAt(0);
export const ItemGreater = ">".charCodeAt(0);
export const ItemSpace = " ".charCodeAt(0);
export const ItemNewline = "\n".charCodeAt(0);
export const ItemCarriageReturn = "\r".charCodeAt(0);
export const ItemBackslash = "\\".charCodeAt(0);
export const ItemSlash = "/".charCodeAt(0);
export const ItemDot = ".".charCodeAt(0);
export const ItemColon = ":".charCodeAt(0);
export const ItemQuestion = "?".charCodeAt(0);
export const ItemAmpersand = "&".charCodeAt(0);
export const ItemSemicolon = ";".charCodeAt(0);
export const ItemPipe = "|".charCodeAt(0);
export const ItemDollar = "$".charCodeAt(0);
export const ItemCaret = "^".charCodeAt(0);
export const ItemOpenBrace = "{".charCodeAt(0);
export const ItemCloseBrace = "}".charCodeAt(0);

// IsWhitespace 判断 token 是否是空白。
export function IsWhitespace(token: number): boolean {
  return (
    ItemSpace === token ||
    ItemNewline === token ||
    ItemTab === token ||
    0x0b === token ||
    0x0c === token ||
    0x0d === token
  );
}

// IsUnicodeWhitespace 判断 token 是否是 Unicode 空白。
export function IsUnicodeWhitespace(r: number): boolean {
  return (
    /\s/.test(String.fromCharCode(r)) ||
    (r >= 0x2000 && r <= 0x200a) ||
    r === 0x2028 ||
    r === 0x2029 ||
    r === 0x202f ||
    r === 0x205f ||
    r === 0x3000
  );
}

// IsDigit 判断 token 是否为数字 0-9。
export function IsDigit(token: number): boolean {
  return token >= 48 && token <= 57; // '0' <= token <= '9'
}

// IsHexDigit 判断 token 是否是十六进制数字。
export function IsHexDigit(token: number): boolean {
  return (
    IsDigit(token) ||
    (token >= 97 && token <= 102) ||
    (token >= 65 && token <= 70)
  ); // 'a' <= token <= 'f' || 'A' <= token <= 'F'
}

// TokenToUpper 将 token 转为大写。
export function TokenToUpper(token: number): number {
  if (token >= 97 && token <= 122) {
    // 'a' <= token <= 'z'
    return token - 32; // 'a' - 'A'
  }
  return token;
}

// IsASCIIPunct 判断 token 是否是一个 ASCII 标点符号。
export function IsASCIIPunct(token: number): boolean {
  return (
    (token >= 33 && token <= 47) ||
    (token >= 58 && token <= 64) ||
    (token >= 91 && token <= 96) ||
    (token >= 123 && token <= 126)
  );
}

// IsASCIILetter 判断 token 是否是一个 ASCII 字母。
export function IsASCIILetter(token: number): boolean {
  return (token >= 65 && token <= 90) || (token >= 97 && token <= 122); // 'A' <= token <= 'Z' || 'a' <= token <= 'z'
}

// IsASCIILetterNum 判断 token 是否是一个 ASCII 字母或数字。
export function IsASCIILetterNum(token: number): boolean {
  return IsASCIILetter(token) || IsDigit(token);
}

// IsASCIILetterNums 判断 tokens 是否是 ASCII 字母或数字组成。
export function IsASCIILetterNums(tokens: Uint8Array): boolean {
  for (const token of tokens) {
    if (!IsASCIILetterNum(token)) {
      return false;
    }
  }
  return true;
}

// IsASCIILetterNumHyphen 判断 token 是否是一个 ASCII 字母、数字或者横线 -。
export function IsASCIILetterNumHyphen(token: number): boolean {
  return IsASCIILetterNum(token) || token === ItemHyphen;
}

// IsControl 判断 token 是否是一个控制字符。
export function IsControl(token: number): boolean {
  return token < 32 || token === 127;
}

// IsBlank 判断 Tokens 是否都为空格。
export function IsBlank(tokens: Uint8Array): boolean {
  for (const token of tokens) {
    if (ItemSpace !== token) {
      return false;
    }
  }
  return true;
}

// Split 将 tokens 按照 separator 分割。
export function Split(tokens: Uint8Array, separator: number): Uint8Array[] {
  const ret: Uint8Array[] = [];
  let line: number[] = [];
  for (const token of tokens) {
    if (token !== separator) {
      line.push(token);
    } else {
      ret.push(new Uint8Array(line));
      line = [];
    }
  }
  if (line.length > 0) {
    ret.push(new Uint8Array(line));
  }
  return ret;
}

// SplitWithoutBackslashEscape 使用 separator 作为分隔符将 Tokens 切分为多个子串，被反斜杠 \ 转义的字符不会计入切分。
export function SplitWithoutBackslashEscape(
  tokens: Uint8Array,
  separator: number
): Uint8Array[] {
  const ret: Uint8Array[] = [];
  let line: number[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token !== separator || IsBackslashEscapePunct(tokens, i)) {
      line.push(token);
    } else {
      ret.push(new Uint8Array(line));
      line = [];
    }
  }
  if (line.length > 0) {
    ret.push(new Uint8Array(line));
  }
  return ret;
}

// ReplaceAll 会将 Tokens 中的所有 old 使用 new 替换。
export function ReplaceAll(
  tokens: Uint8Array,
  oldToken: number,
  newToken: number
): Uint8Array {
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === oldToken) {
      tokens[i] = newToken;
    }
  }
  return tokens;
}

// ReplaceNewlineSpace 会将 Tokens 中的所有 "\n " 替换为 "\n"。
export function ReplaceNewlineSpace(tokens: Uint8Array): Uint8Array {
  for (let i = tokens.length - 1; i >= 0; i--) {
    if (
      tokens[i] === ItemNewline &&
      (tokens[i + 1] === ItemSpace || tokens[i + 1] === ItemNewline)
    ) {
      tokens = tokens.subarray(0, i + 1);
    }
  }
  return tokens;
}

// TrimWhitespace 去除 tokens 两端的空白字符。
export function TrimWhitespace(tokens: Uint8Array): Uint8Array {
  return Trim(tokens)[2];
}

// Trim 去除 tokens 两端的空白字符，并返回去除的空白字符和剩余的字符。
export function Trim(tokens: Uint8Array): [Uint8Array, Uint8Array, Uint8Array] {
  let start = 0;
  let end = tokens.length - 1;

  while (start < tokens.length && IsWhitespace(tokens[start])) {
    start++;
  }

  while (end >= 0 && IsWhitespace(tokens[end])) {
    end--;
  }

  const leftWhitespaces = tokens.subarray(0, start);
  const rightWhitespaces = tokens.subarray(end + 1);
  const remains = tokens.subarray(start, end + 1);

  return [leftWhitespaces, rightWhitespaces, remains];
}

// TrimRight 去除 tokens 右端的空白字符。
export function TrimRight(tokens: Uint8Array): [Uint8Array, Uint8Array] {
  let end = tokens.length - 1;

  while (end >= 0 && IsWhitespace(tokens[end])) {
    end--;
  }

  const whitespaces = tokens.subarray(end + 1);
  const remains = tokens.subarray(0, end + 1);

  return [whitespaces, remains];
}

// TrimLeft 去除 tokens 左端的空白字符。
export function TrimLeft(tokens: Uint8Array): [Uint8Array, Uint8Array] {
  let start = 0;

  while (start < tokens.length && IsWhitespace(tokens[start])) {
    start++;
  }

  const whitespaces = tokens.subarray(0, start);
  const remains = tokens.subarray(start);

  return [whitespaces, remains];
}

// Accept 接受 tokens 中的连续 token。
export function Accept(tokens: Uint8Array, token: number): number {
  let pos = 0;
  while (pos < tokens.length && tokens[pos] === token) {
    pos++;
  }
  return pos;
}

// AcceptTokenss 接受 tokens 中的连续 someTokenss。
export function AcceptTokenss(
  tokens: Uint8Array,
  someTokenss: Uint8Array[]
): number {
  for (let i = 0; i < tokens.length; i++) {
    const remains = tokens.subarray(i);
    for (const someTokens of someTokenss) {
      const pos = AcceptTokens(remains, someTokens);
      if (pos >= 0) {
        return pos;
      }
    }
  }
  return -1;
}

// AcceptTokens 接受 tokens 中的连续 someTokens。
export function AcceptTokens(
  remains: Uint8Array,
  someTokens: Uint8Array
): number {
  for (let pos = 0; pos < someTokens.length; pos++) {
    if (someTokens[pos] !== remains[pos]) {
      return -1;
    }
  }
  return someTokens.length;
}

// IsBlankLine 判断 tokens 是否是空行。
export function IsBlankLine(tokens: Uint8Array): boolean {
  for (const token of tokens) {
    if (token !== ItemSpace && token !== ItemTab && token !== ItemNewline) {
      return false;
    }
  }
  return true;
}

// SplitWhitespace 将 tokens 按照空白字符分割。
export function SplitWhitespace(tokens: Uint8Array): Uint8Array[] {
  const ret: Uint8Array[] = [];
  let line: number[] = [];
  let lastIsWhitespace = false;

  for (const token of tokens) {
    if (IsWhitespace(token)) {
      if (!lastIsWhitespace) {
        ret.push(new Uint8Array(line));
        line = [];
      }
      lastIsWhitespace = true;
    } else {
      line.push(token);
      lastIsWhitespace = false;
    }
  }

  if (line.length > 0) {
    ret.push(new Uint8Array(line));
  }

  return ret;
}

// IsBackslashEscapePunct 判断 tokens 中 pos 所指的值是否是由反斜杠 \ 转义的 ASCII 标点符号。
export function IsBackslashEscapePunct(
  tokens: Uint8Array,
  pos: number
): boolean {
  if (!IsASCIIPunct(tokens[pos])) {
    return false;
  }

  let backslashes = 0;
  for (let i = pos - 1; i >= 0; i--) {
    if (tokens[i] !== ItemBackslash) {
      break;
    }
    backslashes++;
  }
  return backslashes % 2 !== 0;
}

// StatWhitespace 统计 tokens 中的空白字符数量。
export function StatWhitespace(tokens: Uint8Array): [number, number, number] {
  let newlines = 0;
  let spaces = 0;
  let tabs = 0;

  for (const token of tokens) {
    if (token === ItemNewline) {
      newlines++;
    } else if (token === ItemSpace) {
      spaces++;
    } else if (token === ItemTab) {
      tabs++;
    }
  }

  return [newlines, spaces, tabs];
}

// Spnl 判断 tokens 是否是空白行。
export function Spnl(tokens: Uint8Array): [boolean, Uint8Array, Uint8Array] {
  const [passed, remains] = TrimLeft(tokens);
  const [newlines] = StatWhitespace(passed);
  if (newlines > 1) {
    return [false, new Uint8Array(), tokens];
  }
  return [true, passed, remains];
}

// Peek 获取 tokens 中 pos 位置的值。
export function Peek(tokens: Uint8Array, pos: number): number {
  if (pos < tokens.length) {
    return tokens[pos];
  }
  return 0;
}

// BytesShowLength 获取字节数组展示为 UTF8 字符串时的长度。
export function BytesShowLength(bytes: Uint8Array): number {
  let length = 0;
  for (let i = 0; i < bytes.length; i++) {
    if ((bytes[i] & 0xc0) !== 0x80) {
      if (bytes[i] < 0x7f) {
        length++;
      } else {
        length += 2;
      }
    }
  }
  return length;
}

// RepeatBackslashBeforePipe 在管道符号前重复反斜杠。
export function RepeatBackslashBeforePipe(content: string): string {
  const buf: number[] = [];
  let last = 0;
  let backslashCnt = 0;

  for (let i = 0; i < content.length; i++) {
    const b = content.charCodeAt(i);
    if (b === ItemPipe) {
      if (last !== ItemBackslash) {
        buf.push(ItemBackslash);
      }
      if (backslashCnt >= 1) {
        buf.push(ItemBackslash);
      }
    }
    last = b;
    if (last === ItemBackslash) {
      backslashCnt++;
    } else {
      backslashCnt = 0;
    }
    buf.push(b);
  }

  return String.fromCharCode(...buf);
}

// EscapeCommonMarkers 转义常见的标记符号。
export function EscapeCommonMarkers(tokens: Uint8Array): Uint8Array {
  const ret: number[] = [];
  for (let i = 0; i < tokens.length; i++) {
    if (IsCommonInlineMarker(tokens[i])) {
      ret.push(ItemBackslash);
    }
    ret.push(tokens[i]);
  }
  return new Uint8Array(ret);
}

// EscapeProtyleMarkers 转义 Protyle 标记符号。
export function EscapeProtyleMarkers(tokens: Uint8Array): Uint8Array {
  const ret: number[] = [];
  for (let i = 0; i < tokens.length; i++) {
    if (IsProtyleInlineMarker(tokens[i])) {
      ret.push(ItemBackslash);
    }
    ret.push(tokens[i]);
  }
  return new Uint8Array(ret);
}

// IsCommonInlineMarker 判断 token 是否是常见的内联标记符号。
export function IsCommonInlineMarker(token: number): boolean {
  switch (token) {
    case ItemAsterisk:
    case ItemUnderscore:
    case ItemBackslash:
    case ItemBacktick:
    case ItemTilde:
    case ItemDollar:
      return true;
    default:
      return false;
  }
}

// IsProtyleInlineMarker 判断 token 是否是 Protyle 内联标记符号。
export function IsProtyleInlineMarker(token: number): boolean {
  switch (token) {
    case ItemAsterisk:
    case ItemUnderscore:
    case ItemBackslash:
    case ItemBacktick:
    case ItemTilde:
    case ItemDollar:
    case ItemEqual:
    case ItemCaret:
    case ItemLess:
    case ItemGreater:
      return true;
    default:
      return false;
  }
}

// IsMarker 判断 token 是否是一个标记符号。
export function IsMarker(token: number): boolean {
  switch (token) {
    case ItemAsterisk:
    case ItemUnderscore:
    case ItemOpenBracket:
    case ItemBang:
    case ItemNewline:
    case ItemBackslash:
    case ItemBacktick:
    case ItemLess:
    case ItemCloseBracket:
    case ItemAmpersand:
    case ItemTilde:
    case ItemDollar:
    case ItemOpenBrace:
    case ItemOpenParen:
    case ItemEqual:
    case ItemCrosshatch:
      return true;
    default:
      return false;
  }
}
