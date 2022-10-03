'use strict';

/**
 * config.js configuration service
 */

module.exports = ({ strapi }) => ({
    getConfig(key = 'editor') {
        return strapi.plugin('ckeditor').config(key) ?? {};
    },
    getUploadConfig(name) {
        return strapi.plugin('upload').service(name) ?? {};
    },
});