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
import * as gemeente from '@frameless/catalogi-data';
import { uplKeyValues } from '@frameless/upl';
import dotenv from 'dotenv';
import { mapKeys } from 'lodash';
import { create } from 'xmlbuilder2';
import { createScheme, getPrefLabel, isValidURL } from './helpers';
dotenv.config();
var prefixMap = {
    xsi: 'http://www.w3.org/2001/XMLSchema-instance',
    dcterms: 'http://purl.org/dc/terms/',
    overheid: 'http://standaarden.overheid.nl/owms/terms/',
    overheidproduct: 'http://standaarden.overheid.nl/product/terms/',
};
var xmlnsPrefixMap = mapKeys(prefixMap, function (_value, key) { return "xmlns:".concat(key); });
export var convertJsonToXML = function (data, frontend_url) {
    if (!frontend_url) {
        throw new Error('frontend_url is required');
    }
    else if (!isValidURL(frontend_url)) {
        throw new Error('Invalid frontend_url value');
    }
    else if (!data && data.length === 0) {
        throw new Error('The `data` parameter is required');
    }
    else {
        var root_1 = create({ version: '1.0', encoding: 'utf-8' })
            .ele('overheidproduct:scproducten')
            .att(__assign(__assign({}, xmlnsPrefixMap), { 'xsi:schemaLocation': 'https://standaarden.overheid.nl/product/terms/sc.xsd' }));
        var meta = data.map(function (_a) {
            var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
            var attributes = _a.attributes, id = _a.id;
            var gemeenteSpatial = (_b = attributes.catalogiMeta) === null || _b === void 0 ? void 0 : _b.spatial.resourceIdentifier;
            var gemeenteAuthority = (_c = attributes.catalogiMeta) === null || _c === void 0 ? void 0 : _c.authority.resourceIdentifier;
            var uniformProductName = uplKeyValues.find(function (_a) {
                var _b;
                var uri = _a.uri;
                return uri === ((_b = attributes.catalogiMeta) === null || _b === void 0 ? void 0 : _b.uniformProductName);
            });
            var prefLabelSpatial = getPrefLabel(gemeente.cv.value, (_d = attributes.catalogiMeta) === null || _d === void 0 ? void 0 : _d.spatial.resourceIdentifier);
            var prefLabelAuthority = getPrefLabel(gemeente.cv.value, (_e = attributes.catalogiMeta) === null || _e === void 0 ? void 0 : _e.authority.resourceIdentifier);
            var schemeAuthority = createScheme((_g = (_f = attributes.catalogiMeta) === null || _f === void 0 ? void 0 : _f.authority) === null || _g === void 0 ? void 0 : _g.scheme, prefixMap);
            var schemeSpatial = createScheme((_j = (_h = attributes.catalogiMeta) === null || _h === void 0 ? void 0 : _h.spatial) === null || _j === void 0 ? void 0 : _j.scheme, prefixMap);
            var path = 'products'; // can be from the CMS
            var identifier = "".concat(frontend_url.endsWith('/') ? frontend_url : "".concat(frontend_url, "/")).concat(attributes.locale, "/").concat(path, "/").concat(attributes.slug);
            var spatial = {
                scheme: schemeSpatial,
                resourceIdentifier: gemeenteSpatial,
                label: prefLabelSpatial,
            };
            var authority = {
                scheme: schemeAuthority,
                resourceIdentifier: gemeenteAuthority,
                label: prefLabelAuthority,
            };
            var audiences = attributes.catalogiMeta && ((_k = attributes.catalogiMeta) === null || _k === void 0 ? void 0 : _k.audience)
                ? (_l = attributes.catalogiMeta) === null || _l === void 0 ? void 0 : _l.audience.map(function (_a) {
                    var id = _a.id, type = _a.type;
                    return ({ id: id, type: type, scheme: 'overheid:Doelgroep' });
                })
                : [];
            return {
                title: attributes.title,
                language: attributes.locale,
                modified: attributes.updatedAt,
                productId: id,
                abstract: (_m = attributes.catalogiMeta) === null || _m === void 0 ? void 0 : _m.abstract,
                onlineAanvragen: (_o = attributes.catalogiMeta) === null || _o === void 0 ? void 0 : _o.onlineRequest.type,
                identifier: identifier,
                spatial: spatial,
                authority: authority,
                audiences: audiences,
                uniformProductName: uniformProductName,
            };
        });
        meta.forEach(function (item) {
            var _a, _b, _c;
            if (!item.title ||
                !item.language ||
                !item.productId ||
                !item.abstract ||
                !item.onlineAanvragen ||
                !item.identifier ||
                !item.spatial.scheme ||
                !item.spatial.resourceIdentifier ||
                !item.authority.resourceIdentifier ||
                !item.audiences ||
                item.audiences.length === 0) {
                return;
            }
            var scproduct = root_1.ele('overheidproduct:scproduct').att({ 'owms-version': '4.0' });
            var meta = scproduct.ele('overheidproduct:meta');
            meta
                .ele('overheidproduct:owmskern')
                .ele('dcterms:identifier')
                .txt(item.identifier)
                .up()
                .ele('dcterms:title')
                .txt(item.title)
                .up()
                .ele('dcterms:language')
                .txt(item.language)
                .up()
                .ele('dcterms:type')
                .att({ scheme: 'overheid:Informatietype' })
                .txt('productbeschrijving')
                .up()
                .ele('dcterms:modified')
                .txt(item.modified)
                .up()
                .ele('dcterms:spatial')
                .att({
                scheme: item.authority.scheme,
                resourceIdentifier: item.spatial.resourceIdentifier,
            })
                .txt(item.spatial.label)
                .up()
                .ele('overheid:authority')
                .att({
                scheme: item.authority.scheme,
                resourceIdentifier: item.authority.resourceIdentifier,
            })
                .txt(item.authority.label)
                .up();
            var owmsmantel = meta.ele('overheidproduct:owmsmantel');
            item.audiences.forEach(function (audience) {
                var _a;
                owmsmantel
                    .ele('dcterms:audience')
                    .att({
                    scheme: audience.scheme,
                    resourceIdentifier: "http://standaarden.overheid.nl/owms/terms/".concat((_a = audience === null || audience === void 0 ? void 0 : audience.type) === null || _a === void 0 ? void 0 : _a.toLowerCase()),
                })
                    .txt(audience.type);
            });
            owmsmantel.ele('dcterms:abstract').txt(item.abstract).up();
            var overheidproductScmeta = meta.ele('overheidproduct:scmeta');
            overheidproductScmeta.ele('overheidproduct:productID').txt(item.productId).up();
            overheidproductScmeta.ele('overheidproduct:onlineAanvragen').txt(item.onlineAanvragen).up();
            if ((_a = item === null || item === void 0 ? void 0 : item.uniformProductName) === null || _a === void 0 ? void 0 : _a.uri) {
                overheidproductScmeta
                    .ele('overheidproduct:uniformeProductnaam')
                    .att({ scheme: 'overheid:UniformeProductnaam', resourceIdentifier: (_b = item === null || item === void 0 ? void 0 : item.uniformProductName) === null || _b === void 0 ? void 0 : _b.uri })
                    .txt((_c = item === null || item === void 0 ? void 0 : item.uniformProductName) === null || _c === void 0 ? void 0 : _c.value)
                    .up();
            }
            scproduct.ele('overheidproduct:body');
        });
        // convert the XML tree to string
        var xml = root_1.end({ prettyPrint: true });
        return xml;
    }
};
