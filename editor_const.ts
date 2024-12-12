// Caret 插入符 \u2038。
export const Caret = "‸";

// CaretNewline 插入符加换行。
export const CaretNewline = Caret + "\n";

// CaretTokens 是插入符的字节数组。
export const CaretTokens = new TextEncoder().encode(Caret);

// CaretRune 是插入符的 Rune。
export const CaretRune = Caret.charCodeAt(0);

// CaretNewlineTokens 插入符加换行字节数组。
export const CaretNewlineTokens = new TextEncoder().encode(CaretNewline);

// CaretReplacement 用于解析过程中临时替换。
export const CaretReplacement = "caretreplacement";

// FrontEndCaret 前端插入符。
export const FrontEndCaret = "<wbr>";

// FrontEndCaretSelfClose 前端自动闭合插入符。
export const FrontEndCaretSelfClose = "<wbr/>";

// IALValEscNewLine 属性值换行转义。
export const IALValEscNewLine = "_esc_newline_";

export const Zwsp = "\u200b"; // 零宽空格。

export const Zwj = "\u200d"; // 零宽连字。