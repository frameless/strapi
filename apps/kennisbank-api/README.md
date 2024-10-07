# kennisbank-api

The **kennisbank-api** is a microservice built with Node.js that maps certain PDC product fields to the **kennisartikel** and **VAC** fields.

## Features

- OpenAPI documentation.
- Request validation against **kennisartikel** and **VAC** schemas, ensuring that each field has the correct type.
- Automatic generation of TypeScript interfaces for **kennisartikel** and **VAC** schemas.
- Provides clear and descriptive error messages in JSON format when validation fails.

## Getting Started

You can run the server locally in two ways:

### 1. Start with Docker

Ensure that you have the following environment variables in the `.pdc.prod.env` file before starting:

```shell
PDC_STRAPI_API_TOKEN="" # Obtain this token from the PDC Strapi dashboard under Settings > API Tokens > Create New API Token. Only enable 'find' and 'findOne' permissions for the product API.
KENNIS_BANK_API_PORT=4001
KENNIS_BANK_CORS=http://localhost:3000 # If using multiple domains, separate them with a comma (e.g., 'http://localhost:3000, http://localhost:3001').
```

To start the service, open a terminal in the project root and run:

```shell
cd bin && bash ./deploy.sh pdc-dashboard prod up --build
```

### 2. Start without Docker

Create an .env file in the apps/kennisbank-api directory with the following environment variables:

```shell
STRAPI_PRIVATE_URL=http://127.0.0.1:1337/
FRONTEND_PUBLIC_URL=http://localhost:3000/
PDC_STRAPI_API_TOKEN=''
KENNIS_BANK_API_PORT=4001
KENNIS_BANK_CORS='' # Required for client-side application
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

3. Start the kennisbank-api server:

   ```shell
   yarn workspace @frameless/kennisbank-api dev

   ```

## API Endpoints

- Kennisartikel API: [http://localhost:4001/api/v1/objects](http://localhost:4001/api/v1/objects)
- OpenAPI specification: [http://localhost:4001/api/v1/openapi.json](http://localhost:4001/api/v1/openapi.json)
