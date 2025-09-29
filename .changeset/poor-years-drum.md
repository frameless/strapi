---
"@frameless/strapi-docs": minor
"@frameless/pdc-frontend": minor
---

# We hebben de manier waarop de beslisboom in de applicatie wordt geladen en weergegeven verbeterd:

- De beslisboom wordt nu als een npm-pakket beheerd in plaats van via een los script. Dit maakt het veiliger en zorgt dat we beter kunnen bijhouden welke versie gebruikt wordt.
- Er is een wrapper gemaakt voor ons design systeem, zodat de beslisboom automatisch het uiterlijk en de stijl van Gemeente Utrecht krijgt.
- De beslisboom maakt nu gebruik van de nieuwste versie (1.13.2).
- In de Strapi-omgeving is een React-wrapper toegevoegd, zodat de integratie makkelijker en consistenter is.
- De nieuwe implementatie is volledig geïntegreerd in de PDC-frontend, waardoor gebruikers de beslisboom naadloos in de juiste huisstijl zien.
