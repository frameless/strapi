import { useReducer } from 'react';
import Context from './context';
import Reducer from './reducer';
import { GET_PRICE_PRODUCT } from '../types';

const State = (props: any) => {
  const initialState = {
    data: {},
    selectedPrice: {},
  };
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider
      value={{
        data: state.data,
        getPrice: (price) => {
          dispatch({ type: GET_PRICE_PRODUCT, payload: price });
        },
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default State;
