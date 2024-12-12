import { assertEquals } from "@std/assert/equals";
import { HtmlAtomFnv, HtmlAtomLookup, HtmlAtomMatch, HtmlAtomToString, HtmlAtomToStringAtom, HtmlAtomToStringBytes, HtmlAtomTypes } from "./html_atom.ts";

Deno.test("AtomToString: Test 1", () => {
  assertEquals(HtmlAtomToString(HtmlAtomTypes.A), "a");
  assertEquals(HtmlAtomToString(HtmlAtomTypes.Accept), "accept");
  assertEquals(HtmlAtomToString(HtmlAtomTypes.Action), "action");
  assertEquals(HtmlAtomToString(0), "");
});

Deno.test("AtomToString: Test 2", () => {
  assertEquals(HtmlAtomToStringAtom(HtmlAtomTypes.Alt), "alt");
  assertEquals(HtmlAtomToStringAtom(HtmlAtomTypes.Applet), "applet");
  assertEquals(HtmlAtomToStringAtom(HtmlAtomTypes.Area), "area");
});

Deno.test("AtomFnv", () => {
  assertEquals(HtmlAtomFnv(0x81cdf10e, Uint8Array.of(0x01)), 1714584221);
  assertEquals(HtmlAtomFnv(0x81cdf10e, Uint8Array.of(0x11)), 1983026125);
});

Deno.test("AtomMatch", () => {
  assertEquals(HtmlAtomMatch("a", Uint8Array.of(0x61)), true);
});

Deno.test("AtomLookup", () => {
  assertEquals(HtmlAtomToString(HtmlAtomLookup(Uint8Array.of(0x61))), "a");
  assertEquals(HtmlAtomToString(HtmlAtomLookup(Uint8Array.of(0))), "");
});

Deno.test("AtomString3",()=>{
  assertEquals(HtmlAtomToStringBytes(Uint8Array.of(0x61,0x62,0x63)),"abc");
})

