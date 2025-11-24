import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface FloLegalDecisionTreeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  encodedData?: string;
  showOutcomes?: boolean;
  outcomesHeader?: string;
  outcomesHeaderLevel?: number;
  unansweredAlertMessage?: string;
  useRestartButton?: boolean;
  previousButtonText?: string;
  scrollOffset?: number;
}
export const FloLegalDecisionTree = ({
  encodedData,
  showOutcomes,
  outcomesHeader,
  outcomesHeaderLevel,
  unansweredAlertMessage,
  useRestartButton,
  previousButtonText,
  scrollOffset,
  children,
  ...restProps
}: FloLegalDecisionTreeProps) => {
  const floDecisionContent = `<flo-decision 
  data-check-data="${encodedData}"
    data-show-outcomes="${showOutcomes}"
    data-outcomes-header="${outcomesHeader}"
    data-outcomes-header-level="${outcomesHeaderLevel ?? 2}"
    data-question-display-type="one-by-one-manually"
    data-unanswered-alert-message="${unansweredAlertMessage ?? 'Geef antwoord op deze vraag.'}"
    data-use-restart-button="${useRestartButton ?? true}"
    data-previous-button-text="${previousButtonText ?? 'Terug'}"
     data-scroll-offset="${scrollOffset ?? 60}"
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
