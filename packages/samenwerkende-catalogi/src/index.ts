import * as gemeente from '@frameless/catalogi-data';
import { uplKeyValues } from '@frameless/upl';
import dotenv from 'dotenv';
import { mapKeys } from 'lodash';
import { create } from 'xmlbuilder2';
import { createScheme, getPrefLabel } from './helpers';

dotenv.config();
const prefixMap = {
  xsi: 'http://www.w3.org/2001/XMLSchema-instance',
  dcterms: 'http://purl.org/dc/terms/',
  overheid: 'http://standaarden.overheid.nl/owms/terms/',
  overheidproduct: 'http://standaarden.overheid.nl/product/terms/',
};

const xmlnsPrefixMap = mapKeys(prefixMap, (_value, key) => `xmlns:${key}`);

type SpatialType = {
  resourceIdentifier: string;
  scheme: string;
  label: string;
};

type AuthorityType = {
  scheme: string;
  resourceIdentifier: string;
  label: string;
};

type OnlineRequestType = {
  type: string;
};

type CatalogiMetaType = {
  spatial: SpatialType;
  authority: AuthorityType;
  audience: AudienceType[];
  onlineRequest: OnlineRequestType;
  uniformProductName?: string;
};

type AudienceType = {
  id: string;
  type: string;
  scheme: string;
};

type SamenWerkendeCatalogiAttributesTypes = {
  catalogiMeta: CatalogiMetaType;
  locale: string;
  slug: string;
  title: string;
  updatedAt: string;
  excerpt: string;
};

type SamenWerkendeCatalogiDataType = {
  id: string;
  attributes: SamenWerkendeCatalogiAttributesTypes;
};

export const convertJsonToXML = (data: SamenWerkendeCatalogiDataType[], frontend_url: string) => {
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
      const uniformProductName = uplKeyValues.find(({ uri }) => uri === attributes.catalogiMeta?.uniformProductName);
      const prefLabelSpatial = getPrefLabel(gemeente.cv.value, attributes.catalogiMeta?.spatial.resourceIdentifier);
      const prefLabelAuthority = getPrefLabel(gemeente.cv.value, attributes.catalogiMeta?.authority.resourceIdentifier);

      const schemeAuthority = createScheme(attributes.catalogiMeta?.authority?.scheme, prefixMap);
      const schemeSpatial = createScheme(attributes.catalogiMeta?.spatial?.scheme, prefixMap);
      const path = 'products'; // can be from the CMS
      const identifier = `${frontend_url.endsWith('/') ? frontend_url : `${frontend_url}/`}${
        attributes.locale
      }/${path}/${attributes.slug}`;

      const spatial = {
        scheme: schemeSpatial,
        resourceIdentifier: gemeenteSpatial,
        label: prefLabelSpatial,
      };

      const authority = {
        scheme: schemeAuthority,
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
        uniformProductName,
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
        !item.spatial.scheme ||
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
      const overheidproductScmeta = meta.ele('overheidproduct:scmeta');
      overheidproductScmeta.ele('overheidproduct:productID').txt(item.productId).up();
      overheidproductScmeta.ele('overheidproduct:onlineAanvragen').txt(item.onlineAanvragen).up();
      if (item?.uniformProductName?.uri) {
        overheidproductScmeta
          .ele('overheidproduct:uniformeProductnaam')
          .att({ scheme: 'overheid:UniformeProductnaam', resourceIdentifier: item?.uniformProductName?.uri })
          .txt(item?.uniformProductName?.value)
          .up();
      }

      scproduct.ele('overheidproduct:body');
    });

    // convert the XML tree to string
    const xml = root.end({ prettyPrint: true });

    return xml;
  } else {
    throw new Error('The function parameters are required');
  }
};
