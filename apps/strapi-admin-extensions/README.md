# Strapi Admin Extensions

This project contains custom extensions for the Strapi admin panel. It depends on another app called Strapi dashboard.

## Prerequisites

- Ensure `pdc-dashboard` is installed and set up properly before using `strapi-admin-extensions`.

## Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:frameless/strapi.git
   ```

2. **Install dependencies:**  
   Make sure you are in the project root:

   ```bash
   yarn install
   ```

## Usage

1. Ensure the `pdc-dashboard` app is running:

   ```bash
   yarn workspace @frameless/pdc-dashboard dev
   ```

2. Copy the environment configuration file to the `strapi-admin-extensions` folder:

   ```bash
   cp .env.example .env
   ```

3. Run the development server for `strapi-admin-extensions`:

   ```bash
   yarn workspace @frameless/strapi-admin-extensions dev
   ```

## Contributing

We welcome contributions! Feel free to:

- Open an issue to report bugs or suggest new features.
- Submit a pull request with improvements or fixes.

## License

This project is licensed under the EUPL-1.2 License.
