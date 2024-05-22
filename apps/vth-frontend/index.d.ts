declare module 'editoria11y/dist/editoria11y.min.js' {
  export interface Ed11yTheme {
    bg: string;
    bgHighlight: string;
    text: string;
    primary: string;
    primaryText: string;
    button: string;
    panelBar: string;
    panelBarText: string;
    panelBarShadow: string;
    panelBorder: string;
    activeTab: string;
    activeTabText: string;
    outlineWidth: string | number;
    borderRadius: string;
    ok: string;
    warning: string;
    alert: string;
    focusRing: string;
  }

  export interface Ed11yOptions {
    cssUrls?: boolean | string[];
    checkRoots?: boolean | string;
    shadowComponents?: boolean | string;
    ignoreElements?: boolean | string;
    ignoreByKey?: { [key: string]: string };
    alertMode?: 'polite' | 'assertive' | 'headless';
    currentPage?: boolean | string;
    allowHide?: boolean;
    allowOK?: boolean;
    syncedDismissals?: boolean | Record<string, unknown>;
    showDismissed?: boolean;
    ignoreAllIfAbsent?: boolean | string;
    ignoreAllIfPresent?: boolean | string;
    preventCheckingIfPresent?: boolean | string;
    preventCheckingIfAbsent?: boolean | string;
    linkIgnoreStrings?: boolean | string;
    linkIgnoreSelector?: boolean | string;
    checkVisible?: boolean;
    hiddenHandlers?: string;
    lang?: string;
    theme?: 'sleekTheme' | 'darkTheme' | 'lightTheme';
    sleekTheme?: Ed11yTheme;
    darkTheme?: Ed11yTheme;
    lightTheme?: Ed11yTheme;
    buttonZIndex?: number;
    baseFontSize?: string;
    baseFontFamily?: string;
    embeddedContent?: boolean;
    embeddedContentTitle?: string;
    embeddedContentMessage?: string;
    videoContent?: string;
    audioContent?: string;
    dataVizContent?: string;
    twitterContent?: string;
    documentLinks?: string;
    linksUrls?: boolean;
    linksMeaningless?: boolean;
    altPlaceholder?: boolean;
    customTests?: number;
  }

  export class Ed11y {
    // eslint-disable-next-line no-unused-vars
    constructor(options: Ed11yOptions);
    // TODO Add other methods and properties as needed
  }

  export default Ed11y;
}
