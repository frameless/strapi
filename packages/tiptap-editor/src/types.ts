import type { ChangeEvent } from 'react';

export type LanguagesType = {
  name?: string;
  code?: string;
};

export type Price = {
  label?: string;
  value?: number;
  currency?: string;
  uuid: string;
};

export type InputType = {
  label?: string;
  placeholder?: string;
  name?: string;

  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  ariaLabel?: string;
  hint?: string;
  error?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
};
