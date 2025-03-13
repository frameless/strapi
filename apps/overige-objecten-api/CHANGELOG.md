# @frameless/overige-objecten-api

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
