---
"@frameless/overige-objecten-api": minor
---

Voeg `subcategorieen` toe aan de response van kennisartikelen en VAC's

- Nieuw veld `subcategorieen` in `record.data` van kennisartikel- en VAC-objecten.
- Elke subcategorie bevat `documentId`, `titel`, `createdAt`, `updatedAt`, `publishedAt` en de bijbehorende `categorie`.
- Het veld is gedocumenteerd in de OpenAPI-specificatie.
