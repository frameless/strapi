import { useEffect, useRef, useState } from 'react';

export const useDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, showModal] = useState(false);

  const openDialog = () => {
    if (dialogRef.current) {
      showModal(true);
      dialogRef.current.showModal();
    }
  };
  const close = () => {
    if (dialogRef.current) {
      showModal(false);
      dialogRef.current.close();
    }
  };
  // Handle close the dialog when clicking outside
  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (dialogRef.current && dialogRef.current === event.target) {
      dialogRef.current.close();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [dialogRef.current]);
  return { dialogRef, open, openDialog, close };
};
