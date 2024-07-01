import { request } from '@strapi/helper-plugin';
import defaultSettings from './defaults';

export function getSettings() {
  return request('/strapi-tiptap-editor/');
}

export function updateSettings(settings: typeof defaultSettings) {
  return request('/strapi-tiptap-editor/update-settings', { method: 'PUT', body: settings });
}
