import { assertEquals } from "@std/assert/equals";
import { HtmlToken } from "./html_token.ts";
import { CaretReplacement } from "./editor_const.ts";
import { Buffer } from "@std/io/buffer";
import { HtmlEscape } from "./html_escape.ts";

Deno.test("HtmlToken tagString with no attributes", () => {
  const token = new HtmlToken();
  token.Data = "example";
  assertEquals(token.tagString(), "example");
});

Deno.test("HtmlToken tagString with attributes", () => {
  const token = new HtmlToken();
  token.Data = "example";
  token.Attr = [
    { Namespace: "", Key: "attr1", Val: "value1" },
    { Namespace: "", Key: "attr2", Val: "value2" },
  ];
  const expected = 'example attr1="value1" attr2="value2"';
  assertEquals(token.tagString(), expected);
});

Deno.test("HtmlToken tagString with CaretReplacement", () => {
  const token = new HtmlToken();
  token.Data = "example";
  token.Attr = [
    { Namespace: "", Key: CaretReplacement, Val: "value1" },
  ];
  const expected = `example${CaretReplacement}`;
  assertEquals(token.tagString(), expected);
});

Deno.test("HtmlEscape function", () => {
  const buf = new Buffer();
  HtmlEscape(buf, "test & < > \" ' \r");
  const result = new TextDecoder().decode(buf.bytes());
  const expected = "test &amp; &lt; &gt; &#34; &#39; &#13;";
  assertEquals(result, expected);
});
