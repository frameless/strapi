---
title: Handleiding voor het gebruik van het Strapi dashboard voor VTH van gemeente Utrecht
sidebar_label: VTH van Utrecht
sidebar_position: 2
---

# Handleiding voor het gebruik van het Strapi-dashboard voor VTH van gemeente Utrecht

## Hoe u inhoud kunt toevoegen of bijwerken

### 1. Open het Content Beheer

- Klik op de knop &quot;Content Beheer&quot; aan de linkerkant.
- Er verschijnt een navigatiebalk aan de zijkant met alle inhoud.

### 2. Selecteer een collectie

- Kies een van de content collecties om inhoud toe te voegen of te wijzigen.
- Klik op de knop &quot;Nieuwe invoer&quot; om iets nieuws toe te voegen.
  ![Screenshot van de Hoofditem pagina in het Strapi-dashboard. Nummer 1 wijst de "Content beheer" link aan, nummer 2 wijst de "Hoofditem" collectie type link aan, nummer 3 wijst de knop "Nieuwe invoer" aan.](/img/vth/open-het-content-beheer.png)

### 3. Voorvertoning en Publicatie

- Klik op de &quot;Opslaan&quot; knop rechtsboven om je wijzigingen op te slaan.
- Klik vervolgens op de &quot;Preview&quot; knop onder het &quot;Informatie&quot; blok aan de rechterkant om een voorvertoning van de pagina te bekijken.
- De voorvertoningsmodus toont de pagina alleen voor jou en is niet zichtbaar voor anderen.
  ![Screenshot van het Strapi-dashboard. Nummer 1 wijst de link "Thema" aan, nummer 2 wijst het formulier-veld "Invoer" aan, nummer 3 wijst de knop "Opslaan" aan, nummer 4 wijst de link "Preview" aan.](/img/vth/voorvertoning-en-publicatie.png)
- Gebruik de Editoria11y tool in de voorvertoningsmodus voor toegankelijkheids- en HTML-validatie.
  ![Screenshot van een Preview van een thema, waarbij Editoria11y een probleem heeft gevonden: afbeelding zonder alt-tekst.](/img/vth/gebruik-de-editoria11y-tool.png)

### 4. Pagina&#39;s publiceren

- Gebruik de &quot;Publisher&quot; functie om een nieuwe pagina op een specifiek tijdstip te publiceren of te de-publiceren.
  ![Screenshot van het Strapi-dashboard, met een pijl naar de knop "Publiceer" en een pijl bij de knop "Voeg publicatiedatum toe".](/img/vth/pagina-publiceren.png)

## Content beschrijven

### Collectie Types

**Hoofditem** wordt op de volgende plekken getoond:

- Elk hoofditem heeft een link de hoofdnavigatie.
- Elk hoofditem wordt getoond als kaart op de homepage.
- Elk hoofditem heeft een eigen pagina, bijvoorbeeld op:
  `https://vth-programma-verslag.digitaal.utrecht.nl/nl/verkeer`

**Thema** wordt op de volgende plekken getoond:

- Elk thema wordt getoond als kaart op de pagina van het hoofditem waarbij die hoort.
- Elk thema heeft een eigen pagina, bijvoorbeeld op de URL:
  `http://vth-programma-verslag.digitaal.utrecht.nl/nl/theme/horeca`

**Themacontent** zijn de pagina&#39;s met een uitgebreide teksten. Ze worden op de volgende plekken getoond:

- Alle themacontent wordt getoond als kaart op de pagina van het hoofditem of thema waar ze gekoppeld zijn.
- Alle themacontent heeft een eigen pagina, bijvoorbeeld op de URL:
  `https://vth-programma-verslag.digitaal.utrecht.nl/nl/article/slopen`

### Enkele Types

- **Homepage:** De startpagina van de website.
- **Not Found Page:** Toont tekst wanneer een gebruiker een niet-bestaande pagina probeert te bereiken.
- **Print Page:** Voor het afdrukken of downloaden van de volledige website-inhoud.

### Media Library

- Voor het beheren van afbeeldingen.

## Tekst Editor

Je kunt kiezen uit de volgende opties voor tekstopmaak:
**Alinea**: een alinea met tekst

- **Lead**: inleidende tekst
- **Kop 1** tot en met **Kop 6**: koppen van de tekst.
- **Vet**: extra belangrijke tekst kun je vet maken. Je moet nooit een hele alinea vet maken, gebruik vet alleen voor een korte zin of een gedeelte van de tekst.
- **Opsommingslijst**: voor een lijst met meerdere items.
- **Genummerde lijst**: een lijst met items in een specifieke volgorde.
- **Blokcitaat**: als je een tekst of een uitspraak wilt citeren.
- **Hyperlink**: maak een link naar een andere pagina.
- **Afbeelding**: voeg een afbeelding toe. Let op dat je altijd een &quot;Alternatieve tekst&quot; invult, zodat mensen die de afbeelding niet kunnen zien wel weten wat er afgebeeld is.
- Tabellen:
  - **Tabel met bijschrift invoegen**: tabellen geef je op deze manier een titel.
  - **Tabel invoegen**: hier kun je tabellen zonder titel maken.
- **YouTube-video**: kopieer eerst de URL van een YouTube-video, en plak die daarna hier in het invoerveld.
- **Scheidingslijn**: gebruik een horizontale lijn om een tekst in twee onderdelen op te splitsen, wanneer je geen Kop kan gebruiken.
- **Genereer ID voor kop**: wanneer je een link naar een kop in deze tekst wil maken, moet je eerst een ID voor de kop maken. Plaats de cursor in een kop, en klik op de knop &quot;Genereer ID voor kop&quot;. De link naar de kop wordt automatisch gekopieerd, zodat je de link kan plakken in het &quot;URL&quot; veld van een link.

Werken met tabellen:

- Plaats de tekstcursor in een tabel, dan verschijnt het **Tabel menu**.

[Bekijk de video over het werken met tabellen](https://www.youtube.com/watch?v=9VCdyk2pbro).
