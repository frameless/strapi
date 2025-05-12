---
"@frameless/strapi-docs": minor
"@frameless/pdc-dashboard": minor
---

Voeg nieuwe contactgegevens-collectie toe aan het PDC-Strapi-dashboard

Deze collectie heeft een tweezijdige relatie met zowel producten als VAC's. Als je een contact koppelt aan een product of VAC, wordt die relatie ook zichtbaar aan de andere kant.

Deze update bevat ook wijzigingen in de rollen. Dit betekent dat de huidige rollen de juiste rechten krijgen voor toegang tot de nieuwe collectie.

- **Kennisbank Redacteur**: kan contactgegevens aanmaken, verwijderen, publiceren en bijwerken, maar mag alleen contactgegevens koppelen aan een VAC.

- **PDC Redacteur**: kan contactgegevens aanmaken, verwijderen, publiceren en bijwerken, maar mag alleen contactgegevens koppelen aan een product.
