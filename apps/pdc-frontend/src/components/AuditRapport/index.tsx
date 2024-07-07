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
          <Heading3>Summary</Heading3>
          <Paragraph>Reported on 55 of 55 WCAG 2.2 AA Success Criteria.</Paragraph>
          <ul>
            <li>
              <span>28</span> <span>Passed</span>
            </li>
            <li>
              <span>16</span> <span>Failed</span>
            </li>
            <li>
              <span>0</span> <span>Cannot tell</span>
            </li>
            <li>
              <span>11</span> <span>Not present</span>
            </li>
            <li>
              <span>0</span> <span>Not checked</span>
            </li>
          </ul>
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
                <UnorderedList>
                  {Array.isArray(badDeveloperResults[url])
                    ? badDeveloperResults[url].map((auditSample) => (
                        <UnorderedListItem>
                          <Markdown>{auditSample.result.description}</Markdown>
                        </UnorderedListItem>
                      ))
                    : null}
                </UnorderedList>
                <Paragraph>
                  Lees meer bij NL Design System:
                  <Link href={`https://nldesignsystem.nl/wcag/${sc}`} external>
                    WCAG 2.2 {sc} {title}
                  </Link>
                </Paragraph>
              </section>
            ))}
          <Heading4>1 Perceivable</Heading4>
          <Heading5 id="guideline-11">1.1 Text Alternatives</Heading5>
          <table aria-labelledby="guideline-11">
            <tbody>
              <tr>
                <th scope="col">Success Criterion</th>
                <th scope="col">Result</th>
                <th scope="col">Observations</th>
              </tr>
              <tr>
                <th scope="row" id="criterion-111">
                  1.1.1: Non-text Content
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Failed
                  </Paragraph>
                </td>
                <td>
                  <Paragraph>Observations:</Paragraph>
                  <ul>
                    <li>
                      Issue: Some icon images (DigiD) lack accessible text. The button next to them does not include the
                      information conveyed by the image. The image is ignored by the screenreader, making the button
                      text ("Geef verhuizing door") less understandable for screenreader-only users than for sighted
                      users.
                      <br />
                      Example:
                      <a href="https://loket.digitaal.utrecht.nl/nl/products/verhuizing-doorgeven">
                        Verhuizing doorgeven - Button
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <Heading5 id="guideline-12">1.2 Time-based Media</Heading5>
          <table aria-labelledby="guideline-12">
            <tbody>
              <tr>
                <th scope="col">Success Criterion</th>
                <th scope="col">Result</th>
                <th scope="col">Observations</th>
              </tr>
              <tr>
                <th scope="row" id="criterion-121">
                  1.2.1: Audio-only and Video-only (Prerecorded)
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Not present
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-122">
                  1.2.2: Captions (Prerecorded)
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Not present
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-123">
                  1.2.3: Audio Description or Media Alternative (Prerecorded)
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Not present
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-124">
                  1.2.4: Captions (Live)
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Not present
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-125">
                  1.2.5: Audio Description (Prerecorded)
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Not present
                  </Paragraph>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <Heading5 id="guideline-13">1.3 Adaptable</Heading5>
          <table aria-labelledby="guideline-13">
            <tbody>
              <tr>
                <th scope="col">Success Criterion</th>
                <th scope="col">Result</th>
                <th scope="col">Observations</th>
              </tr>
              <tr>
                <th scope="row" id="criterion-131">
                  1.3.1: Info and Relationships
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-132">
                  1.3.2: Meaningful Sequence
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-133">
                  1.3.3: Sensory Characteristics
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Failed
                  </Paragraph>
                </td>
                <td>
                  <Paragraph>Observations:</Paragraph>
                  <ul>
                    <li>
                      Issue: The meaning of the asterisks next to the input field labels on the form is never defined.
                      Users are left to assume they indicate that the related input field is mandatory.
                      <br />
                      Example:
                      <a href="https://loket.digitaal.utrecht.nl/nl/form/klacht-over-de-gemeente-doorgeven/stap/uw-klacht">
                        Form - Uw Klacht
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th scope="row" id="criterion-134">
                  1.3.4: Orientation
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-135">
                  1.3.5: Identify Input Purpose
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Failed
                  </Paragraph>
                </td>
                <td>
                  <Paragraph>Observations:</Paragraph>
                  <ul>
                    <li>
                      Issue: Not all suitable input fields on the
                      <a href="https://loket.digitaal.utrecht.nl/nl/form/klacht-over-de-gemeente-doorgeven/stap/uw-gegevenscompleet">
                        Uw gegevens
                      </a>
                      page have the autocomplete attribute, preventing the browser from automatically filling them out.
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <Heading5 id="guideline-14">1.4 Distinguishable</Heading5>
          <table aria-labelledby="guideline-14">
            <tbody>
              <tr>
                <th scope="col">Success Criterion</th>
                <th scope="col">Result</th>
                <th scope="col">Observations</th>
              </tr>
              <tr>
                <th scope="row" id="criterion-141">
                  1.4.1: Use of Color
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Failed
                  </Paragraph>
                </td>
                <td>
                  <Paragraph>Observations:</Paragraph>
                  <ul>
                    <li>
                      Issue: The
                      <a href="https://loket.digitaal.utrecht.nl/nl/form/klacht-over-de-gemeente-doorgeven/overzicht">
                        Overzicht (Controleer en Bevestig)
                      </a>
                      page has some required checkboxes with a red border. The color red is the only indicator that the
                      checkbox is invalid.
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th scope="row" id="criterion-142">
                  1.4.2: Audio Control
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Not present
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-143">
                  1.4.3: Contrast (Minimum)
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-144">
                  1.4.4: Resize text
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-145">
                  1.4.5: Images of Text
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Failed
                  </Paragraph>
                </td>
                <td>
                  <Paragraph>Observations:</Paragraph>
                  <ul>
                    <li>
                      Issue: Some icon images (DigiD) lack accessible text. The button next to them does not include the
                      information conveyed by the image. The image is ignored by the screenreader, making the button
                      text ("Geef verhuizing door") less understandable for screenreader-only users than for sighted
                      users.
                      <br />
                      Example:
                      <a href="https://loket.digitaal.utrecht.nl/nl/products/verhuizing-doorgeven">
                        Verhuizing doorgeven - Button
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th scope="row" id="criterion-1410">
                  1.4.10: Reflow
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Failed
                  </Paragraph>
                </td>
                <td>
                  <Paragraph>Observations:</Paragraph>
                  <ul>
                    <li>
                      Issue: The visual order of the 3 buttons ("Tussendoor opslaan", "Volgende", and "Afbreken") and
                      the link ("Vorige") at the bottom of the Main landmark of the form changes depending on the zoom
                      level, resulting in an unexpected tabbing order when zoomed in.
                      <br />
                      Example:
                      <a href="https://loket.digitaal.utrecht.nl/nl/form/klacht-over-de-gemeente-doorgeven/stap/uw-klacht">
                        Uw Klacht
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th scope="row" id="criterion-1411">
                  1.4.11: Non-text Contrast
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-1412">
                  1.4.12: Text Spacing
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-1413">
                  1.4.13: Content on Hover or Focus
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Failed
                  </Paragraph>
                </td>
                <td>
                  <Paragraph>Observations:</Paragraph>
                  <ul>
                    <li>
                      Issue: The content of the tooltips on the form obscures non-decorative content when zoomed in and
                      hovered over. The tooltip content cannot be dismissed by pressing the Escape key.
                      <br />
                      Example:
                      <a href="https://loket.digitaal.utrecht.nl/nl/form/klacht-over-de-gemeente-doorgeven/stap/uw-klacht">
                        Uw Klacht
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <Heading4>2 Operable</Heading4>
          <Heading5 id="guideline-21">2.1 Keyboard Accessible</Heading5>
          <table aria-labelledby="guideline-21">
            <tbody>
              <tr>
                <th scope="col">Success Criterion</th>
                <th scope="col">Result</th>
                <th scope="col">Observations</th>
              </tr>
              <tr>
                <th scope="row" id="criterion-211">
                  2.1.1: Keyboard
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Failed
                  </Paragraph>
                </td>
                <td>
                  <Paragraph>Observations:</Paragraph>
                  <ul>
                    <li>
                      <Paragraph>
                        Issue: The content of the tooltips on the form is not accessible for keyboard-only users (or
                        screenreader users).
                        <br />
                        Example:
                        <a href="https://loket.digitaal.utrecht.nl/nl/form/klacht-over-de-gemeente-doorgeven/stap/uw-klacht">
                          Uw Klacht
                        </a>
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph>
                        Issue: The close button of the "Opslaan en later verdergaan" modal, used to save one's progress
                        on the form, does not allow the keyboard user to focus on it. If no content is filled in and the
                        user presses the "Later verdergaan" button, this button becomes disabled, meaning the user can
                        only close the modal by pressing the Escape key.
                        <br />
                        Example:
                        <a href="https://loket.digitaal.utrecht.nl/nl/form/klacht-over-de-gemeente-doorgeven/stap/uw-klacht">
                          Uw Klacht
                        </a>
                      </Paragraph>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th scope="row" id="criterion-212">
                  2.1.2: No Keyboard Trap
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Failed
                  </Paragraph>
                </td>
                <td>
                  <Paragraph>Observations:</Paragraph>
                  <ul>
                    <li>
                      Issue: The focus on the dropdown menu "Klacht over de gemeente doorgeven" (located in the main
                      landmark of the form), which appears when zoomed in, does not stay contained within itself. When
                      tabbing outside of it, the dropdown menu stays open, obscuring the contents of the page.
                      <br />
                      Example:
                      <a href="https://loket.digitaal.utrecht.nl/nl/form/klacht-over-de-gemeente-doorgeven/stap/uw-gegevenscompleet">
                        Uw gegevens
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th scope="row" id="criterion-214">
                  2.1.4: Character Key Shortcuts
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Not present
                  </Paragraph>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <Heading5 id="guideline-22">2.2 Enough Time</Heading5>
          <table aria-labelledby="guideline-22">
            <tbody>
              <tr>
                <th scope="col">Success Criterion</th>
                <th scope="col">Result</th>
                <th scope="col">Observations</th>
              </tr>
              <tr>
                <th scope="row" id="criterion-221">
                  2.2.1: Timing Adjustable
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-222">
                  2.2.2: Pause, Stop, Hide
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <Heading5 id="guideline-23">2.3 Seizures and Physical Reactions</Heading5>
          <table aria-labelledby="guideline-23">
            <tbody>
              <tr>
                <th scope="col">Success Criterion</th>
                <th scope="col">Result</th>
                <th scope="col">Observations</th>
              </tr>
              <tr>
                <th scope="row" id="criterion-231">
                  2.3.1: Three Flashes or Below Threshold
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Not present
                  </Paragraph>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <Heading5 id="guideline-24">2.4 Navigable</Heading5>
          <table aria-labelledby="guideline-24">
            <tbody>
              <tr>
                <th scope="col">Success Criterion</th>
                <th scope="col">Result</th>
                <th scope="col">Observations</th>
              </tr>
              <tr>
                <th scope="row" id="criterion-241">
                  2.4.1: Bypass Blocks
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-242">
                  2.4.2: Page Titled
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-243">
                  2.4.3: Focus Order
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Failed
                  </Paragraph>
                </td>
                <td>
                  <Paragraph>Observations:</Paragraph>
                  <ul>
                    <li>
                      Issue: The visual order of the 3 buttons ("Tussendoor opslaan", "Volgende", and "Afbreken") and
                      the link ("Vorige") at the bottom of the Main landmark of the form changes depending on the zoom
                      level, resulting in an unexpected tabbing order when zoomed in.
                      <br />
                      Example:
                      <a href="https://loket.digitaal.utrecht.nl/nl/form/klacht-over-de-gemeente-doorgeven/stap/uw-klacht">
                        Uw Klacht
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th scope="row" id="criterion-244">
                  2.4.4: Link Purpose (In Context)
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-245">
                  2.4.5: Multiple Ways
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-246">
                  2.4.6: Headings and Labels
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-247">
                  2.4.7: Focus Visible
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-2411">
                  2.4.11: Focus Not Obscured (Minimum)
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Failed
                  </Paragraph>
                </td>
                <td>
                  <Paragraph>Observations:</Paragraph>
                  <ul>
                    <li>
                      Issue: Due to the lack of a keyboard trap, the dropdown menu "Klacht over de gemeente doorgeven"
                      (located in the main landmark of the form), which appears when zoomed in, can obscure focusable
                      elements.
                      <br />
                      Example:
                      <a href="https://loket.digitaal.utrecht.nl/nl/form/klacht-over-de-gemeente-doorgeven/stap/uw-gegevenscompleet">
                        Uw gegevens
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <Heading5 id="guideline-25">2.5 Input Modalities</Heading5>
          <table aria-labelledby="guideline-25">
            <tbody>
              <tr>
                <th scope="col">Success Criterion</th>
                <th scope="col">Result</th>
                <th scope="col">Observations</th>
              </tr>
              <tr>
                <th scope="row" id="criterion-251">
                  2.5.1: Pointer Gestures
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-252">
                  2.5.2: Pointer Cancellation
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-253">
                  2.5.3: Label in Name
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-254">
                  2.5.4: Motion Actuation
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Not present
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-257">
                  2.5.7: Dragging Movements
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-258">
                  2.5.8: Target Size (Minimum)
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <Heading4>3 Understandable</Heading4>
          <Heading5 id="guideline-31">3.1 Readable</Heading5>
          <table aria-labelledby="guideline-31">
            <tbody>
              <tr>
                <th scope="col">Success Criterion</th>
                <th scope="col">Result</th>
                <th scope="col">Observations</th>
              </tr>
              <tr>
                <th scope="row" id="criterion-311">
                  3.1.1: Language of Page
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-312">
                  3.1.2: Language of Parts
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Failed
                  </Paragraph>
                </td>
                <td>
                  <Paragraph>Observations:</Paragraph>
                  <ul>
                    <li>
                      Issue: The
                      <a href="https://loket.digitaal.utrecht.nl/nl/products/verhuizing-doorgeven">
                        Verhuizing doorgeven
                      </a>
                      page has a link "Read this information in English" with English text that does not have a lang
                      attribute.
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <Heading5 id="guideline-32">3.2 Predictable</Heading5>
          <table aria-labelledby="guideline-32">
            <tbody>
              <tr>
                <th scope="col">Success Criterion</th>
                <th scope="col">Result</th>
                <th scope="col">Observations</th>
              </tr>
              <tr>
                <th scope="row" id="criterion-321">
                  3.2.1: On Focus
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-322">
                  3.2.2: On Input
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-323">
                  3.2.3: Consistent Navigation
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-324">
                  3.2.4: Consistent Identification
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-326">
                  3.2.6: Consistent Help
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <Heading5 id="guideline-33">3.3 Input Assistance</Heading5>
          <table aria-labelledby="guideline-33">
            <tbody>
              <tr>
                <th scope="col">Success Criterion</th>
                <th scope="col">Result</th>
                <th scope="col">Observations</th>
              </tr>
              <tr>
                <th scope="row" id="criterion-331">
                  3.3.1: Error Identification
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Failed
                  </Paragraph>
                </td>
                <td>
                  <Paragraph>Observations:</Paragraph>
                  <ul>
                    <li>
                      <Paragraph>
                        Issue: The error messages for the input fields on the form are inconsistent and incomplete. The
                        input fields on the
                        <a href="https://loket.digitaal.utrecht.nl/nl/form/klacht-over-de-gemeente-doorgeven/stap/uw-gegevenscompleet">
                          Uw gegevens
                        </a>
                        page do not provide enough information about the required data format. Only the "Telefoonnummer"
                        input field offers a helpful error message, but this error message only appears after some
                        numbers are entered in that input field. When the input field is empty, the error message is
                        "Het verplichte veld Telefoonnummer is niet ingevuld."
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph>
                        Issue: An error message is missing for the radio button group (on the first page
                        <a href="https://loket.digitaal.utrecht.nl/nl/form/klacht-over-de-gemeente-doorgeven/stap/uw-klacht">
                          Uw Klacht
                        </a>
                        of the form) when nothing is filled out and the "Volgende" button is clicked. The unhelpful
                        error message ' "null" is een ongeldige keuze. ' appears only if all the other input fields of
                        the page have been filled out and then the user clicks the "Volgende" button.
                      </Paragraph>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      Issue: The error messages are not read by the screenreader. Example:
                      <a href="https://loket.digitaal.utrecht.nl/nl/form/klacht-over-de-gemeente-doorgeven/stap/uw-klacht">
                        Uw Klacht
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th scope="row" id="criterion-332">
                  3.3.2: Labels or Instructions
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Failed
                  </Paragraph>
                </td>
                <td>
                  <Paragraph>Observations:</Paragraph>
                  <ul>
                    <li>
                      <Paragraph>
                        Issue: No text instructions are given at the beginning of the
                        <a href="https://loket.digitaal.utrecht.nl/nl/form/klacht-over-de-gemeente-doorgeven/stap/uw-gegevenscompleet">
                          Uw gegevens
                        </a>
                        page that describe the necessary input for the required input fields and their formatting. For
                        example, the "Telefoonnummer" input field only shows the helpful error message "Dit is geen
                        geldig internationaal telefoonnummer. Een geldig voorbeeld van een internationaal telefoonnummer
                        is +31612312312.Dit is geen geldig Nederlands telefoonnummer. Een geldig voorbeeld van een
                        Nederlands telefoonnummer is 0612312312." if the user writes at least one number inside it. If
                        the input field is empty, the error message is "Het verplichte veld Telefoonnummer is niet
                        ingevuld."
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph>
                        Issue: The Search input field has a label, but the input within it has not. The aria-labelledby
                        attribute in 2 places refers to an element that does not exist on the page.
                        <br />
                        Example:
                        <a href="https://loket.digitaal.utrecht.nl/nl/form/klacht-over-de-gemeente-doorgeven/stap/bijlagen-toevoegen-klacht">
                          Bijlagen toevoegen
                        </a>
                      </Paragraph>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th scope="row" id="criterion-333">
                  3.3.3: Error Suggestion
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Failed
                  </Paragraph>
                </td>
                <td>
                  <Paragraph>Observations:</Paragraph>
                  <ul>
                    <li>
                      Issue: The suggestions for correcting errors are not always adequate. The error message for the
                      radio button group (from the first page
                      <a href="https://loket.digitaal.utrecht.nl/nl/form/klacht-over-de-gemeente-doorgeven/stap/uw-klacht">
                        Uw Klacht
                      </a>
                      of the form) when nothing is filled out and the "Volgende" button is clicked is ' "null" is een
                      ongeldige keuze.'. The error message is only provided if the mandatory input fields on the same
                      page have been filled in. Otherwise, no error message is shown for the mandatory radio button
                      group at all.
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th scope="row" id="criterion-334">
                  3.3.4: Error Prevention (Legal, Financial, Data)
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-337">
                  3.3.7: Redundant Entry
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Not present
                  </Paragraph>
                </td>
                <td></td>
              </tr>
              <tr>
                <th scope="row" id="criterion-338">
                  3.3.8: Accessible Authentication (Minimum)
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Not present
                  </Paragraph>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <Heading4>4 Robust</Heading4>
          <Heading5 id="guideline-41">4.1 Compatible</Heading5>
          <table aria-labelledby="guideline-41">
            <tbody>
              <tr>
                <th scope="col">Success Criterion</th>
                <th scope="col">Result</th>
                <th scope="col">Observations</th>
              </tr>
              <tr>
                <th scope="row" id="criterion-412">
                  4.1.2: Name, Role, Value
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Failed
                  </Paragraph>
                </td>
                <td>
                  <Paragraph>Observations:</Paragraph>
                  <ul>
                    <li>
                      <Paragraph>
                        Issue: The tooltip content on the form obscures non-decorative content when zoomed in and
                        hovered over. The tooltip content cannot be dismissed by pressing the Escape key. Example:
                        <a href="https://loket.digitaal.utrecht.nl/nl/form/klacht-over-de-gemeente-doorgeven/stap/uw-klacht">
                          Uw Klacht
                        </a>
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph>
                        Issue: The content of the tooltips on the form is not accessible for keyboard-only users (or
                        screenreader users).
                        <br />
                        Example:
                        <a href="https://loket.digitaal.utrecht.nl/nl/form/klacht-over-de-gemeente-doorgeven/stap/uw-klacht">
                          Uw Klacht
                        </a>
                      </Paragraph>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th scope="row" id="criterion-413">
                  4.1.3: Status Messages
                </th>
                <td>
                  <Paragraph>
                    <span>Result:</span> Passed
                  </Paragraph>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
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
