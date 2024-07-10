/* eslint-disable @next/next/no-head-element */
/* eslint-disable react/no-unescaped-entities */
import {
  Article,
  DataBadge,
  DataList,
  DataListItem,
  DataListKey,
  DataListValue,
  FormField,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  HeadingGroup,
  Link,
  LinkList,
  LinkListLink,
  Paragraph,
  PreHeading,
  SpotlightSection,
  UnorderedList,
  UnorderedListItem,
} from '@utrecht/component-library-react';
import { groupBy } from 'lodash';
import { Markdown, UtrechtIconChevronRight } from '@/components';
import { wcagIntro } from './intro';
import { successCriteria, successCriteriaMap } from './wcag22';
import wcagJSON from '../../../wcag-evaluation.json';
import { DigiToegankelijkStatus } from '../DigiToegankelijkStatus';
type WcagEmJson = typeof wcagJSON;

interface WcagSpotlightSectionProps {
  sc: string;
  nldesignsystem?: boolean;
  title: string;
}
const WcagSpotlightSection = ({ sc, nldesignsystem, title }: WcagSpotlightSectionProps) => {
  return (
    <SpotlightSection type="info">
      {sc in wcagIntro && <Markdown>{wcagIntro[sc]}</Markdown>}
      {nldesignsystem && (
        <>
          <Paragraph>Lees meer bij NL Design System:</Paragraph>
          <LinkList>
            <LinkListLink icon={<UtrechtIconChevronRight />} href={`https://nldesignsystem.nl/wcag/${sc}`} external>
              WCAG-succescriteria uitgelegd: {title}
            </LinkListLink>
          </LinkList>
        </>
      )}
    </SpotlightSection>
  );
};

const technologyUrls: { [index: string]: string } = {
  HTML: 'https://html.spec.whatwg.org/',
  CSS: 'https://www.w3.org/Style/CSS/Overview.en.html',
  JavaScript: 'https://ecma-international.org/publications-and-standards/standards/ecma-262/',
  'WAI-ARIA': 'https://www.w3.org/TR/wai-aria/',
  'NL Design System': 'https://nldesignsystem.nl/',
  'Next.js': 'https://nextjs.org',
  SVG: 'https://www.w3.org/TR/SVG2/',
  React: 'https://react.dev/',
};

const TechnologyLink = ({ technology }: { technology: string }) =>
  typeof technology === 'string' && technology in technologyUrls ? (
    <Link href={technologyUrls[technology]} external>
      {technology}
    </Link>
  ) : (
    <span>{technology}</span>
  );

export const AuditRapport = ({ evaluation }: { evaluation: WcagEmJson }) => {
  const badDeveloperResults: DeveloperResults = groupBy(evaluation.auditSample, (auditSample: any) => {
    return auditSample.test.id.replace(/^([^:]+):/, (match: string, match2: string) => {
      if (Object.prototype.hasOwnProperty.call(evaluation['@context'], match2)) {
        return evaluation['@context'][match2 as keyof (typeof evaluation)['@context']];
      } else {
        return match;
      }
    });
  });

  interface Outcome {
    id?: string;
    title: string;
    // 'Passed' | 'Failed' | 'Not present' | 'Cannot tell' | 'Not checked';
  }

  interface Result {
    outcome: Outcome;
    description: string;
  }

  interface Assertion {
    type: string;
    date: string;
    mode: Record<string, unknown>;
    result: Result;
    subject: Record<string, unknown>;
    test: Record<string, unknown>;
  }

  interface DeveloperResults {
    [url: string]: Assertion[];
  }
  interface OutcomeCounts {
    Passed: number;
    Failed: number;
    'Not present': number;
    'Cannot tell': number;
    'Not checked': number;
  }
  const countOutcomes = (results: DeveloperResults): OutcomeCounts => {
    return Object.values(results)
      .flat()
      .reduce(
        (acc: OutcomeCounts, item: Assertion) => {
          const outcome = item.result.outcome.title;
          acc[outcome as keyof typeof outcomeCounts] = (acc[outcome as keyof typeof outcomeCounts] || 0) + 1;
          return acc;
        },
        { Passed: 0, Failed: 0, 'Not present': 0, 'Cannot tell': 0, 'Not checked': 0 },
      );
  };
  const outcomeCounts = countOutcomes(badDeveloperResults);
  const totalSummary = outcomeCounts.Passed + outcomeCounts.Failed + outcomeCounts['Not present'];

  const titleMapping = {
    Passed: 'Geslaagd',
    Failed: 'Niet goed genoeg',
    'Not present': 'Niet aanwezig',
    'Cannot tell': 'Kan niet worden vastgesteld',
    'Not checked': 'Niet gecontroleerd',
  };

  return (
    <>
      <main className="utrecht-audit-report">
        <Article>
          <HeadingGroup>
            <Heading1>Toegankelijkheidsrapport</Heading1>
            <Paragraph>
              {evaluation.reportFindings.evaluator} voor {evaluation.reportFindings.commissioner}
              {' — '}
              {new Intl.DateTimeFormat('nl-NL', {
                dateStyle: 'full',
                timeZone: 'Europe/Amsterdam',
              }).format(new Date(evaluation.reportFindings.date['@value']))}
            </Paragraph>
          </HeadingGroup>
          <Paragraph>
            <DigiToegankelijkStatus
              criteriaTested={50}
              criteriaFailed={16}
              evaluationDate={new Date(evaluation.reportFindings.date['@value']).toISOString()}
              renderDate={new Date().toISOString()}
            ></DigiToegankelijkStatus>
          </Paragraph>
          <section>
            <Heading2>Samenvatting</Heading2>
            <div>
              <Paragraph>
                <Markdown>{evaluation.reportFindings.summary}</Markdown>
              </Paragraph>
            </div>
          </section>
          <section>
            <Heading2>De steekproef</Heading2>
            <Paragraph>
              De volgende {evaluation.selectSample.structuredSample.length} pagina's zijn onderzocht op
              toegankelijkheid:
            </Paragraph>
            <UnorderedList>
              {evaluation.selectSample.structuredSample.map(({ description, id, title }) => (
                <UnorderedListItem key={id}>
                  <Link href={description} external>
                    {title}
                  </Link>
                </UnorderedListItem>
              ))}
            </UnorderedList>
          </section>
          <section>
            <Heading2>Gevonden problemen</Heading2>
            <Paragraph>
              De website werkt op bepaalde pagina's niet goed genoeg. Voor de volgende criteria zijn nog verbeteringen
              nodig:
            </Paragraph>
            <UnorderedList>
              {Object.entries(badDeveloperResults)
                .filter(([, samples]) => samples.some((sample) => sample.result.outcome.id === 'earl:failed'))
                .map(([url]) => {
                  const data = successCriteriaMap.get(url);
                  if (data) {
                    const {
                      sc,
                      nl: { title },
                    } = data;
                    return (
                      <UnorderedListItem key={url}>
                        <Link href={`#sc-${sc}`} external>
                          {title}
                        </Link>
                      </UnorderedListItem>
                    );
                  }
                  return null;
                })}
            </UnorderedList>
          </section>
          <section>
            <Heading2>Alle resultaten</Heading2>
            <section hidden>
              <Heading3>Samenvatting</Heading3>
              <Paragraph>Reported on {totalSummary} of 55 WCAG 2.2 AA Success Criteria.</Paragraph>
              <UnorderedList>
                <UnorderedListItem>
                  <span>{outcomeCounts.Passed}</span> <span>geslaagd</span>
                </UnorderedListItem>
                <UnorderedListItem>
                  <span>{outcomeCounts.Failed}</span> <span>gefaald</span>
                </UnorderedListItem>
                <UnorderedListItem>
                  <span>{outcomeCounts['Cannot tell']}</span> <span>geen uitsluitsel</span>
                </UnorderedListItem>
                <UnorderedListItem>
                  <span>{outcomeCounts['Not present']}</span> <span>niet aangetroffen</span>
                </UnorderedListItem>
                <UnorderedListItem>
                  <span>{outcomeCounts['Not checked']}</span> <span>niet onderzocht</span>
                </UnorderedListItem>
              </UnorderedList>
            </section>
            <section>
              {/* <Heading3>Alle resultaten</Heading3> */}
              {successCriteria
                .map((sc) => ({
                  ...sc,
                  fragment: new URL(sc.url).hash.replace(/^#/, ''),
                }))
                .filter(({ conformance }) => conformance !== 'AAA')
                .filter(({ since }) => since !== 'WCAG22')
                .map(({ sc, fragment, nl: { title }, url, conformance, nldesignsystem }) => (
                  <section id={`sc-${sc}`} key={sc}>
                    <HeadingGroup id={fragment} className="utrecht-heading-group--level-4">
                      <Heading level={4} appearance="utrecht-heading-3">
                        {title}
                      </Heading>
                      <PreHeading>
                        Succescriterium {sc} <DataBadge>{conformance}</DataBadge>
                      </PreHeading>
                    </HeadingGroup>
                    {Array.isArray(badDeveloperResults[url]) && badDeveloperResults[url].length > 0 ? (
                      badDeveloperResults[url].length > 1 ? (
                        <FormField invalid>
                          <Paragraph>Gevonden issues:</Paragraph>
                          <UnorderedList>
                            {badDeveloperResults[url].map((auditSample, index) => (
                              <UnorderedListItem key={index}>
                                <Paragraph>
                                  {
                                    titleMapping[
                                      badDeveloperResults[url][0].result.outcome.title as keyof typeof titleMapping
                                    ]
                                  }
                                </Paragraph>
                                <Markdown>{auditSample.result.description}</Markdown>
                              </UnorderedListItem>
                            ))}
                          </UnorderedList>
                        </FormField>
                      ) : (
                        <div>
                          <Paragraph>
                            {
                              titleMapping[
                                badDeveloperResults[url][0].result.outcome.title as keyof typeof titleMapping
                              ]
                            }
                            .
                          </Paragraph>

                          {badDeveloperResults[url][0].result.outcome.title === 'Failed' ? (
                            <FormField invalid>
                              <Paragraph>Gevonden issue:</Paragraph>
                              <Markdown>{badDeveloperResults[url][0].result.description}</Markdown>
                            </FormField>
                          ) : null}
                        </div>
                      )
                    ) : (
                      <Paragraph>Geen problemen vastgesteld.</Paragraph>
                    )}

                    <WcagSpotlightSection sc={sc} title={title} nldesignsystem={nldesignsystem} />
                  </section>
                ))}
            </section>
          </section>
          <section>
            <Heading2>Gebruikte technieken</Heading2>
            <Paragraph>De volgende technieken zijn gebruikt om de website mee te maken:</Paragraph>
            <UnorderedList>
              {evaluation.exploreTarget.technologiesReliedUpon.sort().map((i) => (
                <UnorderedListItem key={i}>
                  <TechnologyLink technology={i} />
                </UnorderedListItem>
              ))}
            </UnorderedList>
          </section>
          <section>
            <Heading2>Over de evaluatie</Heading2>
            <DataList>
              <DataListItem>
                <DataListKey>Onderzoeker</DataListKey>
                <DataListValue>{evaluation.reportFindings.evaluator}</DataListValue>
              </DataListItem>
              <DataListItem>
                <DataListKey>Opdrachtgever</DataListKey>
                <DataListValue>{evaluation.reportFindings.commissioner}</DataListValue>
              </DataListItem>
              <DataListItem>
                <DataListKey>Evaluatiedatum</DataListKey>
                <DataListValue>
                  {new Intl.DateTimeFormat('nl-NL', {
                    dateStyle: 'full',
                    timeZone: 'Europe/Amsterdam',
                  }).format(new Date(evaluation.reportFindings.date['@value']))}
                </DataListValue>
              </DataListItem>
            </DataList>
            <section>
              <Heading3>Uitgangspunten</Heading3>
              <DataList>
                <DataListItem>
                  <DataListKey>Scope van het onderzoek</DataListKey>
                  <DataListValue>{evaluation.defineScope.scope.description}</DataListValue>
                </DataListItem>
                <DataListItem>
                  <DataListKey>WCAG-versie</DataListKey>
                  <DataListValue>{evaluation.defineScope.wcagVersion}</DataListValue>
                </DataListItem>
                <DataListItem>
                  <DataListKey>Doel WCAG niveau</DataListKey>
                  <DataListValue>{evaluation.defineScope.conformanceTarget}</DataListValue>
                </DataListItem>
                <DataListItem>
                  <DataListKey>Basiseisen voor een toegankelijke ervaring</DataListKey>
                  <DataListValue>{evaluation.defineScope.accessibilitySupportBaseline}</DataListValue>
                </DataListItem>
                <DataListItem>
                  <DataListKey>Aanvullende afspraken</DataListKey>
                  <DataListValue>{evaluation.defineScope.additionalEvaluationRequirements}</DataListValue>
                </DataListItem>
              </DataList>
            </section>
            <section>
              <Heading3>Bijzonderheden</Heading3>
              <Paragraph>{evaluation.reportFindings.evaluationSpecifics}</Paragraph>
            </section>
          </section>
        </Article>
      </main>
    </>
  );
};
