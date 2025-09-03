const ed11yLang = {

  // ESLint config:
  /* global Ed11y */
  /* exported ed11yLang */

  en: {

    // Main Panel =========================================
    toggleAccessibilityTools: 'Toggle accessibility tools',
    toggleDisabled: 'No content available for Editoria11y to check.',
    panelCount0: 'No issues detected.',
    panelCountAllDismissed: 'All issues hidden.',
    panelCount1: 'One issue detected.',
    panelCountMultiple: ' issues detected.',
    panelCountBase: '<span class=\'count\'>No</span> <span class=\'content-type\'>issues detected</span>.',
    panelControls: 'Editorially',
    buttonToolsContent: 'Check headings & alt text', // todo Drupal
    buttonToolsActive: 'Hide headings & alt text',
    buttonOutlineContent: 'Headings',
    buttonAltsContent: 'Alt Text',
    buttonFirstContent: 'Go to first alert',
    buttonNextContent: 'Go to next alert',
    buttonPrevContent: 'Go to previous alert',
    buttonShowHiddenAlert: 'Show hidden alert',
    buttonHideHiddenAlert: 'Hide hidden alert',
    buttonShowHiddenAlerts: (count) => `Show ${count} hidden alerts`,
    buttonHideHiddenAlerts: (count) => `Hide ${count} hidden alerts`,
    buttonShowAlerts: 'Show accessibility alerts',
    buttonShowNoAlert: 'Show accessibility checker',
    buttonHideChecker: 'Hide accessibility checker',
    buttonHideAlerts: 'Hide accessibility alerts',
    panelCheckOutline: '<p class="ed11y-small">This shows the <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opens in new tab">heading outline</a>. Check that it matches how the content is organized visually.</p>',
    panelCheckAltText: '<p class="ed11y-small">Check that each image <a href="https://www.w3.org/WAI/tutorials/images/informative/" target="_blank" title="Opens in new tab">describes what it means in context</a>, and that there are no images of text.</p>',
    noImagesFound: 'No images found.',
    altLabelPrefix: 'Alt text: ',
    errorAltMissing: '(missing!)',
    errorAltNull: '(none; image marked as decorative)',
    errorOutlinePrefixSkippedLevel: '(flagged for skipped level) ',
    errorOutlinePrefixHeadingEmpty: '(empty heading) ',
    errorOutlinePrefixHeadingIsLong: '(flagged for length) ',

    // Errors and alerts ==================================

    consoleNotSupported: 'This browser can not run Editoria11y.',
    jumpedToInvisibleTip: 'Note: this content may not be visible. Look for it inside the outlined container.',
    jumpedToAriaHiddenTip: 'The item with this issue may be invisible or off screen.',

    // Strings used in tests ==============================

    suspiciousWords: ['image of', 'graphic of', 'picture of', 'photo of', 'photograph of', 'placeholder', 'spacer', 'tbd', 'todo', 'copyright', 'courtesy of', 'photo by'],
    meaninglessAlt: ['alt', 'chart', 'decorative', 'image', 'graphic', 'photo', 'placeholder', 'placeholder image', 'spacer', 'tbd', 'todo', 'to do'],
    badEndingForAlt: ['photo', 'image', 'photograph', 'picture'],
    linksUrls: ['http:/', 'https:/', '.asp', '.htm', '.php', '.edu/', '.com/'],
    linksMeaningless: /(learn|to|more|now|this|page|link|site|website|check|out|view|our|read|download|form|here|click|"|'|\?|\.|-|,|:|>|<|\s)+/g,
    linkStringsNewWindows: /window|\stab|download/g,

    // Tooltips ======================================

    toggleManualCheck: 'manual check needed',
    toggleAlert: 'alert',
    issue: 'Issue',
    toggleAriaLabel: (label) => `Accessibility ${label}`,
    transferFocus: 'Edit this content',
    dismissOkButtonContent: 'Mark as OK',
    dismissHideButtonContent: 'Mark as ignored',
    dismissActions: (count) => `${count} similar issues`, // 2.3.10
    dismissHideAllButton: 'Ignore all like this', // 2.3.10
    dismissOkAllButton: 'Mark all like this as OK', // 2.3.10
    dismissOkTitle: 'Hides this alert for all editors',
    dismissHideTitle: 'Hides this alert for you',
    undismissOKButton: 'Restore this alert marked as OK',
    undismissHideButton: 'Restore this hidden alert',
    undismissNotePermissions: 'This alert has been hidden by an administrator',
    reportsLink: 'Open site reports in new tab',
    closeTip: 'Close',
    panelHelpTitle: 'About this tool',
    panelHelp: `
    <p><a href="https://editoria11y.princeton.edu/">Editoria11y</a> checks for common accessibility needs, such as image alternative text, meaningful heading outlines and well-named links.</p>
    <p>Many alerts are "manual checks." Manual checks can be dismissed:</p>
    <ul>
        <li>"Mark as checked and OK" hides the alert for all editors.</li>
        <li>"Ignore this manual check" leaves the tip visible to other editors.</li>
    </ul>
    <p>Dismissed alerts can be found via the "Show hidden alerts" toggle.</p>
    <p>If an incorrect alert is appearing on many pages, site administrators can tell the checker to ignore particular elements and page regions.</p>
    <p>And remember that automated checkers cannot replace <a href='https://webaim.org/resources/evalquickref/'> proofreading and testing for accessibility</a>.</p>
    <p><br><a href='https://github.com/itmaybejj/editoria11y/issues' class='ed11y-small'>Report bugs & request changes <span aria-hidden="true">&raquo;</span></a></p>
    `,

    // Tooltips for heading tests =========================

    headingExample: `
        <ul>
            <li>Heading level 1
                <ul>
                    <li>Heading level 2: a topic
                        <ul><li>Heading level 3: a subtopic</li></ul></li>
                    <li>Heading level 2: a new topic</li>
                </ul>
            </li>
        </ul>`,

    // todo: update Drupal localization file.
    headingLevelSkipped: {
      title: 'Manual check: was a heading level skipped?',
      tip: (prevLevel, level) =>
        `<p>Headings and subheadings create a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opens in new tab">navigable table of contents</a> for assistive devices. The numbers indicate indents in a nesting relationship:</p>
            ${Ed11y.M.headingExample}
            <p>This heading skipped from level ${prevLevel} to level ${level}. From a screen reader, this sounds like content is missing.</p>
            <p><strong>To fix:</strong> adjust levels to form an accurate outline, without gaps.</p>
            `,
    },

    headingEmpty: {
      title: 'Heading tag without any text',
      tip: () =>
        `<p>Headings and subheadings create a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opens in new tab">navigable table of contents</a> for assistive devices. The numbers indicate indents in a nesting relationship:</p>
            ${Ed11y.M.headingExample}
            <p>Empty headings create confusing gaps in this outline: they could mean the following content is still part of the previous section, or that the text was unpronounceable for some reason.</p>
            <p><strong>To fix:</strong> add text to this heading, or delete this empty line.</p>
            `,
    },

    headingIsLong: {
      title: 'Manual check: long heading',
      tip: () =>
        `<p>Headings should be brief and clear. Assistive devices use them as a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opens in new tab">navigable table of contents</a> for the page. The numbers indicate indents in a nesting relationship:</p>  
            ${Ed11y.M.headingExample}
            <p><strong>To fix:</strong> shorten this heading if possible, or remove the heading style if it was only applied to this text to provide visual emphasis.</p>
            `,
    },

    blockquoteIsShort: {
      title: 'Manual check: is this a blockquote?',
      tip: () =>
        '<p>Blockquote formatting tells screen readers that the text should be announced as a quotation. This was flagged because short blockquotes are <em>sometimes</em> actually <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opens in new tab">headings</a>. If this is a heading and not a quotation, use heading formatting instead, so this appears in the page outline.</p>',
    },

    // Tooltips for image tests =========================

    altAttributeExample:
      `<p>Note that a <a href="https://www.w3.org/WAI/tutorials/images/informative" target="_blank" title="Opens in new tab">good alt describes the image's message</a>, not simply what it contains. Depending on the context, the alt for the picture of a child kicking a ball might emphasize the setting, the child, the kick or the ball:</p>
            <ul>
                <li>The sunny spring day brought kids to the park for some soccer.</li>
                <li>A.J. wearing the new team uniform.</li>
                <li>The game-winning kick curved in from the left sideline!</li>
                <li>The size 4 ball is the right size for this 9-year-old child.</li>
            </ul>`,

    altMissing: {
      title: 'Image has no alternative text attribute',
      tip: () =>
        `<p>When screen readers encounter an image with no alt attribute at all, they dictate the url of the image file instead, often one letter at a time.</p>
            <p><strong>To fix:</strong> either add an empty alt (alt="") to indicate this image should be ignored by screen readers, or add descriptive alt text.</p>
            ${Ed11y.M.altAttributeExample}`,
    },

    altNull: {
      title: 'Manual check: image has no alt text',
      tip: () =>
        `<p>Unless this image is purely decorative (a spacer icon or background texture), an alt should probably be provided. Photos in page content <strong>almost always need alt text.</strong> Since many screen reader users can see there is an image present, it can be very confusing to move the cursor across the place on the page where an image is visible, but hear nothing.</p>
        ${Ed11y.M.altAttributeExample}`,
    },

    altURL: {
      title: 'Image\'s text alternative is a URL',
      tip: (alt) =>
        `This image's alt text is "${alt}," which probably describes the file name, not the contents of the image.
        <p><strong>To fix:</strong> set this image's alternative text to a concise description of what this image means in this context.</p>
        ${Ed11y.M.altAttributeExample}`
      ,
    },
    altMeaningless: {
      title: 'Alt text is meaningless',
      tip: (alt) =>
        `<p>This image's alt text is "${alt}," which was flagged for being common placeholder text.</p>
        <p><strong>To fix:</strong> set this image's alternative text to a concise description of what this image means in this context.</p>
        ${Ed11y.M.altAttributeExample}`
      ,
    },
    altMeaninglessLinked: {
      title: 'Linked alt text is meaningless',
      tip: (alt) =>
        `<p>When a link includes an image, <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" target="_blank" title="opens in new tab">the image's alt text becomes the link text</a> announced by screen readers.
            Links should clearly and concisely describe their destination, even out of context.</p>
           <p>This image's alt text is "${alt}," which probably does not describe this link.</p>`
      ,
    },

    altURLLinked: {
      title: 'Linked image\'s text alternative is a URL',
      tip: (alt) =>
        `<p>This image's alt text is "${alt}," which is probably a filename.</p>
        <p>When a link is wrapped around an image and there is no other text, the <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" target="_blank" title="Opens in new tab">image's alt text becomes the link text</a> announced by screen readers.
            Links should clearly and concisely describe their destination; a URL (usually pronounced by the screen reader one letter at a time) does not.</p>
            <ul>
                <li>Good link text: "About us"</li>
                <li>Bad link text: "H T T P S colon forward slash forward slash example dot com forward slash aye bee oh you tee you ess</li>
            </ul>`,
    },

    altImageOf: {
      title: 'Manual check: possibly redundant text in alt',
      tip: (alt) =>
        `<p>This image's alt text is "${alt}," which mentions that this image is an image.</p>
        <p>Screen readers announce they are describing an image when reading alt text, so 
            phrases like "image of" and "photo of" are usually redundant in alt text; the screen reader user hears "image: image of something."</p>
            <p>Note that this is OK if the format is referring to the <strong>content</strong> of the image:</p>
            <ul><li>Format is redundant: "<em>photo of</em> a VHS tape"</li>
            <li>Format is relevant: "<em>photo of</em> a VHS tape in a photo album being discussed in a history class"</li></ul>`
    },
    altImageOfLinked: {
      title: 'Manual check: possibly redundant text in linked image',
      tip: (alt) =>
        `<p>This image's alt text is "${alt}," which mentions that this image is an image.</p>
        <hr><p>Links should clearly and concisely describe their destination. Since words like "image," "graphic" or "photo" are already redundant in text alternatives (screen readers already identify the image as an image), their presence in a linked image usually means the image's text alternative is <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" title="Opens in new tab" target="_blank">describing the image instead of the link</a>.</p>
            <ul>
                <li>Good link text: "About us"</li>
                <li>Bad link text: "Image of five people jumping"</li>
            </ul>`
    },

    altDeadspace: {
      title: 'Image\'s text alternative is unpronounceable',
      tip: (alt) =>
        `<p>This image's alt text is "${alt}," which only contains unpronounceable symbols and/or spaces. Screen readers will announce that an image is present, and then pause awkwardly: "image: ____."</p>
        <p><strong>To fix:</strong> add a descriptive alt, or provide a <em>completely</em> empty alt (alt="") if this is just an icon or spacer, and screen readers should ignore it.</p>
            ${Ed11y.M.altAttributeExample}`,
    },

    altEmptyLinked: {
      title: 'Linked Image has no alt text',
      tip: () =>
        `<p>When a link is wrapped around an image, the image's alt text <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" title="Opens in new tab" target="_blank">provides the link's title for screen readers</a>.</p>
        <p><strong>To fix:</strong> set this image's alternative text to something that describes the link's destination, or add text next to the image, within the link.</p>`,
    },

    altLong: {
      title: 'Manual check: very long alternative text',
      tip: (alt) =>
        `<p>Image text alternatives are announced by screen readers as a single run-on sentence; listeners must listen to the entire alt a second time if they miss something. If this cannot be reworded to something succinct, it is better to use the alt to reference a <em>visible</em> <a href="https://www.w3.org/WAI/tutorials/images/complex/" title="Opens in new tab" target="_blank">text alternative for complex images</a>. For example:</p>
            <ul><li>"Event poster; details follow in caption"</li>
            <li>"Chart showing our issues going to zero; details follow in table"</li></ul>
            This image's alt text is: <em>${alt}</em>
            `,
    },

    altLongLinked: {
      title: 'Manual check: very long alternative text in linked image',
      tip: (alt) =>
        `<p><a href="https://webaim.org/techniques/hypertext/link_text#alt_link" title="Opens in new tab" target="_blank">The alt text on a linked image is used to describe the link destination</a>. Links should be brief, clear and concise, as screen reader users often listen to the list of links on the page to find content of interest. Long alternative text inside a link often indicates that the image's text alternative is describing the image instead rather than the link.</p>
        This image's alt text is: <em>${alt}</em>`,
    },

    altPartOfLinkWithText: {
      title: 'Manual check: link contains both text and an image',
      tip: (alt) =>
        `<p>Screen readers will <a href="https://www.w3.org/WAI/tutorials/images/functional/" title="Opens in new tab" target="_blank">include the image's alt text when describing this link</a>.</p>
            <p>Check that the combined text is concise and meaningful:<br>"<em><strong>${alt}</strong></em>"</p>
            <p></p>
            <ul>
                <li>Keep alts that add relevant meaning:<br>"Buy (A Tigers v. Falcons ticket)."</li>
                <li>Edit unhelpful or irrelevant alts:<br>"Buy (A piece of paper with team logos on it)."</li>
                <li>Remove unnecessary alts:<br>"Buy Tigers v. Falcons tickets (A Tigers v. Falcons ticket)."</li>
            </ul>
        `, // 2.3.10.
    },

    linkNoTextExample: '<p>Screen readers will either say nothing when they reach this link: <br><em>"Link, [...awkward pause where the link title should be...],"</em><br>or read the URL: <br><em>"Link, H-T-T-P-S forward-slash forward-slash example dot com"</em></p>',
    linkTextIgnored: (ignoredText) => `
    <p>Screen readers will only read the text of the link type indicator on this link:<br>
    <em>"<strong>${ignoredText}</strong>"</em></p>
    `,

    linkNoText: {
      title: 'Link with no accessible text',
      tip: (ignoredText) =>
        `<p>This link is either a typo (a linked space character), or a linked image with no text alternative.</p>
        ${ignoredText ? Ed11y.M.linkTextIgnored(ignoredText) : Ed11y.M.linkNoTextExample}
        <p><strong>To fix:</strong></p>
        <ul><li>If this a typo, delete it. Note that typo links can be hard to see if they are next to a "real" link: one will be on the text, one on a space.</li><li>If it is a real link, add text to describe where it goes.</li>`,
    },

    linkTextIsURL: {
      title: 'Manual check: is this link text a URL?',
      tip: (text) =>
        `<p>This link's text is:<br> <strong>${text}</strong></p>
        <p><a href="https://webaim.org/techniques/hypertext/link_text" title="Opens in new tab" target="_blank">Links should be meaningful and concise</a>. Readers often skim by link titles. This is especially true of screen reader users, who navigate using a list of on-page links.</p>
         <p>A linked URL breaks this pattern; the reader has to read the preceding paragraph to figure out the link's purpose from context.</p>
            <ul>
                <li>Meaningful and concise link: "Tips for writing meaningful links"</li>
                <li>Linked URL, as pronounced by a screen reader: "H T T P S colon forward-slash forward-slash example dot com forward-slash tips forward-slash meaningful-links"</li>
            </ul>`,
    },

    linkTextIsGeneric: {
      title: 'Manual check: is this link meaningful and concise?',
      tip: (text) =>
        `<p>This link's text is: <strong>${text}</strong></p>
        <p>Readers skim for links. This is especially true of screen reader users, who navigate using a list of on-page links.</p>
                <p>Generic links like "click here," "read more" or "download" expect the reader be reading slowly and carefully enough to figure out each link's purpose from context. Few readers do this, so click-through rates on meaningless links are extremely poor.</p>
                <ul>
                <li>Ideal: "Learn about <a href="https://webaim.org/techniques/hypertext/link_text" title="Opens in new tab" target="_blank">meaningful links"</a></strong></li>
                <li>Not meaningful: "Click <a href="https://webaim.org/techniques/hypertext/link_text" title="Opens in new tab" target="_blank">here</a> to learn about meaningful links."</li>
                <li>Not concise: "<a href="https://webaim.org/techniques/hypertext/link_text" title="Opens in new tab" target="_blank">Click here to learn more about meaningful links</a>"</li>
                </ul>
                `
      ,
    },

    linkDocument: {
      title: 'Manual check: is the linked document accessible?',
      tip: () =>
        `<p>Many mobile and assistive device users struggle to read content in PDFs. PDFs generally do not allow for changing font sizes, and often contain features that are incompatible with screen readers.</p>
        <p>Ideally make the content of this linked PDF available on a Web page or in an editable document, and only link to this PDF as a "printable" alternative. If this PDF is the only way you are providing to access this content, you will need to <a href='https://webaim.org/techniques/acrobat/' target='_blank' title="Opens in new tab">manually check that the PDF is well-structured</a>, with headings, lists and table headers, and provides alt text for its images.</p>`,
    },

    linkNewWindow: {
      title: 'Manual check: is opening a new window expected?',
      tip: () =>
        `<p>Readers can always choose to open a link a new window. When a link forces open a new window, it can be confusing and annoying, especially for assistive device users who may wonder why their browser's "back" button is suddenly disabled.</p>
                <p>There are two general exceptions:</p>
                <ul>
                    <li>When the user is filling out a form, and opening a link in the same window would cause them to lose their work.</li>
                    <li>When the user is clearly warned a link will open a new window.</li>
                </ul>
                <p><strong>To fix:</strong> set this link back its default target, or add a screen-reader accessible warning (text or an icon with alt text).</p>
                `
      ,
    },

    // Tooltips for Text QA ===============================

    tableNoHeaderCells: {
      title: 'Table has no header cells',
      tip: () => `
                <p>To fix:</p>
                <ul><li>If this table contains data that is meaningfully organized by row and column, edit the table's properties and specify whether headers have been placed in the first row, column or both. This lets screen reader users hear the headers repeated while navigating the content.</li>
                <li>If this table does not contain rows and columns of data, but is instead being used for visual layout, remove it. Tables overflow the page rather than reflowing on mobile devices, and should only be used when the horizontal relationships are necessary to understand the content.</li></ul>
            `,
    },

    tableContainsContentHeading: {
      title: 'Content heading inside a table',
      tip: () =>
        `<p>To fix: remove heading formatting. Use row and column headers instead.</p>
        <p>Content headings ("Heading 1", "Heading 2") form a navigable table of contents for screen reader users,  
        labelling all content <strong>until the next heading</strong>. Table headers label specific columns or rows within a table.</p> 
            <p></p>
            <table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">To illustrate: a <strong>table</strong> header in cell 2 would only label its column: cell B. <br><br>
            A <strong>content</strong> heading in cell 2 would label all subsequent text, reading from left to right: cells 3, A, B and C, as well as this text!</td></tr>
            <tr><td>A</td><td>B</td><td>C</td></table>
            `
    },

    tableEmptyHeaderCell: {
      title: 'Empty table header cell',
      tip: () => `
                <p>When exploring tables, screen readers repeat table header cells as needed to orient users. 
                Without headers, it is very easy to get lost; screen reader users have to count columns and rows and try to remember which columns went with which rows.</p>
                <p><strong>To fix:</strong> make sure each header cell in this table contains text.</p>
            `,
    },

    textPossibleList: {
      title: 'Manual check: should this have list formatting?',
      tip: (text) =>
        `<p>List formatting is structural:</p> 
            <ol><li>List formatting indents and reflows on overflow. Text aligns vertically with the line above it.</li>
            <li>Lists are machine-readable. Screen readers can orient their users, announcing this as "list item, 2 of 3."</li></ol>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;3. But this third item is just a sentence with a number in front of it. It wraps incorrectly, and screen readers do not know it is related to the other items in the list.</p>
            <p><strong>To fix:</strong> if this "${text}" is part of a list, replace it with list formatting.</p>
            `,
    },

    textPossibleHeading: {
      title: 'Manual check: should this be a heading?',
      tip: () =>
        `<p>If this all-bold line of text is functioning as a heading for the following text rather than a visual emphasis, replace the bold formatting with the appropriately numbered heading. Otherwise, dismiss this alert.</p>
        <p>Headings and subheadings create a <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" title="Opens in new tab" target="_blank">navigable table of contents</a> for assistive devices. The heading's <strong><em>number</em></strong> indicates its <strong><em>depth</em></strong> in the page outline; e.g.:</p>
            ${Ed11y.M.headingExample}
            
            `,
    },

    textUppercase: {
      title: 'Manual check: is this uppercase text needed?',
      tip: () =>
        `<p>UPPERCASE TEXT CAN BE MORE DIFFICULT TO READ FOR MANY PEOPLE, AND IS OFTEN INTERPRETED AS SHOUTING.</p>
         <p>Consider using sentence case instead, and using bold text or font changes for visual emphasis, or structural formatting like headings for emphasis that will also be announced by screen readers.</p>`,
    },

    embedVideo: {
      title: 'Manual check: is this video accurately captioned?',
      tip: () =>
        `<p>If a recorded video contains speech or meaningful sounds, it must <a href="https://www.w3.org/WAI/media/av/captions/" title="Opens in new window" target="_blank">provide captions</a>.</p>
            <p>Note that automatic, machine-generated captions must be proofread, and speaker identifications must be added, before being considered an equal alternative.</p>`,
    },

    embedAudio: {
      title: 'Manual check: is an accurate transcript provided?',
      tip: () =>
        `<p>If this audio contains speech, a <a href="https://www.w3.org/WAI/media/av/transcribing/" target="_blank" title="Opens in new window">text alternative</a> must be provided on this page or linked.</p>
            <p>Note that automatic, machine-generated transcripts must be proofread, and speaker identifications must be added, before being considered an equal alternative</p>`,
    },

    embedVisualization: {
      title: 'Manual check: is this visualization accessible?',
      tip: () =>
        `<p>Visualization widgets are often difficult or impossible for assistive devices to operate, and can be difficult to understand for readers with low vision or colorblindness.</p>
            <p>Unless this particular widget has high visual contrast, can be operated by a keyboard and described by a screen reader, assume that an alternate format (text description, data table or downloadable spreadsheet) should also be provided.</p>`,
    },

    embedTwitter: {
      title: 'Manual check: is this embed a keyboard trap?',
      tip: () =>
        `<p>If embedded feeds are set to show a high number of items, keyboard users may have to click the tab key dozens or hundreds of times to exit the component.</p>
            <p>Check to make sure only a small number of items auto-load immediately or while scrolling. Having additional items load on request ("show more") is fine.</p>`,
    },

    embedCustom: {
      title: 'Manual check: is this embedded content accessible?',
      tip: () =>
        '<p>Please make sure images inside this embed have alt text, videos have captions, and interactive components can be <a href=\'https://webaim.org/techniques/keyboard/\'>operated by a keyboard</a>.</p>',
    }

  },
  nl: {
    toggleAccessibilityTools: 'Toggle toegankelijkheidstools',
    toggleDisabled: 'Geen inhoud beschikbaar voor Editoria11y om te controleren.',
    panelCount0: 'Geen problemen gedetecteerd.',
    panelCountAllDismissed: 'Alle problemen verborgen.',
    panelCount1: 'Eén probleem gedetecteerd.',
    panelCountMultiple: ' problemen gedetecteerd.',
    panelCountBase: '<span class="count">Geen</span> <span class="content-type">problemen gedetecteerd</span>.',
    panelControls: 'Editoria11y',
    buttonToolsContent: 'Controleer koppen & alt-tekst',
    buttonToolsActive: 'Verberg koppen & alt-tekst',
    buttonOutlineContent: 'Koppen',
    buttonAltsContent: 'Alt-tekst',
    buttonFirstContent: 'Ga naar eerste waarschuwing',
    buttonNextContent: 'Ga naar volgende waarschuwing',
    buttonPrevContent: 'Ga naar vorige waarschuwing',
    buttonShowHiddenAlert: 'Toon verborgen waarschuwing',
    buttonHideHiddenAlert: 'Verberg verborgen waarschuwing',
    buttonShowHiddenAlerts: (count) => `Toon ${count} verborgen waarschuwingen`,
    buttonHideHiddenAlerts: (count) => `Verberg ${count} verborgen waarschuwingen`,
    buttonShowAlerts: 'Toon toegankelijkheidswaarschuwingen',
    buttonShowNoAlert: 'Toon toegankelijkheidscontrole',
    buttonHideChecker: 'Verberg toegankelijkheidscontrole',
    buttonHideAlerts: 'Verberg toegankelijkheidswaarschuwingen',
    panelCheckOutline: '<p class="ed11y-small">Dit toont de <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opent in nieuw tabblad">koppenstructuur</a>. Controleer of deze overeenkomt met hoe de inhoud visueel is georganiseerd.</p>',
    panelCheckAltText: '<p class="ed11y-small">Controleer of elke afbeelding <a href="https://www.w3.org/WAI/tutorials/images/informative/" target="_blank" title="Opent in nieuw tabblad">beschrijft wat het betekent in context</a>, en dat er geen afbeeldingen van tekst zijn.</p>',
    noImagesFound: 'Geen afbeeldingen gevonden.',
    altLabelPrefix: 'Alt-tekst: ',
    errorAltMissing: '(ontbreekt!)',
    errorAltNull: '(geen; afbeelding gemarkeerd als decoratief)',
    errorOutlinePrefixSkippedLevel: '(gemarkeerd voor overgeslagen niveau) ',
    errorOutlinePrefixHeadingEmpty: '(lege kop) ',
    errorOutlinePrefixHeadingIsLong: '(gemarkeerd voor lengte) ',
    consoleNotSupported: 'Deze browser kan Editoria11y niet uitvoeren.',
    jumpedToInvisibleTip: 'Let op: deze inhoud is mogelijk niet zichtbaar. Zoek ernaar in de omlijste container.',
    jumpedToAriaHiddenTip: 'Het item met dit probleem is mogelijk onzichtbaar of buiten het scherm.',
    suspiciousWords: ['afbeelding van', 'beeld van', 'tekening van', 'foto van', 'fotografie van', 'plaatshouder', 'spacer', 'tbd', 'todo', 'copyright', 'met dank aan', 'foto door'],
    meaninglessAlt: ['alt', 'grafiek', 'decoratief', 'afbeelding', 'beeld', 'foto', 'plaatshouder', 'plaatshouder afbeelding', 'spacer', 'tbd', 'todo', 'te doen'],
    badEndingForAlt: ['foto', 'afbeelding', 'fotografie', 'plaatje'],
    linksUrls: ['http:/', 'https:/', '.asp', '.htm', '.php', '.edu/', '.com/', '.nl/'],
    linksMeaningless: /(leer|meer|klik|hier|op|deze|link|nu|pagina|site|website|bekijk|onze|lees|download|formulier|hier|klik|"|'|\?|\.|-|,|:|>|<|\s)+/g,
    linkStringsNewWindows: /venster|\stabblad|download/g,
    toggleManualCheck: 'handmatige controle nodig',
    toggleAlert: 'waarschuwing',
    issue: 'Probleem',
    toggleAriaLabel: (label) => `Toegankelijkheid ${label}`,
    transferFocus: 'Bewerk deze inhoud',
    dismissOkButtonContent: 'Markeer als OK',
    dismissHideButtonContent: 'Markeer als genegeerd',
    dismissActions: (count) => `${count} vergelijkbare problemen`,
    dismissHideAllButton: 'Negeer alle zoals deze',
    dismissOkAllButton: 'Markeer alle zoals deze als OK',
    dismissOkTitle: 'Verbergt deze waarschuwing voor alle editors',
    dismissHideTitle: 'Verbergt deze waarschuwing voor u',
    undismissOKButton: 'Herstel deze als OK gemarkeerde waarschuwing',
    undismissHideButton: 'Herstel deze verborgen waarschuwing',
    undismissNotePermissions: 'Deze waarschuwing is verborgen door een beheerder',
    reportsLink: 'Open site rapporten in nieuw tabblad',
    closeTip: 'Sluiten',
    panelHelpTitle: 'Over deze tool',
    panelHelp: `
    <p><a href="https://editoria11y.princeton.edu/">Editoria11y</a> controleert op algemene toegankelijkheidsbehoeften, zoals alternatieve tekst voor afbeeldingen, betekenisvolle koppenstructuren en goed benoemde links.</p>
    <p>Veel waarschuwingen zijn "handmatige controles." Handmatige controles kunnen worden weggenomen:</p>
    <ul>
        <li>"Markeer als gecontroleerd en OK" verbergt de waarschuwing voor alle editors.</li>
        <li>"Negeer deze handmatige controle" laat de tip zichtbaar voor andere editors.</li>
    </ul>
    <p>Weggenomen waarschuwingen kunnen worden gevonden via de "Toon verborgen waarschuwingen" schakelaar.</p>
    <p>Als een onjuiste waarschuwing op veel pagina's verschijnt, kunnen sitebeheerders de checker vertellen om bepaalde elementen en paginaregio's te negeren.</p>
    <p>En onthoud dat geautomatiseerde checkers <a href='https://webaim.org/resources/evalquickref/'>proeflezen en testen op toegankelijkheid</a> niet kunnen vervangen.</p>
    <p><br><a href='https://github.com/itmaybejj/editoria11y/issues' class='ed11y-small'>Rapporteer bugs & vraag wijzigingen aan <span aria-hidden="true">&raquo;</span></a></p>
    `,
    headingExample: `
        <ul>
            <li>Kop niveau 1
                <ul>
                    <li>Kop niveau 2: een onderwerp
                        <ul><li>Kop niveau 3: een subonderwerp</li></ul></li>
                    <li>Kop niveau 2: een nieuw onderwerp</li>
                </ul>
            </li>
        </ul>`,
    headingLevelSkipped: {
      title: 'Handmatige controle: is een kopniveau overgeslagen?',
      tip: (prevLevel, level) =>
        `<p>Koppen en subkoppen creëren een <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opent in nieuw tabblad">navigeerbare inhoudsopgave</a> voor ondersteunende apparaten. De nummers geven inspringingen aan in een geneste relatie:</p>
            ${Ed11y.M.headingExample}
            <p>Deze kop sprong van niveau ${prevLevel} naar niveau ${level}. Voor een schermlezer klinkt dit alsof er inhoud ontbreekt.</p>
            <p><strong>Om te repareren:</strong> pas niveaus aan om een nauwkeurige structuur te vormen, zonder gaten.</p>
            `,
    },
    headingEmpty: {
      title: 'Koptag zonder tekst',
      tip: () =>
        `<p>Koppen en subkoppen creëren een <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opent in nieuw tabblad">navigeerbare inhoudsopgave</a> voor ondersteunende apparaten. De nummers geven inspringingen aan in een geneste relatie:</p>
            ${Ed11y.M.headingExample}
            <p>Lege koppen creëren verwarrende gaten in deze structuur: ze kunnen betekenen dat de volgende inhoud nog steeds deel uitmaakt van de vorige sectie, of dat de tekst om een of andere reden onuitspreekbaar was.</p>
            <p><strong>Om te repareren:</strong> voeg tekst toe aan deze kop, of verwijder deze lege regel.</p>
            `,
    },
    headingIsLong: {
      title: 'Handmatige controle: lange kop',
      tip: () =>
        `<p>Koppen moeten kort en duidelijk zijn. Ondersteunende apparaten gebruiken ze als een <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opent in nieuw tabblad">navigeerbare inhoudsopgave</a> voor de pagina. De nummers geven inspringingen aan in een geneste relatie:</p>  
            ${Ed11y.M.headingExample}
            <p><strong>Om te repareren:</strong> verkort deze kop indien mogelijk, of verwijder de kopstijl als deze alleen werd toegepast om visuele nadruk te geven aan deze tekst.</p>
            `,
    },
    blockquoteIsShort: {
      title: 'Handmatige controle: is dit een blockquote?',
      tip: () =>
        '<p>Blockquote-opmaak vertelt schermlezers dat de tekst moet worden aangekondigd als een citaat. Dit werd gemarkeerd omdat korte blockquotes <em>soms</em> eigenlijk <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opent in nieuw tabblad">koppen</a> zijn. Als dit een kop is en geen citaat, gebruik dan kopopmaak in plaats daarvan, zodat dit verschijnt in de paginastructuur.</p>',
    },
    altAttributeExample:
      `<p>Merk op dat een <a href="https://www.w3.org/WAI/tutorials/images/informative" target="_blank" title="Opent in nieuw tabblad">goede alt de boodschap van de afbeelding beschrijft</a>, niet simpelweg wat het bevat. Afhankelijk van de context, kan de alt voor de foto van een kind dat een bal trapt de nadruk leggen op de setting, het kind, de trap of de bal:</p>
            <ul>
                <li>De zonnige lentedag bracht kinderen naar het park voor wat voetbal.</li>
                <li>A.J. draagt het nieuwe teamuniform.</li>
                <li>De winnende trap kwam gebogen van de linkerzijlijn!</li>
                <li>De maat 4 bal is de juiste maat voor dit 9-jarige kind.</li>
            </ul>`,
    altMissing: {
      title: 'Afbeelding heeft geen alternatieve tekst attribuut',
      tip: () =>
        `<p>Wanneer schermlezers een afbeelding tegenkomen zonder alt-attribuut, dicteren ze in plaats daarvan de url van het afbeeldingsbestand, vaak letter voor letter.</p>
            <p><strong>Om te repareren:</strong> voeg een lege alt (alt="") toe om aan te geven dat deze afbeelding moet worden genegeerd door schermlezers, of voeg beschrijvende alt-tekst toe.</p>
            ${Ed11y.M.altAttributeExample}`,
    },
    altNull: {
      title: 'Handmatige controle: afbeelding heeft geen alt-tekst',
      tip: () =>
        `<p>Tenzij deze afbeelding puur decoratief is (een spacer-icoon of achtergrondtextuur), moet er waarschijnlijk een alt worden verstrekt. Foto's in pagina-inhoud hebben <strong>bijna altijd alt-tekst nodig.</strong> Omdat veel schermlezergebruikers kunnen zien dat er een afbeelding aanwezig is, kan het erg verwarrend zijn om de cursor over de plaats op de pagina te bewegen waar een afbeelding zichtbaar is, maar niets te horen.</p>
        ${Ed11y.M.altAttributeExample}`,
    },
    altURL: {
      title: 'Tekstalternatief van afbeelding is een URL',
      tip: (alt) =>
        `Deze afbeelding's alt-tekst is "${alt}," wat waarschijnlijk de bestandsnaam beschrijft, niet de inhoud van de afbeelding.
        <p><strong>Om te repareren:</strong> stel de alternatieve tekst van deze afbeelding in op een beknopte beschrijving van wat deze afbeelding betekent in deze context.</p>
        ${Ed11y.M.altAttributeExample}`
      ,
    },
    altMeaningless: {
      title: 'Alt-tekst is betekenisloos',
      tip: (alt) =>
        `<p>Deze afbeelding's alt-tekst is "${alt}," wat werd gemarkeerd als veelvoorkomende plaatshouder tekst.</p>
        <p><strong>Om te repareren:</strong> stel de alternatieve tekst van deze afbeelding in op een beknopte beschrijving van wat deze afbeelding betekent in deze context.</p>
        ${Ed11y.M.altAttributeExample}`
      ,
    },
    altMeaninglessLinked: {
      title: 'Gelinkte alt-tekst is betekenisloos',
      tip: (alt) =>
        `<p>Wanneer een link een afbeelding bevat, <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" target="_blank" title="opent in nieuw tabblad">wordt de alt-tekst van de afbeelding de linktekst</a> die wordt aangekondigd door schermlezers.
            Links moeten hun bestemming duidelijk en beknopt beschrijven, zelfs buiten context.</p>
           <p>Deze afbeelding's alt-tekst is "${alt}," wat waarschijnlijk deze link niet beschrijft.</p>`
      ,
    },
    altURLLinked: {
      title: 'Tekstalternatief van gelinkte afbeelding is een URL',
      tip: (alt) =>
        `<p>Deze afbeelding's alt-tekst is "${alt}," wat waarschijnlijk een bestandsnaam is.</p>
        <p>Wanneer een link om een afbeelding is gewikkeld en er geen andere tekst is, wordt <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" target="_blank" title="Opent in nieuw tabblad">de alt-tekst van de afbeelding de linktekst</a> die wordt aangekondigd door schermlezers.
            Links moeten hun bestemming duidelijk en beknopt beschrijven; een URL (meestal uitgesproken door de schermlezer letter voor letter) doet dat niet.</p>
            <ul>
                <li>Goede linktekst: "Over ons"</li>
                <li>Slechte linktekst: "H T T P S dubbele punt schuine streep schuine streep voorbeeld punt com schuine streep oh vee ee arr oh en ess</li>
            </ul>`,
    },
    altImageOf: {
      title: 'Handmatige controle: mogelijk overtollige tekst in alt',
      tip: (alt) =>
        `<p>Deze afbeelding's alt-tekst is "${alt}," wat vermeldt dat deze afbeelding een afbeelding is.</p>
        <p>Schermlezers kondigen aan dat ze een afbeelding beschrijven bij het lezen van alt-tekst, dus 
            zinnen zoals "afbeelding van" en "foto van" zijn meestal overbodig in alt-tekst; de schermlezergebruiker hoort "afbeelding: afbeelding van iets."</p>
            <p>Merk op dat dit OK is als het formaat verwijst naar de <strong>inhoud</strong> van de afbeelding:</p>
            <ul><li>Formaat is overbodig: "<em>foto van</em> een VHS-tape"</li>
            <li>Formaat is relevant: "<em>foto van</em> een VHS-tape in een fotoalbum dat wordt besproken in een geschiedenisles"</li></ul>`
    },
    altImageOfLinked: {
      title: 'Handmatige controle: mogelijk overtollige tekst in gelinkte afbeelding',
      tip: (alt) =>
        `<p>Deze afbeelding's alt-tekst is "${alt}," wat vermeldt dat deze afbeelding een afbeelding is.</p>
        <hr><p>Links moeten hun bestemming duidelijk en beknopt beschrijven. Omdat woorden zoals "afbeelding," "grafiek" of "foto" al overbodig zijn in tekstalternatieven (schermlezers identificeren de afbeelding al als een afbeelding), betekent hun aanwezigheid in een gelinkte afbeelding meestal dat het tekstalternatief van de afbeelding <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" title="Opent in nieuw tabblad" target="_blank">de afbeelding beschrijft in plaats van de link</a>.</p>
            <ul>
                <li>Goede linktekst: "Over ons"</li>
                <li>Slechte linktekst: "Afbeelding van vijf mensen die springen"</li>
            </ul>`
    },
    altDeadspace: {
      title: 'Tekstalternatief van afbeelding is onuitspreekbaar',
      tip: (alt) =>
        `<p>Deze afbeelding's alt-tekst is "${alt}," wat alleen onuitspreekbare symbolen en/of spaties bevat. Schermlezers zullen aankondigen dat er een afbeelding aanwezig is, en dan ongemakkelijk pauzeren: "afbeelding: ____."</p>
        <p><strong>Om te repareren:</strong> voeg een beschrijvende alt toe, of geef een <em>volledig</em> lege alt (alt="") als dit slechts een icoon of spacer is, en schermlezers het moeten negeren.</p>
            ${Ed11y.M.altAttributeExample}`,
    },
    altEmptyLinked: {
      title: 'Gelinkte afbeelding heeft geen alt-tekst',
      tip: () =>
        `<p>Wanneer een link om een afbeelding is gewikkeld, <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" title="Opent in nieuw tabblad" target="_blank">geeft de alt-tekst van de afbeelding de titel van de link voor schermlezers</a>.</p>
        <p><strong>Om te repareren:</strong> stel de alternatieve tekst van deze afbeelding in op iets dat de bestemming van de link beschrijft, of voeg tekst toe naast de afbeelding, binnen de link.</p>`,
    },
    altLong: {
      title: 'Handmatige controle: zeer lange alternatieve tekst',
      tip: (alt) =>
        `<p>Alternatieve tekst voor afbeeldingen wordt door schermlezers aangekondigd als één doorlopende zin; luisteraars moeten de hele alt een tweede keer beluisteren als ze iets missen. Als dit niet kan worden herformuleerd tot iets beknopt, is het beter om de alt te gebruiken om te verwijzen naar een <em>zichtbaar</em> <a href="https://www.w3.org/WAI/tutorials/images/complex/" title="Opent in nieuw tabblad" target="_blank">tekstalternatief voor complexe afbeeldingen</a>. Bijvoorbeeld:</p>
            <ul><li>"Evenementposter; details volgen in bijschrift"</li>
            <li>"Grafiek die onze problemen naar nul laat gaan; details volgen in tabel"</li></ul>
            Deze afbeelding's alt-tekst is: <em>${alt}</em>
            `,
    },
    altLongLinked: {
      title: 'Handmatige controle: zeer lange alternatieve tekst in gelinkte afbeelding',
      tip: (alt) =>
        `<p><a href="https://webaim.org/techniques/hypertext/link_text#alt_link" title="Opent in nieuw tabblad" target="_blank">De alt-tekst op een gelinkte afbeelding wordt gebruikt om de linkbestemming te beschrijven</a>. Links moeten kort, duidelijk en beknopt zijn, omdat schermlezergebruikers vaak naar de lijst van links op de pagina luisteren om inhoud van belang te vinden. Lange alternatieve tekst binnen een link geeft vaak aan dat het tekstalternatief van de afbeelding de afbeelding beschrijft in plaats van de link.</p>
        Deze afbeelding's alt-tekst is: <em>${alt}</em>`,
    },
    altPartOfLinkWithText: {
      title: 'Handmatige controle: link bevat zowel tekst als een afbeelding',
      tip: (alt) =>
        `<p>Schermlezers zullen <a href="https://www.w3.org/WAI/tutorials/images/functional/" title="Opent in nieuw tabblad" target="_blank">de alt-tekst van de afbeelding opnemen bij het beschrijven van deze link</a>.</p>
            <p>Controleer of de gecombineerde tekst beknopt en betekenisvol is:<br>"<em><strong>${alt}</strong></em>"</p>
            <p></p>
            <ul>
                <li>Behoud alts die relevante betekenis toevoegen:<br>"Koop (Een Tigers v. Falcons ticket)."</li>
                <li>Bewerk nutteloze of irrelevante alts:<br>"Koop (Een stuk papier met teamlogo's erop)."</li>
                <li>Verwijder onnodige alts:<br>"Koop Tigers v. Falcons tickets (Een Tigers v. Falcons ticket)."</li>
            </ul>
        `,
    },
    linkNoTextExample: '<p>Schermlezers zullen ofwel niets zeggen wanneer ze deze link bereiken: <br><em>"Link, [...ongemakkelijke pauze waar de linktitel zou moeten zijn...],"</em><br>of de URL lezen: <br><em>"Link, H-T-T-P-S schuine streep schuine streep voorbeeld punt com"</em></p>',
    linkTextIgnored: (ignoredText) => `
    <p>Schermlezers zullen alleen de tekst van de linktypeindicator op deze link lezen:<br>
    <em>"<strong>${ignoredText}</strong>"</em></p>
    `,
    linkNoText: {
      title: 'Link zonder toegankelijke tekst',
      tip: (ignoredText) =>
        `<p>Deze link is ofwel een typfout (een gelinkt spatieteken), of een gelinkte afbeelding zonder tekstalternatief.</p>
        ${ignoredText ? Ed11y.M.linkTextIgnored(ignoredText) : Ed11y.M.linkNoTextExample}
        <p><strong>Om te repareren:</strong></p>
        <ul><li>Als dit een typfout is, verwijder het. Merk op dat typfouten in links moeilijk te zien kunnen zijn als ze naast een "echte" link staan: één zal op de tekst zijn, één op een spatie.</li><li>Als het een echte link is, voeg tekst toe om te beschrijven waar het naartoe gaat.</li>`,
    },
    linkTextIsURL: {
      title: 'Handmatige controle: is deze linktekst een URL?',
      tip: (text) =>
        `<p>Deze link's tekst is:<br> <strong>${text}</strong></p>
        <p><a href="https://webaim.org/techniques/hypertext/link_text" title="Opent in nieuw tabblad" target="_blank">Links moeten betekenisvol en beknopt zijn</a>. Lezers scannen vaak op linktitels. Dit geldt vooral voor schermlezergebruikers, die navigeren met een lijst van links op de pagina.</p>
         <p>Een gelinkte URL doorbreekt dit patroon; de lezer moet de voorgaande paragraaf lezen om het doel van de link uit de context te achterhalen.</p>
            <ul>
                <li>Betekenisvolle en beknopte link: "Tips voor het schrijven van betekenisvolle links"</li>
                <li>Gelinkte URL, zoals uitgesproken door een schermlezer: "H T T P S dubbele punt schuine streep schuine streep voorbeeld punt com schuine streep tips schuine streep betekenisvolle-links"</li>
            </ul>`,
    },
    linkTextIsGeneric: {
      title: 'Handmatige controle: is deze link betekenisvol en beknopt?',
      tip: (text) =>
        `<p>Deze link's tekst is: <strong>${text}</strong></p>
        <p>Lezers scannen op links. Dit geldt vooral voor schermlezergebruikers, die navigeren met een lijst van links op de pagina.</p>
                <p>Generieke links zoals "klik hier," "lees meer" of "download" verwachten dat de lezer langzaam en zorgvuldig genoeg leest om het doel van elke link uit de context te achterhalen. Weinig lezers doen dit, dus doorklikpercentages op betekenisloze links zijn extreem slecht.</p>
                <ul>
                <li>Ideaal: "Leer over <a href="https://webaim.org/techniques/hypertext/link_text" title="Opent in nieuw tabblad" target="_blank">betekenisvolle links"</a></strong></li>
                <li>Niet betekenisvol: "Klik <a href="https://webaim.org/techniques/hypertext/link_text" title="Opent in nieuw tabblad" target="_blank">hier</a> om te leren over betekenisvolle links."</li>
                <li>Niet beknopt: "<a href="https://webaim.org/techniques/hypertext/link_text" title="Opent in nieuw tabblad" target="_blank">Klik hier om meer te leren over betekenisvolle links</a>"</li>
                </ul>
                `
      ,
    },
    linkDocument: {
      title: 'Handmatige controle: is het gelinkte document toegankelijk?',
      tip: () =>
        `<p>Veel mobiele en ondersteunende apparaatgebruikers hebben moeite met het lezen van inhoud in PDF's. PDF's staan over het algemeen geen verandering van lettergrootte toe, en bevatten vaak functies die incompatibel zijn met schermlezers.</p>
        <p>Maak idealiter de inhoud van deze gelinkte PDF beschikbaar op een webpagina of in een bewerkbaar document, en link alleen naar deze PDF als een "afdrukbaar" alternatief. Als deze PDF de enige manier is waarop u toegang tot deze inhoud biedt, moet u <a href='https://webaim.org/techniques/acrobat/' target='_blank' title="Opent in nieuw tabblad">handmatig controleren dat de PDF goed gestructureerd is</a>, met koppen, lijsten en tabelkoppen, en alt-tekst biedt voor zijn afbeeldingen.</p>`,
    },
    linkNewWindow: {
      title: 'Handmatige controle: wordt het openen van een nieuw venster verwacht?',
      tip: () =>
        `<p>Lezers kunnen er altijd voor kiezen om een link in een nieuw venster te openen. Wanneer een link een nieuw venster forceert te openen, kan dit verwarrend en irritant zijn, vooral voor gebruikers van ondersteunende apparaten die zich kunnen afvragen waarom de "terug" knop van hun browser plotseling is uitgeschakeld.</p>
                <p>Er zijn twee algemene uitzonderingen:</p>
                <ul>
                    <li>Wanneer de gebruiker een formulier invult, en het openen van een link in hetzelfde venster zou ervoor zorgen dat ze hun werk verliezen.</li>
                    <li>Wanneer de gebruiker duidelijk wordt gewaarschuwd dat een link een nieuw venster zal openen.</li>
                </ul>
                <p><strong>Om te repareren:</strong> stel deze link terug naar zijn standaard doel, of voeg een schermlezer-toegankelijke waarschuwing toe (tekst of een icoon met alt-tekst).</p>
                `
      ,
    },
    tableNoHeaderCells: {
      title: 'Tabel heeft geen kopcelcellen',
      tip: () => `
                <p>Om te repareren:</p>
                <ul><li>Als deze tabel gegevens bevat die betekenisvol zijn georganiseerd per rij en kolom, bewerk dan de eigenschappen van de tabel en specificeer of koppen zijn geplaatst in de eerste rij, kolom of beide. Dit laat schermlezergebruikers de koppen horen herhalen tijdens het navigeren door de inhoud.</li>
                <li>Als deze tabel geen rijen en kolommen met gegevens bevat, maar in plaats daarvan wordt gebruikt voor visuele lay-out, verwijder het dan. Tabellen lopen over de pagina heen in plaats van opnieuw te vloeien op mobiele apparaten, en moeten alleen worden gebruikt wanneer de horizontale relaties nodig zijn om de inhoud te begrijpen.</li></ul>
            `,
    },
    tableContainsContentHeading: {
      title: 'Inhoudskop binnen een tabel',
      tip: () =>
        `<p>Om te repareren: verwijder kopopmaak. Gebruik rij- en kolomkoppen in plaats daarvan.</p>
        <p>Inhoudskoppen ("Kop 1", "Kop 2") vormen een navigeerbare inhoudsopgave voor schermlezergebruikers,  
        die alle inhoud labelen <strong>tot de volgende kop</strong>. Tabelkoppen labelen specifieke kolommen of rijen binnen een tabel.</p> 
            <p></p>
            <table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">Ter illustratie: een <strong>tabel</strong>kop in cel 2 zou alleen zijn kolom labelen: cel B. <br><br>
            Een <strong>inhouds</strong>kop in cel 2 zou alle volgende tekst labelen, lezend van links naar rechts: cellen 3, A, B en C, evenals deze tekst!</td></tr>
            <tr><td>A</td><td>B</td><td>C</td></table>
            `
    },
    tableEmptyHeaderCell: {
      title: 'Lege tabelkopcel',
      tip: () => `
                <p>Bij het verkennen van tabellen herhalen schermlezers tabelkopcelcellen indien nodig om gebruikers te oriënteren. 
                Zonder koppen is het heel gemakkelijk om verdwaald te raken; schermlezergebruikers moeten kolommen en rijen tellen en proberen te onthouden welke kolommen bij welke rijen hoorden.</p>
                <p><strong>Om te repareren:</strong> zorg ervoor dat elke kopcel in deze tabel tekst bevat.</p>
            `,
    },
    textPossibleList: {
      title: 'Handmatige controle: moet dit lijstopmaak hebben?',
      tip: (text) =>
        `<p>Lijstopmaak is structureel:</p> 
            <ol><li>Lijstopmaak springt in en vloeit opnieuw bij overflow. Tekst lijnt verticaal uit met de regel erboven.</li>
            <li>Lijsten zijn machine-leesbaar. Schermlezers kunnen hun gebruikers oriënteren, dit aankondigen als "lijstitem, 2 van 3."</li></ol>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;3. Maar dit derde item is gewoon een zin met een nummer ervoor. Het wikkelt incorrect, en schermlezers weten niet dat het gerelateerd is aan de andere items in de lijst.</p>
            <p><strong>Om te repareren:</strong> als dit "${text}" deel uitmaakt van een lijst, vervang het dan door lijstopmaak.</p>
            `,
    },
    textPossibleHeading: {
      title: 'Handmatige controle: moet dit een kop zijn?',
      tip: () =>
        `<p>Als deze volledig vetgedrukte tekstregel functioneert als een kop voor de volgende tekst in plaats van een visuele nadruk, vervang dan de vetgedrukte opmaak door de juist genummerde kop. Anders, negeer deze waarschuwing.</p>
        <p>Koppen en subkoppen creëren een <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" title="Opent in nieuw tabblad" target="_blank">navigeerbare inhoudsopgave</a> voor ondersteunende apparaten. Het <strong><em>nummer</em></strong> van de kop geeft zijn <strong><em>diepte</em></strong> aan in de paginastructuur; bijv.:</p>
            ${Ed11y.M.headingExample}
            
            `,
    },
    textUppercase: {
      title: 'Handmatige controle: is deze hoofdlettertekst nodig?',
      tip: () =>
        `<p>HOOFDLETTERTEKST KAN MOEILIJKER TE LEZEN ZIJN VOOR VEEL MENSEN, EN WORDT VAAK GEÏNTERPRETEERD ALS SCHREEUWEN.</p>
         <p>Overweeg in plaats daarvan zinsopbouw te gebruiken, en vetgedrukte tekst of lettertype wijzigingen voor visuele nadruk, of structurele opmaak zoals koppen voor nadruk die ook zal worden aangekondigd door schermlezers.</p>`,
    },
    embedVideo: {
      title: 'Handmatige controle: is deze video accuraat ondertiteld?',
      tip: () =>
        `<p>Als een opgenomen video spraak of betekenisvolle geluiden bevat, moet het <a href="https://www.w3.org/WAI/media/av/captions/" title="Opent in nieuw venster" target="_blank">ondertiteling bieden</a>.</p>
            <p>Merk op dat automatische, machine-gegenereerde ondertiteling moet worden nagelezen, en sprekeridentificaties moeten worden toegevoegd, voordat het wordt beschouwd als een gelijkwaardig alternatief.</p>`,
    },
    embedAudio: {
      title: 'Handmatige controle: is een nauwkeurig transcript verstrekt?',
      tip: () =>
        `<p>Als deze audio spraak bevat, moet een <a href="https://www.w3.org/WAI/media/av/transcribing/" target="_blank" title="Opent in nieuw venster">tekstalternatief</a> worden verstrekt op deze pagina of gelinkt.</p>
            <p>Merk op dat automatische, machine-gegenereerde transcripten moeten worden nagelezen, en sprekeridentificaties moeten worden toegevoegd, voordat ze worden beschouwd als een gelijkwaardig alternatief</p>`,
    },
    embedVisualization: {
      title: 'Handmatige controle: is deze visualisatie toegankelijk?',
      tip: () =>
        `<p>Visualisatiewidgets zijn vaak moeilijk of onmogelijk voor ondersteunende apparaten om te bedienen, en kunnen moeilijk te begrijpen zijn voor lezers met slechtziendheid of kleurenblindheid.</p>
            <p>Tenzij deze specifieke widget hoog visueel contrast heeft, kan worden bediend door een toetsenbord en beschreven door een schermlezer, neem aan dat een alternatief formaat (tekstbeschrijving, gegevenstabel of downloadbare spreadsheet) ook moet worden verstrekt.</p>`,
    },
    embedTwitter: {
      title: 'Handmatige controle: is deze embed een toetsenbordval?',
      tip: () =>
        `<p>Als ingesloten feeds zijn ingesteld om een hoog aantal items te tonen, moeten toetsenbordgebruikers mogelijk tientallen of honderden keren op de tab-toets drukken om het component te verlaten.</p>
            <p>Controleer om er zeker van te zijn dat slechts een klein aantal items automatisch laden onmiddellijk of tijdens het scrollen. Het hebben van extra items die laden op verzoek ("toon meer") is prima.</p>`,
    },
    embedCustom: {
      title: 'Handmatige controle: is deze ingesloten inhoud toegankelijk?',
      tip: () =>
        '<p>Zorg ervoor dat afbeeldingen binnen deze embed alt-tekst hebben, video\'s ondertiteling hebben, en interactieve componenten kunnen worden <a href=\'https://webaim.org/techniques/keyboard/\'>bediend door een toetsenbord</a>.</p>',
    }
  }
};


class Ed11yTestEmbeds {

  // ESLint config:
  /* global Ed11y */
  /* exported Ed11yTestEmbeds */

  check() {

    // Check frames, audio and video
    let video = Ed11y.srcMatchesOptions(Ed11y.elements.iframe, Ed11y.options.videoContent);
    video = video ? video.concat(Array.from(Ed11y.elements.video)) : Ed11y.elements.video;
    if (video.length > 0) {
      video.forEach(el => {
        // Dismiss-able alert. False positive accepted on undefined sources.
        let dismissKey = Ed11y.dismissalKey(el?.getAttribute('src') !== 'undefined' ? el.getAttribute('src') : el.querySelector('[src]')?.getAttribute('src'));
        Ed11y.results.push({
          element: el,
          test: 'embedVideo',
          content: Ed11y.M.embedVideo.tip(),
          position: 'beforebegin',
          dismissalKey: dismissKey,
        });
      });
    }

    let audio = Ed11y.srcMatchesOptions(Ed11y.elements.iframe, Ed11y.options.audioContent);
    audio = audio ? audio.concat(Array.from(Ed11y.elements.audio)) : Ed11y.elements.audio;
    if (audio.length > 0) {
      audio.forEach(el => {
        // Dismiss-able alert. False positive accepted on undefined sources.
        let dismissKey = Ed11y.dismissalKey(el?.getAttribute('src') !== 'undefined' ? el.getAttribute('src') : el.querySelector('[src]')?.getAttribute('src'));
        Ed11y.results.push({
          element: el,
          test: 'embedAudio',
          content: Ed11y.M.embedAudio.tip(),
          position: 'beforebegin',
          dismissalKey: dismissKey,
        });
      });
    }

    let visualizations = Ed11y.srcMatchesOptions(Ed11y.elements.iframe, Ed11y.options.dataVizContent);
    if (visualizations.length > 0) {
      visualizations.forEach(el => {
        // Dismiss-able alert. False positive accepted on undefined sources.
        let dismissKey = Ed11y.dismissalKey(el.getAttribute('src'));
        Ed11y.results.push({
          element: el,
          test: 'embedVisualization',
          content: Ed11y.M.embedVisualization.tip(),
          position: 'beforebegin',
          dismissalKey: dismissKey,
        });
      });
    }

    // Warning: Twitter keyboard trap
    let twits = Ed11y.srcMatchesOptions(Ed11y.elements.frame, Ed11y.options.twitterContent);
    if (twits.length > 0) {
      twits.forEach(twit => {
        let numberOfTweets = twit.querySelectorAll('.timeline-TweetList-tweet');
        if (!!numberOfTweets && numberOfTweets > 3) {
          let dismissKey = Ed11y.dismissalKey(twit.getAttribute('src'));
          Ed11y.results.push({
            element: twit,
            test: 'embedTwitter',
            content: Ed11y.M.embedTwitter.tip(),
            position: 'beforebegin',
            dismissalKey: dismissKey,
          });
        }
      });
    }

    if (Ed11y.options.embeddedContent) {
      Ed11y.elements.embed?.forEach((el) => {
        let dismissKey = Ed11y.dismissalKey(el.getAttribute('src') + el.getAttribute('id') + el.getAttribute('class'));
        Ed11y.results.push({
          element: el,
          test: 'embedCustom',
          content: Ed11y.M.embedCustom.tip(),
          position: 'beforebegin',
          dismissalKey: dismissKey,
        });
      });
    }

  }

}
class Ed11yTestHeadings {

  // ESLint config:
  /* global Ed11y */
  /* exported Ed11yTestHeadings */

  check() {
    // Reset panel; we rebuild on each run.
    // todo mvp rewrite to search the whole outline
    Ed11y.panel?.querySelectorAll('#ed11y-outline-list li, .ed11y-headings-label')?.forEach((el) => el.remove());

    let prevLevel = 0;
    let prevEditable = false;
    Ed11y.headingOutline = [];
    let position = 'afterbegin';

    // Test each header level for accessibility issues.
    Ed11y.elements.allH?.filter(el => Ed11y.elementNotHidden(el))?.forEach((el) => {
      if (!Ed11y.addedNodeReadyToCheck(el)) {
        return;
      }
      let level;
      let alert = [];
      if (el.isContentEditable !== prevEditable) {
        let editableParent = el.closest('[contenteditable]');
        // first in editable zone
        if (editableParent) {
          Ed11y.options.editorHeadingLevel.some(level => {
            if (editableParent.closest(level.selector)) {
              if (level.previousHeading === 'inherit') {
                // Inherit levels
                return true;
              }
              prevLevel = level.previousHeading;
              return true;
            }
          });
        }
        prevEditable = el.isContentEditable;
      }

      // Match aria-headers to <h#> level.
      if (el.hasAttribute('aria-level')) {
        // Plus forces numerical type
        level = +el.getAttribute('aria-level');
      }
      else {
        level = +el.tagName.slice(1);
      }
      // Sanitized.
      level = parseInt(level);
      let error = '';
      let outlinePrefix = '';
      let headingText = Ed11y.computeText(el);
      let headingLength = headingText.length;
      let dismissKey = false;
      if (headingLength < 1) {
        // todo: let image merge up into shared alert.
        outlinePrefix += Ed11y.M.errorOutlinePrefixHeadingEmpty;
        error = 'headingEmpty';
        dismissKey = false; // redeclare in case of two errors.
        alert.push({
          element: el,
          test: error,
          content: Ed11y.M.headingEmpty.tip(),
          position: position,
          dismissalKey: dismissKey,
        });
      }
      else if (headingLength > 160) {
        outlinePrefix += Ed11y.M.errorOutlinePrefixHeadingIsLong;
        dismissKey = Ed11y.dismissalKey(level + headingText);
        error = 'headingIsLong';
        alert.push({
          element: el,
          test: error,
          content: Ed11y.M.headingIsLong.tip(),
          position: position,
          dismissalKey: dismissKey,
        });
      }
      if (error !== 'headingEmpty' && prevLevel > 0 && level - prevLevel > 1) {
        dismissKey = Ed11y.dismissalKey(level + headingText);
        outlinePrefix += Ed11y.M.errorOutlinePrefixSkippedLevel;
        error = 'headingLevelSkipped';
        alert.push({
          element: el,
          test: error,
          content: Ed11y.M.headingLevelSkipped.tip(prevLevel, level),
          position: position,
          dismissalKey: dismissKey,
        });
      }
      prevLevel = level;

      if (Ed11y.elements.h?.includes(el)) {
        // Populate heading outline with included heading.
        Ed11y.headingOutline.push([el, level, outlinePrefix, dismissKey]);

        alert?.forEach((result) => {
          Ed11y.results.push(result);
        });
      } else if (!Ed11y.options.headingsOnlyFromCheckRoots) {
        Ed11y.headingOutline.push([el, level, '', dismissKey]);
      }

    });

    // Check for blockquotes used as headings. If it's less than 25
    // characters - it's probably not a blockquote.
    Ed11y.elements.blockquote?.forEach((el) => {
      if (!Ed11y.addedNodeReadyToCheck(el)) {
        return;
      }
      let text = Ed11y.getText(el);
      if (text && text.length < 25) {
        let dismissKey = Ed11y.dismissalKey(text);
        let error = 'blockquoteIsShort';
        let message = Ed11y.M.blockquoteIsShort.tip();
        Ed11y.results.push({
          element: el,
          test: error,
          content: message,
          position: position,
          dismissalKey: dismissKey,
        });
      }
    });
  }

}

class Ed11yTestImages {

  // ESLint config:
  /* global Ed11y */
  /* exported Ed11yTestImages */

  check() {
    // todo postpone: https://ryersondmp.github.io/sa11y/examples/headings-images.html
    // todo postpone: flagging alts referencing position or color?
    // todo beta: empty alt with figcaption present blows up figure. code in Sa11y. see https://thoughtbot.com/blog/alt-vs-figcaption#the-figcaption-element and https://www.scottohara.me/blog/2019/01/21/how-do-you-figure.html

    Ed11y.imageAlts = [];

    // Test each image for alternative text.
    Ed11y.elements.img.forEach((el) => {

      let alt = el.matches('[aria-label], [aria-labelledby]') ?
        Ed11y.computeText(el) :
        el.getAttribute('alt');
      let altLabel = Ed11y.M.altLabelPrefix;
      let src = el.getAttribute('src');
      let error = '';
      let dismissable = true;
      let parentLink = Ed11y.parentLink(el);

      // todo mvp this is now true/false rather than a length measure
      if (typeof alt !== 'string') {
        // No alt attribute at all.
        error = 'altMissing';
        dismissable = false;
        // todo parameterize
        altLabel += Ed11y.M.errorAltMissing;
      }
      else if ((!!Ed11y.options.altPlaceholder && alt.indexOf(Ed11y.options.altPlaceholder) !== -1) || (alt.length === 0 && !parentLink)) {
        // Empty alt not part of link. Link test will not flag this if the link has other text.
        error = 'altNull';
        altLabel += Ed11y.M.errorAltNull;
      }
      else {
        altLabel += alt;
        const altLower = alt.toLowerCase().trim();

        if (Ed11y.M.meaninglessAlt.includes(altLower)) {
          error = 'altMeaningless';
          dismissable = false;
        } else {
          // Check if alt text is descriptive.
          // todo parameterize?
          // this also catches avif and heic and jpeg etc
          let altUrl = [
            '.avi',
            '.png',
            '.jp',
            '.webp',
            '.gif',
            '.tiff',
            '.svg',
            '.hei',
            '://',
          ];
          let check = [null, null];

          altUrl.forEach((string) => {
            if (altLower.indexOf(string) >= 0) {
              check[0] = 'URL';
            }
          });

          if (!check[0]) {

            let suspiciousWords = Ed11y.M.suspiciousWords;

            const altStripped = altLower.replace('.', '');

            suspiciousWords.some((string) => {
              const suspiciousWord = altStripped.indexOf(string);
              if (suspiciousWord > -1 && suspiciousWord < 6) {
                // photo of, a photo of, the photo is
                check[1] = string;
                return true;
              }
            });

            if (!check[1]) {
              Ed11y.M.badEndingForAlt.some((string) => {
                if (altStripped.endsWith(string)) {
                  // photo of, a photo of, the photo is
                  check[1] = string;
                  return true;
                }
              });
            }
          }

          if (check[0] === 'URL') {
            error = 'altURL';
            dismissable = false;
          }
          else if (check[1] !== null) {
            error = 'altImageOf';
          }
          // Alert with deadSpace alt.
          else if (!parentLink && alt !== '' && alt.replace(/"|'|\?|\.|-|\s+/g, '') === '') {
            error = 'altDeadspace';
            dismissable = false;
          }
          // Image error if alt text is too long.
          else if (alt.length > 160) {
            error = 'altLong';
          }
        }

        // If there is a parent link...
        if (parentLink !== null) {
          el = parentLink;
          // If we don't already have an error, check for mixed text

          if (!error && alt !== '') {
            let linkStrippedText = Ed11y.computeText(el, 0, !!Ed11y.options.linkIgnoreSelector);
            linkStrippedText = linkStrippedText.replace(alt.trim(), '');
            if (Ed11y.options.linkStringsNewWindows && Ed11y.options.linkStringsNewWindows !== Ed11y.M.linkStringsNewWindows) {
              // don't strip on the default, which is loose.
              linkStrippedText = linkStrippedText.toLowerCase().replace(Ed11y.options.linkIgnoreStrings, '');
            }
            if (Ed11y.options.linkIgnoreStrings) {
              linkStrippedText = Ed11y.options.linkIgnoreStrings ?
                linkStrippedText.toLowerCase().replace(Ed11y.options.linkIgnoreStrings, '')
                : linkStrippedText.toLowerCase();
            }
            linkStrippedText = linkStrippedText.replace(/"|'|\?|\.|-|\s+/g, '');
            if (linkStrippedText.length > 0) {
              error = 'altPartOfLinkWithText';
            }
          } else {
            // Return the linked version of the message.
            error = error ? error + 'Linked' : error;
          }

        }
      }
      // Return results
      let altStyle = 'pass';

      if (error) {
        let baseSrc = src ? src.split('?')[0] : 'nosrc_';
        dismissable = dismissable ? Ed11y.dismissalKey(baseSrc + alt) : false;
        if (error === 'altPartOfLinkWithText') {
          let linkText = Ed11y.computeText(parentLink);
          if (linkText && alt) {
            alt = linkText.replace(alt.trim(), ` (Image: ${alt}) `).trim();
          }
        }
        let message = Ed11y.options.langSanitizes ? Ed11y.M[error].tip(alt) : Ed11y.M[error].tip(Ed11y.sanitizeForHTML(alt));
        Ed11y.results.push({
          element: el,
          test: error,
          content: message,
          position: 'beforebegin',
          dismissalKey: dismissable,
        });
        altStyle = dismissable === false ? 'ed11y-error' : 'ed11y-warning';
      }
      Ed11y.imageAlts.push([el, src, altLabel, altStyle]);

    });

  }

}

class Ed11yTestLinks {

  // ESLint config:
  /* global Ed11y */
  /* exported Ed11yTestLinks */

  check() {
    // todo: See if there is an alternative to :visible that shows only visually hidden content.
    // todo later: Add test for consecutive links to same href?
    // todo later: parameterize stopwords as in Sa11y

    Ed11y.elements.a?.forEach((el) => {
      // todo: replace with full accessible name calculation
      let linkText = Ed11y.computeText(el, 0, !!Ed11y.options.linkIgnoreSelector);
      let img = el.querySelectorAll('img');
      let hasImg = img.length > 0;
      let document = el.matches(Ed11y.options.documentLinks);

      if (el?.getAttribute('target') === '_blank') {
        // Nothing was stripped AND we weren't warned.
        if (
          !(
            (Ed11y.options.linkIgnoreSelector &&
              el?.querySelector(Ed11y.options.linkIgnoreSelector))
            || linkText.toLowerCase().match(Ed11y.options.linkStringsNewWindows)
          )
        ) {
          let dismissKey = Ed11y.dismissalKey(linkText);
          Ed11y.results.push({
            element: el,
            test: 'linkNewWindow',
            content: Ed11y.M.linkNewWindow.tip(),
            position: 'beforebegin',
            dismissalKey: dismissKey,
          });
        }
      }

      // Todo: add test for title === textContent. Don't use computedText().

      // Tests to see if this link is empty
      if (
        linkText.replace(/"|'|\?|\.|-|\s+/g, '').length === 0 &&
        !(Ed11y.options.linkIgnoreSelector &&
          el.querySelector(Ed11y.options.linkIgnoreSelector)
        )
      ) {
        // Link with no text at all.
        if (hasImg === false) {
          Ed11y.results.push({
            element: el,
            test: 'linkNoText',
            content: Ed11y.M.linkNoText.tip(),
            position: 'beforebegin',
            dismissalKey: false,
          });
        } else {
          Ed11y.results.push({
            element: el,
            test: 'altEmptyLinked',
            content: Ed11y.M.altEmptyLinked.tip(),
            position: 'beforebegin',
            dismissalKey: false,
          });
        }
      }
      else {
        let linkTextCheck = function (textContent) {
          // Checks if link text is not descriptive.
          let linkStrippedText = textContent.toLowerCase();
          // Create version of text without "open in new window" warnings.

          if (Ed11y.options.linkStringsNewWindows &&
            Ed11y.options.linkStringsNewWindows !== Ed11y.M.linkStringsNewWindows) {
            // don't strip on the default, which is loose.
            linkStrippedText = linkStrippedText.replace(Ed11y.options.linkIgnoreStrings, '');
          }
          if (Ed11y.options.linkIgnoreStrings) {
            linkStrippedText = Ed11y.options.linkIgnoreStrings ?
              linkStrippedText.replace(Ed11y.options.linkIgnoreStrings, '')
              : linkStrippedText;
          }
          if (linkStrippedText.replace(/"|'|\?|\.|-|\s+/g, '').length === 0) {
            // No Text because of stripping out ignoreStrings.
            return 'generic';
          }

          // todo later: use regex to find any three-letter TLD followed by a slash.
          // todo later: parameterize TLD list
          let linksUrls = Ed11y.options.linksUrls ? Ed11y.options.linksUrls : Ed11y.M.linksUrls;
          let linksMeaningless = Ed11y.options.linksMeaningless ? Ed11y.options.linksMeaningless : Ed11y.M.linksMeaningless;
          let hit = 'none';

          if (linkStrippedText.replace(linksMeaningless, '').length === 0) {
            // If no partial words were found, then check for total words.
            hit = 'generic';
          }
          else {
            for (let i = 0; i < linksUrls.length; i++) {
              if (textContent.indexOf(linksUrls[i]) > -1) {
                hit = 'url';
                break;
              }
            }
          }
          return hit;
        };
        let textCheck = linkTextCheck(linkText);
        if (textCheck !== 'none') {
          let error = false;
          if (!hasImg && textCheck === 'url') {
            // Images test will pick this up.
            error = 'linkTextIsURL';
          }
          if (textCheck === 'generic') {
            error = 'linkTextIsGeneric';
            if (linkText.length < 4) {
              // Reinsert ignored link strings.
              linkText = Ed11y.computeText(el, 0);
            }
          }
          if (error) {
            Ed11y.results.push({
              element: el,
              test: error,
              content: Ed11y.M[error].tip(Ed11y.sanitizeForHTML(linkText)),
              position: 'beforebegin',
              dismissalKey: Ed11y.dismissalKey(linkText),
            });
          }
        }
      }
      // Warning: Find all PDFs.
      if (document) {
        let dismissKey = Ed11y.dismissalKey(el?.getAttribute('href'));
        Ed11y.results.push(
          {
            element: el,
            test: 'linkDocument',
            content: Ed11y.M.linkDocument.tip(),
            position: 'beforebegin',
            dismissalKey: dismissKey,
          });
      }
    });
  }
}

class Ed11yTestText {

  // ESLint config
  /* global Ed11y */
  /* exported Ed11yTestText */

  check() {

    /*
     * Detect paragraphs that should be lists: a. A. a) A) * - -- •.
     */

    // Set up checks for types of strings.
    const numberMatch = new RegExp(/(([023456789][\d\s])|(1\d))/, ''); // All numbers but 1.
    const alphabeticMatch = new RegExp(/(^[aA1]|[^\p{Alphabetic}\s])[-\s.)]/, 'u');
    const emojiMatch = new RegExp(/\p{Extended_Pictographic}|[•*]/, 'u');
    const secondTextNoMatch = ['a', 'A', '1'];
    const prefixDecrement = { // Converts to check a / b.
      b: 'a',
      B: 'A',
      2: '1'
    };
    const decrement = function (el) {
      return el.replace(/^b|^B|^2/, function (match) {
        return prefixDecrement[match];
      });
    };

    // Variables to carry in loop.
    let activeMatch = ''; // Carried in loop for second paragraph.
    let firstText = '';   // Text of previous paragraph.
    let lastHitWasEmoji = false;

    // Iterate paragraphs, comparing with previous in loop.
    Ed11y.elements.p?.forEach((p, i) => {
      let secondText = false;
      let hit = false;
      firstText = firstText ? firstText : Ed11y.getText(p).replace('(', '');
      let firstPrefix = firstText.substring(0, 2);

      // Grab first two characters.
      const isAlphabetic = firstPrefix.match(alphabeticMatch) !== null;
      const isNumber = firstPrefix.match(numberMatch) !== null;
      const isEmoji = firstPrefix.match(emojiMatch) !== null;

      if (firstPrefix.length > 0 && (firstPrefix !== activeMatch || (lastHitWasEmoji && isEmoji)) && !isNumber && (isAlphabetic || isEmoji)) {
        // We have a prefix and a possible hit; check next detected paragraph.
        let secondP = Ed11y.elements.p[i + 1];
        compareP: if (secondP) {
          secondText = Ed11y.getText(secondP).replace('(', '').substring(0, 2);
          if (secondTextNoMatch.includes(secondText?.toLowerCase().trim())) {
            // A sentence. A nother sentence. (A sentence). 1 apple, 1 banana.
            break compareP;
          }
          let secondPrefix = decrement(secondText);
          if (isAlphabetic) {
            // Check for repeats (*,*) or increments(a,b)
            if (firstPrefix !== 'A ' && firstPrefix === secondPrefix) {
              hit = true;
            }
          } else if (isEmoji && !lastHitWasEmoji) {
            // Check for two paragraphs in a row that start with emoji
            if (secondPrefix.match(emojiMatch)) {
              hit = true;
              lastHitWasEmoji = true;
              // This is carried; better miss than have lots of positives.
            }
          }
        }
        if (!hit) {
          // Split p by carriage return if there was a firstPrefix and compare.
          // todo: this fails if the element after the BR has rich formatting.
          let textAfterBreak = p?.querySelector('br')?.nextSibling?.nodeValue;
          if (textAfterBreak) {
            textAfterBreak = textAfterBreak.replace(/<\/?[^>]+(>|$)/g, '').replace('(', '').trim().substring(0, 2);
            if (firstPrefix === decrement(textAfterBreak) || (!isAlphabetic && !lastHitWasEmoji && textAfterBreak.match(emojiMatch))) {
              hit = true;
            }
          }
        }
        if (hit) {
          let dismissKey = Ed11y.dismissalKey(firstText);
          const nicePrefix = /[•*-1aA]/.test(firstPrefix) ? firstPrefix.substring(0, 1) : firstPrefix;
          Ed11y.results.push(
            {
              element: p,
              test: 'textPossibleList',
              content: Ed11y.options.langSanitizes ?
                Ed11y.M.textPossibleList.tip(firstPrefix) :
                Ed11y.M.textPossibleList.tip(Ed11y.sanitizeForHTML(nicePrefix)),
              position: 'afterbegin',
              dismissalKey: dismissKey,
            });
          activeMatch = firstPrefix;
        }
        else {
          // TODO: we could add a check for multiple emoji within the paragraph now.
          activeMatch = '';
        }
      }
      else {
        // Now check for possible heading.
        let possibleHeading = p.querySelector('strong:not(table strong), b:not(table b)');
        // Exclude paragraphs with links, then check if strong length equals p length.
        if (possibleHeading && !p.querySelector('a')) {
          possibleHeading = Ed11y.getText(possibleHeading);
          let length = possibleHeading.length;
          let maybeSentence = possibleHeading.match(/[.:;?!"']/) !== null;
          if (121 > length && length > 5 && length === firstText.length && maybeSentence === false) {
            let dismissKey = Ed11y.dismissalKey(possibleHeading);
            Ed11y.results.push({
              element: p,
              test: 'textPossibleHeading',
              content: Ed11y.M.textPossibleHeading.tip(),
              position: 'afterbegin',
              dismissalKey: dismissKey,
            });
          }
        }
      }
      if (!(isEmoji && lastHitWasEmoji)) {
        lastHitWasEmoji = false;
      }

      // Reset for next loop, carry over text query if available.
      firstText = secondText ? '' : secondText;
    });

    // Warning: Detect uppercase. For each element, if it contains more
    // than 4 uppercase words in a row, indicate warning.
    // Uppercase word is anything that is more than 3 characters.
    // Todo check performance of new regex.
    let checkCaps = function (el) {
      let thisText = '';
      if (el.tagName === 'LI') {
        // Prevent recursion through nested lists.
        el.childNodes.forEach((node) => {
          if (node.nodeType === 3) {
            thisText += node.textContent;
          }
        });
      }
      else {
        thisText = Ed11y.getText(el);
      }
      let uppercasePattern = /([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,}[ ])([A-Z]{2,})/g;
      let detectUpperCase = thisText.match(uppercasePattern);

      if (detectUpperCase && detectUpperCase[0].length > 10) {
        let dismissKey = Ed11y.dismissalKey(thisText);
        let parentClickable = el.closest('a, button');
        if (parentClickable) {
          Ed11y.results.push(
            {
              element: parentClickable,
              test: 'textUppercase',
              content: Ed11y.M.textUppercase.tip(),
              position: 'beforebegin',
              dismissalKey: dismissKey,
            });
        } else {
          Ed11y.results.push({
            element: el,
            test: 'textUppercase',
            content: Ed11y.M.textUppercase.tip(),
            position: 'afterbegin',
            dismissalKey: dismissKey,
          });
        }
      }
    };
    Ed11y.elements.h?.forEach((el) => {
      checkCaps(el);
    });
    Ed11y.elements.p?.forEach((el) => {
      checkCaps(el);
    });
    Ed11y.elements.blockquote?.forEach((el) => {
      checkCaps(el);
    });
    Ed11y.elements.li?.forEach((el) => {
      checkCaps(el);
    });

    // Check if a table has a table header.
    Ed11y.elements.table.forEach((el) => {
      if (!Ed11y.addedNodeReadyToCheck(el)) {
        return;
      }
      let findTHeaders = el.querySelectorAll('th');
      let findHeadingTags = el.querySelectorAll('h1, h2, h3, h4, h5, h6');
      if (findTHeaders.length === 0) {
        Ed11y.results.push({
          element: el,
          test: 'tableNoHeaderCells',
          content: Ed11y.M.tableNoHeaderCells.tip(),
          position: 'beforebegin',
          dismissalKey: false,
        });
      }
      else {
        // Make sure table headers are not empty.
        Array.from(findTHeaders).some((th) => {
          if (Ed11y.computeText(th).length < 1) {
            if (th.matches('th + th, tr + tr th')) {
              Ed11y.results.push({
                element: th,
                test: 'tableEmptyHeaderCell',
                content: Ed11y.M.tableEmptyHeaderCell.tip(),
                position: 'afterbegin',
                dismissalKey: false,
              });
              return true;
            } else {
              Ed11y.results.push({
                element: th,
                test: 'tableEmptyHeaderCell',
                content: Ed11y.M.tableEmptyHeaderCell.tip(),
                position: 'afterbegin',
                dismissalKey: Ed11y.dismissalKey(th.closest('tr')?.innerHTML),
              });
            }
          }
        });
      }
      if (findHeadingTags) {
        findHeadingTags.forEach((h) => {
          Ed11y.results.push({
            element: h,
            test: 'tableContainsContentHeading',
            content: Ed11y.M.tableContainsContentHeading.tip(),
            position: 'beforebegin',
            dismissalKey: false,
          });
        });
      }
    });

  }

}

class Ed11y {

  // ESLint config
  /* global ed11yLang, Ed11yTestHeadings, Ed11yTestImages, Ed11yTestLinks, Ed11yTestText, Ed11yTestEmbeds */
  /* exported Ed11y */

  constructor(options) {

    Ed11y.version = '2.3.13';

    let defaultOptions = {

      // Relative or absolute
      //cssUrls: false, // ['/folder/editoria11y.css','/folder/custom.css']
      cssUrls: false,

      // Only check within these containers, e.g. "#main, footer." Default is to look for <main> and fall back to <body>.
      checkRoots: false,

      // Shadow components inside the checkroot to check within, e.g., 'accordion, spa-content'
      shadowComponents: false,
      autoDetectShadowComponents: true,

      // Containers to globally ignore, e.g., "header *, .card *"
      ignoreElements: false,

      // Provide list of test keys; get from localization file or Ed11y.results.
      ignoreTests: false, //e.g. ['linkNewWindow', 'textUppercase']

      // Ignore Aria on these elements (Gutenberg labels headings while editing.)
      ignoreAriaOnElements: false, // e.g. 'h1,h2,h3,h4,h5,h6'
      ignoreTextInElements: false, // e.g. '.inner-node-hidden-in-CSS'

      // Disable tests on specific elements
      // Include and modify this entire object in your call
      ignoreByKey: {
        'p': 'table p',
        // 'h': false,
        'img': '[aria-hidden], [aria-hidden] img, ' +
          '[role="presentation"], ' +
          'a[href][aria-label] img, button[aria-label] img, ' +
          'a[href][aria-labelledby] img, button[aria-labelledby] img',
        'a': '[aria-hidden][tabindex]', // disable link text check on properly disabled links
        // 'li': false,
        // 'blockquote': false,
        // 'iframe': false,
        // 'audio': false,
        // 'video': false,
        'table': '[role="presentation"]',
      },

      headingsOnlyFromCheckRoots: false, // Whether the Headings panel shows all headings on page or only from checked content.

      // Set alertModes
      // 'headless': do not draw interface
      // 'userPreference: respect user preference.
      // 'polite': open for new issues.
      // 'assertive': open for any issues.
      // 'active': always open.
      // 'showDismissed': active with dismissed revealed.
      // CMS integrations can switch between polite & headless at runtime.
      // alertMode "headless" never draws the panel.
      alertMode: 'userPreference',
      inlineAlerts: true,
      watchForChanges: true, // true, false, 'checkRoots';

      // This covers CKEditor, TinyMCE and Gutenberg. Being less specific may help performance.
      editableContent: '[contenteditable="true"]:not(.gutenberg__editor [contenteditable]), .gutenberg__editor .interface-interface-skeleton__content',

      // Dismissed alerts
      currentPage: false, // uses window.location.pathname unless a string is provided.
      allowHide: true, // enables end-user ignore button
      allowOK: true,  // enables end-user mark OK button
      syncedDismissals: false, // provide empty or populated object {} to enable sync functions
      reportsURL: false, // Provides a link to site-wide reports
      showDismissed: false, // start panel with dismissed items visible; used when coming directly from a dashboard

      // Hide all alerts if these elements are absent, e.g., ".edit-button"
      // Used to not heckle editors on pages they cannot fix; they can still click a "show hidden" button to check manually.
      ignoreAllIfAbsent: false,
      ignoreAllIfPresent: false,

      // Disable checker altogether if these elements are present or absent, e.g., ".live-editing-toolbar, .frontpage" or ".editable-content"
      preventCheckingIfPresent: false,
      preventCheckingIfAbsent: false,

      // Regex of strings to remove from links before checking to see if link titles are meaningful. E.g.:
      // "\(link is external\)|\(link sends email\)"
      linkIgnoreStrings: false,
      linkIgnoreSelector: false,

      // Disable the "is this element visible" check on themes that have 0-height elements.
      checkVisible: true,

      // Selector list for elements where the tip opening JS should wait for your theme to modify the DOM or CSS before opening the tip.
      hiddenHandlers: '',

      panelPinTo: 'right',
      panelOffsetX: '25px',
      panelOffsetY: '25px',
      panelNoCover: '', // select other buttons to avoid.

      // Selector list for elements that hide overflow, truncating buttons.
      constrainButtons: false,

      // Interface
      lang: 'en',
      langSanitizes: false, // Some translation modules will double-escape
      theme: 'sleekTheme',
      sleekTheme: {
        bg: '#eff2ff', // e8f4ff
        bgHighlight: '#7b1919',
        text: '#20160c',
        primary: '#276499', // 276499
        primaryText: '#eff2ff',
        button: 'transparent', // deprecate?
        panelBar: '#1e517c',
        panelBarText: '#fffdf7',
        panelBarShadow: '0 0 0 1px #276499',
        activeTab: '#276499',
        activeTabText: '#fffffe',
        focusRing: '#007aff',
        outlineWidth: '0',
        borderRadius: '3px',
        ok: '#1f5381',
        warning: 'rgb(250, 216, 89)',
        warningText: '#20160c',
        alert: 'rgb(184, 5, 25)',
        alertText: '#f4f7ff',
      },
      darkTheme: {
        bg: '#0a2051',
        bgHighlight: '#7b1919',
        text: '#f4f7ff',
        primary: '#3052a0',
        primaryText: '#f4f7ff',
        button: 'transparent',
        panelBar: '#3052a0',
        panelBarText: '#f4f7ff',
        panelBarShadow: 'inset 0 0 1px, 0 0 0 1px #0a2051',
        activeTab: '#0a2051',
        activeTabText: '#fffffe',
        focusRing: 'cyan',
        outlineWidth: '2px',
        borderRadius: '3px',
        ok: '#0a307a',
        warning: 'rgb(250, 216, 89)',
        warningText: '#20160c',
        alert: 'rgb(184, 5, 25)',
        alertText: '#f4f7ff',
      },
      lightTheme: {
        bg: '#fffffe',
        bgHighlight: '#7b1919',
        text: '#20160c',
        primary: '#0a307a',
        primaryText: '#fffdf7',
        panelBar: '#0a307a',
        panelBarText: '#f4f7ff',
        panelBarShadow: '0 0 0 1px #0a307a',
        button: 'transparent',
        activeTab: '#b9c0cf',
        activeTabText: '#20160c',
        focusRing: '#007aff',
        outlineWidth: '0',
        borderRadius: '3px',
        ok: '#0a307a',
        warning: 'rgb(250, 216, 89)',
        warningText: '#20160c',
        alert: 'rgb(184, 5, 25)',
        alertText: '#f4f7ff',
      },
      // Base z-index for buttons.
      // 1299 maximizes TinyMCE compatibility.
      buttonZIndex: 1299,
      // CSS overrides and additions.

      baseFontSize: 'clamp(14px, 1.5vw, 16px)',
      baseFontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',

      // Test customizations
      embeddedContent: false, // todo remove in favor of custom checks
      embeddedContentTitle: '', // todo test
      embeddedContentMessage: '', // todo test
      videoContent: 'youtube.com, vimeo.com, yuja.com, panopto.com',
      audioContent: 'soundcloud.com, simplecast.com, podbean.com, buzzsprout.com, blubrry.com, transistor.fm, fusebox.fm, libsyn.com',
      dataVizContent: 'datastudio.google.com, tableau',
      twitterContent: 'twitter-timeline',
      // Selector list to identify links to documents you would like flagged for manual review.
      documentLinks: 'a[href$=\'.pdf\'], a[href*=\'.pdf?\']',
      // was 'a[href$=\'.pdf\'], a[href*=\'.pdf?\'], a[href$=\'.doc\'], a[href$=\'.docx\'], a[href*=\'.doc?\'], a[href*=\'.docx?\'], a[href$=\'.ppt\'], a[href$=\'.pptx\'], a[href*=\'.ppt?\'], a[href*=\'.pptx?\'], a[href^=\'https://docs.google\']'
      linksUrls: false, // get from language pack
      linksMeaningless: false, // get from language pack
      altPlaceholder: false, // WP uses 'This image has an empty alt attribute; it's filename is etc.jpg'
      // * Not implemented Yet:
      // ruleset toggling
      // form label tests
      // detectSPArouting: false,

      editLinks: false, // Add links to edit content in tooltips.

      editorHeadingLevel: [
        // Sets previous heading level for contentEditable fields.
        // With 'ignore' set, first heading level is ignored in editable zones.
        // This is ideal for systems with separate backend editing pages.
        // Set to 'inherit' for fields edited in a frontend context.
        /*{
          selector: '.example-inherit',
          previousHeading: 'inherit',
        },
        {
          selector: '.example-l3',
          previousHeading: 3,
        },*/
        {
          selector: '*',
          previousHeading: 0, // Ignores first heading for level skip detection.
        },
      ],

      userPrefersShut: localStorage.getItem('editoria11yShow') === '0',

      customTests: 0,

      nonce: false,

    };
    Ed11y.options = {
      ...defaultOptions,
      ...options
    };
    Ed11y.M = {
      // Fall back to En strings if language or string is unavailable
      ...ed11yLang['en'],
      ...ed11yLang[Ed11y.options.lang]
    };

    Ed11y.theme = Ed11y.options[Ed11y.options.theme];
    Ed11y.theme.baseFontSize = Ed11y.options.baseFontSize;
    Ed11y.theme.buttonZIndex = Ed11y.options.buttonZIndex;
    Ed11y.theme.baseFontFamily = Ed11y.options.baseFontFamily;

    if (Ed11y.options.currentPage === false) {
      Ed11y.options.currentPage = window.location.pathname;
    }

    if (!Ed11y.options.linkStringsNewWindows) {
      Ed11y.options.linkStringsNewWindows = Ed11y.M.linkStringsNewWindows;
    }

    if (!Ed11y.options.cssUrls) {
      const cssLink = document.querySelector('link[href*="editoria11y.css"], link[href*="editoria11y.min.css"]');
      if (cssLink) {
        Ed11y.options.cssUrls = [cssLink.getAttribute('href')];
      } else {
        console.warn('Editoria11y CSS file parameter is missing; attempting to load from CDN.');
        Ed11y.options.cssUrls = [`https://cdn.jsdelivr.net/gh/itmaybejj/editoria11y@${Ed11y.version}/dist/editoria11y.min.css`];
      }
    }

    const cssBundle = document.createElement('div');
    cssBundle.classList.add('ed11y-style');
    cssBundle.setAttribute('hidden', '');
    Ed11y.options.cssUrls?.forEach(sheet => {
      const cssLink = document.createElement('link');
      cssLink.setAttribute('rel', 'stylesheet');
      cssLink.setAttribute('media', 'all');
      cssLink.setAttribute('href', sheet + '?ver=' + Ed11y.version);
      cssBundle.append(cssLink);
    });

    Ed11y.attachCSS = function (appendTo) {
      const bundle = cssBundle.cloneNode(true);
      if (Ed11y.options.nonce) {
        bundle.querySelectorAll('link').forEach(link => {
          link.setAttribute('nonce', Ed11y.options.nonce);
        });
      }
      appendTo.appendChild(bundle);
    };

    Ed11y.elements = [];
    Ed11y.onLoad = true;
    Ed11y.showPanel = false;
    let windowWidth = window.innerWidth;
    Ed11y.watching = [];

    Ed11y.disable = () => {
      if (Ed11y.open && !Ed11y.closedByDisable) {
        Ed11y.closedByDisable = true;
      }
      Ed11y.disabled = true;
      Ed11y.reset();
      document.documentElement.style.setProperty('--ed11y-activeBackground', Ed11y.theme.panelBar);
      document.documentElement.style.setProperty('--ed11y-activeColor', Ed11y.theme.panelBarText);
      document.documentElement.style.setProperty('--ed11y-activeBorder', Ed11y.theme.panelBarText + '44');
      document.documentElement.style.setProperty('--ed11y-activePanelBorder', 'transparent');
      if (Ed11y.panelToggle) {
        Ed11y.panel?.classList.remove('ed11y-errors', 'ed11y-warnings');
        Ed11y.panelCount.textContent = 'i';
        Ed11y.panelJumpNext.setAttribute('hidden', '');
        Ed11y.panelToggle.classList.add('disabled');
        Ed11y.panelToggle.querySelector('.ed11y-sr-only').textContent = Ed11y.M.toggleDisabled;
      }
    };

    Ed11y.initialize = () => {
      if (Ed11y.once) {
        console.error('double init');
        return;
      }
      Ed11y.once = true;
      Ed11y.checkRunPrevent = () => {
        let preventCheck = Ed11y.options.preventCheckingIfPresent ?
          document.querySelector(Ed11y.options.preventCheckingIfPresent) :
          false;
        if (preventCheck) {
          console.warn(`Editoria11y is disabled because an element matched the "preventCheckingIfPresent" parameter:  "${Ed11y.options.preventCheckingIfPresent}"`);
        } else if (!preventCheck && !!Ed11y.options.preventCheckingIfAbsent) {
          preventCheck = document.querySelector(`:is(${Ed11y.options.preventCheckingIfAbsent})`) === null;
          if (preventCheck) {
            console.warn(`Editoria11y is disabled because no elements matched the "preventCheckingIfAbsent" parameter: "${Ed11y.options.preventCheckingIfAbsent}"`);
          }
        }
        return preventCheck;
      };

      //Need to evaluate if "load" event took place for bookmarklet version. Otherwise, only call Sa11y once page has loaded.
      const documentLoadingCheck = (callback) => {
        if (document.readyState === 'complete') {
          callback();
        } else {
          window.addEventListener('load', callback);
        }
      };

      // Once document has fully loaded.
      documentLoadingCheck(() => {
        if (Ed11y.checkRunPrevent()) {
          return false;
        }
        Ed11y.running = true;
        let localResultCount = localStorage.getItem('editoria11yResultCount');
        Ed11y.seen = localResultCount ? JSON.parse(localResultCount) : {};

        // Build list of dismissed alerts
        if (Ed11y.options.syncedDismissals === false) {
          Ed11y.dismissedAlerts = localStorage.getItem('ed11ydismissed');
          Ed11y.dismissedAlerts = Ed11y.dismissedAlerts ? JSON.parse(Ed11y.dismissedAlerts) : {};
        } else {
          Ed11y.dismissedAlerts = {};
          Ed11y.dismissedAlerts[Ed11y.options.currentPage] = Ed11y.options.syncedDismissals;
        }

        // Create test class objects
        Ed11y.testEmbeds = new Ed11yTestEmbeds;
        Ed11y.testHeadings = new Ed11yTestHeadings;
        Ed11y.testImages = new Ed11yTestImages;
        Ed11y.testLinks = new Ed11yTestLinks;
        Ed11y.testText = new Ed11yTestText;

        // Convert the container ignore user option to a CSS :not selector.
        Ed11y.ignore = Ed11y.options.ignoreElements ? `:not(${Ed11y.options.ignoreElements})` : '';

        if (!Ed11y.options.checkRoots) {
          Ed11y.options.checkRoots = document.querySelector('main') !== null ? 'main' : 'body';
        }

        // Check for ignoreAll elements.
        Ed11y.ignoreAll = Ed11y.options.ignoreAllIfAbsent && document.querySelector(`:is(${Ed11y.options.ignoreAllIfAbsent})`) === null;
        if (!Ed11y.ignoreAll && !!Ed11y.options.ignoreAllIfPresent) {
          Ed11y.ignoreAll = document.querySelector(`:is(${Ed11y.options.ignoreAllIfPresent})`) !== null;
        }

        // Run tests
        Ed11y.checkAll();
        window.addEventListener('resize', function () { Ed11y.windowResize(); });

      });
    };

    Ed11y.results = [];
    // Toggles the outline of all headers, link texts, and images.
    Ed11y.checkAll = () => {
      if (Ed11y.openTip.button) {
        return false;
      }
      Ed11y.disabled = false;

      if (!Ed11y.checkRunPrevent()) {

        if (Ed11y.incremental) {
          Ed11y.oldResults = Ed11y.results;
        }
        // Reset counts
        Ed11y.results = [];
        Ed11y.elements = [];
        Ed11y.mediaCount = 0;

        Ed11y.customTestsRunning = false;

        let roots = document.querySelectorAll(`:is(${Ed11y.options.checkRoots})`);
        if (roots.length === 0) {
          // Todo parameterize for translation.
          if (Ed11y.onLoad) {
            console.warn('Check Editoria11y configuration; specified root element not found');
          }
          Ed11y.disable();
          return;
        } else {
          Ed11y.roots = [];
          roots.forEach((el, i) => {
            if (el.shadowRoot) {
              Ed11y.roots[i] = el.shadowRoot;
              el.setAttribute('data-ed11y-has-shadow-root', 'true');
              Ed11y.detectShadow(el.shadowRoot);
            } else {
              Ed11y.roots[i] = el;
              Ed11y.detectShadow(el);
            }
          });


          Ed11y.buildElementList();

          let queue = [
            'testLinks',
            'testImages',
            'testHeadings',
            'testText',
            'testEmbeds',
          ];
          queue.forEach((test) => {
            window.setTimeout(function (test) {
              Ed11y[test].check();
            }, 0, test);
          });

          if (Ed11y.options.customTests > 0) {
            // Pause
            Ed11y.customTestsRunning = true;
            Ed11y.customTestsFinished = 0;
            document.addEventListener('ed11yResume', function () {
              Ed11y.customTestsFinished++;
              if (Ed11y.customTestsFinished === Ed11y.options.customTests) {
                Ed11y.customTestsRunning = false;
                window.requestAnimationFrame(() => Ed11y.updatePanel());
              }
            });
            window.setTimeout(function () {
              if (Ed11y.customTestsRunning === true) {
                Ed11y.customTestsRunning = false;
                if (Ed11y.panelToggle) {
                  Ed11y.panelToggle.querySelector('.ed11y-sr-only').textContent = Ed11y.M.toggleAccessibilityTools;
                }
                window.requestAnimationFrame(() => Ed11y.updatePanel());
                console.error('Editoria11y was told to wait for custom tests, but no tests were returned.');
              }
            }, 1000);
            window.setTimeout(function () {
              let customTests = new CustomEvent('ed11yRunCustomTests');
              document.dispatchEvent(customTests);
            }, 0);
          }
        }

        if (!Ed11y.customTestsRunning) {
          window.setTimeout(function () {
            if (Ed11y.panelToggle) {
              Ed11y.panelToggle.querySelector('.ed11y-sr-only').textContent = Ed11y.M.toggleAccessibilityTools;
            }
            Ed11y.updatePanel();
          }, 0);
        }

      }
      else {
        Ed11y.disable();
      }
    };

    Ed11y.totalCount = 0;
    Ed11y.countAlerts = function () {

      Ed11y.errorCount = 0;
      Ed11y.warningCount = 0;
      Ed11y.dismissedCount = 0;

      // Review results array to remove dismissed or ignored items

      Ed11y.dismissedCount = 0;
      for (let i = Ed11y.results.length - 1; i >= 0; i--) {

        let test = Ed11y.results[i].test;

        if (Ed11y.options.ignoreTests &&
          Ed11y.options.ignoreTests.includes(test)) {
          // Would be faster to skip test, but this is easy and reliable.
          Ed11y.results.splice(i, 1);
          continue;
        }

        // todo postpone: we could remove active range from list if it is not in oldResults to prevent tagging while people are typing. But we'd have to walk the array. Expensive!
        /*if (Ed11y.incremental && Ed11y.oldResults.length > 0) {
          // Don't flag new issues in the active range while people are typing.
        }*/

        let dismissKey = Ed11y.dismissalKey(Ed11y.results[i].dismissalKey);
        // We run the user provided dismissal key through the text sanitization to support legacy data with special characters.
        if (dismissKey !== false && Ed11y.options.currentPage in Ed11y.dismissedAlerts && test in Ed11y.dismissedAlerts[Ed11y.options.currentPage] && dismissKey in Ed11y.dismissedAlerts[Ed11y.options.currentPage][test]) {
          // Remove result if it has been marked OK or ignored, increment dismissed match counter.
          Ed11y.dismissedCount++;
          Ed11y.results[i].dismissalStatus = Ed11y.dismissedAlerts[Ed11y.options.currentPage][test][dismissKey];
        } else if (Ed11y.results[i].dismissalKey) {
          Ed11y.warningCount++;
          Ed11y.results[i].dismissalStatus = false;
        } else {
          Ed11y.errorCount++;
          Ed11y.results[i].dismissalStatus = false;
        }
      }

      Ed11y.totalCount = Ed11y.errorCount + Ed11y.warningCount;

      // Dispatch event for synchronizers.
      if (!Ed11y.incremental) {
        window.setTimeout(function () {
          let syncResults = new CustomEvent('ed11yResults');
          document.dispatchEvent(syncResults);
        }, 0);
      }

      if (Ed11y.ignoreAll) {
        Ed11y.dismissedCount = Ed11y.totalCount + Ed11y.dismissedCount;
        Ed11y.errorCount = 0;
        Ed11y.warningCount = 0;
        Ed11y.totalCount = 0;
      }

    };

    let oldResultString = '';
    const newIncrementalResults = function () {
      if (Ed11y.forceFullCheck || Ed11y.results.length !== Ed11y.oldResults.length) {
        return true;
      }
      let newResultString = `${Ed11y.errorCount} ${Ed11y.warningCount}`;
      Ed11y.results.forEach(result => {
        newResultString += result.test + result.element.outerHTML;
      });
      let changed = newResultString !== oldResultString;
      oldResultString = newResultString;
      return changed;
    };

    Ed11y.updatePanel = function () {

      // Stash old values for incremental updates.
      Ed11y.countAlerts();
      if (Ed11y.incremental) {
        // Check for a change in the result counts.
        if (Ed11y.forceFullCheck || newIncrementalResults()) {
          Ed11y.forceFullCheck = false;
          /*if (Ed11y.options.alertMode === 'assertive' && Ed11y.totalCount > 0 && (Ed11y.warningCount > oldWarnings || Ed11y.errorCount > oldErrors)) {
            console.warn('forced open');
            Ed11y.showPanel = true;
          }*/
          Ed11y.resetResults();
        } else {
          // Todo: commented out in 2.3.11:
          // Reconnect map
          Ed11y.results = Ed11y.oldResults;
          window.setTimeout(function () {
            if (!Ed11y.alignPending) {
              Ed11y.alignButtons();
              Ed11y.alignPanel();
              Ed11y.alignPending = false;
            }
            Ed11y.running = false;
          }, 0);
          return;
        }
      } else {
        if (Ed11y.totalCount > 0) {
          // Record what has been seen at this route.
          // We do not do this on incremental updates.
          // Todo question: should we not do this at all for contentEditable?
          Ed11y.seen[encodeURI(Ed11y.options.currentPage)] = Ed11y.totalCount;
          localStorage.setItem('editoria11yResultCount', JSON.stringify(Ed11y.seen));
        } else {
          delete Ed11y.seen[encodeURI(Ed11y.options.currentPage)];
        }
      }

      if (Ed11y.options.alertMode !== 'headless') {
        // Not headless; draw the interface.

        if (!Ed11y.bodyStyle) {
          Ed11y.paintReady();
        }

        if (Ed11y.onLoad === true) {
          Ed11y.onLoad = false;

          if (!Ed11y.options.inlineAlerts) {
            // todo move to incremental check or timeout; no need to do on load.
            oldResultString = `${Ed11y.errorCount} ${Ed11y.warningCount}`;
            Ed11y.results.forEach(result => {
              oldResultString += result.test + result.element.outerHTML;
            });
          }

          // Create the panel DOM on load.

          let panel = document.createElement('ed11y-element-panel');
          panel.classList.add('ed11y-preload');
          document.querySelector('body').appendChild(panel);
          Ed11y.attachCSS(Ed11y.panel);
          window.setTimeout(() => {
            panel.classList.remove('ed11y-preload');
          }, 0, panel);
          Ed11y.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = Ed11y.M.buttonToolsContent;
          Ed11y.panel.querySelector('#ed11y-headings-tab .summary-title').textContent = Ed11y.M.buttonOutlineContent;
          Ed11y.panel.querySelector('#ed11y-headings-tab .details-title').innerHTML = Ed11y.M.panelCheckOutline;
          Ed11y.panel.querySelector('#ed11y-alts-tab .summary-title').textContent = Ed11y.M.buttonAltsContent;
          Ed11y.panel.querySelector('#ed11y-alts-tab .details-title').innerHTML = Ed11y.M.panelCheckAltText;
          Ed11y.panel.querySelector('.jump-next.ed11y-sr-only').textContent = Ed11y.M.buttonFirstContent;

          Ed11y.panel.setAttribute('aria-label', Ed11y.M.panelControls);
          if (Ed11y.options.reportsURL) {
            let reportLink = document.createElement('a');
            reportLink.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 96C0 61 29 32 64 32l384 0c35 0 64 29 64 64l0 320c0 35-29 64-64 64L64 480c-35 0-64-29-64-64L0 96zm64 0l0 64 64 0 0-64L64 96zm384 0L192 96l0 64 256 0 0-64zM64 224l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64zM64 352l0 64 64 0 0-64-64 0zm384 0l-256 0 0 64 256 0 0-64z"/></svg><span class="ed11y-sr-only"></span>';
            reportLink.setAttribute('id', 'ed11y-reports-link');
            reportLink.setAttribute('href', Ed11y.options.reportsURL);
            reportLink.setAttribute('target', '_blank');
            reportLink.setAttribute('aria-label', Ed11y.M.reportsLink);
            reportLink.querySelector('.ed11y-sr-only').textContent = Ed11y.M.reportsLink;
            Ed11y.showDismissed.insertAdjacentElement('beforebegin', reportLink);
          }


          // Decide whether to open the panel on load.
          if (Ed11y.ignoreAll ||
            (!Ed11y.options.inlineAlerts && Ed11y.totalCount > 75)
          ) {
            Ed11y.showPanel = false;
          } else if (Ed11y.options.alertMode === 'active' ||
            !Ed11y.options.userPrefersShut ||
            Ed11y.options.showDismissed
          ) {
            // Show always on load for active mode or by user preference.
            Ed11y.showPanel = true;
          } else if (
            Ed11y.totalCount > 0 &&
            !Ed11y.ignoreAll &&
            (Ed11y.options.alertMode === 'assertive' ||
              Ed11y.options.alertMode === 'polite' &&
              Ed11y.seen[encodeURI(Ed11y.options.currentPage)] !== Ed11y.totalCount
            )
          ) {
            // Show sometimes for assertive/polite if there are new items.
            Ed11y.showPanel = true;
          }
        }

        // Now we can open or close the panel.
        if (!Ed11y.showPanel) {
          // Close panel.
          Ed11y.reset();
        } else {
          // Ignore issue count if this resulted from a user action.

          Ed11y.open = true;
          Ed11y.panel.classList.remove('ed11y-shut');
          Ed11y.panel.classList.add('ed11y-active');
          Ed11y.panelToggle.setAttribute('aria-expanded', 'true');
          Ed11y.panelToggleTitle.textContent = Ed11y.totalCount > 0 ? Ed11y.M.buttonHideAlerts : Ed11y.M.buttonHideChecker;
          // Prepare show hidden alerts button.
          if (Ed11y.dismissedCount === 0) {
            // Reset show hidden default option when irrelevant.
            Ed11y.showDismissed.setAttribute('hidden', '');
            Ed11y.showDismissed.setAttribute('data-ed11y-pressed', 'false');
            Ed11y.options.showDismissed = false;
          } else if (Ed11y.dismissedCount === 1) {
            Ed11y.showDismissed.querySelector('.ed11y-sr-only').textContent = Ed11y.options.showDismissed ? Ed11y.M.buttonHideHiddenAlert : Ed11y.M.buttonShowHiddenAlert;
            Ed11y.showDismissed.dataset.ed11yPressed = `${Ed11y.options.showDismissed}`;
            Ed11y.showDismissed.removeAttribute('hidden');
          } else {
            Ed11y.showDismissed.querySelector('.ed11y-sr-only').textContent = Ed11y.options.showDismissed ? Ed11y.M.buttonHideHiddenAlerts(Ed11y.dismissedCount) : Ed11y.M.buttonShowHiddenAlerts(Ed11y.dismissedCount);
            Ed11y.showDismissed.dataset.ed11yPressed = `${Ed11y.options.showDismissed}`;
            Ed11y.showDismissed.removeAttribute('hidden');
          }

          window.setTimeout(function () {
            document.dispatchEvent(new CustomEvent('ed11yPanelOpened'));
            if (!Ed11y.ignoreAll) {
              requestAnimationFrame(() => Ed11y.showResults());
            }
          }, 0);
        }
        // Update buttons.
        if (Ed11y.totalCount > 0 || (Ed11y.options.showDismissed && Ed11y.dismissedCount > 0)) {
          Ed11y.panelToggleTitle.textContent = Ed11y.open ? Ed11y.M.buttonHideAlerts : Ed11y.M.buttonShowAlerts;
          Ed11y.panelJumpNext.removeAttribute('hidden');
          if (Ed11y.errorCount > 0) {
            // Errors
            Ed11y.panel.classList.remove('ed11y-warnings', 'ed11y-pass');
            Ed11y.panel.classList.add('ed11y-errors');
            document.documentElement.style.setProperty('--ed11y-activeBackground', Ed11y.theme.alert);
            document.documentElement.style.setProperty('--ed11y-activeColor', '#fff');
            document.documentElement.style.setProperty('--ed11y-activeBorder', '#fff7');
            document.documentElement.style.setProperty('--ed11y-activePanelBorder', '#def');
          }
          else if (Ed11y.warningCount > 0) {
            // Warnings
            Ed11y.panel.classList.remove('ed11y-errors', 'ed11y-pass');
            Ed11y.panel.classList.add('ed11y-warnings');
            document.documentElement.style.setProperty('--ed11y-activeBackground', Ed11y.theme.warning);
            document.documentElement.style.setProperty('--ed11y-activeColor', '#111');
            document.documentElement.style.setProperty('--ed11y-activeBorder', '#947605');
            document.documentElement.style.setProperty('--ed11y-activePanelBorder', '#947605');
          } else {
            // Issues present but dismissed.
            Ed11y.panel.classList.remove('ed11y-errors', 'ed11y-warnings');
            Ed11y.panel.classList.add('ed11y-pass');
            document.documentElement.style.setProperty('--ed11y-activeBackground', Ed11y.theme.panelBar);
            document.documentElement.style.setProperty('--ed11y-activeColor', Ed11y.theme.panelBarText);
            document.documentElement.style.setProperty('--ed11y-activeBorder', Ed11y.theme.panelBarText + '44');
            document.documentElement.style.setProperty('--ed11y-activePanelBorder', Ed11y.theme.panelBarText + '88');
          }
          // todo postpone: aria alert on load?
          /*window.setTimeout(function () {
            //Ed11y.announce.textContent = text;
          }, 1500);*/
          if (Ed11y.dismissedCount > 0 && Ed11y.totalCount === 0) {
            Ed11y.panelCount.textContent = Ed11y.dismissedCount;
          } else {
            Ed11y.panelCount.textContent = Ed11y.totalCount > 99 ? '99+' : Ed11y.totalCount;
          }
        } else {
          Ed11y.panelJumpNext.setAttribute('hidden', '');
          document.documentElement.style.setProperty('--ed11y-activeBackground', Ed11y.theme.panelBar);
          document.documentElement.style.setProperty('--ed11y-activeColor', Ed11y.theme.panelBarText);
          document.documentElement.style.setProperty('--ed11y-activeBorder', Ed11y.theme.panelBarText + '44');
          document.documentElement.style.setProperty('--ed11y-activePanelBorder', Ed11y.theme.panelBarText + '88');

          Ed11y.panelCount.style.display = 'display: none;';
          Ed11y.panel.classList.remove('ed11y-warnings', 'ed11y-errors');
          Ed11y.panel.classList.add('ed11y-pass');

          if (Ed11y.dismissedCount > 0) {
            Ed11y.panelCount.textContent = 'i';
            if (Ed11y.open) {
              Ed11y.panelToggleTitle.textContent = Ed11y.M.buttonHideChecker;
            } else {
              Ed11y.panelToggleTitle.textContent = Ed11y.dismissedCount > 1 ?
                Ed11y.M.buttonShowHiddenAlerts(Ed11y.dismissedCount) :
                Ed11y.M.buttonShowHiddenAlert;
            }
          } else {
            Ed11y.panelCount.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-.75 -3.5 10.1699 19.1777"><path fill="currentColor" d="M3.7031,10.5527c-.3633-.6562-.6426-1.1387-.8379-1.4473l-.3105-.4863-.2344-.3574c-.5117-.7969-1.0449-1.4551-1.5996-1.9746.3164-.2617.6113-.3926.8848-.3926.3359,0,.6348.123.8965.3691s.5918.7148.9902,1.4062c.4531-1.4727,1.0293-2.8691,1.7285-4.1895.3867-.7188.7314-1.2021,1.0342-1.4502s.7041-.3721,1.2041-.3721c.2656,0,.5938.041.9844.123-1.0039.8086-1.8066,1.7695-2.4082,2.8828s-1.3789,3.0762-2.332,5.8887Z"/></svg>';
            Ed11y.panelToggleTitle.textContent = Ed11y.open ? Ed11y.M.buttonHideChecker : Ed11y.M.buttonShowNoAlert;
          }
        }
        Ed11y.panelToggle.classList.remove('disabled');
        Ed11y.panelToggle.removeAttribute('aria-disabled');
        Ed11y.alignPanel();
        Ed11y.panel.classList.remove('ed11y-preload');
      }

      window.setTimeout(() => {
        if (Ed11y.options.watchForChanges) {
          Ed11y.elements.editable?.forEach(editable => {
            if (!editable.matches('.drag-observe')) {
              editable.classList.add('drag-observe');
              editable.addEventListener('drop', () => {
                // This event does not bubble.
                Ed11y.forceFullCheck = true;
                Ed11y.incrementalCheck();
              });
            }
          });
          if (Ed11y.options.watchForChanges === 'checkRoots') {
            Ed11y.roots?.forEach((root) => {
              startObserver(root);
            });
          } else {
            startObserver(document.body);
          }
          Ed11y.resumeObservers(); // on recheck.
        }
      }, 0);

      Ed11y.running = false;
    };

    // Place markers on elements with issues
    Ed11y.result = function (result, index) {
      /* old array to new object map:
        // [0] element
        // [1] test
        // [2] content
        // [3] position
        // [4] dismissalKey
        // [5] dismissalStatus
        */
      let mark = document.createElement('ed11y-element-result');
      mark.classList.add('ed11y-element');
      let location;
      let position = 'beforebegin';
      mark.setAttribute('id', 'ed11y-result-' + index);
      mark.setAttribute('data-ed11y-result', index);
      mark.setAttribute('data-ed11y-open', 'false');
      if (!Ed11y.options.inlineAlerts) {
        location = document.querySelector('body');
        position = 'beforeend';
        mark.classList.add('ed11y-editable-result');
      } else {
        location = result.element.closest('a, button, [role="button"], [role="link"]');
        if (!location && result.element.shadowRoot) {
          // Must insert outside shadow DOM root.
          location = result.element;
          position = 'beforebegin';
          while (location.parentElement && location.parentElement.shadowRoot) {
            location = location.parentElement;
          }
        }
        if (!location) {
          location = result.element;
          position = result.position;
        }
      }
      location.insertAdjacentElement(position, mark);
      Ed11y.jumpList.unshift(mark);
      Ed11y.results[index].toggle = mark;
    };

    Ed11y.resetResults = function () {
      Ed11y.jumpList = [];
      Ed11y.openTip = {
        button: false,
        tip: false,
      };
      Ed11y.lastOpenTip = -1;
      Ed11y.resetClass([
        'ed11y-ring-red',
        'ed11y-ring-yellow',
        'ed11y-hidden-highlight',
        'ed11y-warning-inline',
        'ed11y-warning-block',
        'ed11y-error-block',
        'ed11y-error-inline',
      ]);
      // Reset insertions into body content.
      Ed11y.findElements('reset', 'ed11y-element-heading-label, ed11y-element-alt, ed11y-element-highlight', false);
      Ed11y.elements.reset?.forEach((el) => el.remove());

      // Flicker prevention -- leave old tip in place for 100ms.
      Ed11y.findElements('delayedReset', 'ed11y-element-result, ed11y-element-tip', false);
      const delayedReset = Ed11y.elements.delayedReset;

      window.setTimeout(() => {
        delayedReset?.forEach((el) => el.remove());
      }, 100, delayedReset);

      if (Ed11y.panelJumpNext) {
        Ed11y.panelJumpNext.querySelector('.ed11y-sr-only').textContent = Ed11y.M.buttonFirstContent;
      }
      // Reset insertions into body content.
    };

    Ed11y.resetPanel = function () {
      // Reset main panel.
      Ed11y.visualizing = true; // so visualize function removes visualizers.
      Ed11y.visualize();
      if (Ed11y.totalCount === 0 && Ed11y.dismissedCount > 0) {
        Ed11y.panelCount.textContent = 'i';
        Ed11y.panelToggleTitle.textContent = Ed11y.dismissedCount === 1 ?
          Ed11y.M.buttonShowHiddenAlert :
          Ed11y.M.buttonShowHiddenAlerts(Ed11y.dismissedCount);
      }
      if (!Ed11y.options.showDismissed && Ed11y.showDismissed) {
        Ed11y.showDismissed.setAttribute('data-ed11y-pressed', 'false');
        Ed11y.showDismissed.querySelector('.ed11y-sr-only').textContent = Ed11y.dismissedCount === 1 ?
          Ed11y.M.buttonShowHiddenAlert : Ed11y.M.buttonShowHiddenAlerts(Ed11y.dismissedCount);
      }
      Ed11y.panel?.classList.add('ed11y-shut');
      Ed11y.panel?.classList.remove('ed11y-active');
      Ed11y.panelToggle?.setAttribute('aria-expanded', 'false');
    };

    Ed11y.reset = function () {
      Ed11y.pauseObservers();
      Ed11y.resetResults();
      Ed11y.resetPanel();
      Ed11y.incremental = false;
      Ed11y.running = false;
      Ed11y.showPanel = false;
      Ed11y.open = false;
    };

    Ed11y.linkText = (linkText) => {
      // todo postpone: This is only used in Images??? Review all text value diving.
      linkText = linkText.replace(Ed11y.options.linkIgnoreStrings, '');
      linkText = linkText.replace(/'|"|-|\.|\s+/g, '');
      return linkText;
    };

    Ed11y.detectShadow = function (container) {
      if (Ed11y.options.autoDetectShadowComponents) {
        const select = !Ed11y.ignore ? '*:not(.ed11y-element)' : `*:not(${Ed11y.options.ignore}, .ed11y-element)`;
        let search = [];
        if (container.shadowRoot && container.shadowRoot.mode === 'open') {
          if (!container.matches('[data-ed11y-has-shadow-root]')) {
            container.setAttribute('data-ed11y-has-shadow-root', 'true');
            Ed11y.attachCSS(container.shadowRoot);
            Ed11y.attachCSS(container);
          }
          search = container.shadowRoot.querySelectorAll(select);
        } else {
          search = container.querySelectorAll(select);
        }
        search?.forEach((component) => {
          if (component.shadowRoot && component.shadowRoot.mode === 'open') {
            Ed11y.detectShadow(component);
          }
        });
      } else if (Ed11y.options.shadowComponents) {
        const providedShadow = container.querySelectorAll(Ed11y.options.shadowComponents);
        providedShadow.forEach((component) => {
          if (component.shadowRoot && component.shadowRoot.mode === 'open') {
            if (!container.matches('[data-ed11y-has-shadow-root]')) {
              component.setAttribute('data-ed11y-has-shadow-root', 'true');
              Ed11y.attachCSS(component.shadowRoot);
              Ed11y.attachCSS(component);
            }
            Ed11y.detectShadow(component);
          } else {
            console.warn(`Editoria11y: A specified shadow host has no shadowRoot: ${component.tagName}`);
          }
        });
      }
    };

    const diveShadow = function (container, select, selector) {
      if (container.matches(selector)) {
        return ([container]);
      } else {
        let inners = container.shadowRoot.querySelectorAll(select);
        if (typeof (inners) === 'object' && inners.length > 0) {
          // Replace shadow host with inner elements.
          inners.forEach(inner => {
            for (let innerIndex = inners - 1; innerIndex >= 0; innerIndex--) {
              let innerInner = diveShadow(inner, select, selector);
              if (innerInner.length > 0) {
                inners.splice(innerIndex, 1, ...innerInner);
              } else {
                inners.splice(innerIndex, 1);
              }
            }
          });
          return (Array.from(inners).filter((el) => el.matches(selector)));
        }
      }
      return [];
    };

    // QuerySelectAll non-ignored elements within checkroots, with recursion into shadow components
    Ed11y.findElements = function (key, selector, rootRestrict = true) {

      // Todo beta: function and parameter to auto-detect shadow components.
      let shadowSelector = Ed11y.options.autoDetectShadowComponents ?
        '[data-ed11y-has-shadow-root]' :
        Ed11y.options.shadowComponents ?
          Ed11y.options.shadowComponents : false;

      // Concatenate global and specific ignores
      let ignore = '';
      if (Ed11y.options.ignoreElements) {
        ignore = Ed11y.options.ignoreByKey[key] ? `:not(${Ed11y.options.ignoreElements}, ${Ed11y.options.ignoreByKey[key]})` : `:not(${Ed11y.options.ignoreElements})`;
      } else {
        ignore = Ed11y.options.ignoreByKey[key] ? `:not(${Ed11y.options.ignoreByKey[key]})` : '';
      }

      // Initialize or reset elements array.
      Ed11y.elements[key] = [];

      const select = `:is(${selector}${shadowSelector ? ', ' + shadowSelector : ''})${ignore}`;

      if (rootRestrict && Ed11y.roots) {
        // Add array of elements matching selector, excluding the provided ignore list.
        // Todo this can dupe
        Ed11y.roots.forEach(root => {
          Ed11y.elements[key] = Ed11y.elements[key].concat(Array.from(root.querySelectorAll(select)));
        });
      } else {
        Ed11y.elements[key] = Ed11y.elements[key].concat(Array.from(document.querySelectorAll(select)));
      }

      // The initial search may be a mix of elements ('p') and placeholders for shadow hosts ('custom-p-element').
      // Repeat the search inside each placeholder, and replace the placeholder with its search results.
      if (shadowSelector) {
        for (let index = Ed11y.elements[key].length - 1; index >= 0; index--) {
          if (Ed11y.elements[key][index].matches(shadowSelector)) {
            // Dive into the shadow root and collect an array of its results.
            let inners = diveShadow(Ed11y.elements[key][index], select, selector);
            if (inners.length > 0) {
              Ed11y.elements[key].splice(index, 1, ...inners);
            } else {
              Ed11y.elements[key].splice(index, 1);
            }
          }
        }
      }
    };

    Ed11y.buildElementList = function () {

      // Note: as of 3/28/25 this is as performant as Sa11y's filter() approach.
      Ed11y.findElements('editable', Ed11y.options.editableContent, false);
      if (Ed11y.options.inlineAlerts && Ed11y.elements.editable.length > 0) {
        Ed11y.options.inlineAlerts = false;
        console.warn('Editable content detected; Editoria11y inline alerts disabled');
      }
      Ed11y.findElements('p', 'p');
      Ed11y.findElements('h', 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]');
      Ed11y.findElements('allH', 'h1, h2, h3, h4, h5, h6, [role="heading"][aria-level]', false);
      Ed11y.findElements('img', 'img');
      Ed11y.findElements('a', 'a[href]');
      Ed11y.findElements('li', 'li');
      Ed11y.findElements('blockquote', 'blockquote');
      Ed11y.findElements('iframe', 'iframe');
      Ed11y.findElements('audio', 'audio');
      Ed11y.findElements('video', 'video');
      Ed11y.findElements('table', 'table');

      if (Ed11y.options.embeddedContent) {
        Ed11y.findElements('embed', Ed11y.options.embeddedContent);
      }
      if (Ed11y.options.panelNoCover) {
        // Moves panel off conflicting widgets.
        Ed11y.findElements('panelPin', Ed11y.options.panelNoCover, false);
      }
    };

    Ed11y.dismissalKey = function (text) {
      return String(text).replace(/([^0-9a-zA-Z])/g, '').substring(0, 512);
    };

    const dismissOne = function (dismissalType, test, dismissalKey) {

      // Update dismissal record.
      if (dismissalType === 'reset') {
        delete Ed11y.dismissedAlerts[Ed11y.options.currentPage][test][dismissalKey];
        if (Object.keys(Ed11y.dismissedAlerts[Ed11y.options.currentPage][test]).length === 0) {
          delete Ed11y.dismissedAlerts[Ed11y.options.currentPage][test];
        }
        if (Object.keys(Ed11y.dismissedAlerts[Ed11y.options.currentPage]).length === 0) {
          delete Ed11y.dismissedAlerts[Ed11y.options.currentPage];
        }
        //window.requestAnimationFrame(() => Ed11y.updatePanel());
      } else {
        let dismissal = {};
        dismissal[dismissalKey] = dismissalType;
        if (typeof Ed11y.dismissedAlerts[Ed11y.options.currentPage] == 'undefined') {
          let store = {};
          store[test] = dismissal;
          Ed11y.dismissedAlerts[Ed11y.options.currentPage] = store;
        } else if (typeof Ed11y.dismissedAlerts[Ed11y.options.currentPage][test] === 'undefined') {
          Ed11y.dismissedAlerts[Ed11y.options.currentPage][test] = dismissal;
        } else {
          Ed11y.dismissedAlerts[Ed11y.options.currentPage][test][dismissalKey] = dismissalType;
        }
        Ed11y.showDismissed.removeAttribute('hidden');
      }

      // Send record to storage or dispatch an event to an API.
      if (Ed11y.options.syncedDismissals === false) {
        localStorage.setItem('ed11ydismissed', JSON.stringify(Ed11y.dismissedAlerts));
      }
      let dismissalDetail = {
        dismissPage: Ed11y.options.currentPage,
        dismissTest: test,
        dismissKey: dismissalKey,
        dismissAction: dismissalType,
      };
      let ed11yDismissalUpdate = new CustomEvent('ed11yDismissalUpdate', { detail: dismissalDetail });
      window.setTimeout(() => {
        document.dispatchEvent(ed11yDismissalUpdate);
      }, 100);
    };

    Ed11y.dismissThis = function (dismissalType, all = false) {
      // Find the active tip and draw its identifying information from the result list
      let removal = Ed11y.openTip;
      let id = removal.tip.dataset.ed11yResult;
      let test = Ed11y.results[id].test;

      if (all) {
        Ed11y.results.forEach((result) => {
          if (result.test === test && result.dismissalStatus !== dismissalType) {
            dismissOne(dismissalType, test, result.dismissalKey);
          }
        });
      } else {
        let dismissalKey = Ed11y.dismissalKey(Ed11y.results[id].dismissalKey);
        dismissOne(dismissalType, test, dismissalKey);
      }

      // Remove tip and reset borders around element
      Ed11y.resetClass(['ed11y-hidden-highlight', 'ed11y-ring-red', 'ed11y-ring-yellow']);
      removal.tip?.parentNode?.removeChild(removal.tip);
      // TODO EDITING: COMMENT OUT BELOW...SEEMS REDUNDANT?
      //removal.button?.parentNode?.removeChild(removal.button);

      Ed11y.reset();
      Ed11y.showPanel = true;
      Ed11y.checkAll();

      let rememberGoto = Ed11y.lastOpenTip;

      window.setTimeout(function () {
        if (Ed11y.jumpList.length > 0) {
          Ed11y.lastOpenTip = (rememberGoto - 1);
          Ed11y.panelJumpNext?.focus();
        } else {
          window.setTimeout(function () {
            Ed11y.panelToggle?.focus();
          }, 100);
        }
      }, 500, rememberGoto);

    };

    Ed11y.transferFocus = function () {
      if (!Ed11y.openTip.tip) {
        return;
      }
      const id = Ed11y.openTip.tip.dataset.ed11yResult;
      const target = Ed11y.results[id].element;
      const editable = target.closest('[contenteditable]');
      if (!editable && !target.closest('textarea, input')) {
        if (target.closest('a')) {
          Ed11y.toggledFrom = target.closest('a');
        } else if (target.getAttribute('tabindex') !== null) {
          Ed11y.toggledFrom = target;
        } else {
          target.setAttribute('tabindex', '0');
          Ed11y.toggledFrom = target;
        }
        Ed11y.openTip.tip.shadowRoot.querySelector('.close').click();
      } else {
        Ed11y.toggledFrom = false;
        if (target.getAttribute('contenteditable') === 'true') {
          Ed11y.toggledFrom = target;
        } else if (target.closest('p[contenteditable="true"]')) {
          Ed11y.toggledFrom = target.closest('p[contenteditable="true"]');
        } else {
          // Just got complicated -- need to move a caret
          Ed11y.toggledFrom = false;
        }
        Ed11y.openTip.tip.shadowRoot.querySelector('.close').click();
        if (!Ed11y.toggledFrom && editable) {
          // Need to move focus manually
          // h/t https://stackoverflow.com/questions/6249095/how-to-set-the-caret-cursor-position-in-a-contenteditable-element-div
          editable.focus();
          const range = document.createRange();
          const sel = window.getSelection();
          range.setStart(target, 0);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    };

    Ed11y.toggleShowDismissals = function () {
      // todo postpone: if user has allowHide but not allowOK or vice versa, this temporarily clears both.
      Ed11y.ignoreAll = false;
      Ed11y.options.showDismissed = !(Ed11y.options.showDismissed);
      Ed11y.reset();
      Ed11y.showPanel = true;
      Ed11y.checkAll();

      Ed11y.showDismissed.setAttribute('data-ed11y-pressed', (!!Ed11y.options.showDismissed).toString());
      window.setTimeout(function () {
        Ed11y.showDismissed.focus();
      }, 0);
    };

    Ed11y.showResults = function () {
      Ed11y.buildJumpList();
      // Announce that buttons have been placed.
      document.dispatchEvent(new CustomEvent('ed11yPanelOpened'));
      Ed11y.alignButtons();
      if (!Ed11y.options.inlineAlerts) {
        Ed11y.checkEditableIntersects();
        Ed11y.intersectionObservers();
      }
    };

    Ed11y.editableHighlight = [];

    Ed11y.alignHighlights = function () {
      Ed11y.editableHighlight.forEach((el) => {
        let targetOffset = el.target.getBoundingClientRect();
        if (!Ed11y.visible(el.target)) {
          // Invisible target.
          const firstVisibleParent = Ed11y.firstVisibleParent(el.target);
          targetOffset = firstVisibleParent ? firstVisibleParent.getBoundingClientRect() : targetOffset;
        }
        el.highlight.style.setProperty('width', targetOffset.width + 6 + 'px');
        el.highlight.style.setProperty('top', targetOffset.top + window.scrollY - 3 + 'px');
        el.highlight.style.setProperty('left', targetOffset.left - 3 + 'px');
        el.highlight.style.setProperty('height', targetOffset.height + 6 + 'px');
      });
    };

    Ed11y.editableHighlighter = function (resultID, show, firstVisible) {

      if (!show) {
        Ed11y.editableHighlight[resultID]?.highlight.style.setProperty('opacity', '0');
        return;
      }
      const result = Ed11y.results[resultID];
      let el = Ed11y.editableHighlight[resultID]?.highlight;
      if (!el) {
        el = document.createElement('ed11y-element-highlight');
        el.classList.add('ed11y-element');
        Ed11y.editableHighlight[resultID] = { highlight: el };
        el.style.setProperty('position', 'absolute');
        el.style.setProperty('pointer-events', 'none');
        document.body.appendChild(el);
      }
      Ed11y.editableHighlight[resultID].target = firstVisible ? firstVisible : result.element;
      const zIndex = result.dismissalKey ? 'calc(var(--ed11y-buttonZIndex, 9999) - 2)' : 'calc(var(--ed11y-buttonZIndex, 9999) - 1)';
      el.style.setProperty('z-index', zIndex);
      const outline = result.dismissalKey ?
        '0 0 0 1px #fff, inset 0 0 0 2px var(--ed11y-warning, #fad859), 0 0 0 3px var(--ed11y-warning, #fad859), 0 0 0 4px var(--ed11y-primary)'
        : '0 0 0 1px #fff, inset 0 0 0 2px var(--ed11y-alert, #b80519), 0 0 0 3px var(--ed11y-alert, #b80519), 0 0 1px 3px';
      el.style.setProperty('box-shadow', outline);
      el.style.setProperty('border-radius', '3px');
      el.style.setProperty('top', '0');
      el.style.setProperty('left', '0');
      Ed11y.alignHighlights();
      el.style.setProperty('opacity', '1');
    };

    const nudgeMark = function (el, x, y) {
      // TODO: THESE CAN NUDGE OUT OF THE OVERFLOW AREA OF THE CONTENTEDITABLE CONTAINER
      if (el.style.transform) {
        const computedStyle = window.getComputedStyle(el);
        let matrix = computedStyle.getPropertyValue('transform');
        matrix = matrix.split(',');
        el.style.transform = `translate(${parseFloat(matrix[4]) + x}px, ${parseFloat(matrix[5]) + y}px)`;
      } else {
        el.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const scrollableElem = function (el) {
      let overflowing = el.clientHeight && el.clientHeight < el.scrollHeight;
      if (overflowing) {
        const styles = window.getComputedStyle(el);
        overflowing = styles.overflowY !== 'visible';
      }
      return overflowing;
    };

    const closestScrollable = function (el) {
      if (Ed11y.options.constrainButtons && el.closest(Ed11y.options.constrainButtons)) {
        return el.closest(Ed11y.options.constrainButtons);
      }

      let parent = el.parentElement;
      if (parent && parent.tagName !== 'BODY') {
        // Parent exists
        if (scrollableElem(parent)) {
          // Return if scrollable found.
          return parent;
        } else {
          // Element is not scrollable, recurse
          parent = closestScrollable(parent);
          // Return if scrollable found.
          return parent;
        }
      } else {
        // No scrollable parents.
        return false;
      }
    };

    const overlap = function (rect1Left, rect1Top, rect2Left, rect2Top, size = 17) {
      // Yes this looks like intersect const, but it's math not browser offsets.
      return !(rect1Left + size < rect2Left ||
        rect1Left > rect2Left + size ||
        rect1Top + size < rect2Top ||
        rect1Top > rect2Top + size);
    };

    // Applies parameters and avoids other widgets.
    Ed11y.alignPanel = function () {
      if (!Ed11y.panelElement) {
        return false;
      }
      if (Ed11y.options.panelPinTo === 'left') {
        Ed11y.panel.classList.add('ed11y-pin-left');
      }
      let xMost = 0;
      let yMost = 0;
      if (Ed11y.elements.panelPin) {
        Ed11y.elements.panelPin.forEach(el => {
          let bounds = el.getBoundingClientRect();
          if (Ed11y.options.panelPinTo === 'right') {
            xMost = windowWidth - bounds.left > xMost && bounds.left > windowWidth / 3 ? windowWidth - bounds.left : xMost;
          } else {
            xMost = bounds.right > xMost && xMost + bounds.right < windowWidth / 3 ? xMost + bounds.right : xMost;
          }
          yMost = bounds.height > yMost && bounds.height + yMost < window.innerHeight / 2 ? yMost + bounds.height : yMost;
        });
      }
      if (xMost > 0 && xMost < windowWidth - 240) {
        // push off horizontal
        Ed11y.panelElement.style.setProperty(Ed11y.options.panelPinTo, xMost + 10 + 'px');
        Ed11y.panelElement.style.setProperty('bottom', Ed11y.options.panelOffsetY);
      } else if (xMost > 0 && xMost > windowWidth - 240 && yMost > 0) {
        // push off vertical
        Ed11y.panelElement.style.setProperty(Ed11y.options.panelPinTo, Ed11y.options.panelOffsetX);
        Ed11y.panelElement.style.setProperty('bottom', `calc(${Ed11y.options.panelOffsetY} + ${yMost}px)`);
      } else {
        // no push
        Ed11y.panelElement.style.setProperty(Ed11y.options.panelPinTo, Ed11y.options.panelOffsetX);
        Ed11y.panelElement.style.setProperty('bottom', Ed11y.options.panelOffsetY);
      }
    };

    Ed11y.alignButtons = function () {

      if (Ed11y.jumpList.length === 0 || (Ed11y.openTip.button && Ed11y.scrollPending === 0)) {
        return;
      }
      Ed11y.alignPending = true;

      // Reading and writing in a loop creates paint thrashing.
      // We iterate the array for reads, then iterate for writes.

      // Used for crude intersection detection.
      let previousNudgeTop = 0;
      let previousNudgeLeft = 0;
      const scrollTop = window.scrollY;
      if (!Ed11y.options.inlineAlerts) {
        // Compute based on target position.

        Ed11y.jumpList.forEach((mark, i) => {
          if (!mark.result.element.isConnected) {
            // Something broke; rebuild jumplist on next loop.
            Ed11y.forceFullCheck = true;
            Ed11y.interaction = true;
            mark.style.display = 'none';
          } else {
            //mark.visibility = 'visible';
          }
          let targetOffset = mark.result.element.getBoundingClientRect();

          let top = targetOffset.top + scrollTop;
          //let rightBound = windowWidth;
          if (!Ed11y.visible(mark.result.element)) {
            // Invisible target.
            const firstVisibleParent = Ed11y.firstVisibleParent(mark.result.element);
            targetOffset = firstVisibleParent ? firstVisibleParent.getBoundingClientRect() : targetOffset;
            top = targetOffset.top + scrollTop;
          }
          let left = targetOffset.left;
          // TD TD different?
          if (mark.result.element.tagName === 'IMG') {
            top = top + 10;
            left = left + 10;
          } else {
            left = Ed11y.options.inlineAlerts ? left - 34 : left;
          }
          if (mark.result.scrollableParent) {
            // Bump alerts that would be X-position out of a scroll zone.
            Ed11y.jumpList[i].bounds = mark.result.scrollableParent.getBoundingClientRect();
            if (left < Ed11y.jumpList[i].bounds.left) {
              left = Ed11y.jumpList[i].bounds.left;
            } else if (left + 40 > Ed11y.jumpList[i].bounds.right) {
              left = Ed11y.jumpList[i].bounds.right - 40;
            }
          }
          Ed11y.jumpList[i].targetOffset = targetOffset;
          Ed11y.jumpList[i].markTop = top;
          Ed11y.jumpList[i].markLeft = left;
        });
      } else {
        // Compute based on self position.

        // Clear old transforms first. Batch write first...
        Ed11y.jumpList.forEach((mark) => {
          // Reset positions.
          mark.style.setProperty('transform', null);
          mark.style.setProperty('top', 'initial');
          mark.style.setProperty('left', 'initial');
          if (mark.style.transform) {
            const computedStyle = window.getComputedStyle(mark);
            let matrix = computedStyle.getPropertyValue('transform');
            matrix = matrix.split(',');
            mark.xOffset = parseFloat(matrix[4]);
            mark.yOffset = parseFloat(matrix[5]);
          }
          else {
            mark.xOffset = 0;
            mark.yOffset = 0;
          }
        });
        // ...then batch read new positions.
        Ed11y.jumpList.forEach((mark) => {
          mark.markOffset = mark.getBoundingClientRect();
          mark.markLeft = mark.markOffset.left;
          mark.markTop = mark.markOffset.top;
        });
      }


      // Check for overlaps, then write out transforms.
      Ed11y.jumpList.forEach((mark, i) => {

        // Now check for any needed nudges
        let nudgeTop = 10;
        let nudgeLeft = mark.result.element.tagName === 'IMG' ? 10 : -34;
        // Detect tip that overlaps with previous result.
        if (mark.markTop + scrollTop < 0) {
          // Offscreen to top.
          nudgeTop = (-1 * (mark.markTop + scrollTop)) - 6;
        }
        if (
          (i > 0 && overlap(mark.markLeft, mark.markTop, Ed11y.jumpList[i - 1].markLeft, Ed11y.jumpList[i - 1].markTop)) ||
          (i > 1 && overlap(mark.markLeft, mark.markTop, Ed11y.jumpList[i - 2].markLeft, Ed11y.jumpList[i - 2].markTop)) ||
          (i > 2 && overlap(mark.markLeft, mark.markTop, Ed11y.jumpList[i - 3].markLeft, Ed11y.jumpList[i - 3].markTop))
        ) {
          // todo postpone: compute actual overlap? We're bouncing by the full amount no matter what which adds too much gapping.
          nudgeTop = nudgeTop + 14 + previousNudgeTop;
          nudgeLeft = 14 + previousNudgeLeft;
        }

        let constrainLeft = 0;
        let constrainRight = windowWidth;

        if (mark.result.scrollableParent) {
          const constrained = mark.result.scrollableParent.getBoundingClientRect();
          constrainLeft = constrained.left;
          constrainRight = constrainLeft + constrained.width;
        }

        let needNudge = false;
        if (mark.markLeft + nudgeLeft - constrainLeft < 44) {
          // Offscreen to left. push to the right.
          nudgeLeft = 44 - mark.markLeft + nudgeLeft + constrainLeft;
          needNudge = true;
          //nudgeMark(mark, 44 - mark.markLeft + nudgeLeft, nudgeTop);
        }
        else if (mark.markLeft + nudgeLeft + 80 > constrainRight) {
          needNudge = true;
          // Offscreen to right. push to the left
          nudgeLeft = constrainRight - nudgeLeft - mark.markLeft - 100;
        }
        else if (nudgeTop !== 0) {
          needNudge = true;
        }
        if (!Ed11y.options.inlineAlerts) {
          if (needNudge) {
            mark.style.transform = `translate(${mark.markLeft + nudgeLeft}px, ${mark.markTop + nudgeTop}px)`;
          } else {
            mark.style.transform = `translate(${mark.markLeft}px, ${mark.markTop}px)`;
          }

        } else {
          nudgeMark(mark, nudgeLeft, nudgeTop);
        }
        mark.nudgeLeft = nudgeLeft;
        mark.nudgeTop = nudgeTop;
        previousNudgeTop = nudgeTop;
        previousNudgeLeft = nudgeLeft;
      });

      // Last pass: check for elements offscreen within scrollable areas.
      if (!Ed11y.options.inlineAlerts) {
        // Alerts have to be positioned relative to viewport.
        Ed11y.jumpList.forEach(mark => {

          if (mark.result.scrollableParent) {
            // Hide alerts outside a scroll zone.
            if (!!mark.bounds && (mark.targetOffset.top - mark.bounds.top < 0 || mark.targetOffset.top - mark.bounds.bottom > 0) && !mark.matches(':focus, :focus-within, [data-ed11y-open="true"]')) {
              // Tip has exited scrollable parent. Visually hide.
              mark.classList.add('ed11y-offscreen');
              mark.style.transform = 'translate(0px, -50px)';
              mark.style.pointerEvents = 'none';
              if (mark.getAttribute('data-ed11y-open') === 'true') {
                mark.setAttribute('data-ed11y-action', 'shut');
              }
            }
            else {
              mark.classList.remove('ed11y-offscreen');
              mark.style.pointerEvents = 'auto';
            }
          }
          else {
            mark.classList.remove('ed11y-offscreen');
            mark.style.pointerEvents = 'auto';
          }

        });
      }
      Ed11y.jumpList?.forEach(mark => {
        // Now make visible.
        // todo: Edge still flickers on redraw.
        mark.classList.remove('ed11y-preload');
      });

    };


    Ed11y.paintReady = function () {

      for (const [key, value] of Object.entries(Ed11y.theme)) {
        document.documentElement.style.setProperty('--ed11y-' + key, value);
      }

      if (document.querySelector('body')) {
        // May be redundant, but preloads unbundled files.
        Ed11y.attachCSS(document.querySelector('body'));
      }

      Ed11y.roots.forEach((root) => {
        // Shadow elements don't inherit styles, so they need their own copy.
        if (Ed11y.options.shadowComponents) {
          root.querySelectorAll(Ed11y.options.shadowComponents)?.forEach((shadowHost) => {
            if (shadowHost.shadowRoot) {
              Ed11y.attachCSS(shadowHost.shadowRoot);
            }
          });
        }
      });
      Ed11y.bodyStyle = true;
    };

    Ed11y.alignTip = function (button, toolTip, recheck = 0, reveal = false) {
      if (!toolTip) {
        return;
      }

      let arrow = toolTip.shadowRoot.querySelector('.arrow');
      let tip = arrow.nextElementSibling;
      let loopCount = recheck - 1;

      // Various hiddenHandlers may cause element to animate open.
      if (recheck > 0) {
        window.setTimeout(function () {
          requestAnimationFrame(() => Ed11y.alignTip(button, toolTip, loopCount, reveal));
        }, 200 / loopCount, button, toolTip, loopCount, reveal);
      }
      if (reveal) {
        window.setTimeout(() => {
          toolTip.style.setProperty('opacity', '1');
          // 140 seems to be the minimum to not flash.
        }, 140, toolTip, tip);
      }

      const mark = button.getRootNode().host;
      const resultNum = button.dataset.ed11yResult;
      const result = Ed11y.results[resultNum];

      // Find button on page
      const scrollTop = window.scrollY;
      let leftAdd = Ed11y.options.inlineAlerts ? window.scrollX : 0;

      let buttonOffset = button.getBoundingClientRect();
      let buttonSize = buttonOffset.width;
      let buttonLeft = buttonOffset.left + leftAdd;
      let buttonTop = buttonOffset.top + scrollTop;

      let containTop = scrollTop;
      let containLeft = 0;
      let containWidth = windowWidth;
      let containBottom = window.innerHeight + scrollTop;
      let absoluteBottom = containBottom;

      if (!Ed11y.options.inlineAlerts && result.scrollableParent) {
        let bounds = result.scrollableParent.getBoundingClientRect();
        if (bounds.width > 0) {
          //buttonTop = buttonTop + result.scrollableParent.scrollTop;
          containLeft = Math.max(0, bounds.left);
          containWidth = Math.min(containWidth, bounds.width - 30);
          containBottom = bounds.bottom + scrollTop;
          containTop = bounds.top + scrollTop;
          absoluteBottom = bounds.top + result.scrollableParent.scrollHeight;
        }
      } else if (mark.dataset.ed11yHiddenResult === 'true' || !(Ed11y.visible(mark) || buttonOffset.top === 0 && buttonOffset.left === 0)) {
        // ruh roh invisible button
        // todo: use the not-inline drawing pattern for invisible targets?
        const firstVisibleParent = Ed11y.firstVisibleParent(mark.result.element);
        if (firstVisibleParent) {
          buttonOffset = firstVisibleParent.getBoundingClientRect();
          buttonLeft = buttonOffset.left;
          buttonTop = buttonOffset.top;
        } else {
          tip.style.setProperty('max-width', 'none');
        }
        // Estimate from font when it can't be measured.
        buttonSize = windowWidth > 800 ? 38 : 33;
      }
      // Set wrapper for CSS.
      //tip.closest('.ed11y-wrapper').style.setProperty('width', buttonSize + 'px');
      //tip.closest('.ed11y-wrapper').style.setProperty('height', buttonSize + 'px');
      document.documentElement.style.setProperty('--ed11y-buttonWidth', buttonSize + 'px');
      tip.style.setProperty('max-width', `min(${containWidth > 280 ? containWidth : 280}px, 90vw)`);
      const containRight = Math.min(windowWidth, containLeft + containWidth);
      toolTip.style.setProperty('top', buttonOffset.top + scrollTop + 'px');
      toolTip.style.setProperty('left', buttonOffset.left + leftAdd + 'px');
      const tipWidth = tip.offsetWidth;
      const tipHeight = tip.offsetHeight;

      let direction = 'under';

      // Default to displaying under
      if (buttonTop === 0 && buttonLeft === 0) {
        direction = 'whompwhomp';
      } else if (buttonTop + tipHeight + scrollTop + buttonSize + 22 > containBottom) {
        // It won't fit under. Look elsewhere.
        if (containRight > buttonSize + tipWidth + buttonLeft + 30 &&
          containTop + tipHeight + 30 < containBottom) {
          direction = 'right';
        } else if (buttonTop - tipHeight - 15 > containTop) {
          direction = 'above';
        } else if (containLeft < buttonLeft - (buttonSize + tipWidth + 30) &&
          containTop + tipHeight + 30 < containBottom) {
          direction = 'left';
        } else if (buttonTop + tipHeight + buttonSize > absoluteBottom) {
          // It REALLY doesn't fit below.
          direction = 'above';
        }
        // Back to default.
      } // else: under.
      arrow.dataset.direction = direction;

      let nudgeX = 0;
      let nudgeY = 0;

      const align = function (container, alignTo, size, direction) {
        let over = container - (alignTo + size + buttonSize);
        if (over < 0) {
          if (direction === 'horizontal' && alignTo + over < 0) {
            // Prevent left edge overshoot.
            return Math.max(0 - alignTo, 4 - size);
          }
          return Math.max(over, buttonSize + 10 - size);
        }
        return 0;

      };

      switch (direction) {
        case 'under':
          nudgeX = align(containRight, buttonLeft, tipWidth, 'horizontal');
          arrow.style.setProperty('top', buttonSize + 'px');
          arrow.style.setProperty('right', 'auto');
          arrow.style.setProperty('bottom', 'auto');
          arrow.style.setProperty('left', buttonSize / 2 - 10 + 'px');
          tip.style.setProperty('top', buttonSize + 10 + 'px');
          tip.style.setProperty('right', 'auto');
          tip.style.setProperty('bottom', 'auto');
          tip.style.setProperty('left', '-4px');
          break;
        case 'above':
          nudgeX = align(containRight, buttonLeft, tipWidth, 'horizontal');
          arrow.style.setProperty('top', 'auto');
          arrow.style.setProperty('right', 'auto');
          arrow.style.setProperty('bottom', '2px');
          arrow.style.setProperty('left', buttonSize / 2 - 10 + 'px');
          tip.style.setProperty('top', 'auto');
          tip.style.setProperty('right', 'auto');
          tip.style.setProperty('bottom', '12px');
          tip.style.setProperty('left', '-4px');
          break;
        case 'right':
          nudgeY = align(containBottom, buttonTop, tipHeight, 'vertical');
          arrow.style.setProperty('top', buttonSize / 2 - 10 + 'px');
          arrow.style.setProperty('right', 'auto');
          arrow.style.setProperty('bottom', 'auto');
          arrow.style.setProperty('left', buttonSize + 'px');
          tip.style.setProperty('top', '-4px');
          tip.style.setProperty('right', 'auto');
          tip.style.setProperty('bottom', 'auto');
          tip.style.setProperty('left', buttonSize + 10 + 'px');
          break;
        case 'left':
          nudgeY = align(containBottom, buttonTop, tipHeight, 'vertical');
          arrow.style.setProperty('top', buttonSize / 2 - 10 + 'px');
          arrow.style.setProperty('right', '0');
          arrow.style.setProperty('bottom', 'auto');
          arrow.style.setProperty('left', 'auto');
          tip.style.setProperty('top', '-4px');
          tip.style.setProperty('right', '10px');
          tip.style.setProperty('bottom', 'auto');
          tip.style.setProperty('left', 'auto');
          break;
        case 'whompwhomp':
          nudgeY = align(containBottom, buttonTop, tipHeight, 'horizontal');
          arrow.style.setProperty('top', '0');
          arrow.style.setProperty('right', '0');
          arrow.style.setProperty('bottom', '0');
          arrow.style.setProperty('left', '0');
          tip.style.setProperty('top', `calc(50vh - ${tipWidth / 2}px)`);
          tip.style.setProperty('right', 'auto');
          tip.style.setProperty('bottom', 'auto');
          tip.style.setProperty('left', `calc(50vh - ${tipHeight / 2}px)`);
          break;
      }
      if (nudgeX || nudgeY) {
        tip.style.setProperty('transform', `translate(${nudgeX}px, ${nudgeY}px)`);
      } else {
        tip.style.setProperty('transform', 'none');
      }
      Ed11y.alignHighlights();
    };

    Ed11y.togglePanel = function () {
      Ed11y.ignoreAll = false;

      if (!Ed11y.doubleClickPrevent) {
        // Prevent clicks piling up while scan is running.
        if (Ed11y.running !== true) {
          Ed11y.running = true;
          // Re-scan each time the panel reopens.
          if (Ed11y.panel.classList.contains('ed11y-shut') === true) {
            Ed11y.onLoad = false;
            Ed11y.incremental = false;
            Ed11y.showPanel = true;
            if (Ed11y.dismissedCount > 0 && Ed11y.warningCount === 0 && Ed11y.errorCount === 0) {
              Ed11y.options.showDismissed = false;
              Ed11y.toggleShowDismissals();
            } else {
              Ed11y.checkAll();
            }
            Ed11y.options.userPrefersShut = false;
            localStorage.setItem('editoria11yShow', '1');
          }
          else {
            Ed11y.panelToggleTitle.textContent = Ed11y.totalCount > 0 ? Ed11y.M.buttonShowAlerts : Ed11y.M.buttonShowNoAlert;
            Ed11y.options.showDismissed = false;
            Ed11y.reset();
            Ed11y.options.userPrefersShut = true;
            localStorage.setItem('editoria11yShow', '0');
          }
        }
      }
      Ed11y.doubleClickPrevent = true;
      window.setTimeout(function () {
        Ed11y.doubleClickPrevent = false;
      }, 200);
      return false;
    };

    const showHeadingsPanel = function () {
      // Visualize the document outline

      let panelOutline = Ed11y.panel.querySelector('#ed11y-outline');

      if (Ed11y.headingOutline.length) {
        panelOutline.innerHTML = '';
        Ed11y.headingOutline.forEach((el, i) => {
          // Todo: draw these in editable mode.
          if (Ed11y.options.inlineAlerts) {
            let mark = document.createElement('ed11y-element-heading-label');
            mark.classList.add('ed11y-element', 'ed11y-element-heading');
            mark.dataset.ed11yHeadingOutline = i.toString();
            mark.setAttribute('id', 'ed11y-heading-' + i);
            mark.setAttribute('tabindex', '-1');
            // Array: el, level, outlinePrefix
            el[0].insertAdjacentElement('afterbegin', mark);
            Ed11y.attachCSS(mark.shadowRoot);
          }
          let level = el[1];
          let leftPad = 10 * level - 10;
          let li = document.createElement('li');
          li.classList.add('level' + level);
          li.style.setProperty('margin-left', leftPad + 'px');
          let levelPrefix = document.createElement('strong');
          levelPrefix.textContent = `H${level}: `;
          let userText = document.createElement('span');
          userText.textContent = Ed11y.computeText(el[0]);
          let link = document.createElement('a');
          if (Ed11y.options.inlineAlerts) {
            link.setAttribute('href', '#ed11y-heading-' + i);
            li.append(link);
            link.append(levelPrefix);
            link.append(userText);
          } else {
            li.append(levelPrefix);
            li.append(userText);
          }
          if (el[2]) { // Has an error message
            let type = !el[3] ? 'ed11y-error' : 'ed11y-warning';
            li.classList.add(type);
            let message = document.createElement('em');
            message.classList.add('ed11y-small');
            message.textContent = ' ' + el[2];
            if (Ed11y.options.inlineAlerts) {
              link.append(message);
            } else {
              li.append(message);
            }
          }
          panelOutline.append(li);
        });
      } else {
        panelOutline.innerHTML = '<p><em>No heading structure found.</em></p>';
      }
    };

    Ed11y.alignAlts = function () {
      // Positions alt label to match absolute, inline or floated images.
      Ed11y.findElements('altMark', 'ed11y-element-alt');
      Ed11y.elements.altMark?.forEach((el) => {
        let id = el.dataset.ed11yImg;
        el.style.setProperty('transform', null);
        el.style.setProperty('height', null);
        el.style.setProperty('width', null);

        let img = Ed11y.imageAlts[id][0];
        if (img.tagName !== 'IMG') {
          // Mark is placed outside the link in linked images.
          img = img.querySelector('img');
        }
        let markOffset = el.getBoundingClientRect();
        let imgOffset = img.getBoundingClientRect();
        let newOffset = imgOffset.left - markOffset.left;
        let height = getComputedStyle(img).height;
        height = height === 'auto' ? img.offsetHeight : Math.max(img.offsetHeight, parseInt(height));
        el.style.setProperty('transform', `translate(${newOffset}px, 0px)`);
        el.style.setProperty('height', `${height}px`);
        el.style.setProperty('width', `${img.offsetWidth}px`);
      });
    };

    const showAltPanel = function () {
      // visualize image alts
      let altList = Ed11y.panel.querySelector('#ed11y-alt-list');

      if (Ed11y.imageAlts.length) {
        altList.innerHTML = '';
        Ed11y.imageAlts.forEach((el, i) => {
          // el[el, src, altLabel, altStyle]

          if (Ed11y.options.inlineAlerts) {
            // Label images
            let mark = document.createElement('ed11y-element-alt');
            mark.classList.add('ed11y-element');
            mark.dataset.ed11yImg = i.toString();
            el[0].insertAdjacentElement('beforebegin', mark);
          }

          // Build alt list in panel
          let userText = document.createElement('span');
          userText.textContent = el[2];
          let li = document.createElement('li');
          li.classList.add(el[3]);
          let img = document.createElement('img');
          img.setAttribute('src', el[1]);
          img.setAttribute('alt', '');
          li.append(img);
          li.append(userText);
          altList.append(li);
        });
        Ed11y.alignAlts();
      } else {
        const noImages = document.createElement('p');
        const noItalic = document.createElement('em');
        noItalic.textContent = Ed11y.M.noImagesFound;
        noImages.appendChild(noItalic);
        altList.innerHTML = '';
        altList.appendChild(noImages);
      }
    };
    Ed11y.visualizing = false;
    Ed11y.visualize = function () {
      if (!Ed11y.panel) {
        return;
      }
      if (Ed11y.visualizing) {
        Ed11y.visualizing = false;
        Ed11y.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = Ed11y.M.buttonToolsContent;
        Ed11y.panel.querySelector('#ed11y-visualize').setAttribute('data-ed11y-pressed', 'false');
        Ed11y.panel.querySelector('#ed11y-visualizers').setAttribute('hidden', 'true');
        Ed11y.findElements('reset', 'ed11y-element-heading-label, ed11y-element-alt');
        Ed11y.elements.reset?.forEach(el => { el.remove(); });
        return;
      }
      Ed11y.pauseObservers();
      Ed11y.visualizing = true;
      Ed11y.panel.querySelector('#ed11y-visualize .ed11y-sr-only').textContent = Ed11y.M.buttonToolsActive;
      Ed11y.panel.querySelector('#ed11y-visualize').setAttribute('data-ed11y-pressed', 'true');
      Ed11y.panel.querySelector('#ed11y-visualizers').removeAttribute('hidden');
      showAltPanel();
      showHeadingsPanel();
      Ed11y.resumeObservers();
    };

    Ed11y.buildJumpList = function () {

      Ed11y.jumpList = [];
      Ed11y.pauseObservers();

      // Initial alignment to get approximate Y position order for jump list.
      Ed11y.results.forEach((result, i) => {
        let top = result.element.getBoundingClientRect().top;
        if (!top) {
          const visibleParent = Ed11y.firstVisibleParent(result.element);
          if (visibleParent) {
            top = visibleParent.getBoundingClientRect().top;
          }
        }
        top = top + window.scrollY;
        Ed11y.results[i].scrollableParent = closestScrollable(result.element);
        if (Ed11y.results[i].scrollableParent) {
          // Group these together.
          top = top * 0.000001;
        }
        Ed11y.results[i].sortPos = top;
      });
      // Sort from bottom to top so focus order after insert is top to bottom.
      Ed11y.results.sort((a, b) => b.sortPos - a.sortPos);

      Ed11y.results?.forEach(function (result, i) {
        if (!Ed11y.results[i].dismissalStatus || Ed11y.options.showDismissed) {
          Ed11y.result(result, i);
        }
      });
      Ed11y.jumpList.forEach((el, i) => {
        el.dataset.ed11yJumpPosition = `${i}`;
        const newLabel = `${el.shadowRoot.querySelector('.toggle').getAttribute('aria-label')}, ${i + 1} / ${Ed11y.jumpList.length - 1}`;
        el.shadowRoot.querySelector('.toggle').setAttribute('aria-label', newLabel);
      });
      let tipsPainted = new CustomEvent('ed11yResultsPainted');
      document.dispatchEvent(tipsPainted);
      Ed11y.resumeObservers();
    };

    // hat tip https://www.joshwcomeau.com/snippets/javascript/debounce/
    let browserSpeed = 1;
    Ed11y.browserLag = 0; // Scale debounce based on browser performance.
    const debounce = (callback, wait) => {
      let timeoutId = null;
      return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          callback.apply(null, args);
        }, wait + Ed11y.browserLag);
      };
    };

    const intersect = function (a, b, x = 10) {
      // Compute intersect using browser offsets.
      return (a.left - x <= b.right &&
        b.left - x <= a.right &&
        a.top - x <= b.bottom &&
        b.top - x <= a.bottom);
    };

    Ed11y.activeRange = false;
    const rangeChange = function () {
      let anchor = getSelection()?.anchorNode;
      const expandable = anchor &&
        anchor.parentNode &&
        typeof anchor.parentNode === 'object' &&
        typeof anchor.parentNode.matches === 'function';
      if (!anchor || expandable &&
        (anchor.parentNode.matches(Ed11y.options.checkRoots) ||
          (!anchor.parentNode.matches(Ed11y.options.checkRoots) && anchor.parentNode.matches('div[contenteditable="true"]')
          )
        )
      ) {
        Ed11y.activeRange = false;
        return false;
      }
      // todo: this if is probably redundant?
      if (expandable) {
        const closest = anchor.parentNode.closest('p, td, th, li, h2, h3, h4, h5, h6');
        if (closest) {
          anchor = closest;
        }
      }
      const range = document.createRange();
      if (typeof anchor === 'object') {
        range.setStartBefore(anchor);
        range.setEndAfter(anchor);
      }
      if (typeof range !== 'object' || typeof range.getBoundingClientRect !== 'function') {
        if (Ed11y.activeRange) {
          Ed11y.activeRange = false;
          return true;
        } else {
          return false;
        }
      } else {
        let sameRange = Ed11y.activeRange &&
          range.startContainer === Ed11y.activeRange.startContainer &&
          range.startOffset === Ed11y.activeRange.startOffset;
        Ed11y.activeRange = range;
        return !sameRange;
      }
    };

    /**
     * Hide tips that are in front of text currently being edited.
     * */
    Ed11y.checkEditableIntersects = function () {
      if (!document.querySelector('[contenteditable]:focus, [contenteditable] :focus')) {
        //Reset classes to measure.
        Ed11y.jumpList?.forEach((el) => {
          el.classList.remove('intersecting');
        });
        return;
      }
      if (!Ed11y.activeRange) {
        // Range isn't on a node we can measure.
        Ed11y.jumpList?.forEach((el) => {
          el.classList.remove('intersecting');
        });
        return;
      }
      Ed11y.jumpList?.forEach((el) => {
        const toggle = el.shadowRoot.querySelector('.toggle');
        if (intersect(Ed11y.activeRange.getBoundingClientRect(), toggle.getBoundingClientRect(), 0)) {
          if (!toggle.classList.contains('was-intersecting')) {
            el.classList.add('intersecting');
            toggle.classList.add('intersecting');
          }
        } else {
          el.classList.remove('intersecting', 'was-intersecting');
          toggle.classList.remove('intersecting', 'was-intersecting');
        }
      });
    };

    let scrollTicking = false;
    Ed11y.scrollPending = 0;
    Ed11y.updateTipLocations = () => {
      if (!scrollTicking && Ed11y.scrollPending > 0 && !Ed11y.running && Ed11y.jumpList && Ed11y.open) {
        scrollTicking = true;
        Ed11y.alignButtons();
        if (Ed11y.openTip.tip) {
          Ed11y.alignTip(Ed11y.openTip.button.shadowRoot.querySelector('button'), Ed11y.openTip.tip);
        }
        Ed11y.scrollPending--;
      }
      scrollTicking = false;
      if (Ed11y.scrollPending > 0) {
        requestAnimationFrame(() => Ed11y.updateTipLocations());
      }
    };

    Ed11y.intersectionObservers = function () {

      Ed11y.elements.editable?.forEach(editable => {
        editable.addEventListener('scroll', function () {
          // Align tips when scrolling editable container.
          if (Ed11y.openTip.button) {
            Ed11y.scrollPending = Ed11y.scrollPending < 2 ? Ed11y.scrollPending + 1 : Ed11y.scrollPending;
            requestAnimationFrame(() => Ed11y.updateTipLocations());
          }
        });
      });

      document.addEventListener('scroll', function () {
        // Trigger on scrolling other containers, unless it will flicker a tip.
        if (!Ed11y.options.inlineAlerts && !Ed11y.openTip.button) {
          Ed11y.scrollPending = Ed11y.scrollPending < 2 ? Ed11y.scrollPending + 1 : Ed11y.scrollPending;
          requestAnimationFrame(() => Ed11y.updateTipLocations());
        } else if (Ed11y.openTip.button) {
          Ed11y.alignTip(Ed11y.openTip.button.shadowRoot.querySelector('button'), Ed11y.openTip.tip);
        }
      }, true);

      Ed11y.selectionChanged = debounce(() => {
        if (rangeChange()) {
          Ed11y.updateTipLocations();
          Ed11y.checkEditableIntersects();
        }
      }, 100);

      document.addEventListener('selectionchange', function () {
        if (!Ed11y.running) {
          Ed11y.selectionChanged();
        }
      });
    };

    Ed11y.recentlyAddedNodes = new WeakMap();
    Ed11y.addedNodeReadyToCheck = function (el) {
      if (!Ed11y.recentlyAddedNodes.has(el)) {
        return true;
      }
      const hasText = el.textContent.trim().length;
      if ((!hasText && Ed11y.recentlyAddedNodes.get(el) > Date.now() - 5000) ||
        Ed11y.activeRange && el.contains(Ed11y.activeRange.startContainer)) {
        // Do not check recent nodes if they are empty or selected.
        return false;
      } else if (el.matches('table') && el.querySelectorAll('td:not(:empty)')) {
        // Only check tables once there is content in a non-heading cell.
        let cumulativeText = '';
        if (hasText) {
          const cells = el.querySelectorAll('td:not(:empty)');
          cells.forEach((cell) => {
            cumulativeText += cell.textContent;
          });
        }
        if (!cumulativeText) {
          return false;
        } else {
          // Text in body cells.
          Ed11y.recentlyAddedNodes.delete(el);
          return true;
        }
      } else {
        // New node is ready for checking.
        Ed11y.recentlyAddedNodes.delete(el);
        return true;
      }
    };

    Ed11y.incrementalAlign = debounce(() => {
      if (!Ed11y.running && !Ed11y.alignPending) {
        Ed11y.scrollPending++;
        Ed11y.updateTipLocations();
        Ed11y.alignPending = false;
      } else {
        Ed11y.incrementalAlign();
      }
    }, 10);
    Ed11y.interaction = false;
    window.addEventListener('keydown', () => {
      Ed11y.interaction = true;
    });
    window.addEventListener('click', () => {
      Ed11y.interaction = true;
    });
    Ed11y.incrementalCheck = debounce(() => {
      if (!Ed11y.running) {
        if (Ed11y.openTip.button || (!Ed11y.interaction && !Ed11y.forceFullCheck)) {
          return;
        }
        Ed11y.interaction = false;
        Ed11y.running = true;
        let runTime = performance.now();
        Ed11y.incremental = true;
        if (Ed11y.disabled && Ed11y.closedByDisable) {
          Ed11y.showPanel = true;
          Ed11y.closedByDisable = false;
          Ed11y.disabled = false;
        }
        //Ed11y.forceFullCheck = true; // todo no
        Ed11y.checkAll();
        window.setTimeout(function () {
          if (Ed11y.visualizing) {
            Ed11y.visualizing = false;
            Ed11y.visualize();
          }
        }, 500);
        // todo: if there are no issues and the heading panel is open...it closes!
        // Increase debounce if runs are slow.
        runTime = performance.now() - runTime;
        browserSpeed = runTime > 10 ? 10 : (browserSpeed + runTime) / 2;
        // Todo: optimize tip placement so we do not need as much debounce.
        Ed11y.browserLag = browserSpeed < 1 ? 0 : browserSpeed * 100 + Ed11y.totalCount;
      } else {
        // Ed11y was running, try again later.
        window.setTimeout(() => { Ed11y.incrementalCheck(); }, 250);
      }
    }, 250);
    Ed11y.slowIncremental = debounce(() => {
      //Ed11y.incrementalAlign(); // Immediately realign tips.
      //Ed11y.alignPending = false;
      Ed11y.interaction = true;
      Ed11y.incrementalCheck();
    }, 1000);

    Ed11y.pauseObservers = function () {
      Ed11y.watching?.forEach(observer => {
        observer.observer.disconnect();
      });
    };
    Ed11y.resumeObservers = function () {
      Ed11y.watching?.forEach(observer => {
        observer.observer.observe(observer.root, observer.config);
      });
    };

    /*
    Set up mutation observer for added nodes.
    */
    const startObserver = function (root) {

      // We don't want to nest or duplicate observers.
      if (typeof root.closest === 'function') {
        // It's a normal tag.
        if (root.closest('[data-editoria11y-observer]')) {
          // We're already being watched.
          return;
        } else {
          root.dataset.editoria11yObserver = 'true';
        }
      } else {
        // Match has DOM traversal issues.
        if (typeof root.host !== 'function' ||
          root.host.dataset.editoria11yObserver !== undefined) {
          // Already watching or something is weird.
          return;
        } else {
          // Observe host instead.
          root.host.dataset.editoria11yObserver = 'true';
        }
      }

      // Options for the observer (which mutations to observe)
      const config = { childList: true, subtree: true, characterData: true };

      const logNode = function (node) {
        /*
        * Newly inserted tables and headings should not be flagged as empty
        * before the user has a chance to edit them. This is crude, but it
        * delays flagging.
        * */
        if (!node || node.nodeType !== 1 || !node.isConnected || node.closest('script, link, head, .ed11y-wrapper, .ed11y-style, .ed11y-element')) {
          return 0;
        }
        if (Ed11y.options.inlineAlerts) {
          return 1;
        }
        if (!node.matches('[contenteditable] *')) {
          return 0;
        }
        if (Ed11y.options.inlineAlerts) {
          return true;
        }
        const searchList = 'table, h1, h2, h3, h4, h5, h6, blockquote';
        if (!Ed11y.options.inlineAlerts &&
          !node.matches(node.matches(searchList)) &&
          node.matches('[contenteditable] *')) {
          if (node.matches('table *')) {
            node = node.closest('table');
          } else if (!node.matches(searchList)) {
            node = node.querySelector(searchList);
          }
        }
        if (node && node.matches(searchList)) {
          Ed11y.recentlyAddedNodes.set(node, Date.now());
          Ed11y.incrementalAlign(); // Immediately realign tips.
          return 0;
        }
        return 1;
      };

      // Create an observer instance linked to the callback function
      const callback = (mutationList) => {
        let align = 0;
        for (const mutation of mutationList) {
          if (mutation.type === 'characterData' &&
            mutation.target.parentElement &&
            mutation.target.parentElement.matches('[contenteditable] *')) {
            Ed11y.incrementalAlign();
            Ed11y.slowIncremental();
            return;
          } else if (mutation.type === 'childList') {
            // Recheck if there are relevant node changes.
            if (mutation.removedNodes.length > 0) {
              align += 1;
            } else if (mutation.addedNodes.length > 0) {
              mutation.addedNodes.forEach(node => {
                align += logNode(node);
              });
            }
          }
        }
        // These are debounced
        if (!align) {
          return;
        }
        window.setTimeout(function () {
          Ed11y.incrementalAlign(); // Immediately realign tips.
          Ed11y.alignPending = false;
          Ed11y.incrementalCheck(); // Recheck after delay.
        }, 0);
      };

      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(callback);
      // Start observing the target node for configured mutations
      observer.observe(root, config);
      Ed11y.watching.push({
        observer: observer,
        root: root,
        config: config,
      });
      document.addEventListener('readystatechange', () => {
        window.setTimeout(function () {
          Ed11y.scrollPending++;
          Ed11y.updateTipLocations();
        }, 100);
      });
      window.setTimeout(function () {
        Ed11y.scrollPending++;
        Ed11y.updateTipLocations();
      }, 1000);
    };

    Ed11y.openTip = {
      button: false,
      tip: false,
    };
    Ed11y.lastOpenTip = -1;

    Ed11y.viaJump = false;
    Ed11y.alertOnInvisibleTip = function (button, target) {
      let delay = 100;
      if (Ed11y.options.hiddenHandlers.length > 0 && !!target.closest(Ed11y.options.hiddenHandlers)) {
        // Increase hesitation before scrolling, in case theme animates open an element.
        delay = 333;
        document.dispatchEvent(new CustomEvent('ed11yShowHidden', {
          detail: { result: button.getAttribute('data-ed11y-result') }
        }));
      }
      const details = target.closest('details');
      if (details && !details.open) {
        details.open = true;
        delay = 333;
      }

      // Scroll into view and throw an alert if the button or target is hidden.
      window.setTimeout((button, target) => {
        Ed11y.message.textContent = '';
        let firstVisible = false;
        let alertMessage;
        if (Ed11y.options.checkVisible && !Ed11y.visible(target)) {
          button.dataset.ed11yHiddenResult = 'true';
          firstVisible = Ed11y.firstVisibleParent(target);
          alertMessage = Ed11y.M.jumpedToInvisibleTip;
        }
        else if (target.closest('[aria-hidden="true"]')) {
          firstVisible = target.closest('[aria-hidden="true"]');
          firstVisible = firstVisible.closest(':not([aria-hidden="true"])');
          alertMessage = Ed11y.M.jumpedToAriaHiddenTip;
        }
        if (firstVisible) {
          // Throw warning that the element cannot be highlighted.
          const tipAlert = Ed11y.openTip.tip?.shadowRoot.querySelector('.ed11y-tip-alert');
          tipAlert.textContent = alertMessage;
          // Todo: confirm we no longer need the panelMessage container.
          /*
          Ed11y.message.textContent = alertMessage;
          Ed11y.hidePanelAlert = Date.now() + 10000; // Set or extend.
          window.setTimeout(function (tip) {
            if (Ed11y.hidePanelAlert < Date.now()) {
              Ed11y.message.textContent = '';
            }
          }, 15000, Ed11y.lastOpenTip);*/
        }
        if (Ed11y.viaJump) {
          let scrollPin = window.innerHeight > 900 || (window.innerWidth > 800 && window.innerHeight > 600) ? 'center' : 'start';
          let scrollTarget = Ed11y.options.inlineAlerts ? button : target;
          if (button.dataset.ed11yHiddenResult || !(Ed11y.visible(scrollTarget))) {
            scrollTarget = Ed11y.firstVisibleParent(target);
          }
          scrollTarget.scrollIntoView({ block: scrollPin, behavior: 'instant' });
        }
        // Todo: following statements work but could be simplified.
        if (!Ed11y.options.inlineAlerts) {
          // todo this selector must match the selector that decides where to place the mark
          Ed11y.editableHighlighter(button.dataset.ed11yResult, true, firstVisible);
        } else {
          if (firstVisible) {
            firstVisible.classList.add('ed11y-hidden-highlight');
          }
        }
        let activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
        if (!activeTip) {
          button.setAttribute('data-ed11y-action', 'open');
          if (Ed11y.viaJump) {
            window.setTimeout(() => {
              // Race conditions are fun.
              let activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
              if (Ed11y.viaJump) {
                activeTip?.shadowRoot.querySelector('.title').focus();
              }
            }, 100);
          }
        } else {
          if (Ed11y.viaJump) {
            window.setTimeout(() => {
              // Race conditions are fun.
              activeTip?.shadowRoot.querySelector('.title').focus();
            }, 100, activeTip);
          }
        }
        Ed11y.viaJump = false;
      }, delay, button, target);
    };

    Ed11y.jumpTo = function (dir = 1) {
      if (!Ed11y.open) {
        return false;
      }
      Ed11y.viaJump = true;
      // Determine target result.
      let goMax = Ed11y.jumpList.length - 1;
      let goNum = Ed11y.lastOpenTip + dir;
      if (goNum < 0) {
        // Reached end of loop or dismissal pushed us out of loop
        Ed11y.nextText = Ed11y.M.buttonFirstContent;
        goNum = goMax;
      } else if (goNum > goMax) {
        goNum = 0;
        Ed11y.nextText = Ed11y.M.buttonNextContent;
      } else {
        Ed11y.nextText = Ed11y.M.buttonNextContent;
      }
      Ed11y.lastOpenTip = goNum;
      window.setTimeout(function () {
        Ed11y.panelJumpNext.querySelector('.ed11y-sr-only').textContent = Ed11y.nextText;
      }, 250);

      Ed11y.resetClass(['ed11y-hidden-highlight']);
      if (!Ed11y.jumpList) {
        Ed11y.buildJumpList();
      }
      // Find next or first result in the dom ordered list of results.
      let goto = Ed11y.jumpList[goNum];
      let result = goto.getAttribute('data-ed11y-result');
      let gotoResult = Ed11y.results[result];
      const target = gotoResult.element;

      // First of two scrollTo calls, to trigger any scroll based events.
      let scrollPin = window.innerHeight > 900 || (window.innerWidth > 800 && window.innerHeight > 600) ? 'center' : 'start';
      let scrollTarget = Ed11y.options.inlineAlerts ? goto : target;
      if (goto.dataset.ed11yHiddenResult || !(Ed11y.visible(scrollTarget))) {
        scrollTarget = Ed11y.firstVisibleParent(target);
      }
      scrollTarget?.scrollIntoView({ block: scrollPin, behavior: 'instant' });

      // Open the button
      goto.setAttribute('data-ed11y-action', 'open');
      Ed11y.scrollPending = 2;
      Ed11y.updateTipLocations();
    };

    Ed11y.windowResize = function () {
      windowWidth = window.innerWidth;
      if (Ed11y.panel?.classList.contains('ed11y-active') === true) {
        Ed11y.alignAlts();
        Ed11y.alignButtons();
      }
      if (Ed11y.openTip.button) {
        Ed11y.alignTip(Ed11y.openTip.button.shadowRoot.querySelector('button'), Ed11y.openTip.tip);
      }
      Ed11y.alignPanel();
    };

    // Move toggles when something expands or collapses.
    const mightExpand = document.querySelectorAll('[aria-expanded], [aria-controls]');
    mightExpand?.forEach(expandable => {
      expandable.addEventListener('click', () => {
        window.setTimeout(() => {
          Ed11y.windowResize();
        }, 333);
      });
    });

    // Escape key closes panels.
    Ed11y.escapeWatch = function (event) {
      if (event.keyCode === 27) {
        if (event.target.closest('ed11y-element-panel') && Ed11y.panelToggle.getAttribute('aria-expanded') === 'true') {
          Ed11y.panelToggle.focus();
          Ed11y.panelToggle.click();
        } else if (event.target.hasAttribute('data-ed11y-open')) {
          if (Ed11y.openTip.button) {
            Ed11y.toggledFrom.focus();
            Ed11y.openTip.button.shadowRoot.querySelector('button').click();
          }
        }
      }
    };
    document.addEventListener('keyup', function (event) { Ed11y.escapeWatch(event); });


    /*=============== Utilities ================*/

    Ed11y.flattenText = function (text) {
      return text.replace(/[\n\r]+|\s{2,}/g, ' ').trim();
    };

    // Gets trimmed and normalized inner text nodes.
    // Use computeText() instead for the full accessible name calculation.
    Ed11y.getText = function (el) {
      return Ed11y.flattenText(el.textContent);
    };

    Ed11y.parents = function (el) {
      let nodes = [];
      nodes.push(el);
      while (el && !!el.parentElement && el.parentElement.tagName !== 'HTML') {
        nodes.push(el.parentElement);
        el = el.parentElement;
      }
      return nodes;
    };

    // Handle aria-label or labelled-by. Latter "wins" and can self-label.
    Ed11y.computeAriaLabel = function (element, recursing = 0) {
      if (Ed11y.options.ignoreAriaOnElements && element.matches(Ed11y.options.ignoreAriaOnElements)) {
        return 'noAria';
      }
      if (Ed11y.options.ignoreTextInElements && element.matches(Ed11y.options.ignoreTextInElements)) {
        return '';
      }

      const labelledBy = element.getAttribute('aria-labelledby');
      if (!recursing && labelledBy) {
        const target = labelledBy.split(/\s+/);
        if (target.length > 0) {
          let returnText = '';
          target.forEach((x) => {
            const targetSelector = document.querySelector(`#${CSS.escape(x)}`);
            returnText += (!targetSelector) ? '' : Ed11y.computeText(targetSelector, 1);
          });
          return returnText;
        }
      }
      if (element.hasAttribute('aria-label') && element.getAttribute('aria-label').trim().length > 0) {
        return element.getAttribute('aria-label');
      }
      return 'noAria';
    };

    Ed11y.wrapPseudoContent = function (el, string) {
      // Get quoted content, avoid inserting URL references.
      // Hat tip Adam Chaboryk

      const getAltText = (content) => {
        if (content === 'none') return '';
        const match = content.includes('url(') || content.includes('image-set(')
          ? content.match(/\/\s*"([^"]+)"/) // Content after slash, e.g. url('image.jpg') / "alt text";
          : content.match(/"([^"]+)"/); // Content between quotes, e.g. "alt text";
        return match ? match[1] : '';
      };
      const before = getAltText(window.getComputedStyle(el, ':before').getPropertyValue('content'));
      const after = getAltText(window.getComputedStyle(el, ':after').getPropertyValue('content'));
      return `${before}${string}${after}`;

    };

    // Sets treeWalker loop to last node before next branch.
    Ed11y.nextTreeBranch = function (tree) {
      for (let i = 0; i < 1000; i++) {
        if (tree.nextSibling()) {
          // Prepare for continue to advance.
          return tree.previousNode();
        }
        // Next node will be in next branch.
        if (!tree.parentNode()) {
          return false;
        }
      }
      return false;
    };

    // Subset of the W3C accessible name algorithm.
    Ed11y.computeText = function (el, recursing = 0, excludeLinkClasses = false) {

      // Return immediately if there is an aria label.
      let hasAria = Ed11y.computeAriaLabel(el, recursing);
      if (hasAria !== 'noAria') {
        return hasAria;
      }

      // Return immediately if there is only a text node.
      let computedText = '';
      if (el.shadowRoot) {
        const shadowChildren = el.shadowRoot.querySelectorAll('*');
        shadowChildren.forEach(child => {
          computedText += Ed11y.computeText(child);
        });
      }
      if (!el.children.length) {
        // Skip treeWalker, only contents are text.
        computedText += Ed11y.wrapPseudoContent(el, el.textContent);
        if (!computedText.trim() && el.hasAttribute('title')) {
          computedText = el.getAttribute('title');
        }
        return recursing ? computedText : computedText.replace(/[\n\r]+|\s{2,}/g, ' ').trim();
      }

      // Otherwise, recurse into children.
      let treeWalker = document.createTreeWalker(
        el,
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
      );

      let addTitleIfNoName = false;
      let aText = false;
      let count = 0;

      walker: while (treeWalker.nextNode()) {
        count++;

        // todo: Sa11y excludes
        if (treeWalker.currentNode.nodeType === Node.TEXT_NODE) {
          if (treeWalker.currentNode.parentNode.tagName !== 'SLOT') {
            computedText += ` ${treeWalker.currentNode.nodeValue}`;
          }
          continue;
        }

        // Jump over ignored link text containers.
        // e.g., "(link opens in new window)"
        if (excludeLinkClasses && treeWalker.currentNode.matches(Ed11y.options.linkIgnoreSelector)) {
          if (!Ed11y.nextTreeBranch(treeWalker)) {
            break walker;
          }
          continue;
        }

        // Use link title as text if there was no text in the link.
        // Todo: in theory this could attach the title to the wrong node.
        if (addTitleIfNoName && !treeWalker.currentNode.closest('a')) {
          if (aText === computedText) {
            computedText += addTitleIfNoName;
          }
          addTitleIfNoName = false;
          aText = false;
        }

        if (treeWalker.currentNode.hasAttribute('aria-hidden') && !(recursing && count < 3)) {
          // Ignore elements and children, except when directly aria-referenced.
          // W3C name calc 2 is more complicated than this, but this is good enough.
          if (!Ed11y.nextTreeBranch(treeWalker)) {
            break walker;
          }
          continue;
        }

        let aria = Ed11y.computeAriaLabel(treeWalker.currentNode, recursing);
        if (aria !== 'noAria') {
          computedText += ' ' + aria;
          if (!Ed11y.nextTreeBranch(treeWalker)) {
            break walker;
          }
          continue;
        }

        switch (treeWalker.currentNode.tagName) {
          case 'STYLE':
          case 'NOSCRIPT':
            // Skip style elements
            if (!Ed11y.nextTreeBranch(treeWalker)) {
              break walker;
            }
            continue;
          case 'IMG':
            if (treeWalker.currentNode.hasAttribute('alt') &&
              !treeWalker.currentNode.matches('[role="presentation"]')) {
              computedText += treeWalker.currentNode.getAttribute('alt');
            }
            continue;
          case 'SVG':
          case 'svg':
            if (treeWalker.currentNode.getAttribute('role') === 'img' && treeWalker.currentNode.hasAttribute('alt')) {
              computedText += Ed11y.wrapPseudoContent(treeWalker.currentNode, treeWalker.currentNode.getAttribute('alt'));
              if (!Ed11y.nextTreeBranch(treeWalker)) {
                break walker;
              }
            }
            continue;
          case 'A':
            if (treeWalker.currentNode.hasAttribute('title')) {
              addTitleIfNoName = treeWalker.currentNode.getAttribute('title');
              aText = computedText;
            } else {
              // Reset
              addTitleIfNoName = false;
              aText = false;
            }
            computedText += Ed11y.wrapPseudoContent(treeWalker.currentNode, '');
            break;
          case 'INPUT':
            computedText += Ed11y.wrapPseudoContent(treeWalker.currentNode, '');
            if (treeWalker.currentNode.hasAttribute('title')) {
              addTitleIfNoName = treeWalker.currentNode.getAttribute('title');
            }
            break;
          case 'SLOT':
            if (treeWalker.currentNode.assignedNodes()) {
              // Slots have specific shadow DOM methods.
              const children = treeWalker.currentNode.assignedNodes();
              children?.forEach(child => {
                if (child.nodeType === Node.ELEMENT_NODE) {
                  computedText += Ed11y.computeText(child);
                } else if (child.nodeType === Node.TEXT_NODE) {
                  computedText += Ed11y.flattenText(child.nodeValue);
                }
              });
            }
            computedText += Ed11y.wrapPseudoContent(treeWalker.currentNode, '');
            break;
          default:
            // Other tags continue as-is.
            computedText += Ed11y.wrapPseudoContent(treeWalker.currentNode, '');
            break;
        }
      }
      // At end of loop, add last title element if need be.
      if (addTitleIfNoName && !aText) {
        computedText += ' ' + addTitleIfNoName;
      }

      computedText = Ed11y.wrapPseudoContent(el, computedText);

      if (!computedText.trim() && el.hasAttribute('title')) {
        return el.getAttribute('title');
      }

      return recursing ? computedText : computedText.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

    };

    Ed11y.resetClass = function (classes) {
      classes?.forEach((el) => {
        let thisClass = el;
        Ed11y.findElements('reset', `.${thisClass}`);
        Ed11y.elements.reset?.forEach(el => {
          el.classList.remove(thisClass);
        });
      });
    };

    // Is this still needed when we use real buttons? getting doubleclick on FF
    Ed11y.keyboardClick = function (event) {
      event.preventDefault();
      let key = event.keyCode;
      switch (key) {
        case 13: // enter
        case 32: // space
          event.target.click();
          break;
      }
    };

    Ed11y.siblings = function (el) {
      if (el.parentNode === null) return [];
      return Array.prototype.filter.call(el.parentNode.children, function (child) {
        return child !== el;
      });
    };

    Ed11y.nextUntil = function (el, selector) {
      // Recursively iterate until match or null is returned.
      let next = el.nextElementSibling;
      if (next) {
        let nextMatch = next.matches(selector);
        if (nextMatch) {
          return next;
        } else {
          next = Ed11y.nextUntil(next, selector);
        }
      }
      return next;
    };

    Ed11y.visibleElement = function (el) {
      // Checks if this element is visible. Used in parent iterators.
      // false is definitely invisible, true requires continued iteration to tell.
      // Todo postpone: Check for offscreen?
      if (el) {
        if (!el.checkVisibility({
          opacityProperty: true,
          visibilityProperty: true,
        })) {
          return false;
        }
        let style = window.getComputedStyle(el);
        return !(el.closest('.sr-only, .visually-hidden') ||
          style.getPropertyValue('z-index') < 0 ||
          (style.getPropertyValue('overflow') === 'hidden' &&
            (el.offsetWidth < 10 ||
              el.offsetHeight < 10)
          )
        );
      }
    };

    Ed11y.visible = function (el) {
      // Recurse element and ancestors to make sure it is visible
      if (!Ed11y.visibleElement(el)) {
        // Element is hidden
        return false;
      } else {
        // Element is not known to be hidden.
        let parents = Ed11y.parents(el);
        let visibleParent = (parent) => Ed11y.visibleElement(parent);
        return parents.every(visibleParent);
      }
    };

    Ed11y.firstVisibleParent = function (el) {
      let parent = el.parentElement;
      if (parent) {
        // Parent exists
        if (!Ed11y.visibleElement(parent)) {
          // Recurse
          parent = Ed11y.firstVisibleParent(parent);
          return parent;
        } else {
          // Element is visible
          return parent;
        }
      } else {
        // No visible parents.
        return false;
      }
    };

    Ed11y.hiddenElementCheck = function (el) {
      // Checks if this element has been removed from the accessibility tree
      let style = window.getComputedStyle(el);
      return !(style.getPropertyValue('display') === 'none' ||
        style.getPropertyValue('visibility') === 'hidden' ||
        el.hasAttribute('aria-hidden') ||
        el.hasAttribute('hidden'));
    };

    Ed11y.elementNotHidden = function (el) {
      // Recurse element and ancestors to make sure it is visible
      if (!Ed11y.hiddenElementCheck(el)) {
        // Element is hidden
        return false;
      } else {
        // Element is not known to be hidden.
        let parents = Ed11y.parents(el);
        let notHiddenParent = (parent) => Ed11y.hiddenElementCheck(parent);
        return parents.every(notHiddenParent);
      }
    };

    Ed11y.parentLink = function (el) {
      return el.closest('a[href]');
    };

    Ed11y.srcMatchesOptions = function (source, option) {
      if (option.length > 0 && source?.length > 0) {
        let selectorArray = option.split(/\s*[\s,]\s*/).map((el) => {
          return '[src*=\'' + el + '\']';
        });
        let selectors = selectorArray.join(', ');
        let finder = Array.from(source);
        return finder.filter((el) => el.matches(selectors));
      } else {
        return [];
      }
    };

    Ed11y.sanitizeForHTML = function (string) {
      let entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
      };
      return String(string).replace(/[&<>"'`=/]/g, function (s) {
        return entityMap[s];
      });
    };

    if (CSS.supports('selector(:has(body))')) {
      Ed11y.initialize();
    } else {
      console.warn(Ed11y.M.consoleNotSupported);
    }
  }
}

class Ed11yElementAlt extends HTMLElement {
  /* global Ed11y */

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.initialized) {
      const shadow = this.attachShadow({ mode: 'open' });
      let altTextWrapper = document.createElement('div');
      altTextWrapper.classList.add('ed11y-wrapper', 'ed11y-alt-wrapper');
      let img = Ed11y.imageAlts[this.dataset.ed11yImg];
      // img[el, src, altLabel, altStyle]

      let altSpan = document.createElement('span');
      altSpan.textContent = img[2];
      altSpan.classList.add(img[3]);
      altTextWrapper.appendChild(altSpan);
      Ed11y.attachCSS(altTextWrapper);
      shadow.appendChild(altTextWrapper);
      this.initialized = true;
    }
  }

}
customElements.define('ed11y-element-alt', Ed11yElementAlt);

class Ed11yElementPanel extends HTMLElement {
  /* global Ed11y */

  constructor() {
    super();
  }

  // todo mvp parameterize
  template() {
    // TODO: CHANGE FROM VISIBILITY TO WIDTH TOGGLES SO FOCUS WORKS
    // Todo: details summary language params
    /* todo: don't switch both label and aria-expanded on show hidden */
    return `
    <div class='ed11y-buttonbar'>
      <button id='ed11y-show-hidden' data-ed11y-pressed='false' hidden>
        <svg aria-hidden="true" class="shown" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="9 0 640 512"><path fill="Currentcolor" d="M288 32c-81 0-146 37-193 81C49 156 17 208 3 244c-3 8-3 17 0 25C17 304 49 356 95 399C142.5 443 207 480 288 480s146-37 193-81c47-44 78-95 93-131c3-8 3-17 0-25c-15-36-46-88-93-131C434 69 369 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35-29 64-64 64c-7 0-14-1-20-3c-6-2-12 2-12 7c.3 7 1 14 3 21c14 51 66 82 118 68s82-66 68-118c-11-42-48-69-89-71c-6-.2-9 6-7 12c2 6 3 13 3 20z"/></svg>
        <svg aria-hidden="true" class="hidden" xmlns="http://www.w3.org/2000/svg" viewBox="39 0 640 512"><path fill="Currentcolor" d="M39 5C28-3 13-1 5 9S-1 35 9 43l592 464c10 8 26 6 34-4s6-26-4-34L526 387c39-41 66-86 78-118c3-8 3-17 0-25c-15-36-46-88-93-131C466 69 401 32 320 32c-68 0-125 26-169 61L39 5zM223 150C249 126 283 112 320 112c80 0 144 65 144 144c0 25-6 48-17 69L408 295c8-19 11-41 5-63c-11-42-48-69-89-71c-6-0-9 6-7 12c2 6 3 13 3 20c0 10-2 20-7 28l-90-71zM373 390c-16 7-34 10-53 10c-80 0-144-65-144-144c0-7 1-14 1-20L83 162C60 191 44 221 35 244c-3 8-3 17 0 25c15 36 46 86 93 131C175 443 239 480 320 480c47 0 89-13 126-33L373 390z"/></svg>
        <span class="ed11y-sr-only"></span>
      </button>
      <button id='ed11y-visualize' data-ed11y-pressed="false" class='ed11y-panel-fa'>
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 10 512 512"><path fill="Currentcolor" d="M152 38c10 9 11 24 2 34l-72 80c-4 5-11 8-17 8s-13-2-18-7L7 113C-2 104-2 88 7 79s25-9 34 0l22 22 55-61c9-10 24-11 34-2zm0 160c10 9 11 24 2 34l-72 80c-4 5-11 8-17 8s-13-2-18-7L7 273c-9-9-9-25 0-34s25-9 35 0l22 22 55-61c9-10 24-11 34-2zM224 96c0-18 14-32 32-32l224 0c18 0 32 14 32 32s-14 32-32 32l-224 0c-18 0-32-14-32-32zm0 160c0-18 14-32 32-32l224 0c18 0 32 14 32 32s-14 32-32 32l-224 0c-18 0-32-14-32-32zM160 416c0-18 14-32 32-32l288 0c18 0 32 14 32 32s-14 32-32 32l-288 0c-18 0-32-14-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
        <span class="ed11y-sr-only"></span>
      </button>
      <div id='ed11y-visualizers' class="content" hidden>
          <details id="ed11y-headings-tab">
              <summary>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M0 96C0 78 14 64 32 64l384 0c18 0 32 14 32 32s-14 32-32 32L32 128C14 128 0 114 0 96zM64 256c0-18 14-32 32-32l384 0c18 0 32 14 32 32s-14 32-32 32L96 288c-18 0-32-14-32-32zM448 416c0 18-14 32-32 32L32 448c-18 0-32-14-32-32s14-32 32-32l384 0c18 0 32 14 32 32z"></path></svg> <span class="summary-title"></span>
              </summary>
              <div class="details">
                  <span class="details-title"></span>
                  <ul id='ed11y-outline'></ul>
              </div>
          </details>
          <details id="ed11y-alts-tab">
            <summary>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 576 512"><path fill="currentColor" d="M160 80l352 0c9 0 16 7 16 16l0 224c0 8.8-7.2 16-16 16l-21 0L388 179c-4-7-12-11-20-11s-16 4-20 11l-52 80-12-17c-5-6-12-10-19-10s-15 4-19 10L176 336 160 336c-9 0-16-7-16-16l0-224c0-9 7-16 16-16zM96 96l0 224c0 35 29 64 64 64l352 0c35 0 64-29 64-64l0-224c0-35-29-64-64-64L160 32c-35 0-64 29-64 64zM48 120c0-13-11-24-24-24S0 107 0 120L0 344c0 75 61 136 136 136l320 0c13 0 24-11 24-24s-11-24-24-24l-320 0c-49 0-88-39-88-88l0-224zm208 24a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg> <span class="summary-title"></span>
            </summary>
            <div class="details">
                <span class="details-title"></span>
                <ul id='ed11y-alt-list'></ul>
            </div>
        </details>
        </div>
      <button type='button' id='ed11y-toggle'><span class="ed11y-sr-only">Show alerts</span><span class="ed11y-toggle-circle"><span class='icon'></span><span class='toggle-count'></span></span></button>
      <button class='ed11y-jump next' data-ed11y-goto='0' aria-haspopup="dialog"><svg class="base-icon" xmlns="http://www.w3.org/2000/svg" width="10" aria-hidden="true" viewBox="0 0 448 512"><path fill="currentColor" d="M64 32C64 14 50 0 32 0S0 14 0 32L0 64 0 368 0 480c0 18 14 32 32 32s32-14 32-32l0-128 64-16c41-10 85-5 123 13c44.2 22 96 25 142 7l35-13c13-5 21-17 21-30l0-248c0-23-24-38-45-28l-10 5c-46 23-101 23-147 0c-35-18-75-22-114-13L64 48l0-16z"></path></svg><svg class="hover-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="11" viewBox="0 -15 90 120"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m30 00 50 50-50 50" stroke-width="18"></path></svg><span class='jump-next ed11y-sr-only'></span></button>
     </div>
    </div>
    <div id="ed11y-message" aria-live="polite"></div>
    `;
  }

  connectedCallback() {
    if (!this.initialized && typeof Ed11y !== 'undefined') {

      this.style.setProperty('outline', '0');
      this.classList.add('ed11y-element');
      const shadow = this.attachShadow({ mode: 'open' });
      const wrapper = document.createElement('aside');
      wrapper.setAttribute('id', 'ed11y-panel');
      //!!wrapper.setAttribute('aria-label', Ed11y.M.panelControls);
      wrapper.classList.add('ed11y-wrapper', 'ed11y-panel-wrapper', 'ed11y-pass', 'ed11y-preload');
      wrapper.innerHTML = this.template();
      shadow.appendChild(wrapper);
      Ed11y.panel = wrapper;
      Ed11y.panelElement = this;
      Ed11y.panelToggle = wrapper.querySelector('#ed11y-toggle');
      Ed11y.panelToggleTitle = wrapper.querySelector('#ed11y-toggle .ed11y-sr-only');
      Ed11y.panelCount = wrapper.querySelector('.toggle-count');
      Ed11y.panelJumpNext = wrapper.querySelector('.ed11y-jump.next');
      Ed11y.panelJumpNext.addEventListener('click', this.jumpTo);
      Ed11y.showDismissed = wrapper.querySelector('#ed11y-show-hidden');
      Ed11y.message = wrapper.querySelector('#ed11y-message');
      const panelTabs = wrapper.querySelectorAll('.ed11y-buttonbar button');
      panelTabs.forEach(tab => {
        // todo: syntax could be shrunk now that these aren't tabs.
        tab.addEventListener('click', this.handleBarClick);
      });
      const altDetails = Ed11y.panel.querySelector('#ed11y-alts-tab');
      const headingDetails = Ed11y.panel.querySelector('#ed11y-headings-tab');
      altDetails.addEventListener('toggle', () => {
        if (altDetails.open && headingDetails.open) {
          headingDetails.removeAttribute('open');
        }
      });
      headingDetails.addEventListener('toggle', () => {
        if (altDetails.open && headingDetails.open) {
          altDetails.removeAttribute('open');
        }
      });
      this.initialized = true;
    }
  }

  jumpTo(event) {
    // Handle jump
    event.preventDefault();
    Ed11y.toggledFrom = event.target.closest('button');
    if (!Ed11y.open) {
      Ed11y.togglePanel();
      window.setTimeout(function () {
        Ed11y.jumpTo(1);
      }, 500);
    } else {
      Ed11y.jumpTo(1);
    }
  }


  handleBarClick(event) {
    event.preventDefault();
    Ed11y.message.textContent = '';
    let id = event.currentTarget.getAttribute('id');
    switch (id) {
      case 'ed11y-toggle':
        Ed11y.togglePanel();
        break;
      case 'ed11y-show-hidden':
        Ed11y.toggleShowDismissals();
        break;
      case 'ed11y-visualize':
        if (!Ed11y.open) {
          Ed11y.togglePanel();
        }
        Ed11y.visualize();
        break;
      default:
        break;
    }
  }
}
customElements.define('ed11y-element-panel', Ed11yElementPanel);

class Ed11yElementHeadingLabel extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    if (!this.initialized) {
      const shadow = this.attachShadow({ mode: 'open' });
      let wrapper = document.createElement('div');
      wrapper.classList.add('ed11y-wrapper', 'ed11y-heading-wrapper');
      let i = this.dataset.ed11yHeadingOutline;
      let result = Ed11y.headingOutline[i];
      wrapper.innerHTML = 'H' + result[1];
      let issues = !!result[2];
      wrapper.classList.add('issue' + issues);
      let fontSize = Math.max(52 - 8 * result[1], 12);
      wrapper.style.setProperty('font-size', fontSize + 'px');
      shadow.appendChild(wrapper);
      this.initialized = true;
    }
  }
}
customElements.define('ed11y-element-heading-label', Ed11yElementHeadingLabel);

class Ed11yElementResult extends HTMLElement {
  /* global Ed11y */
  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.initialized) {
      this.open = false;
      this.racing = false;
      this.style.setProperty('outline', '0px solid transparent');
      const shadow = this.attachShadow({ mode: 'open' });

      // Create this.wrapper with type class
      this.resultID = this.dataset.ed11yResult;
      this.result = Ed11y.results[this.resultID];

      this.wrapper = document.createElement('div');

      this.dismissable = this.result.dismissalKey !== false;
      this.dismissed = !!this.result.dismissalStatus;
      this.wrapper.classList.add('ed11y-wrapper', 'ed11y-result-wrapper');
      this.wrapper.classList.add('ed11y-result');

      // Create tooltip toggle
      this.toggle = document.createElement('button');
      this.toggle.setAttribute('class', 'toggle');
      let label = this.dismissable ? Ed11y.M.toggleManualCheck : Ed11y.M.toggleAlert;
      this.toggle.setAttribute('aria-label', Ed11y.M.toggleAriaLabel(label));
      this.toggle.setAttribute('aria-expanded', 'false');
      this.toggle.setAttribute('aria-haspopup', 'dialog');
      this.toggle.setAttribute('data-ed11y-result', this.dataset.ed11yResult);
      this.toggle.setAttribute('data-ed11y-ready', 'false');
      this.toggle.setAttribute('data-ed11y-race', 'false');
      if (!Ed11y.options.inlineAlerts) {
        this.toggle.style.setProperty('font-size', '16px');
      }
      if (this.dismissed) {
        this.toggle.innerHTML = '<svg aria-hidden="true" width="10" class="hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="Currentcolor" d="M39 5C28-3 13-1 5 9S-1 35 9 43l592 464c10 8 26 6 34-4s6-26-4-34L526 387c39-41 66-86 78-118c3-8 3-17 0-25c-15-36-46-88-93-131C466 69 401 32 320 32c-68 0-125 26-169 61L39 5zM223 150C249 126 283 112 320 112c80 0 144 65 144 144c0 25-6 48-17 69L408 295c8-19 11-41 5-63c-11-42-48-69-89-71c-6-0-9 6-7 12c2 6 3 13 3 20c0 10-2 20-7 28l-90-71zM373 390c-16 7-34 10-53 10c-80 0-144-65-144-144c0-7 1-14 1-20L83 162C60 191 44 221 35 244c-3 8-3 17 0 25c15 36 46 86 93 131C175 443 239 480 320 480c47 0 89-13 126-33L373 390z"/></svg>';
        this.toggle.classList.add('dismissed');
        if (this.result.dismissalStatus !== 'ok') {
          this.toggle.classList.add('notok');
        } else {
          this.toggle.classList.add('ok');
        }
      } else if (this.dismissable) {
        this.toggle.classList.add('dismissable');
      }
      this.wrapper.appendChild(this.toggle);
      this.toggle.addEventListener('click', this.toggleClick);
      this.toggle.addEventListener('focus', this.handleFocus);
      this.toggle.addEventListener('mouseover', this.handleHover);
      this.tipNeedsBuild = true;

      Ed11y.attachCSS(this.wrapper);

      shadow.appendChild(this.wrapper);
      this.initialized = true;
    }
  }

  handleHover(event) {
    event.preventDefault();
    let host = this.getRootNode().host;
    if (!this.classList.contains('intersecting') && host.open !== true && host.racing === false) {
      this.open = true;
      host.racing = true;
      host.toggleTip(true);
      Ed11y.toggledFrom = this;
      window.setTimeout(function () {
        host.racing = false;
      }, 250, host);
    }
  }

  handleFocus() {
    let host = this.getRootNode().host;
    if (this.getRootNode().host.classList.contains('ed11y-offscreen')) {
      host.result.element.scrollIntoView();
      Ed11y.alignButtons();
    }
  }

  toggleClick(event) {
    event.preventDefault();
    let host = this.getRootNode().host;
    // Todo: extremely fast clicks throw TypeError: e is null
    if (host.racing === false) {
      host.racing = true;
      Ed11y.toggledFrom = this;
      let stateChange = host.getAttribute('data-ed11y-open') === 'false' ? 'open' : 'close';
      host.setAttribute('data-ed11y-action', stateChange);
      if (stateChange === 'open') {
        window.setTimeout(function () {
          let activeTip = document.querySelector('ed11y-element-tip[data-ed11y-open="true"]');
          activeTip?.shadowRoot.querySelector('.title').focus();
        }, 500);
      }
      window.setTimeout(function () {
        host.racing = false;
      }, 250, host);
    }

  }

  closeOtherTips() {
    if (Ed11y.openTip.button) {
      Ed11y.openTip.button.setAttribute('data-ed11y-action', 'close');
    }
  }

  buildTip() {
    this.tipNeedsBuild = false;

    let tip = document.createElement('ed11y-element-tip');
    tip.result = this.result;
    tip.setAttribute('data-ed11y-result', this.resultID);
    tip.classList.add('ed11y-element');
    tip.style.setProperty('opacity', '0');
    let body = document.querySelector('body');
    body.insertAdjacentElement('beforeend', tip);
    this.tip = tip;
  }

  toggleTip(changeTo) {
    if (this.tipNeedsBuild) {
      this.buildTip();
    }
    this.toggle.setAttribute('aria-expanded', changeTo);
    let highlightOutline = this.dismissable ? 'ed11y-ring-yellow' : 'ed11y-ring-red';
    if (Ed11y.options.inlineAlerts) {
      Ed11y.resetClass([
        'ed11y-hidden-highlight',
        'ed11y-ring-red',
        'ed11y-ring-yellow',
        'ed11y-warning-block',
        'ed11y-error-block',
        'ed11y-warning-inline',
        'ed11y-error-inline',
      ]);
    } else {
      Ed11y.editableHighlighter(this.resultID, changeTo);
    }
    if (changeTo === true) {
      this.tip.style.setProperty('opacity', '0');
      // Allow for themes to reveal hidden tips
      document.dispatchEvent(new CustomEvent('ed11yPop', {
        detail: {
          id: 'ed11y-result-' + this.toggle.getAttribute('data-ed11y-result'),
          result: this.result,
          tip: this.tip
        }
      }));
      this.closeOtherTips();
      this.tip.setAttribute('data-ed11y-action', 'open');
      if (Ed11y.options.inlineAlerts) {
        this.result.element.classList.add(highlightOutline);
        // Removed in 2.3.6; Todo: confirm not needed and delete.
        /*if (this.result.element.style.outline.indexOf('alert') === -1 ) {
          // Set property unless alert is already set.
          const display = window.getComputedStyle(this.result.element).getPropertyValue('display');
          let outlineClass;
          if (display.indexOf('inline') === -1 || this.result.element.tagName === 'IMG') {
            outlineClass = this.result.dismissalKey ?
              'ed11y-warning-block'
              : 'ed11y-error-block';
          } else {
            outlineClass = this.result.dismissalKey ?
              'ed11y-warning-inline'
              : 'ed11y-error-inline';
          }
          this.result.element.classList.add(outlineClass);
        }*/
      }
      requestAnimationFrame(() => Ed11y.alignTip(this.toggle, this.tip, 4, true));
      if (!Ed11y.jumpList) {
        Ed11y.buildJumpList();
      }
      Ed11y.lastOpenTip = Number(this.getAttribute('data-ed11y-jump-position'));
      Ed11y.openTip = {
        button: this,
        tip: this.tip,
      };
      this.result.highlight?.style.setProperty('opacity', '1');
    } else {
      // Allow for themes to restore original DOM/CSS
      document.dispatchEvent(new CustomEvent('ed11yShut', {
        detail: { id: 'ed11y-result-' + this.toggle.getAttribute('data-ed11y-result') }
      }));
      this.tip.setAttribute('data-ed11y-action', 'shut');
      this.result.highlight?.style.setProperty('opacity', '0');
      Ed11y.openTip = {
        button: false,
        tip: false,
      };
    }
    this.setAttribute('data-ed11y-open', changeTo);
    this.open = changeTo;
  }


  static get observedAttributes() { return ['data-ed11y-action']; }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (this.initialized) {
      switch (attr) {
        case 'data-ed11y-action':
          if (newValue !== 'false') {
            let changeTo = newValue === 'open';
            this.setAttribute('data-ed11y-action', 'false');
            this.toggleTip(changeTo);
          }
          break;
      }
    }
  }
}
customElements.define('ed11y-element-result', Ed11yElementResult);

class Ed11yElementTip extends HTMLElement {
  /* global Ed11y */
  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.initialized && this.result) {
      this.renderOnce();
    }
  }
  renderOnce() {
    this.initialized = true;
    this.open = true;
    this.style.setProperty('opacity', '0');
    this.style.setProperty('outline', '0px solid transparent');
    const shadow = this.attachShadow({ mode: 'open' });

    this.wrapper = document.createElement('div');
    this.wrapper.setAttribute('role', 'dialog');

    this.dismissable = this.result.dismissalKey !== false;
    this.dismissed = !!this.result.dismissalStatus;
    this.wrapper.classList.add('ed11y-tip-wrapper', 'ed11y-wrapper');
    this.wrapper.setAttribute('aria-label',
      `${Ed11y.M.issue}
        ${Number.parseInt(this.result.toggle.dataset.ed11yJumpPosition) + 1}`);

    this.addEventListener('mouseover', this.handleHover);

    Ed11y.attachCSS(this.wrapper);

    this.tip = document.createElement('div');
    this.tip.classList.add('tip');

    let content = document.createElement('div');
    content.classList.add('content');
    this.heading = document.createElement('div');
    this.heading.classList.add('title');
    this.heading.setAttribute('tabindex', '-1');
    this.heading.innerHTML = Ed11y.M[this.result.test].title;
    content.append(this.heading);
    const alertBox = document.createElement('div');
    alertBox.classList.add('ed11y-tip-alert');
    this.heading.insertAdjacentElement('afterbegin', alertBox);

    let innerContent = document.createElement('div');
    innerContent.innerHTML = this.result.content;
    content.append(innerContent);

    if (!Ed11y.options.inlineAlerts || Ed11y.options.editLinks) {
      const editBar = document.createElement('div');

      if (!Ed11y.options.inlineAlerts) {
        editBar.classList.add('ed11y-tip-dismissals');
        const transferFocus = document.createElement('button');
        const transferIcon = document.createElement('span');
        transferIcon.classList.add('ed11y-transfer-icon');
        transferIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 256 512"><path fill="currentColor" d="M0 29C-1 47 12 62 29 64l8 1C71 67 96 95 96 128L96 224l-32 0c-18 0-32 14-32 32s14 32 32 32l32 0 0 96c0 33-26 61-59 64l-8 1C12 450-1 465 0 483s17 31 35 29l8-1c34-3 64-19 85-43c21 24 51 40 85 43l8 1c18 2 33-12 35-29s-12-33-29-35l-8-1C186 445 160 417 160 384l0-96 32 0c18 0 32-14 32-32s-14-32-32-32l-32 0 0-96c0-33 26-61 59-64l8-1c18-2 31-17 29-35S239-1 221 0l-8 1C179 4 149 20 128 44c-21-24-51-40-85-43l-8-1C17-1 2 12 0 29z"/></svg>';
        transferFocus.textContent = Ed11y.M.transferFocus;
        transferFocus.prepend(transferIcon);
        transferFocus.classList.add('dismiss', 'ed11y-transfer-focus');
        editBar.append(transferFocus);
        transferFocus.addEventListener('click', function () { Ed11y.transferFocus(); });
      } else {
        editBar.classList.add('ed11y-custom-edit-links');
        editBar.append(Ed11y.options.editLinks.cloneNode(true));
      }
      content.append(editBar);
    }

    // Draw dismiss or restore buttons
    if (this.dismissable) {

      const buttonBar = document.createElement('div');
      buttonBar.classList.add('ed11y-tip-dismissals');

      const dismissIcon = document.createElement('span');
      dismissIcon.classList.add('ed11y-dismiss-icon');
      dismissIcon.innerHTML = '<svg aria-hidden="true" class="hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="Currentcolor" d="M39 5C28-3 13-1 5 9S-1 35 9 43l592 464c10 8 26 6 34-4s6-26-4-34L526 387c39-41 66-86 78-118c3-8 3-17 0-25c-15-36-46-88-93-131C466 69 401 32 320 32c-68 0-125 26-169 61L39 5zM223 150C249 126 283 112 320 112c80 0 144 65 144 144c0 25-6 48-17 69L408 295c8-19 11-41 5-63c-11-42-48-69-89-71c-6-0-9 6-7 12c2 6 3 13 3 20c0 10-2 20-7 28l-90-71zM373 390c-16 7-34 10-53 10c-80 0-144-65-144-144c0-7 1-14 1-20L83 162C60 191 44 221 35 244c-3 8-3 17 0 25c15 36 46 86 93 131C175 443 239 480 320 480c47 0 89-13 126-33L373 390z"/></svg>';

      // Dismissal Key is set in [5] if alert has been dismissed.
      if (Ed11y.options.showDismissed && this.dismissed) {

        // Check if user has permission to reset this alert.
        let okd = Ed11y.dismissedAlerts[Ed11y.options.currentPage][this.result.test][this.result.dismissalKey] === 'ok';
        if ((okd && Ed11y.options.allowOK) || (!okd)) {
          // User can restore this alert.
          const undismissButton = document.createElement('button');
          const unDismissIcon = document.createElement('span');
          unDismissIcon.classList.add('ed11y-dismiss-icon');
          unDismissIcon.innerHTML = '<svg aria-hidden="true" class="shown" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="-30 0 640 512"><path fill="Currentcolor" d="M288 32c-81 0-146 37-193 81C49 156 17 208 3 244c-3 8-3 17 0 25C17 304 49 356 95 399C142.5 443 207 480 288 480s146-37 193-81c47-44 78-95 93-131c3-8 3-17 0-25c-15-36-46-88-93-131C434 69 369 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35-29 64-64 64c-7 0-14-1-20-3c-6-2-12 2-12 7c.3 7 1 14 3 21c14 51 66 82 118 68s82-66 68-118c-11-42-48-69-89-71c-6-.2-9 6-7 12c2 6 3 13 3 20z"/></svg>';
          undismissButton.classList.add('dismiss');
          undismissButton.textContent = okd ? Ed11y.M.undismissOKButton : Ed11y.M.undismissHideButton;
          undismissButton.prepend(unDismissIcon);
          buttonBar.append(undismissButton);
          undismissButton.addEventListener('click', function () { Ed11y.dismissThis('reset'); });
        } else {
          const undismissNote = document.createElement('div');
          undismissNote.classList.add('dismissed-note');
          undismissNote.textContent = Ed11y.M.undismissNotePermissions;
          buttonBar.append(undismissNote);
        }
      } else {

        const pageActions = document.createElement('details');
        const pageActionsSummary = document.createElement('summary');
        const othersLikeThis = Ed11y.results.filter(el => el.test === this.result.test).length;
        const showPageActions = othersLikeThis > 3 && Ed11y.options.allowHide && Ed11y.options.allowOK;

        if (showPageActions) {
          pageActions.classList.add('ed11y-bulk-actions', 'dismiss');
          pageActionsSummary.textContent = Ed11y.M.dismissActions(othersLikeThis);
          pageActions.appendChild(pageActionsSummary);
          buttonBar.appendChild(pageActions);
        }

        if (Ed11y.options.allowOK) {
          const check = document.createElement('span');
          check.setAttribute('aria-hidden', 'true');
          check.textContent = '✓';

          const OkButton = document.createElement('button');
          OkButton.classList.add('dismiss');
          if (Ed11y.options.syncedDismissals) {
            OkButton.setAttribute('title', Ed11y.M.dismissOkTitle);
          }
          OkButton.textContent = Ed11y.M.dismissOkButtonContent;
          buttonBar.prepend(OkButton);

          if (showPageActions) {
            const OkAllButton = OkButton.cloneNode(true);
            OkAllButton.textContent = Ed11y.M.dismissOkAllButton;
            OkAllButton.prepend(check.cloneNode(true));
            pageActions.append(OkAllButton);
            OkAllButton.addEventListener('click', function () { Ed11y.dismissThis('ok', true); });
          }

          OkButton.prepend(check);

          OkButton.addEventListener('click', function () { Ed11y.dismissThis('ok'); });
        }

        if (Ed11y.options.allowHide) {
          const ignoreButton = document.createElement('button');
          ignoreButton.classList.add('dismiss');
          // todo parameterize
          if (Ed11y.options.syncedDismissals) {
            ignoreButton.setAttribute('title', Ed11y.M.dismissHideTitle);
          }
          ignoreButton.textContent = Ed11y.M.dismissHideButtonContent;
          ignoreButton.prepend(dismissIcon.cloneNode(true));
          buttonBar.prepend(ignoreButton);
          ignoreButton.addEventListener('click', function () { Ed11y.dismissThis('hide'); });

          if (showPageActions) {
            const ignoreAllButton = document.createElement('button');
            ignoreAllButton.classList.add('dismiss');
            ignoreAllButton.textContent = Ed11y.M.dismissHideAllButton;
            ignoreAllButton.prepend(dismissIcon.cloneNode(true));
            pageActionsSummary.insertAdjacentElement('afterend', ignoreAllButton);
            ignoreAllButton.addEventListener('click', function () { Ed11y.dismissThis('hide', true); });
          }
        }
      }


      content.append(buttonBar);
    }
    this.tip.append(content);

    this.navBar = document.createElement('div');
    this.navBar.classList.add('ed11y-tip-header');
    this.count = document.createElement('div');
    this.count.classList.add('ed11y-tip-count');
    this.count.textContent = `${Ed11y.M.issue} ${Number.parseInt(this.result.toggle.dataset.ed11yJumpPosition) + 1} / ${Ed11y.jumpList.length}`;
    this.navBar.append(this.count);
    if (Ed11y.jumpList.length > 1) {
      this.prev = document.createElement('button');
      this.prev.classList.add('ed11y-tip-prev');
      this.prev.setAttribute('aria-label', Ed11y.M.buttonPrevContent);
      this.prev.setAttribute('title', Ed11y.M.buttonPrevContent);
      this.prev.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 -10 30 120"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" d="m40 100,-50 -50 50-50 50"></path></svg>';
      this.prev.addEventListener('click', (event) => {
        event.preventDefault();
        Ed11y.jumpTo(-1);
      });
      this.navBar.append(this.prev);

      this.next = document.createElement('button');
      this.next.classList.add('ed11y-tip-next');
      this.next.setAttribute('aria-label', Ed11y.M.buttonNextContent);
      this.next.setAttribute('title', Ed11y.M.buttonNextContent);
      this.next.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 120 120" width="10"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" d="m30 00 50 50-50 50"></path></svg>';
      this.next.addEventListener('click', (event) => {
        event.preventDefault();
        Ed11y.jumpTo(1);
      });
      this.navBar.append(this.next);
    }
    this.help = document.createElement('details');
    this.help.classList.add('button');
    this.helpContent = document.createElement('div');
    this.helpContent.classList.add('ed11y-tip-help-content');
    this.helpContent.innerHTML = Ed11y.M.panelHelp;
    this.help.append(this.helpContent);
    this.helpToggle = document.createElement('summary');
    this.helpToggle.textContent = '?';
    this.helpToggle.setAttribute('aria-label', Ed11y.M.panelHelpTitle);
    this.helpToggle.setAttribute('title', Ed11y.M.panelHelpTitle);
    this.help.insertAdjacentElement('afterbegin', this.helpToggle);
    this.navBar.append(this.help);

    let closeButton = document.createElement('button');
    closeButton.setAttribute('arial-label', Ed11y.M.closeTip);
    closeButton.setAttribute('title', Ed11y.M.closeTip);
    closeButton.classList.add('close');
    closeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 384 512"><path fill="currentColor" d="M343 151c13-13 13-33 0-46s-33-13-45 0L192 211 87 105c-13-13-33-13-45 0s-13 33 0 45L147 256 41 361c-13 13-13 33 0 45s33 13 45 0L192 301 297 407c13 13 33 13 45 0s13-33 0-45L237 256 343 151z"/></svg>';
    this.navBar.append(closeButton);
    this.tip.append(this.navBar);

    let arrow = document.createElement('div');
    arrow.classList.add('arrow');
    closeButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (this.open) {
        // todo this needs to be part of the shadow DOM query I think
        let toggle = document.querySelector('ed11y-element-result[data-ed11y-open="true"]');
        if (Ed11y.toggledFrom) {
          Ed11y.toggledFrom.focus();
        }
        // todo postpone: track if this tip was opened by the next button. If so, transfer focus back to it instead
        toggle?.setAttribute('data-ed11y-action', 'shut');
        this.setAttribute('data-ed11y-action', 'shut');
      }
    });
    document.addEventListener('click', (event) => {
      // Close tip when mouse is clicked outside it.
      if (this.open && !event.target.closest('ed11y-element-tip, ed11y-element-result, ed11y-element-panel')) {
        let toggle = document.querySelector('ed11y-element-result[data-ed11y-open="true"]');
        toggle?.setAttribute('data-ed11y-action', 'shut');
        this.setAttribute('data-ed11y-action', 'shut');
      }
    });
    shadow.appendChild(this.wrapper);
    let focusLoopLeft = document.createElement('div');
    focusLoopLeft.setAttribute('tabIndex', '0');
    let focusLoopRight = document.createElement('div');
    focusLoopRight.setAttribute('tabindex', '0');
    this.wrapper.appendChild(focusLoopLeft);
    this.wrapper.appendChild(arrow);
    this.wrapper.appendChild(this.tip);
    this.wrapper.appendChild(focusLoopRight);
    let focusables = this.wrapper.querySelectorAll('a, button, [tabindex="0"]');
    let count = focusables.length;
    focusables[0].addEventListener('focus', () => {
      focusables[count - 2].focus();
    });
    focusables[count - 1].addEventListener('focus', () => {
      focusables[1].focus();
    });
    this.initialized = true;
    this.rendering = false;
  }

  toggleTip(changeTo) {
    if (changeTo) {
      this.wrapper.classList.add('open');
      Ed11y.alertOnInvisibleTip(this.result.toggle, this.result.element);
    } else {
      this.wrapper.classList.remove('open');
    }
    this.setAttribute('data-ed11y-open', changeTo);
  }

  static get observedAttributes() { return ['data-ed11y-action']; }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (!this.initialized && this.result) {
      this.renderOnce();
    }
    if (this.initialized) {
      switch (attr) {
        case 'data-ed11y-action':
          if (newValue !== 'false') {
            let changeTo = newValue === 'open';
            this.open = changeTo;
            this.setAttribute('data-ed11y-action', 'false');
            this.toggleTip(changeTo);
          }
          break;
      }
    }
  }
}
customElements.define('ed11y-element-tip', Ed11yElementTip);



export default Ed11y;
export { Ed11y };
