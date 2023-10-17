/* eslint-disable no-unused-vars */
import { ReactNode, Ref } from 'react';

declare module 'react' {
  function experimental_useOptimistic<State>(
    passthrough: State,
  ): [State, (action: State | ((pendingState: State) => State)) => void];
  function experimental_useOptimistic<State, Action>(
    passthrough: State,
    reducer: (state: State, action: Action) => State,
  ): [State, (action: Action) => void];
}
