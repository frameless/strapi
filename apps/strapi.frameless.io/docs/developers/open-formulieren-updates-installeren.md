# OpenFormulieren updates installeren

Om OpenFormulieren soepel te laten functioneren, werken ons Frontend- en Strapi-dashboard nauw samen.
Dit is hoe we het aanpakken:

## SDK-gebruik

We integreren de OpenFormulier SDK met het de [`@open-formulieren/sdk` npm-package](https://www.npmjs.com/package/@open-formulieren/sdk) in de PDC-frontend. Dit stelt ons in staat om updates zelfstandig te beheren, zodat onze frontend altijd voorzien is van de nieuwste functies en verbeteringen.

## API gebruik

Het PDC-Strapi-dashboard maakt gebruik van OpenFormulieren API. Het DevOps-team beheert deze updates, zodat onze backend synchroon blijft met de frontend.

## Coördinatie van updates installeren

Het is belangrijk dat alle teams de volgende updates op elkaar afstemmen. Eventuele wijzigingen in de SDK of API moeten snel worden gecommuniceerd, zodat zowel de frontend als de backend gelijktijdig worden bijgewerkt.

1. Open Forms server
2. Open Forms SDK in de frontend van websites waarin die embedded is.
3. Open Forms SDK in de backend van websites waarin die embedded is.
4. Open Forms REST API calls in het Strapi CMS.
