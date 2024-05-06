'use clint';

import Script from 'next/script';
import type { ScriptProps } from 'next/script';

type MatomoTagManagerTypes = {
  [key: string]: any;
};
declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    _mtm: MatomoTagManagerTypes;
  }
}

interface MatomoTagManagerProps extends ScriptProps {}

export const MatomoTagManager = ({ nonce, ...restProps }: MatomoTagManagerProps) => (
  <Script
    id="_next-matomo"
    nonce={nonce}
    onLoad={() => {
      // initializes the Matomo Tag Manager array
      const _mtm = (window._mtm = window._mtm || []);
      _mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' });
    }}
    {...restProps}
  />
);
