import React, { ChangeEventHandler, FormEventHandler } from "react";
import classNames from "classnames";
import { UnorderedList, Link as UtrechtLink, UnorderedListItem, Heading4 } from "@utrecht/component-library-react";
import Link from "next/link";
import { SuggestedHits, Suggestions } from "../../types";

export interface SearchBarProps {
  onSearchSubmit?: FormEventHandler<HTMLFormElement>
  onSearchChange?: ChangeEventHandler<HTMLInputElement>
  searchBarValue?: string
  suggestedHits?: SuggestedHits[]
  suggestions?: Suggestions[]
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearchSubmit, onSearchChange, searchBarValue, suggestedHits, suggestions }) =>
(
  <div style={{position: 'relative'}}>
    <form onSubmit={onSearchSubmit} className="utrecht-search-bar" role="search" aria-label="zoeken in Utrecht.nl">
      <input
        type="search"
        className={classNames("utrecht-search-bar__input", "utrecht-textbox", "utrecht-textbox--html-input")}
        name="q"
        autoComplete="off"
        spellCheck="false"
        aria-label="zoektermen"
        onChange={onSearchChange}
        value={searchBarValue}
        required
      />
      <button
        type="submit"
        value="Zoeken"
        className="utrecht-search-bar__button utrecht-button utrecht-button--primary-action"
      >
        Zoeken
      </button>
    </form>
    {suggestedHits &&
      suggestedHits.length > 0 && <div className="utrecht-search-bar__dropdown">
      {suggestions &&
      suggestions.length > 0 && <UnorderedList>
         <Heading4>Bedoelt u:</Heading4>
        {
          suggestions.map(({ text }, index: number) => (
            <UnorderedListItem key={index}>
              <Link href={`/search/?q=${text}`}  passHref>
                <UtrechtLink>
                  {text}
                </UtrechtLink>
              </Link>
            </UnorderedListItem>
          ))}
      </UnorderedList>}
     <UnorderedList >
     <Heading4>Meteen naar:</Heading4>
        {
          suggestedHits.map(({ titleRaw, url }, index: number) => (
            <UnorderedListItem key={index}>
              <Link href={url} passHref>
                <UtrechtLink>
                  {titleRaw}
                </UtrechtLink>
              </Link>
            </UnorderedListItem>
          ))}
      </UnorderedList>
      </div>}
  </div>
)
