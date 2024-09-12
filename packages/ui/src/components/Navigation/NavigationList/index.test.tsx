import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NavigationList } from './index';
import { NavigationListType } from '../index';

const listData: NavigationListType[] = [
  {
    href: '#',
    textContent: 'Home',
    children: [
      {
        href: '#',
        textContent: 'Sublink 1',
      },
      {
        href: '#',
        textContent: 'Sublink 2',
      },
    ],
  },
  {
    href: '#',
    textContent: 'About',
  },
];
describe('NavigationList', () => {
  it('renders NavigationList component', () => {
    const { container } = render(<NavigationList list={[]} />);
    const navigationList = container.querySelector(':only-child');
    expect(navigationList).toBeInTheDocument();
  });
  it('renders a design system BEM class name', () => {
    const { container } = render(<NavigationList list={[]} />);
    const navigationList = container.querySelector(':only-child');
    expect(navigationList).toHaveClass('utrecht-navigation__list');
  });
  it('renders NavigationList component with children', () => {
    const { container } = render(<NavigationList list={listData} />);
    const navigationList = container.querySelector(':only-child');
    const navListItem = container.querySelectorAll('li a');
    navListItem.forEach((item) => {
      expect(item).toBeInTheDocument();
      expect(item).toHaveAttribute('href');
      expect(item).toHaveTextContent(/Home|About/);
    });
    expect(navListItem.length).toBe(2);
    expect(navigationList).toBeInTheDocument();
  });
  describe('Mobile', () => {
    it('renders NavigationList component with children and mobile prop', () => {
      const { container } = render(<NavigationList list={listData} mobile />);
      const navigationList = container.querySelector(':only-child');
      const navListItem = container.querySelectorAll('li');
      navListItem.forEach((item) => {
        expect(item).toBeInTheDocument();
        expect(item).toHaveClass('utrecht-navigation__item--mobile');
      });
      expect(navigationList).toBeInTheDocument();
      expect(navigationList).toHaveClass('utrecht-navigation__list--mobile');
    });
    it('renders NavigationList component with children and filled marker prop by default', () => {
      const { container } = render(<NavigationList list={listData} mobile />);
      const navigationList = container.querySelector(':only-child');
      const navListItem = navigationList?.querySelectorAll('li a')[0];
      const marker = navListItem?.querySelector(':only-child');
      expect(marker).toBeInTheDocument();
      expect(marker).toHaveClass('utrecht-navigation__marker');
      expect(marker).toHaveClass('utrecht-navigation__marker--fill');
      expect(navListItem).toHaveClass('utrecht-navigation__link--mobile');
      expect(navListItem).toBeInTheDocument();
      expect(navigationList).toBeInTheDocument();
    });
    it('renders NavigationList component with children and outlined marker prop', () => {
      const { container } = render(<NavigationList list={listData} mobile />);
      const navigationList = container.querySelector(':only-child');
      const navListItem = navigationList?.querySelectorAll('li a')[1];
      const marker = navListItem?.querySelector(':only-child');
      expect(marker).toBeInTheDocument();
      expect(marker).toHaveClass('utrecht-navigation__marker');
      expect(marker).toHaveClass('utrecht-navigation__marker--outline');
      expect(navListItem).toHaveClass('utrecht-navigation__link--mobile');
      expect(navListItem).toBeInTheDocument();
      expect(navigationList).toBeInTheDocument();
    });
  });

  it('renders NavigationList component with children and sideNav prop', () => {
    const { container } = render(<NavigationList list={listData} sideNav />);
    const navigationList = container.querySelector(':only-child');
    expect(navigationList).toBeInTheDocument();
    expect(navigationList).toHaveClass('utrecht-navigation__list--side-nav');
  });
  it('renders NavigationList component with children and subList prop', () => {
    const { container } = render(<NavigationList list={listData} subList mobile />);
    const navigationList = container.querySelector(':only-child');
    const navListItem = navigationList?.querySelectorAll('li');
    navListItem?.forEach((item) => {
      const subList = item.querySelectorAll('li ul');
      subList?.forEach((subItem) => {
        expect(subItem).toBeInTheDocument();
        expect(subItem).toHaveClass('utrecht-navigation__list--sub-list');
      });
      expect(item).toBeInTheDocument();
      expect(item).toHaveClass('utrecht-navigation__item');
    });
    expect(navigationList).toBeInTheDocument();
    expect(navigationList).toHaveClass('utrecht-navigation__list--sub-list');
  });
  test('focuses on the first link when the list receives focus', () => {
    render(<NavigationList list={listData} />);
    const firstLink = screen.getByText('Home');
    const navList = firstLink.closest('ul');
    expect(navList).toHaveAttribute('tabIndex', '-1');

    fireEvent.focus(navList as HTMLUListElement);
    expect(firstLink).toHaveFocus();
  });
});
