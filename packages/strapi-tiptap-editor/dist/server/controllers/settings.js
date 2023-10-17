"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaults_1 = __importDefault(require("../../utils/defaults"));
exports.default = ({ strapi }) => ({
    async index(ctx) {
        const savedSettings = await strapi.store({ type: 'plugin', name: 'strapi-tiptap-editor', key: 'settings' }).get();
        if (savedSettings !== null) {
            ctx.send(savedSettings);
        }
        else {
            ctx.send(defaults_1.default);
        }
    },
    async updateSettings(ctx) {
        const newSettings = ctx.request.body;
        await strapi.store({ type: 'plugin', name: 'strapi-tiptap-editor', key: 'settings' }).set({ value: newSettings });
        ctx.send({ res: 'ok' });
    },
});
