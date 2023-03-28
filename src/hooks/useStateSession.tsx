/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericRecord } from '@/lib/types/types';

import { useEffect, useState } from 'react';
/**
 * Help to integrate the state with browser's session storage.
 */
function useStateSession<V extends GenericRecord<any>>({ id, values }: { id: string; values: V }) {
  //Get current session by id or use the provided values.
  const getSession = () => {
    const session = JSON.parse(window.sessionStorage.getItem(id) || JSON.stringify(values));
    return session;
  };

  const [state, setState] = useState<V>(getSession());

  //Each time the component unmount, save the values in the browser's session storage.
  useEffect(() => {
    return () => {
      window.sessionStorage.setItem(id, JSON.stringify(state));
    };
  }, [state, id]);

  return [state, setState] as const;
}

export default useStateSession;
