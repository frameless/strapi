const jsdom = require("jsdom");

const products = [
  {
    meta: {
      identifier: "http://owc-pdc.test/onderwerp/test-pdc-item",
      title: "Test PDC item",
      language: "nl",
      type: "productbeschrijving",
      modified: "2018-04-16",
      spatial: {
        schemaX: "{http://standaarden.overheid.nl/owms/terms/}Gemeente",
        schema: "overheid:Gemeente",
        identifier: "http://standaarden.overheid.nl/owms/terms/Buren_(gemeente)",
        label: "Buren",
      },
      authority: {
        schemeX: "{http://standaarden.overheid.nl/owms/terms/}Gemeente",
        scheme: "overheid:Gemeente",
        identifier: "http://standaarden.overheid.nl/owms/terms/Buren_(gemeente)",
        label: "Buren",
      },
      audiences: [
        {
          schemeX: "{http://standaarden.overheid.nl/owms/terms/}Doelgroep",
          scheme: "overheid:Doelgroep",
          identifier: null,
          label: "particulier",
        },
        {
          schemeX: "{http://standaarden.overheid.nl/owms/terms/}Doelgroep",
          scheme: "overheid:Doelgroep",
          identifier: null,
          label: "ondernemer",
        },
      ],
      productId: "5",
      onlineAanvragen: "digid",
      abstract: "test content",
    },
  },
];

const productsToXML = (products) => {
  const { JSDOM } = jsdom;
  const dom = new JSDOM(
    `<overheidproduct:scproducten
     xmlns:dcterms="http://purl.org/dc/terms/"
     xmlns:overheid="http://standaarden.overheid.nl/owms/terms/"
     xmlns:overheidproduct="http://standaarden.overheid.nl/product/terms/" />`,
    {
      url: "https://example.org/",
      contentType: "application/xml",
    }
  );

  const { window } = dom;
  const { document } = window;

  const XMLNS_DCTERMS = "http://purl.org/dc/terms/";
  const XMLNS_OVERHEIDSC = "http://standaarden.overheid.nl/product/terms/";

  products
    .map((product) => {
      const productEl = document.createElementNS(XMLNS_OVERHEIDSC, "overheidproduct:scproduct");
      productEl.setAttribute("owms-version", "4.0");

      const metaEl = document.createElementNS(XMLNS_OVERHEIDSC, "overheidproduct:meta");
      productEl.appendChild(metaEl);

      const owmsKernEl = document.createElementNS(XMLNS_OVERHEIDSC, "overheidproduct:owmskern");
      metaEl.appendChild(owmsKernEl);

      const owmsMantelEl = document.createElementNS(XMLNS_OVERHEIDSC, "overheidproduct:owmsmantel");
      metaEl.appendChild(owmsMantelEl);

      const scMetaEl = document.createElementNS(XMLNS_OVERHEIDSC, "overheidproduct:scmeta");
      metaEl.appendChild(scMetaEl);

      const bodyEl = document.createElementNS(XMLNS_OVERHEIDSC, "overheidproduct:body");
      productEl.appendChild(bodyEl);

      if (product.meta.identifier) {
        const element = document.createElementNS(XMLNS_DCTERMS, "dcterms:identifier");
        element.textContent = String(product.meta.identifier);
        owmsKernEl.appendChild(element);
      }

      if (product.meta.title) {
        const element = document.createElementNS(XMLNS_DCTERMS, "dcterms:title");
        element.textContent = String(product.meta.title);
        owmsKernEl.appendChild(element);
      }

      if (product.meta.language) {
        const element = document.createElementNS(XMLNS_DCTERMS, "dcterms:language");
        element.textContent = String(product.meta.language);
        owmsKernEl.appendChild(element);
      }

      const type = "productbeschrijving";
      if (type) {
        const element = document.createElementNS(XMLNS_DCTERMS, "dcterms:type");
        element.setAttribute("scheme", "overheid:Informatietype");
        element.textContent = type;
        element.appendChild(element);
      }

      if (product.meta.modified) {
        const element = document.createElementNS(XMLNS_DCTERMS, "dcterms:modified");
        element.textContent = String(product.meta.modified);
        owmsKernEl.appendChild(element);
      }
      if (product.meta.spatial) {
        const element = document.createElementNS(XMLNS_DCTERMS, "dcterms:spatial");
        if (product.meta.spatial.scheme) {
          element.setAttribute("scheme", product.meta.spatial.scheme);
        }
        if (product.meta.spatial.identifier) {
          element.setAttribute("resourceIdentifier", product.meta.spatial.identifier);
        }
        if (product.meta.spatial.label) {
          element.textContent = product.meta.spatial.label;
        }
        owmsKernEl.appendChild(element);
      }
      if (product.meta.authority) {
        const element = document.createElementNS(XMLNS_DCTERMS, "overheid:authority");
        if (product.meta.authority.scheme) {
          element.setAttribute("scheme", product.meta.authority.scheme);
        }
        if (product.meta.authority.identifier) {
          element.setAttribute("resourceIdentifier", product.meta.authority.identifier);
        }
        if (product.meta.authority.label) {
          element.textContent = product.meta.authority.label;
        }
        owmsKernEl.appendChild(element);
      }
      if (Array.isArray(product.meta.audiences)) {
        product.meta.audiences
          .map(({ scheme, schemeX, identifier, label }) => {
            const element = document.createElementNS(XMLNS_DCTERMS, "dcterms:audience");
            if (scheme) {
              element.setAttribute("scheme", scheme);
            }
            // TODO: Parse `schemeX`, use `lookupPrefix(namespaceURI)` to obtain prefix
            // and generate `"overheid:Doelgroep"`.
            if (label) {
              element.textContent = label;
            }
            if (identifier) {
              element.setAttribute("resourceIdentifier", identifier);
            }
            return element;
          })
          .forEach((el) => owmsMantelEl.appendChild(el));
      }

      if (product.meta.abstract) {
        const element = document.createElementNS(XMLNS_DCTERMS, "dcterms:abstract");
        element.textContent = String(product.meta.abstract);
        owmsKernEl.appendChild(element);
      }

      if (product.meta.productId) {
        const element = document.createElementNS(XMLNS_OVERHEIDSC, "overheidproduct:productID");
        element.textContent = String(product.meta.productId);
        scMetaEl.appendChild(element);
      }
      if (product.meta.onlineAanvragen) {
        const element = document.createElementNS(XMLNS_OVERHEIDSC, "overheidproduct:onlineAanvragen");
        element.textContent = String(product.meta.onlineAanvragen);
        scMetaEl.appendChild(element);
      }

      return productEl;
    })
    .forEach((el) => document.documentElement.appendChild(el));

  return dom.serialize();
};

process.stdout.write(productsToXML(products));
