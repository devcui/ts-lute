import { assertEquals } from "@std/assert";
import { Node } from "./ast_node.ts";
import { walk, WalkStatus } from "./walk.ts";

function _createNode() {
  const root = new Node();
  const n_1_0 = new Node();
  const n_1_1 = new Node();
  const n_1_2 = new Node();

  const n_2_0 = new Node();
  const n_2_1 = new Node();

  const n_3_0 = new Node();
  const n_3_1 = new Node();

  root.FirstChild = n_1_0;
  n_1_0.Parent = root;
  n_1_0.Next = n_1_1;
  n_1_1.Parent = root;
  n_1_1.Next = n_1_2;
  n_1_2.Parent = root;
  n_2_0.Parent = n_1_0;
  n_1_0.FirstChild = n_2_0;
  n_2_0.Next = n_2_1;
  n_2_1.Parent = n_1_0;
  n_3_0.Parent = n_2_0;
  n_2_0.FirstChild = n_3_0;
  n_3_0.Next = n_3_1;
  n_3_1.Parent = n_2_0;

  return root;
}

Deno.test("walk - WalkStop", () => {
  const root = _createNode();
  const walker = (n: Node, entering: boolean) => {
    return WalkStatus.WalkStop;
  };
  assertEquals(walk(root, walker), WalkStatus.WalkStop);
});

Deno.test("walk - WalkSkipChildren", () => {
  const root = _createNode();
  const walker = (n: Node, entering: boolean) => {
    return WalkStatus.WalkSkipChildren;
  };
  assertEquals(walk(root, walker), WalkStatus.WalkSkipChildren);
});

Deno.test("walk - WalkContinue", () => {
  const root = _createNode();
  const depths: number[] = [];
  let currentDepth = 0;

  const walker = (n: Node, entering: boolean) => {
    if (entering) {
      depths.push(currentDepth);
      currentDepth++;
    } else {
      currentDepth--;
    }
    return WalkStatus.WalkContinue;
  };
  walk(root, walker);
  const expectedDepths = [0, 1, 2, 3, 3, 2, 1, 1];
  assertEquals(depths, expectedDepths);
});

Deno.test("walk - complete traversal", () => {
  const root = _createNode();
  const visitedNodes: Node[] = [];

  const walker = (n: Node, entering: boolean) => {
    if (entering) {
      visitedNodes.push(n);
    }
    return WalkStatus.WalkContinue;
  };

  walk(root, walker);

  // Check if all nodes are visited
  const expectedNodes = [
    root,
    root.FirstChild,
    root?.FirstChild?.FirstChild,
    root?.FirstChild?.FirstChild?.FirstChild,
    root?.FirstChild?.FirstChild?.FirstChild?.Next,
    root?.FirstChild?.FirstChild?.Next,
    root?.FirstChild?.Next,
    root?.FirstChild?.Next?.Next,
  ];
  assertEquals(visitedNodes, expectedNodes);
});
