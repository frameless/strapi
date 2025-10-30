# @frameless/overige-objecten-api

## 2.2.0

### Minor Changes

- f7d8700: We hebben de Spotlight bijgewerkt zodat het tekstblok nu netjes ingesprongen wordt. Dit is bereikt door een standaard HTML-element te gebruiken, waardoor de inhoud overzichtelijker en beter leesbaar is.

  ([GitHub Issue Frameless/strapi#1032](https://github.com/frameless/strapi/issues/1032))

- d1bf694: Uitklapper kan nu open- en dichtgeklapt worden ([GitHub Issue Frameless/strapi#1035](https://github.com/frameless/strapi/issues/1035)).

### Patch Changes

- c41208a: Verbeterd de weergave van meerdere Call-to-Action knoppen zodat er geen komma's meer tussen de knoppen verschijnen

  ([GitHub Issue Frameless/strapi#1033](https://github.com/frameless/strapi/issues/1033))

- a173e55: Probleem opgelost waarbij prijzen in KISS fout werden afgerond na de komma.
- Updated dependencies [140c0fa]
- Updated dependencies [c663a36]
  - @frameless/ui@0.1.3

## 2.1.0

### Minor Changes

- 2789e3d: Integreer de twee nieuwe velden gerelateerdeVACs en gerelateerdeProducten in de overige-objecten-api, zodat het Kiss-dashboard en andere services die deze API gebruiken, toegang hebben tot deze velden.

### Patch Changes

- Updated dependencies [95b7a51]
- Updated dependencies [f322de1]
- Updated dependencies [dcaab2a]
- Updated dependencies [c79d241]
- Updated dependencies [111df39]
- Updated dependencies [c16e0f5]
  - @frameless/ui@0.1.2
  - @frameless/utils@0.1.0

## 2.0.1

### Patch Changes

- d07b871: Codeverbetering: verplaats addHeadingOncePerCategory naar het util-pakket.
- Updated dependencies [ca71dbf]
- Updated dependencies [d07b871]
  - @frameless/ui@0.1.1
  - @frameless/utils@0.0.1

## 2.0.0

### Major Changes

- 4b26e09: De trefwoorden van de VAC is niet meer een lijst van trefwoorden, maar een tekstinvoerveld voor komma-gescheiden trefwoorden. De trefwoorden van VAC werken nu hetzelfde als voor de collecties voor Producten en Interne Velden ([GitHub Issue frameless/strapi#1067](https://github.com/frameless/strapi/issues/1067)).

### Minor Changes

- e3fec6e: In de Overige Objecten API wordt een (horizontale streep) toegevoegd boven het kopje 'Aanvullende informatie', zodat er in KISS een duidelijke visuele scheiding is tussen de publieke en aanvullende informatie. ([GitHub Issue #1070](https://github.com//issues/1070)).
- 8772962: Geef het eerste contentBlock terug als inleidingcategorie, indien opgegeven ([GitHub Issue frameless/strapi#1062](https://github.com/frameless/strapi/issues/1062)).

## 1.2.0

### Minor Changes

- 658b776: Integreer de trefwoorden uit het intern-veld in de Overige-Objecten-API([GitHub Issue frameless/strapi#1047](https://github.com/frameless/strapi/issues/1047)).
- 5859752: Integreer de aanvullende informatiecollectie in de Overige-objecten-API.

  Wanneer je een contentblok uit de aanvullende informatiecollectie met de categorie inleiding invoert, wordt dit samengevoegd in de Overige-objecten-API onder het publieke contentblok met de categorie inleiding.

- f423f59: Ondersteuning toegevoegd voor YouTube-embeds en afbeeldingen in de Overige-objecten-API. Daarnaast een unit-test geschreven voor de HTML-structuur die het Kiss-dashboard verwacht.

## 1.1.0

### Minor Changes

- eeb108b: Integreer de VAC's in de Overige Objecten API.
- 6ab0c5d: Integreer de interne kennisartikelen in de Overige Objecten API.

### Patch Changes

- 2ee2af6: Zorg ervoor dat het kosten-veld beschikbaar is in de interne-veld-/overige-objecten-API.
- a86232d: Los het probleem op dat optreedt wanneer er geen gegevens beschikbaar zijn in kennisartikelen.

## 1.0.0

### Major Changes

- 85a64c4: Create Overige Objecten API applicatie
