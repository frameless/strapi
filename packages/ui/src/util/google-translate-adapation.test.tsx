import { initGoogleTranslateAdaptation } from './google-translate-adaptation';
import { initGoogleTranslateEvent } from './google-translate-event';
import '@testing-library/jest-dom';

describe('Google Translate adaptation', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('class');
    document.documentElement.removeAttribute('dir');
  });

  it('renders a dir="rtl" attribute when the `translated-rtl` class name is set', async () => {
    const doc = document;

    const destroyAdaptation = initGoogleTranslateAdaptation(doc);
    const destroyEvent = initGoogleTranslateEvent(doc);

    expect(doc.documentElement).not.toHaveAttribute('dir');

    doc.documentElement.classList.add('translated-rtl');

    jest.useFakeTimers();
    await jest.runAllTimersAsync();

    expect(doc.documentElement).toHaveAttribute('dir', 'rtl');

    destroyAdaptation();
    destroyEvent();
  });

  it('renders a dir="ltr" attribute when the `translated-ltr` class name is set', async () => {
    const doc = document;

    const destroyAdaptation = initGoogleTranslateAdaptation(doc);
    const destroyEvent = initGoogleTranslateEvent(doc);

    expect(doc.documentElement).not.toHaveAttribute('dir');

    doc.documentElement.classList.add('translated-ltr');

    jest.useFakeTimers();
    await jest.runAllTimersAsync();

    expect(doc.documentElement).toHaveAttribute('dir', 'ltr');

    destroyAdaptation();
    destroyEvent();
  });

  it('restores dir attribute when the `translated-rtl` is removed', async () => {
    const doc = document;

    const destroyAdaptation = initGoogleTranslateAdaptation(doc);
    const destroyEvent = initGoogleTranslateEvent(doc);

    expect(doc.documentElement).not.toHaveAttribute('dir');

    doc.documentElement.lang = 'ar';
    doc.documentElement.classList.add('translated-rtl');

    jest.useFakeTimers();
    await jest.runAllTimersAsync();

    expect(doc.documentElement).toHaveAttribute('dir', 'rtl');

    doc.documentElement.lang = 'nl';
    doc.documentElement.classList.remove('translated-rtl');

    jest.useFakeTimers();
    await jest.runAllTimersAsync();

    expect(doc.documentElement.dir).toBeFalsy();

    destroyAdaptation();
    destroyEvent();
  });
});
