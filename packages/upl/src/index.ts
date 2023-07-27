import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as fs from 'fs';
import { v4 } from 'uuid';

const dir = './dist';

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    // eslint-disable-next-line no-console
    console.log(`retry attempt: ${retryCount}`);
    return retryCount * 2000; // time interval between retries
  },
  retryCondition: (error: any) => {
    return error.response.status >= 500 && error.response.status < 600;
  },
});

const url = 'https://standaarden.overheid.nl/owms/oquery/UPL-actueel.json';

interface UPLData {
  head: {
    vars: string[];
  };
  results: {
    bindings: {
      [index: string]: {
        'xml:lang'?: string;
        type: string;
        value: string;
      };
    }[];
  };
}

const simplifyUPL = (data: UPLData) => {
  return data.results.bindings.map((binding) => {
    return {
      uri: binding.URI.value,
      value: binding.UniformeProductnaam.value,
      uuid: v4(),
    };
  });
};
axios
  .request({
    url,
    headers: {
      Accept: 'application/json',
    },
  })
  .then((response) => response.data)
  .then((json) => {
    const UPLKeyValuesArrayOfObjects = simplifyUPL(json);

    // Convert the array of objects to a constant (const data = [...])
    const data = [...UPLKeyValuesArrayOfObjects];
    const dataActueel = { ...json };

    // Convert the array of objects to a JSON string
    const UPLKeyValuesJsonData = JSON.stringify(data, null, 2);

    // Write the JSON string to two different files
    fs.writeFileSync(`${dir}/UPL-actueel.ts`, `export const uplActueel = ${JSON.stringify(dataActueel, null, 2)};`);
    fs.writeFileSync(`${dir}/UPL-key-value.ts`, `export const uplKeyValues = ${UPLKeyValuesJsonData};`);

    // eslint-disable-next-line no-console
    console.log('JSON data has been written to the files successfully!');
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Error fetching JSON data:', error);
  });
