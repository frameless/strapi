# TipTap Editor

## Wat doet deze plugin?

De TipTap Editor is een uitgebreide teksteditor die de standaard Strapi editor vervangt binnen het **Contentblok** component. De plugin geeft de redactie veel meer opmaakmogelijkheden dan de standaard editor, zoals tabellen, YouTube-video's en KISS-uitklappers.

---

## Hoe kom je bij het Contentblok?

Content Manager -> **Producten** -> Product aanmaken of bewerken

De TipTap editor is op twee manieren beschikbaar binnen een product:

### Automatisch — Inleiding content

Bij het aanmaken van een nieuw product is de TipTap editor direct beschikbaar in het veld **Inleiding content** bovenaan de pagina.

![Bekijk voorbeeld](/img/strapi-plugins/strapi-dashboard-contentblok-tiptap-editor.png)

### Handmatig — Extra Contentblok toevoegen

Wil je naast de inleiding nog een extra Contentblok toevoegen?

1. Klik het knop **+ Voeg een onderdeel toe**
2. Kies **Contentblok** uit het overzicht

Je ziet nu automatisch de TipTap editor met de uitgebreide toolbar.

---

## Wat kun je ermee?

### Tekstopmaak

Met de toolbar kun je tekst opmaken met:

- **Vet**, _cursief_, ~~doorgestreept~~ en onderstreept
- Uitlijning (links, midden, rechts)
- Opsommingslijsten en genummerde lijsten
- Blokcitaten en scheidingslijnen
- Kopniveaus (Alinea, Kop 1, Kop 2, etc.)
- Taal instellen per tekstveld

### Tabellen

Klik op **Tabel** in de toolbar om een tabel in te voegen. Je kunt vervolgens kiezen uit:

- **Tabel** — nieuwe tabel invoegen
- **Rijen** — rijen toevoegen of verwijderen
- **Columns** — kolommen toevoegen of verwijderen
- **Kop** — een koprij toevoegen
- **Bijschriften** — een bijschrift toevoegen
- **Cel** — celopties aanpassen

### YouTube-video invoegen

Klik op het **YouTube-icoontje** in de toolbar om een video in te voegen. Vul in:

- **YouTube-URL** — de link naar de video
- **Titel** — een beschrijvende titel van de video
- **Breedte** — standaard 640
- **Hoogte** — standaard 480

Klik op **Invoegen** om de video toe te voegen aan de content.

### KISS-uitklapper

Via de **KISS-uitklapper** dropdown in de toolbar kun je een uitklapmenu toevoegen of verwijderen. Dit is een specifiek element voor de weergave binnen het KISS dashboard.

---

## Overige velden in het Contentblok

Naast de editor zelf bevat het Contentblok een extra veld:

- **label** — wordt automatisch gevuld zodra je begint met schrijven in de TipTap editor. Dit label wordt in Strapi gebruikt als titel van het Contentblok, wat vooral handig is wanneer het blok wordt gebruikt binnen een uitklapper.

---

## Aandachtspunten

- De TipTap editor is alleen beschikbaar binnen een **Contentblok**
- De standaard Strapi editor is vervangen door deze plugin — je ziet de uitgebreide toolbar automatisch bij een **Contentblok**
