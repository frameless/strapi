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
  const badDeveloperResults = groupBy(evaluation.auditSample, (auditSample) => {
    return auditSample.test.id.replace(/^([^:]+):/, (match, match2) => {
      if (evaluation['@context'].hasOwnProperty(match2)) {
        return (evaluation['@context'] as any)[match2];
      } else {
        return match;
      }
    });
  });
  console.log(badDeveloperResults);
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
          <Paragraph>Reported on 55 of 55 WCAG 2.2 AA Success Criteria.</Paragraph>
          <UnorderedList>
            <UnorderedListItem>
              <span>28</span> <span>Passed</span>
            </UnorderedListItem>
            <UnorderedListItem>
              <span>16</span> <span>Failed</span>
            </UnorderedListItem>
            <UnorderedListItem>
              <span>0</span> <span>Cannot tell</span>
            </UnorderedListItem>
            <UnorderedListItem>
              <span>11</span> <span>Not present</span>
            </UnorderedListItem>
            <UnorderedListItem>
              <span>0</span> <span>Not checked</span>
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
                <Paragraph>Gevonden issues:</Paragraph>
                {Array.isArray(badDeveloperResults[url]) && badDeveloperResults[url].length > 0 ? (
                  badDeveloperResults[url].length > 1 ? (
                    <UnorderedList>
                      {badDeveloperResults[url].map((auditSample) => (
                        <UnorderedListItem key={auditSample.id}>
                          <Markdown>{auditSample.result.description}</Markdown>
                        </UnorderedListItem>
                      ))}
                    </UnorderedList>
                  ) : (
                    <Markdown>{badDeveloperResults[url][0].result.description}</Markdown>
                  )
                ) : (
                  <Paragraph>Geen problemen vastgesteld.</Paragraph>
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
