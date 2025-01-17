# @frameless/pdc-dashboard

## 1.0.0

### Major Changes

- 4473f66: Maak het antwoordveld herhaalbaar in de VAC-collectie

### Minor Changes

- ed4d2a4: Kostenveld geïntegreerd in het interne veld

  Wanneer het kostenveld aan een product is gekoppeld, wordt deze waarde nu automatisch beschikbaar in het interne veld dat al aan het product is gekoppeld.

- 19a92a1: Geef de PDC-rol toegang tot de inhoud van de startpagina
- 03f69a2: Voeg het VAC-schema toe aan het Strapi-dashboard.
- 7b2d872: Voeg de velden voor interne kennisartikelen toe aan het Product-schema in Strapi.
- c54697c: Voeg rollen met aangepaste rechten toe aan PDC dashboard
- e583b92: Kennisartikel-categorie veld toegevoegd aan alle blokken van de productcollectie in Strapi.

  Met deze functie wordt het mogelijk om de inhoud van een productblok dat gebruikmaakt van dit veld zichtbaar te maken in het Kiss-dashboard.

### Patch Changes

- a5724e4: Verbeter de Internal Field- en VAC-labels in het Strapi-dashboard.
- Updated dependencies [ed4d2a4]
  - @frameless/strapi-tiptap-editor@0.2.0

## 0.2.2

### Patch Changes

- 981db82: Update Strapi-afhankelijkheden om het paginering probleem in het dashboard op te lossen ([GitHub Issue frameless/strapi#715](https://github.com/frameless/strapi/issues/715)).
- Updated dependencies [f40ac6b]
  - @frameless/strapi-tiptap-editor@0.1.1

## 0.2.1

### Patch Changes

- Updated dependencies [06c52b9]
  - @frameless/strapi-tiptap-editor@0.1.0

## 0.2.0

### Minor Changes

- 82fa577: Wanneer je een tabel maakt in Strapi, is het nu makkelijker om tekst voor of na de tabel toe te voegen. Klik op de knop boven de tabel om daar een lege regel toe te voegen, of klik op de knop onder de tabel om erna een lege regel te maken.
- 82fa577: Wanneer een linktekst in een andere taal is geschreven, dan kun je nu in Strapi de taal instellen. Als je dit doet verbeter je de toegankelijkheid, want dan kan de tekst met de juiste taal voorgelezen worden.
- 82fa577: Er zijn nu Nederlandse labels voor de toolbar buttons van de rich text editor in Strapi.

### Patch Changes

- 82fa577: Als je in Strapi een link maakt naar een formulier, dan hoef je niet meer zo lang te wachten tot de lijst met alle formulieren is geladen.
- 82fa577: Je kunt nu in Strapi links maken naar een telefoonnummer, zodat bezoekers van het Digitaal Loket gelijk kunnen bellen als ze op de link klikken.
- Updated dependencies [82fa577]
- Updated dependencies [82fa577]
- Updated dependencies [82fa577]
- Updated dependencies [82fa577]
  - @frameless/strapi-tiptap-editor@0.0.0
  - @frameless/strapi-plugin-open-forms-embed@0.0.0
  - @frameless/strapi-plugin-language@0.0.0
