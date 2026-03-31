import gemeente from '@frameless/catalogi-data';
import { uplKeyValues } from '@frameless/upl';
import dotenv from 'dotenv';
import { mapKeys } from 'lodash';
import { create } from 'xmlbuilder2';

import { createScheme, getPrefLabel, isValidURL } from './helpers';

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
  abstract: string;
};

type PdcMetaType = {
  uplProductNaam?: string;
};

type AudienceType = {
  id: string;
  type: string;
  scheme: string;
};

type SamenWerkendeCatalogiAttributesTypes = {
  documentId: string;
  catalogiMeta: CatalogiMetaType;
  pdc_metadata: PdcMetaType;
  locale: string;
  slug: string;
  title: string;
  updatedAt: string;
};

export const convertJsonToXML = (data: SamenWerkendeCatalogiAttributesTypes[], frontend_url: string) => {
  if (!frontend_url) {
    throw new Error('frontend_url is required');
  } else if (!isValidURL(frontend_url)) {
    throw new Error('Invalid frontend_url value');
  } else if (!data && data.length === 0) {
    throw new Error('The `data` parameter is required');
  } else {
    const root = create({ version: '1.0', encoding: 'utf-8' })
      .ele('overheidproduct:scproducten')
      .att({
        ...xmlnsPrefixMap,
        'xsi:schemaLocation': 'https://standaarden.overheid.nl/product/terms/sc.xsd',
      });

    const meta = data.map((item) => {
      const gemeenteSpatial = item.catalogiMeta?.spatial.resourceIdentifier;
      const gemeenteAuthority = item.catalogiMeta?.authority.resourceIdentifier;
      const uniformProductName = uplKeyValues.find(({ uri }) => uri === item.pdc_metadata?.uplProductNaam);
      const prefLabelSpatial = getPrefLabel(gemeente.cv.value, item.catalogiMeta?.spatial.resourceIdentifier);
      const prefLabelAuthority = getPrefLabel(gemeente.cv.value, item.catalogiMeta?.authority.resourceIdentifier);
      const schemeAuthority = createScheme(item.catalogiMeta?.authority?.scheme, prefixMap);
      const schemeSpatial = createScheme(item.catalogiMeta?.spatial?.scheme, prefixMap);
      const path = 'products'; // can be from the CMS
      const identifier = `${frontend_url.endsWith('/') ? frontend_url : `${frontend_url}/`}${item.locale}/${path}/${
        item.slug
      }`;

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
        item.catalogiMeta && item.catalogiMeta?.audience
          ? item.catalogiMeta?.audience.map(({ id, type }) => ({ id, type, scheme: 'overheid:Doelgroep' }))
          : [];

      return {
        productId: item.documentId,
        title: item.title,
        language: item.locale,
        modified: item.updatedAt,
        abstract: item.catalogiMeta?.abstract,
        onlineAanvragen: item.catalogiMeta?.onlineRequest.type,
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
            resourceIdentifier: `http://standaarden.overheid.nl/owms/terms/${audience?.type?.toLowerCase()}`,
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
  }
};
