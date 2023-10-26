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
    abstract: string;
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
};
type SamenWerkendeCatalogiDataType = {
    id: string;
    attributes: SamenWerkendeCatalogiAttributesTypes;
};
export declare const convertJsonToXML: (data: SamenWerkendeCatalogiDataType[], frontend_url: string) => string;
export {};
