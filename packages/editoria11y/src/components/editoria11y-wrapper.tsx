import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'editoria11y-wrapper',
  styleUrl: 'editoria11y.min.css', // include CSS
  shadow: false, // allow global CSS (important for editoria11y UI)
})
export class Editoria11yWrapper {
  @Prop() lang: string = 'en';
  @Prop() theme: string = 'darkTheme';

  private instance: any;

  componentDidLoad() {
    if (typeof window !== 'undefined') {
      // Dynamically load script if not already present
      if (!(window as any).Ed11y) {
        const script = document.createElement('script');
        script.src = '/editoria11y/editoria11y.min.js'; // serve via /public/ in Next.js
        script.onload = () => this.init();
        document.body.appendChild(script);
      } else {
        this.init();
      }
    }
  }

  private init() {
    if (!this.instance && (window as any).Ed11y) {
      this.instance = new (window as any).Ed11y({
        lang: this.lang,
        theme: this.theme,
      });
    }
  }

  render() {
    return null; // nothing visible, Editoria11y adds its own UI
  }
}
