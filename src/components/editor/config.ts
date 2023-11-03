import Cherry, { CherryOptions } from "cherry-markdown/dist/types/Cherry";

interface CherryMarkdownConfig {
  id: string;
  value: string;
  // Externals
  externals?: {
    // ...
  };

  // Engine configuration
  engine?: {
    // Global configuration
    global?: {
      // Enable classic new line logic
      classicBr?: boolean;

      // Global URL processor
      urlProcessor?: (
        url: string,
        srcType: "image" | "audio" | "video" | "autolink" | "link",
      ) => string;

      // Additional HTML tags that allow rendering
      htmlWhiteList?: string;
    };

    // Built-in syntax configuration
    syntax?: {
      // Syntax switch
      // 'hookName': false,

      // Syntax configuration
      // 'hookName': {
      //
      // }

      // Autolink
      autoLink?: {
        // Default open short link display
        enableShortLink?: boolean;

        // Default display 20 characters
        shortLinkLength?: number;
      };

      // List
      list?: {
        // The sibling list type becomes a child after conversion
        listNested?: boolean;

        // Default 2 space indents
        indentSpace?: number;
      };

      // Table
      table?: {
        // Enable chart
        enableChart?: boolean;

        // Chart render engine
        // chartRenderEngine?: EChartsTableEngine;

        // Externals
        // externals?: ['echarts'];
      };

      // Inline code
      inlineCode?: {
        // Theme
        theme?: string;
      };

      // Code block
      codeBlock?: {
        // Theme
        theme?: string;

        // Wrap the line if it exceeds the length
        wrap?: boolean;

        // Display line number
        lineNumber?: boolean;

        // Custom syntax renderer
        customRenderer?: {
          // ...
        };

        // Indented code block switch
        indentedCodeBlock?: boolean;
      };

      // Emoji
      emoji?: {
        // Render using Unicode
        useUnicode?: boolean;
      };

      // Font emphasis
      fontEmphasis?: {
        // Allow leading and trailing spaces
        allowWhitespace?: boolean;
      };

      // Strikethrough
      strikethrough?: {
        // Must there be a first space
        needWhitespace?: boolean;
      };

      // Math block
      mathBlock?: {
        // Engine
        engine?: "MathJax" | "katex";

        // Source code
        src?: string;

        // Load plugins by default
        plugins?: boolean;
      };

      // Inline math
      inlineMath?: {
        // Engine
        engine?: "MathJax" | "katex";

        // Source code
        src?: string;
      };

      // Table of contents
      toc?: {
        // Allow multiple directories by default
        allowMultiToc?: boolean;
      };

      // Header
      header?: {
        // Style of title
        // anchorStyle: 'default' | 'autonumber' | 'none'
        anchorStyle?: "default" | "autonumber" | "none";
      };
    };
  };

  // Editor configuration
  editor?: {
    codemirror?: {
      // CodeMirror theme name
      theme?: string;
    };

    // Height of the editor
    height?: string;

    // Default mode of the editor
    defaultModel?: "edit&preview" | "editOnly" | "previewOnly";

    // Automatically convert HTML to markdown when pasting
    convertWhenPaste?: boolean;
  };

  // Toolbar configuration
  toolbars?: {
    // Theme
    theme?: "light" | "dark";

    // Show toolbar
    showToolbar?: boolean;

    // Toolbar items
    toolbar?: Array<
      | string
      | {
          insert?: Array<string>;
        }
    >;

    // Sidebar items
    sidebar?: Array<string>;

    // Bubble items
    bubble?: Array<
      | "bold"
      | "italic"
      | "underline"
      | "strikethrough"
      | "sub"
      | "sup"
      | "quote"
      | "|"
      | "size"
      | "color"
    >;

    // Float items
    float?: Array<
      "h1" | "h2" | "h3" | "|" | "checklist" | "quote" | "quickTable" | "code"
    >;
  };

  // File upload callback
  fileUpload?: (file: File) => Promise<string>;

  callback?: {
    // Callback after change
    afterChange?: (value: string) => void;
    afterInit?: () => void;
    beforeImageMounted?: (image: HTMLImageElement) => void;
  };
  previewer?: {
    dom?: boolean;
    className?: string;
    // Whether to enable the editing ability of preview area (currently supports editing picture size and table content)
    enablePreviewerBubble?: boolean;
  };
  // The preview page does not need to bind events
  isPreviewOnly?: boolean;
  // The preview area automatically scrolls with the editor cursor
  autoScrollByCursor?: boolean;
  // Whether to force output to the body when the outer container does not exist
  forceAppend?: boolean;
  // The locale Cherry is going to use. Locales live in /src/locales/
  locale?: "zh_CN" | "en_US" | "ja_JP";
}

interface GetCherrymarkDownConfig {
  width: number;
}
export function getConfig({
  width,
}: GetCherrymarkDownConfig): CherryMarkdownConfig {
  return {
    id: "cherry-markdown",
    value: "",
    locale: "en_US",
    toolbars: {
      theme: "light",
    },

    editor: {
      codemirror: {
        theme: "dark",
      },
      height: "100%",

      // theme: "idea",

      // defaultModel The default mode of the editor after initialization. There are three modes: 1. Double column edit preview mode; 2. Pure editing mode; 3. Preview mode
      // edit&preview: Double column edit preview mode
      // editOnly: Pure editing mode (without preview, you can switch to double column or preview mode through toolbar)
      // previewOnly: Preview mode (there is no edit box, the toolbar only displays the "return to edit" button, which can be switched to edit mode through the toolbar)
      defaultModel: width > 850 ? "edit&preview" : "editOnly",
    },
  };
}

export function changeTheme(theme: string, cherry?: Cherry | null) {
  if (!cherry) return;
  const cherryDom = cherry.wrapperDom;
  const cherryPreviewDom = cherry.previewer.getDom();
  cherryDom.className = `${cherryDom.className.replace(
    / theme__[\S]+$/,
    "",
  )} theme__${theme}`;
  cherryPreviewDom.className = `${cherryPreviewDom.className.replace(
    / theme__[\S]+$/,
    "",
  )} theme__${theme}`;
}
