import { useNotification } from '@strapi/helper-plugin';
import { useCallback, useState } from 'react';

const useFetchData = (client) => {
  const toggleNotification = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async ({ url, params, id }) => {
      if (!id) {
        return;
      }

      const abortController = new AbortController(); // Create a new AbortController for this request
      setIsLoading(true);
      setError(null);

      try {
        const data = await client.get(`${url}/${id}`, {
          signal: abortController.signal,
          params,
        });

        // eslint-disable-next-line consistent-return
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
          // eslint-disable-next-line consistent-return
          return err; // Return the error if needed
        }
      } finally {
        setIsLoading(false);
      }
    },
    [client, toggleNotification],
  );

  return { fetchData, isLoading, error };
};

export default useFetchData;
