import config from './config';
import { pluginId } from '../pluginId';

const reducers = {
  [`${pluginId}_config`]: config,
};

export default reducers;
