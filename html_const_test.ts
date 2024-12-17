import { HtmlNode } from "./html_node.ts";
import { HtmlIsSpecialElement } from "./html_const.ts";

Deno.test("HtmlIsSpecialElement - HTML namespace", () => {
  const node = new HtmlNode();
  node.Namespace = "html";
  node.Data = "div";
  if (!HtmlIsSpecialElement(node)) {
    throw new Error("Expected 'div' to be a special element in HTML namespace");
  }
});

Deno.test("HtmlIsSpecialElement - MathML namespace", () => {
  const node = new HtmlNode();
  node.Namespace = "math";
  node.Data = "mi";
  if (!HtmlIsSpecialElement(node)) {
    throw new Error("Expected 'mi' to be a special element in MathML namespace");
  }
});

Deno.test("HtmlIsSpecialElement - SVG namespace", () => {
  const node = new HtmlNode();
  node.Namespace = "svg";
  node.Data = "foreignObject";
  if (!HtmlIsSpecialElement(node)) {
    throw new Error("Expected 'foreignObject' to be a special element in SVG namespace");
  }
});

Deno.test("HtmlIsSpecialElement - Non-special element", () => {
  const node = new HtmlNode();
  node.Namespace = "html";
  node.Data = "span";
  if (HtmlIsSpecialElement(node)) {
    throw new Error("Expected 'span' to not be a special element");
  }
});
