import { useFetchClient, useNotification } from '@strapi/helper-plugin';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RESOLVE_CONFIG } from '../constants';
import { pluginId } from '../utils';

const usePluginConfig = () => {
  const dispatch = useDispatch();
  const toggleNotification = useNotification();
  const { isLoading, config } = useSelector((state) => state[`${pluginId}_config`]);
  const client = useFetchClient();

  useEffect(() => {
    // Do nothing if we have already loaded the config data.
    if (!isLoading && !!config) {
      return;
    }

    const abortController = new AbortController();

    // eslint-disable-next-line consistent-return
    const fetchData = async () => {
      try {
        const endpoint = `/${pluginId}/config`;
        const data = await client.get(endpoint, {
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

          return err;
        }
      }
    };
    fetchData().then((data) => dispatch({ type: RESOLVE_CONFIG, data }));

    // eslint-disable-next-line consistent-return
    return () => abortController.abort();
  }, [client, config, dispatch, isLoading, toggleNotification]);

  return { config, isLoading };
};

export default usePluginConfig;
