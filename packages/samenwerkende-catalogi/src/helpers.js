const getPrefLabel = (values, resourceIdentifierQuery) => {
  const result = values.find(({ resourceIdentifier }) => resourceIdentifier === resourceIdentifierQuery);
  return result ? result.prefLabel : null;
};

const lookupPrefix = (map, namespaceURI) => {
  for (const prefix in map) {
    if (map.hasOwnProperty(prefix) && map[prefix] === namespaceURI) {
      return prefix;
    }
  }
  return null;
};

const createName = (namespaceURI, name, map) => {
  const prefix = lookupPrefix(map, namespaceURI);
  return prefix ? `${prefix}:${name}` : name;
};

const CLARK_REGEXP = /^(?:\{([^\}]*)\})?(.+)$/;

const createSchemeType = (string) => {
  const match = CLARK_REGEXP.exec(string);

  return (
    match && {
      namespaceURI: match[1],
      name: match[2],
    }
  );
};

const createScheme = (id, map) => {
  const schemeData = createSchemeType(id);
  if (schemeData) {
    return createName(schemeData.namespaceURI, schemeData.name, map);
  }
};

module.exports = { createScheme, getPrefLabel };
