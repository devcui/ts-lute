import { assertEquals } from "@std/assert/equals";
import {
  HtmlNode,
  HtmlNodeReparentChildren,
  HtmlNodeStack,
  HtmlNodeStackPop,
  HtmlNodeStackTop,
  HtmlNodeStackIndex,
  HtmlNodeStackContains,
  HtmlNodeStackInsert,
  HtmlNodeStackRemove,
  HtmlNodeTypeVal
} from "./html_node.ts";
import { assertThrows } from "@std/assert/throws";
import { assert } from "@std/assert/assert";
import { HtmlAtom } from "./html_atom.ts";

Deno.test("Unlink", () => {
  // 创建节点
  const parent = new HtmlNode();
  const child1 = new HtmlNode();
  const child2 = new HtmlNode();
  const child3 = new HtmlNode();

  // 设置节点关系
  parent.FirstChild = child1;
  parent.LastChild = child3;

  child1.Parent = parent;
  child1.NextSibling = child2;

  child2.Parent = parent;
  child2.PrevSibling = child1;
  child2.NextSibling = child3;

  child3.Parent = parent;
  child3.PrevSibling = child2;

  // 断言初始状态
  assertEquals(parent.FirstChild, child1);
  assertEquals(parent.LastChild, child3);
  assertEquals(child1.NextSibling, child2);
  assertEquals(child2.PrevSibling, child1);
  assertEquals(child2.NextSibling, child3);
  assertEquals(child3.PrevSibling, child2);

  // 调用 Unlink 方法
  child2.Unlink();

  // 断言 Unlink 后的状态
  assertEquals(parent.FirstChild, child1);
  assertEquals(parent.LastChild, child3);
  assertEquals(child1.NextSibling, child3);
  assertEquals(child3.PrevSibling, child1);
  assertEquals(child2.Parent, undefined);
  assertEquals(child2.NextSibling, undefined);
  assertEquals(child2.PrevSibling, undefined);
});

Deno.test("InsertBefore", () => {
  // 创建节点
  const parent = new HtmlNode();
  const child1 = new HtmlNode();
  const child2 = new HtmlNode();
  const child3 = new HtmlNode();

  // 设置节点关系
  parent.FirstChild = child1;
  parent.LastChild = child3;

  child1.Parent = parent;
  child1.NextSibling = child2;

  child2.Parent = parent;
  child2.PrevSibling = child1;
  child2.NextSibling = child3;

  child3.Parent = parent;
  child3.PrevSibling = child2;

  // 断言初始状态
  assertEquals(parent.FirstChild, child1);
  assertEquals(parent.LastChild, child3);
  assertEquals(child1.NextSibling, child2);
  assertEquals(child2.PrevSibling, child1);
  assertEquals(child2.NextSibling, child3);
  assertEquals(child3.PrevSibling, child2);

  // 创建新节点
  const newSibling = new HtmlNode();

  // 调用 InsertBefore 方法
  child2.InsertBefore(newSibling);

  // 断言 InsertBefore 后的状态
  assertEquals(parent.FirstChild, child1);
  assertEquals(parent.LastChild, child3);
  assertEquals(child1.NextSibling, newSibling);
  assertEquals(newSibling.PrevSibling, child1);
  assertEquals(newSibling.NextSibling, child2);
  assertEquals(child2.PrevSibling, newSibling);
  assertEquals(newSibling.Parent, parent);

  // 进一步测试 InsertBefore 在第一个节点前插入
  const newFirstSibling = new HtmlNode();
  child1.InsertBefore(newFirstSibling);

  // 断言 InsertBefore 在第一个节点前插入后的状态
  assertEquals(parent.FirstChild, newFirstSibling);
  assertEquals(newFirstSibling.NextSibling, child1);
  assertEquals(child1.PrevSibling, newFirstSibling);
  assertEquals(newFirstSibling.PrevSibling, undefined);
  assertEquals(newFirstSibling.Parent, parent);
});

Deno.test("InsertAfter", () => {
  // 创建节点
  const parent = new HtmlNode();
  const child1 = new HtmlNode();
  const child2 = new HtmlNode();

  // 设置节点关系
  parent.FirstChild = child1;
  parent.LastChild = child2;

  child1.Parent = parent;
  child1.NextSibling = child2;

  child2.Parent = parent;
  child2.PrevSibling = child1;

  // 断言初始状态
  assertEquals(parent.FirstChild, child1);
  assertEquals(parent.LastChild, child2);
  assertEquals(child1.NextSibling, child2);
  assertEquals(child2.PrevSibling, child1);

  // 创建新节点
  const newSibling = new HtmlNode();

  // 调用 InsertAfter 方法
  child1.InsertAfter(newSibling);

  // 断言 InsertAfter 后的状态
  assertEquals(parent.FirstChild, child1);
  assertEquals(parent.LastChild, child2);
  assertEquals(child1.NextSibling, newSibling);
  assertEquals(newSibling.PrevSibling, child1);
  assertEquals(newSibling.NextSibling, child2);
  assertEquals(child2.PrevSibling, newSibling);
  assertEquals(newSibling.Parent, parent);

  // 进一步测试 InsertAfter 在最后一个节点后插入
  const newLastSibling = new HtmlNode();
  child2.InsertAfter(newLastSibling);

  // 断言 InsertAfter 在最后一个节点后插入后的状态
  assertEquals(parent.FirstChild, child1);
  assertEquals(parent.LastChild, newLastSibling);
  assertEquals(child2.NextSibling, newLastSibling);
  assertEquals(newLastSibling.PrevSibling, child2);
  assertEquals(newLastSibling.NextSibling, undefined);
  assertEquals(newLastSibling.Parent, parent);
});

Deno.test("InsertChildBefore", () => {
  // 创建节点
  const parent = new HtmlNode();
  const child1 = new HtmlNode();

  // 设置节点关系
  parent.FirstChild = child1;
  parent.LastChild = child1;

  child1.Parent = parent;

  // 断言初始状态
  assertEquals(parent.FirstChild, child1);
  assertEquals(parent.LastChild, child1);
  assertEquals(child1.Parent, parent);

  // 创建新节点
  const newChild = new HtmlNode();

  // 调用 InsertChildBefore 方法
  parent.InsertChildBefore(newChild, child1);

  // 断言 InsertChildBefore 后的状态
  assertEquals(parent.FirstChild, newChild);
  assertEquals(parent.LastChild, child1);
  assertEquals(newChild.NextSibling, child1);
  assertEquals(child1.PrevSibling, newChild);
  assertEquals(newChild.Parent, parent);

  // 进一步测试 InsertChildBefore 在最后一个节点前插入
  const newLastChild = new HtmlNode();
  parent.InsertChildBefore(newLastChild);

  // 断言 InsertChildBefore 在最后一个节点前插入后的状态
  assertEquals(parent.FirstChild, newChild);
  assertEquals(parent.LastChild, newLastChild);
  assertEquals(child1.NextSibling, newLastChild);
  assertEquals(newLastChild.PrevSibling, child1);
  assertEquals(newLastChild.NextSibling, undefined);
  assertEquals(newLastChild.Parent, parent);

  // 测试插入已附加的节点
  assertThrows(
    () => {
      parent.InsertChildBefore(newChild, child1);
    },
    Error,
    "html: InsertChildBefore called for an attached child Node",
  );
});

Deno.test("AppendChild", () => {
  // 创建节点
  const parent = new HtmlNode();
  const child1 = new HtmlNode();
  const child2 = new HtmlNode();

  // 调用 AppendChild 方法
  parent.AppendChild(child1);
  parent.AppendChild(child2);

  // 断言 AppendChild 后的状态
  assertEquals(parent.FirstChild, child1);
  assertEquals(parent.LastChild, child2);
  assertEquals(child1.NextSibling, child2);
  assertEquals(child2.PrevSibling, child1);
  assertEquals(child1.Parent, parent);
  assertEquals(child2.Parent, parent);

  // 测试插入已附加的节点
  assertThrows(
    () => {
      parent.AppendChild(child1);
    },
    Error,
    "html: AppendChild called for an attached child Node",
  );
});

Deno.test("RemoveChild", () => {
  // 创建节点
  const parent = new HtmlNode();
  const child1 = new HtmlNode();
  const child2 = new HtmlNode();

  // 设置节点关系
  parent.AppendChild(child1);
  parent.AppendChild(child2);

  // 调用 RemoveChild 方法
  parent.RemoveChild(child1);

  // 断言 RemoveChild 后的状态
  assertEquals(parent.FirstChild, child2);
  assertEquals(parent.LastChild, child2);
  assertEquals(child2.PrevSibling, undefined);
  assertEquals(child1.Parent, undefined);
  assertEquals(child1.NextSibling, undefined);
  assertEquals(child1.PrevSibling, undefined);

  // 测试移除非子节点
  assertThrows(
    () => {
      parent.RemoveChild(child1);
    },
    Error,
    "html: RemoveChild called for a non-child Node",
  );
});

Deno.test("ReparentChildren", () => {
  // 创建节点
  const parent1 = new HtmlNode();
  const parent2 = new HtmlNode();
  const child1 = new HtmlNode();
  const child2 = new HtmlNode();

  // 设置节点关系
  parent1.AppendChild(child1);
  parent1.AppendChild(child2);

  // 调用 ReparentChildren 方法
  HtmlNodeReparentChildren(parent2, parent1);

  // 断言 ReparentChildren 后的状态
  assertEquals(parent1.FirstChild, undefined);
  assertEquals(parent1.LastChild, undefined);
  assertEquals(parent2.FirstChild, child1);
  assertEquals(parent2.LastChild, child2);
  assertEquals(child1.Parent, parent2);
  assertEquals(child2.Parent, parent2);
});

Deno.test("Clone", () => {
  // 创建节点
  const node = new HtmlNode();
  node.Type = HtmlNodeTypeVal.ElementNode;
  node.Data = "div";
  node.Attr = [{ Key: "class", Val: "container", Namespace: "test" }];

  // 调用 Clone 方法
  const clone = node.Clone();

  // 断言 Clone 后的状态
  assertEquals(clone.Type, node.Type);
  assertEquals(clone.Data, node.Data);
  assertEquals(clone.Attr, node.Attr);
  assertEquals(clone.Parent, undefined);
  assertEquals(clone.FirstChild, undefined);
  assertEquals(clone.LastChild, undefined);
  assertEquals(clone.PrevSibling, undefined);
  assertEquals(clone.NextSibling, undefined);
});

Deno.test("NodeStack Pop", () => {
  const stack: HtmlNodeStack = [];
  const node1 = new HtmlNode();
  const node2 = new HtmlNode();
  HtmlNodeStackInsert(stack, 0, node1);
  HtmlNodeStackInsert(stack, 1, node2);

  assertEquals(HtmlNodeStackPop(stack), node2);
  assertEquals(HtmlNodeStackPop(stack), node1);
  assertEquals(HtmlNodeStackPop(stack), undefined);
});

Deno.test("NodeStack Top", () => {
  const stack: HtmlNodeStack = [];
  const node1 = new HtmlNode();
  const node2 = new HtmlNode();
  HtmlNodeStackInsert(stack, 0, node1);
  HtmlNodeStackInsert(stack, 1, node2);

  assertEquals(HtmlNodeStackTop(stack), node2);
  HtmlNodeStackPop(stack);
  assertEquals(HtmlNodeStackTop(stack), node1);
  HtmlNodeStackPop(stack);
  assertEquals(HtmlNodeStackTop(stack), undefined);
});

Deno.test("NodeStack Index", () => {
  const stack: HtmlNodeStack = [];
  const node1 = new HtmlNode();
  const node2 = new HtmlNode();
  HtmlNodeStackInsert(stack, 0, node1);
  HtmlNodeStackInsert(stack, 1, node2);

  assertEquals(HtmlNodeStackIndex(stack, node1), 0);
  assertEquals(HtmlNodeStackIndex(stack, node2), 1);
  HtmlNodeStackPop(stack);
  assertEquals(HtmlNodeStackIndex(stack, node2), -1);
});

Deno.test("NodeStack Contains", () => {
  const stack: HtmlNodeStack = [];
  const node1 = new HtmlNode();
  const node2 = new HtmlNode();
  const node3 = new HtmlNode();

  node1.DataAtom = 0x1; // Example HtmlAtom value
  node2.DataAtom = 0x2; // Example HtmlAtom value
  node3.DataAtom = 0x3; // Example HtmlAtom value

  HtmlNodeStackInsert(stack, 0, node1);
  HtmlNodeStackInsert(stack, 1, node2);

  // 检查 stack 是否包含特定的 HtmlAtom
  assert(HtmlNodeStackContains(stack, 0x1), "Stack should contain HtmlAtom with value 0x1");
  assert(HtmlNodeStackContains(stack, 0x2), "Stack should contain HtmlAtom with value 0x2");
  assert(!HtmlNodeStackContains(stack, 0x3), "Stack should not contain HtmlAtom with value 0x3");

  // 插入 node3 并再次检查
  HtmlNodeStackInsert(stack, 2, node3);
  assert(HtmlNodeStackContains(stack, 0x3), "Stack should now contain HtmlAtom with value 0x3");
});

Deno.test("NodeStack Insert", () => {
  const stack: HtmlNodeStack = [];
  const node1 = new HtmlNode();
  const node2 = new HtmlNode();
  HtmlNodeStackInsert(stack, 0, node1);
  HtmlNodeStackInsert(stack, 1, node2);

  assertEquals(HtmlNodeStackIndex(stack, node1), 0);
  assertEquals(HtmlNodeStackIndex(stack, node2), 1);
});

Deno.test("NodeStack Remove", () => {
  const stack: HtmlNodeStack = [];
  const node1 = new HtmlNode();
  const node2 = new HtmlNode();
  HtmlNodeStackInsert(stack, 0, node1);
  HtmlNodeStackInsert(stack, 1, node2);

  HtmlNodeStackRemove(stack, node1);
  assertEquals(HtmlNodeStackIndex(stack, node1), -1);
  assertEquals(HtmlNodeStackIndex(stack, node2), 0);
});
