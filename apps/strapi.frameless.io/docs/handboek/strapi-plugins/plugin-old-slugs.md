# Old Slugs

## Wat doet deze plugin?

De Old Slugs plugin zorgt ervoor dat bezoekers automatisch worden doorgestuurd naar de juiste pagina wanneer een URL is gewijzigd. De oude URL wordt automatisch opgeslagen en blijft werken als redirect ook voor bezoekers die nog een bladwijzer of oude link gebruiken. Zo gaan er geen bezoekers verloren bij het hernoemen van pagina's.

---

## Wat is een slug?

Een slug is het deel van een URL dat een pagina identificeert. Bijvoorbeeld:

```text
https://www.digitalloket.nl/producten/verhuizen-3
                                     ^^^^^^^^^^^^
                                     dit is de slug
```

---

## Wat zijn Old Slugs?

Wanneer je een slug aanpast, wordt de oude slug opgeslagen in het veld **oldSlugs**. Dit zorgt ervoor dat bezoekers die nog een oude URL gebruiken automatisch worden doorgestuurd naar de nieuwe pagina.

### Voorbeeld

- Oude slug: `/producten/verhuizen-2`
- Nieuwe slug: `/producten/verhuizen-3`

Bezoekers die nog `/producten/verhuizen-2` gebruiken — bijvoorbeeld via een opgeslagen bladwijzer of een oude link op een andere website — worden automatisch doorgestuurd naar `/producten/verhuizen-3`.

Dit doorsturen gebeurt via een 308 Permanent Redirect. Dat betekent dat de browser de bezoeker automatisch naar de nieuwe URL stuurt, zonder dat de bezoeker dat merkt. De 308 geeft ook aan dat de redirect permanent is — zoekmachines zoals Google weten hierdoor dat ze de nieuwe URL moeten indexeren in plaats van de oude.

### Waar zie je de old slugs?

De oude slugs zijn zichtbaar in het veld **oldSlugs** onderaan het contentitem. Dit veld wordt automatisch bijgehouden door Strapi.

![Bekijk voorbeeld](/img/strapi-plugins/strapi-dashboard-old-slugs.png)

---

## Aandachtspunten

- Klik altijd op de **ronde pijl** na het aanpassen van een titel om de slug bij te werken
- Vergeet niet op **Bewaar** te klikken na het genereren van een nieuwe slug
- Oude slugs blijven werken als redirect — je hoeft ze niet handmatig bij te houden
- Heb je een slug gebruikt in een interne link ergens anders in Strapi? Pas die link dan ook handmatig aan
