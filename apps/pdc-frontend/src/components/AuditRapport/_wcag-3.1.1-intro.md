<!-- @license CC0-1.0 -->

Geef de menselijke taal waarin de tekst van een webpagina is geschreven aan. Dit kan door in het `html`-element het attribuut `lang` mee te geven met als waarde de taal.

Bijvoorbeeld `<html lang="nl">` voor een pagina met Nederlandse tekst.

Met het `lang`-attribuut vertel je aan een screenreader en andere voorleessoftware in welke taal de tekst van de pagina staat. Dan wordt deze tekst goed voorgelezen.

Deze waarde is als volgt samengesteld: Twee (kleine) letters voor de taalgroep uit de [ISO 639-1 standaard](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) en, optioneel, een koppelteken, met daarna twee of drie letters voor de variatie of regio van de taal in hoofdletters.

De code voor taalgroep is verplicht, de regio-code is optioneel.

Een uitgebreid overzicht staat op [HTML lang attribute / ISO language code reference / Culture names](https://gist.github.com/JamieMason/3748498) van Jamie Mason.

Voor Nederlands:

- `<html lang="nl">` voor algemeen Nederlands.
- `<html lang="nl-NL">` voor Nederlands.
- `<html lang="nl-BE">` voor Vlaams.

Het Fries is geen variatie van het Nederlands maar een eigen taal en heeft daarom een eigen ISO 639-1 code: `<html lang="fy">`.

Voor Engels bijvoorbeeld:

- `<html lang="en">` voor algemeen Engels.
- `<html lang="en-GB">` voor Brits.
- `<html lang="en-US">` voor Amerikaans.

Of de software deze aangegeven taal ook echt goed voorleest, is ervan afhankelijk of deze taal beschikbaar is. De gebruiker kan verschillende talen (stemmen) downloaden en ervoor kiezen bijvoorbeeld alleen Brits-Engels te gebruiken. Een Amerikaans gelabelde website wordt dan toch in het Brits voorgelezen.

**Let op**: dit succescriterium betreft de taal van de hele pagina. Wil je alleen een deel in een andere taal publiceren, gebruik dan het `lang`-attribuut op elementen in de andere taal binnen de pagina. Hoe dit te doen staat bij het WCAG-succescriterium [3.1.2 Taal van onderdelen](/wcag/3.1.2).
