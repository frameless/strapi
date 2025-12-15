import type { Attribute, Schema } from '@strapi/strapi';

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::api-token', 'oneToOne', 'admin::user'> & Attribute.Private;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    expiresAt: Attribute.DateTime;
    lastUsedAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<'admin::api-token', 'oneToMany', 'admin::api-token-permission'>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::api-token', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::api-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private;
    token: Attribute.Relation<'admin::api-token-permission', 'manyToOne', 'admin::api-token'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::api-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::permission', 'oneToOne', 'admin::user'> & Attribute.Private;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::permission', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> & Attribute.Private;
    description: Attribute.String;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<'admin::role', 'oneToMany', 'admin::permission'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> & Attribute.Private;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::transfer-token', 'oneToOne', 'admin::user'> & Attribute.Private;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    expiresAt: Attribute.DateTime;
    lastUsedAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<'admin::transfer-token', 'oneToMany', 'admin::transfer-token-permission'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::transfer-token', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::transfer-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private;
    token: Attribute.Relation<'admin::transfer-token-permission', 'manyToOne', 'admin::transfer-token'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::transfer-token-permission', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> & Attribute.Private;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Attribute.String;
    registrationToken: Attribute.String & Attribute.Private;
    resetPasswordToken: Attribute.String & Attribute.Private;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> & Attribute.Private;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> & Attribute.Private;
    username: Attribute.String;
  };
}

export interface ApiAdditionalInformationAdditionalInformation extends Schema.CollectionType {
  collectionName: 'additional_informations';
  info: {
    description: '';
    displayName: 'Aanvullende informatie ';
    pluralName: 'additional-informations';
    singularName: 'additional-information';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Attribute.Component<'components.additional-information-field'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::additional-information.additional-information', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    product: Attribute.Relation<
      'api::additional-information.additional-information',
      'oneToOne',
      'api::product.product'
    >;
    publishedAt: Attribute.DateTime;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::additional-information.additional-information', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiContactInformationInternalContactInformationInternal extends Schema.CollectionType {
  collectionName: 'contact_info_internal';
  info: {
    description: '';
    displayName: 'Contact information (intern)';
    pluralName: 'contact-information-internals';
    singularName: 'contact-information-internal';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    contentBlock: Attribute.Component<'components.contact-information-rich-text', true>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact-information-internal.contact-information-internal',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    internal_information: Attribute.Relation<
      'api::contact-information-internal.contact-information-internal',
      'oneToMany',
      'api::internal-field.internal-field'
    >;
    publishedAt: Attribute.DateTime;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::contact-information-internal.contact-information-internal',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    vacs: Attribute.Relation<
      'api::contact-information-internal.contact-information-internal',
      'oneToMany',
      'api::vac.vac'
    >;
  };
}

export interface ApiContactInformationPublicContactInformationPublic extends Schema.CollectionType {
  collectionName: 'contact_info_public';
  info: {
    description: '';
    displayName: 'Contact informatie (openbaar)';
    pluralName: 'contact-information-publics';
    singularName: 'contact-information-public';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    contentBlock: Attribute.Component<'components.contact-information-rich-text', true>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact-information-public.contact-information-public',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    internal_information: Attribute.Relation<
      'api::contact-information-public.contact-information-public',
      'oneToMany',
      'api::internal-field.internal-field'
    >;
    products: Attribute.Relation<
      'api::contact-information-public.contact-information-public',
      'oneToMany',
      'api::product.product'
    >;
    publishedAt: Attribute.DateTime;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::contact-information-public.contact-information-public',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    vacs: Attribute.Relation<'api::contact-information-public.contact-information-public', 'oneToMany', 'api::vac.vac'>;
  };
}

export interface ApiInternalFieldInternalField extends Schema.CollectionType {
  collectionName: 'internal_fields';
  info: {
    description: '';
    displayName: 'Interne informatie';
    pluralName: 'internal-fields';
    singularName: 'internal-field';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    contact_information_internal: Attribute.Relation<
      'api::internal-field.internal-field',
      'manyToOne',
      'api::contact-information-internal.contact-information-internal'
    >;
    contact_information_public: Attribute.Relation<
      'api::internal-field.internal-field',
      'manyToOne',
      'api::contact-information-public.contact-information-public'
    >;
    content: Attribute.Component<'components.internal-field'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::internal-field.internal-field', 'oneToOne', 'admin::user'> & Attribute.Private;
    product: Attribute.Relation<'api::internal-field.internal-field', 'oneToOne', 'api::product.product'>;
    publishedAt: Attribute.DateTime;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::internal-field.internal-field', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiNotFoundPageNotFoundPage extends Schema.SingleType {
  collectionName: 'not_found_pages';
  info: {
    description: '';
    displayName: 'Not Found Page';
    pluralName: 'not-found-pages';
    singularName: 'not-found-page';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    body: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::not-found-page.not-found-page', 'oneToOne', 'admin::user'> & Attribute.Private;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::not-found-page.not-found-page',
      'oneToMany',
      'api::not-found-page.not-found-page'
    >;
    publishedAt: Attribute.DateTime;
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::not-found-page.not-found-page', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiOpenFormsErrorPageOpenFormsErrorPage extends Schema.CollectionType {
  collectionName: 'open_forms_error_pages';
  info: {
    description: '';
    displayName: 'Open forms Error page';
    pluralName: 'open-forms-error-pages';
    singularName: 'open-forms-error-page';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    body: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::open-forms-error-page.open-forms-error-page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::open-forms-error-page.open-forms-error-page',
      'oneToMany',
      'api::open-forms-error-page.open-forms-error-page'
    >;
    publishedAt: Attribute.DateTime;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    type: Attribute.Enumeration<['form_not_found', 'form_server_is_offline']> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::open-forms-error-page.open-forms-error-page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiPdcCategoryPdcCategory extends Schema.CollectionType {
  collectionName: 'pdc_categories';
  info: {
    description: '';
    displayName: 'Categorie';
    pluralName: 'pdc-categories';
    singularName: 'pdc-category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::pdc-category.pdc-category', 'oneToOne', 'admin::user'> & Attribute.Private;
    pdc_subcategories: Attribute.Relation<
      'api::pdc-category.pdc-category',
      'oneToMany',
      'api::pdc-subcategory.pdc-subcategory'
    >;
    publishedAt: Attribute.DateTime;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::pdc-category.pdc-category', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiPdcFaqPdcFaq extends Schema.CollectionType {
  collectionName: 'pdc_faqs';
  info: {
    displayName: 'FAQ (PDC)';
    pluralName: 'pdc-faqs';
    singularName: 'pdc-faq';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::pdc-faq.pdc-faq', 'oneToOne', 'admin::user'> & Attribute.Private;
    faq: Attribute.Component<'components.utrecht-accordion-section', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locale: Attribute.String;
    localizations: Attribute.Relation<'api::pdc-faq.pdc-faq', 'oneToMany', 'api::pdc-faq.pdc-faq'>;
    publishedAt: Attribute.DateTime;
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::pdc-faq.pdc-faq', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiPdcHomePagePdcHomePage extends Schema.SingleType {
  collectionName: 'pdc_home_pages';
  info: {
    description: '';
    displayName: 'Home Page (PDC)';
    pluralName: 'pdc-home-pages';
    singularName: 'pdc-home-page';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    components: Attribute.DynamicZone<['components.utrecht-top-tasks']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::pdc-home-page.pdc-home-page', 'oneToOne', 'admin::user'> & Attribute.Private;
    locale: Attribute.String;
    localizations: Attribute.Relation<
      'api::pdc-home-page.pdc-home-page',
      'oneToMany',
      'api::pdc-home-page.pdc-home-page'
    >;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::pdc-home-page.pdc-home-page', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiPdcSubcategoryPdcSubcategory extends Schema.CollectionType {
  collectionName: 'pdc_subcategories';
  info: {
    description: '';
    displayName: 'Subcategorie';
    pluralName: 'pdc-subcategories';
    singularName: 'pdc-subcategory';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::pdc-subcategory.pdc-subcategory', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    pdc_category: Attribute.Relation<
      'api::pdc-subcategory.pdc-subcategory',
      'manyToOne',
      'api::pdc-category.pdc-category'
    >;
    products: Attribute.Relation<'api::pdc-subcategory.pdc-subcategory', 'manyToMany', 'api::product.product'>;
    publishedAt: Attribute.DateTime;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::pdc-subcategory.pdc-subcategory', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    vacs: Attribute.Relation<'api::pdc-subcategory.pdc-subcategory', 'manyToMany', 'api::vac.vac'>;
  };
}

export interface ApiPdcTemplatePdcTemplate extends Schema.SingleType {
  collectionName: 'pdc_templates';
  info: {
    description: '';
    displayName: 'Template (PDC)';
    pluralName: 'pdc-templates';
    singularName: 'pdc-template';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::pdc-template.pdc-template', 'oneToOne', 'admin::user'> & Attribute.Private;
    locale: Attribute.String;
    localizations: Attribute.Relation<'api::pdc-template.pdc-template', 'oneToMany', 'api::pdc-template.pdc-template'>;
    publishedAt: Attribute.DateTime;
    sections: Attribute.DynamicZone<['components.utrecht-navigation', 'components.utrecht-footer']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::pdc-template.pdc-template', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface ApiPricePrice extends Schema.CollectionType {
  collectionName: 'prices';
  info: {
    description: '';
    displayName: 'Price';
    pluralName: 'prices';
    singularName: 'price';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::price.price', 'oneToOne', 'admin::user'> & Attribute.Private;
    price: Attribute.Component<'components.price', true>;
    products: Attribute.Relation<'api::price.price', 'oneToMany', 'api::product.product'>;
    publishedAt: Attribute.DateTime;
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::price.price', 'oneToOne', 'admin::user'> & Attribute.Private;
    uuid: Attribute.String & Attribute.CustomField<'plugin::uuid-field.uuid-field'>;
  };
}

export interface ApiProductProduct extends Schema.CollectionType {
  collectionName: 'products';
  info: {
    description: '';
    displayName: 'Product';
    pluralName: 'products';
    singularName: 'product';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    additional_information: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'api::additional-information.additional-information'
    >;
    catalogiMeta: Attribute.Component<'components.catalogi-meta'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    contact_information_public: Attribute.Relation<
      'api::product.product',
      'manyToOne',
      'api::contact-information-public.contact-information-public'
    >;
    content: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::product.product', 'oneToOne', 'admin::user'> & Attribute.Private;
    enable_kcm_survey: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.DefaultTo<true>;
    kennisartikelMetadata: Attribute.Component<'components.kennisartikel'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    locale: Attribute.String;
    localizations: Attribute.Relation<'api::product.product', 'oneToMany', 'api::product.product'>;
    metadata: Attribute.Component<'components.metadata'> &
      Attribute.Private &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    metaTags: Attribute.Component<'seo.meta'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    oldSlugs: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    pdc_metadata: Attribute.Component<'components.cim-pdc-product-metadata'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    pdc_subcategories: Attribute.Relation<'api::product.product', 'manyToMany', 'api::pdc-subcategory.pdc-subcategory'>;
    price: Attribute.Relation<'api::product.product', 'manyToOne', 'api::price.price'>;
    productencatalogus: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'api::productencatalogus.productencatalogus'
    >;
    publishedAt: Attribute.DateTime;
    sections: Attribute.DynamicZone<
      [
        'components.utrecht-rich-text',
        'components.utrecht-logo-button',
        'components.utrecht-spotlight',
        'components.faq',
        'components.utrecht-multi-columns-button',
        'components.utrecht-accordion',
        'components.utrecht-image',
        'components.utrecht-link',
        'components.internal-block-content',
        'components.flo-legal-form',
        'components.contact-information-public',
      ]
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::product.product', 'oneToOne', 'admin::user'> & Attribute.Private;
    uuid: Attribute.String &
      Attribute.CustomField<'plugin::uuid-field.uuid-field'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    vacs: Attribute.Relation<'api::product.product', 'manyToOne', 'api::vac.vac'>;
  };
}

export interface ApiProductencatalogusProductencatalogus extends Schema.CollectionType {
  collectionName: 'productencataloguses';
  info: {
    description: '';
    displayName: 'Productencatalogus';
    pluralName: 'productencataloguses';
    singularName: 'productencatalogus';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    begindatumVersie: Attribute.Date & Attribute.Required;
    beherendeOrganisatie: Attribute.String;
    contactpersoonBeheerEmail: Attribute.String;
    contactpersoonBeheerNaam: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::productencatalogus.productencatalogus', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    doelgroep: Attribute.Enumeration<
      ['bedrijven en instellingen\t', 'burgers\t', 'samenwerkingspartners\t', 'interne organisatie']
    > &
      Attribute.Required;
    domein: Attribute.String & Attribute.Required;
    naam: Attribute.String & Attribute.Required & Attribute.Unique;
    organisatieIdentificatie: Attribute.String;
    producten: Attribute.Relation<'api::productencatalogus.productencatalogus', 'oneToOne', 'api::product.product'>;
    publishedAt: Attribute.DateTime;
    referentieCatalogus: Attribute.Relation<
      'api::productencatalogus.productencatalogus',
      'oneToMany',
      'api::productencatalogus.productencatalogus'
    >;
    referentiePDC: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
    toelichting: Attribute.Text;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::productencatalogus.productencatalogus', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    versie: Attribute.String & Attribute.Required;
  };
}

export interface ApiVacVac extends Schema.CollectionType {
  collectionName: 'vacs';
  info: {
    description: '';
    displayName: 'VAC';
    pluralName: 'vacs';
    singularName: 'vac';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    contact_information_internal: Attribute.Relation<
      'api::vac.vac',
      'manyToOne',
      'api::contact-information-internal.contact-information-internal'
    >;
    contact_information_public: Attribute.Relation<
      'api::vac.vac',
      'manyToOne',
      'api::contact-information-public.contact-information-public'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::vac.vac', 'oneToOne', 'admin::user'> & Attribute.Private;
    publishedAt: Attribute.DateTime;
    relatedProducts: Attribute.Relation<'api::vac.vac', 'oneToMany', 'api::product.product'>;
    relatedVACs: Attribute.Relation<'api::vac.vac', 'oneToMany', 'api::vac.vac'>;
    subcategories: Attribute.Relation<'api::vac.vac', 'manyToMany', 'api::pdc-subcategory.pdc-subcategory'>;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::vac.vac', 'oneToOne', 'admin::user'> & Attribute.Private;
    vac: Attribute.Component<'components.vac'>;
  };
}

export interface ApiWebsiteSettingWebsiteSetting extends Schema.SingleType {
  collectionName: 'website_settings';
  info: {
    description: '';
    displayName: 'Website-instellingen';
    pluralName: 'website-settings';
    singularName: 'website-setting';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::website-setting.website-setting', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    publishedAt: Attribute.DateTime;
    triggerMatomoScript: Attribute.Component<'components.trigger-matomo-script'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::website-setting.website-setting', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::content-releases.release', 'oneToOne', 'admin::user'> & Attribute.Private;
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    status: Attribute.Enumeration<['ready', 'blocked', 'failed', 'done', 'empty']> & Attribute.Required;
    timezone: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'plugin::content-releases.release', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::content-releases.release-action', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    entry: Attribute.Relation<'plugin::content-releases.release-action', 'morphToOne'>;
    isEntryValid: Attribute.Boolean;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'plugin::content-releases.release-action', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface PluginEntityNotesNote extends Schema.CollectionType {
  collectionName: 'notes';
  info: {
    displayName: 'notes';
    pluralName: 'notes';
    singularName: 'note';
  };
  options: {
    comment: '';
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    content: Attribute.Text;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::entity-notes.note', 'oneToOne', 'admin::user'> & Attribute.Private;
    entityId: Attribute.Integer;
    entitySlug: Attribute.String;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'plugin::entity-notes.note', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::i18n.locale', 'oneToOne', 'admin::user'> & Attribute.Private;
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'plugin::i18n.locale', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface PluginPublisherAction extends Schema.CollectionType {
  collectionName: 'actions';
  info: {
    displayName: 'actions';
    pluralName: 'actions';
    singularName: 'action';
  };
  options: {
    comment: '';
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::publisher.action', 'oneToOne', 'admin::user'> & Attribute.Private;
    entityId: Attribute.Integer;
    entitySlug: Attribute.String;
    executeAt: Attribute.DateTime;
    mode: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'plugin::publisher.action', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface PluginSlugifySlug extends Schema.CollectionType {
  collectionName: 'slugs';
  info: {
    displayName: 'slug';
    pluralName: 'slugs';
    singularName: 'slug';
  };
  options: {
    comment: '';
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    count: Attribute.Integer;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::slugify.slug', 'oneToOne', 'admin::user'> & Attribute.Private;
    slug: Attribute.Text;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'plugin::slugify.slug', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Attribute.String;
    caption: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::upload.file', 'oneToOne', 'admin::user'> & Attribute.Private;
    ext: Attribute.String;
    folder: Attribute.Relation<'plugin::upload.file', 'manyToOne', 'plugin::upload.folder'> & Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    height: Attribute.Integer;
    mime: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    size: Attribute.Decimal & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'plugin::upload.file', 'oneToOne', 'admin::user'> & Attribute.Private;
    url: Attribute.String & Attribute.Required;
    width: Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Attribute.Relation<'plugin::upload.folder', 'oneToMany', 'plugin::upload.folder'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::upload.folder', 'oneToOne', 'admin::user'> & Attribute.Private;
    files: Attribute.Relation<'plugin::upload.folder', 'oneToMany', 'plugin::upload.file'>;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    parent: Attribute.Relation<'plugin::upload.folder', 'manyToOne', 'plugin::upload.folder'>;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'plugin::upload.folder', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::users-permissions.permission', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    role: Attribute.Relation<'plugin::users-permissions.permission', 'manyToOne', 'plugin::users-permissions.role'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'plugin::users-permissions.permission', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> & Attribute.Private;
    description: Attribute.String;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    type: Attribute.String & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> & Attribute.Private;
    users: Attribute.Relation<'plugin::users-permissions.role', 'oneToMany', 'plugin::users-permissions.user'>;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> & Attribute.Private;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    resetPasswordToken: Attribute.String & Attribute.Private;
    role: Attribute.Relation<'plugin::users-permissions.user', 'manyToOne', 'plugin::users-permissions.role'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> & Attribute.Private;
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::additional-information.additional-information': ApiAdditionalInformationAdditionalInformation;
      'api::contact-information-internal.contact-information-internal': ApiContactInformationInternalContactInformationInternal;
      'api::contact-information-public.contact-information-public': ApiContactInformationPublicContactInformationPublic;
      'api::internal-field.internal-field': ApiInternalFieldInternalField;
      'api::not-found-page.not-found-page': ApiNotFoundPageNotFoundPage;
      'api::open-forms-error-page.open-forms-error-page': ApiOpenFormsErrorPageOpenFormsErrorPage;
      'api::pdc-category.pdc-category': ApiPdcCategoryPdcCategory;
      'api::pdc-faq.pdc-faq': ApiPdcFaqPdcFaq;
      'api::pdc-home-page.pdc-home-page': ApiPdcHomePagePdcHomePage;
      'api::pdc-subcategory.pdc-subcategory': ApiPdcSubcategoryPdcSubcategory;
      'api::pdc-template.pdc-template': ApiPdcTemplatePdcTemplate;
      'api::price.price': ApiPricePrice;
      'api::product.product': ApiProductProduct;
      'api::productencatalogus.productencatalogus': ApiProductencatalogusProductencatalogus;
      'api::vac.vac': ApiVacVac;
      'api::website-setting.website-setting': ApiWebsiteSettingWebsiteSetting;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::entity-notes.note': PluginEntityNotesNote;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::publisher.action': PluginPublisherAction;
      'plugin::slugify.slug': PluginSlugifySlug;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
