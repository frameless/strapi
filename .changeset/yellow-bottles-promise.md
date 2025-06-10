---
"@frameless/pdc-dashboard": patch
---

Werk de labels van de PDC-Dashboard Strapi-velden bij ([GitHub Issue Frameless/strapi#1160](https://github.com/frameless/strapi/issues/1160)).

In deze pull request zijn de labels van verschillende Strapi-velden bijgewerkt naar het Nederlands. Sommige labels konden echter nog niet worden vertaald vanwege beperkingen in de plugin of omdat de bijbehorende velden nog niet beschikbaar zijn.

| **Strapi-veld** | **Locatie**                     | **Gewenste label in het Nederlands** | **Reden waarom vertaling nog niet mogelijk is**                                                                                                                                                               |
| --------------- | ------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Component`     | Invoegen contentelement         | Onderdeel                            | Er is geen ID beschikbaar of een duidelijke manier om dit veld te vertalen.                                                                                                                                   |
| `Notes`         | pdc-dashboard / Rechtermenubalk | Notities                             | De [strapi-plugin-notes](https://github.com/strapi-community/strapi-plugin-notes) ondersteunt momenteel nog geen Nederlandse vertaling. Ik zal hieraan bijdragen. Zodra de update live is, laat ik dit weten. |
| `Add a note`    | pdc-dashboard / Rechtermenubalk | Voeg notitie toe                     |                                                                                                                                                                                                               |
| `Categorie`     | VAC-verzameling                 | Subcategorie                         | Dit veld is nog niet toegevoegd aan de VAC-collectie. Zie [issue #1163](https://github.com/frameless/strapi/issues/1163). Zodra het veld beschikbaar is, passen we het label toe.                             |
