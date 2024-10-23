import type { Request } from 'express';
export const getTheServerURL = (request: Request) => `${request.protocol}://${request.get('host')}`;
