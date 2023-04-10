type Values = {
  resourceIdentifier?: string;
  prefLabel?: string;
};

type PrefixMap = {
  xsi: string;
  dcterms: string;
  overheid: string;
  overheidproduct: string;
};

export const getPrefLabel = (values: Values[], resourceIdentifierQuery: string) => {
  const result = values.find(({ resourceIdentifier }) => resourceIdentifier === resourceIdentifierQuery);
  return result ? result.prefLabel : null;
};

const lookupPrefix = (map: PrefixMap, namespaceURI: string) => {
  for (const prefix in map) {
    if (Object.prototype.hasOwnProperty.call(map, prefix) && map[prefix as string] === namespaceURI) {
      return prefix;
    }
  }
  return null;
};

const createName = (namespaceURI: string, name: string, map: PrefixMap) => {
  const prefix = lookupPrefix(map, namespaceURI);
  return prefix ? `${prefix}:${name}` : name;
};

const CLARK_REGEXP = /^(?:\{([^}]*)\})?(.+)$/;

const createSchemeType = (string: any) => {
  const match = CLARK_REGEXP.exec(string);

  return (
    match && {
      namespaceURI: match[1],
      name: match[2],
    }
  );
};

export const createScheme = (id: string, map: PrefixMap) => {
  const schemeData = createSchemeType(id);
  if (schemeData) {
    return createName(schemeData.namespaceURI, schemeData.name, map);
  } else {
    return undefined;
  }
};
