import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface FloLegalDecisionTreeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  encodedData?: string;
  showOutcomes?: boolean;
  outcomesHeader?: string;
  outcomesHeaderLevel?: number;
}
export const FloLegalDecisionTree = ({
  encodedData,
  showOutcomes,
  outcomesHeader,
  outcomesHeaderLevel,
  children,
  ...restProps
}: FloLegalDecisionTreeProps) => {
  const floDecisionContent = `<flo-decision 
  data-check-data="${encodedData}"
    data-show-outcomes="${showOutcomes}"
    data-outcomes-header="${outcomesHeader}"
    data-outcomes-header-level="${outcomesHeaderLevel ?? 2}"
  ></flo-decision>`;
  return (
    <div {...restProps}>
      {children}
      {floDecisionContent && (
        <div
          className="utrecht-html utrecht-flolegal-decision-tree-container"
          dangerouslySetInnerHTML={{ __html: floDecisionContent }}
        />
      )}
    </div>
  );
};
