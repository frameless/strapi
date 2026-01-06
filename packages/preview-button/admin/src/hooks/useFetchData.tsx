import { useNotification } from '@strapi/helper-plugin';
import { useCallback, useState } from 'react';

interface FetchClient {
  get: (url: string, options?: { signal?: AbortSignal }) => Promise<{ data: unknown }>;
}

const useFetchData = (client: FetchClient) => {
  const toggleNotification = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(
    async (url: string) => {
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
        }
      } finally {
        setIsLoading(false);
      }
      return { data: {} };
    },
    [client, toggleNotification],
  );

  return { fetchData, isLoading, error };
};

export default useFetchData;
