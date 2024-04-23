import { useEffect, useRef } from 'react';
import { pluginId } from '../../pluginId';

export const Initializer = ({ setPlugin }) => {
  const ref = useRef<any>(null);
  ref.current = setPlugin;
  useEffect(() => {
    if (ref && ref?.current) {
      ref?.current(pluginId);
    }
  }, [ref.current]);

  return null;
};
