/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericRecord } from '@/lib/types/types';
import { getObjExistKeysValues } from '@/lib/utils';
import { useEffect } from 'react';
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
  useEffect(() => {
    const sessionValuesStr = window.sessionStorage.getItem(id);
    if (sessionValuesStr) {
      const sessionValues = JSON.parse(sessionValuesStr || '');

      setState(sessionValues);
    }
    return () => {
      const { count, existKeysValues } = getObjExistKeysValues(values);
      console.log(existKeysValues);
      if (count) window.sessionStorage.setItem(id, JSON.stringify(existKeysValues));
    };
  }, []);
}

export default useStateSession;
