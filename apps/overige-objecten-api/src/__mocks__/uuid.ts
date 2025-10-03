// We mock `uuid` here because the real `uuid` package (v9+) is ESM-only,
// which Jest (in our current setup) cannot parse directly and causes
// "Unexpected token 'export'" errors when running tests.
//
// This mock provides a deterministic UUID so tests remain stable.
//
// ⚠️ Once our project is fully ESM-compatible or we configure Jest to
// handle ESM modules (e.g. using `babel-jest` or `--experimental-vm-modules`),
// we should REMOVE this mock and use the real `uuid` implementation instead.
export default {
  v4: () => 'mocked-uuid-v4',
};
