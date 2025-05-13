import { useEffect } from 'react';

export const useOpenFormsWysiwygStyling = (targetId: string) => {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const target = document.getElementById(targetId);
    if (!target) return undefined;

    const observer = new MutationObserver(() => {
      const wysiwygElements = target.querySelectorAll('.openforms-body--wysiwyg, .openforms-formio-content');

      wysiwygElements.forEach((wysiwygElement) => wysiwygElement.classList.add('utrecht-html'));
    });

    observer.observe(target, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [targetId]);
};
