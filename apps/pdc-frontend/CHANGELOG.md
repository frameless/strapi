# @frameless/pdc-frontend

## 0.8.0

### Minor Changes

- b85c24d: Integreer het **Noto Sans** lettertype en de nieuwste versies van de **Utrecht component libraries** in de Online Loket-website.
  Deze update bevat diverse verbeteringen en bugfixes uit het Utrecht Design System, zodat de PDC-frontend up-to-date blijft met de meest recente UI-componenten en stijlen.

  De belangrijkste reden voor het bijwerken van de Utrecht component libraries is dat na het bijwerken van `@utrecht/design-tokens` om het **Noto Sans** lettertype toe te voegen, sommige bestaande stijlen niet meer compatibel waren met de huidige componenten.
  Door de component libraries bij te werken, wordt volledige compatibiliteit met de nieuwe design tokens gegarandeerd.

  ### Verbeteringen in deze update

  - Toegevoegd Noto Sans lettertype aan de PDC-frontend via @utrecht/design-tokens
  - Bijgewerkte accordion-component
  - Verbeterde layout-spacing voor zowel grote als kleine schermen
  - Algemene verbeteringen in UI en consistentie
  - Opgeloste bugs in verschillende componenten

- e24723d: KTO-formulier (KCM) embed toegevoegd aan productpagina's met schakeloptie

  - KTO-formulier embed onderaan alle PDC productpagina's geplaatst
  - Schakeloptie in CMS toegevoegd om KTO-formulier per product in/uit te schakelen (standaard: ingeschakeld)
  - CSP-beleid geconfigureerd voor KCM survey resources (\*.kcmg.nl, v.kcmg.nl)
  - Omgevingsvariabelen toegevoegd voor KCM survey configuratie (API key, survey ID, URL, stylesheet)
  - KTO-formulier embed ziet er hetzelfde uit en werkt zoals op de hoofdwebsite
  - Update de rollen en permissies voor CMS-gebruikers om KTO-formulier schakeloptie te beheren

  ([GitHub Issue Frameless/strapi#1218](https://github.com/frameless/strapi/issues/1218))

- 684446c: # We hebben de manier waarop de beslisboom in de applicatie wordt geladen en weergegeven verbeterd:

  - De beslisboom wordt nu als een npm-pakket beheerd in plaats van via een los script. Dit maakt het veiliger en zorgt dat we beter kunnen bijhouden welke versie gebruikt wordt.
  - Er is een wrapper gemaakt voor ons design systeem, zodat de beslisboom automatisch het uiterlijk en de stijl van Gemeente Utrecht krijgt.
  - De beslisboom maakt nu gebruik van de nieuwste versie (1.13.2).
  - In de Strapi-omgeving is een React-wrapper toegevoegd, zodat de integratie makkelijker en consistenter is.
  - De nieuwe implementatie is volledig geïntegreerd in de PDC-frontend, waardoor gebruikers de beslisboom naadloos in de juiste huisstijl zien.

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

- 6abe014: Update Flo-legal to 1.17.0
- 2dc3a93: Formulierenpagina’s uitgesloten van indexering in zoekmachines.

  ([GitHub Issue Frameless/strapi#992](https://github.com/frameless/strapi/issues/992))

- Updated dependencies [140c0fa]
- Updated dependencies [268d5f0]
- Updated dependencies [c663a36]
  - @frameless/ui@0.1.3
  - @frameless/editoria11y@1.0.0

## 0.7.0

### Minor Changes

- f17430a: Maakt het mogelijk dat de formulier­velden een aanpasbare breedte hebben, gebaseerd op de veldnaam.

### Patch Changes

- 75fda2f: Weergave van het totale aantal resultaten bij lijsten, zoals zoekresultaten en alle-productenpagina’s ([GitHub Issue Frameless/strapi#1090](https://github.com/frameless/strapi/issues/1090)).
- Updated dependencies [95b7a51]
- Updated dependencies [f322de1]
- Updated dependencies [dcaab2a]
- Updated dependencies [c79d241]
- Updated dependencies [111df39]
- Updated dependencies [c16e0f5]
  - @frameless/ui@0.1.2
  - @frameless/utils@0.1.0

## 0.6.1

### Patch Changes

- 6567cdf: Fix voor een probleem waarbij sommige URL's onterecht als ongeldig werden beschouwd.

## 0.6.0

### Minor Changes

- 6898d88: Nieuwe functie: oude paginalinks worden automatisch opgeslagen. Bij een titelwijziging worden bezoekers via de oude link doorgestuurd naar de juiste pagina ([GitHub Issue frameless/strapi#789](https://github.com/frameless/strapi/issues/789)).
- 7a77c11: Vertaal de Engelse termen in URLs naar het Nederlands taal ([GitHub Issue frameless/strapi#702](https://github.com/frameless/strapi/issues/702)).

### Patch Changes

- ca71dbf: Herstel navigatiemenu (mobiele versie) [GitHub Issue frameless/strapi#683](https://github.com/frameless/strapi/issues/683):

  - Focus Trap: Houdt de focus in het menu zodat gebruikers niets anders kunnen bedienen.
  - Bij sluiten met "Esc" of buiten het menu klikken, wordt de rest van de pagina vergrendeld en kan niet meer scrollen.

- 24039dc: Verwijder de 'Scroll naar boven'-knop en de 'Wat vindt u van deze pagina'-link van de formulierpagina.

  - [GitHub Issue Frameless/strapi#989](https://github.com/frameless/strapi/issues/989)
  - [GitHub Issue Frameless/strapi#545](https://github.com/frameless/strapi/issues/545)

- Updated dependencies [ca71dbf]
- Updated dependencies [d07b871]
  - @frameless/ui@0.1.1
  - @frameless/utils@0.0.1

## 0.5.2

### Patch Changes

- ddc7c7e: Los het stijlprobleem van het Vormgeving-informatietekstblok in OpenForms op ([GitHub Issue frameless/strapi#881](https://github.com/frameless/strapi/issues/881)).
- 175fb35: Render de Open Formulieren HTML met NL Design System CSS componenten.

## 0.5.1

### Patch Changes

- 4b8172a: Scripts worden nu slimmer geladen, waardoor pagina's sneller en soepeler werken.
- cc0e667: Los de tabelstijl op de OpenForms-pagina op.

## 0.5.0

### Minor Changes

- eafb6fd: Deze update zorgt er voor dat we de RichText component (het tussen ruimte component) toevoegen aan de vth en pdc, zodat de inhoud de goede ruimte krijgt.

## 0.4.2

### Patch Changes

- 045ae12: Tekstomloopprobleem van dropdown-combobox opties opgelost.
- 349b2c1: Verbeter toegankelijkheid van het zoek-formulier op elke pagina. ([WCAG-succescriterium 4.1.2](https://nldesignsystem.nl/wcag/4.1.2/), [GitHub Issue nl-design-system/utrecht#2437](https://github.com/nl-design-system/utrecht/issues/2437))
- 2c0382b: De YouTube-video player past het formaat nu automatisch aan, zodat de video past op kleine schermen. [GitHub Issue frameless/strapi#877](https://github.com/frameless/strapi/issues/877)
- 2c0382b: Verbeter de toegankelijkheid door toetsenbordbediening van de YouTube-video uit te schakelen ([WCAG-successcriterium 2.1.4](http://nldesignsystem.nl/wcag/2.1.4/)).
- Updated dependencies [8c536da]
- Updated dependencies [2c0382b]
- Updated dependencies [2c0382b]
  - @frameless/ui@0.1.0

## 0.4.1

### Patch Changes

- 36ba214: Probleem opgelost waarbij de Combobox geeft lange teksten niet weergeft bij het selecteren van een optie en de dropdown ook.
- Updated dependencies [06c52b9]
  - @frameless/ui@0.0.1

## 0.4.0

### Minor Changes

- 15240ab: Support `Permissions-Policy` HTTP header.
- c723791: Support `X-Content-Type-Options` header to increase security.
- b67a3fb: Support `Referrer-Policy` header for increased privacy.

### Patch Changes

- 22ebe7b: Probleem opgelost met 'Wat vindt u van deze pagina'-link, zodat het formulier nu correct wordt weergegeven.

  [link naar het issue](https://github.com/frameless/strapi/issues/813)

- 3281b25: Probleem opgelost waarbij de Combobox geeft lange teksten niet correct weergeft bij het selecteren van een optie.

  [link naar het issue](https://github.com/frameless/strapi/issues/847 "link naar het issue")

## 0.3.0

### Minor Changes

- 9ac8326: De website van het Digitaal Loket heeft een nieuwe pagina met de toegankelijkheidsverklaring. De pagina is bereikbaar via /toegankelijkheid/.

## 0.2.1

### Patch Changes

- 2590813: Formulieren hebben nu een koptekst die al wordt getoond voordat Open Formulieren is opgestart. Dit verbetert de indexering door zoekmachines en door SiteImprove.

## 0.2.0

### Minor Changes

- 769b729: De website herkent nu Google Translate vertalingen naar talen die van rechts naar links worden geschreven (zoals Arabisch, Farsi en Hebreeuws), en spiegelt de layout van de site en bepaalde iconen. De website is dan veel beter leesbaar in die taal. Dit verbetert de gebruikerservaring voor circa 1% van de bezoekers.'

### Patch Changes

- 82fa577: Wanneer je met een toetsenbord de 'Naar boven' link activeert met Enter, dan kunnen toetsenbordgebruikers nu vanaf het begin van de pagina verder gaan met de Tab-toets. Dat verbetert de gebruiksvriendelijkheid, want eerder scrollde de pagina alleen naar boven, maar kwam je met Tab daarna terecht in de page footer.
- Updated dependencies [82fa577]
- Updated dependencies [82fa577]
  - @frameless/ui@0.0.0
