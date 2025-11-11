---
"@frameless/overige-objecten-api": minor
"@frameless/strapi-docs": minor
"@frameless/preview-button": minor
"@frameless/pdc-dashboard": minor
"@frameless/pdc-frontend": minor
---

Contactinformatie is nu opgesplitst in twee aparte verzamelingen:

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
