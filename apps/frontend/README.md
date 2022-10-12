# @frameless/frontend app

## Getting Started

**Environment variable**
create two files in the root

1 - `.env.development.local`

```env
HOSTNAME=localhost
PORT=1337
API_URL=http://$HOSTNAME:$PORT/graphql
```

2 - `.env.production.local`

```env
HOSTNAME=utrecht-cms-c3nji.ondigitalocean
API_URL=https://utrecht-cms-c3nji.ondigitalocean.app/graphql
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
