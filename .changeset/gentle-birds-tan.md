---
"@frameless/pdc-frontend": patch
"@frameless/vth-frontend": patch
---

### Beveiligingsupdate

Next.js en DOMPurify zijn bijgewerkt om kritieke beveiligingsproblemen op te lossen. Daarnaast is de Node.js versie in de Docker-omgeving bijgewerkt. Deze updates helpen de veiligheid en betrouwbaarheid van de applicatie te verbeteren.

#### Technische details

- **next** bijgewerkt naar `16.4.2` voor twee kritieke kwetsbaarheden:
  - Niet-geauthenticeerde Remote Code Execution in de Image Optimization API bij gebruik van SVG-bestanden ([GHSA-2464-fhr4-w9xw](https://github.com/advisories/GHSA-2464-fhr4-w9xw))
  - Niet-geauthenticeerde Remote Code Execution in `use cache` functies die typed arrays teruggeven ([GHSA-673q-mjm6-r5xr](https://github.com/advisories/GHSA-673q-mjm6-r5xr))

- **dompurify** overschreven naar `>=3.4.17` voor een kritieke `SAFE_FOR_TEMPLATES` bypass via split template expressions in shadow root content ([GHSA-cg2g-xh64-v4q7](https://github.com/advisories/GHSA-cg2g-xh64-v4q7))

- **Node.js** Docker base image bijgewerkt naar `24.22.1` voor meerdere hoge CVE's:
  - `CVE-2026-105482` — `dns.resolve` kapt namen af met NUL-teken (hoog)
  - `CVE-2026-105483` — TLS certificaat hostname bypass via volledige breedte cijfer IP (hoog)
  - `CVE-2026-106069` — TLS certificaat hostname bypass via losse IP-resolutie (hoog)
  - `CVE-2026-111497` — Brotli decoder out-of-bounds write maakt RCE mogelijk (hoog)
  - `CVE-2026-105481` — Keep-alive socket verwerkt respons vóór verzending van het verzoek (gemiddeld)
  - `CVE-2026-106072` — Onjuiste certificaatvalidatie voor niet-canonieke IPv4-hostnamen (gemiddeld)
  - `CVE-2026-106074` — `crypto.randomUUID()` entropy cache lek in snapshots/SEA's (gemiddeld)
  - `CVE-2026-106073` — Permission Model bypass met `fs.realpathSync` (laag)
