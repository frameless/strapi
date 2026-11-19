---
"@frameless/pdc-frontend": patch
---

Open Forms SDK bijgewerkt naar 3.5.10

- **@open-formulieren/sdk** (bugfixes en beveiligingspatches) — bijgewerkt van 3.5.6 naar 3.5.10
  Treft: `pdc-frontend`
  [Changelog open-forms-sdk](https://github.com/open-formulieren/open-forms-sdk/blob/main/CHANGELOG.rst)

- **@open-formulieren/formio-renderer** (bugfixes) — via de SDK bijgewerkt van 1.8.2 naar 1.8.8
  Treft: `pdc-frontend` via `@open-formulieren/sdk`

- **pnpm-patch** (IE6/7 CSS-hack `*zoom: 1` in Formio-CSS) — opnieuw aangemaakt voor 3.5.10
  Treft: `pdc-frontend`, Turbopack weigert deze hack nog steeds

([GitHub Issue Frameless/strapi#1590](https://github.com/frameless/strapi/issues/1590))
