# Strapi Dashboard Rollen Documentatie

## Overzicht van Rollen

| **Rol**                  | **Beschrijving**                                                                                                                                                  |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Kennisbank Redacteur** | Kennisbank Redacteur kan aanvullende en interne informatie volledig bewerken en producten en andere collecties zien. Geen toegang tot gebruikers of Enkele Types. |
| **Lezer**                | Een rol met alleen leesrechten op alle verzamelingen behalve gebruikers.                                                                                          |
| **PDC Redacteur**        | PDC Redacteur kan producten volledig bewerken en aanvullende en interne informatie zien. Geen toegang tot gebruikers wel LUP rechten op Enkele Types.             |
| **Beheerder**            | Functioneel beheerder kan alle inhoud zien en aanpassen en gebruikers ook toevoegen en verwijderen. Volledige toegang tot Enkele Types.                           |
| **Super Admin**          | Super Admins can access and manage all features and settings.                                                                                                     |

---

## Kennisbank Redacteur

### Beschrijving van de Kennisbank Redacteur

**Kennisbank Redacteur** kan aanvullende en interne informatie volledig bewerken en producten en andere collecties zien. Geen toegang tot gebruikers of Enkele Types.

### Toegangsrechten Kennisbank Redacteur

| **Actie** | **Onderwerp**                 | **Beschrijving**                                    |
| --------- | ----------------------------- | --------------------------------------------------- |
| Creëer    | Interne informatie            | Nieuwe Interne informatie velden maken.             |
| Verwijder | Interne informatie            | Interne informatie velden verwijderen.              |
| Publiceer | Interne informatie            | Interne informatie velden publiceren.               |
| Lees      | Interne informatie            | Alleen-lezen toegang tot Interne informatie velden. |
| Update    | Interne informatie            | Interne informatie velden bijwerken.                |
| Creëer    | Categorie                     | Nieuwe Categorie velden maken.                      |
| Verwijder | Categorie                     | Categorie velden verwijderen.                       |
| Publiceer | Categorie                     | Categorie velden publiceren.                        |
| Lees      | Categorie                     | Alleen-lezen toegang tot Categorie velden.          |
| Update    | Categorie                     | Categorie velden bijwerken.                         |
| Creëer    | Contact informatie (openbaar) | Nieuwe inhoud maken.                                |
| Verwijder | Contact informatie (openbaar) | Inhoud verwijderen.                                 |
| Publiceer | Contact informatie (openbaar) | Inhoud publiceren.                                  |
| Lees      | Contact informatie (openbaar) | Alleen-leestoegang tot de inhoud.                   |
| Update    | Contact informatie (openbaar) | Inhoud bijwerken.                                   |
| Creëer    | Contact information (intern)  | Nieuwe inhoud maken.                                |
| Verwijder | Contact information (intern)  | Inhoud verwijderen.                                 |
| Publiceer | Contact information (intern)  | Inhoud publiceren.                                  |
| Lees      | Contact information (intern)  | Alleen-leestoegang tot de inhoud.                   |
| Update    | Contact information (intern)  | Inhoud bijwerken.                                   |
| Creëer    | Subcategorie                  | Nieuwe Subcategorie velden maken.                   |
| Verwijder | Subcategorie                  | Subcategorie velden verwijderen.                    |
| Publiceer | Subcategorie                  | Subcategorie velden publiceren.                     |
| Lees      | Subcategorie                  | Alleen-lezen toegang tot Subcategorie velden.       |
| Update    | Subcategorie                  | Subcategorie velden bijwerken.                      |
| Lees      | Kosten                        | Alleen-lezen toegang tot kosteninformatie.          |
| Creëer    | VAC                           | Nieuwe VAC-inhoud maken.                            |
| Verwijder | VAC                           | VAC-inhoud verwijderen.                             |
| Publiceer | VAC                           | VAC-inhoud publiceren.                              |
| Lees      | VAC                           | Alleen-lezen toegang tot VAC-inhoud.                |
| Update    | VAC                           | VAC-inhoud bijwerken.                               |
| Lees      | Aanvullende informatie        | Alleen-lezen toegang tot Aanvullende informatie.    |
| Creëer    | Aanvullende informatie        | Nieuwe Aanvullende informatie velden maken.         |
| Update    | Aanvullende informatie        | Aanvullende informatie bijwerken.                   |
| Verwijder | Aanvullende informatie        | Aanvullende informatie verwijderen.                 |
| Publiceer | Aanvullende informatie        | Aanvullende informatie publiceren.                  |
| Lees      | Product                       | Alleen-lezen toegang tot het product.               |

---

## Lezer

### Beschrijving van de Lezer

Een rol met alleen leesrechten op alle verzamelingen behalve gebruikers.

### Toegangsrechten Lezer

| **Actie** | **Onderwerp**                 | **Beschrijving**                                        |
| --------- | ----------------------------- | ------------------------------------------------------- |
| Lezen     | Aanvullende informatie        | Alleen-lezen toegang tot aanvullende informatie inhoud. |
| Lezen     | Categorie                     | Alleen-lezen toegang tot categorie.                     |
| Lees      | Contact informatie (openbaar) | Alleen-lezen toegang tot de inhoud.                     |
| Lees      | Contact information (intern)  | Alleen-lezen toegang tot de inhoud.                     |
| Lezen     | Interne informatie            | Toegang tot interne informatie velden (alleen-lezen).   |
| Lezen     | Kosten                        | Alleen-lezen toegang tot kosten.                        |
| Lezen     | Product                       | Alleen-lezen toegang tot productgegevens.               |
| Lezen     | Subcategorie                  | Alleen-lezen toegang tot subcategorie.                  |
| Lezen     | VAC                           | Alleen-lezen toegang tot VAC.                           |

---

## PDC Redacteur

### Beschrijving van de PDC Redacteur

**PDC Redacteur** kan producten volledig bewerken en aanvullende en interne informatie zien. Geen toegang tot gebruikers wel LUP rechten op Enkele Types.

### Toegangsrechten PDC Redacteur

| **Actie** | **Onderwerp**                 | **Beschrijving**                                        |
| --------- | ----------------------------- | ------------------------------------------------------- |
| Lezen     | Interne informatie            | Alleen-lezen toegang tot interne informatie velden      |
| Lezen     | Aanvullende informatie        | Alleen-lezen toegang tot aanvullende informatie inhoud. |
| Update    | Not-found-page                | Not-found-page bijwerken.                               |
| Publiceer | Not-found-page                | Not-found-page publiceren.                              |
| Lees      | Not-found-page                | Alleen-lezen toegang tot de not-found-page inhoud.      |
| Publiceer | Pdc-home-page                 | Pdc-home-page publiceren.                               |
| Update    | Pdc-home-page                 | Pdc-home-page bijwerken.                                |
| Lees      | Pdc-home-page                 | Alleen-lezen toegang tot Pdc-home-page inhoud.          |
| Creëer    | Categorie                     | Nieuwe Categorie velden maken.                          |
| Verwijder | Categorie                     | Categorie velden verwijderen.                           |
| Publiceer | Categorie                     | Categorie velden publiceren.                            |
| Lees      | Categorie                     | Alleen-lezen toegang tot Categorie velden.              |
| Update    | Categorie                     | Categorie velden bijwerken.                             |
| Creëer    | Contact informatie (openbaar) | Nieuwe inhoud maken.                                    |
| Verwijder | Contact informatie (openbaar) | Inhoud verwijderen.                                     |
| Publiceer | Contact informatie (openbaar) | Inhoud publiceren.                                      |
| Lees      | Contact informatie (openbaar) | Alleen-leestoegang tot de inhoud.                       |
| Update    | Contact informatie (openbaar) | Inhoud bijwerken.                                       |
| Creëer    | Contact information (intern)  | Nieuwe inhoud maken.                                    |
| Verwijder | Contact information (intern)  | Inhoud verwijderen.                                     |
| Publiceer | Contact information (intern)  | Inhoud publiceren.                                      |
| Lees      | Contact information (intern)  | Alleen-leestoegang tot de inhoud.                       |
| Update    | Contact information (intern)  | Inhoud bijwerken.                                       |
| Creëer    | Subcategorie                  | Nieuwe Subcategorie velden maken.                       |
| Verwijder | Subcategorie                  | Subcategorie velden verwijderen.                        |
| Publiceer | Subcategorie                  | Subcategorie velden publiceren.                         |
| Lees      | Subcategorie                  | Alleen-lezen toegang tot Subcategorie velden.           |
| Update    | Subcategorie                  | Subcategorie velden bijwerken.                          |
| Creëer    | Kosten                        | Kosteninformatie toevoegen.                             |
| Verwijder | Kosten                        | Kosteninformatie verwijderen.                           |
| Publiceer | Kosten                        | Kosteninformatie publiceren.                            |
| Update    | Kosten                        | Kosteninformatie bijwerken.                             |
| Lees      | Kosten                        | Alleen-lezen toegang tot kosteninformatie.              |
| Creëer    | Product                       | Nieuwe product toevoegen.                               |
| Verwijder | Product                       | Product verwijderen.                                    |
| Publiceer | Product                       | Product publiceren.                                     |
| Update    | Product                       | Product bijwerken.                                      |
| Lees      | Product                       | Alleen-lezen toegang tot product.                       |
| Lezen     | VAC                           | Alleen-lezen toegang tot VAC.                           |

---

## Beheerder

### Beschrijving van de Beheerder

Functioneel beheerder kan alle inhoud zien en aanpassen en gebruikers ook toevoegen en verwijderen. Volledige toegang tot Enkele Types.

### Toegangsrechten Beheerder

| **Actie**          | **Onderwerp**                       | **Beschrijving**                                                         |
| ------------------ | ----------------------------------- | ------------------------------------------------------------------------ |
| Creëer             | Not-found-page                      | Nieuwe not-found-page maken.                                             |
| Verwijder          | Not-found-page                      | Not-found-page verwijderen.                                              |
| Update             | Not-found-page                      | Not-found-page bijwerken.                                                |
| Publiceer          | Not-found-page                      | Not-found-page publiceren.                                               |
| Lees               | Not-found-page                      | Alleen-lezen toegang tot de not-found-page inhoud.                       |
| Creëer             | Pdc-home-page                       | Nieuwe pdc-home-page maken.                                              |
| Verwijder          | Pdc-home-page                       | Pdc-home-page verwijderen.                                               |
| Publiceer          | Pdc-home-page                       | Pdc-home-page publiceren.                                                |
| Update             | Pdc-home-page                       | Pdc-home-page bijwerken.                                                 |
| Lees               | Pdc-home-page                       | Alleen-lezen toegang tot pdc-home-page inhoud.                           |
| Creëer             | Pdc-template                        | Maakt een nieuw template(Navigation, Footer) voor de PDC aan.            |
| Verwijder          | Pdc-template                        | Verwijdert een template(Navigation, Footer) voor de PDC.                 |
| Publiceer          | Pdc-template                        | Publiceert een template(Navigation, Footer) voor de PDC.                 |
| Lees               | Pdc-template                        | Leest de inhoud van een PDC-template(Navigation, Footer).                |
| Update             | Pdc-template                        | Wijzigt de inhoud van een PDC-template(Navigation, Footer).              |
| Toegang            | Api-tokens                          | Beheert toegang tot API-tokens voor de applicatie.                       |
| Creëer             | Api-tokens                          | Maakt nieuwe API-tokens aan voor de applicatie.                          |
| Verwijder          | Api-tokens                          | Verwijdert een API-token uit de applicatie.                              |
| Lees               | Api-tokens                          | Leest de gegevens van bestaande API-tokens.                              |
| Regenereren        | Api-tokens                          | Genereert een nieuw API-token voor de applicatie.                        |
| Update             | Api-tokens                          | Wijzigt de instellingen van een API-token.                               |
| Creëer             | Rollen                              | Maakt nieuwe rollen aan voor de applicatie.                              |
| Verwijder          | Rollen                              | Verwijdert bestaande rollen uit de applicatie.                           |
| Lees               | Rollen                              | Leest de bestaande rollen in de applicatie.                              |
| Update             | Rollen                              | Wijzigt de bestaande rollen in de applicatie.                            |
| Creëer             | Gebruikers                          | Maakt nieuwe gebruikers aan voor de applicatie.                          |
| Verwijder          | Gebruikers                          | Verwijdert bestaande gebruikers uit de applicatie.                       |
| Lees               | Gebruikers                          | Leest de bestaande gebruikers in de applicatie.                          |
| Update             | Gebruikers                          | Wijzigt bestaande gebruikers in de applicatie.                           |
| Menu-link          | `config-sync`                       | Beheert het menu van de configuratiepagina's.                            |
| `settings.read`    | `config-sync`                       | Leest de instellingen van de applicatie.                                 |
| `configure-view`   | `content-manager`                   | Configureert het weergaveformaat voor collectie-type content.            |
| `configure-layout` | `content-manager`                   | Beheert de layout van de componenten in de content manager.              |
| Creëer             | `users-permissions.user`            | Maakt nieuwe gebruikers aan binnen de gebruikers-permissies.             |
| Verwijder          | `users-permissions.user`            | Verwijdert gebruikers uit de gebruikers-permissies.                      |
| Lees               | `users-permissions.user`            | Leest de gegevens van gebruikers binnen de gebruikers-permissies.        |
| Update             | `users-permissions.user`            | Wijzigt de gegevens van gebruikers binnen de gebruikers-permissies.      |
| `configure-view`   | `content-manager.single-types`      | Configureert de weergave van enkele content types in de content manager. |
| Lees               | `content-type-builder`              | Leest de inhoud van content-type bouwers.                                |
| Creëer             | `i18n.locale`                       | Voegt nieuwe taalinstellingen toe voor de applicatie.                    |
| Verwijder          | `i18n.locale`                       | Verwijdert bestaande taalinstellingen uit de applicatie.                 |
| Lees               | `i18n.locale`                       | Leest de bestaande taalinstellingen in de applicatie.                    |
| Update             | `i18n.locale`                       | Wijzigt de bestaande taalinstellingen in de applicatie.                  |
| Exporteren         | `import-export-entries`             | Exporteert inhoud vanuit de applicatie.                                  |
| Importeren         | `import-export-entries`             | Importeert inhoud in de applicatie.                                      |
| `copy-link`        | `upload.assets`                     | Maakt een kopie van de link naar geüploade bestanden.                    |
| Creëer             | `upload.assets`                     | Maakt nieuwe geüploade bestanden aan.                                    |
| Downloaden         | `upload.assets`                     | Downloadt geüploade bestanden.                                           |
| Update             | `upload.assets`                     | Wijzigt de geüploade bestanden.                                          |
| `configure-view`   | `upload`                            | Beheert de configuratie voor het weergeven van geüploade bestanden.      |
| Lees               | `upload`                            | Leest de gegevens van geüploade bestanden.                               |
| Lees               | `users-permissions.email-templates` | Leest de e-mailtemplates binnen de gebruikers-permissies.                |
| Update             | `users-permissions.email-templates` | Wijzigt de e-mailtemplates binnen de gebruikers-permissies.              |
| Lees               | `users-permissions.providers`       | Leest de gegevens van de externe providers in de gebruikers-permissies.  |
| Update             | `users-permissions.providers`       | Wijzigt de externe providers in de gebruikers-permissies.                |
| Creëer             | `users-permissions.roles`           | Maakt nieuwe rollen aan voor de gebruikers-permissies.                   |
| Verwijder          | `users-permissions.roles`           | Verwijdert rollen uit de gebruikers-permissies.                          |
| Lees               | `users-permissions.roles`           | Leest de rollen binnen de gebruikers-permissies.                         |
| Update             | `users-permissions.roles`           | Wijzigt de rollen binnen de gebruikers-permissies.                       |

## Super Admin

### Beschrijving van de Super Admin

**Super Admins** can access and manage all features and settings.
