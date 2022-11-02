import React, { useReducer, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Context from "./context";
import Reducer from "./reducer";
import {
  GET_SEARCH_RESULTS,
  GET_SEARCH_RESULTS_ERROR,
  GET_SUGGESTED_SEARCH,
  GET_SUGGESTED_SEARCH_ERROR,
} from "../types";

const State = (props: any) => {
  const initialState = {
    searchResults: [],
    suggestedHits: [],
    suggestions: [],
    loading: true,
    error: null,
    query: "",
    setQuery: () => {},
  };

  const [state, dispatch] = useReducer(Reducer, initialState);
  const [query, setQuery] = useState(initialState.query);
  const { push } = useRouter();
  const getSearchResult = async (locale: string, currentQuery?: string) => {
    try {
      const res = await axios.get(
        `https://public.pandosearch.com/products.utrecht.nl-${locale}/search?q=${encodeURIComponent(
          currentQuery ? currentQuery : query
        )}&track=false`
      );
      dispatch({ type: GET_SEARCH_RESULTS, payload: res.data });
      if (query) {
        push(`/search/?q=${encodeURIComponent(query)}`);
      }
    } catch (error) {
      dispatch({
        type: GET_SEARCH_RESULTS_ERROR,
        payload: error,
      });
    }
  };

  const getSuggestedSearch = async (locale: string, currentQuery?: string) => {
    try {
      const res = await axios.get(
        `https://public.pandosearch.com/products.utrecht.nl-${locale}/suggest?track=false&q=${encodeURIComponent(
          currentQuery ? currentQuery : query
        )}`
      );
      dispatch({ type: GET_SUGGESTED_SEARCH, payload: res.data });
    } catch (error) {
      dispatch({
        type: GET_SUGGESTED_SEARCH_ERROR,
        payload: error,
      });
    }
  };

  return (
    <Context.Provider
      value={{
        searchResults: state.searchResults,
        error: state.error,
        suggestedHits: state.suggestedHits,
        suggestions: state.suggestions,
        loading: state.loading,
        getSearchResult,
        getSuggestedSearch,
        query,
        setQuery,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default State;
