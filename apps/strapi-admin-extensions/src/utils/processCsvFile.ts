import csvParser from 'csv-parser';
import fs from 'node:fs';
import { v4 } from 'uuid';
import { sanitizeHTML } from './sanitizeHTML';

export type Vac = { vac: { vraag: string; antwoord: { content: string }; doelgroep: string | null; uuid: string } };

export const processCsvFile = (filePath: string, requiredColumns: string[]) => {
  const results: { vraag: string; antwoord: string; doelgroep?: string | null }[] = [];
  let hasRequiredColumns = true;

  // Create read stream for CSV file
  return new Promise<Vac[]>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('headers', (headers) => {
        // Check if required columns exist in the CSV file headers
        const missingColumns = requiredColumns.filter((col) => !headers.includes(col));

        if (missingColumns.length > 0) {
          // If any required columns are missing, reject with error
          hasRequiredColumns = false;
          reject({ error: 'Missing required columns', missingColumns });
        }
      })
      .on('data', (data) => {
        // If the columns are valid, push the data into results
        if (hasRequiredColumns) {
          results.push({ vraag: data.vraag, antwoord: data.antwoord });
        }
      })
      .on('end', () => {
        if (hasRequiredColumns) {
          const sanitizedResults = results.map((result) => {
            const domPurifyHTML = sanitizeHTML(result?.antwoord);
            return {
              vac: {
                vraag: result?.vraag,
                antwoord: {
                  content: domPurifyHTML,
                },
                doelgroep: result?.doelgroep || 'eu-burger', // this field is required in the overige-objecten-api
                uuid: v4(),
              },
            };
          });
          resolve(sanitizedResults);
        } else {
          reject({ error: 'CSV failed validation' });
        }
      })
      .on('error', (err) => {
        reject({ error: 'Failed to parse CSV', details: err.message });
      });
  });
};
