# @frameless/strapi-tiptap-editor [2.3.0](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@2.2.0...@frameless/strapi-tiptap-editor@2.3.0) (2024-06-12)

## 0.4.0

### Minor Changes

- 967697e: Uitklapper (accordion) toegevoegd aan de teksteditor. Hiermee kun je inklapbare secties maken met een titel en inhoud die bezoekers kunnen open- en dichtklappen.

  ([GitHub Issue Frameless/strapi#1161](https://github.com/frameless/strapi/issues/1161))

## 0.3.2

### Patch Changes

- 8b2df3c: Los het probleem op met de sticky positie van de werkbalk met inhoudsblokken ([GitHub Issue Frameless/strapi#1135](https://github.com/frameless/strapi/issues/1135)).
- Updated dependencies [f322de1]
- Updated dependencies [c79d241]
- Updated dependencies [111df39]
  - @frameless/utils@0.1.0

## 0.3.1

### Patch Changes

- Updated dependencies [d07b871]
  - @frameless/utils@0.0.1

## 0.3.0

### Minor Changes

- d96fe22: Voeg Rich Text Voorbeeldfunctionaliteit toe

  - Nieuwe functionaliteit toegevoegd voor rich text voorbeeld.
  - Correcte behandeling van spaties en nieuwe regels.
  - Label wordt dynamisch bijgewerkt bij wijziging van de inhoud.

- 3b6b5b8: Integreer het kostenveld in de aanvullende informatiecollectie.

  Wanneer een kostenveld aan een product wordt gekoppeld, wordt de kostengegevens beschikbaar in het gekoppelde aanvullende-informatieveld.

## 0.2.0

### Minor Changes

- ed4d2a4: Kostenveld geïntegreerd in het interne veld

  Wanneer het kostenveld aan een product is gekoppeld, wordt deze waarde nu automatisch beschikbaar in het interne veld dat al aan het product is gekoppeld.

## 0.1.1

### Patch Changes

- f40ac6b: Los het probleem op waarbij de Strapi rich text editor niet goed zichtbaar is in dark mode.

## 0.1.0

### Minor Changes

- 06c52b9: Add Title to YouTube Video via Strapi Dashboard ([GitHub Issue frameless/strapi#859](https://github.com/frameless/strapi/issues/859))

## 0.0.0

### Minor Changes

- 82fa577: Wanneer je een tabel maakt in Strapi, is het nu makkelijker om tekst voor of na de tabel toe te voegen. Klik op de knop boven de tabel om daar een lege regel toe te voegen, of klik op de knop onder de tabel om erna een lege regel te maken.
- 82fa577: Er zijn nu Nederlandse labels voor de toolbar buttons van de rich text editor in Strapi.

### Features

- improved Dutch labels of rich text editor ([7bd1d81](https://github.com/frameless/strapi/commit/7bd1d8128e157416ad3a2024b23da1420f35389c))

# @frameless/strapi-tiptap-editor [2.2.0](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@2.1.0...@frameless/strapi-tiptap-editor@2.2.0) (2024-06-04)

### Features

- **strapi-tiptap-editor:** add missing i18n labels to the Toolbar ([edff4f2](https://github.com/frameless/strapi/commit/edff4f280abcdbb0405b21b3b7236f4aa89fd6c1))
- **strapi-tiptap-editor:** improve table cursor positioning ([ef602db](https://github.com/frameless/strapi/commit/ef602dbf72c39228546a5899e75e1b0f955fa0d9))

# @frameless/strapi-tiptap-editor [2.1.0](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@2.0.2...@frameless/strapi-tiptap-editor@2.1.0) (2024-05-02)

### Features

- **deps:** upgrade `@utrecht/` packages ([a835ad6](https://github.com/frameless/strapi/commit/a835ad66a0095e8d1d762677b380e89010225070))

## @frameless/strapi-tiptap-editor [2.0.2](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@2.0.1...@frameless/strapi-tiptap-editor@2.0.2) (2024-04-26)

### Bug Fixes

- **strapi-tiptap-editor:** use `onUpdate` instead of `useEffect` ([39f5102](https://github.com/frameless/strapi/commit/39f5102b4b42083929c0890ef702438faa98b5da))
- **tiptap-strapi-editor:** disable the saveJson option from tiptap settings ([1ab0f8b](https://github.com/frameless/strapi/commit/1ab0f8b5e939cffc1b545e9f31a6076b4e34f125))

## @frameless/strapi-tiptap-editor [2.0.1](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@2.0.0...@frameless/strapi-tiptap-editor@2.0.1) (2024-04-25)

### Bug Fixes

- **strapi-tiptap-editor:** fix tiptap duplication content issue ([7309d46](https://github.com/frameless/strapi/commit/7309d468050882f073f88dd9dd70be5e7c3c51c0))

# @frameless/strapi-tiptap-editor [2.0.0](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.12.0...@frameless/strapi-tiptap-editor@2.0.0) (2024-04-16)

### Bug Fixes

- **strapi-tiptap-editor:** fix the price-widget issue ([8e5ef8a](https://github.com/frameless/strapi/commit/8e5ef8a0830235e1e6c0c7de4e190eda16338319))

### BREAKING CHANGES

- **strapi-tiptap-editor:** use UUID instead of incremental ID

# @frameless/strapi-tiptap-editor [1.12.0](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.11.0...@frameless/strapi-tiptap-editor@1.12.0) (2024-04-11)

### Features

- **strapi-tiptap-editor:** make the language extension configurable ([f28d13a](https://github.com/frameless/strapi/commit/f28d13a30f8efa4e0bcc7db8d61a2dbf1b53cf71))

# @frameless/strapi-tiptap-editor [1.11.0](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.10.5...@frameless/strapi-tiptap-editor@1.11.0) (2024-04-09)

### Features

- **strapi-tiptap-editor:** create anchor extension ([b056a27](https://github.com/frameless/strapi/commit/b056a2725a115c4b903c9795ac66488582f90003))
- **strapi-tiptap-editor:** enable to use non-URLs ([9230298](https://github.com/frameless/strapi/commit/923029878a14e0ef54c9dd00f3356c68ac0db0d4))

## @frameless/strapi-tiptap-editor [1.10.5](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.10.4...@frameless/strapi-tiptap-editor@1.10.5) (2024-04-04)

### Bug Fixes

- **strapi-tiptap-editor:** increase the pice API limit ([3bf193a](https://github.com/frameless/strapi/commit/3bf193ad6860a1059c2e0c39699d984e94e07b30))

## @frameless/strapi-tiptap-editor [1.10.4](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.10.3...@frameless/strapi-tiptap-editor@1.10.4) (2024-04-03)

### Bug Fixes

- all paragraphs incorrectly default to lead ([309aa25](https://github.com/frameless/strapi/commit/309aa25a9afd39ee029e715594542de49781c0b6))

## @frameless/strapi-tiptap-editor [1.10.3](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.10.2...@frameless/strapi-tiptap-editor@1.10.3) (2024-04-03)

### Bug Fixes

- lead paragraph not rendering properly in tip-tap ([557669b](https://github.com/frameless/strapi/commit/557669b80208a68ebecbe868da0d23c54c50bc4c))
- support changing back to paragraph from leadParagraph ([8c62cb9](https://github.com/frameless/strapi/commit/8c62cb97914ce3fc00b46169dba74a87bc67f97e))

## @frameless/strapi-tiptap-editor [1.10.2](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.10.1...@frameless/strapi-tiptap-editor@1.10.2) (2024-03-29)

### Bug Fixes

- **strapi-tiptap-editor:** fix the price widget issue ([8e58661](https://github.com/frameless/strapi/commit/8e5866174e22b3cb2987550f1c57830c732dd751))

## @frameless/strapi-tiptap-editor [1.10.1](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.10.0...@frameless/strapi-tiptap-editor@1.10.1) (2024-03-26)

### Bug Fixes

- **tiptap-editor:** improve the price tiptap extension ([511e46b](https://github.com/frameless/strapi/commit/511e46b1ad6d370fd48b580095a285a34d2f7767))

# @frameless/strapi-tiptap-editor [1.10.0](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.9.1...@frameless/strapi-tiptap-editor@1.10.0) (2024-02-08)

### Features

- add Node.js 20 support ([7b5feb7](https://github.com/frameless/strapi/commit/7b5feb7f204e52566430e25ceb282a2a0d0fa86f))

# @frameless/strapi-tiptap-editor 1.0.0 (2023-12-04)

### Bug Fixes

- build error for experimental feature ([6d53cc7](https://github.com/frameless/strapi/commit/6d53cc710398d64233b638bce91e165b217adcc5))
- **strapi-tiptap-editor:** enable i18n settings ([c59c51a](https://github.com/frameless/strapi/commit/c59c51ad52b0c95e12e5e391911886115b2b2556))
- **strapi-tiptap-editor:** fix the i18n issue ([a4f9d99](https://github.com/frameless/strapi/commit/a4f9d992d87c8ea88b1f0e32b2f987f025bdedb5))
- **strapi-tiptap-editor:** fix the ordered-list style ([23c0f22](https://github.com/frameless/strapi/commit/23c0f2273eb8eae42425419c075c0eee4f945161))
- **strapi-tiptap-editor:** fix types issue ([c388569](https://github.com/frameless/strapi/commit/c388569b9271ddab94def5ac9459c8b37f24e232))
- **strapi-tiptap-editor:** remove color extension en adjust highlight ([877ab5a](https://github.com/frameless/strapi/commit/877ab5ac02745167b48dbf89fb0771535cd3f990))
- **strapi-tiptap-editor:** resolve table Menubar option issue ([0f9633a](https://github.com/frameless/strapi/commit/0f9633a8b9453f9e5435f522f64b3fa97f33c2fc))
- **strapi-tiptap-editor:** return image source only ([70d719f](https://github.com/frameless/strapi/commit/70d719fd64e9df4fe28a6dad4407b6cebc49faac))
- **strapi-tiptap-editor:** use `classnames` ([968189c](https://github.com/frameless/strapi/commit/968189c08063207319fa71156e18906066a23116))
- **tiptap:** display price list based on save instead of refresh ([ff4fa47](https://github.com/frameless/strapi/commit/ff4fa47c471a0ddfd7112fb4c8d893901a727551))

### Features

- create tiptap language extension ([2076ad1](https://github.com/frameless/strapi/commit/2076ad133cc474bf4c435fd7f0a3f9c277adfb60))
- **deps:** update @utrecht/\* packages ([768213e](https://github.com/frameless/strapi/commit/768213e60dbc9e4803fb2ff7ba3090fe24cd8ee7))
- enable bubble-menu when double click on a link ([2271540](https://github.com/frameless/strapi/commit/22715407467a74278d769583265ebd9d3b5cf784))
- replace ckeditor with tiptap editor ([8da48eb](https://github.com/frameless/strapi/commit/8da48ebfc3731481c63517e09076e899353a52d9))
- **strapi-tiptap-editor:** enable `figcaption` as property ([4402c42](https://github.com/frameless/strapi/commit/4402c420d1b22597c62786becc7358d4e589b237))
- **strapi-tiptap:** add validation to the lint ([c4c45d3](https://github.com/frameless/strapi/commit/c4c45d33389dfa4ba1aedb8b45497af8b726ea1c))
- **tiptap-editor:** enable to display free | gratis when the price 0 ([6e46f8b](https://github.com/frameless/strapi/commit/6e46f8bd72377983f9a81ad94d1b02edf47ee90b))
- **tiptap-editor:** improve the strapi-tiptap ([ecba121](https://github.com/frameless/strapi/commit/ecba1219122bc0790e69a7a6ccd3151c1f7d6c3e))
- **vth:** add vth-dashboard app ([#152](https://github.com/frameless/strapi/issues/152)) ([869e8bd](https://github.com/frameless/strapi/commit/869e8bdd0457a3d748254a27ac6c617d5d36ab6c))
- **vth:** render themas with card ([81252b2](https://github.com/frameless/strapi/commit/81252b22670389e186695ac5c20c66849c578212))

## @frameless/strapi-tiptap-editor [1.9.1](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.9.0...@frameless/strapi-tiptap-editor@1.9.1) (2023-11-15)

### Bug Fixes

- **tiptap:** display price list based on save instead of refresh ([ff4fa47](https://github.com/frameless/strapi/commit/ff4fa47c471a0ddfd7112fb4c8d893901a727551))

# @frameless/strapi-tiptap-editor [1.9.0](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.8.3...@frameless/strapi-tiptap-editor@1.9.0) (2023-11-09)

### Features

- **strapi-tiptap:** add validation to the lint ([c4c45d3](https://github.com/frameless/strapi/commit/c4c45d33389dfa4ba1aedb8b45497af8b726ea1c))

## @frameless/strapi-tiptap-editor [1.8.3](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.8.2...@frameless/strapi-tiptap-editor@1.8.3) (2023-11-02)

### Bug Fixes

- **strapi-tiptap-editor:** resolve table Menubar option issue ([0f9633a](https://github.com/frameless/strapi/commit/0f9633a8b9453f9e5435f522f64b3fa97f33c2fc))

## @frameless/strapi-tiptap-editor [1.8.2](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.8.1...@frameless/strapi-tiptap-editor@1.8.2) (2023-10-31)

### Bug Fixes

- **strapi-tiptap-editor:** return image source only ([70d719f](https://github.com/frameless/strapi/commit/70d719fd64e9df4fe28a6dad4407b6cebc49faac))

## @frameless/strapi-tiptap-editor [1.8.1](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.8.0...@frameless/strapi-tiptap-editor@1.8.1) (2023-10-26)

### Bug Fixes

- **strapi-tiptap-editor:** fix the ordered-list style ([23c0f22](https://github.com/frameless/strapi/commit/23c0f2273eb8eae42425419c075c0eee4f945161))

# @frameless/strapi-tiptap-editor [1.8.0](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.7.1...@frameless/strapi-tiptap-editor@1.8.0) (2023-10-26)

### Features

- **tiptap-editor:** improve the strapi-tiptap ([ecba121](https://github.com/frameless/strapi/commit/ecba1219122bc0790e69a7a6ccd3151c1f7d6c3e))

## @frameless/strapi-tiptap-editor [1.7.1](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.7.0...@frameless/strapi-tiptap-editor@1.7.1) (2023-10-17)

### Bug Fixes

- build error for experimental feature ([6d53cc7](https://github.com/frameless/strapi/commit/6d53cc710398d64233b638bce91e165b217adcc5))

# @frameless/strapi-tiptap-editor [1.7.0](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.6.0...@frameless/strapi-tiptap-editor@1.7.0) (2023-10-11)

### Features

- **deps:** update @utrecht/\* packages ([768213e](https://github.com/frameless/strapi/commit/768213e60dbc9e4803fb2ff7ba3090fe24cd8ee7))

# @frameless/strapi-tiptap-editor [1.6.0](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.5.0...@frameless/strapi-tiptap-editor@1.6.0) (2023-10-04)

### Features

- **vth:** render themas with card ([81252b2](https://github.com/frameless/strapi/commit/81252b22670389e186695ac5c20c66849c578212))

# @frameless/strapi-tiptap-editor [1.5.0](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.4.0...@frameless/strapi-tiptap-editor@1.5.0) (2023-09-27)

### Features

- **strapi-tiptap-editor:** enable `figcaption` as property ([4402c42](https://github.com/frameless/strapi/commit/4402c420d1b22597c62786becc7358d4e589b237))

# @frameless/strapi-tiptap-editor [1.4.0](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.3.1...@frameless/strapi-tiptap-editor@1.4.0) (2023-08-30)

### Features

- **tiptap-editor:** enable to display free | gratis when the price 0 ([6e46f8b](https://github.com/frameless/strapi/commit/6e46f8bd72377983f9a81ad94d1b02edf47ee90b))

## @frameless/strapi-tiptap-editor [1.3.1](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.3.0...@frameless/strapi-tiptap-editor@1.3.1) (2023-08-24)

### Bug Fixes

- **strapi-tiptap-editor:** fix types issue ([c388569](https://github.com/frameless/strapi/commit/c388569b9271ddab94def5ac9459c8b37f24e232))

# @frameless/strapi-tiptap-editor [1.3.0](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.2.2...@frameless/strapi-tiptap-editor@1.3.0) (2023-08-22)

### Features

- **vth:** add vth-dashboard app ([#152](https://github.com/frameless/strapi/issues/152)) ([869e8bd](https://github.com/frameless/strapi/commit/869e8bdd0457a3d748254a27ac6c617d5d36ab6c))

## @frameless/strapi-tiptap-editor [1.2.2](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.2.1...@frameless/strapi-tiptap-editor@1.2.2) (2023-08-11)

### Bug Fixes

- **strapi-tiptap-editor:** remove color extension en adjust highlight ([877ab5a](https://github.com/frameless/strapi/commit/877ab5ac02745167b48dbf89fb0771535cd3f990))
- **strapi-tiptap-editor:** use `classnames` ([968189c](https://github.com/frameless/strapi/commit/968189c08063207319fa71156e18906066a23116))

## @frameless/strapi-tiptap-editor [1.2.1](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.2.0...@frameless/strapi-tiptap-editor@1.2.1) (2023-08-11)

### Bug Fixes

- **strapi-tiptap-editor:** fix the i18n issue ([a4f9d99](https://github.com/frameless/strapi/commit/a4f9d992d87c8ea88b1f0e32b2f987f025bdedb5))

# @frameless/strapi-tiptap-editor [1.2.0](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.1.0...@frameless/strapi-tiptap-editor@1.2.0) (2023-08-11)

### Bug Fixes

- **strapi-tiptap-editor:** enable i18n settings ([c59c51a](https://github.com/frameless/strapi/commit/c59c51ad52b0c95e12e5e391911886115b2b2556))

### Features

- create tiptap language extension ([2076ad1](https://github.com/frameless/strapi/commit/2076ad133cc474bf4c435fd7f0a3f9c277adfb60))

# @frameless/strapi-tiptap-editor [1.1.0](https://github.com/frameless/strapi/compare/@frameless/strapi-tiptap-editor@1.0.0...@frameless/strapi-tiptap-editor@1.1.0) (2023-05-05)

### Features

- enable bubble-menu when double click on a link ([2271540](https://github.com/frameless/strapi/commit/22715407467a74278d769583265ebd9d3b5cf784))

# @frameless/strapi-tiptap-editor 1.0.0 (2023-04-28)

### Features

- replace ckeditor with tiptap editor ([8da48eb](https://github.com/frameless/strapi/commit/8da48ebfc3731481c63517e09076e899353a52d9))
