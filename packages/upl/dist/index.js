"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var axios_retry_1 = __importDefault(require("axios-retry"));
var fs = __importStar(require("fs"));
var uuid_1 = require("uuid");
var dir = './dist';
(0, axios_retry_1.default)(axios_1.default, {
    retries: 3,
    retryDelay: function (retryCount) {
        // eslint-disable-next-line no-console
        console.log("retry attempt: ".concat(retryCount));
        return retryCount * 2000; // time interval between retries
    },
    retryCondition: function (error) {
        return error.response.status >= 500 && error.response.status < 600;
    },
});
var url = 'https://standaarden.overheid.nl/owms/oquery/UPL-actueel.json';
var simplifyUPL = function (data) {
    return data.results.bindings.map(function (binding) {
        return {
            uri: binding.URI.value,
            value: binding.UniformeProductnaam.value,
            uuid: (0, uuid_1.v4)(),
        };
    });
};
axios_1.default
    .request({
    url: url,
    headers: {
        Accept: 'application/json',
    },
})
    .then(function (response) { return response.data; })
    .then(function (json) {
    var UPLKeyValuesArrayOfObjects = simplifyUPL(json);
    // Convert the array of objects to a constant (const data = [...])
    var data = __spreadArray([], UPLKeyValuesArrayOfObjects, true);
    var dataActueel = __assign({}, json);
    // Convert the array of objects to a JSON string
    var UPLKeyValuesJsonData = JSON.stringify(data, null, 2);
    // Write the JSON string to two different files
    fs.writeFileSync("".concat(dir, "/UPL-actueel.ts"), "export const uplActueel = ".concat(JSON.stringify(dataActueel, null, 2), ";"));
    fs.writeFileSync("".concat(dir, "/UPL-key-value.ts"), "export const uplKeyValues = ".concat(UPLKeyValuesJsonData, ";"));
    // eslint-disable-next-line no-console
    console.log('JSON data has been written to the files successfully!');
})
    .catch(function (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching JSON data:', error);
});
