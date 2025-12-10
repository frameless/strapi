import { useFetchClient, useNotification } from '@strapi/helper-plugin';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RESOLVE_CONFIG } from '../constants';
import { PLUGIN_ID } from '../pluginId';

interface PluginConfig {
  isLoading: boolean;
  config: Record<string, unknown> | null;
}

interface RootState {
  [key: string]: PluginConfig;
}

const usePluginConfig = () => {
  const dispatch = useDispatch();
  const toggleNotification = useNotification();
  const pluginState = useSelector((state: RootState) => state[`${PLUGIN_ID}_config`]);
  const { isLoading = true, config = null } = pluginState || {};
  const client = useFetchClient();

  useEffect(() => {
    if (!isLoading && config) {
      return;
    }

    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const { data } = await client.get(`/${PLUGIN_ID}/config`, {
          signal: abortController.signal,
        });

        return data ?? {};
      } catch (err) {
        if (!abortController.signal.aborted) {
          console.error('Failed to fetch plugin config:', err);
          toggleNotification({
            type: 'warning',
            message: { id: 'notification.error' },
          });
        }
        return {};
      }
    };

    const loadConfig = async () => {
      try {
        const data = await fetchData();
        dispatch({ type: RESOLVE_CONFIG, data });
      } catch (err) {
        console.error('Unhandled error in fetchData:', err);
      }
    };

    loadConfig();

    return () => abortController.abort();
  }, [client, config, dispatch, isLoading, toggleNotification]);

  return { config, isLoading };
};

export default usePluginConfig;
