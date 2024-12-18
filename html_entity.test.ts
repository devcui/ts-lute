import { assert } from "@std/assert/assert";
import {
  HtmlEntities,
  HtmlLongestEntityWithoutSemicolon,
} from "./html_entity.ts";

Deno.test("TestEntityLength", () => {
  for (const [key, value] of Object.entries(HtmlEntities)) {
    const utf8Length = new TextEncoder().encode(value).length;
    assert(
      1 + key.length >= utf8Length,
      `escaped entity &${key} is shorter than its UTF-8 encoding ${value}`,
    );
    if (key.length > HtmlLongestEntityWithoutSemicolon && !key.endsWith(";")) {
      assert(
        false,
        `entity name ${key} is ${key.length} characters, but HtmlLongestEntityWithoutSemicolon=${HtmlLongestEntityWithoutSemicolon}`,
      );
    }
  }
});
