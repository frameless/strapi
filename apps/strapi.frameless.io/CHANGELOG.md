# @frameless/strapi-docs

## 2.1.0

### Minor Changes

- 5ad0314: Voeg nieuwe contactgegevens-collectie toe aan het PDC-Strapi-dashboard

  Deze collectie heeft een tweezijdige relatie met zowel producten als VAC's. Als je een contact koppelt aan een product of VAC, wordt die relatie ook zichtbaar aan de andere kant.

  Deze update bevat ook wijzigingen in de rollen. Dit betekent dat de huidige rollen de juiste rechten krijgen voor toegang tot de nieuwe collectie.

  - **Kennisbank Redacteur**: kan contactgegevens aanmaken, verwijderen, publiceren en bijwerken, maar mag alleen contactgegevens koppelen aan een VAC.
  - **PDC Redacteur**: kan contactgegevens aanmaken, verwijderen, publiceren en bijwerken, maar mag alleen contactgegevens koppelen aan een product.

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

## 2.0.0

### Major Changes

- 7d5a24a: Zorg dat de PDC-rollen overeenkomen met de Excel-sheet van Utrecht ([GitHub Issue Frameless/strapi#1133](https://github.com/frameless/strapi/issues/1133)).

## 1.0.0

### Major Changes

- 609aa3d: Rolenamen en rechten bijgewerkt: 'Schrijver' hernoemd naar 'Schrijver Redacteur', PDC Schrijver-rechten aangepast ([GitHub Issue frameless/strapi#1044](https://github.com/frameless/strapi/issues/1044)).

### Minor Changes

- cf93d16: Voeg instructiedocumentatie toe voor het genereren van de Strapi API-token
