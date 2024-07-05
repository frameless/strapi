export default {
  toolbar: {
    bold: 'Vet',
    italic: 'Cursief',
    strikeThrough: 'Doorhalen',
    underline: 'Onderstrepen',
    highlight: 'Markering',
    alignLeft: 'Links uitlijnen',
    alignCenter: 'Centreren',
    alignRight: 'Rechts uitlijnen',
    bulletList: 'Opsommingslijst',
    orderedList: 'Genummerde lijst',
    code: 'Code',
    blockquote: 'Blokcitaat',
    language: {
      label: 'Selecteer een taal',
      removeLanguage: 'Taal verwijderen',
    },
    textStyle: {
      label: 'Tekststijl',
      options: {
        paragraph: 'Alinea',
        leadParagraph: 'Lead',
        heading1: 'Kop 1',
        heading2: 'Kop 2',
        heading3: 'Kop 3',
        heading4: 'Kop 4',
        heading5: 'Kop 5',
        heading6: 'Kop 6',
      },
    },
    link: {
      label: 'Hyperlink',
      dialog: {
        title: 'Voeg een URL-koppeling in',
        input: {
          label: 'Voeg een URL-koppeling in',
          placeholder: 'Schrijf of plak hier de URL',
          ariaLabel: 'URL',
          hint: 'Voer URL in (bijv. https://, http://, #, tel:, mailto:)',
          error: "Ongeldige URL. Moet beginnen met 'https://', 'http://', '#', 'tel:' of 'mailto:'",
        },
      },
    },
    tableWithCaption: 'Tabel met bijschrift invoegen',
    table: 'Tabel invoegen',
    youtube: {
      label: 'YouTube-video invoegen',
      dialog: {
        title: 'YouTube-video invoegen',
        URLinput: {
          label: 'YouTube-URL invoeren',
          placeholder: 'Voer hier de YouTube-URL in',
          ariaLabel: 'YouTube-URL invoeren',
        },
        widthInput: {
          label: 'YouTube-video breedte',
          placeholder: 'Breedte van de video',
          ariaLabel: 'YouTube-video breedte',
        },
        heightInput: {
          label: 'YouTube-video hoogte',
          placeholder: 'Hoogte van de video',
          ariaLabel: 'YouTube-video hoogte',
        },
      },
    },
    horizontalRule: 'Scheidingslijn',
    headingWithID: {
      editLabel: 'Bewerk kop - {{headingLevel}} ID en kopieer',
      generateLabel: 'Genereer ID voor kop - {{headingLevel}} en kopieer',
      dialog: {
        title: '{{state}} kop ID',
        input: {
          label: 'Kop ID',
          placeholder: 'Voer een unieke ID in',
          hint: 'De ID zal worden gebruikt om een link naar deze kop te maken.',
          error: 'Dit veld is verplicht',
        },
        alert: {
          generatedTitle: 'De kop ID is succesvol bijgewerkt',
          updatedTitle: 'De kop ID is succesvol bijgewerkt',
          description: 'ID gekopieerd naar klembord:',
        },
      },
    },
    price: {
      label: 'Selecteer een prijs',
    },
  },
};
