import { errors } from '@strapi/utils';

const { ValidationError } = errors;

export interface ContentTypeQuery {
  type: string;
  [key: string]: unknown;
}

export interface ContentType {
  uid: string;
  query: ContentTypeQuery;
  [key: string]: unknown;
}

export interface PluginConfig {
  domain?: string;
  token?: string;
  contentTypes: ContentType[];
  [key: string]: unknown;
}

export default {
  default: {},
  validator: (config: PluginConfig) => {
    if (!config) {
      throw new ValidationError('Config is required.');
    }

    if (!config.contentTypes || !Array.isArray(config.contentTypes)) {
      throw new ValidationError('contentTypes must be an array.');
    }

    const uid = config.contentTypes.every((contentType) => Object.prototype.hasOwnProperty.call(contentType, 'uid'));
    const query = config.contentTypes.every((contentType) =>
      Object.prototype.hasOwnProperty.call(contentType, 'query'),
    );
    const type = config.contentTypes.every((contentType) =>
      contentType.query && Object.prototype.hasOwnProperty.call(contentType.query, 'type'),
    );
    if (!config.domain) {
      throw new ValidationError('Missing domain prop.');
    }
    if (!config?.token) {
      throw new ValidationError('Missing token prop.');
    }
    if (!uid) {
      throw new ValidationError('Missing uid prop.');
    }
    if (!query) {
      throw new ValidationError('Missing query prop.');
    }
    if (!type) {
      throw new ValidationError('Missing type prop.');
    }
  },
};
