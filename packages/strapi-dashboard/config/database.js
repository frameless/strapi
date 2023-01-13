const path = require('path');

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

if (POSTGRES_DB && POSTGRES_USER && POSTGRES_PASSWORD) {
  module.exports = ({ env }) => ({
    connection: {
      client: 'postgres',
      connection: {
        host: env('POSTGRES_HOST', POSTGRES_HOST ?? 'localhost'),
        port: env.int('DATABASE_PORT', POSTGRES_PORT ?? 5432),
        database: env('DATABASE_NAME', POSTGRES_DB),
        user: env('DATABASE_USERNAME', POSTGRES_USER),
        password: env('DATABASE_PASSWORD', POSTGRES_PASSWORD),
        schema: env('DATABASE_SCHEMA', 'public'),
        // ssl: {
        //   rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
        // },
      },
      debug: false,
    },
  });
} else {
  module.exports = ({ env }) => ({
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  });
}
