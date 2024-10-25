# overige-objecten-api

The **overige-objecten-api** is a microservice built with Node.js that maps certain PDC product fields to the **kennisartikel** and **VAC** fields.

## Features

- OpenAPI documentation.
- Request validation against **kennisartikel** and **VAC** schemas, ensuring that each field has the correct type.
- Automatic generation of TypeScript interfaces for **kennisartikel** and **VAC** schemas.
- Provides clear and descriptive error messages in JSON format when validation fails.

## Getting Started

You can run the server locally in two ways:

> Note: Before proceeding, ensure you generate an API token from the Strapi dashboard by following these steps:

1. Go to the PDC Strapi dashboard.
2. Navigate to Settings > API Tokens and select Create New API Token.
3. Allow access only to the product API by checking the boxes for find and findOne.
4. Once you've configured the permissions, click Save.

After generating the token, include it in your request headers as a Bearer token. Here's an example:

```ts
Authorization: Bearer API_TOKEN
```

### 1. Start with Docker

Ensure that you have the following environment variables in the `.pdc.prod.env` file before starting:

```shell
OVERIGE_OBJECTEN_API_PORT=4001
OVERIGE_OBJECTEN_API_CORS=http://localhost:3000 # If using multiple domains, separate them with a comma (e.g., 'http://localhost:3000, http://localhost:3001').
```

To start the service, open a terminal in the project root and run:

```shell
cd bin && bash ./deploy.sh pdc-dashboard prod up --build
```

### 2. Start without Docker

Create an .env file in the apps/overige-objecten-api directory with the following environment variables:

```shell
STRAPI_PRIVATE_URL=http://127.0.0.1:1337/
OVERIGE_OBJECTEN_API_PORT=4001
OVERIGE_OBJECTEN_API_CORS='' # Required for client-side application
```

Then, follow these steps:

1. Build the project:

   ```shell
   yarn build

   ```

2. Start the PDC-dashboard server:

   ```shell
   yarn workspace @frameless/pdc-dashboard dev

   ```

3. Start the overige-objecten-api server:

   ```shell
   yarn workspace @frameless/overige-objecten-api dev

   ```

## API Endpoints

- Kennisartikel API: [http://localhost:4001/api/v1/objects](http://localhost:4001/api/v1/objects)
- OpenAPI specification: [http://localhost:4001/api/v1/openapi.json](http://localhost:4001/api/v1/openapi.json)
