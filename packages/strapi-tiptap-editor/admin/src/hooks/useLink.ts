import type { Editor as EditorTypes } from '@tiptap/react';
import { useReducer } from 'react';
import { isValidURL } from '../../../utils/helpers';

// Define ActionTypes enum
enum ActionTypes {
  GET_THE_PREVIOUS_URL = 'GET_THE_PREVIOUS_URL',
  ON_INPUT_LINK_CHANGE = 'ON_INPUT_LINK_CHANGE',
  ON_CLOSE_LINK_DIALOG = 'ON_CLOSE_LINK_DIALOG',
  OPEN_LINK_DIALOG = 'OPEN_LINK_DIALOG',
  GET_ERROR = 'GET_ERROR',
}

// Define Action types
interface GetPreviousUrlAction {
  type: ActionTypes.GET_THE_PREVIOUS_URL;
  payload: string;
}

interface OnInputLinkChangeAction {
  type: ActionTypes.ON_INPUT_LINK_CHANGE;
  payload: string;
}

interface OnCloseLinkDialogAction {
  type: ActionTypes.ON_CLOSE_LINK_DIALOG;
}

interface OpenLinkDialogAction {
  type: ActionTypes.OPEN_LINK_DIALOG;
}

interface GetErrorAction {
  type: ActionTypes.GET_ERROR;
  payload: string;
}

type LinkActionTypes =
  | GetPreviousUrlAction
  | OnInputLinkChangeAction
  | OnCloseLinkDialogAction
  | OpenLinkDialogAction
  | GetErrorAction;

// Define State type
interface LinkStateTypes {
  isVisibleLinkDialog: boolean;
  linkInput: string;
  error: string;
}

// Define LinkInputValue type
export interface LinkInputValue {
  url: string;
  anchor: string;
}

export const useLink = (editor: EditorTypes) => {
  const reducer = (state: LinkStateTypes, action: LinkActionTypes): LinkStateTypes => {
    switch (action.type) {
      case ActionTypes.GET_THE_PREVIOUS_URL:
        return {
          ...state,
          linkInput: action.payload,
          error: '',
        };
      case ActionTypes.ON_INPUT_LINK_CHANGE:
        return { ...state, linkInput: action.payload, error: '' };
      case ActionTypes.ON_CLOSE_LINK_DIALOG:
        return { ...state, linkInput: '', isVisibleLinkDialog: false, error: '' };
      case ActionTypes.OPEN_LINK_DIALOG:
        return {
          ...state,
          isVisibleLinkDialog: true,
          error: '',
        };
      case ActionTypes.GET_ERROR:
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };

  const initialState: LinkStateTypes = {
    isVisibleLinkDialog: false,
    linkInput: '',
    error: '',
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const openLinkDialog = () => {
    const previousUrl = editor.getAttributes('link').href;

    // Update fields before showing dialog
    if (previousUrl) dispatch({ type: ActionTypes.GET_THE_PREVIOUS_URL, payload: previousUrl });

    dispatch({ type: ActionTypes.OPEN_LINK_DIALOG });
  };

  const onInsertLink = () => {
    if (state.linkInput === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      onCloseLinkDialog();
    } else if (!isValidURL(state.linkInput)) {
      dispatch({ type: ActionTypes.GET_ERROR, payload: 'invalid-protocol' });
    } else {
      // Update link
      editor.chain().focus().extendMarkRange('link').setLink({ href: state.linkInput }).run();
      onCloseLinkDialog();
    }
  };

  const onCloseLinkDialog = () => dispatch({ type: ActionTypes.ON_CLOSE_LINK_DIALOG });
  const onLinkUrlInputChange = (value: string) => dispatch({ type: ActionTypes.ON_INPUT_LINK_CHANGE, payload: value });

  return {
    isVisibleLinkDialog: state.isVisibleLinkDialog,
    linkInput: state.linkInput,
    error: state.error,
    openLinkDialog,
    onInsertLink,
    onLinkUrlInputChange,
    onCloseLinkDialog,
  };
};
