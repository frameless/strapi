<!-- @license CC0-1.0 -->

Geef interactieve elementen zoals buttons, links en formuliervelden een [toegankelijke naam](https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name) en een bijpassende rol. Geef daarnaast, afhankelijk van de functionaliteit, het element een toestand (state), eigenschappen en een waarde mee.

Waarom is dit nodig? Gebruikers van een screenreader krijgen deze informatie voorgelezen en weten zo hoe een interactief element te bedienen en wat de huidige waarde of status is.
Een goede toegankelijke naam is ook belangrijk bij stembesturing. De gebruiker kan een interactief element activeren (aanklikken) door deze naam uit te spreken.

Deze informatie kun je ook terugvinden in de zogenaamde [accessibility tree](https://www.internetacademy.nl/ebooks/wcag-in-de-praktijk/html-dom-accessibility-tree-en-wai-aria). Naast een 'DOM tree' maken browsers ook een 'accessibility tree' van een webpagina. Hulpmiddelen gebruiken deze gegevens.

**Let op**: Bij het gebruik van HTML is de rol al gedefinieerd en hoef je geen rol toe te voegen.

De regel is om de rol van een element niet aan te passen, maar er zijn uitzonderingen. Sommige roles voegen informatie toe en vervangen niet de functie. De oorspronkelijke functionaliteit blijft dan intact.

Bijvoorbeeld.

- `<form role="search">` voegt toe dat dit een zoekformulier is.
- `<button type="button" role="switch" aria-checked="true">` voegt toe dat deze button een aan/uit-schakelaar is.

We geven een paar voorbeelden.

### Radiobutton

In een formulier kun je je favoriete kleur kiezen uit een paar kleuren.
Een geselecteerde radiobutton (keuzerondje) heeft de naam 'Blauw', de rol van 'radio' en de state is 'checked'.
De naam komt van het label, de rol komt door het invoerveld `type="radio"` te geven en de state `checked` wordt door de browser gezet als de gebruiker 'Blauw' selecteert.

In code:

```html
<input id="kleur1" type="radio" /> <label for="kleur1">Blauw</label>
```

De screenreader VoiceOver leest dan voor: 'Blauw, geselecteerd, keuzerondje'.

![Screenshot van de screenreader VoiceOver met de tekst Blauw, geselecteerd, keuzerondje](https://raw.githubusercontent.com/nl-design-system/documentatie/assets/wcag_4_1_2_vo_blauw_geselecteerd_keuzerondje.png)

De accessibility tree van Chrome vermeldt voor het inputveld:

- Name: Blauw
- From label (for=attribute): label Blauw
- Role: radio
- Checked: true

![Screenshot van de accessibility tree van Chrome voor het inputveld](https://raw.githubusercontent.com/nl-design-system/documentatie/assets/wcag_4_1_2_chome_a11y_tree.png)

### Link

Een link naar bijvoorbeeld de contactpagina bevat de volgende informatie: de toegankelijke naam is 'Contact', de rol is 'link' en de waarde is de url, in dit geval https://nldesignsystem.nl/project/kernteam.

In code:

```html
<a href="https://nldesignsystem.nl/project/kernteam">Contact</a>
```

De screenreader VoiceOver leest voor: 'Link, contact'. En als de link al een keer aangeklikt is: 'Bezocht, Link, contact'

![Screenshot van de screenreader VoiceOver met de tekst Bezocht, Link, contact](https://raw.githubusercontent.com/nl-design-system/documentatie/assets/wcag_4_1_2_vo_bezocht_link_contact.png)

### Een button voor het openen en sluiten van een ander element.

Hoe geef je aan of een menu, modal of accordeon open of dicht is? Met `aria-expanded`.

In onderstaan voorbeeld heeft de button (knop) de toegankelijke naam 'Menu', de rol van button en de state expanded (open) of collapsed (gesloten).

Code voor het gesloten menu:

```html
<button aria-expanded="false">Menu</button>
```

De screenreader VoiceOver leest dan voor: 'Menu, samengevouwen, knop'.
![Screenshot van de screenreader VoiceOver met de tekst Menu, samengevouwen, knop](https://raw.githubusercontent.com/nl-design-system/documentatie/assets/wcag_4_1_2_vo_menu_samengevouwen_knop.png)

Code voor het open menu:

```html
<button aria-expanded="true">Menu</button>
```

De screenreader VoiceOver leest dan voor: 'Menu, uitgevouwen, knop'.
![Screenshot van de screenreader VoiceOver met de tekst Menu, uitgevouwen, knop](https://raw.githubusercontent.com/nl-design-system/documentatie/assets/wcag_4_1_2_vo_menu_uitgegevouwen_knop.png)

De accessibility tree van Chrome vermeldt voor de button:

- Name: Menu
- Contents: "Menu"
- Role: button
- Expanded: true

### Wat is de huidige pagina of stap?

Met [aria-current](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current) kun je aangeven wat de huidige pagina is of de huidige stap in een proces is. Een screenreader leest dit voor bij de link of stap.

Bijvoorbeeld bij het menu, als de huidige pagina voor de contactpagina is, in code:

```html
<ul>
  <li><a href="url">Home</a></li>
  <li><a href="url">About us</a></li>
  <li><a href="url" aria-current="page">Contact</a></li>
</ul>
```

En om aan te geven in welke stap de gebruiker is in een .

```html
<ul>
  <li>Stap 1</li>
  <li aria-current="step">Stap 2</li>
  <li>Stap 3</li>
</ul>
```

Het voordeel hiervan is ook dat je CSS aan aria-current states kunt toekennen.
Je hebt dan geen speciale 'active" CSS-class meer nodig.

In CSS:

```css
[aria-current]:not([aria-current="false"]) {
  font-weight: bold;
}
```

Dus in plaats van alleen visueel de state aan te geven met bijvoorbeeld `class="active"`, maak je nu voor iedereen duidelijk wat het actieve menu-item is, door de CSS alleen aan aria-current toe te kennen.
