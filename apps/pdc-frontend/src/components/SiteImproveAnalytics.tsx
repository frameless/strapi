import Script from 'next/script';
import type { ScriptProps } from 'next/script';

interface SiteImproveAnalyticsProps extends ScriptProps {}

export const SiteImproveAnalytics = ({ nonce, ...restProps }: SiteImproveAnalyticsProps) => (
  <Script src="https://siteimproveanalytics.com/js/siteanalyze_6006206.js" nonce={nonce} {...restProps} />
);
