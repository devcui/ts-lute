import { assertEquals } from "@std/assert/equals";
import { StringTrimLeft } from "./util_trim.ts";

Deno.test('StringTrimLeft should remove leading characters specified in the cutset', () => {
  assertEquals(StringTrimLeft('---hello---', '-'), 'hello---');
  assertEquals(StringTrimLeft('###hello###', '#'), 'hello###');
  assertEquals(StringTrimLeft('   hello   ', ' '), 'hello   ');
});

Deno.test('StringTrimLeft should not remove characters not specified in the cutset', () => {
  assertEquals(StringTrimLeft('---hello---', '#'), '---hello---');
  assertEquals(StringTrimLeft('###hello###', '-'), '###hello###');
  assertEquals(StringTrimLeft('   hello   ', '-'), '   hello   ');
});

Deno.test('StringTrimLeft should return the original string if cutset is empty', () => {
  assertEquals(StringTrimLeft('---hello---', ''), '---hello---');
});

Deno.test('StringTrimLeft should return an empty string if the input string is empty', () => {
  assertEquals(StringTrimLeft('', '-'), '');
});
