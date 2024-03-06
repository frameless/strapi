import { BlobAccessError, BlobUnknownError, del, put } from '@vercel/blob';
import intoStream from 'into-stream';
import { ReadStream } from 'node:fs';

class FileLocationConverter {
  private config: {
    directory?: string;
  };
  constructor(config: { directory?: string }) {
    this.config = config;
  }

  getKey(file: File): string {
    const filename = `${file.hash}${file.ext}`;
    if (!this.config.directory) return filename;
    return `${this.config.directory}/${filename}`;
  }
}

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
  url: string;
  previewUrl?: string;
  path?: string;
  provider?: string;
  provider_metadata?: Record<string, unknown>;
  stream?: ReadStream;

  // eslint-disable-next-line no-undef
  buffer: Buffer;
}

export default {
  init(config: any) {
    const converter = new FileLocationConverter(config);
    return {
      async upload(file: File) {
        try {
          if (file.buffer) {
            const bufferImage = intoStream(file.buffer);
            const blob = await put(converter.getKey(file), bufferImage, {
              access: 'public',
              contentType: file.mime,
            });
            file.url = blob.url;
          } else {
            throw new Error('buffer is not defined');
          }
        } catch (error) {
          if (error instanceof BlobAccessError) {
            throw error;
          } else if (error instanceof BlobUnknownError) {
            throw error;
          } else {
            // throw the error again if it's unknown
            throw error;
          }
        }
      },
      async uploadStream(file: File) {
        try {
          if (file.stream) {
            const blob = await put(converter.getKey(file), file.stream, {
              access: 'public',
              contentType: file.mime,
            });
            file.url = blob.url;
          } else {
            throw new Error('stream is not defined');
          }
        } catch (error) {
          if (error instanceof BlobAccessError) {
            throw error;
          } else if (error instanceof BlobUnknownError) {
            throw error;
          } else {
            // throw the error again if it's unknown
            throw error;
          }
        }
      },
      async delete(file: File) {
        try {
          await del(file.url);
        } catch (error) {
          if (error instanceof BlobAccessError) {
            // handle a recognized error
            throw error;
          } else if (error instanceof BlobUnknownError) {
            throw error;
          } else {
            // throw the error again if it's unknown
            throw error;
          }
        }
      },
    };
  },
};
