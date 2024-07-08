import { TranslateDetail } from './google-translate-event';

export interface CustomEvents extends HTMLElementEventMap {
  utrechtTranslate: CustomEvent<TranslateDetail>;
}

/* CustomEvent unfortunately extends another `Event` interface
 * than the `Event` that `addEventHandler` has.
 * Use type casting as a workaround.
 */
const handleEvent = ((evt: CustomEvent) => {
  // Google Translate doesn't automatically configure the `dir="rtl"` or `dir="ltr"` attribute
  // for translations in the opposite text direction. Perhaps because not all layouts are agnostic to the text direction.
  // Since our CSS is designed to support the various text directions, we can adapt the layout according to the translation.
  if (document.documentElement.dir !== evt.detail.dir) {
    // Check for changes, to reduce the risk of a race condition where this change
    // triggers a new `utrechtTranslate` event.
    document.documentElement.dir = evt.detail.dir;
  }
}) as unknown as EventListener;

export const initGoogleTranslateAdaptation = (doc: Document): (() => void) => {
  doc.documentElement.addEventListener('utrechtTranslate', handleEvent);

  return () => doc.documentElement.removeEventListener('utrechtTranslate', handleEvent);
};
