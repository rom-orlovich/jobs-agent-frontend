/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericRecord } from '@/lib/types/types';

import { useEffect, useState } from 'react';
/**
 * Help to integrate the stage with session.
 */
function useStateSession<V extends GenericRecord<any>>({ id, values }: { id: string; values: V }) {
  const getSession = () => {
    const session = JSON.parse(window.sessionStorage.getItem(id) || JSON.stringify(values));
    return session;
  };

  const [state, setState] = useState<V>(getSession());

  useEffect(() => {
    return () => {
      let newState;
      if (state['page']) {
        const { page, ...rest } = state;
        newState = {
          ...rest
        };
      }
      window.sessionStorage.setItem(id, JSON.stringify(newState || state));
    };
  }, [state, id]);

  return [state, setState] as const;
}

export default useStateSession;
