import { RefObject, useEffect } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLDialogElement>,
  prevFocusableElement?: RefObject<HTMLButtonElement>,
) => {
  const handleClickOutside = (event: any) => {
    if (ref.current && ref.current === event.target) {
      ref.current.close();
      if (prevFocusableElement) {
        prevFocusableElement.current?.focus();
      } else {
        (document.activeElement as HTMLElement).focus();
      }
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      handleClickOutside(event);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);
};
