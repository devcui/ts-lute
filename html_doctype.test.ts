import { HtmlParseDoctype } from "./html_doctype.ts";
import { HtmlNodeTypeEnum } from "./html_node.ts";
import { assertEquals } from "@std/assert/equals";

Deno.test("HtmlParseDoctype should parse various doctypes", () => {
  const tests = [
    { input: "html", expected: "html", quirks: false },
    { input: "HTML", expected: "html", quirks: true },
    { input: "nothtml", expected: "nothtml", quirks: true },
    {
      input: 'html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"',
      expected: "html",
      quirks: true,
    },
    {
      input:
        'html SYSTEM "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd"',
      expected: "html",
      quirks: true,
    },
    {
      input: 'html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN"',
      expected: "html",
      quirks: true,
    },
    {
      input: 'html PUBLIC "-//W3O//DTD W3 HTML Strict 3.0//EN//"',
      expected: "html",
      quirks: true,
    },
    {
      input: 'html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" SYSTEM "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd"',
      expected: "html",
      quirks: true,
    },
    {
      input: 'html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" SYSTEM "other"',
      expected: "html",
      quirks: true,
    },
    { input: 'html SYSTEM', expected: "html", quirks: true },
    { input: 'html PUBLIC', expected: "html", quirks: true },
    { input: 'html PUBLIC "', expected: "html", quirks: true },
    { input: 'html SYSTEM "', expected: "html", quirks: false },
    { input: 'html PUBLIC "publicid', expected: "html", quirks: true },
    { input: 'html SYSTEM "systemid', expected: "html", quirks: false },
    {
      input: 'html PUBLIC "publicid" SYSTEM "systemid"',
      expected: "html",
      quirks: true,
    },
    {
      input: 'html PUBLIC "publicid" SYSTEM "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd"',
      expected: "html",
      quirks: true,
    },
    {
      input: 'html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN"',
      expected: "html",
      quirks: true,
    },
    {
      input: 'html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"',
      expected: "html",
      quirks: true,
    },
    {
      input: 'html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" SYSTEM "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd"',
      expected: "html",
      quirks: true,
    },
    {
      input: 'html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" SYSTEM "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd"',
      expected: "html",
      quirks: true,
    },
    {
      input: 'html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" SYSTEM "other"',
      expected: "html",
      quirks: true,
    },
    {
      input: 'html SYSTEM "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd"',
      expected: "html",
      quirks: true,
    },
    { input: 'html SYSTEM "other"', expected: "html", quirks: false },
    {
      input: 'html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" SYSTEM "other"',
      expected: "html",
      quirks: true,
    },
    {
      input: 'html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" SYSTEM "other"',
      expected: "html",
      quirks: true,
    },
  ];

  for (const { input, expected, quirks } of tests) {
    const result = HtmlParseDoctype(input);
    console.log(`input: ${input}, expected: ${expected}, quirks: ${quirks}`);
    console.log(`result: ${result.node.Data}, quirks: ${result.quirks}`);
    assertEquals(result.node.Type, HtmlNodeTypeEnum.DoctypeNode);
    assertEquals(result.node.Data, expected);
    assertEquals(result.quirks, quirks);
  }
});
