import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('./esm-loader.mjs', pathToFileURL('./'));
