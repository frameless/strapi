# Utrecht PDC

## Add environments variables

Create two files in the project root: `.project-name.prod.env` and `.project-name.dev.env`, if they don't already exist.
For example, you could have `.pdc.prod.env` and `.pdc.dev.env`. Then, copy the environment variables provided below into these files.

```env
ADMIN_JWT_SECRET=
API_TOKEN_SALT=
APP_KEYS=
DATABASE_CLIENT=
DATABASE_HOST=0.0.0.0
DATABASE_NAME=
DATABASE_PASSWORD=
DATABASE_PORT=
DATABASE_SSL=
DATABASE_USERNAME=
FRONTEND_PUBLIC_URL=
HOST=0.0.0.0
JWT_SECRET=
NODE_ENV=
OPEN_FORMS_API_URL=
OPEN_FORMS_SDK_URL=
OPEN_FORMS_CSS_URL=
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
PORT=1337
PREVIEW_SECRET_TOKEN=
STRAPI_PRIVATE_URL=
STRAPI_PUBLIC_URL=
TRANSFER_TOKEN_SALT=
```

## Run the development environment

Start the environment with:

```bash
# development

cd bin/ && bash ./deploy.sh project-name dev up --build # or

# production
cd bin/ && bash ./deploy.sh project-name prod up --build
```

Valid project names are:

- `pdc-frontend`
- `vth-frontend`
- `kennisbank-frontend`

Go to <http://localhost:1337> and setup an admin account.

Then make sure to configure the right permissions for unauthenticated users in Settings > Roles > Public. Check the following items:

- Faq: find, fineOne
- Price: find, fineOne
- Product: find, fineOne
- i18n: listLocales
- Slugify: findSlug
- Upload: find, findOne

And choose "Save".

You can now create products and FAQ items using the Content Manager and view them on the frontend: <http://localhost:3000/>.

## Environments Variables Types

| No. | Variable name              | Description                                                                                                    | Type                          | Default Value | Application               | Note                                                                                                                                                                                                                     |
| --- | -------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | `HOST`                     |                                                                                                                | `Number`                      |               | strapi-dashboard          | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options)                                                                                                                |
| 2   | `STRAPI_PUBLIC_URL`        |                                                                                                                | `URL`                         |               | Frontend                  | The Strapi dashboard URL, e.g., `http://localhost:1337/`                                                                                                                                                                 |
| 3   | `APP_KEYS`                 | The secret key for session cookie signing                                                                      | `String`                      |               | strapi-dashboard          | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options)                                                                                                                |
| 4   | `API_TOKEN_SALT`           | Salt for generating API tokens                                                                                 | `String`                      |               | strapi-dashboard          | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options)                                                                                                                |
| 5   | `ADMIN_JWT_SECRET`         | Secret for signing JWTs for the Admin panel                                                                    | `String`                      |               | strapi-dashboard          | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options)                                                                                                                |
| 6   | `JWT_SECRET`               | Secret for signing JWTs for the Users-Permissions plugin                                                       | `String`                      |               | strapi-dashboard          | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options)                                                                                                                |
| 7   | `DATABASE_CLIENT`          | Database client to use                                                                                         | `String`                      | sqlite        | strapi-dashboard          | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| 8   | `DATABASE_HOST`            | Database host                                                                                                  | `String`                      |               | strapi-dashboard          | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| 9   | `DATABASE_PORT`            | Database port                                                                                                  | `String`                      |               | strapi-dashboard          | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| 10  | `DATABASE_NAME`            | Database name                                                                                                  | `String`                      |               | strapi-dashboard          | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| 11  | `DATABASE_USERNAME`        | Database username                                                                                              | `String`                      |               | strapi-dashboard          | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| 12  | `DATABASE_PASSWORD`        | Database password                                                                                              | `String`                      |               | strapi-dashboard          | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| 13  | `DATABASE_SSL`             | For SSL database connection. Use an object to pass certificate files as strings.                               | `Boolean` or `Object`         |               | strapi-dashboard          | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| 14  | `NODE_ENV`                 |                                                                                                                | `production` \| `development` |               |                           |                                                                                                                                                                                                                          |
| 15  | `FRONTEND_PUBLIC_URL`      |                                                                                                                | `String`                      |               | strapi-dashboard          |                                                                                                                                                                                                                          |
| 16  | `STRAPI_PRIVATE_URL`       |                                                                                                                | `String`                      |               | frontend                  |                                                                                                                                                                                                                          |
| 17  | `OPEN_FORMS_API_URL`       | PDC ONLY: URL for Open Forms API (usually the origin + /api/v2)                                                | `String`                      |               | frontend                  |                                                                                                                                                                                                                          |
| 18  | `OPEN_FORMS_SDK_URL`       | PDC ONLY / Optional : URL for Open Forms SDK                                                                   | `String`                      |               | frontend                  |                                                                                                                                                                                                                          |
| 19  | `OPEN_FORMS_CSS_URL`       | PDC ONLY / Optional: URL for Open Forms CSS                                                                    | `String`                      |               | frontend                  |                                                                                                                                                                                                                          |
| 20  | `PREVIEW_SECRET_TOKEN`     | Secret used for the Strapi preview plugin                                                                      | `String`                      |               | strapi-dashboard frontend |                                                                                                                                                                                                                          |
| 21  | `PGADMIN_DEFAULT_EMAIL`    |                                                                                                                | `String`                      |               | Database                  |                                                                                                                                                                                                                          |
| 22  | `PGADMIN_DEFAULT_PASSWORD` |                                                                                                                | `String`                      |               | Database                  |                                                                                                                                                                                                                          |
| 23  | `TRANSFER_TOKEN_SALT`      | Salt for generating Transfer tokens. If no transfer token salt is defined, transfer features will be disabled. | `String`                      |               | strapi-dashboard          | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options) Secrets can be generated manually by running `node -p "require('crypto').randomBytes(48).toString('base64');"` |
