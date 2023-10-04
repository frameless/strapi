"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidURL = exports.createScheme = exports.getPrefLabel = void 0;
var url_1 = __importDefault(require("url"));
var getPrefLabel = function (values, resourceIdentifierQuery) {
    var result = values.find(function (_a) {
        var resourceIdentifier = _a.resourceIdentifier;
        return resourceIdentifier === resourceIdentifierQuery;
    });
    return result ? result.prefLabel : null;
};
exports.getPrefLabel = getPrefLabel;
var lookupPrefix = function (map, namespaceURI) {
    for (var prefix in map) {
        if (Object.prototype.hasOwnProperty.call(map, prefix) && map[prefix] === namespaceURI) {
            return prefix;
        }
    }
    return null;
};
var createName = function (namespaceURI, name, map) {
    var prefix = lookupPrefix(map, namespaceURI);
    return prefix ? "".concat(prefix, ":").concat(name) : name;
};
var CLARK_REGEXP = /^(?:\{([^}]*)\})?(.+)$/;
var createSchemeType = function (string) {
    var match = CLARK_REGEXP.exec(string);
    return (match && {
        namespaceURI: match[1],
        name: match[2],
    });
};
var createScheme = function (id, map) {
    var schemeData = createSchemeType(id);
    if (schemeData) {
        return createName(schemeData.namespaceURI, schemeData.name, map);
    }
    else {
        return undefined;
    }
};
exports.createScheme = createScheme;
var isValidURL = function (input) {
    try {
        new url_1.default.URL(input);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.isValidURL = isValidURL;
