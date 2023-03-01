/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericRecord } from '@/lib/types/types';
import { getObjExistKeysValues } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { SetState } from './hooks.types';

function useStateSession<V extends GenericRecord<any>>({
  id,
  setState,
  values
}: {
  id: string;
  values: V;
  setState: SetState<V>;
}) {
  const lock = useRef(false);
  const saveSessionValues = () => {
    const { count, existKeysValues } = getObjExistKeysValues(values);
    if (count) window.sessionStorage.setItem(id, JSON.stringify(existKeysValues));
    lock.current = true;
  };
  useEffect(() => {
    if (lock.current) {
      const sessionValuesStr = window.sessionStorage.getItem(id);
      if (sessionValuesStr) {
        const sessionValues = JSON.parse(sessionValuesStr || '');
        setState(sessionValues);
      }
    }
  }, [values]);

  return {
    saveSessionValues
  };
}

export default useStateSession;
