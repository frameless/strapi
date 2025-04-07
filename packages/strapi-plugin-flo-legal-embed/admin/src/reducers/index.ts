import config from './config';
import { pluginConfig } from '../utils/pluginConfig';

const reducers = {
  [`${pluginConfig.pluginId}_config`]: config,
};

export default reducers;
