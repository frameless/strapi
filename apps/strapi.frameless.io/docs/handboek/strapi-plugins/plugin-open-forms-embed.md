# Open Forms Embed

## Wat doet deze plugin?

Met de Open Forms Embed plugin kan een PDC redacteur vanuit het Strapi dashboard een formulier selecteren dat vervolgens op de website wordt getoond aan bezoekers.

De plugin haalt automatisch de beschikbare formulieren op uit de OpenForms API en toont deze als dropdown in Strapi.

---

## Hoe gebruik je de Open Forms Embed?

### 1. Open een product

Content Manager -> **Producten** -> open of maak een product waaraan je een formulier wilt koppelen.

### 2. Voeg een CTA component toe

Scroll en klik het **+ Voeg een onderdeel toe** knop. Kies het component **Call to Action knop (CTA)**.

![Bekijk voorbeeld](/img/strapi-plugins/strapi-dashboard-producten-onderdelen.png)

### 3. Selecteer een formulier

Klik op het veld **Formulier Open Forms** om de dropdown te openen. Kies het gewenste formulier uit de lijst. De plugin haalt de beschikbare formulieren op via de OpenForms API op basis van naam en UUID. Het is ook mogelijk om te filteren — typ een deel van de formuliernaam en de lijst past zich automatisch aan.

![Bekijk voorbeeld](/img/strapi-plugins/strapi-dashboard-open-forms-formulier.png)

### 4. Sla op en publiceer

Klik op **Bewaar** en vervolgens op **Publiceer** om het formulier live te zetten op de website.

---

## Aandachtspunten

- Het veld **Formulier Open Forms** en het veld **URL** in de CTA zijn beide optioneel — gebruik één van de twee om de knop te laten werken

- De formulieren in de dropdown komen uit de OpenForms API van Utrecht. Wanneer een technisch beheerder een nieuw formulier aanmaakt via het OpenForms dashboard, verschijnt dit automatisch als extra optie in de **Formulier Open Forms** dropdown in Strapi. Als een formulier niet in de lijst staat, neem dan contact op met een technisch beheerder.
