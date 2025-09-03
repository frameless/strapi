import { Component, Element, Prop } from '@stencil/core';
import Ed11y from '../../../lib/editoria11y.esm.mjs';

@Component({
  tag: 'frameless-editoria11y',
  styleUrl: 'frameless-editoria11y.css',
  shadow: true,
})
export class Editoria11yWrapper {
  @Element() el: HTMLElement;
  @Prop() language: string = 'nl';
  @Prop() theme: string = 'darkTheme';
  @Prop() alertMode: string = 'userPreference';
  @Prop() checkRoots: string = 'main';
  @Prop() ignoreElements: string;
  @Prop() allowHide: boolean = true;
  @Prop() allowOK: boolean = true;
  @Prop() inlineAlerts: boolean = true;
  @Prop() watchForChanges: boolean = true;
  @Prop() nonce: string;

  private ed11yInstance: any;

  async componentDidLoad() {
    await this.loadEditoria11y();
  }

  disconnectedCallback() {
    this.ed11yInstance?.reset?.();
  }

  private async loadEditoria11y() {
    if (typeof window === 'undefined') return;

    // Use Ed11y directly from ESM import
    if (!this.ed11yInstance) {
      try {
        this.ed11yInstance = new Ed11y({
          lang: this.language,
          theme: this.theme,
          alertMode: this.alertMode,
          checkRoots: this.checkRoots,
          ignoreElements: this.ignoreElements,
          allowHide: this.allowHide,
          allowOK: this.allowOK,
          inlineAlerts: this.inlineAlerts,
          watchForChanges: this.watchForChanges,
          nonce: this.nonce,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to initialize Ed11y:', error);
      }
    }
  }

  render() {
    return null;
  }
}
