import type { NextFunction, Request, Response } from 'express';
import fs from 'node:fs';
import pLimit from 'p-limit';
import { CreateVacResponse } from '../../strapi-product-types';
import { fetchData, processCsvFile } from '../../utils';

const limit = pLimit(5); // Limit the number of concurrent file uploads
export const importController = async (req: Request, res: Response, next: NextFunction) => {
  const type = req.body.type;
  if (req.file) {
    const filePath = req.file.path;
    const requiredColumns = ['vraag', 'antwoord'];

    try {
      // Process the CSV file and sanitize results
      const authorizationHeader = req.headers?.authorization || '';
      const [authType, authToken] = authorizationHeader.split(/\s+/);
      const tokenAuth = authType === 'Token' ? authToken : authorizationHeader;
      const url = new URL(process.env.OVERIGE_OBJECTEN_API_URL as string).href;
      const sanitizedResults = await processCsvFile(filePath, requiredColumns);

      if (type === 'vac') {
        // Loop through the sanitized results and create entries one by one
        const results = await Promise.all(
          sanitizedResults.map((entry) =>
            limit(async () => {
              try {
                const vacPayload = {
                  type: `${url}/objecttypes/vac`,
                  record: {
                    data: {
                      vraag: entry?.vac?.vraag,
                      antwoord: entry?.vac?.antwoord.content,
                      doelgroep: entry.vac.doelgroep,
                    },
                  },
                };
                const responseData = await fetchData<CreateVacResponse>({
                  url: `${url}/objects`,
                  body: vacPayload,
                  headers: {
                    Authorization: tokenAuth,
                  },
                });
                return responseData;
              } catch (error: any) {
                next(error);
                // eslint-disable-next-line no-console
                console.error('Error processing entry:', error);
                return { error: error.message, entry };
              }
            }),
          ),
        );
        res.json({ message: 'CSV converted to JSON', data: results });
        // Delete temporary file after processing
        await fs.promises.unlink(filePath);
      } else {
        res.status(400).send('Invalid import type.');
      }
    } catch (error) {
      await fs.promises.unlink(filePath); // Delete the temporary file in case of error
      // Forward any errors to the error handler middleware
      next(error);
      return null;
    }
  } else {
    res.status(400).send('No file uploaded.');
  }
  return null;
};
