# @frameless/pdc-frontend

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
