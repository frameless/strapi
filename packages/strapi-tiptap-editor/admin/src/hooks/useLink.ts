import type { Editor as EditorTypes } from '@tiptap/react';
import { useReducer } from 'react';

const types = {
  GET_THE_PREVIOUS_URL: 'GET_THE_PREVIOUS_URL',
  OPEN_LINK_DIALOG: 'OPEN_LINK_DIALOG',
  ON_INPUT_LINK_CHANGE: 'ON_INPUT_LINK_CHANGE',
  ON_CLOSE_LINK_DIALOG: 'ON_CLOSE_LINK_DIALOG',
};

type LinkStateTypes = {
  isVisibleLinkDialog: boolean;
  linkInput: string;
};

type LinkActionTypes = {
  type: string;
  payload: string;
};

export const useLink = (editor: EditorTypes) => {
  const reducer = (state: LinkStateTypes, action: LinkActionTypes) => {
    switch (action.type) {
      case types.GET_THE_PREVIOUS_URL:
        return { ...state, linkInput: action.payload };
      case types.ON_INPUT_LINK_CHANGE:
        return { ...state, linkInput: action.payload };
      case types.ON_CLOSE_LINK_DIALOG:
        return { ...state, linkInput: '', isVisibleLinkDialog: false };
      case types.OPEN_LINK_DIALOG:
        return { ...state, isVisibleLinkDialog: true };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, { isVisibleLinkDialog: false, linkInput: '' });

  const openLinkDialog = () => {
    const previousUrl = editor.getAttributes('link').href;

    // Update fields before showing dialog
    if (previousUrl) dispatch({ type: types.GET_THE_PREVIOUS_URL, payload: previousUrl });

    dispatch({ type: types.OPEN_LINK_DIALOG, payload: '' });
  };

  const onInsertLink = () => {
    // empty
    if (state.linkInput === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      dispatch({ type: types.ON_CLOSE_LINK_DIALOG, payload: '' });
    } else {
      // update link
      editor.chain().focus().extendMarkRange('link').setLink({ href: state.linkInput }).run();
      dispatch({ type: types.ON_CLOSE_LINK_DIALOG, payload: '' });
    }
  };

  const onCloseLinkDialog = () => {
    dispatch({ type: types.ON_CLOSE_LINK_DIALOG, payload: '' });
  };

  const onLinkUrlInputChange = (inputText: string) => {
    dispatch({ type: types.ON_INPUT_LINK_CHANGE, payload: inputText });
  };

  return {
    isVisibleLinkDialog: state.isVisibleLinkDialog,
    linkInput: state.linkInput,
    openLinkDialog,
    onInsertLink,
    onLinkUrlInputChange,
    onCloseLinkDialog,
  };
};
