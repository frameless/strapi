/**
 * @license Copyright (c) 2014-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment.js";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat.js";
import Autosave from "@ckeditor/ckeditor5-autosave/src/autosave.js";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic.js";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote.js";
import CloudServices from "@ckeditor/ckeditor5-cloud-services/src/cloudservices.js";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js";
import FindAndReplace from "@ckeditor/ckeditor5-find-and-replace/src/findandreplace.js";
import Heading from "@ckeditor/ckeditor5-heading/src/heading.js";
import AutoImage from "@ckeditor/ckeditor5-image/src/autoimage.js";
import Image from "@ckeditor/ckeditor5-image/src/image.js";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption.js";
import ImageInsert from "@ckeditor/ckeditor5-image/src/imageinsert.js";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize.js";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle.js";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar.js";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload.js";
import Indent from "@ckeditor/ckeditor5-indent/src/indent.js";
import TextPartLanguage from "@ckeditor/ckeditor5-language/src/textpartlanguage.js";
import AutoLink from "@ckeditor/ckeditor5-link/src/autolink.js";
import Link from "@ckeditor/ckeditor5-link/src/link.js";
import LinkImage from "@ckeditor/ckeditor5-link/src/linkimage.js";
import List from "@ckeditor/ckeditor5-list/src/list.js";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed.js";
import Mention from "@ckeditor/ckeditor5-mention/src/mention.js";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js";
import RemoveFormat from "@ckeditor/ckeditor5-remove-format/src/removeformat.js";
import { SourceEditing } from "@ckeditor/ckeditor5-source-editing";
import Style from "@ckeditor/ckeditor5-style/src/style.js";
import Table from "@ckeditor/ckeditor5-table/src/table.js";
import TableCaption from "@ckeditor/ckeditor5-table/src/tablecaption.js";
import TableCellProperties from "@ckeditor/ckeditor5-table/src/tablecellproperties";
import TableColumnResize from "@ckeditor/ckeditor5-table/src/tablecolumnresize.js";
import TableProperties from "@ckeditor/ckeditor5-table/src/tableproperties";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar.js";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation.js";
import WordCount from "@ckeditor/ckeditor5-word-count/src/wordcount.js";
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';
import { SimpleBox } from './simplebox'

import { ExtendHTMLSupport } from "./CustomHTMLSupport"

class Editor extends ClassicEditor { }

// Plugins to include in the build.
Editor.builtinPlugins = [
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BlockQuote,
  Bold,
  CloudServices,
  Essentials,
  FindAndReplace,
  ExtendHTMLSupport,
  HtmlEmbed,
  Heading,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  Italic,
  Link,
  LinkImage,
  List,
  MediaEmbed,
  Mention,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SourceEditing,
  Style,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  WordCount,
  SimpleBox
];

// Editor configuration.
Editor.defaultConfig = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "outdent",
      "indent",
      "|",
      "imageUpload",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "undo",
      "redo",
      "findAndReplace",
      "alignment",
      "imageInsert",
      "removeFormat",
      "style",
      "sourceEditing",
      "textPartLanguage",
      "htmlEmbed",
      "simpleBox",
    ],
  },
  language: "en",
  image: {
    toolbar: ["imageTextAlternative", "imageStyle:inline", "imageStyle:block", "imageStyle:side", "linkImage"],
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells", "tableCellProperties", "tableProperties"],
  },
};

export default Editor;
