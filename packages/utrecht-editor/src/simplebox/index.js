import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { SimpleBoxEditing } from './editing';
import { SimpleBoxUI } from './ui';

import "./index.css"

export class SimpleBox extends Plugin {
    static get requires() {
        return [SimpleBoxEditing, SimpleBoxUI];
    }
}