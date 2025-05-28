import { Button } from '@strapi/design-system';
import type { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
interface RedirectButtonProps {
  children?: ReactNode;
  redirectTo: string;
}

export const RedirectButton = ({ children, redirectTo }: RedirectButtonProps) => {
  const history = useHistory();
  return (
    <Button onClick={() => history.push(redirectTo)} style={{ marginTop: '20px' }}>
      {children}
    </Button>
  );
};
