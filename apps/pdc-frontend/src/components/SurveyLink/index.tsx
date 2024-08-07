import type { ComponentProps, ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { AdvancedLink } from '@/components';
import { generateSurveyURL, getSurveyParams } from '@/util';

interface SurveyLinkProps extends ComponentProps<typeof AdvancedLink> {
  segment: string;
  t: (key: string) => string;
  env: any;
}

export const SurveyLink = forwardRef(
  ({ segment, t, env, ...restProps }: SurveyLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    const surveyHref = generateSurveyURL({ ...getSurveyParams(env), segment });
    return surveyHref ? (
      <AdvancedLink external icon="arrow" color="red" ref={ref} {...restProps} href={surveyHref}>
        {t('actions.reaction-link')}
      </AdvancedLink>
    ) : null;
  },
);

SurveyLink.displayName = 'SurveyLink';
