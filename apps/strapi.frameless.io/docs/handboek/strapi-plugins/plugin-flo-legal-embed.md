# FLO Legal Embed

## Wat doet deze plugin?

Met de FLO Legal Embed plugin kan de redactie een juridisch formulier of beslisboom selecteren die vervolgens op de website wordt getoond. Bezoekers worden hiermee stap voor stap begeleid door juridische keuzes of processen.

De plugin haalt automatisch de beschikbare formulieren op uit de Flo Legal API en toont deze als dropdown in Strapi.

---

## Hoe gebruik je de FLO Legal Embed?

### 1. Open een product

Content Manager -> **Producten** -> open een product/nieuwe aanmaken

### 2. Voeg het Beslisboom component toe

Scroll naar het knop **+ Voeg een onderdeel toe** en klik hierop. Kies het component **Beslisboom**.

<!-- [Bekijk voorbeeld](/img/strapi-plugins/...) -->

### 3. Selecteer een formulier

Klik op het dropdownmenu bij **Beslissingsboomformulier** om de beschikbare formulieren te bekijken. In de lijst worden alle beschikbare beslisbomen uit de Flo Legal API weergegeven. Selecteer het gewenste formulier om deze beslisboom aan het onderdeel toe te voegen, bijvoorbeeld:

- Afval beslisboom Regelhulp
- Voorbeeld toelichtingen
- Laadpaal beslisboom Regelhulp (demo - concept)

![Bekijk voorbeeld](/img/strapi-plugins/strapi-dashboard-beslissingboomformulier.png)

### 4. Sla op en publiceer

De identifier van het geselecteerde formulier wordt automatisch opgeslagen en is zichtbaar in de componenttitel, bijvoorbeeld:

```text
Beslisboom - identifier=HqD4bk27e4W4rGDNY
```

Klik op **Bewaar** en vervolgens op **Publiceer** om het formulier live te zetten.

---

## Aandachtspunten

- De beschikbare formulieren komen rechtstreeks uit de Flo Legal API. Wanneer een technisch beheerder uit Utrecht een nieuw formulier aanmaakt, verschijnt dit automatisch als extra optie in de **Flo Legal API** formulier dropdown in Strapi.
- De identifier wordt automatisch ingesteld na het selecteren van een formulier — je hoeft dit niet handmatig in te vullen
