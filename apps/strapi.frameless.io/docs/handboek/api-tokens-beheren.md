# API-tokens beheren

Een API-token is nodig voor de volgende applicaties:

- **Overige-Objecten-API**
- **Strapi-admin-extensions**
- **Strapi-prometheus**

Alleen beheerders en Super-admin rollen hebben de rechten om API-tokens te beheren. Wanneer je een API-token genereert, zorg er dan voor dat je het token direct kopieert en op een veilige manier deelt of opslaat.

> **Let op:** Een API-token wordt slechts één keer weergegeven. Als je de pagina vernieuwt of opnieuw opent, is het token niet meer zichtbaar.

## Hoe genereer je een API-token?

Volg de onderstaande stappen om een API-token te genereren:

1. Open het Strapi-dashboard en navigeer naar de **Instellingen**.
2. Selecteer in het menu **API-tokens**.
3. Klik op **Nieuwe token maken**.
4. Vul de benodigde gegevens in, zoals:
   - **Tokennaam**: Geef een duidelijke naam zodat je weet waarvoor het token gebruikt wordt.
   - **Tokenpermissies**: Stel de juiste toegangsrechten in (bijvoorbeeld 'alleen-lezen' of 'volledige toegang').
5. Klik op **Genereren** om het API-token aan te maken.
6. Kopieer het token en bewaar het op een veilige plek.

> **Tip:** Gebruik een wachtwoordmanager of een beveiligde notitie-app om het token veilig op te slaan.

## Meer informatie

Voor meer details en een uitgebreide handleiding over het beheren van API-tokens in Strapi, kun je terecht op de officiële documentatie:  
[Strapi API-tokens Documentatie](https://docs-v4.strapi.io/user-docs/settings/API-tokens)
