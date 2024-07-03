# Utrecht PDC

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

2. **Launch Docker Desktop:**

   - Once Docker Desktop is installed, launch it from your Applications folder.

3. **Add Environments variables to the project**

   Create two files in the project root: `.project-name.prod.env` and `.project-name.dev.env` (replace "project-name" with your specific project name, e.g., `.pdc.prod.env` and `.pdc.dev.env`). If these files don't exist already, copy the environment variables provided below into these files.

   ```shell
       ADMIN_JWT_SECRET=
       API_TOKEN_SALT=
       APP_KEYS=
       DATABASE_CLIENT=
       DATABASE_HOST=
       DATABASE_NAME=
       DATABASE_PASSWORD=
       DATABASE_PORT=
       DATABASE_SSL=
       DATABASE_USERNAME=
       FRONTEND_PUBLIC_URL=
       HOST=0.0.0.0
       JWT_SECRET=
       MATOMO_HOST=
       MATOMO_HOST=
       NODE_ENV=
       OGONE_PAYMENT_SERVICE_URL=
       OPEN_FORMS_API_TOKEN=
       OPEN_FORMS_API_URL=
       OPEN_FORMS_CSS_URL=
       OPEN_FORMS_SDK_URL=
       PANDOSEARCH_API_URL=
       PGADMIN_DEFAULT_EMAIL=
       PGADMIN_DEFAULT_PASSWORD=
       PORT=1337
       PREVIEW_SECRET_TOKEN=
       STRAPI_PRIVATE_URL=
       STRAPI_PUBLIC_URL=
       TRANSFER_TOKEN_SALT=
   ```

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

| Variable name               | Description                                                                                                              | Type                          | Default Value | Application                 | Note                                                                                                                                                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------- | ------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ADMIN_JWT_SECRET`          | Secret for signing JWTs for the Admin panel                                                                              | `String`                      |               | strapi-dashboard            | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options)                                                                                                                |
| `APP_KEYS`                  | The secret key for session cookie signing                                                                                | `String`                      |               | strapi-dashboard            | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options)                                                                                                                |
| `API_TOKEN_SALT`            | Salt for generating API tokens                                                                                           | `String`                      |               | strapi-dashboard            | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options)                                                                                                                |
| `DATABASE_CLIENT`           | Database client to use                                                                                                   | `String`                      | sqlite        | strapi-dashboard            | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| `DATABASE_HOST`             | Database host                                                                                                            | `String`                      |               | strapi-dashboard            | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| `DATABASE_NAME`             | Database name                                                                                                            | `String`                      |               | strapi-dashboard            | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| `DATABASE_PASSWORD`         | Database password                                                                                                        | `String`                      |               | strapi-dashboard            | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| `DATABASE_PORT`             | Database port                                                                                                            | `String`                      |               | strapi-dashboard            | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| `DATABASE_SSL`              | For SSL database connection. Use an object to pass certificate files as strings.                                         | `Boolean` or `Object`         |               | strapi-dashboard            | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| `DATABASE_USERNAME`         | Database username                                                                                                        | `String`                      |               | strapi-dashboard            | [Reference to Strapi Database docs](https://docs.strapi.io/cloud/advanced/database)                                                                                                                                      |
| `FRONTEND_PUBLIC_URL`       |                                                                                                                          | `String`                      |               | strapi-dashboard            |                                                                                                                                                                                                                          |
| `HOST`                      |                                                                                                                          | `Number`                      |               | strapi-dashboard            | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options)                                                                                                                |
| `JWT_SECRET`                | Secret for signing JWTs for the Users-Permissions plugin                                                                 | `String`                      |               | strapi-dashboard            | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options)                                                                                                                |
| `MATOMO_HOST`               | PDC ONLY / Optional: URL for Matomo                                                                                      | `URL`                         |               | FRONTEND                    |                                                                                                                                                                                                                          |
| `MATOMO_SITE_ID`            | PDC ONLY / Optional: container ID for Matomo                                                                             | `String`                      |               | FRONTEND                    |                                                                                                                                                                                                                          |
| `NODE_ENV`                  |                                                                                                                          | `production` \| `development` |               |                             |                                                                                                                                                                                                                          |
| `OPEN_FORMS_API_TOKEN`      | PDC ONLY: A Token for Open Forms API                                                                                     | `String`                      |               | strapi-dashboard / frontend |                                                                                                                                                                                                                          |
| `OPEN_FORMS_API_URL`        | PDC ONLY: URL for Open Forms API (usually the origin + /api/v2)                                                          | `String`                      |               | frontend / strapi-dashboard |                                                                                                                                                                                                                          |
| `OPEN_FORMS_CSS_URL`        | PDC ONLY / Optional: URL for Open Forms CSS                                                                              | `String`                      |               | frontend                    |                                                                                                                                                                                                                          |
| `OPEN_FORMS_SDK_URL`        | PDC ONLY / Optional : URL for Open Forms SDK                                                                             | `String`                      |               | frontend                    |                                                                                                                                                                                                                          |
| `PANDOSEARCH_API_URL`       | PDC ONLY                                                                                                                 | `String`                      |               | frontend                    |                                                                                                                                                                                                                          |
| `PGADMIN_DEFAULT_EMAIL`     |                                                                                                                          | `String`                      |               | Database                    |                                                                                                                                                                                                                          |
| `PGADMIN_DEFAULT_PASSWORD`  |                                                                                                                          | `String`                      |               | Database                    |                                                                                                                                                                                                                          |
| `PORT`                      | Port on which the server should be running.                                                                              | `Number`                      | 1337          | strapi-dashboard            |                                                                                                                                                                                                                          |
| `PREVIEW_SECRET_TOKEN`      | The secret used for the Strapi preview plugin should have the same value for both the frontend and the Strapi dashboard. | `String`                      |               | strapi-dashboard frontend   |                                                                                                                                                                                                                          |
| `STRAPI_PRIVATE_URL`        |                                                                                                                          | `String`                      |               | frontend                    |                                                                                                                                                                                                                          |
| `STRAPI_PUBLIC_URL`         |                                                                                                                          | `URL`                         |               | Frontend                    | The Strapi dashboard URL, e.g.,`http://localhost:1337/`                                                                                                                                                                  |
| `TRANSFER_TOKEN_SALT`       | Salt for generating Transfer tokens. If no transfer token salt is defined, transfer features will be disabled.           | `String`                      |               | strapi-dashboard            | [Admin panel configuration](https://docs.strapi.io/dev-docs/configurations/admin-panel#available-options) Secrets can be generated manually by running `node -p "require('crypto').randomBytes(48).toString('base64');"` |
| `OGONE_PAYMENT_SERVICE_URL` | PDC ONLY: URL for Open Forms/Payment                                                                                     | `URL`                         |               | Frontend                    |                                                                                                                                                                                                                          |

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
