import { Button } from '@strapi/design-system';
import type { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

interface GoBackButtonProps {
  children?: ReactNode;
}

export const GoBackButton = ({ children }: GoBackButtonProps) => {
  const history = useHistory();
  return (
    <Button onClick={() => history.goBack()} style={{ marginTop: '20px' }}>
      {children}
    </Button>
  );
};
