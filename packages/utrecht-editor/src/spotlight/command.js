import Command from '@ckeditor/ckeditor5-core/src/command';

export class InsertSpotlightCommand extends Command {
    execute() {
        this.editor.model.change(writer => {
            // Insert <simpleBox>*</simpleBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertContent(createSpotlight(writer));
        });
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), 'spotlight');
        this.isEnabled = allowedIn !== null;
    }
}

function createSpotlight(writer) {
    const spotlight = writer.createElement('spotlight');
    // const spotlightTitle = writer.createElement('spotlightTitle');
    const spotlightDescription = writer.createElement('spotlightDescription');

    // writer.append(spotlightTitle, spotlight);
    writer.append(spotlightDescription, spotlight);

    // There must be at least one paragraph for the description to be editable.
    // See https://github.com/ckeditor/ckeditor5/issues/1464.
    writer.appendElement('paragraph', spotlightDescription);

    return spotlight;
}
