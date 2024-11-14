// Mapping of categories to keys
const categoryToKeyMap: { [key: string]: string } = {
  bewijs: 'bewijs',
  bezwaar: 'bezwaarEnBeroep',
  contact: 'contact',
  kosten: 'kostenEnBetaalmethoden',
  bijzonderheden: 'notice',
  aanvraag: 'procedureBeschrijving',
  inleiding: 'tekst',
  termijn: 'uitersteTermijn',
  voorwaarden: 'vereisten',
  wat_te_doen_bij_geen_reactie: 'wtdBijGeenReactie',
};

// Map content based on category
export const mapContentByCategory = (kennisartikelCategorie?: string | null, content?: string | null) => {
  if (!kennisartikelCategorie || !content) return {};
  const key = categoryToKeyMap[kennisartikelCategorie];
  return key ? { [key]: content } : {};
};