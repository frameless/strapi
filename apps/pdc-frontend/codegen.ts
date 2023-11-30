import { CodegenConfig } from '@graphql-codegen/cli';
import { config } from 'dotenv';

config();

if (!process.env.STRAPI_PUBLIC_URL) {
  throw new Error('`STRAPI_PUBLIC_URL` is required to start codegen');
}

const { origin } = new URL(process.env.STRAPI_PUBLIC_URL);

const codegenConfig: CodegenConfig = {
  schema: `${origin}/graphql`,
  documents: ['src/query/index.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './gql/': {
      preset: 'client',
    },
  },
};

export default codegenConfig;
