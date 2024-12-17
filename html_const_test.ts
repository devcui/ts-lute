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

Deno.test("HtmlIsSpecialElement - HTML namespace special elements", () => {
  const specialElements = ["address", "article", "aside", "footer", "header", "nav", "section"];
  for (const element of specialElements) {
    const node = new HtmlNode();
    node.Namespace = "html";
    node.Data = element;
    if (!HtmlIsSpecialElement(node)) {
      throw new Error(`Expected '${element}' to be a special element in HTML namespace`);
    }
  }
});

Deno.test("HtmlIsSpecialElement - MathML namespace non-special elements", () => {
  const node = new HtmlNode();
  node.Namespace = "math";
  node.Data = "mfrac";
  if (HtmlIsSpecialElement(node)) {
    throw new Error("Expected 'mfrac' to not be a special element in MathML namespace");
  }
});

Deno.test("HtmlIsSpecialElement - SVG namespace non-special elements", () => {
  const node = new HtmlNode();
  node.Namespace = "svg";
  node.Data = "circle";
  if (HtmlIsSpecialElement(node)) {
    throw new Error("Expected 'circle' to not be a special element in SVG namespace");
  }
});

Deno.test("HtmlIsSpecialElement - Empty namespace", () => {
  const node = new HtmlNode();
  node.Namespace = "";
  node.Data = "div";
  if (!HtmlIsSpecialElement(node)) {
    throw new Error("Expected 'div' to be a special element in empty namespace");
  }
});
