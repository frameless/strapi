# @frameless/frontend app

## Getting Started

**Environment variable**
create two files in root of this package

1 - `.env.development.local`

```env
STRAPI_HOSTNAME=localhost
STRAPI_GRAPHQL_URL=http://$STRAPI_HOSTNAME:1337/graphql
```

2 - `.env.production.local`

```env
STRAPI_HOSTNAME=utrecht-cms-c3nji.ondigitalocean
STRAPI_GRAPHQL_URL=http://$STRAPI_HOSTNAME:1337/graphql
```

Just cloned the repo!

run this command from the root level

```bash
npm i
```

To run the development server

Run the script below from the root

```bash
npm run dev
```

Will trigger the backend and the frontend!
