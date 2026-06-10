# NL Government Fields

## Wat doet deze plugin?

De NL Government Fields plugin zorgt voor gestandaardiseerde velden in het **Samenwerkende Catalogi** component. Deze velden zijn gebaseerd op de standaard van [Logius samenwerkende-catalogi](https://www.logius.nl/domeinen/interactie/samenwerkende-catalogi/documentatie/informatie-publicatie-model) voor Nederlandse overheidsproductinformatie.

---

## Waar komt de data vandaan?

De dropdownopties in het Samenwerkende Catalogi component zijn **niet handmatig ingevoerd**, maar komen rechtstreeks uit de officiële overheidsstandaarden van [OWMS (Overheid.nl Web Metadata Standaard)](https://standaarden.overheid.nl/owms/4.0/doc/waardelijsten/overheid.gemeente) en de [UPL (Uniforme Productnamenlijst)](https://standaarden.overheid.nl/upl). OWMS beheert gestandaardiseerde waardelijsten die door Nederlandse overheden worden gebruikt.

Deze data wordt via twee npm-packages beschikbaar gemaakt in de plugin:

| Package                    | Inhoud                                                                  | Link                                                                |
| -------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `@frameless/catalogi-data` | Gemeentenamen en organisatietypes voor Samenwerkende Catalogi dropdowns | [npmjs.com](https://www.npmjs.com/package/@frameless/catalogi-data) |
| `@frameless/upl`           | UPN URI's (Uniforme Productnamen) voor de UPN URI dropdown              | [npmjs.com](https://www.npmjs.com/package/@frameless/upl)           |

### Data bijwerken

Wanneer OWMS een nieuwe versie van een waardelijst uitbrengt (bijv. een nieuwe gemeentenaam na een gemeentelijke herindeling), moet de plugin ook bijgewerkt worden. Dit gaat als volgt:

1. **Download de nieuwe XML** van de OWMS waardelijst via [standaarden.overheid.nl](https://standaarden.overheid.nl/owms/4.0/doc/waardelijsten/overheid.gemeente)
2. **Verwerk de update** in het betreffende npm-package (`@frameless/catalogi-data` of `@frameless/upl`)
3. **Breng een nieuwe release uit** van het package
4. **Update de plugin** zodat de nieuwe packageversie gebruikt wordt — pas daarna zijn de nieuwe waarden beschikbaar in Strapi

> ⚠️ Staat een gemeente niet in de lijst of ontbreekt een optie? Dan is de OWMS-lijst mogelijk nog niet bijgewerkt, of is de plugin nog niet geüpdatet naar de nieuwste packageversie. Neem contact op met een technisch beheerder.

---

## Hoe gebruik je de velden?

### 1. Open een product

Content Manager -> **Producten** -> open of maak een product aan.

### 2. Scroll naar Samenwerkende Catalogi

Onderaan de pagina vind je het **Samenwerkende Catalogi** component. Hier staan de velden gegroepeerd per onderdeel, zoals _Auteur_ en _Publicerende organisatie_.

![Bekijk voorbeeld](/img/strapi-plugins/strapi-dashboard-samenwerkende-catalogi.png)

### 3. Vul de organisatievelden in

Elk onderdeel heeft twee velden:

- **Organisatie** — selecteer een gemeente uit de dropdown (data uit `@frameless/catalogi-data`)
- **Type organisatie** — selecteer het bijbehorende type, bijvoorbeeld _Gemeente_ of _Waterschap_

### 4. Vul de UPN URI in

In het **Kennisartikel Metadata** component vind je het veld **UPN URI**. Hier selecteer je de Uniforme Productnaam die bij dit product hoort.

![Bekijk voorbeeld](/img/strapi-plugins/strapi-dashboard-UPN-URL.png)

- De opties in deze dropdown komen uit het npm-package `@frameless/upl`, dat de officiële UPN-waardelijst van OWMS bevat
- Typ een (deel van de) productnaam om te zoeken in de lijst

---

## Aandachtspunten

- De mogelijke waarden voor _Type organisatie_ zijn: Gemeente, Waterschap, Provincie, GGD, Koninkrijksdeel — let op de hoofdletter
- Staat een gemeente niet in de lijst of ontbreekt een optie bij _Type organisatie_? Dan moet het `@frameless/catalogi-data` package bijgewerkt worden — neem contact op met een technisch beheerder
- Staat een productnaam niet in de _UPN URI_ dropdown? Dan moet het `@frameless/upl` package bijgewerkt worden — neem contact op met een technisch beheerder
