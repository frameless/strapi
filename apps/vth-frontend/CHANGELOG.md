# @frameless/vth-frontend

## 0.4.0

### Minor Changes

- 78e9ee4: Integreer het **Noto Sans** lettertype en de nieuwste versies van de **Utrecht component libraries** in de Online Loket-website.
  Deze update bevat diverse verbeteringen en bugfixes uit het Utrecht Design System, zodat de VTH-frontend up-to-date blijft met de meest recente UI-componenten en stijlen.

  De belangrijkste reden voor het bijwerken van de Utrecht component libraries is dat na het bijwerken van `@utrecht/design-tokens` om het **Noto Sans** lettertype toe te voegen, sommige bestaande stijlen niet meer compatibel waren met de huidige componenten.
  Door de component libraries bij te werken, wordt volledige compatibiliteit met de nieuwe design tokens gegarandeerd.

  ### Verbeteringen in deze update

  - Toegevoegd Noto Sans lettertype aan de VTH-frontend via @utrecht/design-tokens
  - Verbeterde layout-spacing voor zowel grote als kleine schermen
  - Algemene verbeteringen in UI en consistentie

### Patch Changes

- Updated dependencies [140c0fa]
- Updated dependencies [268d5f0]
- Updated dependencies [c663a36]
  - @frameless/ui@0.1.3
  - @frameless/editoria11y@1.0.0

## 0.3.2

### Patch Changes

- Updated dependencies [95b7a51]
- Updated dependencies [dcaab2a]
- Updated dependencies [c16e0f5]
  - @frameless/ui@0.1.2

## 0.3.1

### Patch Changes

- ca71dbf: Herstel navigatiemenu (mobiele versie) [GitHub Issue frameless/strapi#683](https://github.com/frameless/strapi/issues/683):

  - Focus Trap: Houdt de focus in het menu zodat gebruikers niets anders kunnen bedienen.
  - Bij sluiten met "Esc" of buiten het menu klikken, wordt de rest van de pagina vergrendeld en kan niet meer scrollen.

- Updated dependencies [ca71dbf]
  - @frameless/ui@0.1.1

## 0.3.0

### Minor Changes

- eafb6fd: Deze update zorgt er voor dat we de RichText component (het tussen ruimte component) toevoegen aan de vth en pdc, zodat de inhoud de goede ruimte krijgt.

## 0.2.2

### Patch Changes

- Updated dependencies [8c536da]
- Updated dependencies [2c0382b]
- Updated dependencies [2c0382b]
  - @frameless/ui@0.1.0

## 0.2.1

### Patch Changes

- Updated dependencies [06c52b9]
  - @frameless/ui@0.0.1

## 0.2.0

### Minor Changes

- 769b729: De website herkent nu Google Translate vertalingen naar talen die van rechts naar links worden geschreven (zoals Arabisch, Farsi en Hebreeuws), en spiegelt de layout van de site en bepaalde iconen. De website is dan veel beter leesbaar in die taal. Dit verbetert de gebruikerservaring voor circa 1% van de bezoekers.'

### Patch Changes

- 82fa577: Wanneer je met een toetsenbord de 'Naar boven' link activeert met Enter, dan kunnen toetsenbordgebruikers nu vanaf het begin van de pagina verder gaan met de Tab-toets. Dat verbetert de gebruiksvriendelijkheid, want eerder scrollde de pagina alleen naar boven, maar kwam je met Tab daarna terecht in de page footer.
- Updated dependencies [82fa577]
- Updated dependencies [82fa577]
  - @frameless/ui@0.0.0
