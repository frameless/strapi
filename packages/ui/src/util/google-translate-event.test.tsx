import { initGoogleTranslateEvent } from './google-translate-event';
import '@testing-library/jest-dom';

describe('Google Translate event', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('class');
    document.documentElement.removeAttribute('dir');
  });

  it('dispatches an `utrechtTranslate` event when the `translated-rtl` class name is set', async () => {
    const doc = document;

    const handleEvent = jest.fn();

    doc.documentElement.addEventListener('utrechtTranslate', handleEvent, true);

    const destroyEvent = initGoogleTranslateEvent(doc);

    doc.documentElement.classList.add('translated-rtl');

    jest.useFakeTimers();
    await jest.runAllTimersAsync();

    expect(handleEvent).toHaveBeenCalled();

    destroyEvent();
  });

  it('dispatches only an event when the details have changed', async () => {
    const doc = document;

    const handleEvent = jest.fn();

    doc.documentElement.addEventListener('utrechtTranslate', handleEvent, true);

    const destroyEvent = initGoogleTranslateEvent(doc);

    // First change
    expect(handleEvent).toHaveBeenCalledTimes(0);
    doc.documentElement.className = 'translated-rtl';

    jest.useFakeTimers();
    await jest.runAllTimersAsync();
    expect(handleEvent).toHaveBeenCalledTimes(1);

    // No change
    doc.documentElement.className = 'translated-rtl';

    jest.useFakeTimers();
    await jest.runAllTimersAsync();

    expect(handleEvent).toHaveBeenCalledTimes(1);

    // Second change

    doc.documentElement.className = 'translated-ltr';

    jest.useFakeTimers();
    await jest.runAllTimersAsync();

    expect(handleEvent).toHaveBeenCalledTimes(2);

    destroyEvent();
  });

  it('dispatches an `utrechtTranslate` event when the `lang` attribute name is set', async () => {
    const doc = document;

    const handleEvent = jest.fn();

    doc.documentElement.addEventListener('utrechtTranslate', handleEvent, true);

    const destroyEvent = initGoogleTranslateEvent(doc);

    doc.documentElement.lang = 'nl';

    jest.useFakeTimers();
    await jest.runAllTimersAsync();

    expect(handleEvent).toHaveBeenCalled();

    destroyEvent();
  });

  it('dispatches an `utrechtTranslate` event with details of the language and text direction', async () => {
    const doc = document;

    const handleEvent = jest.fn();

    doc.documentElement.addEventListener('utrechtTranslate', handleEvent, true);

    const destroyEvent = initGoogleTranslateEvent(doc);

    doc.documentElement.dir = 'rtl';
    doc.documentElement.lang = 'ar';

    jest.useFakeTimers();
    await jest.runAllTimersAsync();

    expect(handleEvent.mock.lastCall[0].detail).toStrictEqual({
      dir: 'rtl',
      lang: 'ar',
      translated: false,
    });

    destroyEvent();
  });

  it('dispatches an `utrechtTranslate` event with translate=true when Google Translate was detected', async () => {
    const doc = document;

    const handleEvent = jest.fn();

    doc.documentElement.addEventListener('utrechtTranslate', handleEvent, true);

    const destroyEvent = initGoogleTranslateEvent(doc);

    doc.documentElement.lang = 'ar';
    doc.documentElement.className = 'translated-rtl';

    jest.useFakeTimers();
    await jest.runAllTimersAsync();

    expect(handleEvent.mock.lastCall[0].detail).toStrictEqual({
      dir: 'rtl',
      lang: 'ar',
      translated: true,
    });

    destroyEvent();
  });
});
