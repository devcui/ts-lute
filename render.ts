export type RenderOptions = {
  // SoftBreak2HardBreak 设置是否将软换行（\n）渲染为硬换行（<br />）。
  SoftBreak2HardBreak: boolean;
  // AutoSpace 设置是否对普通文本中的中西文间自动插入空格。
  // https://github.com/sparanoid/chinese-copywriting-guidelines
  AutoSpace: boolean;
  // RenderListStyle 设置在渲染 OL、UL 时是否添加 data-style 属性 https://github.com/88250/lute/issues/48
  RenderListStyle: boolean;
  // CodeSyntaxHighlight 设置是否对代码块进行语法高亮。
  CodeSyntaxHighlight: boolean;
  // CodeSyntaxHighlightDetectLang:boolean
  CodeSyntaxHighlightDetectLang: boolean;
  // CodeSyntaxHighlightInlineStyle 设置语法高亮是否为内联样式，默认不内联。
  CodeSyntaxHighlightInlineStyle: boolean;
  // CodeSyntaxHightLineNum 设置语法高亮是否显示行号，默认不显示。
  CodeSyntaxHighlightLineNum: boolean;
  // CodeSyntaxHighlightStyleName 指定语法高亮样式名，默认为 "github"。
  CodeSyntaxHighlightStyleName: string;
  // Vditor 所见即所得支持。
  VditorWYSIWYG: boolean;
  // Vditor 即时渲染支持。
  VditorIR: boolean;
  // Vditor 分屏预览支持。
  VditorSV: boolean;
  // Protyle 所见即所得支持。
  ProtyleWYSIWYG: boolean;
  // KramdownBlockIAL 设置是否打开 kramdown 块级内联属性列表支持。 https://kramdown.gettalong.org/syntax.html#inline-attribute-lists
  KramdownBlockIAL: boolean;
  // KramdownSpanIAL 设置是否打开 kramdown 行级内联属性列表支持。
  KramdownSpanIAL: boolean;
  // SuperBlock 设置是否支持超级块。 https://github.com/88250/lute/issues/111
  SuperBlock: boolean;
  // ImageLazyLoading 设置图片懒加载时使用的图片路径，配置该字段后将启用图片懒加载。
  // 图片 src 的值会复制给新属性 data-src，然后使用该参数值作为 src 的值 https://github.com/88250/lute/issues/55
  ImageLazyLoading: string;
  // ChineseParagraphBeginningSpace 设置是否使用传统中文排版“段落开头空两格”。
  ChineseParagraphBeginningSpace: boolean;
  // Sanitize 设置是否启用 XSS 安全过滤 https://github.com/88250/lute/issues/51
  // 注意：Lute 目前的实现存在一些漏洞，请不要依赖它来防御 XSS 攻击。
  Sanitize: boolean;
  // FixTermTypo 设置是否对普通文本中出现的术语进行修正。
  // https://github.com/sparanoid/chinese-copywriting-guidelines
  // 注意：开启术语修正的话会默认在中西文之间插入空格。
  FixTermTypo: boolean;
  // Terms 将传入的 terms 合并覆盖到已有的 Terms 字典。
  Terms: Map<string, string>;
  // ToC 设置是否打开“目录”支持。
  ToC: boolean;
  // HeadingID 设置是否打开“自定义标题 ID”支持。
  HeadingID: boolean;
  // KramdownIALIDRenderName 设置 kramdown 内联属性列表中出现 id 属性时渲染 id 属性用的 name(key) 名称，默认为 "id"。
  // 仅在 HTML 渲染器 HtmlRenderer 中支持。
  KramdownIALIDRenderName: string;
  // HeadingAnchor 设置是否对标题生成链接锚点。
  HeadingAnchor: boolean;
  // GFMTaskListItemClass 作为 GFM 任务列表项类名，默认为 "vditor-task"。
  GFMTaskListItemClass: string;
  // VditorCodeBlockPreview 设置 Vditor 代码块是否需要渲染预览部分
  VditorCodeBlockPreview: boolean;
  // VditorMathBlockPreview 设置 Vditor 数学公式块是否需要渲染预览部分
  VditorMathBlockPreview: boolean;
  // VditorHTMLBlockPreview 设置 Vditor HTML 块是否需要渲染预览部分
  VditorHTMLBlockPreview: boolean;
  // LinkBase 设置链接、图片、脚注的基础路径。如果用户在链接或者图片地址中使用相对路径（没有协议前缀且不以 / 开头）并且 LinkBase 不为空则会用该值作为前缀。
  // 比如 LinkBase 设置为 http://domain.com/，对于 ![foo](bar.png) 则渲染为 <img src="http://domain.com/bar.png" alt="foo" />
  LinkBase: string;
  // LinkPrefix 设置连接、图片的路径前缀。一旦设置该值，链接渲染将强制添加该值作为链接前缀，这有别于 LinkBase。
  // 比如 LinkPrefix 设置为 http://domain.com，对于使用绝对路径的 ![foo](/local/path/bar.png) 则渲染为 <img src="http://domain.com/local/path/bar.png" alt="foo" />；
  // 在 LinkBase 和 LinkPrefix 同时设置的情况下，会先处理 LinkBase 逻辑，最后再在 LinkBase 处理结果上加上 LinkPrefix。
  LinkPrefix: string;
  // NodeIndexStart 用于设置块级节点编号起始值。
  NodeIndexStart: number;
  // ProtyleContenteditable 设置 Protyle 渲染时标签中的 contenteditable 属性。
  ProtyleContenteditable: boolean;
  // KeepParagraphBeginningSpace 设置是否保留段首空格
  KeepParagraphBeginningSpace: boolean;
  // NetImgMarker 设置 Protyle 是否标记网络图片
  ProtyleMarkNetImg: boolean;
  // Spellcheck 设置是否启用拼写检查
  Spellcheck: boolean;
};
