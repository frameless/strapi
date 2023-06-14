'use client';

import { Heading4, UnorderedList, UnorderedListItem } from '@utrecht/component-library-react';
import classNames from 'classnames';
import Link from 'next/link';
import { experimental_useOptimistic as useOptimistic } from 'react';
import React from 'react';
import { SuggestedHits, Suggestions } from '@/types';
export interface SearchBarProps {
  // eslint-disable-next-line no-unused-vars
  onSearchSubmit?: (formData: FormData) => void;
  // eslint-disable-next-line no-unused-vars
  onSearchChange?: (value: string) => Promise<any>;
  searchBarValue?: string;
  suggestedHits?: SuggestedHits[];
  suggestions?: Suggestions[];
  submitButtonText: string;
  inputAriaLabel: string;
  suggestionsTitle: string;
  hitsTitle: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearchSubmit,
  searchBarValue,
  onSearchChange,
  submitButtonText,
  inputAriaLabel,
  suggestionsTitle,
  hitsTitle,
}) => {
  const [optimisticSearchValue, addOptimisticSearchValue] = useOptimistic('', (state: any, newValue: any) => ({
    ...state,
    value: newValue,
    sending: true,
  }));

  const onSearchInputChangedHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchChange) {
      onSearchChange(event.target.value).then((data) => {
        addOptimisticSearchValue(data);
      });
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <form action={onSearchSubmit} className="utrecht-search-bar" role="search" aria-label="zoeken in utrecht.nl">
        <input
          type="search"
          className={classNames('utrecht-search-bar__input', 'utrecht-textbox', 'utrecht-textbox--html-input')}
          name="search"
          autoComplete="off"
          spellCheck="false"
          aria-label={inputAriaLabel}
          onChange={onSearchInputChangedHandler}
          value={searchBarValue}
          required
        />
        <button
          type="submit"
          value={submitButtonText}
          className="utrecht-search-bar__button utrecht-button utrecht-button--primary-action"
        >
          {submitButtonText}
        </button>
      </form>
      {optimisticSearchValue.value && optimisticSearchValue.value?.hits.length > 0 && (
        <div className="utrecht-search-bar__dropdown">
          {optimisticSearchValue.value?.suggestions && optimisticSearchValue.value?.suggestions.length > 0 && (
            <UnorderedList>
              <Heading4>{suggestionsTitle}</Heading4>
              {optimisticSearchValue.value?.suggestions.map(({ text }: any, index: number) => (
                <UnorderedListItem key={index}>
                  <Link className="utrecht-link" href={`/search/?q=${text}`}>
                    {text}
                  </Link>
                </UnorderedListItem>
              ))}
            </UnorderedList>
          )}
          <UnorderedList>
            <Heading4>{hitsTitle}</Heading4>
            {optimisticSearchValue.value?.hits.map(({ titleRaw, url }: any, index: number) => (
              <UnorderedListItem key={index}>
                <Link className="utrecht-link" href={url}>
                  {titleRaw}
                </Link>
              </UnorderedListItem>
            ))}
          </UnorderedList>
        </div>
      )}
    </div>
  );
};
