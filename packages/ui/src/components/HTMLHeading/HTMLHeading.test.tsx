import { render, screen } from '@testing-library/react';
import { HTMLHeading } from './index';
import '@testing-library/jest-dom';

describe('HTML Heading', () => {
  it('renders a heading role element when the heading level is set', () => {
    render(<HTMLHeading level={1}>Hello, world</HTMLHeading>);

    const heading = screen.getByRole('heading', { name: 'Hello, world' });

    expect(heading).toBeInTheDocument();
  });

  for (var headingLevel = 1; headingLevel <= 6; headingLevel++) {
    it(`it renders an <h${headingLevel}> element for headingLevel ${headingLevel}`, () => {
      const { container } = render(<HTMLHeading level={headingLevel} />);

      const heading = container.querySelector(`h${headingLevel}`);

      expect(heading).not.toBeInTheDocument();
    });
  }

  it('renders a <p> element when no heading level is set', () => {
    const { container } = render(<HTMLHeading>Hello, world</HTMLHeading>);

    const paragraph = container.querySelector('p');

    expect(paragraph).toBeInTheDocument();
  });

  it('renders a <p> element when an invalid heading level is set', () => {
    const { container } = render(<HTMLHeading level={7}>Hello, world</HTMLHeading>);

    const paragraph = container.querySelector('p');

    expect(paragraph).toBeInTheDocument();
  });
});
