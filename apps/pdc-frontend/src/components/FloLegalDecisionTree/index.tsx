import '@utrecht/flolegal-decision-tree-css/dist/index.css';
import '@utrecht/flo-legal-decision-tree-client/dist/assets/flo-client-styles.css';
import '@utrecht/component-library-css/dist/html.css';

import type { FloLegalDecisionTreeProps } from '@frameless/ui';
import { FloLegalDecisionTree as FloLegalDecisionTreeDefault } from '@frameless/ui';

export const FloLegalDecisionTree = ({ ...restProps }: FloLegalDecisionTreeProps) => {
  return <FloLegalDecisionTreeDefault {...restProps} />;
};
