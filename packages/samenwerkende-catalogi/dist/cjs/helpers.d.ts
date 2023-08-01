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
export declare const getPrefLabel: (values: Values[], resourceIdentifierQuery: string) => string;
export declare const createScheme: (id: string, map: PrefixMap) => string;
export {};
