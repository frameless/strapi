export default {
  toolbar: {
    bold: 'Bold',
    italic: 'Italic',
    strikeThrough: 'Strike Through',
    underline: 'Underline',
    highlight: 'Highlight',
    alignLeft: 'Align Left',
    alignCenter: 'Align Center',
    alignRight: 'Align Right',
    bulletList: 'Bullet List',
    orderedList: 'Ordered List',
    code: 'Code',
    blockquote: 'Block Quote',
    language: {
      label: 'Select a language',
      removeLanguage: 'Remove Language',
    },
    textStyle: {
      label: 'Text style',
      options: {
        paragraph: 'Paragraph',
        leadParagraph: 'Lead Paragraph',
        heading1: 'Heading 1',
        heading2: 'Heading 2',
        heading3: 'Heading 3',
        heading4: 'Heading 4',
        heading5: 'Heading 5',
        heading6: 'Heading 6',
      },
    },
    link: {
      label: 'Link',
      dialog: {
        title: 'Insert a URL link',
        input: {
          label: 'Insert a URL link',
          placeholder: 'Write or paste the URL here',
          ariaLabel: 'URL',
          hint: 'Enter URL (e.g., https://, http://, #, tel:, mailto:)',
          error: "Invalid URL. Must start with 'https://', 'http://', '#', 'tel:', or 'mailto:'",
        },
      },
    },
    tableWithCaption: 'Insert Table with Caption',
    table: 'Insert Table',
    youtube: {
      label: 'Insert YouTube Video',
      dialog: {
        title: 'Insert YouTube Video',
        URLinput: {
          label: 'YouTube URL',
          placeholder: 'Insert YouTube URL',
          ariaLabel: 'YouTube URL',
        },
        widthInput: {
          label: 'YouTube video width',
          placeholder: 'Width of the embed',
          ariaLabel: 'YouTube video width',
        },
        heightInput: {
          label: 'YouTube video height',
          placeholder: 'Height of the embed',
          ariaLabel: 'YouTube video height',
        },
      },
    },
    horizontalRule: 'Horizontal Rule',
    headingWithID: {
      editLabel: 'Edit heading-{{headingLevel}} ID and copy',
      generateLabel: 'Generate heading-{{headingLevel}} ID',
      dialog: {
        title: '{{state}} Heading ID',
        input: {
          label: 'Heading ID',
          placeholder: 'Enter a unique ID',
          hint: 'The ID will be used to create a link to this heading',
          error: 'This field is required',
        },
        alert: {
          generatedTitle: 'The heading ID was generated successfully!',
          updatedTitle: 'The heading ID was updated successfully!',
          description: 'ID copied to clipboard:',
        },
      },
    },
    price: {
      label: 'Select Price',
    },
  },
};
