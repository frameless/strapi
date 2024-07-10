<!-- @license CC0-1.0 -->

De “markup” van pagina's, denk aan bijvoorbeeld HTML-code, moet voldoen aan bepaalde voorwaarden. Zo wordt de samenwerking tussen webpagina's, browsers en hulptechnologieën minder foutgevoelig.

Er zijn 4 voorwaarden gedefinieerd.

### 1. Elementen zijn volgens hun specificaties afgesloten

Denk hier bijvoorbeeld aan headings, divs, spans en andere elementen die een sluittag vereisen.
Een `<div>` moet afsluiten met een `</div>`.

### 2. Elementen zijn genest volgens hun specificaties

Verkeerd nesten van elementen kan voorkomen bij interactieve elementen: een button die een tweede button bevat.
Of bij het verkeerd combineren van elementen: een label die een link bevat.
Daarnaast moeten bijvoorbeeld lists en definition lists goed opgebouwd zijn.

Silvestar Bistrović beschrijft een aantal [<span lang="en">Common nesting issues in HTML</span>](https://www.htmhell.dev/adventcalendar/2022/20/).

### 3. Elementen bevatten geen dubbele attributen

Gebruik een attribuut maximaal één keer.
Vermijd bijvoorbeeld meerdere `class`-attributen:

```html
<!-- Foute code, niet gebruiken -->
<h1 class="heading" class="x-large">Contact</h1>
```

In het geval van het class-attribuut scheid je meerdere waarden met een spatie:

```html
<h1 class="heading x-large">Contact</h1>
```
