# @frameless/utils

## 0.1.0

### Minor Changes

- f322de1: Wanneer het laden te lang duurde, werd dit niet altijd netjes gestopt. We hebben dit verbeterd zodat het laden nu veilig en soepel geannuleerd kan worden.
- c79d241: Verbeter het visuele aspect van het blok met aanvullende informatie in het voorbeeldvenster van het Strapi-dashboard.

  Voeg een achtergrondkleur toe aan dit blok in de voorbeeldmodus. Wanneer de inhoud echter wordt gekopieerd en geplakt in Word, verschijnt er een horizontale lijn boven en onder het blok.

- 111df39: Codeverbetering: verplaats enkele functies naar het util-pakket

  - `buildURL`
  - `getPathAndSearchParams`
  - `getQueryParams`
  - `getURL`
  - `setEnv`
  - `showErrorBasedOnENV`

## 0.0.1

### Patch Changes

- d07b871: Codeverbetering: verplaats addHeadingOncePerCategory naar het util-pakket.
