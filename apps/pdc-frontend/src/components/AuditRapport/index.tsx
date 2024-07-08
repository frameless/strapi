/* eslint-disable @next/next/no-head-element */
import {
  DataList,
  DataListItem,
  DataListKey,
  DataListValue,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Link,
  OrderedList,
  OrderedListItem,
  Paragraph,
  UnorderedList,
  UnorderedListItem,
  URLData,
} from '@utrecht/component-library-react';
import { groupBy } from 'lodash';
import { Markdown } from '@/components';
import { successCriteria } from './wcag22';
import wcagJSON from '../../../wcag-evaluation.json';
type WcagEmJson = typeof wcagJSON;

export const AuditRapport = ({ evaluation }: { evaluation: WcagEmJson }) => {
  const badDeveloperResults: DeveloperResults = groupBy(evaluation.auditSample, (auditSample: AuditSample) => {
    return auditSample.test.id.replace(/^([^:]+):/, (match: string, match2: string) => {
      if (evaluation['@context'].hasOwnProperty(match2)) {
        return evaluation['@context'][match2];
      } else {
        return match;
      }
    });
  });
  console.log(badDeveloperResults);
  interface Outcome {
    title: 'Passed' | 'Failed' | 'Not present' | 'Cannot tell' | 'Not checked';
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
          acc[outcome] = (acc[outcome] || 0) + 1;
          return acc;
        },
        { Passed: 0, Failed: 0, 'Not present': 0, 'Cannot tell': 0, 'Not checked': 0 },
      );
  };
  const outcomeCounts = countOutcomes(badDeveloperResults);
  const totalSummary = outcomeCounts.Passed + outcomeCounts.Failed + outcomeCounts['Not present'];

  const titleMapping = {
    Passed: 'Geslaagd',
    Failed: 'Gefaald',
    'Not present': 'Niet aangetroffen',
    'Cannot tell': 'Geen uitsluitsel',
    'Not checked': 'Niet onderzocht',
  };

  return (
    <>
      {/* <CodeBlock>{JSON.stringify(badDeveloperResults, null, 2)}</CodeBlock> */}
      <div>
        {' '}
        <main>
          <Heading1>Toegankelijkheidsevaluatierapport</Heading1>
          <div>
            <Heading2>Over de Evaluatie</Heading2>
            <DataList>
              <DataListItem>
                <DataListKey>Rapportmaker</DataListKey>
                <DataListValue>{evaluation.reportFindings.evaluator}</DataListValue>
              </DataListItem>
              <DataListItem>
                <DataListKey>Opdrachtgever Evaluatie</DataListKey>
                <DataListValue>{evaluation.reportFindings.commissioner}</DataListValue>
              </DataListItem>
              <DataListItem>
                <DataListKey>Evaluatiedatum</DataListKey>
                <DataListValue>{evaluation.reportFindings.date['@value']}</DataListValue>
              </DataListItem>
            </DataList>
          </div>
          <div>
            <Heading2>Samenvatting</Heading2>
            <div>
              <Paragraph>{evaluation.reportFindings.summary}</Paragraph>
            </div>
          </div>
          <div>
            <Heading2>Scope of the Evaluation</Heading2>
            <DataList>
              <DataListItem>
                <DataListKey>Website name</DataListKey>
                <DataListValue>{evaluation.defineScope.scope.title}</DataListValue>
              </DataListItem>
              <DataListItem>
                <DataListKey>Scope of the website</DataListKey>
                <DataListValue>{evaluation.defineScope.scope.description}</DataListValue>
              </DataListItem>
              <DataListItem>
                <DataListKey>WCAG Version</DataListKey>
                <DataListValue>{evaluation.defineScope.wcagVersion}</DataListValue>
              </DataListItem>
              <DataListItem>
                <DataListKey>Conformance target</DataListKey>
                <DataListValue>{evaluation.defineScope.conformanceTarget}</DataListValue>
              </DataListItem>
              <DataListItem>
                <DataListKey>Accessibility support baseline</DataListKey>
                <DataListValue>{evaluation.defineScope.accessibilitySupportBaseline}</DataListValue>
              </DataListItem>
              <DataListItem>
                <DataListKey>Additional evaluation requirements</DataListKey>
                <DataListValue>{evaluation.defineScope.additionalEvaluationRequirements}</DataListValue>
              </DataListItem>
            </DataList>
          </div>
          <Heading2>Detailed Audit Results</Heading2>
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
          <Heading3>All Results</Heading3>
          {successCriteria
            .map((sc) => ({
              ...sc,
              fragment: new URL(sc.url).hash.replace(/^#/, ''),
            }))
            .map(({ sc, fragment, title, url }) => (
              <section id={fragment} key={sc}>
                <Heading4>
                  {sc} {title}
                </Heading4>
                {Array.isArray(badDeveloperResults[url]) && badDeveloperResults[url].length > 0 ? (
                  badDeveloperResults[url].length > 1 ? (
                    <div>
                      <Paragraph>Gevonden issues:</Paragraph>
                      <UnorderedList>
                        {badDeveloperResults[url].map((auditSample) => (
                          <UnorderedListItem key={auditSample.test.id}>
                            <Paragraph>{titleMapping[badDeveloperResults[url][0].result.outcome.title]}</Paragraph>
                            <Markdown>{auditSample.result.description}</Markdown>
                          </UnorderedListItem>
                        ))}
                      </UnorderedList>
                    </div>
                  ) : (
                    <div>
                      <Paragraph>
                        <strong>{titleMapping[badDeveloperResults[url][0].result.outcome.title]}.</strong>
                      </Paragraph>

                      {badDeveloperResults[url][0].result.outcome.title == 'Failed' ? (
                        <div>
                          <Paragraph>Gevonden issue:</Paragraph>
                          <Markdown>{badDeveloperResults[url][0].result.description}</Markdown>
                        </div>
                      ) : null}
                    </div>
                  )
                ) : (
                  <Paragraph>
                    <strong>Geen problemen vastgesteld.</strong>
                  </Paragraph>
                )}

                <Paragraph>
                  Lees meer bij NL Design System:&nbsp;
                  <Link href={`https://nldesignsystem.nl/wcag/${sc}`} external>
                    WCAG 2.2 {sc} {title}
                  </Link>
                </Paragraph>
              </section>
            ))}

          <Heading2>Deze pagina&apos;s zijn onderzocht:</Heading2>
          <OrderedList>
            {evaluation.selectSample.structuredSample.map(({ description, id, title }) => (
              <OrderedListItem key={id}>
                <Link href={description} external>
                  {title}
                </Link>
              </OrderedListItem>
            ))}
          </OrderedList>

          <Heading2>Web Technologie</Heading2>
          <UnorderedList>
            {evaluation.exploreTarget.technologiesReliedUpon.map((i) => (
              <UnorderedListItem key={i}>{i}</UnorderedListItem>
            ))}
          </UnorderedList>

          <Heading2>Bijzonderheden</Heading2>
          <Paragraph>{evaluation.reportFindings.evaluationSpecifics}</Paragraph>
        </main>
      </div>
    </>
  );
};
