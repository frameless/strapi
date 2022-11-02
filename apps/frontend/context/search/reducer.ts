import { GET_SEARCH_RESULTS, GET_SEARCH_RESULTS_ERROR, GET_SUGGESTED_SEARCH, GET_SUGGESTED_SEARCH_ERROR } from "../types";
  
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case GET_SEARCH_RESULTS:
        return {
          ...state,
          searchResults: action.payload,
          loading: false,
        }

      case GET_SEARCH_RESULTS_ERROR:
        return {
          ...state,
          error: action.payload,
        }
      case GET_SUGGESTED_SEARCH:
        return {
          ...state,
          suggestedHits: action.payload.hits,
          suggestions: action.payload.suggestions,
          loading: false,
        }

      case GET_SUGGESTED_SEARCH_ERROR:
        return {
          ...state,
          error: action.payload,
        }
      default:
        return state
    }
  }
  
  export default reducer
  