/**
 *
 * Initializer
 *
 */

import { useEffect, useRef } from 'react';
import pluginId from '../../pluginId';

type InitializerProps = {
  // eslint-disable-next-line no-unused-vars
  setPlugin: (id: string) => void;
};

const Initializer = ({ setPlugin }: InitializerProps) => {
  const ref = useRef(setPlugin);

  useEffect(() => {
    ref.current(pluginId);
  }, []);

  return null;
};

export default Initializer;
