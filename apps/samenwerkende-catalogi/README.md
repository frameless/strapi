# Samenwerkende Catalogi XML API voor Strapi CMS

[Samenwerkende Catalogi](https://logius.nl/diensten/samenwerkende-catalogi) is standaard om met XML informatie over diensten en producten van de overheid te delen.

Bijvoorbeeld: een gemeente kan publiceren dat het een paspoort verkoopt, met een link naar een pagina met informatie en een link naar een aanvraagformulier dat je met [DigiD](http://digid.nl) kunt invullen.

## Voorbeeld XML

```xml
<?xml version="1.0" encoding="utf-8"?>
<overheidproduct:scproducten
  xmlns:overheidproduct="http://standaarden.overheid.nl/product/terms/"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:overheid="http://standaarden.overheid.nl/owms/terms/"
  xmlns:dcterms="http://purl.org/dc/terms/"
  xsi:schemaLocation="http://standaarden.overheid.nl/product/terms/ http://standaarden.overheid.nl/sc/4.0/xsd/sc.xsd"
  ><overheidproduct:scproduct owms-version="4.0"
    ><overheidproduct:meta
      ><overheidproduct:owmskern
        ><dcterms:identifier>http://owc-pdc.test/onderwerp/test-pdc-item</dcterms:identifier
        ><dcterms:title>Test PDC item</dcterms:title><dcterms:language>nl</dcterms:language
        ><dcterms:type scheme="overheid:Informatietype">productbeschrijving</dcterms:type
        ><dcterms:modified>2018-04-16</dcterms:modified
        ><dcterms:spatial
          scheme="overheid:Gemeente"
          resourceIdentifier="http://standaarden.overheid.nl/owms/terms/Buren_(gemeente)"
          >Buren</dcterms:spatial
        ><overheid:authority
          scheme="overheid:Gemeente"
          resourceIdentifier="http://standaarden.overheid.nl/owms/terms/Buren_(gemeente)"
          >Buren</overheid:authority
        ></overheidproduct:owmskern
      ><overheidproduct:owmsmantel
        ><dcterms:audience scheme="overheid:Doelgroep">particulier</dcterms:audience
        ><dcterms:audience scheme="overheid:Doelgroep">ondernemer</dcterms:audience
        ><dcterms:abstract>test content</dcterms:abstract></overheidproduct:owmsmantel
      ><overheidproduct:scmeta
        ><overheidproduct:productID>5</overheidproduct:productID
        ><overheidproduct:onlineAanvragen>digid</overheidproduct:onlineAanvragen></overheidproduct:scmeta
      ></overheidproduct:meta
    ><overheidproduct:body /></overheidproduct:scproduct
></overheidproduct:scproducten>
```

## Testen

De gegenereerde XML kan getest worden door een XML Schema validator te gebruiken. Bij Logius is een on-line validator met nog extra checks beschikbaar: [SCValidator](https://logius.nl/diensten/samenwerkende-catalogi/scvalidator).

## Gerelateerde sites

- [Samenwerkende Catalogi op standaarden.overheid.nl](https://standaarden.overheid.nl/sc)
- [Samenwerkende Catalogi bij Logius](https://logius.nl/diensten/samenwerkende-catalogi)
