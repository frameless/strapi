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
    // or Kubernetes cluster (i.e. STRAPI_PUBLIC_URL resolves to a private IP). Set
    // NEXT_IMAGES_DANGEROUSLY_ALLOW_LOCAL_IP=true in that environment. Safe because
    // remotePatterns already restricts the image optimizer to a single trusted hostname.
    // See: https://nextjs.org/docs/app/api-reference/components/image#dangerouslyallowlocalip
    dangerouslyAllowLocalIP:
      process.env.NODE_ENV === 'development' ||
      ['true', '1'].includes(process.env.NEXT_IMAGES_DANGEROUSLY_ALLOW_LOCAL_IP),
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
