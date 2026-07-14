---
"@frameless/ui": patch
---

Fix: `ButtonLink` toonde altijd de primaire knopstijl, ongeacht de "Stijl" die was gekozen in het Call to Action-component in Strapi.

Voorheen was de knopstijl hardcoded, waardoor de knop op de website nog steeds de standaard primaire stijl toonde, ook als een redacteur in Strapi een andere stijl had gekozen (bijv. "Aanvullende knop (wit)" of "Inwoners (blauw)"). De knop gebruikt nu de `buttonAppearance` prop, waardoor deze correct de stijl weergeeft die in het Strapi-dashboard is geselecteerd.

([GitHub Issue Frameless/strapi#1534](https://github.com/frameless/strapi/issues/1534))
