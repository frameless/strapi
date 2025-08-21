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

     Environment variable definitions are based on the .envrc.json file in the project root.
     You can find detailed documentation for each variable in the [Environment Variables](./ENVIRONMENT_VARIABLES.md) file.

     **Note:** When updating `.envrc.json`, run the following command to regenerate the documentation:

     ```bash
     yarn generate-env-docs
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

## Start the server without Docker

Before starting the server without Docker, create a `.env` file for both the frontend and the Strapi dashboard app.

**Frontend env:**

```shell
FRONTEND_PUBLIC_URL=http://localhost:3000
# these three environments variables below are required to be able to test the openFormsEmbed into the frontend. So you have to start the OpenForms server on your local machine
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
