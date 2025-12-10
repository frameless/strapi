import type { Attribute, Schema } from "@strapi/strapi";

export interface ComponentsContactInformationPublic extends Schema.Component {
  collectionName: "contact_info_public_comp";
  info: {
    displayName: "Contact informatie (Openbaar)";
  };
  attributes: {
    contact_information_public: Attribute.Relation<
      "components.contact-information-public",
      "oneToOne",
      "api::contact-information-public.contact-information-public"
    >;
  };
}

export interface ComponentsInternalBlockContent extends Schema.Component {
  collectionName: "internal_block_contents";
  info: {
    displayName: "Interne informatie";
  };
  attributes: {
    internal_field: Attribute.Relation<
      "components.internal-block-content",
      "oneToOne",
      "api::internal-field.internal-field"
    >;
  };
}

export interface ComponentsUtrechtAccordion extends Schema.Component {
  collectionName: "components_utrecht_accordions";
  info: {
    displayName: "Utrecht Accordion";
  };
  attributes: {
    item: Attribute.Component<"components.utrecht-accordion-item", true>;
  };
}

export interface ComponentsUtrechtAccordionItem extends Schema.Component {
  collectionName: "components_utrecht_accordion_items";
  info: {
    displayName: "Accordion Item";
  };
  attributes: {
    label: Attribute.String;
    body: Attribute.RichText;
  };
}

export interface ComponentsUtrechtImage extends Schema.Component {
  collectionName: "components_utrecht_images";
  info: {
    displayName: "Utrecht Image";
  };
  attributes: {
    imageData: Attribute.Media;
  };
}

export interface ComponentsUtrechtLink extends Schema.Component {
  collectionName: "components_utrecht_links";
  info: {
    displayName: "Utrecht Link";
  };
  attributes: {
    href: Attribute.String;
    textContent: Attribute.String;
    icon: Attribute.String;
    language: Attribute.String;
  };
}

export interface ComponentsUtrechtLogoButton extends Schema.Component {
  collectionName: "components_utrecht_logo_buttons";
  info: {
    displayName: "Utrecht Logo Button";
  };
  attributes: {
    href: Attribute.String;
    label: Attribute.String;
    textContent: Attribute.String;
    appearance: Attribute.String;
    logo: Attribute.String;
    openFormsEmbed: Attribute.String;
  };
}

export interface ComponentsUtrechtMultiColumnsButton extends Schema.Component {
  collectionName: "components_utrecht_multi_columns_buttons";
  info: {
    displayName: "Utrecht Multi Columns Button";
  };
  attributes: {
    column: Attribute.Component<"components.utrecht-column", true>;
  };
}

export interface ComponentsUtrechtColumn extends Schema.Component {
  collectionName: "components_utrecht_columns";
  info: {
    displayName: "Column";
  };
  attributes: {
    title: Attribute.String;
    logoButton: Attribute.Component<"components.utrecht-logo-button", true>;
  };
}

export interface ComponentsUtrechtRichText extends Schema.Component {
  collectionName: "components_utrecht_rich_texts";
  info: {
    displayName: "Utrecht Rich Text";
  };
  attributes: {
    content: Attribute.RichText;
    kennisartikelCategorie: Attribute.String;
  };
}

export interface ComponentsUtrechtSpotlight extends Schema.Component {
  collectionName: "components_utrecht_spotlights";
  info: {
    displayName: "Utrecht Spotlight";
  };
  attributes: {
    type: Attribute.String;
    content: Attribute.RichText;
    logoButton: Attribute.Component<"components.utrecht-logo-button", true>;
  };
}

declare module "@strapi/types" {
  export module Shared {
    export interface Components {
      "components.contact-information-public": ComponentsContactInformationPublic;
      "components.internal-block-content": ComponentsInternalBlockContent;
      "components.utrecht-accordion": ComponentsUtrechtAccordion;
      "components.utrecht-accordion-item": ComponentsUtrechtAccordionItem;
      "components.utrecht-image": ComponentsUtrechtImage;
      "components.utrecht-link": ComponentsUtrechtLink;
      "components.utrecht-logo-button": ComponentsUtrechtLogoButton;
      "components.utrecht-multi-columns-button": ComponentsUtrechtMultiColumnsButton;
      "components.utrecht-column": ComponentsUtrechtColumn;
      "components.utrecht-rich-text": ComponentsUtrechtRichText;
      "components.utrecht-spotlight": ComponentsUtrechtSpotlight;
    }
  }
}
