# Strapi Dashboard Configuratie Importeren

⚠️ **Na elke deployment naar test, acceptatie of productie moet de Strapi configuratie handmatig worden geïmporteerd.**

**Waarom is dit belangrijk?**
De Strapi configuratie bevat veldlabels, placeholders, layout-posities en rollen.
Als je dit vergeet, kunnen er permissions of UI-instellingen missen in de betreffende omgeving.

## Hoe importeer je de configuratie?

1. Log in op de Strapi admin (test, acceptatie of productie omgeving)
2. Ga naar **Settings** → **Configuration** → **Config Sync**
3. Klik op de **"Import"** knop
4. Bekijk de lijst met wijzigingen
5. Bevestig de import door op **"Yes"** te klikken

<img width="1512" alt="Strapi Config Sync Import" src="https://github.com/user-attachments/assets/81dde7ea-43d7-4492-a2fe-d960a924233c" />

**Impact als je het vergeet:**

- Gebruikers zien verkeerde veldlabels
- Permissions kunnen incorrect zijn
- Content types kunnen verkeerd worden weergegeven
