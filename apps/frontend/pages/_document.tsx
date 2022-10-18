import Document, { Html, Main, NextScript, Head, DocumentContext } from "next/document";
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx?.locale };
  }
  render() {
    const { locale } = this.props.__NEXT_DATA__;
    return (
      <Html dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
