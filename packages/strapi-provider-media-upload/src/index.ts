import type { Strapi } from '@strapi/strapi';
import * as utils from '@strapi/utils';
import fs, { ReadStream } from 'fs';
import fse from 'fs-extra';
import path from 'path';
import { pipeline } from 'stream';

interface File {
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: Record<string, unknown>;
  hash: string;
  ext?: string;
  mime: string;
  size: number;
  sizeInBytes: number;
  url: string;
  previewUrl?: string;
  path?: string;
  provider?: string;
  provider_metadata?: Record<string, unknown>;
  stream?: ReadStream;
  buffer?: Buffer;
}

const { PayloadTooLargeError, ValidationError } = utils.errors;
const { kbytesToBytes, bytesToHumanReadable } = utils.file;

const UPLOADS_FOLDER_NAME = 'uploads';

interface InitOptions {
  allowedMimeTypes?: string[];
}

interface CheckFileOptions {
  sizeLimit?: number;
  allowedMimeTypes?: string[];
}

export default {
  init({ allowedMimeTypes }: InitOptions = {}) {
    const strapiGlobal = global.strapi as Strapi;
    // Ensure uploads folder exists
    if (!strapiGlobal || !strapiGlobal.dirs?.static?.public) {
      throw new Error('Strapi global object with dirs.static.public is not available.');
    }

    const uploadPath = path.resolve(strapiGlobal.dirs.static.public, UPLOADS_FOLDER_NAME);
    if (!fse.pathExistsSync(uploadPath)) {
      throw new Error(
        `The upload folder (${uploadPath}) doesn't exist or is not accessible. Please make sure it exists.`,
      );
    }

    // Helper to check size and mime type
    const checkFile = (file: File, options: CheckFileOptions) => {
      const { sizeLimit, allowedMimeTypes } = options;

      // Size check
      const limit = sizeLimit;
      if (limit && kbytesToBytes(file.size) > limit) {
        throw new PayloadTooLargeError(`${file.name} exceeds size limit of ${bytesToHumanReadable(limit)}.`);
      }

      // Mime type check
      if (allowedMimeTypes && !allowedMimeTypes.includes(file.mime)) {
        const allowedTypes = allowedMimeTypes.map((type) => type.split('/')[1].toUpperCase()).join(', ');
        const message = `${file.name} has unsupported file type: ${file.mime}. Only ${allowedTypes} are allowed.`;

        const error = new ValidationError(message);
        (error as any).status = 400;

        throw error;
      }
    };

    return {
      checkFileSize(file: File, options: CheckFileOptions) {
        checkFile(file, options);
      },

      uploadStream(file: File): Promise<void> {
        checkFile(file, { allowedMimeTypes });

        if (!file.stream) {
          return Promise.reject(new Error('Missing file stream'));
        }

        const { stream } = file;

        return new Promise((resolve, reject) => {
          pipeline(stream, fs.createWriteStream(path.join(uploadPath, `${file.hash}${file.ext}`)), (err) => {
            if (err) {
              return reject(err);
            }

            file.url = `/${UPLOADS_FOLDER_NAME}/${file.hash}${file.ext}`;
            resolve();
          });
        });
      },

      upload(file: File): Promise<void> {
        checkFile(file, { allowedMimeTypes });

        if (!file.buffer) {
          return Promise.reject(new Error('Missing file buffer'));
        }

        const { buffer } = file;

        return new Promise((resolve, reject) => {
          fs.writeFile(path.join(uploadPath, `${file.hash}${file.ext}`), buffer, (err) => {
            if (err) {
              return reject(err);
            }

            file.url = `/${UPLOADS_FOLDER_NAME}/${file.hash}${file.ext}`;
            resolve();
          });
        });
      },

      delete(file: File): Promise<string | void> {
        return new Promise((resolve, reject) => {
          const filePath = path.join(uploadPath, `${file.hash}${file.ext}`);

          if (!fs.existsSync(filePath)) {
            resolve("File doesn't exist");
            return;
          }

          fs.unlink(filePath, (err) => {
            if (err) {
              return reject(err);
            }

            resolve();
          });
        });
      },
    };
  },
};
