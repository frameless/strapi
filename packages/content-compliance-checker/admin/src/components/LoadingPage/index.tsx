import { Box, Loader } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

export const LoadingPage = () => {
  const { formatMessage } = useIntl();

  return (
    <main aria-busy="true">
      <Box padding={8}>
        <Loader />
        <span className="utrecht-sr-only">
          {formatMessage({
            id: getTrad('loadingPage.loadingText'),
            defaultMessage: 'Bezig met laden, even geduld a.u.b.…',
          })}
        </span>
      </Box>
    </main>
  );
};
