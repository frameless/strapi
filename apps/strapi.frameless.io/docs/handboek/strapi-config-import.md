## Strapi Dashboard Configuratie Importeren

⚠️ **Na elke deployment naar productie moet de Strapi configuratie handmatig worden geïmporteerd.**

**Waarom is dit belangrijk?**
De Strapi configuratie bevat veldlabels, placeholders, layout-posities en rollen.
Als je dit vergeet, kunnen er permissions of UI-instellingen missen in productie.

### Hoe importeer je de configuratie?

1. Log in op de Strapi admin (productie omgeving)
2. Ga naar **Settings** → **Configuration** → **Config Sync**
3. Klik op de **"Import"** knop
4. Bekijk de lijst met wijzigingen
5. Bevestig de import door op **"Yes"** te klikken

**Impact als je het vergeet:**

- Gebruikers zien verkeerde veldlabels
- Permissions kunnen incorrect zijn
- Content types kunnen verkeerd worden weergegeven
