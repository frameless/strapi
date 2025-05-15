# @frameless/strapi-docs

## 2.1.0

### Minor Changes

- 5ad0314: Voeg nieuwe contactgegevens-collectie toe aan het PDC-Strapi-dashboard

  Deze collectie heeft een tweezijdige relatie met zowel producten als VAC's. Als je een contact koppelt aan een product of VAC, wordt die relatie ook zichtbaar aan de andere kant.

  Deze update bevat ook wijzigingen in de rollen. Dit betekent dat de huidige rollen de juiste rechten krijgen voor toegang tot de nieuwe collectie.

  - **Kennisbank Redacteur**: kan contactgegevens aanmaken, verwijderen, publiceren en bijwerken, maar mag alleen contactgegevens koppelen aan een VAC.
  - **PDC Redacteur**: kan contactgegevens aanmaken, verwijderen, publiceren en bijwerken, maar mag alleen contactgegevens koppelen aan een product.

## 2.0.0

### Major Changes

- 7d5a24a: Zorg dat de PDC-rollen overeenkomen met de Excel-sheet van Utrecht ([GitHub Issue Frameless/strapi#1133](https://github.com/frameless/strapi/issues/1133)).

## 1.0.0

### Major Changes

- 609aa3d: Rolenamen en rechten bijgewerkt: 'Schrijver' hernoemd naar 'Schrijver Redacteur', PDC Schrijver-rechten aangepast ([GitHub Issue frameless/strapi#1044](https://github.com/frameless/strapi/issues/1044)).

### Minor Changes

- cf93d16: Voeg instructiedocumentatie toe voor het genereren van de Strapi API-token
