interface BuildAlternateLinksProps {
  segment?: string;
  languages: string[];
}
export const buildAlternateLinks = ({ segment, languages }: BuildAlternateLinksProps): Record<string, string> =>
  languages.reduce(
    (languageLinks, language) => ({
      ...languageLinks,
      [language]: segment,
    }),
    {},
  );
