import { assertEquals } from "@std/assert";
import {
  NodeType,
  NodeTypeMap,
  NodeTypeToString,
  StringToNodeType,
} from "./ast_nodetype_string.ts";

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

Deno.test("StringToNodeType should return the correct NodeType value for a given key name", async () => {
  const value = NodeTypeToString(NodeType.NodeBlockquote);
  const result = await StringToNodeType(value);
  const none = await StringToNodeType("None");
  assertEquals(result, NodeType.NodeBlockquote);
  assertEquals(none, -1);
});

