/* eslint-disable no-param-reassign */
import produce from 'immer';
import { RESOLVE_CONFIG } from '../constants';

interface ConfigState {
  isLoading: boolean;
  config: Record<string, unknown>;
}

interface ResolveConfigAction {
  type: typeof RESOLVE_CONFIG;
  data: Record<string, unknown>;
}

type ConfigAction = ResolveConfigAction;

const initialState: ConfigState = {
  isLoading: true,
  config: {},
};

const configReducer = produce((state: ConfigState = initialState, action: ConfigAction) => {
  switch (action.type) {
    case RESOLVE_CONFIG: {
      state.isLoading = false;
      state.config = action.data;
      break;
    }

    default:
      return state;
  }

  return state;
});

export default configReducer;
