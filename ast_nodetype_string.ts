import { RwLock } from "https://deno.land/x/async@v2.1.0/rw_lock.ts";

export enum NodeType {
  // CommonMark

  NodeDocument = 0, // 根
  NodeParagraph,  // 段落
  NodeHeading, // 标题
  NodeHeadingC8hMarker,  // ATX 标题标记符 #
  NodeThematicBreak, // 分隔线
  NodeBlockquote, // 块引用
  NodeBlockquoteMarker, // 块引用标记符 >
  NodeList, // 列表
  NodeListItem,// 列表项
  NodeHTMLBlock, // HTML 块
  NodeInlineHTML,// 内联 HTML
  NodeCodeBlock,// 代码块
  NodeCodeBlockFenceOpenMarker, // 开始围栏代码块标记符 ```
  NodeCodeBlockFenceCloseMarker, // 结束围栏代码块标记符 ```
  NodeCodeBlockFenceInfoMarker,// 围栏代码块信息标记符
  NodeCodeBlockCode, // 围栏代码块代码
  NodeText,// 文本
  NodeEmphasis,// 强调
  NodeEmA6kOpenMarker,// 开始强调标记符 *
  NodeEmA6kCloseMarker,// 结束强调标记符 *
  NodeEmU8eOpenMarker, // 开始强调标记符 _
  NodeEmU8eCloseMarker, // 结束强调标记符 _
  NodeStrong, // 加粗
  NodeStrongA6kOpenMarker, // 开始加粗标记符 **
  NodeStrongA6kCloseMarker, // 结束加粗标记符 **
  NodeStrongU8eOpenMarker,// 开始加粗标记符 __
  NodeStrongU8eCloseMarker, // 结束加粗标记符 __
  NodeCodeSpan, // 代码
  NodeCodeSpanOpenMarker,// 开始代码标记符 `
  NodeCodeSpanContent, // 代码内容
  NodeCodeSpanCloseMarker, // 结束代码标记符 `
  NodeHardBreak, // 硬换行
  NodeSoftBreak,// 软换行
  NodeLink,// 链接
  NodeImage,// 图片
  NodeBang,// !
  NodeOpenBracket,// [
  NodeCloseBracket, // ]
  NodeOpenParen, // (
  NodeCloseParen, // )
  NodeLinkText, // 链接文本
  NodeLinkDest,// 链接地址
  NodeLinkTitle, // 链接标题
  NodeLinkSpace,// 链接地址和链接标题之间的空格
  NodeHTMLEntity, // HTML 实体
  NodeLinkRefDefBlock,// 链接引用定义块
  NodeLinkRefDef,// 链接引用定义 [label]:
  NodeLess,// <
  NodeGreater, // >

  // GFM

  NodeTaskListItemMarker = 100, // 任务列表项标记符
  NodeStrikethrough,// 删除线
  NodeStrikethrough1OpenMarker, // 开始删除线标记符 ~
  NodeStrikethrough1CloseMarker, // 结束删除线标记符 ~
  NodeStrikethrough2OpenMarker, // 开始删除线标记符 ~~
  NodeStrikethrough2CloseMarker, // 结束删除线标记符 ~~
  NodeTable, // 表
  NodeTableHead, // 表头
  NodeTableRow, // 表行
  NodeTableCell, // 表格

  // Emoji

  NodeEmoji = 200, // Emoji
  NodeEmojiUnicode, // Emoji Unicode
  NodeEmojiImg, // Emoji 图片
  NodeEmojiAlias, // Emoji ASCII

  // 数学公式

  NodeMathBlock = 300, // 数学公式块
  NodeMathBlockOpenMarker, // 开始数学公式块标记符 $$
  NodeMathBlockContent, // 数学公式块内容
  NodeMathBlockCloseMarker, // 结束数学公式块标记符 $$
  NodeInlineMath, // 内联数学公式
  NodeInlineMathOpenMarker, // 开始内联数学公式标记符 $
  NodeInlineMathContent, // 内联数学公式内容
  NodeInlineMathCloseMarker, // 结束内联数学公式标记符 $

  // 转义

  NodeBackslash = 400, // 转义反斜杠标记符 \
  NodeBackslashContent, // 转义反斜杠后的内容

  // Vditor 支持

  NodeVditorCaret = 405, // 插入符，某些情况下需要使用该节点进行插入符位置调整

  // 脚注

  NodeFootnotesDefBlock = 410, // 脚注定义块
  NodeFootnotesDef, // 脚注定义 [^label]:
  NodeFootnotesRef, // 脚注引用 [^label]

  // 目录

  NodeToC = 415, // 目录 [toc]

  // 标题

  NodeHeadingID = 420, // 标题 ID # foo {id}

  // YAML Front Matter

  NodeYamlFrontMatter = 425, // https://jekyllrb.com/docs/front-matter/
  NodeYamlFrontMatterOpenMarker, // 开始 YAML Front Matter 标记符 ---
  NodeYamlFrontMatterContent, // YAML Front Matter 内容
  NodeYamlFrontMatterCloseMarker, // 结束 YAML Front Matter 标记符 ---

  // 内容块引用（Block Reference） https://github.com/88250/lute/issues/82

  NodeBlockRef = 430,// 内容块引用节点
  NodeBlockRefID, // 被引用的内容块（定义块）ID
  NodeBlockRefSpace, // 被引用的内容块 ID 和内容块引用锚文本之间的空格
  NodeBlockRefText, // 内容块引用锚文本
  NodeBlockRefDynamicText, // 内容块引用动态锚文本

  // ==Mark== 标记语法 https://github.com/88250/lute/issues/84

  NodeMark = 450, // 标记
  NodeMark1OpenMarker, // 开始标记标记符 =
  NodeMark1CloseMarker, // 结束标记标记符 =
  NodeMark2OpenMarker,// 开始标记标记符 ==
  NodeMark2CloseMarker, // 结束标记标记符 ==

  // kramdown 内联属性列表 https://github.com/88250/lute/issues/89 and https://github.com/88250/lute/issues/118

  NodeKramdownBlockIAL = 455, // 块级内联属性列表 {: name="value"}
  NodeKramdownSpanIAL, // 行级内联属性列表 *foo*{: name="value"}bar

  // #Tag# 标签语法 https://github.com/88250/lute/issues/92

  NodeTag = 460,// 标签
  NodeTagOpenMarker, // 开始标签标记符 #
  NodeTagCloseMarker, // 结束标签标记符 #

  // 内容块查询嵌入（Block Query Embed）语法 https://github.com/88250/lute/issues/96

  NodeBlockQueryEmbed = 465, // 内容块查询嵌入
  NodeOpenBrace,  // {
  NodeCloseBrace, // }
  NodeBlockQueryEmbedScript, // 内容块查询嵌入脚本

  // 超级块语法 https://github.com/88250/lute/issues/111

  NodeSuperBlock = 475,  // 超级块节点
  NodeSuperBlockOpenMarker,  // 开始超级块标记符 {{{
  NodeSuperBlockLayoutMarker, // 超级块布局 row/col
  NodeSuperBlockCloseMarker, // 结束超级块标记符 }}}

  // 上标下标语法 https://github.com/88250/lute/issues/113

  NodeSup = 485, // 上标
  NodeSupOpenMarker, // 开始上标标记符 ^
  NodeSupCloseMarker,  // 结束上标标记符 ^
  NodeSub = 490,  // 下标
  NodeSubOpenMarker,  // 开始下标标记符 ~
  NodeSubCloseMarker,  // 结束下标标记符 ~

  // Git 冲突标记 https://github.com/88250/lute/issues/131

  NodeGitConflict = 495,  // Git 冲突标记
  NodeGitConflictOpenMarker,  // 开始 Git 冲突标记标记符 <<<<<<<
  NodeGitConflictContent, // Git 冲突标记内容
  NodeGitConflictCloseMarker, // 结束 Git 冲突标记标记符 >>>>>>>

  // <iframe> 标签

  NodeIFrame = 500,  // <iframe> 标签

  // <audio> 标签

  NodeAudio = 505,  // <audio> 标签

  // <video> 标签

  NodeVideo = 510,  // <video> 标签

  // <kbd> 标签

  NodeKbd = 515, // 键盘
  NodeKbdOpenMarker, // 开始 kbd 标记符 <kbd>
  NodeKbdCloseMarker,  // 结束 kbd 标记符 </kbd>

  // <u> 标签

  NodeUnderline = 520,  // 下划线
  NodeUnderlineOpenMarker, // 开始下划线标记符 <u>
  NodeUnderlineCloseMarker, // 结束下划线标记符 </u>

  // <br> 标签

  NodeBr = 525,  // <br> 换行

  // <span data-type="mark">foo</span> 通用的行级文本标记，不能嵌套

  NodeTextMark = 530, // 文本标记，该节点因为不存在嵌套，所以不使用 Open/Close 标记符

  // Protyle 挂件，<iframe data-type="NodeWidget">

  NodeWidget = 535, // <iframe data-type="NodeWidget" data-subtype="widget"></iframe>

  // 文件注解引用 https://github.com/88250/lute/issues/155

  NodeFileAnnotationRef = 540,  // 文件注解引用节点
  NodeFileAnnotationRefID,  // 被引用的文件注解 ID（file/annotation）
  NodeFileAnnotationRefSpace, // 被引用的文件注解 ID 和文件注解引用锚文本之间的空格
  NodeFileAnnotationRefText, // 文件注解引用锚文本（不能为空，如果为空的话会自动使用 ID 渲染）

  // 属性视图 https://github.com/siyuan-note/siyuan/issues/7535 <div data-type="NodeAttributeView" data-av-type="table" data-av-id="xxx"></div>

  NodeAttributeView = 550,  // 属性视图

  // 自定义块 https://github.com/siyuan-note/siyuan/issues/8418 ;;;info

  NodeCustomBlock = 560,  // 自定义块

  // HTML 标签，在无法使用 Markdown 标记符的情况下直接使用 HTML 标签

  NodeHTMLTag = 570, // HTML 标签
  NodeHTMLTagOpen,  // 开始 HTML 标签
  NodeHTMLTagClose,  // 结束 HTML 标签
  NodeTypeMaxVal = 1024,  // 节点类型最大值
}

export const NodeTypeMap: { [key: number]: string } = {
  [NodeType.NodeDocument]: "NodeDocument",
  [NodeType.NodeParagraph]: "NodeParagraph",
  [NodeType.NodeHeading]: "NodeHeading",
  [NodeType.NodeHeadingC8hMarker]: "NodeHeadingC8hMarker",
  [NodeType.NodeThematicBreak]: "NodeThematicBreak",
  [NodeType.NodeBlockquote]: "NodeBlockquote",
  [NodeType.NodeBlockquoteMarker]: "NodeBlockquoteMarker",
  [NodeType.NodeList]: "NodeList",
  [NodeType.NodeListItem]: "NodeListItem",
  [NodeType.NodeHTMLBlock]: "NodeHTMLBlock",
  [NodeType.NodeInlineHTML]: "NodeInlineHTML",
  [NodeType.NodeCodeBlock]: "NodeCodeBlock",
  [NodeType.NodeCodeBlockFenceOpenMarker]: "NodeCodeBlockFenceOpenMarker",
  [NodeType.NodeCodeBlockFenceCloseMarker]: "NodeCodeBlockFenceCloseMarker",
  [NodeType.NodeCodeBlockFenceInfoMarker]: "NodeCodeBlockFenceInfoMarker",
  [NodeType.NodeCodeBlockCode]: "NodeCodeBlockCode",
  [NodeType.NodeText]: "NodeText",
  [NodeType.NodeEmphasis]: "NodeEmphasis",
  [NodeType.NodeEmA6kOpenMarker]: "NodeEmA6kOpenMarker",
  [NodeType.NodeEmA6kCloseMarker]: "NodeEmA6kCloseMarker",
  [NodeType.NodeEmU8eOpenMarker]: "NodeEmU8eOpenMarker",
  [NodeType.NodeEmU8eCloseMarker]: "NodeEmU8eCloseMarker",
  [NodeType.NodeStrong]: "NodeStrong",
  [NodeType.NodeStrongA6kOpenMarker]: "NodeStrongA6kOpenMarker",
  [NodeType.NodeStrongA6kCloseMarker]: "NodeStrongA6kCloseMarker",
  [NodeType.NodeStrongU8eOpenMarker]: "NodeStrongU8eOpenMarker",
  [NodeType.NodeStrongU8eCloseMarker]: "NodeStrongU8eCloseMarker",
  [NodeType.NodeCodeSpan]: "NodeCodeSpan",
  [NodeType.NodeCodeSpanOpenMarker]: "NodeCodeSpanOpenMarker",
  [NodeType.NodeCodeSpanContent]: "NodeCodeSpanContent",
  [NodeType.NodeCodeSpanCloseMarker]: "NodeCodeSpanCloseMarker",
  [NodeType.NodeHardBreak]: "NodeHardBreak",
  [NodeType.NodeSoftBreak]: "NodeSoftBreak",
  [NodeType.NodeLink]: "NodeLink",
  [NodeType.NodeImage]: "NodeImage",
  [NodeType.NodeBang]: "NodeBang",
  [NodeType.NodeOpenBracket]: "NodeOpenBracket",
  [NodeType.NodeCloseBracket]: "NodeCloseBracket",
  [NodeType.NodeOpenParen]: "NodeOpenParen",
  [NodeType.NodeCloseParen]: "NodeCloseParen",
  [NodeType.NodeLinkText]: "NodeLinkText",
  [NodeType.NodeLinkDest]: "NodeLinkDest",
  [NodeType.NodeLinkTitle]: "NodeLinkTitle",
  [NodeType.NodeLinkSpace]: "NodeLinkSpace",
  [NodeType.NodeHTMLEntity]: "NodeHTMLEntity",
  [NodeType.NodeLinkRefDefBlock]: "NodeLinkRefDefBlock",
  [NodeType.NodeLinkRefDef]: "NodeLinkRefDef",
  [NodeType.NodeLess]: "NodeLess",
  [NodeType.NodeGreater]: "NodeGreater",
  [NodeType.NodeTaskListItemMarker]: "NodeTaskListItemMarker",
  [NodeType.NodeStrikethrough]: "NodeStrikethrough",
  [NodeType.NodeStrikethrough1OpenMarker]: "NodeStrikethrough1OpenMarker",
  [NodeType.NodeStrikethrough1CloseMarker]: "NodeStrikethrough1CloseMarker",
  [NodeType.NodeStrikethrough2OpenMarker]: "NodeStrikethrough2OpenMarker",
  [NodeType.NodeStrikethrough2CloseMarker]: "NodeStrikethrough2CloseMarker",
  [NodeType.NodeTable]: "NodeTable",
  [NodeType.NodeTableHead]: "NodeTableHead",
  [NodeType.NodeTableRow]: "NodeTableRow",
  [NodeType.NodeTableCell]: "NodeTableCell",
  [NodeType.NodeEmoji]: "NodeEmoji",
  [NodeType.NodeEmojiUnicode]: "NodeEmojiUnicode",
  [NodeType.NodeEmojiImg]: "NodeEmojiImg",
  [NodeType.NodeEmojiAlias]: "NodeEmojiAlias",
  [NodeType.NodeMathBlock]: "NodeMathBlock",
  [NodeType.NodeMathBlockOpenMarker]: "NodeMathBlockOpenMarker",
  [NodeType.NodeMathBlockContent]: "NodeMathBlockContent",
  [NodeType.NodeMathBlockCloseMarker]: "NodeMathBlockCloseMarker",
  [NodeType.NodeInlineMath]: "NodeInlineMath",
  [NodeType.NodeInlineMathOpenMarker]: "NodeInlineMathOpenMarker",
  [NodeType.NodeInlineMathContent]: "NodeInlineMathContent",
  [NodeType.NodeInlineMathCloseMarker]: "NodeInlineMathCloseMarker",
  [NodeType.NodeBackslash]: "NodeBackslash",
  [NodeType.NodeBackslashContent]: "NodeBackslashContent",
  [NodeType.NodeVditorCaret]: "NodeVditorCaret",
  [NodeType.NodeFootnotesDefBlock]: "NodeFootnotesDefBlock",
  [NodeType.NodeFootnotesDef]: "NodeFootnotesDef",
  [NodeType.NodeFootnotesRef]: "NodeFootnotesRef",
  [NodeType.NodeToC]: "NodeToC",
  [NodeType.NodeHeadingID]: "NodeHeadingID",
  [NodeType.NodeYamlFrontMatter]: "NodeYamlFrontMatter",
  [NodeType.NodeYamlFrontMatterOpenMarker]: "NodeYamlFrontMatterOpenMarker",
  [NodeType.NodeYamlFrontMatterContent]: "NodeYamlFrontMatterContent",
  [NodeType.NodeYamlFrontMatterCloseMarker]: "NodeYamlFrontMatterCloseMarker",
  [NodeType.NodeBlockRef]: "NodeBlockRef",
  [NodeType.NodeBlockRefID]: "NodeBlockRefID",
  [NodeType.NodeBlockRefSpace]: "NodeBlockRefSpace",
  [NodeType.NodeBlockRefText]: "NodeBlockRefText",
  [NodeType.NodeBlockRefDynamicText]: "NodeBlockRefDynamicText",
  [NodeType.NodeMark]: "NodeMark",
  [NodeType.NodeMark1OpenMarker]: "NodeMark1OpenMarker",
  [NodeType.NodeMark1CloseMarker]: "NodeMark1CloseMarker",
  [NodeType.NodeMark2OpenMarker]: "NodeMark2OpenMarker",
  [NodeType.NodeMark2CloseMarker]: "NodeMark2CloseMarker",
  [NodeType.NodeKramdownBlockIAL]: "NodeKramdownBlockIAL",
  [NodeType.NodeKramdownSpanIAL]: "NodeKramdownSpanIAL",
  [NodeType.NodeTag]: "NodeTag",
  [NodeType.NodeTagOpenMarker]: "NodeTagOpenMarker",
  [NodeType.NodeTagCloseMarker]: "NodeTagCloseMarker",
  [NodeType.NodeBlockQueryEmbed]: "NodeBlockQueryEmbed",
  [NodeType.NodeOpenBrace]: "NodeOpenBrace",
  [NodeType.NodeCloseBrace]: "NodeCloseBrace",
  [NodeType.NodeBlockQueryEmbedScript]: "NodeBlockQueryEmbedScript",
  [NodeType.NodeSuperBlock]: "NodeSuperBlock",
  [NodeType.NodeSuperBlockOpenMarker]: "NodeSuperBlockOpenMarker",
  [NodeType.NodeSuperBlockLayoutMarker]: "NodeSuperBlockLayoutMarker",
  [NodeType.NodeSuperBlockCloseMarker]: "NodeSuperBlockCloseMarker",
  [NodeType.NodeSup]: "NodeSup",
  [NodeType.NodeSupOpenMarker]: "NodeSupOpenMarker",
  [NodeType.NodeSupCloseMarker]: "NodeSupCloseMarker",
  [NodeType.NodeSub]: "NodeSub",
  [NodeType.NodeSubOpenMarker]: "NodeSubOpenMarker",
  [NodeType.NodeSubCloseMarker]: "NodeSubCloseMarker",
  [NodeType.NodeGitConflict]: "NodeGitConflict",
  [NodeType.NodeGitConflictOpenMarker]: "NodeGitConflictOpenMarker",
  [NodeType.NodeGitConflictContent]: "NodeGitConflictContent",
  [NodeType.NodeGitConflictCloseMarker]: "NodeGitConflictCloseMarker",
  [NodeType.NodeIFrame]: "NodeIFrame",
  [NodeType.NodeAudio]: "NodeAudio",
  [NodeType.NodeVideo]: "NodeVideo",
  [NodeType.NodeKbd]: "NodeKbd",
  [NodeType.NodeKbdOpenMarker]: "NodeKbdOpenMarker",
  [NodeType.NodeKbdCloseMarker]: "NodeKbdCloseMarker",
  [NodeType.NodeUnderline]: "NodeUnderline",
  [NodeType.NodeUnderlineOpenMarker]: "NodeUnderlineOpenMarker",
  [NodeType.NodeUnderlineCloseMarker]: "NodeUnderlineCloseMarker",
  [NodeType.NodeBr]: "NodeBr",
  [NodeType.NodeTextMark]: "NodeTextMark",
  [NodeType.NodeWidget]: "NodeWidget",
  [NodeType.NodeFileAnnotationRef]: "NodeFileAnnotationRef",
  [NodeType.NodeFileAnnotationRefID]: "NodeFileAnnotationRefID",
  [NodeType.NodeFileAnnotationRefSpace]: "NodeFileAnnotationRefSpace",
  [NodeType.NodeFileAnnotationRefText]: "NodeFileAnnotationRefText",
  [NodeType.NodeAttributeView]: "NodeAttributeView",
  [NodeType.NodeCustomBlock]: "NodeCustomBlock",
  [NodeType.NodeHTMLTag]: "NodeHTMLTag",
  [NodeType.NodeHTMLTagOpen]: "NodeHTMLTagOpen",
  [NodeType.NodeHTMLTagClose]: "NodeHTMLTagClose",
  [NodeType.NodeTypeMaxVal]: "NodeTypeMaxVal",
};

export const strNodeTypeMap = new RwLock<{ [key: string]: NodeType }>({});

export async function StringToNodeType(nodeTypeStr: string): Promise<NodeType> {
  return await strNodeTypeMap.rlock((map) => {
    if (nodeTypeStr in map) return map[nodeTypeStr];
    else return -1 as NodeType;
  });
}

export function NodeTypeToString(i: NodeType): string {
  if (i in NodeTypeMap) {
    return NodeTypeMap[i];
  }
  return `NodeType(${i})`;
}

(() => {
  strNodeTypeMap.lock((map) => {
    for (let t = NodeType.NodeDocument; t < NodeType.NodeTypeMaxVal; t++) {
      const str = NodeTypeToString(t);
      map[str] = t;
    }
  })
})();
