# Utrecht PDC

## Add environments variables

Create `.prod.env` en `.dev.env` files and copy the env variables below

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
JWT_SECRET=
DATABASE_CLIENT=
DATABASE_HOST=0.0.0.0
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_SSL=
NODE_ENV=
STRAPI_FRONTEND_URL=
STRAPI_BACKEND_URL=
REVALIDATE_SECRET_TOKEN=
PREVIEW_SECRET_TOKEN=
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
TRANSFER_TOKEN_SALT=
STRAPI_IMPORT_DATA_ENCRYPTION_KEY=
STRAPI_IMAGE_URL=
FRONTEND_DOMAIN=

```

## Run the development environment

Start the environment with:

```bash
# development

cd bin/ && bash ./deploy.sh dev up --build # or

# production
cd bin/ && bash ./deploy.sh prod up --build

```

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

## Environments Variables

First, you have to create two files in the project root, in case there are not exist `.prod.env` and `.dev.env`, and you can use the variable below

| Variable name                       |                                                                                                                                     Description                                                                                                                                     | Type                          | Default Value      | Application               | Note                                                                                                                                                                                                                     |
| ----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ----------------------------- | ------------------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `HOST`                              |                                                                                                                                                                                                                                                                                     | `Number`                      |                    | strapi-dashbaord          | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options)                                                                                                                |
| `STRAPI_IMAGE_URL`                  |                                                                                                                                                                                                                                                                                     | `URL`                         |                    | Frontend                  | The Strapi dashboard url for example: `http://localhost:1337/`                                                                                                                                                           |
| `FRONTEND_DOMAIN`                   |                                                                                                                                                                                                                                                                                     | `URL`                         |                    | Frontend                  |                                                                                                                                                                                                                          |
| `PORT`                              |                                                                                                                                                                                                                                                                                     | `Number`                      |                    | strapi-dashbaord          | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options)                                                                                                                |
| `APP_KEYS`                          |                                                                                                                 The secret key is used to sign the session cookies.                                                                                                                 | `String`                      |                    | strapi-dashbaord          | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options) Secrets can be generated manually by running `node -p "require('crypto').randomBytes(48).toString('base64');"` |
| `API_TOKEN_SALT`                    |                                                                                                                          Salt used to generate API tokens                                                                                                                           | `String`                      |                    | strapi-dashbaord          | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options) Secrets can be generated manually by running `node -p "require('crypto').randomBytes(48).toString('base64');"` |
| `ADMIN_JWT_SECRET`                  |                                                                                                                The secret used to sign the JWT for the Admin panel.                                                                                                                 | `String`                      |                    | strapi-dashbaord          | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options)                                                                                                                |
| `JWT_SECRET`                        |                                                                                                          The secret used to sign the JWT for the Users-Permissions plugin.                                                                                                          | `String`                      |                    | strapi-dashbaord          | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options)                                                                                                                |
| `DATABASE_CLIENT`                   |                                                                                                                             The database client to use.                                                                                                                             | `String`                      | sqlite             | strapi-dashbaord          | **sqlite** used only when you run the local server without Docker [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                    |
| `DATABASE_HOST`                     |                                                                                                                                 The database host.                                                                                                                                  | `String`                      |                    | strapi-dashbaord          | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| `DATABASE_PORT`                     |                                                                                                                                 The database port.                                                                                                                                  | `String`                      |                    | strapi-dashbaord          | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| `DATABASE_NAME`                     |                                                                                                                                 The database name.                                                                                                                                  | `String`                      |                    | strapi-dashbaord          | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| `DATABASE_USERNAME`                 |                                                                                                                               The database username.                                                                                                                                | `String`                      |                    | strapi-dashbaord          | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| `DATABASE_PASSWORD`                 |                                                                                                                               The database password.                                                                                                                                | `String`                      |                    | strapi-dashbaord          | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| `DATABASE_SSL`                      |                                                                                                  For SSL database connection. Use an object to pass certificate files as strings.                                                                                                   | `Boolean` or `Object`         |                    | strapi-dashbaord          | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| `NODE_ENV`                          |                                                                                                                                                                                                                                                                                     | `production` \| `development` |                    |                           |                                                                                                                                                                                                                          |
| `STRAPI_FRONTEND_URL`               |                                                                                                                                                                                                                                                                                     | `String`                      |                    | strapi-dashbaord          |                                                                                                                                                                                                                          |
| `STRAPI_BACKEND_URL`                |                                                                                                                                                                                                                                                                                     | `String`                      |                    | frontend                  |
| `PREVIEW_SECRET_TOKEN`              |                                                                                                          This is for the Strapi preview plugin, also used in the frontend                                                                                                           | `String`                      |                    | strapi-dashbaord frontend |                                                                                                                                                                                                                          |
| `PGADMIN_DEFAULT_EMAIL`             |                                                                                                                                                                                                                                                                                     | `String`                      |                    | Database                  |                                                                                                                                                                                                                          |
| `PGADMIN_DEFAULT_PASSWORD`          |                                                                                                                                                                                                                                                                                     | `String`                      |                    | Database                  |                                                                                                                                                                                                                          |
| `AWS_ACCESS_KEY_ID`                 |                                                                                                                                                                                                                                                                                     | `String`                      |                    | strapi-dashbaord          |                                                                                                                                                                                                                          |
| `AWS_ACCESS_SECRET`                 |                                                                                                                                                                                                                                                                                     | `String`                      |                    | strapi-dashbaord          |                                                                                                                                                                                                                          |
| `AWS_REGION`                        |                                                                                                                                                                                                                                                                                     | `String`                      |                    | strapi-dashbaord          |                                                                                                                                                                                                                          |
| `AWS_SIGNED_URL_EXPIRES`            |                                                                                                                                                                                                                                                                                     | `Date`                        | `60 * 60 * 24 * 7` | strapi-dashbaord          |                                                                                                                                                                                                                          |
| `AWS_BUCKET`                        |                                                                                                                                                                                                                                                                                     | `String`                      |                    | strapi-dashbaord          |                                                                                                                                                                                                                          |
| `TRANSFER_TOKEN_SALT`               | Salt used to generate Transfer tokens. If no transfer token salt is defined, transfer features will be disabled. [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options) Currently, we use it only in the Development environment | `String`                      |                    | strapi-dashbaord          | Secrets can be generated manually by running `node -p "require('crypto').randomBytes(48).toString('base64');"`                                                                                                           |
| `STRAPI_IMPORT_DATA_ENCRYPTION_KEY` |                                                                                              Currently, we use it only in the Development environment to export and import Strapi date                                                                                              | `String`                      |                    | strapi-dashbaord          | Secrets can be generated manually by running `node -p "require('crypto').randomBytes(48).toString('base64');"`                                                                                                           |

## Strapi Data export & import

Data export is so helpful to export the current data and import it in a different Strapi instance.
Currently, we use it for the development environment.
[More useful information about Data export](https://docs.strapi.io/dev-docs/data-management/export)

### Usage

First, you need to generate a token and assign it to `STRAPI_IMPORT_DATA_ENCRYPTION_KEY` variable in the `.dev.env` file.

Generate encryption keys in a terminal:

- Mac/Linux `openssl rand -base64 48`
- Windows `node -p "require('crypto').randomBytes(48).toString('base64');"`

Run the project by using the command below

```shell
 cd bin && bash ./deploy.sh dev up --build
```

When the server is up, run this command to `docker ps` to shows running containers
The output should be something like the example below

| CONTAINER ID | IMAGE                  | COMMAND                | CREATED        | STATUS                 | PORTS                            | NAMES              |
| ------------ | ---------------------- | ---------------------- | -------------- | ---------------------- | -------------------------------- | ------------------ |
| e2032d64b873 | frameless-cms_frontend | "docker-entrypoint.s…" | 25 minutes ago | Up 4 minutes           | 1337/tcp, 0.0.0.0:3000->3000/tcp | frontend           |
| a57b06124325 | strapi:latest          | "/bin/sh -c 'yarn wo…" | 25 minutes ago | Up 5 minutes           | 0.0.0.0:1337->1337/tcp           | strapi             |
| 308a18311f42 | dpage/pgadmin4         | "/entrypoint.sh"       | 25 minutes ago | Up 5 minutes           | 443/tcp, 0.0.0.0:8080->80/tcp    | pgadmin4_container |
| 12e2f8ffa426 | 12e2f8ffa426           | "docker-entrypoint.s…" | 25 minutes ago | Up 5 minutes (healthy) | 0.0.0.0:5432->5432/tcp           | strapi_db          |

So, you need to copy the Strapi container id, then run this command `docker exec -it strapi-container-id /bin/sh` to enter the docker image
Navigate to the `strapi-dashboard` folder by using this command `cd apps/strapi-dashboard/`, and then check if there is an existing strapi-exported file by using this command `ls`

> Note the extension file should be `.tar.gz.enc`

For development you can delete existing file `npx rimraf demoData.tar.gz.enc`, and then generate a new one with the current data by using this command `yarn strapi export --file demoData --key my-encryption-key`

When the `demoData.tar.gz.enc` file is generated, we need to import it from Docker to our local machine by using the command below

```sh
docker cp <Container ID>:<Path of file inside the container> <Path in the local machine>

# example `docker cp a57b06124325:/opt/app/apps/strapi-dashboard/demoData.tar.gz.enc ~/Dev/react/frameless-cms/apps/strapi-dashboard/`
```

> **Note**
> The Strapi export file name should be `demoData`, because we use it in the `docker-compose.dev.yml` to import it each time you run docker

```sh
yarn workspace @frameless/strapi-dashboard strapi import -f demoData.tar.gz.enc --force --key ${STRAPI_IMPORT_DATA_ENCRYPTION_KEY}
```

In this case we update the strapi export file!
