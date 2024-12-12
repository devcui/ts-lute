export type ParserOptions = {
  // GFMTable 设置是否打开“GFM 表”支持。
  GFMTable: boolean;
  // GFMTaskListItem 设置是否打开“GFM 任务列表项”支持。
  GFMTaskListItem: boolean;
  // GFMStrikethrough 设置是否打开“GFM 删除线”支持。
  GFMStrikethrough: boolean;
  // GFMStrikethrough1 设置是否打开“GFM 删除线”一个标记符 ~ 支持。
  // GFM 删除线支持两个标记符 ~~，这个选项用于支持一个标记符的删除线。
  GFMStrikethrough1: boolean;
  // GFMAutoLink 设置是否打开“GFM 自动链接”支持。
  GFMAutoLink: boolean;
  // Footnotes 设置是否打开“脚注”支持。
  Footnotes: boolean;
  // HeadingID 设置是否打开“自定义标题 ID”支持。
  HeadingID: boolean;
  // ToC 设置是否打开“目录”支持。
  ToC: boolean;
  // Emoji 设置是否对 Emoji 别名替换为原生 Unicode 字符。
  Emoji: boolean;
  // AliasEmoji 存储 ASCII 别名到表情 Unicode 映射。
  AliasEmoji: Map<string, string>;
  // EmojiAlias 存储表情 Unicode 到 ASCII 别名映射。
  EmojiAlias: Map<string, string>;
  // EmojiSite 设置图片 Emoji URL 的路径前缀。
  EmojiSite: Map<string, string>;
  // Vditor 所见即所得支持。
  VditorWYSIWYG: boolean;
  // Vditor 即时渲染支持。
  VditorIR: boolean;
  // Vditor 分屏预览支持。
  VditorSV: boolean;
  // Protyle 所见即所得支持。
  ProtyleWYSIWYG: boolean;
  // InlineMath 设置是否开启行级公式 $foo$ 支持。
  InlineMath: boolean;
  // InlineMathAllowDigitAfterOpenMarker 设置内联数学公式是否允许起始 $ 后紧跟数字 https://github.com/b3log/lute/issues/38
  InlineMathAllowDigitAfterOpenMarker: boolean;
  // Setext 设置是否解析 Setext 标题 https://github.com/88250/lute/issues/50
  Setext: boolean;
  // YamlFrontMatter 设置是否开启 YAML Front Matter 支持。
  YamlFrontMatter: boolean;
  // BlockRef 设置是否开启内容块引用支持。
  BlockRef: boolean;
  // FileAnnotationRef 设置是否开启文件注解引用支持。
  FileAnnotationRef: boolean;
  // Mark 设置是否打开 ==标记== 支持。
  Mark: boolean;
  // KramdownBlockIAL 设置是否打开 kramdown 块级内联属性列表支持。 https://kramdown.gettalong.org/syntax.html#inline-attribute-lists
  KramdownBlockIAL: boolean;
  // KramdownSpanIAL 设置是否打开 kramdown 行级内联属性列表支持。
  KramdownSpanIAL: boolean;
  // Tag 设置是否开启 #标签# 支持。
  Tag: boolean;
  // ImgPathAllowSpace 设置是否支持图片路径带空格。
  ImgPathAllowSpace: boolean;
  // SuperBlock 设置是否支持超级块。 https://github.com/88250/lute/issues/111
  SuperBlock: boolean;
  // Sup 设置是否打开 ^上标^ 支持。
  Sup: boolean;
  // Sub 设置是否打开 ~下标~ 支持。
  Sub: boolean;
  // InlineAsterisk 设置是否打开行级 * 语法支持（*foo* 和 **foo**）。
  InlineAsterisk: boolean;
  // InlineUnderscore 设置是否打开行级 _ 语法支持（_foo_ 和 __foo__）。
  InlineUnderscore: boolean;
  // GitConflict 设置是否打开 Git 冲突标记支持。
  GitConflict: boolean;
  // LinkRef 设置是否打开“链接引用”支持。
  LinkRef: boolean;
  // IndentCodeBlock 设置是否打开“缩进代码块”支持。
  IndentCodeBlock: boolean;
  // ParagraphBeginningSpace 设置是否打开“段首空格”支持。
  ParagraphBeginningSpace: boolean;
  // DataImage 设置是否打开 ![foo](data:image...) 形式的图片支持。
  DataImage: boolean;
  // TextMark 设置是否打开通用行级节点解析支持。
  TextMark: boolean;
  // HTMLTag2TextMark 设置是否打开 HTML 某些标签解析为 TextMark 节点支持。
  // 目前仅支持 <u>、<kbd>、<sub>、<sup>、<strong>/<b>、<em>/<i>、<s>/<del>/<strike> 和 <mark>。
  HTMLTag2TextMark: boolean;
  // Spin 设置是否打开自旋解析支持，该选项仅用于 Spin 内部过程，设置时请注意使用场景。
  //
  // 该选项的引入主要为了解决 finalParseBlockIAL 过程中是否需要移动 IAL 节点的问题，只有处于自旋过程中才需要移动 IAL 节点
  // 其他情况，比如标题块软换行分块 https://github.com/siyuan-note/siyuan/issues/5723 以及软换行空行分块 https://ld246.com/article/1703839312585
  // 的场景需要移动 IAL 节点，但是 API 输入 markdown https://github.com/siyuan-note/siyuan/issues/6725）无需移动
  Spin: boolean;
};
