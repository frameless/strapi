import path from 'path';
import { URL, fileURLToPath } from 'node:url';

const { hostname, protocol, port } = new URL(process.env.STRAPI_PUBLIC_URL || 'http://localhost:1337');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@frameless/ui', '@utrecht/component-library-react', '@utrecht/web-component-library-react'],
  images: {
    // In development localhost always resolves to a private IP, so allow it unconditionally.
    // In production this is only needed when Next.js and Strapi share the same Docker host
    // (i.e. STRAPI_PUBLIC_URL resolves to a private Docker bridge IP). Set
    // NEXT_IMAGES_DANGEROUSLY_ALLOW_LOCAL_IP=true in that environment. Safe because
    // remotePatterns already restricts the image optimizer to a single trusted hostname.
    // https://nextjs.org/docs/app/api-reference/components/image#dangerouslyallowlocalip
    dangerouslyAllowLocalIP:
      process.env.NODE_ENV === 'development' || process.env.NEXT_IMAGES_DANGEROUSLY_ALLOW_LOCAL_IP === 'true',
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
