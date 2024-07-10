<!-- @license CC0-1.0 -->

De linktekst vertelt eenduidig aan de gebruiker waar de link naar toe gaat (het linkdoel).

Wat is een linktekst? Het tekst die zichtbaar is, maar ook de tekst die aan een gebruiker van hulpsoftware wordt voorgelezen.

Wat is het linkdoel? De locatie waar de link naartoe gaat. Bijvoorbeeld de contactpagina, een nieuwsbericht, een andere website of een download van een document.

Wat betekent ‘In context’? Het doel van de link kan ook door omringende content worden aangegeven. Dit moet dan wel ook voor gebruikers van hulpmiddelen duidelijk zijn, bijvoorbeeld door aanvullende tekst of een afbeelding naast de link. Dit laatste is onderwerp van veel discussie. Het beste is om altijd goed in de linktekst zelf te vertellen want het doel is.

**Let op**: Een linktekst wordt voor dit succescriterium niet afgekeurd als de betekenis voor alle gebruikers onduidelijk is. Wat natuurlijk niet wegneemt dat dit voor iedereen een slechte gebruikerservaring is.

Een eenduidige tekst is belangrijk voor alle gebruikers, zodat ze goed weten wat er gebeurt bij het aanklikken van een link. Screenreadergebruikers kunnen een lijst van alle links op een pagina oproepen en zo snel door de website navigeren, maar dan moeten de linkteksten wel onderscheidbaar zijn.

Het kan overduidelijk zijn waar een link heen gaat, maar soms is meer context nodig. Zijn er veel links met dezelfde linktekst op een pagina? Maak dan onderscheid tussen de linktekst door het toevoegen van meer informatie.

Voor ziende gebruikers kan duidelijk zijn waar een "Lees meer" link naar toe gaat, als deze linktekst onder een korte samenvatting staat. Om het voor screenreadergebruikers ook duidelijk te maken waar de link naar toe gaat kan er extra tekst worden toegevoegd die onzichtbaar, maar wel hoorbaar is.

Dit kan door gebruik te maken van CSS-classes zoals [.sr-only](https://tailwindcss.com/docs/screen-readers) of [.screen-reader-text](https://make.wordpress.org/accessibility/handbook/markup/the-css-class-screen-reader-text/).

In code:

```html
<a href="url">Lees meer<span class="sr-only"> over warmtepompen</a>.
```

Of door het toevoegen van een `aria-label` aan de link.

In code:

```html
<a href="url" aria-label="Lees meer over warmtepompen">Lees meer</a>.
```

Ook in tekstparagrafen is een duidelijke linktekst belangrijk. Vergelijk de scanbaarheid en duidelijkheid van de volgende twee voorbeelden.

- [Klik hier](https://nl.wikipedia.org/wiki/Waddenzee) om verder te lezen over de Waddenzee.
- Lees verder over [de Waddenzee](https://nl.wikipedia.org/wiki/Waddenzee).

‘Klik hier’ is de slechtste linktekst die er is. Alle gebruikers moeten eerst de hele zin lezen om te weten waar de link naar toe gaat. Specifiek voor gebruikers met een screenreader die een lijst van links opvragen is het zeer onduidelijk als er één of meer keer ‘Klik hier’ in die lijst staat. De linktekst ‘de Waddenzee’ voor een link naar informatie over de Waddenzee werkt juist heel goed. De linktekst schept hier een verwachting die goed aansluit bij het linkdoel.
Vermijd ook het linken van een hele URL, zoals in 'Lees verder op [https://nl.wikipedia.org/wiki/Waddenzee](https://nl.wikipedia.org/wiki/Waddenzee)'.

In de blogpost [<span lang="en">The perfect link</span>](https://www.a11y-collective.com/blog/the-perfect-link/) staan uitgebreid voorbeelden en toepassingen van goede linkteksten.
