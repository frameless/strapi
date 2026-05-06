# Environment Banner

## Wat doet deze plugin?

De Environment Banner toont bovenin het Strapi dashboard een gekleurde banner die aangeeft in welke omgeving je werkt. Zo weet je altijd direct waar je bent en voorkom je dat je per ongeluk content aanpast in de verkeerde omgeving.

---

## Omgevingen

Er zijn twee omgevingen:

- **Development** — de ontwikkelings-omgeving, bedoeld voor het testen van nieuwe functionaliteit
- **Acceptatie** — de acceptatie-omgeving, bedoeld om content en wijzigingen te controleren voordat ze live gaan

## Hoe werkt het?

Zodra je inlogt in Strapi en hovert naar de content manager zie je rechtbovenin de interface onder de **+ Nieuwe** bij alle collecties een gele banner met de naam van de huidige omgeving. Je hoeft hier verder niets voor te doen — de banner verschijnt automatisch.

![Bekijk voorbeeld](/img/strapi-plugins/strapi-dashboard-env-label.png)

## Waarom is dit belangrijk?

Het kan voorkomen dat je meerdere omgevingen naast elkaar gebruikt, bijvoorbeeld development en productie in twee browsertabbladen. De Environment Banner maakt in één oogopslag duidelijk in welk tabblad je zit, zodat je niet per ongeluk:

- content publiceert in productie terwijl je in test wilt werken
- wijzigingen opslaat in de verkeerde omgeving
