import { assertEquals } from "@std/assert";
import { NodeType, NodeTypeMap, NodeTypeToString } from "./node_type.ts";

Deno.test("NodeTypeMap should contain all keys from NodeType", () => {
  let includeAllKeys = true;
  const MapKeys = Object.keys(NodeType);
  Object.keys(NodeType).forEach((key) => {
    if (!MapKeys.includes(key)) includeAllKeys = false;
  });
  assertEquals(includeAllKeys, true);
});

Deno.test("NodeTypeMap values should match NodeType key names.", () => {
  for (const key in NodeTypeMap) {
    assertEquals(NodeType[key], NodeTypeMap[key]);
  }
});

Deno.test("NodeTypeToString should return the correct key name for a given NodeType value", () => {
  const nodeType = NodeType.NodeBlockquote;
  const value = "NodeBlockquote";
  assertEquals(NodeTypeToString(nodeType), value);
});
