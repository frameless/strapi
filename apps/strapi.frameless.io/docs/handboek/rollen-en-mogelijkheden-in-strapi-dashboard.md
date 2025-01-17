# Strapi Dashboard Rollen Documentatie

## Overzicht van Rollen

| **Rol**                  | **Beschrijving**                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| **Kennisbank Lezer**     | Alleen-lezen rechten op de Kennisbank.                                                           |
| **Kennisbank Schrijver** | Schrijfrechten voor de Kennisbank.                                                               |
| **PDC Lezer**            | Alleen-lezen rechten op de PDC.                                                                  |
| **PDC Schrijver**        | Schrijfrechten voor de PDC.                                                                      |
| **Beheerder**            | Algemene beheerdersrechten, inclusief uitgebreide API-toegang, gebruikersbeheer en configuratie. |
| **Super Admin**          | Deze rol heeft volledige toegang en kan alles beheren.                                           |

---

## Kennisbank Lezer

### Beschrijving van de Kennisbank Lezer

De rol **Kennisbank Lezer** heeft alleen-lezen rechten binnen de Kennisbank, inclusief toegang tot interne velden, kosteninformatie en VAC-inhoud.

### Toegangsrechten Kennisbank Lezer

| **Actie** | **Onderwerp**    | **Beschrijving**                           |
| --------- | ---------------- | ------------------------------------------ |
| `read`    | `Interne velden` | Alleen-lezen toegang tot interne velden.   |
| `read`    | `Kosten`         | Alleen-lezen toegang tot kosteninformatie. |
| `read`    | `VAC`            | Alleen-lezen toegang tot VAC-inhoud.       |

---

## Kennisbank Schrijver

### Beschrijving van de Kennisbank Schrijver

De rol **Kennisbank Schrijver** heeft volledige schrijfrechten binnen de Kennisbank, inclusief het beheren van VAC-inhoud, kosten en interne velden.

### Toegangsrechten Kennisbank Schrijver

| **Actie** | **Onderwerp**  | **Beschrijving**                           |
| --------- | -------------- | ------------------------------------------ |
| `create`  | `Interne veld` | Nieuwe interne velden maken.               |
| `delete`  | `Interne veld` | Interne velden verwijderen.                |
| `publish` | `Interne veld` | Interne velden publiceren.                 |
| `read`    | `Interne veld` | Alleen-lezen toegang tot interne velden.   |
| `update`  | `Interne veld` | Interne velden bijwerken.                  |
| `create`  | `Kosten`       | Kosteninformatie toevoegen.                |
| `delete`  | `Kosten`       | Kosteninformatie verwijderen.              |
| `publish` | `Kosten`       | Kosteninformatie publiceren.               |
| `read`    | `Kosten`       | Alleen-lezen toegang tot kosteninformatie. |
| `update`  | `Kosten`       | Kosteninformatie bijwerken.                |
| `create`  | `VAC`          | Nieuwe VAC-inhoud maken.                   |
| `delete`  | `VAC`          | VAC-inhoud verwijderen.                    |
| `publish` | `VAC`          | VAC-inhoud publiceren.                     |
| `read`    | `VAC`          | Alleen-lezen toegang tot VAC-inhoud.       |
| `update`  | `VAC`          | VAC-inhoud bijwerken.                      |

---

## PDC Lezer

### Beschrijving van de PDC Lezer

De rol **PDC Lezer** heeft alleen-lezen rechten op de PDC (Producten en Diensten Catalogus). Deze rol kan alleen gegevens bekijken, zonder de mogelijkheid om wijzigingen aan te brengen.

### Toegangsrechten PDC Lezer

| **Actie** | **Onderwerp**        | **Beschrijving**                                 |
| --------- | -------------------- | ------------------------------------------------ |
| `read`    | `internal-field`     | Toegang tot interne velden (alleen-lezen).       |
| `read`    | `pdc-home-page`      | Alleen-lezen toegang tot de startpagina van PDC. |
| `read`    | `pdc-category`       | Alleen-lezen toegang tot categorieën.            |
| `read`    | `pdc-faq`            | Alleen-lezen toegang tot veelgestelde vragen.    |
| `read`    | `pdc-subcategory`    | Alleen-lezen toegang tot subcategorieën.         |
| `read`    | `Kosten`             | Alleen-lezen toegang tot kosteninformatie.       |
| `read`    | `product`            | Alleen-lezen toegang tot productgegevens.        |
| `read`    | `productencatalogus` | Alleen-lezen toegang tot de volledige catalogus. |

---

## PDC Schrijver

### Beschrijving van de PDC Schrijver

De rol **PDC Schrijver** heeft volledige schrijfrechten binnen de PDC, inclusief het maken, bijwerken, publiceren en verwijderen van inhoud.

### Toegangsrechten PDC Schrijver

| **Actie** | **Onderwerp**        | **Beschrijving**                           |
| --------- | -------------------- | ------------------------------------------ |
| `read`    | `internal-field`     | Toegang tot interne velden (alleen-lezen). |
| `create`  | `pdc-home-page`      | Nieuwe PDC startpagina maken.              |
| `delete`  | `pdc-home-page`      | PDC startpagina verwijderen.               |
| `publish` | `pdc-home-page`      | PDC startpagina publiceren.                |
| `update`  | `pdc-home-page`      | PDC startpagina bijwerken.                 |
| `read`    | `pdc-category`       | Alleen-lezen toegang tot categorieën.      |
| `create`  | `pdc-category`       | Nieuwe categorie maken.                    |
| `delete`  | `pdc-category`       | Categorie verwijderen.                     |
| `publish` | `pdc-category`       | Categorie publiceren.                      |
| `update`  | `pdc-category`       | Categorie bijwerken.                       |
| `create`  | `pdc-faq`            | Nieuwe FAQ maken.                          |
| `delete`  | `pdc-faq`            | FAQ verwijderen.                           |
| `publish` | `pdc-faq`            | FAQ publiceren.                            |
| `update`  | `pdc-faq`            | FAQ bijwerken.                             |
| `create`  | `pdc-subcategory`    | Nieuwe subcategorie maken.                 |
| `delete`  | `pdc-subcategory`    | Subcategorie verwijderen.                  |
| `publish` | `pdc-subcategory`    | Subcategorie publiceren.                   |
| `update`  | `pdc-subcategory`    | Subcategorie bijwerken.                    |
| `create`  | `Kosten`             | Kosteninformatie toevoegen.                |
| `delete`  | `Kosten`             | Kosteninformatie verwijderen.              |
| `publish` | `Kosten`             | Kosteninformatie publiceren.               |
| `update`  | `Kosten`             | Kosteninformatie bijwerken.                |
| `create`  | `product`            | Nieuwe producten toevoegen.                |
| `delete`  | `product`            | Producten verwijderen.                     |
| `publish` | `product`            | Producten publiceren.                      |
| `update`  | `product`            | Producten bijwerken.                       |
| `create`  | `productencatalogus` | Nieuwe catalogusinformatie toevoegen.      |
| `delete`  | `productencatalogus` | Catalogusinformatie verwijderen.           |
| `publish` | `productencatalogus` | Catalogusinformatie publiceren.            |
| `update`  | `productencatalogus` | Catalogusinformatie bijwerken.             |

---

## Beheerder

### Beschrijving van de Beheerder

De rol **Beheerder** heeft uitgebreide beheerdersrechten binnen het systeem. Deze rol heeft volledige controle over alle aspecten van de applicatie, inclusief het beheren van pagina's, sjablonen, API-tokens, gebruikers, rollen, en configuraties. De Beheerder kan nieuwe gebruikers, rollen en configuraties aanmaken, bestaande configuraties bewerken, en toegang tot de applicatie beheren.

### Toegangsrechten Beheerder

| **Actie**          | **Onderwerp**                       | **Beschrijving**                                                                       |
| ------------------ | ----------------------------------- | -------------------------------------------------------------------------------------- |
| `create`           | `not-found-page`                    | Maakt een 404-pagina aan die wordt weergegeven wanneer een pagina niet gevonden wordt. |
| `delete`           | `not-found-page`                    | Verwijdert de 404-pagina die wordt weergegeven wanneer een pagina niet gevonden wordt. |
| `publish`          | `not-found-page`                    | Publiceert de 404-pagina zodat deze zichtbaar wordt voor gebruikers.                   |
| `read`             | `not-found-page`                    | Leest de inhoud van de 404-pagina.                                                     |
| `update`           | `not-found-page`                    | Wijzigt de inhoud van de 404-pagina.                                                   |
| `create`           | `pdc-home-page`                     | Maakt de startpagina van de PDC aan.                                                   |
| `delete`           | `pdc-home-page`                     | Verwijdert de startpagina van de PDC.                                                  |
| `publish`          | `pdc-home-page`                     | Publiceert de startpagina van de PDC.                                                  |
| `read`             | `pdc-home-page`                     | Leest de inhoud van de PDC startpagina.                                                |
| `update`           | `pdc-home-page`                     | Wijzigt de inhoud van de PDC startpagina.                                              |
| `create`           | `pdc-template`                      | Maakt een nieuw template(Navigation, Footer) voor de PDC aan.                          |
| `delete`           | `pdc-template`                      | Verwijdert een template(Navigation, Footer) voor de PDC.                               |
| `publish`          | `pdc-template`                      | Publiceert een template(Navigation, Footer) voor de PDC.                               |
| `read`             | `pdc-template`                      | Leest de inhoud van een PDC-template(Navigation, Footer).                              |
| `update`           | `pdc-template`                      | Wijzigt de inhoud van een PDC-template(Navigation, Footer).                            |
| `access`           | `api-tokens`                        | Beheert toegang tot API-tokens voor de applicatie.                                     |
| `create`           | `api-tokens`                        | Maakt nieuwe API-tokens aan voor de applicatie.                                        |
| `delete`           | `api-tokens`                        | Verwijdert een API-token uit de applicatie.                                            |
| `read`             | `api-tokens`                        | Leest de gegevens van bestaande API-tokens.                                            |
| `regenerate`       | `api-tokens`                        | Genereert een nieuw API-token voor de applicatie.                                      |
| `update`           | `api-tokens`                        | Wijzigt de instellingen van een API-token.                                             |
| `create`           | `roles`                             | Maakt nieuwe rollen aan voor de applicatie.                                            |
| `delete`           | `roles`                             | Verwijdert bestaande rollen uit de applicatie.                                         |
| `read`             | `roles`                             | Leest de bestaande rollen in de applicatie.                                            |
| `update`           | `roles`                             | Wijzigt de bestaande rollen in de applicatie.                                          |
| `create`           | `users`                             | Maakt nieuwe gebruikers aan voor de applicatie.                                        |
| `delete`           | `users`                             | Verwijdert bestaande gebruikers uit de applicatie.                                     |
| `read`             | `users`                             | Leest de bestaande gebruikers in de applicatie.                                        |
| `update`           | `users`                             | Wijzigt bestaande gebruikers in de applicatie.                                         |
| `menu-link`        | `config-sync`                       | Beheert het menu van de configuratiepagina's.                                          |
| `settings.read`    | `config-sync`                       | Leest de instellingen van de applicatie.                                               |
| `configure-view`   | `content-manager`                   | Configureert het weergaveformaat voor collectie-type content.                          |
| `configure-layout` | `content-manager`                   | Beheert de layout van de componenten in de content manager.                            |
| `create`           | `users-permissions.user`            | Maakt nieuwe gebruikers aan binnen de gebruikers-permissies.                           |
| `delete`           | `users-permissions.user`            | Verwijdert gebruikers uit de gebruikers-permissies.                                    |
| `read`             | `users-permissions.user`            | Leest de gegevens van gebruikers binnen de gebruikers-permissies.                      |
| `update`           | `users-permissions.user`            | Wijzigt de gegevens van gebruikers binnen de gebruikers-permissies.                    |
| `configure-view`   | `content-manager.single-types`      | Configureert de weergave van enkele content types in de content manager.               |
| `read`             | `content-type-builder`              | Leest de inhoud van content-type bouwers.                                              |
| `create`           | `i18n.locale`                       | Voegt nieuwe taalinstellingen toe voor de applicatie.                                  |
| `delete`           | `i18n.locale`                       | Verwijdert bestaande taalinstellingen uit de applicatie.                               |
| `read`             | `i18n.locale`                       | Leest de bestaande taalinstellingen in de applicatie.                                  |
| `update`           | `i18n.locale`                       | Wijzigt de bestaande taalinstellingen in de applicatie.                                |
| `export`           | `import-export-entries`             | Exporteert inhoud vanuit de applicatie.                                                |
| `import`           | `import-export-entries`             | Importeert inhoud in de applicatie.                                                    |
| `copy-link`        | `upload.assets`                     | Maakt een kopie van de link naar geüploade bestanden.                                  |
| `create`           | `upload.assets`                     | Maakt nieuwe geüploade bestanden aan.                                                  |
| `download`         | `upload.assets`                     | Downloadt geüploade bestanden.                                                         |
| `update`           | `upload.assets`                     | Wijzigt de geüploade bestanden.                                                        |
| `configure-view`   | `upload`                            | Beheert de configuratie voor het weergeven van geüploade bestanden.                    |
| `read`             | `upload`                            | Leest de gegevens van geüploade bestanden.                                             |
| `read`             | `users-permissions.email-templates` | Leest de e-mailtemplates binnen de gebruikers-permissies.                              |
| `update`           | `users-permissions.email-templates` | Wijzigt de e-mailtemplates binnen de gebruikers-permissies.                            |
| `read`             | `users-permissions.providers`       | Leest de gegevens van de externe providers in de gebruikers-permissies.                |
| `update`           | `users-permissions.providers`       | Wijzigt de externe providers in de gebruikers-permissies.                              |
| `create`           | `users-permissions.roles`           | Maakt nieuwe rollen aan voor de gebruikers-permissies.                                 |
| `delete`           | `users-permissions.roles`           | Verwijdert rollen uit de gebruikers-permissies.                                        |
| `read`             | `users-permissions.roles`           | Leest de rollen binnen de gebruikers-permissies.                                       |
| `update`           | `users-permissions.roles`           | Wijzigt de rollen binnen de gebruikers-permissies.                                     |

## Super Admin

### Beschrijving van de Super Admin

**Super Admin** heeft alle mogelijke rechten zonder beperkingen.
