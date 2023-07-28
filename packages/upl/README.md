# @frameless/upl

This package creates and exports two arrays of objects, namely uplActueel and uplKeyValues, based on the data obtained from the [UPL-actueel.json API](https://standaarden.overheid.nl/owms/oquery/UPL-actueel.json) provided by the Dutch government standards authority. The API serves as the data source, and the package processes the received data to form the arrays of objects. These arrays are then made available for further usage and analysis in the application.

- **type `uplActueel`**: [https://standaarden.overheid.nl/owms/oquery/UPL-actueel.json](https://standaarden.overheid.nl/owms/oquery/UPL-actueel.json)

- **type `uplKeyValues`**:

  ```js
  export const uplKeyValues = [
    {
      uri: "http://standaarden.overheid.nl/owms/terms/UPL-naam_nog_niet_beschikbaar",
      value: "UPL-naam nog niet beschikbaar",
      uuid: "33653955-562e-47f7-be0a-99286b0c7c4e",
    },
    {
      uri: "http://standaarden.overheid.nl/owms/terms/AangifteVertrekBuitenland",
      value: "aangifte vertrek buitenland",
      uuid: "72c0841b-15de-4341-84dd-638639aa82ef",
    },
  ];
  ```

## Install

```shell
yarn add @frameless/upl
# or
npm install @frameless/upl
# or
pnpm add @frameless/upl
```

## Usage

```js
import { uplActueel, uplKeyValues } from "@frameless/upl";
```
