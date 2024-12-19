import { HtmlEscapeString, HtmlUnescapeString } from "./html_escape.ts";
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
    const result = HtmlEscapeString(input);
    console.log(`Input: ${input}, Expected: ${expected}, Result: ${result}`);
    assertEquals(result, expected);
  }
});

Deno.test("HtmlUnescapeString should unescape special characters", () => {
  const unescapeTests: { html: string; unescaped: string }[] = [
    // Handle no entities.
    { html: "A\ttext\nstring", unescaped: "A\ttext\nstring" },
    // Handle simple named entities.
    { html: "&amp; &gt; &lt;", unescaped: "& > <" },
    // Handle hitting the end of the string.
    { html: "&amp &amp", unescaped: "&amp &amp" },
    // Handle entities with two codepoints.
    { html: "text &gesl; blah", unescaped: "text \u22db\ufe00 blah" },
    // Handle decimal numeric entities.
    { html: "Delta = &#916; ", unescaped: "Delta = Δ " },
    // Handle hexadecimal numeric entities.
    { html: "Lambda = &#x3bb; = &#X3Bb ", unescaped: "Lambda = λ = λ " },
    // Handle numeric early termination.
    { html: "&# &#x &#128;43 &copy; = &#169f = &#xa9", unescaped: "&# &#x €43 © = ©f = ©" },
    // Handle numeric ISO-8859-1 entity replacements.
    { html: "Footnote&#x87;", unescaped: "Footnote‡" },
  ];
  unescapeTests.forEach(({ html, unescaped }) => {
    assertEquals(HtmlUnescapeString(html), unescaped);
  });
});
