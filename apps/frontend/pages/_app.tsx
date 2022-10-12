import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React from "react";
import "@utrecht/component-library-css";
import "@utrecht/design-tokens/dist/index.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const dir = locale === "ar" ? "rtl" : "ltr";

  React.useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  return (
    <div className="utrecht-theme">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
