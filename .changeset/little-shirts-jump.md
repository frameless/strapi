---
"@frameless/pdc-dashboard": patch
"@frameless/vth-dashboard": patch
---

Beveiligingsupdate voor critical issue in afhankelijkheden

- **git-diff** (OS command injection via gemanipuleerde strings naar de `gitDiff` API) — bijgewerkt naar >=2.0.7
  Treft: `pdc-dashboard`, `vth-dashboard` via `strapi-plugin-config-sync`
  [GHSA-6wfj-92cw-88vg](https://github.com/advisories/GHSA-6wfj-92cw-88vg)
