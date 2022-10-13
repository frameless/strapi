# @frameless/frontend app

## Getting Started

**Environment variable**
create two files in root of this package

1 - `.env.development.local`

```env
STRAPI_HOSTNAME=localhost
STRAPI_GRAPHQL_URL=http://$STRAPI_HOSTNAME:1337/graphql
REVALIDATE_SECRET_TOKEN=9ABCD68B-8B89-46EA-AAC6-BCE97BCB900A
```

2 - `.env.production.local`

```env
STRAPI_HOSTNAME=utrecht-cms-c3nji.ondigitalocean
STRAPI_GRAPHQL_URL=https://$STRAPI_HOSTNAME.app/graphql
REVALIDATE_SECRET_TOKEN=F920E798-CF4A-40F9-9688-D4D70B74D3CD
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
