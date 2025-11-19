import { buildURL } from '@frameless/utils';
import Script from 'next/script';

interface MatomoScriptProps {
  nonce?: string;
}

export const MatomoScript = ({ nonce }: MatomoScriptProps) => {
  const matomoUrl = buildURL({
    env: process.env,
    key: 'MATOMO_HOST',
    isOrigin: true,
  });
  const siteId = process.env.MATOMO_SITE_ID;
  if (!matomoUrl && !siteId) return null;
  return (
    <Script id="matomo-analytics-base" strategy="afterInteractive" nonce={nonce}>
      {`
        var _paq = window._paq = window._paq || [];
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u="${matomoUrl}";
          _paq.push(['setTrackerUrl', u+'matomo.php']);
          _paq.push(['setSiteId', '${siteId}']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();
      `}
    </Script>
  );
};
