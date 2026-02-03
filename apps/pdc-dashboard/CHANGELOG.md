# @frameless/pdc-dashboard

## 4.1.0

### Minor Changes

- 7c60841: Voeg subcategorieën toe aan VAC collectie

  ([GitHub Issue Frameless/strapi#1163](https://github.com/orgs/frameless/projects/45/views/8?pane=issue&itemId=111698254&issue=frameless%7Cstrapi%7C1163))

- 5ad0314: Voeg nieuwe contactgegevens-collectie toe aan het PDC-Strapi-dashboard

  Deze collectie heeft een tweezijdige relatie met zowel producten als VAC's. Als je een contact koppelt aan een product of VAC, wordt die relatie ook zichtbaar aan de andere kant.

  Deze update bevat ook wijzigingen in de rollen. Dit betekent dat de huidige rollen de juiste rechten krijgen voor toegang tot de nieuwe collectie.

  - **Kennisbank Redacteur**: kan contactgegevens aanmaken, verwijderen, publiceren en bijwerken, maar mag alleen contactgegevens koppelen aan een VAC.
  - **PDC Redacteur**: kan contactgegevens aanmaken, verwijderen, publiceren en bijwerken, maar mag alleen contactgegevens koppelen aan een product.

- d82bf39: Contactinformatie is nu opgesplitst in twee aparte verzamelingen:

  - **Contactinformatie (openbaar)**: Zichtbaar voor alle bezoekers op de website
  - **Contactinformatie (intern)**: Alleen zichtbaar voor medewerkers in het KISS-dashboard

  Deze wijziging maakt het mogelijk om verschillende contactgegevens te tonen aan het publiek en aan interne medewerkers.

  ## Waar worden de nieuwe verzamelingen gebruikt?

  ### PDC Strapi Dashboard - Voorbeeld in dialoogvenster

  - **Interne informatie**: Wanneer je contactinformatie koppelt aan de verzameling "Interne informatie", wordt deze onderaan weergegeven
  - **VAC**: Werkt op dezelfde manier als bij Interne informatie
  - **Producten**: Alleen contactinformatie (openbaar) kan gekoppeld worden aan een product. Via de productblokken (Onderdelen) kun je een contactinformatie-blok toevoegen en vervolgens een contactinformatie selecteren via de dropdown

  ### Overige Objecten API

  De contactinformatie wordt op dezelfde manier verwerkt als in het voorbeelddialoogvenster en wordt uiteindelijk weergegeven in het KISS-dashboard.

  ### PDC Frontend

  Wanneer contactinformatie (openbaar) aan een product is gekoppeld, wordt deze weergegeven op de website van het digitaal loket.

  ### Documentatie

  De [rollendocumentatie](https://cms.frameless.io/docs/handboek/rollen-en-mogelijkheden-in-strapi-dashboard) is bijgewerkt met informatie over de nieuwe verzamelingen.

  ([GitHub Issue Frameless/strapi#1165](https://github.com/frameless/strapi/issues/1165))

- 967697e: Uitklapper (accordion) toegevoegd aan de teksteditor. Hiermee kun je inklapbare secties maken met een titel en inhoud die bezoekers kunnen open- en dichtklappen.

  ([GitHub Issue Frameless/strapi#1161](https://github.com/frameless/strapi/issues/1161))

- 4610e4a: Toegevoegde open-forms-error-page functie

  ### Minor Changes

  Geeft redacteuren de mogelijkheid om de inhoud van de foutpagina's van open formulieren bij te werken via het Strapi-dashboard.

  - ([GitHub Issue UtrechtStrapiCMS/projects#937](https://github.com/orgs/frameless/projects/45/views/1?pane=issue&itemId=84125224&issue=frameless%7Cstrapi%7C937))

- 30b3273: **Toegankelijkheid tracking toegevoegd**

  Nieuwe functionaliteit om gebruikersgedrag en toegankelijkheidsinstellingen te volgen:

  - **Donkere modus detectie**: Registreert wanneer gebruikers donkere modus gebruiken
  - **Hoog contrast modus**: Volgt gebruik van geforceerde kleuren/hoog contrast instellingen
  - **Zoom niveau bij formulieren**: Detecteert wanneer gebruikers inzoomen (>130%) en formulieren gebruiken
  - **Google Translate gebruik**: Registreert wanneer pagina's worden vertaald

  ([GitHub Issue Frameless/strapi#996](https://github.com/frameless/strapi/issues/996));

### Patch Changes

- 1ae2ea4: Rolrechten bijgewerkt voor Beheer, Kennisredacteur en PDC-redacteur (contact-informatie) om vereiste contentvelden te ontgrendelen

  ([GitHub Issue Frameless/strapi#46](https://github.com/orgs/frameless/projects/45/views/8?pane=issue&itemId=142880197&issue=frameless%7Cstrapi%7C1303))

- e700c78: Labels en tekstwijzigingen in Contactinformatie en Contentblok

  ([GitHub Issue Frameless/strapi#46](https://github.com/orgs/frameless/projects/45/views/8?pane=issue&itemId=144279076&issue=frameless%7Cstrapi%7C1317))

- 0d6d9f2: Het is nu mogelijk om meerdere interne contactgegevens toe te voegen aan VAC en de interne informatieverzameling.

  ([GitHub Issue Frameless/strapi#1316](https://github.com/frameless/strapi/issues/1316))

- 107cdb8: Hoofdmenu collection type label vertalen naar nederlands
  Contactinformation (intern) -> Contactinformatie (intern)
- 8d62c9e: Herbenaming en verduidelijking van labels voor datahoofdcategorieën en datasubcategorieën.

  ([GitHub Issue Frameless/strapi#1346](https://github.com/orgs/frameless/projects/45/views/8?pane=issue&itemId=148435332&issue=frameless%7Cstrapi%7C1346))

- 1fe3ee0: Werk de labels van de PDC-Dashboard Strapi-velden bij ([GitHub Issue Frameless/strapi#1160](https://github.com/frameless/strapi/issues/1160)).

  In deze pull request zijn de labels van verschillende Strapi-velden bijgewerkt naar het Nederlands. Sommige labels konden echter nog niet worden vertaald vanwege beperkingen in de plugin of omdat de bijbehorende velden nog niet beschikbaar zijn.

  | **Strapi-veld** | **Locatie**                     | **Gewenste label in het Nederlands** | **Reden waarom vertaling nog niet mogelijk is**                                                                                                                                                               |
  | --------------- | ------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `Component`     | Invoegen contentelement         | Onderdeel                            | Er is geen ID beschikbaar of een duidelijke manier om dit veld te vertalen.                                                                                                                                   |
  | `Notes`         | pdc-dashboard / Rechtermenubalk | Notities                             | De [strapi-plugin-notes](https://github.com/strapi-community/strapi-plugin-notes) ondersteunt momenteel nog geen Nederlandse vertaling. Ik zal hieraan bijdragen. Zodra de update live is, laat ik dit weten. |
  | `Add a note`    | pdc-dashboard / Rechtermenubalk | Voeg notitie toe                     |                                                                                                                                                                                                               |
  | `Categorie`     | VAC-verzameling                 | Subcategorie                         | Dit veld is nog niet toegevoegd aan de VAC-collectie. Zie [issue #1163](https://github.com/frameless/strapi/issues/1163). Zodra het veld beschikbaar is, passen we het label toe.                             |

- Updated dependencies [c040252]
- Updated dependencies [0d6d9f2]
- Updated dependencies [d82bf39]
- Updated dependencies [967697e]
- Updated dependencies [92d678a]
- Updated dependencies [480cf64]
  - @frameless/content-compliance-checker@1.0.0
  - @frameless/preview-button@1.3.0
  - @frameless/strapi-tiptap-editor@0.4.0
  - @frameless/strapi-plugin-open-forms-embed@0.0.1

## 4.0.0

### Major Changes

- 7d5a24a: Zorg dat de PDC-rollen overeenkomen met de Excel-sheet van Utrecht ([GitHub Issue Frameless/strapi#1133](https://github.com/frameless/strapi/issues/1133)).

### Minor Changes

- e09f7f3: Voeg ondersteuning toe voor de volgende twee nieuwe velden in het bestaande JSON-schema voor VAC's: gerelateerdeVACs en gerelateerdeProducten. Deze velden maken het mogelijk om respectievelijk relaties te leggen tussen VAC's onderling en tussen VAC's en producten.

### Patch Changes

- Updated dependencies [8b2df3c]
- Updated dependencies [5a20217]
- Updated dependencies [c79d241]
  - @frameless/strapi-tiptap-editor@0.3.2
  - @frameless/strapi-plugin-flo-legal-embed@1.0.0
  - @frameless/preview-button@1.2.0

## 3.1.0

### Minor Changes

- c77b5e6: Nieuwe functie: oude paginalinks worden automatisch opgeslagen. Bij een titelwijziging worden bezoekers via de oude link doorgestuurd naar de juiste pagina.

### Patch Changes

- Updated dependencies [d026e85]
- Updated dependencies [d07b871]
  - @frameless/strapi-plugin-old-slugs@1.0.0
  - @frameless/preview-button@1.1.1
  - @frameless/strapi-tiptap-editor@0.3.1

## 3.0.0

### Major Changes

- 4b26e09: De trefwoorden van de VAC is niet meer een lijst van trefwoorden, maar een tekstinvoerveld voor komma-gescheiden trefwoorden. De trefwoorden van VAC werken nu hetzelfde als voor de collecties voor Producten en Interne Velden ([GitHub Issue frameless/strapi#1067](https://github.com/frameless/strapi/issues/1067)).

### Patch Changes

- d1fce00: Verbeter de labels van de aanvullende velden ([GitHub Issue frameless/strapi#1069](https://github.com/frameless/strapi/issues/1069)).
- Updated dependencies [eae89b1]
- Updated dependencies [6bfbd34]
- Updated dependencies [8af6fb1]
  - @frameless/preview-button@1.1.0

## 2.0.0

### Major Changes

- 609aa3d: Rolenamen en rechten bijgewerkt: 'Schrijver' hernoemd naar 'Schrijver Redacteur', PDC Schrijver-rechten aangepast ([GitHub Issue frameless/strapi#1044](https://github.com/frameless/strapi/issues/1044)).

### Minor Changes

- f92a35f: Voeg de aanvullende informatiecollectie toe aan het Strapi-dashboard.
- 1854d20: Update VAC-collectiestructuur

  **GitHub Issue Frameless**:

  - [#1046](https://github.com/frameless/strapi/issues/1046).
  - [#1040](https://github.com/frameless/strapi/issues/1040).

  **Wijzigingen**:

  - Het veld `antwoord` verplaatst naar een hoger niveau in de vac-collectie.
  - Het oude veld tijdelijk behouden voor datamigratie.
  - Deze wijziging maakt het mogelijk om `vraag` als invoernaam in het Strapi-dashboard te gebruiken.

- ef279f1: Ondersteuning toegevoegd voor het bekijken van aanvullende info binnen de productcollectie.
- b62bf02: Voeg het contactblok toe aan het afdelingsblok ([GitHub Issue frameless/strapi#1039](https://github.com/frameless/strapi/issues/1039)).
- c117e03: Voeg een trefwoordenveld toe aan het interneveld ([GitHub Issue frameless/strapi#1047](https://github.com/frameless/strapi/issues/1047)).
- 6aee078: Integreer de Strapi-preview-knop voor het bekijken van de VAC- en interne-veld collectie en het kopiëren van de HTML om deze in een Word-bestand te plakken.
- 4e27502: Voeg mogelijkheid toe om de content van het tekstblok als label te gebruiken

### Patch Changes

- acf4f86: Verbeter de labels in het Strapi-dashboard ([GitHub Issue frameless/strapi#1055](https://github.com/frameless/strapi/issues/1055)).
- 6a4760b: Vertaal het label van het interne veld naar de Nederlandse taal.
- Updated dependencies [a4aebab]
- Updated dependencies [d96fe22]
- Updated dependencies [7746862]
- Updated dependencies [635eae1]
- Updated dependencies [3b6b5b8]
- Updated dependencies [eff0529]
  - @frameless/preview-button@1.0.0
  - @frameless/strapi-tiptap-editor@0.3.0

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
