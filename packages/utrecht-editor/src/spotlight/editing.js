import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import { InsertSpotlightCommand } from './command';

export class SpotlightEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add('insertSpotlight', new InsertSpotlightCommand(this.editor));
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('spotlight', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,

      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block',
    });

    schema.register('spotlightDescription', {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: 'spotlight',

      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: '$root',
    });

    schema.addChildCheck((context, childDefinition) => {
      if (context.endsWith('spotlightDescription') && childDefinition.name === 'spotlight') {
        return false;
      }
      return undefined;
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    // <spotlight> converters
    conversion.for('upcast').elementToElement({
      model: 'spotlight',
      view: {
        name: 'section',
        classes: 'spotlight',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'spotlight',
      view: {
        name: 'section',
        classes: 'spotlight',
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'spotlight',
      view: (modelElement, { writer: viewWriter }) => {
        const section = viewWriter.createContainerElement('section', { class: 'spotlight' });

        return toWidget(section, viewWriter, { label: 'simple box widget' });
      },
    });

    // <spotlightDescription> converters
    conversion.for('upcast').elementToElement({
      model: 'spotlightDescription',
      view: {
        name: 'div',
        classes: ['utrecht-spotlight-section', 'utrecht-spotlight-section--info'],
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'spotlightDescription',
      view: {
        name: 'div',
        classes: ['utrecht-spotlight-section', 'utrecht-spotlight-section--info'],
      },
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'spotlightDescription',
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const div = viewWriter.createEditableElement('div', {
          class: 'utrecht-spotlight-section utrecht-spotlight-section--info',
        });

        return toWidgetEditable(div, viewWriter);
      },
    });
  }
}
