# Content Compliance Checker

## Wat doet deze plugin?

Deze plugin helpt de redactie om te controleren of content compleet is voordat deze wordt gepubliceerd. Je ziet in één overzicht welke producten blokken hebben waarbij de kennisartikelcategorie nog niet is ingevuld — zodat je niets over het hoofd ziet.

De kennisartikelcategorie is een veld dat gebruikt wordt voor de koppeling met **KISS (Klantinteractie Servicesysteem)**. Zonder deze categorie kan een product mogelijk niet correct worden weergegeven of gevonden binnen KISS.

## Hoe werkt de checker?

De plugin controleert niet automatisch alle content. Alleen producten die **componenten bevatten met een kennisartikelcategorie-veld** worden meegenomen in de controle.

Niet alle componenten hebben dit veld. Componenten zoals _Interne informatie_, _Beslisboom_ en _Contactinformatie (openbaar)_ worden daarom nooit getoond in de checker, ook niet als ze zijn toegevoegd aan een product.

Componenten die wél een kennisartikelcategorie-veld hebben, zoals een **Contentblok**, worden getoond in de checker zodra dit veld leeg is gelaten.

### Overzicht

| Situatie                                                                    | Verschijnt in checker? |
| --------------------------------------------------------------------------- | ---------------------- |
| Product zonder componenten                                                  | ❌ Nee                 |
| Product met component zonder kennisartikelcategorie-veld (bijv. Beslisboom) | ❌ Nee                 |
| Product met component mét kennisartikelcategorie-veld, veld ingevuld        | ❌ Nee                 |
| Product met component mét kennisartikelcategorie-veld, veld leeg            | ✅ Ja                  |

---

## Hoe gebruik je de plugin?

### 1. Open of maak een product aan

Ga in Strapi naar **Producten** en open een bestaand product, of klik op **+ Nieuw** om een nieuw product aan te maken.

### 2. Voeg een component toe

Scroll naar het veld **sections** en klik op **+ Voeg een onderdeel toe**. Kies een component uit het overzicht, bijvoorbeeld:

- Contentblok
- Call to Action knop (CTA)
- Spotlight
- FAQ koppelen

![Bekijk voorbeeld](/img/strapi-plugins/strapi-dashboard-producten-onderdelen.png)

### 3. Vul de kennisartikelcategorie in

Vul binnen het component het veld **kennisartikelCategorie** in via de dropdown. Dit veld is niet verplicht — je kunt het product ook zonder deze waarde opslaan. Als het veld leeg blijft, verschijnt het product in de Content Compliance Checker als aandachtspunt.

![Bekijk voorbeeld](/img/strapi-plugins/strapi-dashboard-onderdelen-kennisartikel-dropdown.png)

### 4. Sla op en publiceer

Klik op **Bewaar** om je wijzigingen op te slaan. Klik daarna op **Publiceer** om het product te publiceren.

### 5. Open de Content Compliance Checker

Klik in het **linker menu van Strapi** op het icoontje van de Content Compliance Checker. Je ziet dan het **Dashboard voor inhoud naleving** met een tabel van alle producten waarvan een blok de kennisartikelcategorie mist.

Per rij zie je:

- de **titel** van het product
- het **aantal blokken** zonder kennisartikelcategorie
- een knop **Bekijk details**

![Bekijk voorbeeld](/img/strapi-plugins/strapi-dashboard-content-compliance-checker.png)

### 6. Bekijk de details

Klik op **Bekijk details** naast een product. Je ziet dan:

- De titel van het product
- Welke blokken de kennisartikelcategorie missen, bijvoorbeeld: _Blok 1 — Type: Content Block_
- Per blok een waarschuwing: _Ontbrekende kennisartikelcategorie_
- Een knop **Bijwerken** waarmee je direct naar het product gaat om het te corrigeren
- Een knop **Terug naar Dashboard** om terug te gaan naar het overzicht

![Bekijk voorbeeld](/img/strapi-plugins/strapi-dashboard-cmc-details-page.png)

---

## Afdrukken

Zowel het dashboard als de detailpagina hebben een **Afdrukken**-knop rechtsboven. Hiermee kun je het overzicht of de details afdrukken of opslaan als PDF.
