import config from './config';
import { pluginId } from '../utils';

const reducers = {
  [`${pluginId}_config`]: config,
};

export default reducers;
