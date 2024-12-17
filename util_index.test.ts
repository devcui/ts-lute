import { assertEquals } from "@std/assert/equals";
import { IndexAny } from "./util_index.ts";

Deno.test("IndexAny with empty chars", () => {
  assertEquals(IndexAny("hello", ""), -1);
});

Deno.test("IndexAny with single char", () => {
  assertEquals(IndexAny("hello", "e"), 1);
  assertEquals(IndexAny("hello", "a"), -1);
});

Deno.test("IndexAny with multiple chars", () => {
  assertEquals(IndexAny("hello", "aeiou"), 1);
  assertEquals(IndexAny("hello", "xyz"), -1);
});

Deno.test("IndexAny with long string and chars", () => {
  assertEquals(IndexAny("abcdefghij", "jkl"), 9);
  assertEquals(IndexAny("abcdefghij", "xyz"), -1);
});

Deno.test("IndexAny with short string and chars", () => {
  assertEquals(IndexAny("abc", "cba"), 0);
  assertEquals(IndexAny("abc", "xyz"), -1);
});