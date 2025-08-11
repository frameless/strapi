---
sidebar_position: 1
---

# Start Strapi

## Clone the Repository to Your Local Machine

```shell
# Clone the repository
git clone git@github.com:frameless/strapi.git

# Navigate to the project directory
cd frameless-cms
```

## Prepare the App

Before running the app, make sure you have the following prerequisites installed on your machine:

- [Yarn Classic](https://classic.yarnpkg.com/lang/en/) version 1.22.19
- [Node.js](https://nodejs.org/) version [20.10](https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V20.md#20.10.0)

Follow these steps to prepare the app:

1. Open your terminal and navigate to the root level of the app.
2. Install Dependencies:

   ```shell
   yarn install
   ```

3. Build the Project:

   ```shell
   yarn build
   ```

These commands will ensure that all necessary dependencies are installed and the project is built successfully. Once completed, you'll be ready to run the app.

## Start the Server using Docker

To run the application as a Docker container on your Mac, follow these steps:

1. **Install Docker Desktop:**

   - Go to the Docker [website](https://docs.docker.com/desktop/install/mac-install/) and download Docker Desktop for Mac.
   - Install Docker Desktop by following the installation instructions for macOS.
   - Ensure you have `docker-compose` available. For example by installing [docker-compose with Homebrew](https://formulae.brew.sh/formula/docker-compose)

2. **Launch Docker Desktop:**

   - Once Docker Desktop is installed, launch it from your Applications folder.

3. **Add Environments variables to the project**
   If there are no existing environment variables, run:

   ```bash
   yarn init:env
   ```

   This command generates a .env file containing the necessary environment variables.
   The generated values are suitable for the PDC project in Docker production environment.

   - Running PDC in development mode
     Update the generated .env file or create a .pdc.dev.env file with the same variables, modified for development.
     For development, you need to adjust certain variables (for example, set NODE_ENV=development) to ensure the environment behaves correctly.
   - Running the VTH project
     Run the same yarn init:env command, then create a .vth.dev.env file with the same variables, modified for VTH development.

     Environment variable definitions are based on the .envsrc.json file in the project root.
     You can find detailed documentation for each variable in the [Environment Variables](./ENVIRONMENT_VARIABLES.md) file.

4. Run the Docker Image:

   Start the environment with the following commands:

   ```bash
   # development

   cd bin/ && bash ./deploy.sh project-name dev up --build # or

   # example cd bin/ && bash ./deploy.sh pdc-dashboard dev up --build

   # production
   cd bin/ && bash ./deploy.sh project-name prod up --build

   # example cd bin/ && bash ./deploy.sh pdc-dashboard prod up --build
   ```

   Valid project names are:

   - `pdc-dashboard`
   - `vth-dashboard`
   - `kennisbank-dashboard`

   Visit [http://localhost:1337/admin](http://localhost:1337/admin) to set up an admin account. Afterward, configure the right permissions for unauthenticated users and field labels in Settings > CONFIG SYNC > Interface. Click the Import Button.

   Now, you can create products and FAQ items using the Content Manager and view them on the frontend: [http://localhost:3000/](http://localhost:3000/).

## Environments Variables Types

<!-- sorted alphabetically by variable name -->

| Variable name               | Description                                                                                                                                                                                                                                                                                                        | Type                          | Default Value | Application                 | Note                                                                                                                                                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- | ------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ADMIN_JWT_SECRET`          | Secret for signing JWTs for the Admin panel                                                                                                                                                                                                                                                                        | `String`                      |               | strapi-dashboard            | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options)                                                                                                                |
| `APP_KEYS`                  | The secret key for session cookie signing                                                                                                                                                                                                                                                                          | `String`                      |               | strapi-dashboard            | [Server configuration](https://docs.strapi.io/dev-docs/configurations/server#available-options)                                                                                                                          |
| `API_TOKEN_SALT`            | Salt for generating API tokens                                                                                                                                                                                                                                                                                     | `String`                      |               | strapi-dashboard            | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options)                                                                                                                |
| `CSP_CONNECT_SRC_URLS`      | Space-separated list of URLs to allow in `Content-Security-Policy` for `connect-src`                                                                                                                                                                                                                               |                               |               |                             |                                                                                                                                                                                                                          |
| `CSP_FONT_SRC_URLS`         | Space-separated list of URLs to allow in `Content-Security-Policy` for `font-src`                                                                                                                                                                                                                                  |                               |               |                             |                                                                                                                                                                                                                          |
| `CSP_FORM_ACTION_URLS`      | Space-separated list of URLs to allow in `Content-Security-Policy` for `form-action`                                                                                                                                                                                                                               |                               |               |                             |                                                                                                                                                                                                                          |
| `CSP_FRAME_SRC_URLS`        | Space-separated list of URLs to allow in `Content-Security-Policy` for `frame-src`                                                                                                                                                                                                                                 |                               |               |                             |                                                                                                                                                                                                                          |
| `CSP_IMG_SRC_URLS`          | Space-separated list of URLs to allow in `Content-Security-Policy` for `img-src`                                                                                                                                                                                                                                   |                               |               |                             |                                                                                                                                                                                                                          |
| `CSP_SCRIPT_SRC_URLS`       | Space-separated list of URLs to allow in `Content-Security-Policy` for `script-src`                                                                                                                                                                                                                                |                               |               |                             |                                                                                                                                                                                                                          |
| `CSP_STYLE_SRC_URLS`        | Space-separated list of URLs to allow in `Content-Security-Policy` for `style-src`                                                                                                                                                                                                                                 |                               |               |                             |                                                                                                                                                                                                                          |
| `CSP_WORKER_SRC_URLS`       | Space-separated list of URLs to allow in `Content-Security-Policy` for `worker-src`                                                                                                                                                                                                                                |                               |               |                             |                                                                                                                                                                                                                          |
| `DATABASE_CLIENT`           | Database client to use                                                                                                                                                                                                                                                                                             | `String`                      | sqlite        | strapi-dashboard            | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| `DATABASE_HOST`             | Database host                                                                                                                                                                                                                                                                                                      | `String`                      |               | strapi-dashboard            | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| `DATABASE_NAME`             | Database name                                                                                                                                                                                                                                                                                                      | `String`                      |               | strapi-dashboard            | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| `DATABASE_PASSWORD`         | Database password                                                                                                                                                                                                                                                                                                  | `String`                      |               | strapi-dashboard            | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| `DATABASE_PORT`             | Database port                                                                                                                                                                                                                                                                                                      | `String`                      |               | strapi-dashboard            | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| `DATABASE_SSL`              | For SSL database connection. Use an object to pass certificate files as strings.                                                                                                                                                                                                                                   | `Boolean` or `Object`         |               | strapi-dashboard            | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| `DATABASE_USERNAME`         | Database username                                                                                                                                                                                                                                                                                                  | `String`                      |               | strapi-dashboard            | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| `FRONTEND_PUBLIC_URL`       |                                                                                                                                                                                                                                                                                                                    | `String`                      |               | strapi-dashboard            |                                                                                                                                                                                                                          |
| `HOST`                      |                                                                                                                                                                                                                                                                                                                    | `Number`                      |               | strapi-dashboard            | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options)                                                                                                                |
| `I18N_DEBUG`                | When `I18N_DEBUG` is set, the `i18next` package will log debug information.                                                                                                                                                                                                                                        | `String`                      |               | frontend                    |                                                                                                                                                                                                                          |
| `JWT_SECRET`                | Secret for signing JWTs for the Users-Permissions plugin                                                                                                                                                                                                                                                           | `String`                      |               | strapi-dashboard            | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options)                                                                                                                |
| `MATOMO_HOST`               | PDC ONLY / Optional: URL for Matomo                                                                                                                                                                                                                                                                                | `URL`                         |               | FRONTEND                    |                                                                                                                                                                                                                          |
| `MATOMO_SITE_ID`            | PDC ONLY / Optional: container ID for Matomo                                                                                                                                                                                                                                                                       | `String`                      |               | FRONTEND                    |                                                                                                                                                                                                                          |
| `NODE_ENV`                  |                                                                                                                                                                                                                                                                                                                    | `production` \| `development` |               |                             |                                                                                                                                                                                                                          |
| `OPEN_FORMS_API_TOKEN`      | PDC ONLY: A Token for Open Forms API                                                                                                                                                                                                                                                                               | `String`                      |               | strapi-dashboard / frontend |                                                                                                                                                                                                                          |
| `OPEN_FORMS_API_URL`        | PDC ONLY: URL for Open Forms API (usually the origin + /api/v2)                                                                                                                                                                                                                                                    | `String`                      |               | frontend / strapi-dashboard |                                                                                                                                                                                                                          |
| `OPEN_FORMS_CSS_URL`        | PDC ONLY / Optional: URL for Open Forms CSS                                                                                                                                                                                                                                                                        | `String`                      |               | frontend                    |                                                                                                                                                                                                                          |
| `OPEN_FORMS_SDK_URL`        | PDC ONLY / Optional : URL for Open Forms SDK                                                                                                                                                                                                                                                                       | `String`                      |               | frontend                    |                                                                                                                                                                                                                          |
| `PANDOSEARCH_API_URL`       | PDC ONLY                                                                                                                                                                                                                                                                                                           | `String`                      |               | frontend                    |                                                                                                                                                                                                                          |
| `PGADMIN_DEFAULT_EMAIL`     |                                                                                                                                                                                                                                                                                                                    | `String`                      |               | Database                    |                                                                                                                                                                                                                          |
| `PGADMIN_DEFAULT_PASSWORD`  |                                                                                                                                                                                                                                                                                                                    | `String`                      |               | Database                    |                                                                                                                                                                                                                          |
| `PORT`                      | Port on which the server should be running.                                                                                                                                                                                                                                                                        | `Number`                      | 1337          | strapi-dashboard            |                                                                                                                                                                                                                          |
| `PREVIEW_SECRET_TOKEN`      | The secret used for the Strapi preview plugin should have the same value for both the frontend and the Strapi dashboard.                                                                                                                                                                                           | `String`                      |               | strapi-dashboard frontend   |                                                                                                                                                                                                                          |
| `STRAPI_PRIVATE_URL`        |                                                                                                                                                                                                                                                                                                                    | `String`                      |               | frontend                    |                                                                                                                                                                                                                          |
| `STRAPI_PUBLIC_URL`         |                                                                                                                                                                                                                                                                                                                    | `URL`                         |               | Frontend                    | The Strapi dashboard URL, e.g.,`http://localhost:1337/`                                                                                                                                                                  |
| `TRANSFER_TOKEN_SALT`       | Salt for generating Transfer tokens. If no transfer token salt is defined, transfer features will be disabled.                                                                                                                                                                                                     | `String`                      |               | strapi-dashboard            | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options) Secrets can be generated manually by running `node -p "require('crypto').randomBytes(48).toString('base64');"` |
| `OGONE_PAYMENT_SERVICE_URL` | PDC ONLY: URL for Open Forms/Payment                                                                                                                                                                                                                                                                               | `URL`                         |               | Frontend                    |                                                                                                                                                                                                                          |
| `SURVEY_RUN_GUID`           | PDC ONLY: Used for the Survey service                                                                                                                                                                                                                                                                              | `String`                      |               | Fronend                     |                                                                                                                                                                                                                          |
| `SURVEY_RUN_APIKEY`         | PDC ONLY: Used for the Survey service                                                                                                                                                                                                                                                                              | `String`                      |               | Fronend                     |                                                                                                                                                                                                                          |
| `SURVEY_RUN_URL`            | PDC ONLY: Used for the Survey service                                                                                                                                                                                                                                                                              | `URL`                         |               | Fronend                     |                                                                                                                                                                                                                          |
| OVERIGE_OBJECTEN_API_PORT   |                                                                                                                                                                                                                                                                                                                    | Number                        |               | Overige-objecten-api        |                                                                                                                                                                                                                          |
| OVERIGE_OBJECTEN_API_CORS   | This environment variable manages CORS (Cross-Origin Resource Sharing), allowing the server to specify permitted external origins for resource loading. For multiple domains, separate them with a comma (e.g., '[http://localhost:3000](http://localhost:3000), [http://localhost:3001](http://localhost:3001)'). | URL                           |               | Overige-objecten-api        |                                                                                                                                                                                                                          |

## Start the server without Docker

Before starting the server without Docker, create a `.env` file for both the frontend and the Strapi dashboard app.

**Frontend env:**

```shell
FRONTEND_PUBLIC_URL=http://localhost:3000
# these three environments variables below are required to be able to test the openFormsEmbed into the frontend. So you have to start the OpenForms server on your local machine
OPEN_FORMS_API_URL=http://localhost:8000/api/v2/
OPEN_FORMS_CSS_URL=http://localhost:8000/static/sdk/open-forms-sdk.css
OPEN_FORMS_SDK_URL=http://localhost:8000/static/sdk/open-forms-sdk.js
OPEN_FORMS_API_TOKEN=
PANDOSEARCH_API_URL= # You can use the following API URL to test the functionality of the SearchBar component: https://public.pandosearch.com/developer.pandosearch.com/. Valid keys that can be used in the searchBar field include: search, server, highlighting, and help.
PREVIEW_SECRET_TOKEN= # the value should matched the same environment variable on the Strapi dashboard
STRAPI_PRIVATE_URL=http://0.0.0.0:1337/
STRAPI_PUBLIC_URL=http://0.0.0.0:1337/
SURVEY_RUN_APIKEY=
SURVEY_RUN_GUID=
SURVEY_RUN_URL=
```

**Strapi Dashboard env:**

```shell
NODE_ENV=development
ADMIN_JWT_SECRET=
API_TOKEN_SALT=
APP_KEYS=
FRONTEND_PUBLIC_URL=http://localhost:3000
HOST=0.0.0.0
JWT_SECRET=
OPEN_FORMS_API_TOKEN=
OPEN_FORMS_API_URL=http://localhost:8000/api/v2/
PORT=1337
# the value should matched the same environment variable on the Frontend
PREVIEW_SECRET_TOKEN=
STRAPI_PRIVATE_URL=http://0.0.0.0:1337
STRAPI_PUBLIC_URL=http://0.0.0.0:1337
TRANSFER_TOKEN_SALT=
```

### Two Options to Run the Server

1. Using the Start Script:

   - Navigate to the app's root level and run the following command:

     ```shell
     yarn development
     ```

   - You will be prompted with options to select. For example:

     ```bash
         ❯ yarn development
         yarn run v1.22.19
         $ node scripts/start.js
         ? Select an option: …
         Build # build a specific app or both
         ❯ Dev # start a development server for a specific app or both
         Start # start a production server for a specific app or both
     ```

   - Choose the "Dev" option to start a development server for the specified app.

2. Basic Way:

   - Change to the app's directory (e.g., `cd apps/pdc-dashboard`) and run:

     ```shell
         yarn dev
     ```

3. Using Yarn Workspaces:

   - Run the following command from the project root:

   ```shell
       yarn workspace @frameless/pdc-dashboard dev
   ```

Choose the option that best fits your workflow to start the server without Docker. Once the server is running, you can access the application from your browser.

## FAQ

### I Have Issues with Building the Project or Starting the Server

If you encounter problems with building the project or starting the server, try the following steps:

1. **Remove Build Folders:**

   - Execute the following commands from the app root level:

     ```bash
     yarn clean
     yarn build
     ```

   - This will remove the `/build` or `/dist` folders and rebuild the entire project.

2. **Remove Node Modules:**

   - If the issue persists, remove the `node_modules` folders for all the apps using the command:

     ```bash
     npx npkill
     ```

   - Afterward, reinstall the dependencies with:

     ```bash
     yarn install
     ```

These steps can help resolve common issues related to project build and server startup. If you continue to face problems, feel free to reach out for further assistance.
