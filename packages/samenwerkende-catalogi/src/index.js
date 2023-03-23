const { mapKeys } = require('lodash');
const { create } = require('xmlbuilder2');
const fs = require('fs');
require('dotenv').config();
const gemeente = require('@frameless/catalogi-data');

const { createScheme, getPrefLabel } = require('./helpers');

const dir = './dist';
const prefixMap = {
  xsi: 'http://www.w3.org/2001/XMLSchema-instance',
  dcterms: 'http://purl.org/dc/terms/',
  overheid: 'http://standaarden.overheid.nl/owms/terms/',
  overheidproduct: 'http://standaarden.overheid.nl/product/terms/',
};
const xmlnsPrefixMap = mapKeys(prefixMap, (_value, key) => `xmlns:${key}`);

const convertJsonToXML = (data, frontend_url) => {
  if (data && data.length > 0) {
    const root = create({ version: '1.0' })
      .ele('overheidproduct:scproducten')
      .att({
        ...xmlnsPrefixMap,
        'xsi:schemaLocation': 'https://standaarden.overheid.nl/product/terms/sc.xsd',
      });

    const meta = data.map(({ attributes, id }) => {
      const gemeenteSpatial = attributes.catalogiMeta?.spatial.resourceIdentifier;
      const gemeenteAuthority = attributes.catalogiMeta?.authority.resourceIdentifier;

      const prefLabelSpatial = getPrefLabel(gemeente.cv.value, attributes.catalogiMeta?.spatial.resourceIdentifier);
      const prefLabelAuthority = getPrefLabel(gemeente.cv.value, attributes.catalogiMeta?.authority.resourceIdentifier);

      const schemeAuthority = createScheme(attributes.catalogiMeta?.authority?.scheme, prefixMap);
      const schemeSpatial = createScheme(attributes.catalogiMeta?.spatial?.scheme, prefixMap);
      const path = 'products'; // can be from the CMS
      const identifier = `${frontend_url.endsWith('/') ? frontend_url : `${frontend_url}/`}${
        attributes.locale
      }/${path}/${attributes.slug}`;

      const spatial = {
        schemeSpatial,
        resourceIdentifier: gemeenteSpatial,
        label: prefLabelSpatial,
      };

      const authority = {
        schemeAuthority,
        resourceIdentifier: gemeenteAuthority,
        label: prefLabelAuthority,
      };

      const audiences =
        attributes.catalogiMeta && attributes.catalogiMeta?.audience
          ? attributes.catalogiMeta?.audience.map(({ id, type }) => ({ id, type, scheme: 'overheid:Doelgroep' }))
          : [];

      return {
        title: attributes.title,
        language: attributes.locale,
        modified: attributes.updatedAt,
        productId: id,
        abstract: attributes.excerpt,
        onlineAanvragen: attributes.catalogiMeta?.onlineRequest.type,
        identifier,
        spatial,
        authority,
        audiences,
      };
    });

    meta.forEach((item) => {
      if (
        !item.title ||
        !item.language ||
        !item.productId ||
        !item.abstract ||
        !item.onlineAanvragen ||
        !item.identifier ||
        !item.spatial.schemeSpatial ||
        !item.spatial.resourceIdentifier ||
        !item.authority.resourceIdentifier ||
        !item.audiences ||
        item.audiences.length === 0
      ) {
        return;
      }
      const scproduct = root.ele('overheidproduct:scproduct').att({ 'owms-version': '4.0' });
      const meta = scproduct.ele('overheidproduct:meta');
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
      const owmsmantel = meta.ele('overheidproduct:owmsmantel');
      item.audiences.forEach((audience) => {
        owmsmantel
          .ele('dcterms:audience')
          .att({
            scheme: audience.scheme,
            resourceIdentifier: `http://standaarden.overheid.nl/owms/terms/${audience?.type.toLowerCase()}`,
          })
          .txt(audience.type);
      });
      owmsmantel.ele('dcterms:abstract').txt(item.abstract).up();
      meta
        .ele('overheidproduct:scmeta')
        .ele('overheidproduct:productID')
        .txt(item.productId)
        .up()
        .ele('overheidproduct:onlineAanvragen')
        .txt(item.onlineAanvragen)
        .up();
      scproduct.ele('overheidproduct:body');
    });

    // convert the XML tree to string
    const xml = root.end({ prettyPrint: true });

    return xml;
  } else {
    throw new Error('The function parameters are required');
    // TODO improve the error validations or switch to TypeScript
  }
};

module.exports = { convertJsonToXML };
