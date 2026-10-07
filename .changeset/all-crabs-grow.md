---
"@frameless/pdc-frontend": patch
"@frameless/vth-frontend": patch
"@frameless/overige-objecten-api": patch
---

Beveiligingsupdates voor kritieke kwetsbaarheden in afhankelijkheden

- **Next.js** (RCE via `next/og` ImageResponse) — `next` bijgewerkt naar >=16.3.6
  Treft: `vth-frontend`, `pdc-frontend`
  [GHSA-vcvr-r3jv-pc5j](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j)

- **proxy-addr** (IP-spoofing via IPv4-mapped IPv6) — bijgewerkt naar >=2.0.8
  Treft: `overige-objecten-api` via `express`
  [GHSA-jqcg-44mw-7w3h](https://github.com/advisories/GHSA-jqcg-44mw-7w3h)

- **tinypool** (Prototype Pollution → RCE in worker options) — bijgewerkt naar >=2.1.1
  Treft: `overige-objecten-api` via `vitest`
  [GHSA-5gmw-xhrv-c9v3](https://github.com/advisories/GHSA-5gmw-xhrv-c9v3)

- **tinypool** (Prototype Pollution → RCE in `run()` options) — bijgewerkt naar >=2.1.2
  Treft: `overige-objecten-api` via `vitest`
  [GHSA-85c8-ppgw-ccpr](https://github.com/advisories/GHSA-85c8-ppgw-ccpr)

- **shell-quote** (command injection via regelafbreking) — bijgewerkt naar >=1.11.0
  Treft: root via `concurrently`
  [GHSA-pqg4-j6r4-53mv](https://github.com/advisories/GHSA-pqg4-j6r4-53mv)
