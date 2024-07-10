import wcag111intro from './_wcag-1.1.1-intro.md';
import wcag131intro from './_wcag-1.3.1-intro.md';
import wcag135intro from './_wcag-1.3.5-intro.md';
import wcag211intro from './_wcag-2.1.1-intro.md';
import wcag241intro from './_wcag-2.4.1-intro.md';
import wcag2410intro from './_wcag-2.4.10-intro.md';
import wcag2413intro from './_wcag-2.4.13-intro.md';
import wcag242intro from './_wcag-2.4.2-intro.md';
import wcag244intro from './_wcag-2.4.4-intro.md';
import wcag246intro from './_wcag-2.4.6-intro.md';
import wcag247intro from './_wcag-2.4.7-intro.md';
import wcag311intro from './_wcag-3.1.1-intro.md';
import wcag312intro from './_wcag-3.1.2-intro.md';
import wcag322intro from './_wcag-3.2.2-intro.md';
import wcag331intro from './_wcag-3.3.1-intro.md';
import wcag333intro from './_wcag-3.3.3-intro.md';
import wcag334intro from './_wcag-3.3.4-intro.md';
import wcag411intro from './_wcag-4.1.1-intro.md';
import wcag412intro from './_wcag-4.1.2-intro.md';
import wcag413intro from './_wcag-4.1.3-intro.md';

export const wcagIntro: { [index: string]: string } = {
  '1.1.1': wcag111intro as any as string,
  '1.3.1': wcag131intro as any as string,
  '1.3.5': wcag135intro as any as string,
  '2.1.1': wcag211intro as any as string,
  '2.4.1': wcag241intro as any as string,
  '2.4.13': wcag2413intro as any as string,
  '2.4.2': wcag242intro as any as string,
  '2.4.4': wcag244intro as any as string,
  '2.4.6': wcag246intro as any as string,
  '2.4.7': wcag247intro as any as string,
  '2.4.10': wcag2410intro as any as string,
  '3.1.1': wcag311intro as any as string,
  '3.1.2': wcag312intro as any as string,
  '3.2.2': wcag322intro as any as string,
  '3.3.1': wcag331intro as any as string,
  '3.3.3': wcag333intro as any as string,
  '3.3.4': wcag334intro as any as string,
  '4.1.1': wcag411intro as any as string,
  '4.1.2': wcag412intro as any as string,
  '4.1.3': wcag413intro as any as string,
};
