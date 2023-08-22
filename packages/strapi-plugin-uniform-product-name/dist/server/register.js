"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const pluginId_1 = __importDefault(require("../admin/src/pluginId"));
const register = ({ strapi }) => {
    strapi.customFields.register({
        name: 'uniform-product-name',
        plugin: pluginId_1.default,
        type: 'string',
    });
};
exports.register = register;
