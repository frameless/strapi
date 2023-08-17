'use client';

import { Link as UtrechtLink } from '@utrecht/component-library-react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { experimental_useOptimistic as useOptimistic } from 'react';
import React from 'react';
import { SuggestedHits, Suggestions } from '@/types';
import { UtrechtSearchBar } from '../UtrechtSearchBar';

export interface SearchBarProps {
  // eslint-disable-next-line no-unused-vars
  onSearchSubmit: (formData: FormData, locale: string) => void;
  // eslint-disable-next-line no-unused-vars
  onSearchChange?: (value: string) => Promise<any>;
  suggestedHits?: SuggestedHits[];
  suggestions?: Suggestions[];
  submitButtonText: string;
  inputAriaLabel: string;
  suggestionsTitle: string;
  hitsTitle: string;
  locale: string;
}

const itemToString = (item: any) => {
  return item ? item.text || item.title : '';
};

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearchSubmit,
  onSearchChange,
  submitButtonText,
  inputAriaLabel,
  suggestionsTitle,
  hitsTitle,
  locale,
}) => {
  const [optimisticSearchValue, addOptimisticSearchValue] = useOptimistic('', (state: any, newValue: any) => {
    const results = [
      {
        title: newValue?.suggestions.length > 0 ? suggestionsTitle : undefined,
        list: newValue?.suggestions,
      },
      {
        title: newValue?.hits.length > 0 ? hitsTitle : undefined,
        list: newValue?.hits,
      },
    ];
    return {
      ...state,
      value: newValue.hits.length > 0 || newValue.suggestions.length > 0 ? results : [],
      sending: true,
    };
  });
  const { push } = useRouter();
  const handleStateChange = (changes: any) => {
    if (Object.prototype.hasOwnProperty.call(changes, 'inputValue')) {
      if (onSearchChange) {
        onSearchChange(changes.inputValue).then((data) => {
          addOptimisticSearchValue(data);
        });
      }
    }
  };

  const onChange = (selectedItem: any) => {
    if (selectedItem && selectedItem?.type?.toLowerCase() === 'page') {
      push(selectedItem.url);
    } else {
      push(`/search/${selectedItem?.text}`);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <form
        action={(formData) => onSearchSubmit(formData, locale)}
        className="utrecht-search-bar"
        role="search"
        aria-label="zoeken in utrecht.nl"
      >
        <UtrechtSearchBar
          button={{
            label: submitButtonText,
          }}
          onStateChange={handleStateChange}
          onChange={onChange}
          items={optimisticSearchValue.value}
          input={{
            ariaLabel: inputAriaLabel,
            name: 'search',
            required: true,
          }}
          itemToString={itemToString}
          renderOptions={(option) => {
            if (option.type === 'page') {
              return (
                <UtrechtLink external href={option.url}>
                  {option.title}
                </UtrechtLink>
              );
            }

            return (
              option?.text && (
                <Link className={classNames('utrecht-link', 'utrecht-link--external')} href={`/search/${option?.text}`}>
                  {option?.text}
                </Link>
              )
            );
          }}
        />
      </form>
    </div>
  );
};
