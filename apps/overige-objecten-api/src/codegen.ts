import { CodegenConfig } from '@graphql-codegen/cli';
import { config } from 'dotenv';

config();

if (!process.env.STRAPI_PRIVATE_URL) {
  throw new Error('`STRAPI_PRIVATE_URL` is required to start codegen');
}

const { origin } = new URL(process.env.STRAPI_PRIVATE_URL);

const codegenConfig: CodegenConfig = {
  schema: `${origin}/graphql`,
  documents: ['src/queries/index.ts'],
  ignoreNoDocuments: true,
  generates: {
    './gql/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        inlineFragmentTypes: 'combine',
        skipTypename: true,
        nonOptionalTypename: false,
      },
    },
  },
};

export default codegenConfig;
