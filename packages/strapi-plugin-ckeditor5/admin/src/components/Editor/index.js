import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Box } from "@strapi/design-system";
import ClassicEditor from "@frameless/utrecht-editor";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import "@utrecht/component-library-css";
import "@utrecht/component-library-css/dist/html.css";
import "@utrecht/design-tokens/dist/index.css";

const Wrapper = styled(Box)`
  .ck-editor__main {
    min-height: ${200 / 16}em;
    > div {
      min-height: ${200 / 16}em;
    }
  }
`;

const configuration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "indent",
    "outdent",
    "|",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
    "textPartLanguage",
  ],
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "utrecht-paragraph" },
      {
        model: "paragraphLead",
        view: {
          name: "paragraph",
          classes: "utrecht-paragraph utrecht-paragraph--lead",
        },
        title: "Paragraph Lead",
        class: "utrecht-paragraph utrecht-paragraph--lead",
        converterPriority: "high",
      },
      {
        model: "heading1",
        view: "h1",
        title: "Heading 1",
        class: "utrecht-heading-1",
      },
      {
        model: "heading2",
        view: "h2",
        title: "Heading 2",
        class: "utrecht-heading-2",
      },
      {
        model: "heading3",
        view: "h3",
        title: "Heading 3",
        class: "utrecht-heading-3",
      },
      {
        model: "heading4",
        view: "h4",
        title: "Heading 4",
        class: "utrecht-heading-4",
      },
      {
        model: "heading5",
        view: "h5",
        title: "Heading 5",
        class: "utrecht-heading-5",
      },
    ],
  },
  link: {
    options: [
      { model: "link", view: "a", title: "Link", class: "utrecht-link" },
    ],
    decorators: {
      openInNewTab: {
        mode: "manual",
        label: "Open in a new tab",
        attributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      },
    },
  },
  language: {
    textPartLanguage: [
      { title: "Arabic", languageCode: "ar" },
      { title: "Dutch", languageCode: "nl" },
      { title: "English", languageCode: "en" },
    ],
  },
  fillEmptyBlocks: false,
};

function Editor({ onChange, name, value, disabled }) {
  return (
    <Wrapper className={["utrecht-theme", "utrecht-html"].join(" ")}>
      <CKEditor
        editor={ClassicEditor}
        disabled={disabled}
        config={configuration}
        data={value || ""}
        onReady={(editor) => editor.setData(value || "")}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange({ target: { name, value: data } });
        }}
      />
    </Wrapper>
  );
}

Editor.defaultProps = {
  value: "",
  disabled: false,
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Editor;
