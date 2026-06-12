import { CodegenConfig } from '@graphql-codegen/cli';
import { config } from 'dotenv';

config();

if (!process.env.STRAPI_PRIVATE_URL) {
  throw new Error('`STRAPI_PRIVATE_URL` is required to start codegen');
}

const { origin } = new URL(process.env.STRAPI_PRIVATE_URL);

const codegenConfig: CodegenConfig = {
  schema: `${origin}/graphql`,
  documents: ['src/queries.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gql/': {
      preset: 'client',
    },
  },
};

export default codegenConfig;
