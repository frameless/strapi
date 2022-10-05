import { Plugin } from '@ckeditor/ckeditor5-core';
import { GeneralHtmlSupport } from '@ckeditor/ckeditor5-html-support';
import icons from "@utrecht/icon/dist/index.json"
import { kebabCase } from "lodash"

export class ExtendHTMLSupport extends Plugin {
    static get requires() {
        return [GeneralHtmlSupport];
    }

    init() {
        // Extend schema with custom HTML elements.
        const dataFilter = this.editor.plugins.get('DataFilter');
        const dataSchema = this.editor.plugins.get('DataSchema');
        const newIconArray = icons.concat([{ id: "utrecht-digid-button", src: '' }, { id: "utrecht-button", src: '' }, { id: "utrecht-icon-arrow", src: '' }]);

        newIconArray.forEach((icon) => {
            dataSchema.registerBlockElement({
                view: icon.id,
                model: kebabCase(icon.id),
                isObject: true,
                modelSchema: {
                    inheritAllFrom: '$inlineObject'
                }
            });
            // Inline object element
            dataFilter.allowElement(icon.id);
        })
    }
}
