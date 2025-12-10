import { useNotification } from '@strapi/helper-plugin';
import { useCallback, useState } from 'react';

interface FetchClient {
  get: (url: string, config?: { signal?: AbortSignal }) => Promise<{ data: unknown }>;
}

interface UseFetchDataReturn {
  fetchData: (url: string) => Promise<unknown>;
  isLoading: boolean;
  error: Error | null;
}

const useFetchData = (client: FetchClient): UseFetchDataReturn => {
  const toggleNotification = useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(
    async (url: string) => {
      const abortController = new AbortController();
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await client.get(url, {
          signal: abortController.signal,
        });

        return data ?? {};
      } catch (err) {
        const error = err as Error;
        console.error(error);

        if (!abortController.signal.aborted) {
          toggleNotification({
            type: 'warning',
            message: { id: 'notification.error' },
          });

          setError(error);
        }
        return {};
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
