import { assertEquals } from "@std/assert/equals";
import { Lexer } from "./lex_lexer.ts";
import { ItemNewline, ItemCarriageReturn } from "./lex_token.ts";

Deno.test("Lexer should append newline if not present", () => {
  const input = new Uint8Array([65, 66, 67]); // "ABC"
  const lexer = new Lexer(input);
  assertEquals(lexer.input[lexer.input.length - 1], ItemNewline);
  assertEquals(lexer.length, input.length + 1);
});

Deno.test("Lexer should return next line correctly", () => {
  const input = new Uint8Array([
    65,
    66,
    67,
    ItemNewline,
    68,
    69,
    70,
    ItemNewline,
  ]); // "ABC\nDEF\n"
  const lexer = new Lexer(input);

  let line = lexer.NextLine();
  assertEquals(line, new Uint8Array([65, 66, 67, ItemNewline])); // "ABC\n"

  line = lexer.NextLine();
  assertEquals(line, new Uint8Array([68, 69, 70, ItemNewline])); // "DEF\n"

  line = lexer.NextLine();
  assertEquals(line, undefined); // No more lines
});

Deno.test("Lexer should handle carriage return correctly", () => {
  const input = new Uint8Array([
    65,
    66,
    67,
    ItemCarriageReturn,
    ItemNewline,
    68,
    69,
    70,
    ItemCarriageReturn,
  ]); // "ABC\r\nDEF\r"
  const lexer = new Lexer(input);

  let line = lexer.NextLine();
  assertEquals(line, new Uint8Array([65, 66, 67, ItemNewline])); // "ABC\n"

  line = lexer.NextLine();
  assertEquals(line, new Uint8Array([68, 69, 70, ItemNewline])); // "DEF\n"

  line = lexer.NextLine();
  assertEquals(line, undefined); // No more lines
});

Deno.test(
  "Lexer should replace null character with replacement character",
  () => {
    const input = new Uint8Array([65, 0x00, 66, ItemNewline]); // "A\0B\n"
    const lexer = new Lexer(input);

    let line = lexer.NextLine();
    assertEquals(line, new Uint8Array([65, 0xef, 0xbf, 0xbd, 66, ItemNewline])); // "A\uFFFD B\n"

    line = lexer.NextLine();
    assertEquals(line, undefined); // No more lines
  }
);

Deno.test("Lexer should compare second lines of two texts correctly", () => {
  const input1 = new Uint8Array(
    new TextEncoder().encode("hajsido\njqweoi\nqwiue\n\n")
  );
  const input2 = new Uint8Array(
    new TextEncoder().encode("xxxx\njqweoi\nqwiue\n\n")
  );

  const lexer1 = new Lexer(input1);
  const lexer2 = new Lexer(input2);

  // Skip the first line
  lexer1.NextLine();
  lexer2.NextLine();

  // Get the second line
  const line1 = lexer1.NextLine();
  const line2 = lexer2.NextLine();

  // Compare the second lines
  assertEquals(
    new TextDecoder().decode(line1),
    new TextDecoder().decode(line2)
  ); // "jqweoi\n"
});
