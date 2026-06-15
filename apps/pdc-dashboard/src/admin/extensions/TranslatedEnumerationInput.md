# TranslatedEnumerationInput — workaround for missing enum labels in Strapi v5

## Background

In Strapi v4 the content-manager's `InputRenderer` called `intl.formatMessage({ id: enumValue })` when building dropdown options for enumeration fields. This meant enum values like `primary-action-button` were automatically resolved via the admin i18n config, so users saw translated labels.

In Strapi v5 this was removed. Options are now built as `{ value }` only — no label — so raw enum strings appear in the UI instead of translated labels.

Relevant upstream files:

- [`@strapi/admin` — `Enumeration.tsx`](https://github.com/strapi/strapi/blob/develop/packages/core/admin/admin/src/components/FormInputs/Enumeration.tsx#L39)
- [`@strapi/content-manager` — `InputRenderer.tsx`](https://github.com/strapi/strapi/blob/develop/packages/core/content-manager/admin/src/pages/EditView/components/InputRenderer.tsx#L258)

Tracked in: [strapi/strapi#26683 — Regression: Enumeration field no longer supports i18n translation in admin (v4 → v5)](https://github.com/strapi/strapi/issues/26683)

## The fix

`TranslatedEnumerationInput.tsx` replicates Strapi's built-in enumeration input but maps `attribute.enum` through `formatMessage`, restoring the v4 behaviour. It is registered globally in `admin/app.ts` via `app.addFields({ type: 'enumeration', ... })`, which intercepts all enumeration fields before Strapi's own switch-case runs.

If a translation key is missing, the raw enum value is shown as a fallback (`defaultMessage: value`).

---

## Upgrade checklist — run after every Strapi update

After running `pnpm update @strapi/strapi` (or any `@strapi/*` package), execute:

```sh
pnpm check:enum-workaround
```

| Output                                                  | Meaning                                                                           |
| ------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `OK: workaround still needed`                           | Nothing to do.                                                                    |
| `ACTION REQUIRED: Strapi has restored enum translation` | Follow the removal steps printed by the script.                                   |
| `WARNING: Could not isolate the enumeration case block` | Strapi restructured the file — inspect manually (see script output for the path). |

### If the workaround can be removed

1. Delete `TranslatedEnumerationInput.tsx` (this file's sibling).
2. Remove the `addFields({ type: 'enumeration', ... })` call in `apps/pdc-dashboard/src/admin/app.ts`.
3. Verify in the UI using the manual test below.

---

## Manual UI test

Use this to confirm the workaround (or the native Strapi fix after removal) is working correctly.

### Setup

Open the Strapi admin dashboard and go to **Content Manager → Products**. Open any existing product (or create one) that has a **Sections** dynamic zone.

---

### CTA component — Appearance field

1. In the Sections zone, add or open a **Call to Action Knop (CTA)** component.
2. Click the **Appearance** dropdown.

| Raw enum value            | Expected label (NL)    | Expected label (EN) |
| ------------------------- | ---------------------- | ------------------- |
| `primary-action-button`   | Inwoners (blauw)       | Primary             |
| `secondary-action-button` | Aanvullende knop (wit) | Secondary           |
| `magenta`                 | Organisaties (paars)   | Magenta             |

---

### CTA / Logo button component — Logo field

1. Inside the same CTA (or open a **Logo button** component), click the **Logo** dropdown.

| Raw enum value | Expected label             |
| -------------- | -------------------------- |
| `digid`        | DigiD                      |
| `eherkenning`  | eHerkenning                |
| `eidas`        | eIDAS                      |
| `without_logo` | Without logo / Zonder logo |

---

### Spotlight component — Type field

1. Add or open a **Spotlight** component in the Sections zone.
2. Click the **Soort** (type) dropdown.

| Raw enum value | Expected label (NL) | Expected label (EN) |
| -------------- | ------------------- | ------------------- |
| `gray`         | Grijs               | Gray                |
| `info`         | Blauw               | Blue                |
| `warning`      | Geel                | Yellow              |

---

### Link component — Icon field

1. Open a component that contains a **Link** (e.g. a repeatable Links field).
2. Click the **Icon** dropdown.

| Raw enum value | Expected label (NL) | Expected label (EN) |
| -------------- | ------------------- | ------------------- |
| `arrow`        | Pijl                | Arrow               |

---

### Failure signature

If you see **raw enum values** (`primary-action-button`, `magenta`, `gray`, `arrow`, etc.) instead of translated labels, the workaround is either missing or broken.
