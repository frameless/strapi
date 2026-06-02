import path from 'path';
import { URL, fileURLToPath } from 'node:url';

const { hostname, protocol, port } = new URL(process.env.STRAPI_PUBLIC_URL || 'http://localhost:1337');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@frameless/ui', '@utrecht/component-library-react', '@utrecht/web-component-library-react'],
  images: {
    // See: https://nextjs.org/docs/app/api-reference/components/image#dangerouslyallowlocalip
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: protocol.replace(/:$/, ''),
        hostname,
        port: port,
      },
    ],
  },
  turbopack: {},
};

export default nextConfig;
