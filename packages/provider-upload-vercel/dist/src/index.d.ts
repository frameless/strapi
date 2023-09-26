/// <reference types="node" />
/// <reference types="node" />
import { ReadStream } from 'node:fs';
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
    buffer: Buffer;
}
declare const _default: {
    init(config: any): {
        upload(file: File): Promise<void>;
        uploadStream(file: File): Promise<void>;
        delete(file: File): Promise<void>;
    };
};
export default _default;
