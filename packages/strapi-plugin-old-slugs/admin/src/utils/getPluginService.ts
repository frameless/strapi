/* eslint-disable no-undef */
import { pluginId } from '../pluginId';
interface GetPluginServiceProps {
  name: string;
  plugin: string;
}

export const getPluginService = ({ name, plugin = pluginId }: GetPluginServiceProps) =>
  strapi.plugin(plugin).service(name);
