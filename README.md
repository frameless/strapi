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

- [PNPM](https://pnpm.io/) version 1.22.19
- [Node.js](https://nodejs.org/) version [20.18.1](https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V20.md#20.18.1)

Follow these steps to prepare the app:

1. Open your terminal and navigate to the root level of the app.
2. Install Dependencies:

   ```shell
   pnpm install
   ```

3. Build the Project:

   ```shell
   pnpm build
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
   pnpm run env
   ```

   This command generates a .env file containing the necessary environment variables.
   The generated values are suitable for the PDC project in Docker production environment.
   - Running PDC in development mode
     Update the generated .env file or create a `.pdc.dev.env` file with the same variables, modified for development.
     For development, you need to adjust certain variables (for example, set `NODE_ENV=development`) to ensure the environment behaves correctly.
   - Running the VTH project
     Run the same `pnpm run env` command, then create a `.vth.dev.env` file with the same variables, modified for VTH development.

     Environment variable definitions are based on the .envrc.json file in the project root.
     You can find detailed documentation for each variable in the [Environment Variables](./ENVIRONMENT_VARIABLES.md) file.

     **Note:** When updating `.envrc.json`, run the following command to regenerate the documentation:

     ```bash
     pnpm generate-env-docs
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

Before starting the server without Docker, create a `.env` file for both the frontend and the Strapi dashboard app: `pnpm run env`.

Then run:

```shell
pnpm run development
```

Choose: `dev`, `both`, `pdc` to start the development frontend + backend for PDC.

Visit the following URLs:

- http://localhost:3000/ for the website
- http://localhost:1337/admin/ for the Strapi admin interface

When starting Strapi for the first time:

1. Go to http://localhost:1337/admin/ and create an account.
2. Go to http://localhost:1337/admin/ and login.
3. Go to http://localhost:1337/admin/settings/config-sync and click "Import".

### Two Options to Run the Server

1. Using the Start Script:
   - Navigate to the app's root level and run the following command:

     ```shell
     pnpm development
     ```

   - You will be prompted with options to select. For example:

     ```bash
         ❯ pnpm development
         pnpm run v1.22.19
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
         pnpm dev
     ```

3. Using Pnpm Workspaces:
   - Run the following command from the project root:

   ```shell
       pnpm workspace @frameless/pdc-dashboard dev
   ```

Choose the option that best fits your workflow to start the server without Docker. Once the server is running, you can access the application from your browser.

## FAQ

### I Have Issues with Building the Project or Starting the Server

If you encounter problems with building the project or starting the server, try the following steps:

1. **Remove Build Folders:**
   - Execute the following commands from the app root level:

     ```bash
     pnpm clean
     pnpm build
     ```

   - This will remove the `/build` or `/dist` folders and rebuild the entire project.

2. **Remove Node Modules:**
   - If the issue persists, remove the `node_modules` folders for all the apps using the command:

     ```bash
     npx npkill
     ```

   - Afterward, reinstall the dependencies with:

     ```bash
     pnpm install
     ```

These steps can help resolve common issues related to project build and server startup. If you continue to face problems, feel free to reach out for further assistance.
