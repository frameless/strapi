import { useFetchClient, useNotification } from '@strapi/helper-plugin';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RESOLVE_CONFIG } from '../constants';
import { pluginId } from '../pluginId';

const usePluginConfig = () => {
  const dispatch = useDispatch();
  const toggleNotification = useNotification();

  const { isLoading, config } = useSelector((state: any) => state[`${pluginId}_config`]);
  const client = useFetchClient();
  const abortController = new AbortController();

  // eslint-disable-next-line consistent-return
  const fetchData = async () => {
    try {
      const endpoint = `/${pluginId}/config`;
      const { data } = await client.get(endpoint, {
        signal: abortController.signal,
      });
      dispatch({ type: RESOLVE_CONFIG, data: data ?? {} });
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

  useEffect(() => {
    // Do nothing if we have already loaded the config data.
    if (!isLoading && !!config) {
      return;
    }
    fetchData();
    // eslint-disable-next-line consistent-return
    return () => {
      if (!abortController.signal.aborted) {
        abortController.abort();
      }
    };
  }, [abortController]);

  return { config, isLoading };
};

export default usePluginConfig;
