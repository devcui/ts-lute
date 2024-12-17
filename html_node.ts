import { HtmlAtom } from "./html_atom.ts";
import { HtmlInsertionMode } from "./html_parse.ts";
import { HtmlAttribute } from "./html_token.ts";

export type HtmlNodeType = number;

export enum HtmlNodeTypeEnum {
  ErrorNode = 0,
  TextNode,
  ElementNode,
  DoctypeNode,
  ScopeMarkerNode,
}

export class HtmlNode {
  Parent?: HtmlNode;
  FirstChild?: HtmlNode;
  LastChild?: HtmlNode;
  PrevSibling?: HtmlNode;
  NextSibling?: HtmlNode;
  Type?: HtmlNodeType;
  DataAtom?: HtmlAtom;
  Data: string = "";
  Namespace: string = "";
  Attr: HtmlAttribute[] = [];

  constructor(type?: HtmlNodeType) {
    if (type) this.Type = type;
  }

  // Unlink 用于将节点从树上移除，后一个兄弟节点会接替该节点。
  public Unlink(): void {
    if (this.PrevSibling) {
      this.PrevSibling.NextSibling = this.NextSibling;
    } else if (this.Parent) {
      this.Parent.FirstChild = this.NextSibling;
    }

    if (this.NextSibling) {
      this.NextSibling.PrevSibling = this.PrevSibling;
    } else if (this.Parent) {
      this.Parent.LastChild = this.PrevSibling;
    }

    this.Parent = undefined;
    this.NextSibling = undefined;
    this.PrevSibling = undefined;
  }

  // InsertBefore 在当前节点前插入一个兄弟节点。
  public InsertBefore(sibling: HtmlNode): void {
    sibling.Unlink();
    sibling.PrevSibling = this.PrevSibling;
    if (sibling.PrevSibling) {
      sibling.PrevSibling.NextSibling = sibling;
    }
    sibling.NextSibling = this;
    this.PrevSibling = sibling;
    sibling.Parent = this.Parent;
    if (sibling.Parent && !sibling.PrevSibling) {
      sibling.Parent.FirstChild = sibling;
    }
  }

  // InsertAfter 在当前节点后插入一个兄弟节点。
  public InsertAfter(sibling: HtmlNode): void {
    sibling.Unlink();
    sibling.NextSibling = this.NextSibling;
    if (sibling.NextSibling) {
      sibling.NextSibling.PrevSibling = sibling;
    }
    sibling.PrevSibling = this;
    this.NextSibling = sibling;
    sibling.Parent = this.Parent;
    if (!sibling.NextSibling && sibling.Parent) {
      sibling.Parent.LastChild = sibling;
    }
  }

  // InsertChildBefore 在当前节点的子节点前插入一个新的子节点。
  public InsertChildBefore(newChild: HtmlNode, oldChild?: HtmlNode): void {
    if (newChild.Parent || newChild.PrevSibling || newChild.NextSibling) {
      throw new Error(
        "html: InsertChildBefore called for an attached child Node",
      );
    }
    let prev: HtmlNode | undefined;
    let next: HtmlNode | undefined;
    if (oldChild) {
      prev = oldChild.PrevSibling;
      next = oldChild;
    } else {
      prev = this.LastChild;
    }
    if (prev) {
      prev.NextSibling = newChild;
    } else {
      this.FirstChild = newChild;
    }
    if (next) {
      next.PrevSibling = newChild;
    } else {
      this.LastChild = newChild;
    }
    newChild.Parent = this;
    newChild.PrevSibling = prev;
    newChild.NextSibling = next;
  }

  // AppendChild 在当前节点的子节点末尾添加一个新的子节点。
  public AppendChild(c: HtmlNode): void {
    if (c.Parent || c.PrevSibling || c.NextSibling) {
      throw new Error("html: AppendChild called for an attached child Node");
    }
    const last = this.LastChild;
    if (last) {
      last.NextSibling = c;
    } else {
      this.FirstChild = c;
    }
    this.LastChild = c;
    c.Parent = this;
    c.PrevSibling = last;
  }

  // RemoveChild 移除当前节点的一个子节点。
  public RemoveChild(c: HtmlNode): void {
    if (c.Parent !== this) {
      throw new Error("html: RemoveChild called for a non-child Node");
    }
    if (this.FirstChild === c) {
      this.FirstChild = c.NextSibling;
    }
    if (c.NextSibling) {
      c.NextSibling.PrevSibling = c.PrevSibling;
    }
    if (this.LastChild === c) {
      this.LastChild = c.PrevSibling;
    }
    if (c.PrevSibling) {
      c.PrevSibling.NextSibling = c.NextSibling;
    }
    c.Parent = undefined;
    c.PrevSibling = undefined;
    c.NextSibling = undefined;
  }

  public Clone(): HtmlNode {
    const m = new HtmlNode();
    m.Type = this.Type;
    m.DataAtom = this.DataAtom;
    m.Data = this.Data;
    m.Attr = [...this.Attr];
    return m;
  }
}

export type HtmlNodeStack = HtmlNode[];
export function HtmlNodeStackPop(stack: HtmlNodeStack): HtmlNode | undefined {
  return stack.pop();
}
export function HtmlNodeStackTop(stack: HtmlNodeStack): HtmlNode | undefined {
  return stack[stack.length - 1];
}
export function HtmlNodeStackIndex(
  stack: HtmlNodeStack,
  node: HtmlNode,
): number {
  for (let i = stack.length - 1; i >= 0; i--) {
    if (stack[i] === node) {
      return i;
    }
  }
  return -1;
}
export function HtmlNodeStackContains(
  stack: HtmlNodeStack,
  atom: HtmlAtom,
): boolean {
  for (const n of stack) {
    if (n.DataAtom === atom && n.Namespace === "") {
      return true;
    }
  }
  return false;
}

export function HtmlNodeStackInsert(
  stack: HtmlNodeStack,
  index: number,
  node: HtmlNode,
): void {
  stack.splice(index, 0, node);
}

export function HtmlNodeStackRemove(
  stack: HtmlNodeStack,
  node: HtmlNode,
): void {
  const index = HtmlNodeStackIndex(stack, node);
  if (index === -1) {
    return;
  }
  stack.splice(index, 1);
}

export function HtmlNodeReparentChildren(dst: HtmlNode, src: HtmlNode): void {
  while (src.FirstChild) {
    const child = src.FirstChild;
    src.RemoveChild(child);
    dst.AppendChild(child);
  }
}

export const ScopeMarker = new HtmlNode(HtmlNodeTypeEnum.ScopeMarkerNode);

export type HtmlInsertionModeStack = HtmlInsertionMode[];

export function HtmlInsertionModeStackPop(
  stack: HtmlInsertionModeStack,
): HtmlInsertionMode | undefined {
  return stack.pop();
}

export function HtmlInsertionModeStackTop(
  stack: HtmlInsertionModeStack,
): HtmlInsertionMode | undefined {
  if (stack.length > 0) {
    return stack[stack.length - 1];
  }
  return undefined;
}
