import { Bytes } from "./types.ts";

export type HtmlAtom = number;
const HtmlAtomHash0 = 0x81cdf10e;
const HtmlAtomMaxLen = 25;
const HtmlAtomText =
  "abbradiogrouparamainavalueaccept-charsetbodyaccesskeygenobrb" +
  "asefontimeupdateviacacheightmlabelooptgroupatternoembedetail" +
  "sampictureversedfnoframesetdirnameterowspanomoduleacronymali" +
  "gnmarkbdialogallowpaymentrequestrikeytypeallowusermediagroup" +
  "ingaltfooterubyasyncanvasidefaultitleaudioncancelautofocusan" +
  "dboxmplaceholderautoplaysinlinebdoncanplaythrough1bgsoundisa" +
  "bledivarbigblinkindraggablegendblockquotebuttonabortcitempro" +
  "penoncecolgrouplaintextrackcolorcolspannotation-xmlcommandco" +
  "ntrolshapecoordslotranslatecrossoriginsmallowfullscreenoscri" +
  "ptfacenterfieldsetfigcaptionafterprintegrityfigurequiredfore" +
  "ignObjectforeignobjectformactionautocompleteerrorformenctype" +
  "mustmatchallengeformmethodformnovalidatetimeformtargethgroup" +
  "osterhiddenhigh2hreflanghttp-equivideonclickiframeimageimgly" +
  "ph3isindexismappletitemtypemarqueematheadersortedmaxlength4m" +
  "inlength5mtextareadonlymultiplemutedoncloseamlessourceoncont" +
  "extmenuitemidoncopyoncuechangeoncutondblclickondragendondrag" +
  "enterondragexitemreferrerpolicyondragleaveondragoverondragst" +
  "articleondropzonemptiedondurationchangeonendedonerroronfocus" +
  "paceronhashchangeoninputmodeloninvalidonkeydownloadonkeypres" +
  "spellcheckedonkeyupreloadonlanguagechangeonloadeddatalisting" +
  "onloadedmetadatabindexonloadendonloadstartonmessageerroronmo" +
  "usedownonmouseenteronmouseleaveonmousemoveonmouseoutputonmou" +
  "seoveronmouseupromptonmousewheelonofflineononlineonpagehides" +
  "classectionbluronpageshowbronpastepublicontenteditableonpaus" +
  "emaponplayingonpopstateonprogressrcdocodeferonratechangeonre" +
  "jectionhandledonresetonresizesrclangonscrollonsecuritypolicy" +
  "violationauxclickonseekedonseekingonselectedonshowidth6onsor" +
  "tableonstalledonstorageonsubmitemscopedonsuspendontoggleonun" +
  "handledrejectionbeforeprintonunloadonvolumechangeonwaitingon" +
  "wheeloptimumanifestrongoptionbeforeunloaddressrcsetstylesumm" +
  "arysupsvgsystemplateworkertypewrap";

export enum HtmlAtomTypes {
  A = 0x1,
  Abbr = 0x4,
  Accept = 0x1a06,
  AcceptCharset = 0x1a0e,
  Accesskey = 0x2c09,
  Acronym = 0xaa07,
  Action = 0x27206,
  Address = 0x6f307,
  Align = 0xb105,
  Allowfullscreen = 0x2080f,
  Allowpaymentrequest = 0xc113,
  Allowusermedia = 0xdd0e,
  Alt = 0xf303,
  Annotation = 0x1c90a,
  AnnotationXml = 0x1c90e,
  Applet = 0x31906,
  Area = 0x35604,
  Article = 0x3fc07,
  As = 0x3c02,
  Aside = 0x10705,
  Async = 0xff05,
  Audio = 0x11505,
  Autocomplete = 0x2780c,
  Autofocus = 0x12109,
  Autoplay = 0x13c08,
  B = 0x101,
  Base = 0x3b04,
  Basefont = 0x3b08,
  Bdi = 0xba03,
  Bdo = 0x14b03,
  Bgsound = 0x15e07,
  Big = 0x17003,
  Blink = 0x17305,
  Blockquote = 0x1870a,
  Body = 0x2804,
  Br = 0x202,
  Button = 0x19106,
  Canvas = 0x10306,
  Caption = 0x23107,
  Center = 0x22006,
  Challenge = 0x29b09,
  Charset = 0x2107,
  Checked = 0x47907,
  Cite = 0x19c04,
  Class = 0x56405,
  Code = 0x5c504,
  Col = 0x1ab03,
  Colgroup = 0x1ab08,
  Color = 0x1bf05,
  Cols = 0x1c404,
  Colspan = 0x1c407,
  Command = 0x1d707,
  Content = 0x58b07,
  Contenteditable = 0x58b0f,
  Contextmenu = 0x3800b,
  Controls = 0x1de08,
  Coords = 0x1ea06,
  Crossorigin = 0x1fb0b,
  Data = 0x4a504,
  Datalist = 0x4a508,
  Datetime = 0x2b808,
  Dd = 0x2d702,
  Default = 0x10a07,
  Defer = 0x5c705,
  Del = 0x45203,
  Desc = 0x56104,
  Details = 0x7207,
  Dfn = 0x8703,
  Dialog = 0xbb06,
  Dir = 0x9303,
  Dirname = 0x9307,
  Disabled = 0x16408,
  Div = 0x16b03,
  Dl = 0x5e602,
  Download = 0x46308,
  Draggable = 0x17a09,
  Dropzone = 0x40508,
  Dt = 0x64b02,
  Em = 0x6e02,
  Embed = 0x6e05,
  Enctype = 0x28d07,
  Face = 0x21e04,
  Fieldset = 0x22608,
  Figcaption = 0x22e0a,
  Figure = 0x24806,
  Font = 0x3f04,
  Footer = 0xf606,
  For = 0x25403,
  ForeignObject = 0x2540d,
  Foreignobject = 0x2610d,
  Form = 0x26e04,
  Formaction = 0x26e0a,
  Formenctype = 0x2890b,
  Formmethod = 0x2a40a,
  Formnovalidate = 0x2ae0e,
  Formtarget = 0x2c00a,
  Frame = 0x8b05,
  Frameset = 0x8b08,
  H1 = 0x15c02,
  H2 = 0x2de02,
  H3 = 0x30d02,
  H4 = 0x34502,
  H5 = 0x34f02,
  H6 = 0x64d02,
  Head = 0x33104,
  Header = 0x33106,
  Headers = 0x33107,
  Height = 0x5206,
  Hgroup = 0x2ca06,
  Hidden = 0x2d506,
  High = 0x2db04,
  Hr = 0x15702,
  Href = 0x2e004,
  Hreflang = 0x2e008,
  Html = 0x5604,
  HttpEquiv = 0x2e80a,
  I = 0x601,
  Icon = 0x58a04,
  Id = 0x10902,
  Iframe = 0x2fc06,
  Image = 0x30205,
  Img = 0x30703,
  Input = 0x44b05,
  Inputmode = 0x44b09,
  Ins = 0x20403,
  Integrity = 0x23f09,
  Is = 0x16502,
  Isindex = 0x30f07,
  Ismap = 0x31605,
  Itemid = 0x38b06,
  Itemprop = 0x19d08,
  Itemref = 0x3cd07,
  Itemscope = 0x67109,
  Itemtype = 0x31f08,
  Kbd = 0xb903,
  Keygen = 0x3206,
  Keytype = 0xd607,
  Kind = 0x17704,
  Label = 0x5905,
  Lang = 0x2e404,
  Legend = 0x18106,
  Li = 0xb202,
  Link = 0x17404,
  List = 0x4a904,
  Listing = 0x4a907,
  Loop = 0x5d04,
  Low = 0xc303,
  Main = 0x1004,
  Malignmark = 0xb00a,
  Manifest = 0x6d708,
  Map = 0x31803,
  Mark = 0xb604,
  Marquee = 0x32707,
  Math = 0x32e04,
  Max = 0x33d03,
  Maxlength = 0x33d09,
  Media = 0xe605,
  Mediagroup = 0xe60a,
  Menu = 0x38704,
  Menuitem = 0x38708,
  Meta = 0x4b804,
  Meter = 0x9805,
  Method = 0x2a806,
  Mglyph = 0x30806,
  Mi = 0x34702,
  Min = 0x34703,
  Minlength = 0x34709,
  Mn = 0x2b102,
  Mo = 0xa402,
  Ms = 0x67402,
  Mtext = 0x35105,
  Multiple = 0x35f08,
  Muted = 0x36705,
  Name = 0x9604,
  Nav = 0x1303,
  Nobr = 0x3704,
  Noembed = 0x6c07,
  Noframes = 0x8908,
  Nomodule = 0xa208,
  Nonce = 0x1a605,
  Noscript = 0x21608,
  Novalidate = 0x2b20a,
  Object = 0x26806,
  Ol = 0x13702,
  Onabort = 0x19507,
  Onafterprint = 0x2360c,
  Onautocomplete = 0x2760e,
  Onautocompleteerror = 0x27613,
  Onauxclick = 0x61f0a,
  Onbeforeprint = 0x69e0d,
  Onbeforeunload = 0x6e70e,
  Onblur = 0x56d06,
  Oncancel = 0x11908,
  Oncanplay = 0x14d09,
  Oncanplaythrough = 0x14d10,
  Onchange = 0x41b08,
  Onclick = 0x2f507,
  Onclose = 0x36c07,
  Oncontextmenu = 0x37e0d,
  Oncopy = 0x39106,
  Oncuechange = 0x3970b,
  Oncut = 0x3a205,
  Ondblclick = 0x3a70a,
  Ondrag = 0x3b106,
  Ondragend = 0x3b109,
  Ondragenter = 0x3ba0b,
  Ondragexit = 0x3c50a,
  Ondragleave = 0x3df0b,
  Ondragover = 0x3ea0a,
  Ondragstart = 0x3f40b,
  Ondrop = 0x40306,
  Ondurationchange = 0x41310,
  Onemptied = 0x40a09,
  Onended = 0x42307,
  Onerror = 0x42a07,
  Onfocus = 0x43107,
  Onhashchange = 0x43d0c,
  Oninput = 0x44907,
  Oninvalid = 0x45509,
  Onkeydown = 0x45e09,
  Onkeypress = 0x46b0a,
  Onkeyup = 0x48007,
  Onlanguagechange = 0x48d10,
  Onload = 0x49d06,
  Onloadeddata = 0x49d0c,
  Onloadedmetadata = 0x4b010,
  Onloadend = 0x4c609,
  Onloadstart = 0x4cf0b,
  Onmessage = 0x4da09,
  Onmessageerror = 0x4da0e,
  Onmousedown = 0x4e80b,
  Onmouseenter = 0x4f30c,
  Onmouseleave = 0x4ff0c,
  Onmousemove = 0x50b0b,
  Onmouseout = 0x5160a,
  Onmouseover = 0x5230b,
  Onmouseup = 0x52e09,
  Onmousewheel = 0x53c0c,
  Onoffline = 0x54809,
  Ononline = 0x55108,
  Onpagehide = 0x5590a,
  Onpageshow = 0x5730a,
  Onpaste = 0x57f07,
  Onpause = 0x59a07,
  Onplay = 0x5a406,
  Onplaying = 0x5a409,
  Onpopstate = 0x5ad0a,
  Onprogress = 0x5b70a,
  Onratechange = 0x5cc0c,
  Onrejectionhandled = 0x5d812,
  Onreset = 0x5ea07,
  Onresize = 0x5f108,
  Onscroll = 0x60008,
  Onsecuritypolicyviolation = 0x60819,
  Onseeked = 0x62908,
  Onseeking = 0x63109,
  Onselect = 0x63a08,
  Onshow = 0x64406,
  Onsort = 0x64f06,
  Onstalled = 0x65909,
  Onstorage = 0x66209,
  Onsubmit = 0x66b08,
  Onsuspend = 0x67b09,
  Ontimeupdate = 0x400c,
  Ontoggle = 0x68408,
  Onunhandledrejection = 0x68c14,
  Onunload = 0x6ab08,
  Onvolumechange = 0x6b30e,
  Onwaiting = 0x6c109,
  Onwheel = 0x6ca07,
  Open = 0x1a304,
  Optgroup = 0x5f08,
  Optimum = 0x6d107,
  Option = 0x6e306,
  Output = 0x51d06,
  P = 0xc01,
  Param = 0xc05,
  Pattern = 0x6607,
  Picture = 0x7b07,
  Ping = 0xef04,
  Placeholder = 0x1310b,
  Plaintext = 0x1b209,
  Playsinline = 0x1400b,
  Poster = 0x2cf06,
  Pre = 0x47003,
  Preload = 0x48607,
  Progress = 0x5b908,
  Prompt = 0x53606,
  Public = 0x58606,
  Q = 0xcf01,
  Radiogroup = 0x30a,
  Rb = 0x3a02,
  Readonly = 0x35708,
  Referrerpolicy = 0x3d10e,
  Rel = 0x48703,
  Required = 0x24c08,
  Reversed = 0x8008,
  Rows = 0x9c04,
  Rowspan = 0x9c07,
  Rp = 0x23c02,
  Rt = 0x19a02,
  Rtc = 0x19a03,
  Ruby = 0xfb04,
  S = 0x2501,
  Samp = 0x7804,
  Sandbox = 0x12907,
  Scope = 0x67505,
  Scoped = 0x67506,
  Script = 0x21806,
  Seamless = 0x37108,
  Section = 0x56807,
  Select = 0x63c06,
  Selected = 0x63c08,
  Shape = 0x1e505,
  Size = 0x5f504,
  Sizes = 0x5f505,
  Slot = 0x1ef04,
  Small = 0x20605,
  Sortable = 0x65108,
  Sorted = 0x33706,
  Source = 0x37806,
  Spacer = 0x43706,
  Span = 0x9f04,
  Spellcheck = 0x4740a,
  Src = 0x5c003,
  Srcdoc = 0x5c006,
  Srclang = 0x5f907,
  Srcset = 0x6f906,
  Start = 0x3fa05,
  Step = 0x58304,
  Strike = 0xd206,
  Strong = 0x6dd06,
  Style = 0x6ff05,
  Sub = 0x66d03,
  Summary = 0x70407,
  Sup = 0x70b03,
  Svg = 0x70e03,
  System = 0x71106,
  Tabindex = 0x4be08,
  Table = 0x59505,
  Target = 0x2c406,
  Tbody = 0x2705,
  Td = 0x9202,
  Template = 0x71408,
  Textarea = 0x35208,
  Tfoot = 0xf505,
  Th = 0x15602,
  Thead = 0x33005,
  Time = 0x4204,
  Title = 0x11005,
  Tr = 0xcc02,
  Track = 0x1ba05,
  Translate = 0x1f209,
  Tt = 0x6802,
  Type = 0xd904,
  Typemustmatch = 0x2900d,
  U = 0xb01,
  Ul = 0xa702,
  Updateviacache = 0x460e,
  Usemap = 0x59e06,
  Value = 0x1505,
  Var = 0x16d03,
  Video = 0x2f105,
  Wbr = 0x57c03,
  Width = 0x64905,
  Workertype = 0x71c0a,
  Wrap = 0x72604,
  Xmp = 0x12f03,
}

export const HtmlAtomTable: Array<HtmlAtom> = Array(512);
HtmlAtomTable[0x1] = 0xe60a; // mediagroup
HtmlAtomTable[0x2] = 0x2e404; // lang
HtmlAtomTable[0x4] = 0x2c09; // accesskey
HtmlAtomTable[0x5] = 0x8b08; // frameset
HtmlAtomTable[0x7] = 0x63a08; // onselect
HtmlAtomTable[0x8] = 0x71106; // system
HtmlAtomTable[0xa] = 0x64905; // width
HtmlAtomTable[0xc] = 0x2890b; // formenctype
HtmlAtomTable[0xd] = 0x13702; // ol
HtmlAtomTable[0xe] = 0x3970b; // oncuechange
HtmlAtomTable[0x10] = 0x14b03; // bdo
HtmlAtomTable[0x11] = 0x11505; // audio
HtmlAtomTable[0x12] = 0x17a09; // draggable
HtmlAtomTable[0x14] = 0x2f105; // video
HtmlAtomTable[0x15] = 0x2b102; // mn
HtmlAtomTable[0x16] = 0x38704; // menu
HtmlAtomTable[0x17] = 0x2cf06; // poster
HtmlAtomTable[0x19] = 0xf606; // footer
HtmlAtomTable[0x1a] = 0x2a806; // method
HtmlAtomTable[0x1b] = 0x2b808; // datetime
HtmlAtomTable[0x1c] = 0x19507; // onabort
HtmlAtomTable[0x1d] = 0x460e; // updateviacache
HtmlAtomTable[0x1e] = 0xff05; // async
HtmlAtomTable[0x1f] = 0x49d06; // onload
HtmlAtomTable[0x21] = 0x11908; // oncancel
HtmlAtomTable[0x22] = 0x62908; // onseeked
HtmlAtomTable[0x23] = 0x30205; // image
HtmlAtomTable[0x24] = 0x5d812; // onrejectionhandled
HtmlAtomTable[0x26] = 0x17404; // link
HtmlAtomTable[0x27] = 0x51d06; // output
HtmlAtomTable[0x28] = 0x33104; // head
HtmlAtomTable[0x29] = 0x4ff0c; // onmouseleave
HtmlAtomTable[0x2a] = 0x57f07; // onpaste
HtmlAtomTable[0x2b] = 0x5a409; // onplaying
HtmlAtomTable[0x2c] = 0x1c407; // colspan
HtmlAtomTable[0x2f] = 0x1bf05; // color
HtmlAtomTable[0x30] = 0x5f504; // size
HtmlAtomTable[0x31] = 0x2e80a, // ;ttp-equiv
  HtmlAtomTable[0x33] = 0x601; // i
HtmlAtomTable[0x34] = 0x5590a; // onpagehide
HtmlAtomTable[0x35] = 0x68c14; // onunhandledrejection
HtmlAtomTable[0x37] = 0x42a07; // onerror
HtmlAtomTable[0x3a] = 0x3b08; // basefont
HtmlAtomTable[0x3f] = 0x1303; // nav
HtmlAtomTable[0x40] = 0x17704; // kind
HtmlAtomTable[0x41] = 0x35708; // readonly
HtmlAtomTable[0x42] = 0x30806; // mglyph
HtmlAtomTable[0x44] = 0xb202; // li
HtmlAtomTable[0x46] = 0x2d506; // hidden
HtmlAtomTable[0x47] = 0x70e03; // svg
HtmlAtomTable[0x48] = 0x58304; // step
HtmlAtomTable[0x49] = 0x23f09; // integrity
HtmlAtomTable[0x4a] = 0x58606; // public
HtmlAtomTable[0x4c] = 0x1ab03; // col
HtmlAtomTable[0x4d] = 0x1870a; // blockquote
HtmlAtomTable[0x4e] = 0x34f02; // h5
HtmlAtomTable[0x50] = 0x5b908; // progress
HtmlAtomTable[0x51] = 0x5f505; // sizes
HtmlAtomTable[0x52] = 0x34502; // h4
HtmlAtomTable[0x56] = 0x33005; // thead
HtmlAtomTable[0x57] = 0xd607; // keytype
HtmlAtomTable[0x58] = 0x5b70a; // onprogress
HtmlAtomTable[0x59] = 0x44b09; // inputmode
HtmlAtomTable[0x5a] = 0x3b109; // ondragend
HtmlAtomTable[0x5d] = 0x3a205; // oncut
HtmlAtomTable[0x5e] = 0x43706; // spacer
HtmlAtomTable[0x5f] = 0x1ab08; // colgroup
HtmlAtomTable[0x62] = 0x16502; // is
HtmlAtomTable[0x65] = 0x3c02; // as
HtmlAtomTable[0x66] = 0x54809; // onoffline
HtmlAtomTable[0x67] = 0x33706; // sorted
HtmlAtomTable[0x69] = 0x48d10; // onlanguagechange
HtmlAtomTable[0x6c] = 0x43d0c; // onhashchange
HtmlAtomTable[0x6d] = 0x9604; // name
HtmlAtomTable[0x6e] = 0xf505; // tfoot
HtmlAtomTable[0x6f] = 0x56104; // desc
HtmlAtomTable[0x70] = 0x33d03; // max
HtmlAtomTable[0x72] = 0x1ea06; // coords
HtmlAtomTable[0x73] = 0x30d02; // h3
HtmlAtomTable[0x74] = 0x6e70e; // onbeforeunload
HtmlAtomTable[0x75] = 0x9c04; // rows
HtmlAtomTable[0x76] = 0x63c06; // select
HtmlAtomTable[0x77] = 0x9805; // meter
HtmlAtomTable[0x78] = 0x38b06; // itemid
HtmlAtomTable[0x79] = 0x53c0c; // onmousewheel
HtmlAtomTable[0x7a] = 0x5c006; // srcdoc
HtmlAtomTable[0x7d] = 0x1ba05; // track
HtmlAtomTable[0x7f] = 0x31f08; // itemtype
HtmlAtomTable[0x82] = 0xa402; // mo
HtmlAtomTable[0x83] = 0x41b08; // onchange
HtmlAtomTable[0x84] = 0x33107; // headers
HtmlAtomTable[0x85] = 0x5cc0c; // onratechange
HtmlAtomTable[0x86] = 0x60819; // onsecuritypolicyviolation
HtmlAtomTable[0x88] = 0x4a508; // datalist
HtmlAtomTable[0x89] = 0x4e80b; // onmousedown
HtmlAtomTable[0x8a] = 0x1ef04; // slot
HtmlAtomTable[0x8b] = 0x4b010; // onloadedmetadata
HtmlAtomTable[0x8c] = 0x1a06; // accept
HtmlAtomTable[0x8d] = 0x26806; // object
HtmlAtomTable[0x91] = 0x6b30e; // onvolumechange
HtmlAtomTable[0x92] = 0x2107; // charset
HtmlAtomTable[0x93] = 0x27613; // onautocompleteerror
HtmlAtomTable[0x94] = 0xc113; // allowpaymentrequest
HtmlAtomTable[0x95] = 0x2804; // body
HtmlAtomTable[0x96] = 0x10a07; // default
HtmlAtomTable[0x97] = 0x63c08; // selected
HtmlAtomTable[0x98] = 0x21e04; // face
HtmlAtomTable[0x99] = 0x1e505; // shape
HtmlAtomTable[0x9b] = 0x68408; // ontoggle
HtmlAtomTable[0x9e] = 0x64b02; // dt
HtmlAtomTable[0x9f] = 0xb604; // mark
HtmlAtomTable[0xa1] = 0xb01; // u
HtmlAtomTable[0xa4] = 0x6ab08; // onunload
HtmlAtomTable[0xa5] = 0x5d04; // loop
HtmlAtomTable[0xa6] = 0x16408; // disabled
HtmlAtomTable[0xaa] = 0x42307; // onended
HtmlAtomTable[0xab] = 0xb00a; // malignmark
HtmlAtomTable[0xad] = 0x67b09; // onsuspend
HtmlAtomTable[0xae] = 0x35105; // mtext
HtmlAtomTable[0xaf] = 0x64f06; // onsort
HtmlAtomTable[0xb0] = 0x19d08; // itemprop
HtmlAtomTable[0xb3] = 0x67109; // itemscope
HtmlAtomTable[0xb4] = 0x17305; // blink
HtmlAtomTable[0xb6] = 0x3b106; // ondrag
HtmlAtomTable[0xb7] = 0xa702; // ul
HtmlAtomTable[0xb8] = 0x26e04; // form
HtmlAtomTable[0xb9] = 0x12907; // sandbox
HtmlAtomTable[0xba] = 0x8b05; // frame
HtmlAtomTable[0xbb] = 0x1505; // value
HtmlAtomTable[0xbc] = 0x66209; // onstorage
HtmlAtomTable[0xbf] = 0xaa07; // acronym
HtmlAtomTable[0xc0] = 0x19a02; // rt
HtmlAtomTable[0xc2] = 0x202; // br
HtmlAtomTable[0xc3] = 0x22608; // fieldset
HtmlAtomTable[0xc4] = 0x2900d; // typemustmatch
HtmlAtomTable[0xc5] = 0xa208; // nomodule
HtmlAtomTable[0xc6] = 0x6c07; // noembed
HtmlAtomTable[0xc7] = 0x69e0d; // onbeforeprint
HtmlAtomTable[0xc8] = 0x19106; // button
HtmlAtomTable[0xc9] = 0x2f507; // onclick
HtmlAtomTable[0xca] = 0x70407; // summary
HtmlAtomTable[0xcd] = 0xfb04; // ruby
HtmlAtomTable[0xce] = 0x56405; // class
HtmlAtomTable[0xcf] = 0x3f40b; // ondragstart
HtmlAtomTable[0xd0] = 0x23107; // caption
HtmlAtomTable[0xd4] = 0xdd0e; // allowusermedia
HtmlAtomTable[0xd5] = 0x4cf0b; // onloadstart
HtmlAtomTable[0xd9] = 0x16b03; // div
HtmlAtomTable[0xda] = 0x4a904; // list
HtmlAtomTable[0xdb] = 0x32e04; // math
HtmlAtomTable[0xdc] = 0x44b05; // input
HtmlAtomTable[0xdf] = 0x3ea0a; // ondragover
HtmlAtomTable[0xe0] = 0x2de02; // h2
HtmlAtomTable[0xe2] = 0x1b209; // plaintext
HtmlAtomTable[0xe4] = 0x4f30c; // onmouseenter
HtmlAtomTable[0xe7] = 0x47907; // checked
HtmlAtomTable[0xe8] = 0x47003; // pre
HtmlAtomTable[0xea] = 0x35f08; // multiple
HtmlAtomTable[0xeb] = 0xba03; // bdi
HtmlAtomTable[0xec] = 0x33d09; // maxlength
HtmlAtomTable[0xed] = 0xcf01; // q
HtmlAtomTable[0xee] = 0x61f0a; // onauxclick
HtmlAtomTable[0xf0] = 0x57c03; // wbr
HtmlAtomTable[0xf2] = 0x3b04; // base
HtmlAtomTable[0xf3] = 0x6e306; // option
HtmlAtomTable[0xf5] = 0x41310; // ondurationchange
HtmlAtomTable[0xf7] = 0x8908; // noframes
HtmlAtomTable[0xf9] = 0x40508; // dropzone
HtmlAtomTable[0xfb] = 0x67505; // scope
HtmlAtomTable[0xfc] = 0x8008; // reversed
HtmlAtomTable[0xfd] = 0x3ba0b; // ondragenter
HtmlAtomTable[0xfe] = 0x3fa05; // start
HtmlAtomTable[0xff] = 0x12f03; // xmp
HtmlAtomTable[0x100] = 0x5f907; // srclang
HtmlAtomTable[0x101] = 0x30703; // img
HtmlAtomTable[0x104] = 0x101; // b
HtmlAtomTable[0x105] = 0x25403; // for
HtmlAtomTable[0x106] = 0x10705; // aside
HtmlAtomTable[0x107] = 0x44907; // oninput
HtmlAtomTable[0x108] = 0x35604; // area
HtmlAtomTable[0x109] = 0x2a40a; // formmethod
HtmlAtomTable[0x10a] = 0x72604; // wrap
HtmlAtomTable[0x10c] = 0x23c02; // rp
HtmlAtomTable[0x10d] = 0x46b0a; // onkeypress
HtmlAtomTable[0x10e] = 0x6802; // tt
HtmlAtomTable[0x110] = 0x34702; // mi
HtmlAtomTable[0x111] = 0x36705; // muted
HtmlAtomTable[0x112] = 0xf303; // alt
HtmlAtomTable[0x113] = 0x5c504; // code
HtmlAtomTable[0x114] = 0x6e02; // em
HtmlAtomTable[0x115] = 0x3c50a; // ondragexit
HtmlAtomTable[0x117] = 0x9f04; // span
HtmlAtomTable[0x119] = 0x6d708; // manifest
HtmlAtomTable[0x11a] = 0x38708; // menuitem
HtmlAtomTable[0x11b] = 0x58b07; // content
HtmlAtomTable[0x11d] = 0x6c109; // onwaiting
HtmlAtomTable[0x11f] = 0x4c609; // onloadend
HtmlAtomTable[0x121] = 0x37e0d; // oncontextmenu
HtmlAtomTable[0x123] = 0x56d06; // onblur
HtmlAtomTable[0x124] = 0x3fc07; // article
HtmlAtomTable[0x125] = 0x9303; // dir
HtmlAtomTable[0x126] = 0xef04; // ping
HtmlAtomTable[0x127] = 0x24c08; // required
HtmlAtomTable[0x128] = 0x45509; // oninvalid
HtmlAtomTable[0x129] = 0xb105; // align
HtmlAtomTable[0x12b] = 0x58a04; // icon
HtmlAtomTable[0x12c] = 0x64d02; // h6
HtmlAtomTable[0x12d] = 0x1c404; // cols
HtmlAtomTable[0x12e] = 0x22e0a; // figcaption
HtmlAtomTable[0x12f] = 0x45e09; // onkeydown
HtmlAtomTable[0x130] = 0x66b08; // onsubmit
HtmlAtomTable[0x131] = 0x14d09; // oncanplay
HtmlAtomTable[0x132] = 0x70b03; // sup
HtmlAtomTable[0x133] = 0xc01; // p
HtmlAtomTable[0x135] = 0x40a09; // onemptied
HtmlAtomTable[0x136] = 0x39106; // oncopy
HtmlAtomTable[0x137] = 0x19c04; // cite
HtmlAtomTable[0x138] = 0x3a70a; // ondblclick
HtmlAtomTable[0x13a] = 0x50b0b; // onmousemove
HtmlAtomTable[0x13c] = 0x66d03; // sub
HtmlAtomTable[0x13d] = 0x48703; // rel
HtmlAtomTable[0x13e] = 0x5f08; // optgroup
HtmlAtomTable[0x142] = 0x9c07; // rowspan
HtmlAtomTable[0x143] = 0x37806; // source
HtmlAtomTable[0x144] = 0x21608; // noscript
HtmlAtomTable[0x145] = 0x1a304; // open
HtmlAtomTable[0x146] = 0x20403; // ins
HtmlAtomTable[0x147] = 0x2540d; // foreignObject
HtmlAtomTable[0x148] = 0x5ad0a; // onpopstate
HtmlAtomTable[0x14a] = 0x28d07; // enctype
HtmlAtomTable[0x14b] = 0x2760e; // onautocomplete
HtmlAtomTable[0x14c] = 0x35208; // textarea
HtmlAtomTable[0x14e] = 0x2780c; // autocomplete
HtmlAtomTable[0x14f] = 0x15702; // hr
HtmlAtomTable[0x150] = 0x1de08; // controls
HtmlAtomTable[0x151] = 0x10902; // id
HtmlAtomTable[0x153] = 0x2360c; // onafterprint
HtmlAtomTable[0x155] = 0x2610d; // foreignobject
HtmlAtomTable[0x156] = 0x32707; // marquee
HtmlAtomTable[0x157] = 0x59a07; // onpause
HtmlAtomTable[0x158] = 0x5e602; // dl
HtmlAtomTable[0x159] = 0x5206; // height
HtmlAtomTable[0x15a] = 0x34703; // min
HtmlAtomTable[0x15b] = 0x9307; // dirname
HtmlAtomTable[0x15c] = 0x1f209; // translate
HtmlAtomTable[0x15d] = 0x5604; // html
HtmlAtomTable[0x15e] = 0x34709; // minlength
HtmlAtomTable[0x15f] = 0x48607; // preload
HtmlAtomTable[0x160] = 0x71408; // template
HtmlAtomTable[0x161] = 0x3df0b; // ondragleave
HtmlAtomTable[0x162] = 0x3a02; // rb
HtmlAtomTable[0x164] = 0x5c003; // src
HtmlAtomTable[0x165] = 0x6dd06; // strong
HtmlAtomTable[0x167] = 0x7804; // samp
HtmlAtomTable[0x168] = 0x6f307; // address
HtmlAtomTable[0x169] = 0x55108; // ononline
HtmlAtomTable[0x16b] = 0x1310b; // placeholder
HtmlAtomTable[0x16c] = 0x2c406; // target
HtmlAtomTable[0x16d] = 0x20605; // small
HtmlAtomTable[0x16e] = 0x6ca07; // onwheel
HtmlAtomTable[0x16f] = 0x1c90a; // annotation
HtmlAtomTable[0x170] = 0x4740a; // spellcheck
HtmlAtomTable[0x171] = 0x7207; // details
HtmlAtomTable[0x172] = 0x10306; // canvas
HtmlAtomTable[0x173] = 0x12109; // autofocus
HtmlAtomTable[0x174] = 0xc05; // param
HtmlAtomTable[0x176] = 0x46308; // download
HtmlAtomTable[0x177] = 0x45203; // del
HtmlAtomTable[0x178] = 0x36c07; // onclose
HtmlAtomTable[0x179] = 0xb903; // kbd
HtmlAtomTable[0x17a] = 0x31906; // applet
HtmlAtomTable[0x17b] = 0x2e004; // href
HtmlAtomTable[0x17c] = 0x5f108; // onresize
HtmlAtomTable[0x17e] = 0x49d0c; // onloadeddata
HtmlAtomTable[0x180] = 0xcc02; // tr
HtmlAtomTable[0x181] = 0x2c00a; // formtarget
HtmlAtomTable[0x182] = 0x11005; // title
HtmlAtomTable[0x183] = 0x6ff05; // style
HtmlAtomTable[0x184] = 0xd206; // strike
HtmlAtomTable[0x185] = 0x59e06; // usemap
HtmlAtomTable[0x186] = 0x2fc06; // iframe
HtmlAtomTable[0x187] = 0x1004; // main
HtmlAtomTable[0x189] = 0x7b07; // picture
HtmlAtomTable[0x18c] = 0x31605; // ismap
HtmlAtomTable[0x18e] = 0x4a504; // data
HtmlAtomTable[0x18f] = 0x5905; // label
HtmlAtomTable[0x191] = 0x3d10e; // referrerpolicy
HtmlAtomTable[0x192] = 0x15602; // th
HtmlAtomTable[0x194] = 0x53606; // prompt
HtmlAtomTable[0x195] = 0x56807; // section
HtmlAtomTable[0x197] = 0x6d107; // optimum
HtmlAtomTable[0x198] = 0x2db04; // high
HtmlAtomTable[0x199] = 0x15c02; // h1
HtmlAtomTable[0x19a] = 0x65909; // onstalled
HtmlAtomTable[0x19b] = 0x16d03; // var
HtmlAtomTable[0x19c] = 0x4204; // time
HtmlAtomTable[0x19e] = 0x67402; // ms
HtmlAtomTable[0x19f] = 0x33106; // header
HtmlAtomTable[0x1a0] = 0x4da09; // onmessage
HtmlAtomTable[0x1a1] = 0x1a605; // nonce
HtmlAtomTable[0x1a2] = 0x26e0a; // formaction
HtmlAtomTable[0x1a3] = 0x22006; // center
HtmlAtomTable[0x1a4] = 0x3704; // nobr
HtmlAtomTable[0x1a5] = 0x59505; // table
HtmlAtomTable[0x1a6] = 0x4a907; // listing
HtmlAtomTable[0x1a7] = 0x18106; // legend
HtmlAtomTable[0x1a9] = 0x29b09; // challenge
HtmlAtomTable[0x1aa] = 0x24806; // figure
HtmlAtomTable[0x1ab] = 0xe605; // media
HtmlAtomTable[0x1ae] = 0xd904; // type
HtmlAtomTable[0x1af] = 0x3f04; // font
HtmlAtomTable[0x1b0] = 0x4da0e; // onmessageerror
HtmlAtomTable[0x1b1] = 0x37108; // seamless
HtmlAtomTable[0x1b2] = 0x8703; // dfn
HtmlAtomTable[0x1b3] = 0x5c705; // defer
HtmlAtomTable[0x1b4] = 0xc303; // low
HtmlAtomTable[0x1b5] = 0x19a03; // rtc
HtmlAtomTable[0x1b6] = 0x5230b; // onmouseover
HtmlAtomTable[0x1b7] = 0x2b20a; // novalidate
HtmlAtomTable[0x1b8] = 0x71c0a; // workertype
HtmlAtomTable[0x1ba] = 0x3cd07; // itemref
HtmlAtomTable[0x1bd] = 0x1; // a
HtmlAtomTable[0x1be] = 0x31803; // map
HtmlAtomTable[0x1bf] = 0x400c; // ontimeupdate
HtmlAtomTable[0x1c0] = 0x15e07; // bgsound
HtmlAtomTable[0x1c1] = 0x3206; // keygen
HtmlAtomTable[0x1c2] = 0x2705; // tbody
HtmlAtomTable[0x1c5] = 0x64406; // onshow
HtmlAtomTable[0x1c7] = 0x2501; // s
HtmlAtomTable[0x1c8] = 0x6607; // pattern
HtmlAtomTable[0x1cc] = 0x14d10; // oncanplaythrough
HtmlAtomTable[0x1ce] = 0x2d702; // dd
HtmlAtomTable[0x1cf] = 0x6f906; // srcset
HtmlAtomTable[0x1d0] = 0x17003; // big
HtmlAtomTable[0x1d2] = 0x65108; // sortable
HtmlAtomTable[0x1d3] = 0x48007; // onkeyup
HtmlAtomTable[0x1d5] = 0x5a406; // onplay
HtmlAtomTable[0x1d7] = 0x4b804; // meta
HtmlAtomTable[0x1d8] = 0x40306; // ondrop
HtmlAtomTable[0x1da] = 0x60008; // onscroll
HtmlAtomTable[0x1db] = 0x1fb0b; // crossorigin
HtmlAtomTable[0x1dc] = 0x5730a; // onpageshow
HtmlAtomTable[0x1dd] = 0x4; // abbr
HtmlAtomTable[0x1de] = 0x9202; // td
HtmlAtomTable[0x1df] = 0x58b0f; // contenteditable
HtmlAtomTable[0x1e0] = 0x27206; // action
HtmlAtomTable[0x1e1] = 0x1400b; // playsinline
HtmlAtomTable[0x1e2] = 0x43107; // onfocus
HtmlAtomTable[0x1e3] = 0x2e008; // hreflang
HtmlAtomTable[0x1e5] = 0x5160a; // onmouseout
HtmlAtomTable[0x1e6] = 0x5ea07; // onreset
HtmlAtomTable[0x1e7] = 0x13c08; // autoplay
HtmlAtomTable[0x1e8] = 0x63109; // onseeking
HtmlAtomTable[0x1ea] = 0x67506; // scoped
HtmlAtomTable[0x1ec] = 0x30a; // radiogroup
HtmlAtomTable[0x1ee] = 0x3800b; // contextmenu
HtmlAtomTable[0x1ef] = 0x52e09; // onmouseup
HtmlAtomTable[0x1f1] = 0x2ca06; // hgroup
HtmlAtomTable[0x1f2] = 0x2080f; // allowfullscreen
HtmlAtomTable[0x1f3] = 0x4be08; // tabindex
HtmlAtomTable[0x1f6] = 0x30f07; // isindex
HtmlAtomTable[0x1f7] = 0x1a0e; // ;ccept-charset
HtmlAtomTable[0x1f8] = 0x2ae0e; // formnovalidate
HtmlAtomTable[0x1fb] = 0x1c90e; // ;nnotation-xml
HtmlAtomTable[0x1fc] = 0x6e05; // embed
HtmlAtomTable[0x1fd] = 0x21806; // script
HtmlAtomTable[0x1fe] = 0xbb06; // dialog
HtmlAtomTable[0x1ff] = 0x1d707; // command

export function HtmlAtomFnv(hash: number, bytes: Bytes): number {
  for (const byte of bytes) {
    hash ^= byte;
    hash = Math.imul(hash, 16777619 >>> 0);
  }
  return hash;
}

export function HtmlAtomMatch(str: string, bytes: Bytes): boolean {
  for (let i = 0; i < bytes.length; i++) {
    if (str.charCodeAt(i) !== bytes[i]) {
      return false;
    }
  }
  return true;
}

export function HtmlAtomToString(atom: HtmlAtom): string {
  const start = atom >> 8;
  const n = atom & 0xff;
  return HtmlAtomText.slice(start, start + n);
}

export function HtmlAtomToStringAtom(atom: HtmlAtom): string {
  const start = atom >> 8;
  const n = atom & 0xff;
  if (start + n > HtmlAtomText.length) {
    return "";
  }
  return HtmlAtomText.slice(start, start + n);
}

export function HtmlAtomToStringBytes(bytes: Bytes): string {
  const atom = HtmlAtomLookup(bytes);
  if (atom !== 0) return HtmlAtomToStringAtom(atom);
  return new TextDecoder().decode(bytes);
}

export function HtmlAtomLookup(bytes: Uint8Array): HtmlAtom {
  if (bytes.length === 0 || bytes.length > HtmlAtomMaxLen) {
    return 0;
  }
  const h = HtmlAtomFnv(HtmlAtomHash0, bytes);
  let a = HtmlAtomTable[h & (HtmlAtomTable.length - 1)];
  if (
    (a & 0xff) === bytes.length && HtmlAtomMatch(HtmlAtomToString(a), bytes)
  ) {
    return a;
  }
  a = HtmlAtomTable[(h >> 16) & (HtmlAtomTable.length - 1)];
  if (
    (a & 0xff) === bytes.length && HtmlAtomMatch(HtmlAtomToString(a), bytes)
  ) {
    return a;
  }
  return 0;
}
