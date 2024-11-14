export interface APIInfo {
  title: string;
  description: string;
  version: string;
}

export interface Server {
  url: string;
  description: string;
}

export interface OpenAPI {
  openapi: string;
  info: APIInfo;
  servers: Server[];
  paths: Paths;
  components: Components;
}
export interface Paths {
  '/objects': ObjectsEndpoint;
  '/objects/{uuid}': ObjectByIdEndpoint;
}

export interface ObjectsEndpoint {
  get: GetObjectsOperation;
}

export interface ObjectByIdEndpoint {
  get: GetObjectByIdOperation;
}

export interface GetObjectsOperation {
  security: Array<{ TokenAuth: any[] }>;
  summary: string;
  operationId: string;
  parameters: Array<ParameterQuery>;
  responses: {
    200: ResponseListObjects;
  };
}

export interface GetObjectByIdOperation {
  security: Array<{ TokenAuth: any[] }>;
  summary: string;
  operationId: string;
  parameters: Array<ParameterPath>;
  responses: {
    200: ResponseObjectById;
    403: ErrorResponse;
    404: ErrorResponse;
    500: ErrorResponse;
  };
}
export interface ParameterQuery {
  in: 'query';
  name: string;
  required: boolean;
  schema: { type: string; format?: string; enum?: string[] };
  description: string;
}

export interface ParameterPath {
  in: 'path';
  name: string;
  required: boolean;
  schema: { type: string };
  description: string;
}

export interface ResponseListObjects {
  description: string;
  content: {
    'application/json': {
      schema: ListObjectsSchema;
      example: ListObjectsExample;
    };
  };
}

export interface ResponseObjectById {
  description: string;
  content: {
    'application/json': {
      schema: { oneOf: [{ $ref: string }, { $ref: string }] };
      example: ObjectExample;
    };
  };
}

export interface ErrorResponse {
  description: string;
  content: {
    'application/json': {
      schema: ErrorSchema;
    };
  };
}

export interface ListObjectsSchema {
  type: 'object';
  properties: {
    count: { type: 'integer'; example: number };
    next: { type: 'string'; format: 'uri'; nullable: true; example: string };
    previous: { type: 'string'; format: 'uri'; nullable: true; example: string | null };
    results: { type: 'array'; items: { $ref: string } };
  };
}

export interface ListObjectsExample {
  count: number;
  next: string | null;
  previous: string | null;
  results: ObjectData[];
}

export interface ObjectExample {
  url: string;
  uuid: string;
  type: string;
  record: ObjectRecord;
}

export interface ErrorSchema {
  type: 'object';
  properties: {
    error: { type: 'string'; example: string };
  };
}
export interface Components {
  securitySchemes: {
    TokenAuth: SecurityScheme;
  };
  schemas: {
    ObjectData: ObjectData;
    kennisartikel: KennisArtikel;
    vac: VAC;
    GeoJSONGeometry: GeoJSONGeometry;
  };
}

export interface SecurityScheme {
  type: 'apiKey';
  in: 'header';
  name: string;
}

export interface ObjectData {
  url: string;
  uuid: string;
  type: string;
  record: ObjectRecord;
}

export interface ObjectRecord {
  index: number;
  typeVersion: number;
  data: KennisArtikel | VAC;
  geometry: GeoJSONGeometry | null;
  startAt: string;
  endAt: string | null;
  registrationAt: string;
  correctionFor?: number;
  correctedBy?: number;
}
export interface KennisArtikel {
  url: string;
  uuid: string;
  upnUri: string;
  publicatieDatum: string | null;
  productAanwezig: boolean | null;
  productValtOnder: string | null;
  verantwoordelijkeOrganisatie: VerantwoordelijkeOrganisatie;
  locaties?: string[] | null;
  doelgroep: 'eu-burger' | 'eu-bedrijf';
  afdelingen: Afdeling[];
  vertalingen: Vertaling[];
  beschikbareTalen: string[];
}

export interface VerantwoordelijkeOrganisatie {
  url: string;
  owmsIdentifier: string;
  owmsPrefLabel?: string;
  owmsEndDate: string;
}

export interface Afdeling {
  afdelingId?: string;
  afdelingNaam: string;
}

export interface Vertaling {
  taal: 'nl' | 'en';
  titel?: string;
  tekst?: string;
  procedureBeschrijving?: string;
  vereisten?: string;
  bezwaarEnBeroep?: string;
  kostenEnBetaalmethoden?: string;
  uitersteTermijn?: string;
  wtdBijGeenReactie?: string;
  notice?: string;
  contact?: string;
  deskMemo?: string;
  trefwoorden?: Trefwoord[];
  datumWijziging: string;
}

export interface Trefwoord {
  trefwoord: string;
}

export interface VAC {
  url?: string;
  vraag: string;
  status: 'actief' | 'non-actief' | 'te-verwijderen';
  antwoord: string;
  doelgroep: 'eu-burger' | 'eu-bedrijf' | 'eu-burger-bedrijf';
  afdelingen: Afdeling[];
  toelichting?: string;
  trefwoorden?: Trefwoord[];
  gerelateerdeVACs?: RelatedVAC[];
  gerelateerdeProducten?: RelatedProduct[];
}

export interface RelatedVAC {
  VAC: string;
}

export interface RelatedProduct {
  product: string;
  productNaam: string;
}

export interface GeoJSONGeometry {
  type: string;
  coordinates: Point2D[] | Point2D[][] | Point2D[][][];
}

export type Point2D = [number, number];
