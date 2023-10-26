"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        method: 'GET',
        path: '/',
        handler: 'settingsController.index',
        config: {
            policies: [],
        },
    },
    {
        method: 'PUT',
        path: '/update-settings',
        handler: 'settingsController.updateSettings',
        config: {
            policies: [],
        },
    },
];
