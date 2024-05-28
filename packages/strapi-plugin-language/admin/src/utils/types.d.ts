export type LanguagesType = {
  name?: string;
  code?: string;
};

export type PriceTypes = {
  value: number;
  label: string;
  currency: string;
  id: string;
  uuid?: string;
};

export type PriceListTypes = {
  title: string;
  price: PriceTypes[];
};
