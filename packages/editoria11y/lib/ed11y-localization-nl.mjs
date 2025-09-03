const nl = {
    toggleAccessibilityTools: 'Toggle toegankelijkheidstools',
    toggleDisabled: 'Geen inhoud beschikbaar voor Editoria11y om te controleren.',
    panelCount0: 'Geen problemen gedetecteerd.',
    panelCountAllDismissed: 'Alle problemen verborgen.',
    panelCount1: 'Eén probleem gedetecteerd.',
    panelCountMultiple: ' problemen gedetecteerd.',
    panelCountBase: '<span class="count">Geen</span> <span class="content-type">problemen gedetecteerd</span>.',
    panelControls: 'Editoria11y',
    buttonToolsContent: 'Controleer koppen & alt-tekst',
    buttonToolsActive: 'Verberg koppen & alt-tekst',
    buttonOutlineContent: 'Koppen',
    buttonAltsContent: 'Alt-tekst',
    buttonFirstContent: 'Ga naar eerste waarschuwing',
    buttonNextContent: 'Ga naar volgende waarschuwing',
    buttonPrevContent: 'Ga naar vorige waarschuwing',
    buttonShowHiddenAlert: 'Toon verborgen waarschuwing',
    buttonHideHiddenAlert: 'Verberg verborgen waarschuwing',
    buttonShowHiddenAlerts: (count) => `Toon ${count} verborgen waarschuwingen`,
    buttonHideHiddenAlerts: (count) => `Verberg ${count} verborgen waarschuwingen`,
    buttonShowAlerts: 'Toon toegankelijkheidswaarschuwingen',
    buttonShowNoAlert: 'Toon toegankelijkheidscontrole',
    buttonHideChecker: 'Verberg toegankelijkheidscontrole',
    buttonHideAlerts: 'Verberg toegankelijkheidswaarschuwingen',
    panelCheckOutline: '<p class="ed11y-small">Dit toont de <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opent in nieuw tabblad">koppenstructuur</a>. Controleer of deze overeenkomt met hoe de inhoud visueel is georganiseerd.</p>',
    panelCheckAltText: '<p class="ed11y-small">Controleer of elke afbeelding <a href="https://www.w3.org/WAI/tutorials/images/informative/" target="_blank" title="Opent in nieuw tabblad">beschrijft wat het betekent in context</a>, en dat er geen afbeeldingen van tekst zijn.</p>',
    noImagesFound: 'Geen afbeeldingen gevonden.',
    altLabelPrefix: 'Alt-tekst: ',
    errorAltMissing: '(ontbreekt!)',
    errorAltNull: '(geen; afbeelding gemarkeerd als decoratief)',
    errorOutlinePrefixSkippedLevel: '(gemarkeerd voor overgeslagen niveau) ',
    errorOutlinePrefixHeadingEmpty: '(lege kop) ',
    errorOutlinePrefixHeadingIsLong: '(gemarkeerd voor lengte) ',
    consoleNotSupported: 'Deze browser kan Editoria11y niet uitvoeren.',
    jumpedToInvisibleTip: 'Let op: deze inhoud is mogelijk niet zichtbaar. Zoek ernaar in de omlijste container.',
    jumpedToAriaHiddenTip: 'Het item met dit probleem is mogelijk onzichtbaar of buiten het scherm.',
    suspiciousWords: ['afbeelding van', 'beeld van', 'tekening van', 'foto van', 'fotografie van', 'plaatshouder', 'spacer', 'tbd', 'todo', 'copyright', 'met dank aan', 'foto door'],
    meaninglessAlt: ['alt', 'grafiek', 'decoratief', 'afbeelding', 'beeld', 'foto', 'plaatshouder', 'plaatshouder afbeelding', 'spacer', 'tbd', 'todo', 'te doen'],
    badEndingForAlt: ['foto', 'afbeelding', 'fotografie', 'plaatje'],
    linksUrls: ['http:/', 'https:/', '.asp', '.htm', '.php', '.edu/', '.com/', '.nl/'],
    linksMeaningless: /(leer|meer|klik|hier|op|deze|link|nu|pagina|site|website|bekijk|onze|lees|download|formulier|hier|klik|"|'|\?|\.|-|,|:|>|<|\s)+/g,
    linkStringsNewWindows: /venster|\stabblad|download/g,
    toggleManualCheck: 'handmatige controle nodig',
    toggleAlert: 'waarschuwing',
    issue: 'Probleem',
    toggleAriaLabel: (label) => `Toegankelijkheid ${label}`,
    transferFocus: 'Bewerk deze inhoud',
    dismissOkButtonContent: 'Markeer als OK',
    dismissHideButtonContent: 'Markeer als genegeerd',
    dismissActions: (count) => `${count} vergelijkbare problemen`,
    dismissHideAllButton: 'Negeer alle zoals deze',
    dismissOkAllButton: 'Markeer alle zoals deze als OK',
    dismissOkTitle: 'Verbergt deze waarschuwing voor alle editors',
    dismissHideTitle: 'Verbergt deze waarschuwing voor u',
    undismissOKButton: 'Herstel deze als OK gemarkeerde waarschuwing',
    undismissHideButton: 'Herstel deze verborgen waarschuwing',
    undismissNotePermissions: 'Deze waarschuwing is verborgen door een beheerder',
    reportsLink: 'Open site rapporten in nieuw tabblad',
    closeTip: 'Sluiten',
    panelHelpTitle: 'Over deze tool',
    panelHelp: `
    <p><a href="https://editoria11y.princeton.edu/">Editoria11y</a> controleert op algemene toegankelijkheidsbehoeften, zoals alternatieve tekst voor afbeeldingen, betekenisvolle koppenstructuren en goed benoemde links.</p>
    <p>Veel waarschuwingen zijn "handmatige controles." Handmatige controles kunnen worden weggenomen:</p>
    <ul>
        <li>"Markeer als gecontroleerd en OK" verbergt de waarschuwing voor alle editors.</li>
        <li>"Negeer deze handmatige controle" laat de tip zichtbaar voor andere editors.</li>
    </ul>
    <p>Weggenomen waarschuwingen kunnen worden gevonden via de "Toon verborgen waarschuwingen" schakelaar.</p>
    <p>Als een onjuiste waarschuwing op veel pagina's verschijnt, kunnen sitebeheerders de checker vertellen om bepaalde elementen en paginaregio's te negeren.</p>
    <p>En onthoud dat geautomatiseerde checkers <a href='https://webaim.org/resources/evalquickref/'>proeflezen en testen op toegankelijkheid</a> niet kunnen vervangen.</p>
    <p><br><a href='https://github.com/itmaybejj/editoria11y/issues' class='ed11y-small'>Rapporteer bugs & vraag wijzigingen aan <span aria-hidden="true">&raquo;</span></a></p>
    `,
    headingExample: `
        <ul>
            <li>Kop niveau 1
                <ul>
                    <li>Kop niveau 2: een onderwerp
                        <ul><li>Kop niveau 3: een subonderwerp</li></ul></li>
                    <li>Kop niveau 2: een nieuw onderwerp</li>
                </ul>
            </li>
        </ul>`,
    headingLevelSkipped: {
        title: 'Handmatige controle: is een kopniveau overgeslagen?',
        tip: (prevLevel, level) =>
            `<p>Koppen en subkoppen creëren een <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opent in nieuw tabblad">navigeerbare inhoudsopgave</a> voor ondersteunende apparaten. De nummers geven inspringingen aan in een geneste relatie:</p>
            ${Ed11y.M.headingExample}
            <p>Deze kop sprong van niveau ${prevLevel} naar niveau ${level}. Voor een schermlezer klinkt dit alsof er inhoud ontbreekt.</p>
            <p><strong>Om te repareren:</strong> pas niveaus aan om een nauwkeurige structuur te vormen, zonder gaten.</p>
            `,
    },
    headingEmpty: {
        title: 'Koptag zonder tekst',
        tip: () =>
            `<p>Koppen en subkoppen creëren een <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opent in nieuw tabblad">navigeerbare inhoudsopgave</a> voor ondersteunende apparaten. De nummers geven inspringingen aan in een geneste relatie:</p>
            ${Ed11y.M.headingExample}
            <p>Lege koppen creëren verwarrende gaten in deze structuur: ze kunnen betekenen dat de volgende inhoud nog steeds deel uitmaakt van de vorige sectie, of dat de tekst om een of andere reden onuitspreekbaar was.</p>
            <p><strong>Om te repareren:</strong> voeg tekst toe aan deze kop, of verwijder deze lege regel.</p>
            `,
    },
    headingIsLong: {
        title: 'Handmatige controle: lange kop',
        tip: () =>
            `<p>Koppen moeten kort en duidelijk zijn. Ondersteunende apparaten gebruiken ze als een <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opent in nieuw tabblad">navigeerbare inhoudsopgave</a> voor de pagina. De nummers geven inspringingen aan in een geneste relatie:</p>  
            ${Ed11y.M.headingExample}
            <p><strong>Om te repareren:</strong> verkort deze kop indien mogelijk, of verwijder de kopstijl als deze alleen werd toegepast om visuele nadruk te geven aan deze tekst.</p>
            `,
    },
    blockquoteIsShort: {
        title: 'Handmatige controle: is dit een blockquote?',
        tip: () =>
            '<p>Blockquote-opmaak vertelt schermlezers dat de tekst moet worden aangekondigd als een citaat. Dit werd gemarkeerd omdat korte blockquotes <em>soms</em> eigenlijk <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" target="_blank" title="Opent in nieuw tabblad">koppen</a> zijn. Als dit een kop is en geen citaat, gebruik dan kopopmaak in plaats daarvan, zodat dit verschijnt in de paginastructuur.</p>',
    },
    altAttributeExample:
        `<p>Merk op dat een <a href="https://www.w3.org/WAI/tutorials/images/informative" target="_blank" title="Opent in nieuw tabblad">goede alt de boodschap van de afbeelding beschrijft</a>, niet simpelweg wat het bevat. Afhankelijk van de context, kan de alt voor de foto van een kind dat een bal trapt de nadruk leggen op de setting, het kind, de trap of de bal:</p>
            <ul>
                <li>De zonnige lentedag bracht kinderen naar het park voor wat voetbal.</li>
                <li>A.J. draagt het nieuwe teamuniform.</li>
                <li>De winnende trap kwam gebogen van de linkerzijlijn!</li>
                <li>De maat 4 bal is de juiste maat voor dit 9-jarige kind.</li>
            </ul>`,
    altMissing: {
        title: 'Afbeelding heeft geen alternatieve tekst attribuut',
        tip: () =>
            `<p>Wanneer schermlezers een afbeelding tegenkomen zonder alt-attribuut, dicteren ze in plaats daarvan de url van het afbeeldingsbestand, vaak letter voor letter.</p>
            <p><strong>Om te repareren:</strong> voeg een lege alt (alt="") toe om aan te geven dat deze afbeelding moet worden genegeerd door schermlezers, of voeg beschrijvende alt-tekst toe.</p>
            ${Ed11y.M.altAttributeExample}`,
    },
    altNull: {
        title: 'Handmatige controle: afbeelding heeft geen alt-tekst',
        tip: () =>
            `<p>Tenzij deze afbeelding puur decoratief is (een spacer-icoon of achtergrondtextuur), moet er waarschijnlijk een alt worden verstrekt. Foto's in pagina-inhoud hebben <strong>bijna altijd alt-tekst nodig.</strong> Omdat veel schermlezergebruikers kunnen zien dat er een afbeelding aanwezig is, kan het erg verwarrend zijn om de cursor over de plaats op de pagina te bewegen waar een afbeelding zichtbaar is, maar niets te horen.</p>
        ${Ed11y.M.altAttributeExample}`,
    },
    altURL: {
        title: 'Tekstalternatief van afbeelding is een URL',
        tip: (alt) =>
            `Deze afbeelding's alt-tekst is "${alt}," wat waarschijnlijk de bestandsnaam beschrijft, niet de inhoud van de afbeelding.
        <p><strong>Om te repareren:</strong> stel de alternatieve tekst van deze afbeelding in op een beknopte beschrijving van wat deze afbeelding betekent in deze context.</p>
        ${Ed11y.M.altAttributeExample}`
        ,
    },
    altMeaningless: {
        title: 'Alt-tekst is betekenisloos',
        tip: (alt) =>
            `<p>Deze afbeelding's alt-tekst is "${alt}," wat werd gemarkeerd als veelvoorkomende plaatshouder tekst.</p>
        <p><strong>Om te repareren:</strong> stel de alternatieve tekst van deze afbeelding in op een beknopte beschrijving van wat deze afbeelding betekent in deze context.</p>
        ${Ed11y.M.altAttributeExample}`
        ,
    },
    altMeaninglessLinked: {
        title: 'Gelinkte alt-tekst is betekenisloos',
        tip: (alt) =>
            `<p>Wanneer een link een afbeelding bevat, <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" target="_blank" title="opent in nieuw tabblad">wordt de alt-tekst van de afbeelding de linktekst</a> die wordt aangekondigd door schermlezers.
            Links moeten hun bestemming duidelijk en beknopt beschrijven, zelfs buiten context.</p>
           <p>Deze afbeelding's alt-tekst is "${alt}," wat waarschijnlijk deze link niet beschrijft.</p>`
        ,
    },
    altURLLinked: {
        title: 'Tekstalternatief van gelinkte afbeelding is een URL',
        tip: (alt) =>
            `<p>Deze afbeelding's alt-tekst is "${alt}," wat waarschijnlijk een bestandsnaam is.</p>
        <p>Wanneer een link om een afbeelding is gewikkeld en er geen andere tekst is, wordt <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" target="_blank" title="Opent in nieuw tabblad">de alt-tekst van de afbeelding de linktekst</a> die wordt aangekondigd door schermlezers.
            Links moeten hun bestemming duidelijk en beknopt beschrijven; een URL (meestal uitgesproken door de schermlezer letter voor letter) doet dat niet.</p>
            <ul>
                <li>Goede linktekst: "Over ons"</li>
                <li>Slechte linktekst: "H T T P S dubbele punt schuine streep schuine streep voorbeeld punt com schuine streep oh vee ee arr oh en ess</li>
            </ul>`,
    },
    altImageOf: {
        title: 'Handmatige controle: mogelijk overtollige tekst in alt',
        tip: (alt) =>
            `<p>Deze afbeelding's alt-tekst is "${alt}," wat vermeldt dat deze afbeelding een afbeelding is.</p>
        <p>Schermlezers kondigen aan dat ze een afbeelding beschrijven bij het lezen van alt-tekst, dus 
            zinnen zoals "afbeelding van" en "foto van" zijn meestal overbodig in alt-tekst; de schermlezergebruiker hoort "afbeelding: afbeelding van iets."</p>
            <p>Merk op dat dit OK is als het formaat verwijst naar de <strong>inhoud</strong> van de afbeelding:</p>
            <ul><li>Formaat is overbodig: "<em>foto van</em> een VHS-tape"</li>
            <li>Formaat is relevant: "<em>foto van</em> een VHS-tape in een fotoalbum dat wordt besproken in een geschiedenisles"</li></ul>`
    },
    altImageOfLinked: {
        title: 'Handmatige controle: mogelijk overtollige tekst in gelinkte afbeelding',
        tip: (alt) =>
            `<p>Deze afbeelding's alt-tekst is "${alt}," wat vermeldt dat deze afbeelding een afbeelding is.</p>
        <hr><p>Links moeten hun bestemming duidelijk en beknopt beschrijven. Omdat woorden zoals "afbeelding," "grafiek" of "foto" al overbodig zijn in tekstalternatieven (schermlezers identificeren de afbeelding al als een afbeelding), betekent hun aanwezigheid in een gelinkte afbeelding meestal dat het tekstalternatief van de afbeelding <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" title="Opent in nieuw tabblad" target="_blank">de afbeelding beschrijft in plaats van de link</a>.</p>
            <ul>
                <li>Goede linktekst: "Over ons"</li>
                <li>Slechte linktekst: "Afbeelding van vijf mensen die springen"</li>
            </ul>`
    },
    altDeadspace: {
        title: 'Tekstalternatief van afbeelding is onuitspreekbaar',
        tip: (alt) =>
            `<p>Deze afbeelding's alt-tekst is "${alt}," wat alleen onuitspreekbare symbolen en/of spaties bevat. Schermlezers zullen aankondigen dat er een afbeelding aanwezig is, en dan ongemakkelijk pauzeren: "afbeelding: ____."</p>
        <p><strong>Om te repareren:</strong> voeg een beschrijvende alt toe, of geef een <em>volledig</em> lege alt (alt="") als dit slechts een icoon of spacer is, en schermlezers het moeten negeren.</p>
            ${Ed11y.M.altAttributeExample}`,
    },
    altEmptyLinked: {
        title: 'Gelinkte afbeelding heeft geen alt-tekst',
        tip: () =>
            `<p>Wanneer een link om een afbeelding is gewikkeld, <a href="https://webaim.org/techniques/hypertext/link_text#alt_link" title="Opent in nieuw tabblad" target="_blank">geeft de alt-tekst van de afbeelding de titel van de link voor schermlezers</a>.</p>
        <p><strong>Om te repareren:</strong> stel de alternatieve tekst van deze afbeelding in op iets dat de bestemming van de link beschrijft, of voeg tekst toe naast de afbeelding, binnen de link.</p>`,
    },
    altLong: {
        title: 'Handmatige controle: zeer lange alternatieve tekst',
        tip: (alt) =>
            `<p>Alternatieve tekst voor afbeeldingen wordt door schermlezers aangekondigd als één doorlopende zin; luisteraars moeten de hele alt een tweede keer beluisteren als ze iets missen. Als dit niet kan worden herformuleerd tot iets beknopt, is het beter om de alt te gebruiken om te verwijzen naar een <em>zichtbaar</em> <a href="https://www.w3.org/WAI/tutorials/images/complex/" title="Opent in nieuw tabblad" target="_blank">tekstalternatief voor complexe afbeeldingen</a>. Bijvoorbeeld:</p>
            <ul><li>"Evenementposter; details volgen in bijschrift"</li>
            <li>"Grafiek die onze problemen naar nul laat gaan; details volgen in tabel"</li></ul>
            Deze afbeelding's alt-tekst is: <em>${alt}</em>
            `,
    },
    altLongLinked: {
        title: 'Handmatige controle: zeer lange alternatieve tekst in gelinkte afbeelding',
        tip: (alt) =>
            `<p><a href="https://webaim.org/techniques/hypertext/link_text#alt_link" title="Opent in nieuw tabblad" target="_blank">De alt-tekst op een gelinkte afbeelding wordt gebruikt om de linkbestemming te beschrijven</a>. Links moeten kort, duidelijk en beknopt zijn, omdat schermlezergebruikers vaak naar de lijst van links op de pagina luisteren om inhoud van belang te vinden. Lange alternatieve tekst binnen een link geeft vaak aan dat het tekstalternatief van de afbeelding de afbeelding beschrijft in plaats van de link.</p>
        Deze afbeelding's alt-tekst is: <em>${alt}</em>`,
    },
    altPartOfLinkWithText: {
        title: 'Handmatige controle: link bevat zowel tekst als een afbeelding',
        tip: (alt) =>
            `<p>Schermlezers zullen <a href="https://www.w3.org/WAI/tutorials/images/functional/" title="Opent in nieuw tabblad" target="_blank">de alt-tekst van de afbeelding opnemen bij het beschrijven van deze link</a>.</p>
            <p>Controleer of de gecombineerde tekst beknopt en betekenisvol is:<br>"<em><strong>${alt}</strong></em>"</p>
            <p></p>
            <ul>
                <li>Behoud alts die relevante betekenis toevoegen:<br>"Koop (Een Tigers v. Falcons ticket)."</li>
                <li>Bewerk nutteloze of irrelevante alts:<br>"Koop (Een stuk papier met teamlogo's erop)."</li>
                <li>Verwijder onnodige alts:<br>"Koop Tigers v. Falcons tickets (Een Tigers v. Falcons ticket)."</li>
            </ul>
        `,
    },
    linkNoTextExample: '<p>Schermlezers zullen ofwel niets zeggen wanneer ze deze link bereiken: <br><em>"Link, [...ongemakkelijke pauze waar de linktitel zou moeten zijn...],"</em><br>of de URL lezen: <br><em>"Link, H-T-T-P-S schuine streep schuine streep voorbeeld punt com"</em></p>',
    linkTextIgnored: (ignoredText) => `
    <p>Schermlezers zullen alleen de tekst van de linktypeindicator op deze link lezen:<br>
    <em>"<strong>${ignoredText}</strong>"</em></p>
    `,
    linkNoText: {
        title: 'Link zonder toegankelijke tekst',
        tip: (ignoredText) =>
            `<p>Deze link is ofwel een typfout (een gelinkt spatieteken), of een gelinkte afbeelding zonder tekstalternatief.</p>
        ${ignoredText ? Ed11y.M.linkTextIgnored(ignoredText) : Ed11y.M.linkNoTextExample}
        <p><strong>Om te repareren:</strong></p>
        <ul><li>Als dit een typfout is, verwijder het. Merk op dat typfouten in links moeilijk te zien kunnen zijn als ze naast een "echte" link staan: één zal op de tekst zijn, één op een spatie.</li><li>Als het een echte link is, voeg tekst toe om te beschrijven waar het naartoe gaat.</li>`,
    },
    linkTextIsURL: {
        title: 'Handmatige controle: is deze linktekst een URL?',
        tip: (text) =>
            `<p>Deze link's tekst is:<br> <strong>${text}</strong></p>
        <p><a href="https://webaim.org/techniques/hypertext/link_text" title="Opent in nieuw tabblad" target="_blank">Links moeten betekenisvol en beknopt zijn</a>. Lezers scannen vaak op linktitels. Dit geldt vooral voor schermlezergebruikers, die navigeren met een lijst van links op de pagina.</p>
         <p>Een gelinkte URL doorbreekt dit patroon; de lezer moet de voorgaande paragraaf lezen om het doel van de link uit de context te achterhalen.</p>
            <ul>
                <li>Betekenisvolle en beknopte link: "Tips voor het schrijven van betekenisvolle links"</li>
                <li>Gelinkte URL, zoals uitgesproken door een schermlezer: "H T T P S dubbele punt schuine streep schuine streep voorbeeld punt com schuine streep tips schuine streep betekenisvolle-links"</li>
            </ul>`,
    },
    linkTextIsGeneric: {
        title: 'Handmatige controle: is deze link betekenisvol en beknopt?',
        tip: (text) =>
            `<p>Deze link's tekst is: <strong>${text}</strong></p>
        <p>Lezers scannen op links. Dit geldt vooral voor schermlezergebruikers, die navigeren met een lijst van links op de pagina.</p>
                <p>Generieke links zoals "klik hier," "lees meer" of "download" verwachten dat de lezer langzaam en zorgvuldig genoeg leest om het doel van elke link uit de context te achterhalen. Weinig lezers doen dit, dus doorklikpercentages op betekenisloze links zijn extreem slecht.</p>
                <ul>
                <li>Ideaal: "Leer over <a href="https://webaim.org/techniques/hypertext/link_text" title="Opent in nieuw tabblad" target="_blank">betekenisvolle links"</a></strong></li>
                <li>Niet betekenisvol: "Klik <a href="https://webaim.org/techniques/hypertext/link_text" title="Opent in nieuw tabblad" target="_blank">hier</a> om te leren over betekenisvolle links."</li>
                <li>Niet beknopt: "<a href="https://webaim.org/techniques/hypertext/link_text" title="Opent in nieuw tabblad" target="_blank">Klik hier om meer te leren over betekenisvolle links</a>"</li>
                </ul>
                `
        ,
    },
    linkDocument: {
        title: 'Handmatige controle: is het gelinkte document toegankelijk?',
        tip: () =>
            `<p>Veel mobiele en ondersteunende apparaatgebruikers hebben moeite met het lezen van inhoud in PDF's. PDF's staan over het algemeen geen verandering van lettergrootte toe, en bevatten vaak functies die incompatibel zijn met schermlezers.</p>
        <p>Maak idealiter de inhoud van deze gelinkte PDF beschikbaar op een webpagina of in een bewerkbaar document, en link alleen naar deze PDF als een "afdrukbaar" alternatief. Als deze PDF de enige manier is waarop u toegang tot deze inhoud biedt, moet u <a href='https://webaim.org/techniques/acrobat/' target='_blank' title="Opent in nieuw tabblad">handmatig controleren dat de PDF goed gestructureerd is</a>, met koppen, lijsten en tabelkoppen, en alt-tekst biedt voor zijn afbeeldingen.</p>`,
    },
    linkNewWindow: {
        title: 'Handmatige controle: wordt het openen van een nieuw venster verwacht?',
        tip: () =>
            `<p>Lezers kunnen er altijd voor kiezen om een link in een nieuw venster te openen. Wanneer een link een nieuw venster forceert te openen, kan dit verwarrend en irritant zijn, vooral voor gebruikers van ondersteunende apparaten die zich kunnen afvragen waarom de "terug" knop van hun browser plotseling is uitgeschakeld.</p>
                <p>Er zijn twee algemene uitzonderingen:</p>
                <ul>
                    <li>Wanneer de gebruiker een formulier invult, en het openen van een link in hetzelfde venster zou ervoor zorgen dat ze hun werk verliezen.</li>
                    <li>Wanneer de gebruiker duidelijk wordt gewaarschuwd dat een link een nieuw venster zal openen.</li>
                </ul>
                <p><strong>Om te repareren:</strong> stel deze link terug naar zijn standaard doel, of voeg een schermlezer-toegankelijke waarschuwing toe (tekst of een icoon met alt-tekst).</p>
                `
        ,
    },
    tableNoHeaderCells: {
        title: 'Tabel heeft geen kopcelcellen',
        tip: () => `
                <p>Om te repareren:</p>
                <ul><li>Als deze tabel gegevens bevat die betekenisvol zijn georganiseerd per rij en kolom, bewerk dan de eigenschappen van de tabel en specificeer of koppen zijn geplaatst in de eerste rij, kolom of beide. Dit laat schermlezergebruikers de koppen horen herhalen tijdens het navigeren door de inhoud.</li>
                <li>Als deze tabel geen rijen en kolommen met gegevens bevat, maar in plaats daarvan wordt gebruikt voor visuele lay-out, verwijder het dan. Tabellen lopen over de pagina heen in plaats van opnieuw te vloeien op mobiele apparaten, en moeten alleen worden gebruikt wanneer de horizontale relaties nodig zijn om de inhoud te begrijpen.</li></ul>
            `,
    },
    tableContainsContentHeading: {
        title: 'Inhoudskop binnen een tabel',
        tip: () =>
            `<p>Om te repareren: verwijder kopopmaak. Gebruik rij- en kolomkoppen in plaats daarvan.</p>
        <p>Inhoudskoppen ("Kop 1", "Kop 2") vormen een navigeerbare inhoudsopgave voor schermlezergebruikers,  
        die alle inhoud labelen <strong>tot de volgende kop</strong>. Tabelkoppen labelen specifieke kolommen of rijen binnen een tabel.</p> 
            <p></p>
            <table><tr><th>1</th><th>2</th><th>3</th><td rowspan="2">Ter illustratie: een <strong>tabel</strong>kop in cel 2 zou alleen zijn kolom labelen: cel B. <br><br>
            Een <strong>inhouds</strong>kop in cel 2 zou alle volgende tekst labelen, lezend van links naar rechts: cellen 3, A, B en C, evenals deze tekst!</td></tr>
            <tr><td>A</td><td>B</td><td>C</td></table>
            `
    },
    tableEmptyHeaderCell: {
        title: 'Lege tabelkopcel',
        tip: () => `
                <p>Bij het verkennen van tabellen herhalen schermlezers tabelkopcelcellen indien nodig om gebruikers te oriënteren. 
                Zonder koppen is het heel gemakkelijk om verdwaald te raken; schermlezergebruikers moeten kolommen en rijen tellen en proberen te onthouden welke kolommen bij welke rijen hoorden.</p>
                <p><strong>Om te repareren:</strong> zorg ervoor dat elke kopcel in deze tabel tekst bevat.</p>
            `,
    },
    textPossibleList: {
        title: 'Handmatige controle: moet dit lijstopmaak hebben?',
        tip: (text) =>
            `<p>Lijstopmaak is structureel:</p> 
            <ol><li>Lijstopmaak springt in en vloeit opnieuw bij overflow. Tekst lijnt verticaal uit met de regel erboven.</li>
            <li>Lijsten zijn machine-leesbaar. Schermlezers kunnen hun gebruikers oriënteren, dit aankondigen als "lijstitem, 2 van 3."</li></ol>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;3. Maar dit derde item is gewoon een zin met een nummer ervoor. Het wikkelt incorrect, en schermlezers weten niet dat het gerelateerd is aan de andere items in de lijst.</p>
            <p><strong>Om te repareren:</strong> als dit "${text}" deel uitmaakt van een lijst, vervang het dan door lijstopmaak.</p>
            `,
    },
    textPossibleHeading: {
        title: 'Handmatige controle: moet dit een kop zijn?',
        tip: () =>
            `<p>Als deze volledig vetgedrukte tekstregel functioneert als een kop voor de volgende tekst in plaats van een visuele nadruk, vervang dan de vetgedrukte opmaak door de juist genummerde kop. Anders, negeer deze waarschuwing.</p>
        <p>Koppen en subkoppen creëren een <a href="https://www.w3.org/WAI/tutorials/page-structure/headings/" title="Opent in nieuw tabblad" target="_blank">navigeerbare inhoudsopgave</a> voor ondersteunende apparaten. Het <strong><em>nummer</em></strong> van de kop geeft zijn <strong><em>diepte</em></strong> aan in de paginastructuur; bijv.:</p>
            ${Ed11y.M.headingExample}
            
            `,
    },
    textUppercase: {
        title: 'Handmatige controle: is deze hoofdlettertekst nodig?',
        tip: () =>
            `<p>HOOFDLETTERTEKST KAN MOEILIJKER TE LEZEN ZIJN VOOR VEEL MENSEN, EN WORDT VAAK GEÏNTERPRETEERD ALS SCHREEUWEN.</p>
         <p>Overweeg in plaats daarvan zinsopbouw te gebruiken, en vetgedrukte tekst of lettertype wijzigingen voor visuele nadruk, of structurele opmaak zoals koppen voor nadruk die ook zal worden aangekondigd door schermlezers.</p>`,
    },
    embedVideo: {
        title: 'Handmatige controle: is deze video accuraat ondertiteld?',
        tip: () =>
            `<p>Als een opgenomen video spraak of betekenisvolle geluiden bevat, moet het <a href="https://www.w3.org/WAI/media/av/captions/" title="Opent in nieuw venster" target="_blank">ondertiteling bieden</a>.</p>
            <p>Merk op dat automatische, machine-gegenereerde ondertiteling moet worden nagelezen, en sprekeridentificaties moeten worden toegevoegd, voordat het wordt beschouwd als een gelijkwaardig alternatief.</p>`,
    },
    embedAudio: {
        title: 'Handmatige controle: is een nauwkeurig transcript verstrekt?',
        tip: () =>
            `<p>Als deze audio spraak bevat, moet een <a href="https://www.w3.org/WAI/media/av/transcribing/" target="_blank" title="Opent in nieuw venster">tekstalternatief</a> worden verstrekt op deze pagina of gelinkt.</p>
            <p>Merk op dat automatische, machine-gegenereerde transcripten moeten worden nagelezen, en sprekeridentificaties moeten worden toegevoegd, voordat ze worden beschouwd als een gelijkwaardig alternatief</p>`,
    },
    embedVisualization: {
        title: 'Handmatige controle: is deze visualisatie toegankelijk?',
        tip: () =>
            `<p>Visualisatiewidgets zijn vaak moeilijk of onmogelijk voor ondersteunende apparaten om te bedienen, en kunnen moeilijk te begrijpen zijn voor lezers met slechtziendheid of kleurenblindheid.</p>
            <p>Tenzij deze specifieke widget hoog visueel contrast heeft, kan worden bediend door een toetsenbord en beschreven door een schermlezer, neem aan dat een alternatief formaat (tekstbeschrijving, gegevenstabel of downloadbare spreadsheet) ook moet worden verstrekt.</p>`,
    },
    embedTwitter: {
        title: 'Handmatige controle: is deze embed een toetsenbordval?',
        tip: () =>
            `<p>Als ingesloten feeds zijn ingesteld om een hoog aantal items te tonen, moeten toetsenbordgebruikers mogelijk tientallen of honderden keren op de tab-toets drukken om het component te verlaten.</p>
            <p>Controleer om er zeker van te zijn dat slechts een klein aantal items automatisch laden onmiddellijk of tijdens het scrollen. Het hebben van extra items die laden op verzoek ("toon meer") is prima.</p>`,
    },
    embedCustom: {
        title: 'Handmatige controle: is deze ingesloten inhoud toegankelijk?',
        tip: () =>
            '<p>Zorg ervoor dat afbeeldingen binnen deze embed alt-tekst hebben, video\'s ondertiteling hebben, en interactieve componenten kunnen worden <a href=\'https://webaim.org/techniques/keyboard/\'>bediend door een toetsenbord</a>.</p>',
    }
}
export default nl;
