import { RefObject, useEffect } from 'react';

export const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void) => {
  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
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
