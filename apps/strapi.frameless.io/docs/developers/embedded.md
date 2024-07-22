---
title: Widgets embedden in het CMS en de website
hide_title: true
hide_table_of_contents: false
sidebar_label: Widgets embedden
pagination_label: Widgets embedden
description: Om widgets in de website te embeddeden zijn er enkele richtlijnen.
keywords:
  - embed
  - embedded
---

# Widgets embedden in het CMS en de website

Om widgets te kunnen embedden in de website zijn er de volgende richtlijnen:

- De embedded content heeft hetzelfde visueel ontwerp als de huisstijl van Utrecht. In de praktijk betekent dat: je gebruikt de design tokens van het Utrecht Design System, en je gebruikt de CSS van NL Design System.
- De embedded content voldoet aan de toegankelijkheidsrichtlijnen. De kwaliteit van de embedded widget is geen belemmering om Status A te halen en te behouden.
- Idealiter is er een WCAG-EM toegankelijkheidsonderzoek voor de techniek van de widget, om aan te tonen dat de widget toegankelijk is.
- De widget werkt met een stricte `Content-Security-Policy`, omdat de gemeentewebsite moet voldoen aan DigiD-eisen.

## Utrecht Design System

Het Utrecht Design System heeft uitgebreide documentatie over het visueel ontwerp. Kijk in de [Storybook](https://nl-design-system.github.io/utrecht/storybook/) naar de "CSS Componenten".

## Content-Security-Policy

- Alle verbindingen gebruiken encryptie.
  - De prefixes `http:` en `https:` zijn niet toegstaan.
  - Hostnames zonder prefix zijn niet toegestaan, gebruik altijd expliciet `https:`. Bijvoorbeeld: vervang `Content-Security-Policy: style-src 'self' utrecht.nl;` door `Content-Security-Policy: style-src 'self' https://utrecht.nl;`
- Voeg alleen URLs toe met code uit betrouwbare bron. Voeg bijvoorbeeld niet een volledige CDN toe. Bijvoorbeeld: vervang `Content-Security-Policy: style-src 'self' https://unpkg.com/;` door `Content-Security-Policy: style-src 'self' https://unpkg.com/@nl-design-system/ https://unpkg.com/@utrecht/;`.
- Er is documentatie beschikbaar welke `Content-Security-Policy` nodig is. Bijvoorbeeld: [Virtuele Gemeente Assistent - Uitleg widget code voor gemeentes](https://gitlab.com/virtuele-gemeente-assistent/gem/-/wikis/Uitleg-widget-code-voor-gemeentes#content-security-policy)

## Datamodel uitbreiden

Als de redactie van het CMS de widget moet kunnen toevoegen en instellen, dan moet het datamodel van het CMS uitgebreid worden met deze optie. In sommige gevallen moet ook de user interface van het CMS uitgebreid worden, door een Strapi Plugin te ontwikkelen. Maak daarvoor een [GitHub Issue](https://github.com/frameless/strapi) aan en neem contact op met de Product Owner van de website.

## Netwerkverbinding tussen het CMS en de widget

Als het CMS verbinding moet maken met de backend van de widget, dan moeten de netwerkinstellingen gewijzigd worden om dit toe te staan. Neem contact op met het cloud-infrastructuur team van de website.
