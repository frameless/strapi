import { useEffect, useRef } from 'react';
import { pluginId } from '../../pluginId';

interface InitializerProps {
  setPlugin: (pluginId: string) => void;
}

export const Initializer = ({ setPlugin }: InitializerProps) => {
  const ref = useRef(setPlugin);
  ref.current = setPlugin;

  useEffect(() => {
    ref.current(pluginId);
  }, []);

  return null;
};
