'use client';

import { NavigationListType } from '@frameless/ui';
import { createContext, ReactNode, useContext, useState } from 'react';

type NavigationContextType = {
  navigation: NavigationListType[];
  setSubNavigation: (title: string, subNav: NavigationListType[]) => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

type NavigationProviderProps = {
  mainNavItems: NavigationListType[];
  children: ReactNode;
};

export function useNavigation() {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error('useNavigation must be used within the NavigationProvider');
  }

  return context;
}

export function NavigationProvider({ mainNavItems, children }: NavigationProviderProps) {
  const [navigation, setNavigation] = useState<NavigationListType[]>(mainNavItems);

  const setSubNavigation = (title: string, subNav: NavigationListType[]) => {
    const navigationList = [...mainNavItems];

    const navItem = navigationList.find((item) => item.title === title);
    if (navItem) {
      navItem.children = subNav;
    }

    setNavigation(navigationList);
  };

  return <NavigationContext.Provider value={{ navigation, setSubNavigation }}>{children}</NavigationContext.Provider>;
}
