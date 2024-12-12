import { assert } from "@std/assert/assert";
import {
  IsASCIILetter,
  IsASCIILetterNum,
  IsASCIILetterNumHyphen,
  IsASCIILetterNums,
  IsASCIIPunct,
  IsBlank,
  IsControl,
  IsDigit,
  IsHexDigit,
  IsUnicodeWhitespace,
  IsWhitespace,
  TokenToUpper,
  Split,
  SplitWithoutBackslashEscape,
  ReplaceAll,
  ReplaceNewlineSpace,
  TrimWhitespace,
  Trim,
  TrimRight,
  TrimLeft,
  Accept,
  AcceptTokenss,
  AcceptTokens,
  IsBlankLine,
  SplitWhitespace,
  IsBackslashEscapePunct,
  StatWhitespace,
  Spnl,
  Peek,
  BytesShowLength,
  RepeatBackslashBeforePipe,
  EscapeCommonMarkers,
  EscapeProtyleMarkers,
  IsCommonInlineMarker,
  IsProtyleInlineMarker,
  IsMarker,
} from "./lex_token.ts";

Deno.test("IsWhiteSpace", () => {
  assert(IsWhitespace(" ".charCodeAt(0)));
  assert(IsWhitespace("\n".charCodeAt(0)));
  assert(IsWhitespace("\t".charCodeAt(0)));
  assert(IsWhitespace("\u000b".charCodeAt(0)));
  assert(IsWhitespace("\u000c".charCodeAt(0)));
  assert(IsWhitespace("\u000d".charCodeAt(0)));
});

Deno.test("IsUnicodeWhitespace", () => {
  // 测试常见的空白字符
  assert(IsUnicodeWhitespace(" ".charCodeAt(0)));
  assert(IsUnicodeWhitespace("\n".charCodeAt(0)));
  assert(IsUnicodeWhitespace("\t".charCodeAt(0)));
  assert(IsUnicodeWhitespace("\u000b".charCodeAt(0)));
  assert(IsUnicodeWhitespace("\u000c".charCodeAt(0)));
  assert(IsUnicodeWhitespace("\u000d".charCodeAt(0)));

  // 测试 Unicode 空白字符
  assert(IsUnicodeWhitespace(0x2000));
  assert(IsUnicodeWhitespace(0x2001));
  assert(IsUnicodeWhitespace(0x2002));
  assert(IsUnicodeWhitespace(0x2003));
  assert(IsUnicodeWhitespace(0x2004));
  assert(IsUnicodeWhitespace(0x2005));
  assert(IsUnicodeWhitespace(0x2006));
  assert(IsUnicodeWhitespace(0x2007));
  assert(IsUnicodeWhitespace(0x2008));
  assert(IsUnicodeWhitespace(0x2009));
  assert(IsUnicodeWhitespace(0x200a));
  assert(IsUnicodeWhitespace(0x2028));
  assert(IsUnicodeWhitespace(0x2029));
  assert(IsUnicodeWhitespace(0x202f));
  assert(IsUnicodeWhitespace(0x205f));
  assert(IsUnicodeWhitespace(0x3000));

  // 测试非空白字符
  assert(!IsUnicodeWhitespace("A".charCodeAt(0)));
  assert(!IsUnicodeWhitespace("1".charCodeAt(0)));
  assert(!IsUnicodeWhitespace(".".charCodeAt(0)));
  assert(!IsUnicodeWhitespace(0x200b)); // Zero Width Space (not considered whitespace in this context)
});

Deno.test("IsDigit", () => {
  // 测试数字字符
  assert(IsDigit("0".charCodeAt(0)));
  assert(IsDigit("1".charCodeAt(0)));
  assert(IsDigit("2".charCodeAt(0)));
  assert(IsDigit("3".charCodeAt(0)));
  assert(IsDigit("4".charCodeAt(0)));
  assert(IsDigit("5".charCodeAt(0)));
  assert(IsDigit("6".charCodeAt(0)));
  assert(IsDigit("7".charCodeAt(0)));
  assert(IsDigit("8".charCodeAt(0)));
  assert(IsDigit("9".charCodeAt(0)));

  // 测试非数字字符
  assert(!IsDigit("A".charCodeAt(0)));
  assert(!IsDigit(" ".charCodeAt(0)));
  assert(!IsDigit(".".charCodeAt(0)));
  assert(!IsDigit("-".charCodeAt(0)));
});

Deno.test("IsHexDigit", () => {
  // 测试十六进制数字字符
  assert(IsHexDigit("0".charCodeAt(0)));
  assert(IsHexDigit("1".charCodeAt(0)));
  assert(IsHexDigit("2".charCodeAt(0)));
  assert(IsHexDigit("3".charCodeAt(0)));
  assert(IsHexDigit("4".charCodeAt(0)));
  assert(IsHexDigit("5".charCodeAt(0)));
  assert(IsHexDigit("6".charCodeAt(0)));
  assert(IsHexDigit("7".charCodeAt(0)));
  assert(IsHexDigit("8".charCodeAt(0)));
  assert(IsHexDigit("9".charCodeAt(0)));
  assert(IsHexDigit("a".charCodeAt(0)));
  assert(IsHexDigit("b".charCodeAt(0)));
  assert(IsHexDigit("c".charCodeAt(0)));
  assert(IsHexDigit("d".charCodeAt(0)));
  assert(IsHexDigit("e".charCodeAt(0)));
  assert(IsHexDigit("f".charCodeAt(0)));
  assert(IsHexDigit("A".charCodeAt(0)));
  assert(IsHexDigit("B".charCodeAt(0)));
  assert(IsHexDigit("C".charCodeAt(0)));
  assert(IsHexDigit("D".charCodeAt(0)));
  assert(IsHexDigit("E".charCodeAt(0)));
  assert(IsHexDigit("F".charCodeAt(0)));

  // 测试非十六进制数字字符
  assert(!IsHexDigit("g".charCodeAt(0)));
  assert(!IsHexDigit("G".charCodeAt(0)));
  assert(!IsHexDigit(" ".charCodeAt(0)));
  assert(!IsHexDigit(".".charCodeAt(0)));
  assert(!IsHexDigit("-".charCodeAt(0)));
});

Deno.test("TokenToUpper", () => {
  // 测试小写字母
  assert(TokenToUpper("a".charCodeAt(0)) === "A".charCodeAt(0));
  assert(TokenToUpper("b".charCodeAt(0)) === "B".charCodeAt(0));
  assert(TokenToUpper("c".charCodeAt(0)) === "C".charCodeAt(0));
  assert(TokenToUpper("d".charCodeAt(0)) === "D".charCodeAt(0));
  assert(TokenToUpper("e".charCodeAt(0)) === "E".charCodeAt(0));
  assert(TokenToUpper("f".charCodeAt(0)) === "F".charCodeAt(0));
  assert(TokenToUpper("g".charCodeAt(0)) === "G".charCodeAt(0));
  assert(TokenToUpper("h".charCodeAt(0)) === "H".charCodeAt(0));
  assert(TokenToUpper("i".charCodeAt(0)) === "I".charCodeAt(0));
  assert(TokenToUpper("j".charCodeAt(0)) === "J".charCodeAt(0));
  assert(TokenToUpper("k".charCodeAt(0)) === "K".charCodeAt(0));
  assert(TokenToUpper("l".charCodeAt(0)) === "L".charCodeAt(0));
  assert(TokenToUpper("m".charCodeAt(0)) === "M".charCodeAt(0));
  assert(TokenToUpper("n".charCodeAt(0)) === "N".charCodeAt(0));
  assert(TokenToUpper("o".charCodeAt(0)) === "O".charCodeAt(0));
  assert(TokenToUpper("p".charCodeAt(0)) === "P".charCodeAt(0));
  assert(TokenToUpper("q".charCodeAt(0)) === "Q".charCodeAt(0));
  assert(TokenToUpper("r".charCodeAt(0)) === "R".charCodeAt(0));
  assert(TokenToUpper("s".charCodeAt(0)) === "S".charCodeAt(0));
  assert(TokenToUpper("t".charCodeAt(0)) === "T".charCodeAt(0));
  assert(TokenToUpper("u".charCodeAt(0)) === "U".charCodeAt(0));
  assert(TokenToUpper("v".charCodeAt(0)) === "V".charCodeAt(0));
  assert(TokenToUpper("w".charCodeAt(0)) === "W".charCodeAt(0));
  assert(TokenToUpper("x".charCodeAt(0)) === "X".charCodeAt(0));
  assert(TokenToUpper("y".charCodeAt(0)) === "Y".charCodeAt(0));
  assert(TokenToUpper("z".charCodeAt(0)) === "Z".charCodeAt(0));

  // 测试非小写字母
  assert(TokenToUpper("A".charCodeAt(0)) === "A".charCodeAt(0));
  assert(TokenToUpper("1".charCodeAt(0)) === "1".charCodeAt(0));
  assert(TokenToUpper(".".charCodeAt(0)) === ".".charCodeAt(0));
  assert(TokenToUpper(" ".charCodeAt(0)) === " ".charCodeAt(0));
});

Deno.test("IsASCIIPunct", () => {
  // 测试 ASCII 标点符号
  assert(IsASCIIPunct("!".charCodeAt(0)));
  assert(IsASCIIPunct('"'.charCodeAt(0)));
  assert(IsASCIIPunct("#".charCodeAt(0)));
  assert(IsASCIIPunct("$".charCodeAt(0)));
  assert(IsASCIIPunct("%".charCodeAt(0)));
  assert(IsASCIIPunct("&".charCodeAt(0)));
  assert(IsASCIIPunct("'".charCodeAt(0)));
  assert(IsASCIIPunct("(".charCodeAt(0)));
  assert(IsASCIIPunct(")".charCodeAt(0)));
  assert(IsASCIIPunct("*".charCodeAt(0)));
  assert(IsASCIIPunct("+".charCodeAt(0)));
  assert(IsASCIIPunct(",".charCodeAt(0)));
  assert(IsASCIIPunct("-".charCodeAt(0)));
  assert(IsASCIIPunct(".".charCodeAt(0)));
  assert(IsASCIIPunct("/".charCodeAt(0)));
  assert(IsASCIIPunct(":".charCodeAt(0)));
  assert(IsASCIIPunct(";".charCodeAt(0)));
  assert(IsASCIIPunct("<".charCodeAt(0)));
  assert(IsASCIIPunct("=".charCodeAt(0)));
  assert(IsASCIIPunct(">".charCodeAt(0)));
  assert(IsASCIIPunct("?".charCodeAt(0)));
  assert(IsASCIIPunct("@".charCodeAt(0)));
  assert(IsASCIIPunct("[".charCodeAt(0)));
  assert(IsASCIIPunct("\\".charCodeAt(0)));
  assert(IsASCIIPunct("]".charCodeAt(0)));
  assert(IsASCIIPunct("^".charCodeAt(0)));
  assert(IsASCIIPunct("_".charCodeAt(0)));
  assert(IsASCIIPunct("`".charCodeAt(0)));
  assert(IsASCIIPunct("{".charCodeAt(0)));
  assert(IsASCIIPunct("|".charCodeAt(0)));
  assert(IsASCIIPunct("}".charCodeAt(0)));
  assert(IsASCIIPunct("~".charCodeAt(0)));

  // 测试非 ASCII 标点符号
  assert(!IsASCIIPunct(" ".charCodeAt(0))); // 空格
  assert(!IsASCIIPunct("0".charCodeAt(0))); // '0'
  assert(!IsASCIIPunct("A".charCodeAt(0))); // 'A'
  assert(!IsASCIIPunct("a".charCodeAt(0))); // 'a'
  assert(!IsASCIIPunct("\n".charCodeAt(0))); // 换行符
});

Deno.test("IsASCIILetter", () => {
  // 测试 ASCII 大写字母
  assert(IsASCIILetter("A".charCodeAt(0)));
  assert(IsASCIILetter("B".charCodeAt(0)));
  assert(IsASCIILetter("C".charCodeAt(0)));
  assert(IsASCIILetter("D".charCodeAt(0)));
  assert(IsASCIILetter("E".charCodeAt(0)));
  assert(IsASCIILetter("F".charCodeAt(0)));
  assert(IsASCIILetter("G".charCodeAt(0)));
  assert(IsASCIILetter("H".charCodeAt(0)));
  assert(IsASCIILetter("I".charCodeAt(0)));
  assert(IsASCIILetter("J".charCodeAt(0)));
  assert(IsASCIILetter("K".charCodeAt(0)));
  assert(IsASCIILetter("L".charCodeAt(0)));
  assert(IsASCIILetter("M".charCodeAt(0)));
  assert(IsASCIILetter("N".charCodeAt(0)));
  assert(IsASCIILetter("O".charCodeAt(0)));
  assert(IsASCIILetter("P".charCodeAt(0)));
  assert(IsASCIILetter("Q".charCodeAt(0)));
  assert(IsASCIILetter("R".charCodeAt(0)));
  assert(IsASCIILetter("S".charCodeAt(0)));
  assert(IsASCIILetter("T".charCodeAt(0)));
  assert(IsASCIILetter("U".charCodeAt(0)));
  assert(IsASCIILetter("V".charCodeAt(0)));
  assert(IsASCIILetter("W".charCodeAt(0)));
  assert(IsASCIILetter("X".charCodeAt(0)));
  assert(IsASCIILetter("Y".charCodeAt(0)));
  assert(IsASCIILetter("Z".charCodeAt(0)));

  // 测试 ASCII 小写字母
  assert(IsASCIILetter("a".charCodeAt(0)));
  assert(IsASCIILetter("b".charCodeAt(0)));
  assert(IsASCIILetter("c".charCodeAt(0)));
  assert(IsASCIILetter("d".charCodeAt(0)));
  assert(IsASCIILetter("e".charCodeAt(0)));
  assert(IsASCIILetter("f".charCodeAt(0)));
  assert(IsASCIILetter("g".charCodeAt(0)));
  assert(IsASCIILetter("h".charCodeAt(0)));
  assert(IsASCIILetter("i".charCodeAt(0)));
  assert(IsASCIILetter("j".charCodeAt(0)));
  assert(IsASCIILetter("k".charCodeAt(0)));
  assert(IsASCIILetter("l".charCodeAt(0)));
  assert(IsASCIILetter("m".charCodeAt(0)));
  assert(IsASCIILetter("n".charCodeAt(0)));
  assert(IsASCIILetter("o".charCodeAt(0)));
  assert(IsASCIILetter("p".charCodeAt(0)));
  assert(IsASCIILetter("q".charCodeAt(0)));
  assert(IsASCIILetter("r".charCodeAt(0)));
  assert(IsASCIILetter("s".charCodeAt(0)));
  assert(IsASCIILetter("t".charCodeAt(0)));
  assert(IsASCIILetter("u".charCodeAt(0)));
  assert(IsASCIILetter("v".charCodeAt(0)));
  assert(IsASCIILetter("w".charCodeAt(0)));
  assert(IsASCIILetter("x".charCodeAt(0)));
  assert(IsASCIILetter("y".charCodeAt(0)));
  assert(IsASCIILetter("z".charCodeAt(0)));

  // 测试非 ASCII 字母
  assert(!IsASCIILetter("0".charCodeAt(0))); // 数字
  assert(!IsASCIILetter("!".charCodeAt(0))); // 标点符号
  assert(!IsASCIILetter(" ".charCodeAt(0))); // 空格
  assert(!IsASCIILetter("\n".charCodeAt(0))); // 换行符
});

Deno.test("IsASCIILetterNum", () => {
  // 测试 ASCII 大写字母
  assert(IsASCIILetterNum("A".charCodeAt(0)));
  assert(IsASCIILetterNum("B".charCodeAt(0)));
  assert(IsASCIILetterNum("C".charCodeAt(0)));
  assert(IsASCIILetterNum("D".charCodeAt(0)));
  assert(IsASCIILetterNum("E".charCodeAt(0)));
  assert(IsASCIILetterNum("F".charCodeAt(0)));
  assert(IsASCIILetterNum("G".charCodeAt(0)));
  assert(IsASCIILetterNum("H".charCodeAt(0)));
  assert(IsASCIILetterNum("I".charCodeAt(0)));
  assert(IsASCIILetterNum("J".charCodeAt(0)));
  assert(IsASCIILetterNum("K".charCodeAt(0)));
  assert(IsASCIILetterNum("L".charCodeAt(0)));
  assert(IsASCIILetterNum("M".charCodeAt(0)));
  assert(IsASCIILetterNum("N".charCodeAt(0)));
  assert(IsASCIILetterNum("O".charCodeAt(0)));
  assert(IsASCIILetterNum("P".charCodeAt(0)));
  assert(IsASCIILetterNum("Q".charCodeAt(0)));
  assert(IsASCIILetterNum("R".charCodeAt(0)));
  assert(IsASCIILetterNum("S".charCodeAt(0)));
  assert(IsASCIILetterNum("T".charCodeAt(0)));
  assert(IsASCIILetterNum("U".charCodeAt(0)));
  assert(IsASCIILetterNum("V".charCodeAt(0)));
  assert(IsASCIILetterNum("W".charCodeAt(0)));
  assert(IsASCIILetterNum("X".charCodeAt(0)));
  assert(IsASCIILetterNum("Y".charCodeAt(0)));
  assert(IsASCIILetterNum("Z".charCodeAt(0)));

  // 测试 ASCII 小写字母
  assert(IsASCIILetterNum("a".charCodeAt(0)));
  assert(IsASCIILetterNum("b".charCodeAt(0)));
  assert(IsASCIILetterNum("c".charCodeAt(0)));
  assert(IsASCIILetterNum("d".charCodeAt(0)));
  assert(IsASCIILetterNum("e".charCodeAt(0)));
  assert(IsASCIILetterNum("f".charCodeAt(0)));
  assert(IsASCIILetterNum("g".charCodeAt(0)));
  assert(IsASCIILetterNum("h".charCodeAt(0)));
  assert(IsASCIILetterNum("i".charCodeAt(0)));
  assert(IsASCIILetterNum("j".charCodeAt(0)));
  assert(IsASCIILetterNum("k".charCodeAt(0)));
  assert(IsASCIILetterNum("l".charCodeAt(0)));
  assert(IsASCIILetterNum("m".charCodeAt(0)));
  assert(IsASCIILetterNum("n".charCodeAt(0)));
  assert(IsASCIILetterNum("o".charCodeAt(0)));
  assert(IsASCIILetterNum("p".charCodeAt(0)));
  assert(IsASCIILetterNum("q".charCodeAt(0)));
  assert(IsASCIILetterNum("r".charCodeAt(0)));
  assert(IsASCIILetterNum("s".charCodeAt(0)));
  assert(IsASCIILetterNum("t".charCodeAt(0)));
  assert(IsASCIILetterNum("u".charCodeAt(0)));
  assert(IsASCIILetterNum("v".charCodeAt(0)));
  assert(IsASCIILetterNum("w".charCodeAt(0)));
  assert(IsASCIILetterNum("x".charCodeAt(0)));
  assert(IsASCIILetterNum("y".charCodeAt(0)));
  assert(IsASCIILetterNum("z".charCodeAt(0)));

  // 测试数字字符
  assert(IsASCIILetterNum("0".charCodeAt(0)));
  assert(IsASCIILetterNum("1".charCodeAt(0)));
  assert(IsASCIILetterNum("2".charCodeAt(0)));
  assert(IsASCIILetterNum("3".charCodeAt(0)));
  assert(IsASCIILetterNum("4".charCodeAt(0)));
  assert(IsASCIILetterNum("5".charCodeAt(0)));
  assert(IsASCIILetterNum("6".charCodeAt(0)));
  assert(IsASCIILetterNum("7".charCodeAt(0)));
  assert(IsASCIILetterNum("8".charCodeAt(0)));
  assert(IsASCIILetterNum("9".charCodeAt(0)));

  // 测试非 ASCII 字母或数字字符
  assert(!IsASCIILetterNum("!".charCodeAt(0))); // 标点符号
  assert(!IsASCIILetterNum(" ".charCodeAt(0))); // 空格
  assert(!IsASCIILetterNum("\n".charCodeAt(0))); // 换行符
});



Deno.test("IsASCIILetterNums", () => {
  // 测试由 ASCII 字母和数字组成的数组
  assert(IsASCIILetterNums(new Uint8Array([65, 66, 67]))); // ABC
  assert(IsASCIILetterNums(new Uint8Array([97, 98, 99]))); // abc
  assert(IsASCIILetterNums(new Uint8Array([48, 49, 50]))); // 012
  assert(IsASCIILetterNums(new Uint8Array([65, 98, 50]))); // Ab2

  // 测试包含非 ASCII 字母或数字的数组
  assert(!IsASCIILetterNums(new Uint8Array([65, 66, 33]))); // AB!
  assert(!IsASCIILetterNums(new Uint8Array([97, 98, 32]))); // ab (space)
  assert(!IsASCIILetterNums(new Uint8Array([48, 49, 10]))); // 01 (newline)
  assert(!IsASCIILetterNums(new Uint8Array([65, 98, 64]))); // Ab@

  // 测试空数组
  assert(IsASCIILetterNums(new Uint8Array([]))); // 空数组应返回 true
});


Deno.test("IsASCIILetterNumHyphen", () => {
  // 测试 ASCII 大写字母
  assert(IsASCIILetterNumHyphen("A".charCodeAt(0)));
  assert(IsASCIILetterNumHyphen("B".charCodeAt(0)));
  assert(IsASCIILetterNumHyphen("C".charCodeAt(0)));

  // 测试 ASCII 小写字母
  assert(IsASCIILetterNumHyphen("a".charCodeAt(0)));
  assert(IsASCIILetterNumHyphen("b".charCodeAt(0)));
  assert(IsASCIILetterNumHyphen("c".charCodeAt(0)));

  // 测试数字字符
  assert(IsASCIILetterNumHyphen("0".charCodeAt(0)));
  assert(IsASCIILetterNumHyphen("1".charCodeAt(0)));
  assert(IsASCIILetterNumHyphen("2".charCodeAt(0)));

  // 测试横线字符
  assert(IsASCIILetterNumHyphen("-".charCodeAt(0)));

  // 测试非 ASCII 字母、数字或横线字符
  assert(!IsASCIILetterNumHyphen("!".charCodeAt(0))); // 标点符号
  assert(!IsASCIILetterNumHyphen(" ".charCodeAt(0))); // 空格
  assert(!IsASCIILetterNumHyphen("\n".charCodeAt(0))); // 换行符
});


Deno.test("IsControl", () => {
  // 测试控制字符
  assert(IsControl("\x00".charCodeAt(0))); // Null
  assert(IsControl("\x01".charCodeAt(0))); // Start of Heading
  assert(IsControl("\x02".charCodeAt(0))); // Start of Text
  assert(IsControl("\x03".charCodeAt(0))); // End of Text
  assert(IsControl("\x04".charCodeAt(0))); // End of Transmission
  assert(IsControl("\x05".charCodeAt(0))); // Enquiry
  assert(IsControl("\x06".charCodeAt(0))); // Acknowledge
  assert(IsControl("\x07".charCodeAt(0))); // Bell
  assert(IsControl("\b".charCodeAt(0)));    // Backspace
  assert(IsControl("\t".charCodeAt(0)));    // Horizontal Tab
  assert(IsControl("\n".charCodeAt(0)));    // Line Feed
  assert(IsControl("\v".charCodeAt(0)));    // Vertical Tab
  assert(IsControl("\f".charCodeAt(0)));    // Form Feed
  assert(IsControl("\r".charCodeAt(0)));    // Carriage Return
  assert(IsControl("\x0E".charCodeAt(0)));  // Shift Out
  assert(IsControl("\x0F".charCodeAt(0)));  // Shift In
  assert(IsControl("\x10".charCodeAt(0)));  // Data Link Escape
  assert(IsControl("\x11".charCodeAt(0)));  // Device Control 1
  assert(IsControl("\x12".charCodeAt(0)));  // Device Control 2
  assert(IsControl("\x13".charCodeAt(0)));  // Device Control 3
  assert(IsControl("\x14".charCodeAt(0)));  // Device Control 4
  assert(IsControl("\x15".charCodeAt(0)));  // Negative Acknowledge
  assert(IsControl("\x16".charCodeAt(0)));  // Synchronous Idle
  assert(IsControl("\x17".charCodeAt(0)));  // End of Transmission Block
  assert(IsControl("\x18".charCodeAt(0)));  // Cancel
  assert(IsControl("\x19".charCodeAt(0)));  // End of Medium
  assert(IsControl("\x1A".charCodeAt(0)));  // Substitute
  assert(IsControl("\x1B".charCodeAt(0)));  // Escape
  assert(IsControl("\x1C".charCodeAt(0)));  // File Separator
  assert(IsControl("\x1D".charCodeAt(0)));  // Group Separator
  assert(IsControl("\x1E".charCodeAt(0)));  // Record Separator
  assert(IsControl("\x1F".charCodeAt(0)));  // Unit Separator
  assert(IsControl("\x7F".charCodeAt(0)));  // Delete

  // 测试非控制字符
  assert(!IsControl(" ".charCodeAt(0)));    // 空格
  assert(!IsControl("A".charCodeAt(0)));    // 'A'
  assert(!IsControl("a".charCodeAt(0)));    // 'a'
  assert(!IsControl("0".charCodeAt(0)));    // '0'
  assert(!IsControl("!".charCodeAt(0)));    // '!'
});



Deno.test("IsBlank", () => {
  // 测试全为空格的数组
  assert(IsBlank(new Uint8Array([32, 32, 32]))); // 全部是空格

  // 测试包含非空格字符的数组
  assert(!IsBlank(new Uint8Array([32, 65, 32]))); // 包含 'A'
  assert(!IsBlank(new Uint8Array([32, 0, 32])));  // 包含 Null
  assert(!IsBlank(new Uint8Array([32, 10, 32]))); // 包含换行符

  // 测试空数组
  assert(IsBlank(new Uint8Array([]))); // 空数组应返回 true
});

Deno.test("Split", () => {
  const tokens = new Uint8Array([65, 66, 67, 32, 68, 69, 70]);
  const result = Split(tokens, 32);
  assert(result.length === 2);
  assert(result[0][0] === 65);
  assert(result[1][0] === 68);
});

Deno.test("SplitWithoutBackslashEscape", () => {
  const tokens = new Uint8Array([65, 92, 32, 66, 32, 67]);
  const result = SplitWithoutBackslashEscape(tokens, 32);
  assert(result.length === 2);
  assert(result[0][0] === 65);
  assert(result[1][0] === 66);
});

Deno.test("ReplaceAll", () => {
  const tokens = new Uint8Array([65, 66, 67, 65]);
  const result = ReplaceAll(tokens, 65, 90);
  assert(result[0] === 90);
  assert(result[3] === 90);
});

Deno.test("ReplaceNewlineSpace", () => {
  const tokens = new Uint8Array([65, 10, 32, 66]);
  const result = ReplaceNewlineSpace(tokens);
  assert(result.length === 3);
  assert(result[1] === 10);
  assert(result[2] === 66);
});

Deno.test("TrimWhitespace", () => {
  const tokens = new Uint8Array([32, 65, 66, 32]);
  const result = TrimWhitespace(tokens);
  assert(result.length === 2);
  assert(result[0] === 65);
});

Deno.test("Trim", () => {
  const tokens = new Uint8Array([32, 65, 66, 32]);
  const [left, right, remains] = Trim(tokens);
  assert(left.length === 1);
  assert(right.length === 1);
  assert(remains.length === 2);
});

Deno.test("TrimRight", () => {
  const tokens = new Uint8Array([65, 66, 32]);
  const [whitespaces, remains] = TrimRight(tokens);
  assert(whitespaces.length === 1);
  assert(remains.length === 2);
});

Deno.test("TrimLeft", () => {
  const tokens = new Uint8Array([32, 65, 66]);
  const [whitespaces, remains] = TrimLeft(tokens);
  assert(whitespaces.length === 1);
  assert(remains.length === 2);
});

Deno.test("Accept", () => {
  const tokens = new Uint8Array([65, 65, 66]);
  const result = Accept(tokens, 65);
  assert(result === 2);
});

Deno.test("AcceptTokenss", () => {
  const tokens = new Uint8Array([65, 66, 67]);
  const someTokenss = [new Uint8Array([65, 66]), new Uint8Array([66, 67])];
  const result = AcceptTokenss(tokens, someTokenss);
  assert(result === 2);
});

Deno.test("AcceptTokens", () => {
  const remains = new Uint8Array([65, 66, 67]);
  const someTokens = new Uint8Array([65, 66]);
  const result = AcceptTokens(remains, someTokens);
  assert(result === 2);
});

Deno.test("IsBlankLine", () => {
  const tokens = new Uint8Array([32, 32, 10]);
  assert(IsBlankLine(tokens));
});

Deno.test("SplitWhitespace", () => {
  const tokens = new Uint8Array([65, 32, 66, 32, 67]);
  const result = SplitWhitespace(tokens);
  assert(result.length === 3);
  assert(result[0][0] === 65);
  assert(result[1][0] === 66);
  assert(result[2][0] === 67);
});

Deno.test("IsBackslashEscapePunct", () => {
  const tokens = new Uint8Array([92, 33]);
  assert(IsBackslashEscapePunct(tokens, 1));
});

Deno.test("StatWhitespace", () => {
  const tokens = new Uint8Array([32, 10, 9]);
  const [newlines, spaces, tabs] = StatWhitespace(tokens);
  assert(newlines === 1);
  assert(spaces === 1);
  assert(tabs === 1);
});

Deno.test("Spnl", () => {
  const tokens = new Uint8Array([32, 10, 65]);
  const [result, passed, remains] = Spnl(tokens);
  assert(result);
  assert(passed.length === 2);
  assert(remains.length === 1);
});

Deno.test("Peek", () => {
  const tokens = new Uint8Array([65, 66, 67]);
  const result = Peek(tokens, 1);
  assert(result === 66);
});

Deno.test("BytesShowLength", () => {
  const bytes = new Uint8Array([65, 66, 67]);
  const result = BytesShowLength(bytes);
  assert(result === 3);
});

Deno.test("RepeatBackslashBeforePipe", () => {
  const content = "A|B";
  const result = RepeatBackslashBeforePipe(content);
  assert(result === "A\\|B");
});

Deno.test("EscapeCommonMarkers", () => {
  const tokens = new Uint8Array([65, 42, 66]);
  const result = EscapeCommonMarkers(tokens);
  assert(result.length === 4);
  assert(result[1] === 92);
});

Deno.test("EscapeProtyleMarkers", () => {
  const tokens = new Uint8Array([65, 42, 66]);
  const result = EscapeProtyleMarkers(tokens);
  assert(result.length === 4);
  assert(result[1] === 92);
});

Deno.test("IsCommonInlineMarker", () => {
  assert(IsCommonInlineMarker(42)); // '*'
  assert(!IsCommonInlineMarker(65)); // 'A'
});

Deno.test("IsProtyleInlineMarker", () => {
  assert(IsProtyleInlineMarker(42)); // '*'
  assert(!IsProtyleInlineMarker(65)); // 'A'
});

Deno.test("IsMarker", () => {
  assert(IsMarker(42)); // '*'
  assert(!IsMarker(65)); // 'A'
});