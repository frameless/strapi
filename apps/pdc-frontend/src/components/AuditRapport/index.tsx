/* eslint-disable @next/next/no-head-element */
import { Heading1, OrderedList, OrderedListItem, URLData } from '@utrecht/component-library-react';
import wcagJSON from '../../../wcag-evaluation.json';

type WcagEmJson = typeof wcagJSON;

export const AuditRapport = ({ evaluation }: { evaluation: WcagEmJson }) => (
  <>
    <Heading1>Toegankelijkheid van ...</Heading1>
    <OrderedList>
      {evaluation.selectSample.structuredSample.map(({ description, id, title }) => (
        <OrderedListItem key={id}>
          {title}: <URLData>{description}</URLData>
        </OrderedListItem>
      ))}
    </OrderedList>
  </>
);
