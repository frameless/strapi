import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { SpotlightEditing } from './editing';
import { SpotlightUI } from './ui';

export class Spotlight extends Plugin {
    static get requires() {
        return [SpotlightEditing, SpotlightUI];
    }
}