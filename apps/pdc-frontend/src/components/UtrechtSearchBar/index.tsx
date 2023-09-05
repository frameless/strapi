'use client';
import clsx from 'clsx';
import Downshift, { DownshiftProps } from 'downshift';
import React from 'react';
import { Button, Textbox, UnorderedList, UnorderedListItem } from '@/components';

type InputTypes = {
  name?: string;
  placeholder?: string;
  ariaLabel?: string;
  required?: boolean;
  spellCheck?: boolean;
};

type ButtonTypes = {
  label: string;
};

export interface SearchBarProps extends DownshiftProps<any> {
  /**
   * @property
   * `input`:
   * input={{
   * label: string
   * }}
   *
   * */
  input?: InputTypes;
  /**
   * @property
   * `itemToString`:
   *
   * ```ts
   * function(item: any) | defaults to: item => (item ? String(item) : '')
   * ```
   * @description
   * This function responsible for displaying the list item text
   * Example: if your data is an object {name: Python, year: 1990 },
   * you can use just the name as the list item text or you can use them together
   *
   * @example
   * - Return just the name
   * ```ts
   * const itemToString = (item: any) => {
   * return item ? item.name : '';
   * };
   * ```
   * - Return the name, and the year
   * ```ts
   * const itemToString = (item: any) => {
   * return i ? `${i.name} ${i.year}` : '';
   * };
   * ```
   *
   * */
  itemToString: (_item?: any) => string;
  /**
   * @property
   * `items`:
   *
   * ```ts
   * items: [
   *   {
   *     title: string,
   *     list: []
   *   }
   *  ]
   * ```
   * */
  items?: any[];
  /**
   * @property
   * `button`:
   * button={{
   * label: string
   * }}
   *
   * */
  button: ButtonTypes;
  renderOptions?: (_option: any) => React.ReactNode;
}

interface SearchBarDropdownProps {
  children: React.ReactNode;
}

export const SearchBarDropdown: React.FC<SearchBarDropdownProps> = ({ children }) => (
  <div
    className={clsx('utrecht-search-bar__dropdown')}
    style={{ backgroundColor: '#fff' }} // TODO add this css property from the design system
  >
    {children}
  </div>
);

interface SearchBarSectionProps {
  children: React.ReactNode;
  title?: string;
}

export const SearchBarSection: React.FC<SearchBarSectionProps> = ({ children, title }) => (
  <section className={clsx('utrecht-search-bar__section')}>
    {title && <span className={clsx('utrecht-search-bar__section-title')}>{title}</span>}
    {children}
  </section>
);

/**
 * SearchBar
 *  This component extends the [Downshift](https://www.npmjs.com/package/downshift#onstatechange) Component
 *  Thant means you can use `Downshift` props
 */

export const UtrechtSearchBar: React.FC<SearchBarProps> = ({
  itemToString,
  items,
  input,
  button,
  renderOptions,
  ...rest
}) => {
  return (
    <Downshift itemToString={itemToString} {...rest}>
      {({ getInputProps, getItemProps, isOpen, selectedItem, highlightedIndex, getMenuProps }) => (
        <div>
          <div className={clsx('utrecht-search-bar')}>
            <Textbox
              {...getInputProps()}
              placeholder={input?.placeholder}
              required={input?.required}
              name={input?.name}
              type="search"
              aria-label={input?.ariaLabel}
              spellCheck={input?.spellCheck || false}
              className={clsx('utrecht-search-bar__input')}
            />
            <Button type="submit" appearance="primary-action-button" className={clsx('utrecht-search-bar__button')}>
              {button.label}
            </Button>
          </div>
          {(items && items?.length === 0) || !isOpen ? null : (
            <SearchBarDropdown>
              {items &&
                items.reduce(
                  (result: any, section: any, sectionIndex: any) => {
                    result.list.push(
                      <SearchBarSection key={sectionIndex} title={section?.title}>
                        <UnorderedList {...getMenuProps()}>
                          {section.list &&
                            section.list.length > 0 &&
                            section.list?.map((item: any, itemIndex: any) => {
                              const index = result.itemIndex++;
                              return (
                                <UnorderedListItem
                                  className={clsx('utrecht-search-bar__list-item', {
                                    'utrecht-search-bar__list-item--is-active': highlightedIndex === index,
                                    'utrecht-search-bar__list-item--is-selected': selectedItem === item,
                                  })}
                                  key={itemIndex}
                                  {...getItemProps({ item, index })}
                                >
                                  {renderOptions ? renderOptions(item) : itemToString(item)}
                                </UnorderedListItem>
                              );
                            })}
                        </UnorderedList>
                      </SearchBarSection>,
                    );

                    return result;
                  },
                  { list: [], itemIndex: 0 },
                ).list}
            </SearchBarDropdown>
          )}
        </div>
      )}
    </Downshift>
  );
};
