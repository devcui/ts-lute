import { CaretReplacement } from "./editor_const.ts";
import { HtmlAtom } from "./html_atom.ts";
import { Buffer } from "@std/io";
import { HtmlEscape } from "./html_escape.ts";

export enum HtmlTokenTypeEnum {
  // ErrorToken means that an error occurred during tokenization.
  ErrorToken = 0,
  // TextToken means a text node.
  TextToken,
  // A StartTagToken looks like <a>.
  StartTagToken,
  // An EndTagToken looks like </a>.
  EndTagToken,
  // A SelfClosingTagToken tag looks like <br/>.
  SelfClosingTagToken,
  // A CommentToken looks like <!--x-->.
  CommentToken,
  // A DoctypeToken looks like <!DOCTYPE x>
  DoctypeToken,
}

export class HtmlTokenType {
  constructor(private value: number) {}

  public String(): string {
    switch (this.value) {
      case HtmlTokenTypeEnum.ErrorToken:
        return "Error";
      case HtmlTokenTypeEnum.TextToken:
        return "Text";
      case HtmlTokenTypeEnum.StartTagToken:
        return "StartTag";
      case HtmlTokenTypeEnum.EndTagToken:
        return "EndTag";
      case HtmlTokenTypeEnum.SelfClosingTagToken:
        return "SelfClosingTag";
      case HtmlTokenTypeEnum.CommentToken:
        return "Comment";
      case HtmlTokenTypeEnum.DoctypeToken:
        return "Doctype";
    }
    return `Invalid(${this.value})`;
  }
}

export const ErrBufferExceeded = new Error(" Max Buffer Exceeded");

export class HtmlAttribute {
  Namespace: string = "";
  Key: string = "";
  Val: string = "";
}

export class HtmlToken {
  Type?: HtmlTokenType;
  DataHtmlAtom?: HtmlAtom;
  Data: string = "";
  Attr: HtmlAttribute[] = [];

  tagString(): string {
    if (this.Attr.length === 0) {
      return this.Data;
    }

    const buf = new Buffer(new TextEncoder().encode(this.Data));
    for (const a of this.Attr) {
      if (a.Key === CaretReplacement) {
        buf.writeSync(new TextEncoder().encode(CaretReplacement));
        continue;
      }
      buf.writeSync(new TextEncoder().encode(` ${a.Key}="`));
      HtmlEscape(buf, a.Val);
      buf.writeSync(new TextEncoder().encode(`"`));
    }
    return new TextDecoder().decode(buf.bytes());
  }
}
