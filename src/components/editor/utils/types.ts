export interface CherryTypes {
    options: CherryOptions;
}

export interface CherryOptions {
    openai: any;
    /** Third-party dependencies */
    externals: CherryExternalsOptions;
    /** Engine configuration */
    engine: CherryEngineOptions;
    /** Edit zone configuration */
    editor: CherryEditorOptions;
    /** Toolbar area configuration */
    toolbars: CherryToolbarOptions;
    //Open the url of the draw.io editing page. If it is empty, the drawio button will be invalid.
    drawioIframeUrl: string;
    /** File upload callback */
    fileUpload: CherryFileUploadHandler;
    /** Used to specify the file type when uploading files */
    fileTypeLimitMap: {
        video: string,
        audio: string,
        image: string,
        word: string,
        pdf: string,
        file: string,
    };
    /** What themes are there */
    theme: { className: string, label: string }[];
    callback: {
        /** Triggered after the editor content changes and rendering is completed */
        afterChange: CherryLifecycle;
        /** Triggered after the editor completes the initial rendering */
        afterInit: CherryLifecycle;
        /** Triggered before img tag is mounted, can be used for lazy loading and other scenarios */
        beforeImageMounted: (srcProp: string, src: string) => { srcProp: string; src: string };
        onClickPreview: (e: MouseEvent) => void;
        onCopyCode: (e: ClipboardEvent, code: string) => string | false;
        changeString2Pinyin: (str: string) => string;
    };
    /** Preview area configuration */
    previewer: CherryPreviewerOptions;
    /** Whether to enable preview-only mode */
    isPreviewOnly: boolean;
    /** The preview area automatically scrolls following the editor cursor */
    autoScrollByCursor: boolean;
    /** Whether to force output to the body when the outer container does not exist */
    forceAppend: boolean;
    /** Mount DOM node ID, does not take effect in engine mode */
    id?: string;
    /** Mount DOM node, does not take effect in engine mode */
    el?: HTMLElement;
    /** Initial content, not valid in engine mode */
    value: string;
    instanceId?: string;
    /** Locale **/
    locale: string;
}

export interface CherryExternalsOptions {
    [key: string]: any;
}

/**
  * Custom syntax registration configuration
  */
export interface CustomSyntaxRegConfig {
    /** Grammar class */
    syntaxClass: any
    /** Execute before a certain hook, fill in hookName */
    before?: string;
    /** Execute after a certain hook, fill in hookName */
    after?: string;
    /** Forcibly overwrite the hook with the same name */
    force?: boolean;
}

export interface CherryEngineOptions {
    /** Global configuration of the engine */
    global?: {
        /**
         * Whether to enable classic line wrapping logic
         * true: One line break will be ignored, and two or more consecutive line breaks will be divided into paragraphs.
         * false: One line break will be converted into <br>, two consecutive line breaks will be divided into paragraphs, and three or more consecutive line breaks will be converted into <br> and divided into paragraphs.
         */
        classicBr?: boolean;
        /**
         * Global URL processor, the return value will be filled in the editing area
         * @param url source url
         * @param srcType source type
         */
        urlProcessor?: (url: string, srcType: 'image' | 'audio' | 'video' | 'autolink' | 'link') => string;
        /**
         * Additional html tags that allow rendering
         * Tags are separated by English vertical lines, such as: htmlWhiteList: 'iframe|script|style'
         * The default is empty. For the html that is allowed to be rendered by default, see the src/utils/sanitize.js whiteList attribute.
         * requires attention:
         * - After enabling tags such as iframe and script, xss injection will occur. Please judge whether you need to enable it based on the actual scenario.
         * - Scenarios where general editing permissions are controllable (such as api document systems) can allow iframe, script and other tags
         */
        htmlWhiteList?: string;
    };
    /** Built-in syntax configuration */
    syntax?: Record<string, Record<string, any> | false>;
    /** Custom syntax */
    customSyntax?: Record<string, CustomSyntaxRegConfig['syntaxClass'] | CustomSyntaxRegConfig>;
}

export type EditorMode =
    /** Edit only */
    | 'editOnly'
    /** Preview only */
    | 'previewOnly'
    /** Double column editing */
    | 'edit&preview';

export interface CherryEditorOptions {
    id?: string; // id attribute value of textarea
    name?: string; // The name attribute value of textarea
    autoSave2Textarea?: boolean; // Whether to automatically write the contents of the editing area back to the textarea
    /** depends on codemirror theme name: https://codemirror.net/demo/theme.htm */
    theme?: string;
    /** The height of the editor, the default is 100%. If the mount point has an inline set height, the inline style will be the main one */
    height?: string;
    /** Mode after editor initialization */
    defaultModel?: EditorMode;
    /** Whether to automatically convert html to markdown when pasting */
    convertWhenPaste?: boolean;
    /** Configuration items transparently passed to codemirror */
    codemirror?: object;
    /** Writing style, normal | typewriter | focus, default normal */
    writingStyle?: string;
}

export type CherryLifecycle = (text: string, html: string) => void;

export interface CherryPreviewerOptions {
    dom: HTMLDivElement | false;
    /** DOM className of preview area */
    className: string;
    enablePreviewerBubble: boolean;
    // Configure the logic of lazy loading of images
    lazyLoadImg: {
        // If you need to display the loading image when loading an image, configure the address of the loading image.
        loadingImgPath: string;
        // There can be at most several image requests at the same time, and a maximum of 6 images can be loaded at the same time.
        maxNumPerTime: 1 | 2 | 3 | 4 | 5 | 6,
        //The number of pictures that will not be lazy loaded. If it is 0, all pictures will be lazy loaded. If set to -1, all pictures will not be lazy loaded.
        noLoadImgNum: number,
        // Automatically load several pictures for the first time (regardless of whether the pictures are scrolled into the field of view), autoLoadImgNum = -1 means that all pictures will be loaded automatically
        autoLoadImgNum: -1 | number;
        // For pictures that fail to load or for which beforeLoadOneImgCallback returns false, try to load a few times at most. In order to prevent an infinite loop, the maximum number is 5 times. Use the src of the image as the latitude to count the number of retries
        maxTryTimesPerSrc: 0 | 1 | 2 | 3 | 4 | 5,
        //Callback function before loading an image. Function return false will terminate the loading operation.
        beforeLoadOneImgCallback: (img: HTMLImageElement) => void | boolean;
        //Callback function after failure to load an image
        failLoadOneImgCallback: (img: HTMLImageElement) => void;
        // Callback function after loading a picture. If the picture fails to load, this function will not be called back.
        afterLoadOneImgCallback: (img: HTMLImageElement) => void;
        //Callback function called after loading all images
        afterLoadAllImgCallback: () => void;
    };
}




export type CherryToolbarSeparator = '|';

export type CherryCustomToolbar = string;

export type CherryDefaultToolbar =
    | CherryInsertToolbar
    | CherryToolbarSeparator
    | 'bold'
    | 'italic'
    | 'strikethrough'
    | 'color'
    | 'header'
    | 'list'
    | 'image'
    | 'audio'
    | 'video'
    | 'link'
    | 'hr'
    | 'br'
    | 'code'
    | 'formula'
    | 'toc'
    | 'table'
    | 'pdf'
    | 'word'
    | 'graph'
    | 'settings';

export type CherryInsertToolbar = {
    insert: string[];
};

export type CherryDefaultBubbleToolbar =
    | CherryToolbarSeparator
    | 'bold'
    | 'italic'
    | 'strikethrough'
    | 'sub'
    | 'sup'
    | 'size'
    | 'color';

export type CherryDefaultFloatToolbar =
    | CherryToolbarSeparator
    | 'h1'
    | 'h2'
    | 'h3'
    | 'checklist'
    | 'quote'
    | 'quickTable'
    | 'code';

export interface CherryToolbarOptions {
    theme: 'light' | 'dark';
    toolbar?:
    | (CherryCustomToolbar | CherryDefaultBubbleToolbar | CherryDefaultBubbleToolbar | CherryDefaultToolbar)[]
    | false;
    toolbarRight?:
    | (CherryCustomToolbar | CherryDefaultBubbleToolbar | CherryDefaultBubbleToolbar | CherryDefaultToolbar)[]
    | false;
    /** 是否展示顶部工具栏 */
    showToolbar?: boolean;
    /** 侧边栏配置 */
    sidebar?: any[] | false;
    /** 选中悬停菜单配置 */
    bubble?: any[] | false;
    /** 新行悬停菜单配置 */
    float?: any[] | false;
    customMenu?: Record<string, any>;
    /** 自定义快捷键 */
    shortcutKey?: Object | false;
    /** 一些按钮的配置信息 */
    config?: Object;
}

export interface CherryFileUploadHandler {
    /**
     * @param file 用户上传的文件对象
     * @param callback 回调函数，接收最终的文件url
     */
    (file: File,
        /**
         * @param params.name 回填的alt信息
         * @param params.poster 封面图片地址（视频的场景下生效）
         * @param params.isBorder 是否有边框样式（图片场景下生效）
         * @param params.isShadow 是否有阴影样式（图片场景下生效）
         * @param params.isRadius 是否有圆角样式（图片场景下生效）
         * @param params.width 设置宽度，可以是像素、也可以是百分比（图片、视频场景下生效）
         * @param params.height 设置高度，可以是像素、也可以是百分比（图片、视频场景下生效）
         */
        callback: (url: string, params?: { name?: string, poster?: string, isBorder?: boolean, isShadow?: boolean, isRadius?: boolean; width?: string, height?: string }
        ) => void): void;
}
