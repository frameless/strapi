import { useNotification } from '@strapi/helper-plugin';
import { useCallback, useState } from 'react';

const useFetchData = (client) => {
  const toggleNotification = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (url) => {
      const abortController = new AbortController();
      setIsLoading(true);
      setError(null);

      try {
        const data = await client.get(url, {
          signal: abortController.signal,
        });

        return data ?? {};
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);

        if (!abortController.signal.aborted) {
          toggleNotification({
            type: 'warning',
            message: { id: 'notification.error' },
          });

          setError(err);
          return err;
        }
      } finally {
        setIsLoading(false);
      }
      return null;
    },
    [client, toggleNotification],
  );

  return { fetchData, isLoading, error };
};

export default useFetchData;
