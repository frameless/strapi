'use client';

import { Navigation as MainNavigation, NavigationListType } from '@frameless/ui';
import React, { FC, useEffect } from 'react';
import { useNavigation } from '@/context/NavigationContext';

export const Navigation = () => {
  const { navigation } = useNavigation();

  return (
    <>
      <MainNavigation
        list={navigation}
        mobileBreakpoint={998}
        toggleButton={{
          openText: 'Menu',
          closeText: 'Sluiten',
        }}
      />
    </>
  );
};

export const SubNavigationInjector: FC<{ title: string; subNavigation: NavigationListType[] }> = ({
  title,
  subNavigation,
}) => {
  const { setSubNavigation } = useNavigation();

  useEffect(() => {
    setSubNavigation(title, subNavigation);
  }, [subNavigation]);

  return <></>;
};
