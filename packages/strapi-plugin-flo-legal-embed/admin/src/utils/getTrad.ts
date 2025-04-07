import { pluginConfig } from './pluginConfig';

const getTrad = (id: string): string => `${pluginConfig.pluginId}.${id}`;

export default getTrad;
