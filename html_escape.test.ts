import { Buffer } from "@std/io/buffer";
import { HtmlEscape } from "./html_escape.ts";
import { assertEquals } from "@std/assert/equals";

Deno.test("HtmlEscape should escape special characters", () => {
  const cases = [
    { input: "Hello & World", expected: "Hello &amp; World" },
    { input: "It's a test", expected: "It&#39;s a test" },
    { input: "<div>", expected: "&lt;div&gt;" },
    { input: 'He said "Hello"', expected: "He said &#34;Hello&#34;" },
    { input: "Line\rBreak", expected: "Line&#13;Break" },
    { input: "No special chars", expected: "No special chars" },
  ];

  for (const { input, expected } of cases) {
    const buffer = new Buffer();
    HtmlEscape(buffer, input);
    const result = new TextDecoder().decode(buffer.bytes());
     console.log(`Input: ${input}, Expected: ${expected}, Result: ${result}`);
    assertEquals(result, expected);
  }
});
