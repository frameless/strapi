'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { experimental_useOptimistic as useOptimistic } from 'react';
import React from 'react';
import { useTranslation } from '@/app/i18n/client';
import { Link as UtrechtLink } from '@/components';
import { SuggestedHits, Suggestions } from '@/types';
import { getPathAndSearchParams } from '@/util';
import { UtrechtSearchBar } from '../UtrechtSearchBar';

export interface SearchBarProps {
  // eslint-disable-next-line no-unused-vars
  onSearchSubmit: (formData: FormData, locale: string) => void;
  // eslint-disable-next-line no-unused-vars
  onSearchChange?: (value: string) => Promise<any>;
  suggestedHits?: SuggestedHits[];
  suggestions?: Suggestions[];
  submitButtonText: string;
  suggestionsTitle: string;
  hitsTitle: string;
  locale: string;
}

const itemToString = (item: any) => {
  return item ? item.text || item.titleRaw : '';
};

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearchSubmit,
  onSearchChange,
  submitButtonText,
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
  const { t } = useTranslation(locale, ['common']);
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
  const getSearchSegment = (segment: string) => {
    const { pathSegments } = getPathAndSearchParams({
      translations: t,
      segments: ['segments.search', segment],
      locale,
    });
    return pathSegments;
  };
  const onChange = (selectedItem: any) => {
    if (selectedItem && selectedItem?.type?.toLowerCase() === 'page') {
      push(selectedItem.url);
    } else {
      push(`/${getSearchSegment(selectedItem?.text)}`);
    }
  };

  return (
    <form action={(formData) => onSearchSubmit(formData, locale)} role="search" aria-label="zoeken in utrecht.nl">
      <UtrechtSearchBar
        button={{
          label: submitButtonText,
        }}
        onStateChange={handleStateChange}
        onChange={onChange}
        items={optimisticSearchValue.value}
        input={{
          id: 'search-input',
          name: 'search',
        }}
        itemToString={itemToString}
        renderOptions={(option) => {
          if (option.type === 'page') {
            return <UtrechtLink external href={option.url} dangerouslySetInnerHTML={{ __html: option.title }} />;
          }
          return (
            option?.text && (
              <Link
                className={classNames('utrecht-link', 'utrecht-link--external')}
                href={`/${getSearchSegment(option?.text)}`}
                dangerouslySetInnerHTML={{ __html: option?.text }}
              />
            )
          );
        }}
      />
    </form>
  );
};
