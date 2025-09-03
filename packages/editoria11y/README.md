# @frameless/editoria11y

A StencilJS web component wrapper for [Editoria11y](https://github.com/itmaybejj/editoria11y) accessibility checker.

## Usage

### HTML

```html
<!doctype html>
<html dir="ltr" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
    <title>Editoria11y Wrapper</title>

    <script type="module" src="../dist/editoria11y/editoria11y.esm.js"></script>
  </head>
  <body>
    <frameless-editoria11y lang="nl" theme="darkTheme"></frameless-editoria11y>

    <!-- Your content here -->
    <main>
      <h1>Your Page Content</h1>
    </main>
  </body>
</html>
```

### Next.js

1. **Install the packages:**

   ```bash
   yarn add @frameless/editoria11y @frameless/ui
   ```

2. **Use the reusable component:**

   ```tsx
   import { Editoria11yWrapper } from "@frameless/ui";

   const Layout = ({ children }) => {
     const { isEnabled } = draftMode(); // or your preview mode check

     return (
       <html>
         <body>
           {isEnabled && <Editoria11yWrapper theme="darkTheme" language="nl" withNonce={true} />}
           {children}
         </body>
       </html>
     );
   };
   ```

## Properties

### Editoria11yWrapper Component Props

| Prop              | Type      | Default | Description                             |
| ----------------- | --------- | ------- | --------------------------------------- |
| `language`        | `string`  | -       | Language code (e.g., 'nl', 'en')        |
| `theme`           | `string`  | -       | Theme name (e.g., 'darkTheme')          |
| `alertMode`       | `string`  | -       | Alert display mode                      |
| `checkRoots`      | `string`  | -       | CSS selector for content roots to check |
| `ignoreElements`  | `string`  | -       | CSS selector for elements to ignore     |
| `allowHide`       | `boolean` | -       | Allow hiding alerts                     |
| `allowOK`         | `boolean` | -       | Allow marking alerts as OK              |
| `inlineAlerts`    | `boolean` | -       | Show alerts inline                      |
| `watchForChanges` | `boolean` | -       | Watch for DOM changes                   |
| `withNonce`       | `boolean` | `false` | Enable CSP nonce support                |

For detailed properties and configuration options, see [src/components/frameless-editoria11y/readme.md](src/components/frameless-editoria11y/readme.md)

## Implementation Steps

This package was created using the original Editoria11y source with automated modifications:

1. **Clone the original repository:**

   ```bash
   git clone https://github.com/itmaybejj/editoria11y.git
   cd editoria11y
   npm install
   ```

2. **Add ESM build support:**

   - Copy `frameless/packages/lib/build-esm-script.mjs` to `scripts/build-esm-script.mjs`
   - Add to package.json: `"build:esm": "node scripts/build-esm-script.mjs"`
   - The script automatically handles:
     - Dutch language support
     - CSP nonce support
     - Global scope exposure
     - Formatting fixes
   - **Original files stay untouched** - all modifications applied only to generated bundle

3. **Build and copy files:**

   ```bash
   npm run build:esm
   # Copy /dist/editoria11y.esm.js to /frameless/packages/editoria11y/lib
   ```

4. **Build the wrapper component:**

   ```bash
   yarn build
   ```

## Why This Approach?

The reason for using this approach was due to several issues:

1. The original editoria11y repo didn't update the version in package.json after each release, causing issues when installing from the repo since they don't publish to npm
2. The issues that needed fixing in the original repo would require `patch-package` which is very hard to maintain

We can make it better by implementing these improvements directly to the original editoria11y repo, but this takes some time.

## Testing

To test the build you can check the `src/index.html` example

## Development

```bash
# Build the component
yarn build

# Start development server
yarn start

# Run tests
yarn test
```
