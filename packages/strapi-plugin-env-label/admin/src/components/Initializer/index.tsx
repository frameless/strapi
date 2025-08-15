import { useEffect, useRef } from 'react';
import { pluginId } from '../../pluginId';

type InitializerProps = {
  setPlugin: (id: string) => void;
};

export const Initializer = ({ setPlugin }: InitializerProps) => {
  const ref = useRef<any>(null);
  ref.current = setPlugin;
  useEffect(() => {
    if (ref && ref?.current) {
      ref?.current(pluginId);
    }
  }, [ref.current]);

  return null;
};
