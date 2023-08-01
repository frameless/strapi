"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScheme = exports.getPrefLabel = void 0;
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
