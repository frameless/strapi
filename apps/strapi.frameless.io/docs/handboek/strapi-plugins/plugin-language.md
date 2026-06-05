# Language Plugin

## Wat doet deze plugin?

De Language plugin maakt het mogelijk om binnen de TipTap editor een andere taal te selecteren voor een specifiek stuk tekst. Dit is een toegankelijkheidsfunctie: door de juiste taal te markeren kunnen screenreaders de tekst correct voorlezen voor bezoekers die afhankelijk zijn van hulpsoftware.

---

## Wanneer gebruik je dit?

Gebruik de taalselectie wanneer je binnen een pagina een stuk tekst hebt dat in een andere taal is geschreven dan de rest van de pagina. Bijvoorbeeld een citaat in het Engels of een term in het Arabisch.

---

## Hoe gebruik je de Language plugin?

### 1. Open het Contentblok

Content Manager -> **Producten** -> open of voeg een **Contentblok** component toe

![Bekijk voorbeeld](/img/strapi-plugins/strapi-dashboard-producten-onderdelen.png)

### 2. Selecteer de tekst

Selecteer in de TipTap editor (teksteditor in strapi) het stuk tekst waaraan je een andere taal wilt koppelen.

### 3. Kies een taal

Klik op de dropdown **Selecteer een taal** in de toolbar. Kies de gewenste taal uit de lijst. De beschikbare talen zijn op dit moment:

- Arabisch
- Engels
- Nederlands
- Oekraïens
- Turks

![Bekijk voorbeeld](/img/strapi-plugins/strapi-dashboard-contentblok-talen.png)

### 4. Sla op

Klik op **Bewaar** om de wijziging op te slaan. De geselecteerde taal wordt nu als attribuut aan de tekst meegegeven, zodat screenreaders weten in welke taal dit stuk voorgelezen moet worden.

## Talen beheren

Talen worden centraal beheerd via de Strapi instellingen.

### Een taal toevoegen

1. Ga naar **Instellingen** (tandwielicoontje) in het linker menu van Strapi
2. Klik onder **Globale instellingen** op **Strapi TipTap Editor**
3. Ga naar het tabblad **Other**
4. Klik bij **Language** op **Settings**
5. Zoek een taal via het zoekveld en voeg deze toe
6. Klik op **Save Language** om op te slaan

![Bekijk voorbeeld](/img/strapi-plugins/strapi-dashboard-tiptab-talen-toevoegen.png)

### Een taal verwijderen

Klik op het **prullenbak-icoontje** naast de taal die je wilt verwijderen en klik daarna op **Save Language**.

---

## Aandachtspunten

- De Language plugin is alleen beschikbaar binnen de **TipTap editor** in het Contentblok
- De taalselectie is **niet zichtbaar** voor bezoekers op de website — het is puur bedoeld voor screenreaders
- Gebruik deze functie consequent bij anderstalige tekst om de toegankelijkheid van de website te waarborgen
