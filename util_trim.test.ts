import { assertEquals } from "@std/assert/equals";
import { TrimLeft } from "./util_trim.ts";

Deno.test('TrimLeft should remove leading characters specified in the cutset', () => {
  assertEquals(TrimLeft('---hello---', '-'), 'hello---');
  assertEquals(TrimLeft('###hello###', '#'), 'hello###');
  assertEquals(TrimLeft('   hello   ', ' '), 'hello   ');
});

Deno.test('TrimLeft should not remove characters not specified in the cutset', () => {
  assertEquals(TrimLeft('---hello---', '#'), '---hello---');
  assertEquals(TrimLeft('###hello###', '-'), '###hello###');
  assertEquals(TrimLeft('   hello   ', '-'), '   hello   ');
});

Deno.test('TrimLeft should return the original string if cutset is empty', () => {
  assertEquals(TrimLeft('---hello---', ''), '---hello---');
});

Deno.test('TrimLeft should return an empty string if the input string is empty', () => {
  assertEquals(TrimLeft('', '-'), '');
});
