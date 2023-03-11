import { AnyFun } from '@/lib/types/types';
import { useCallback, useRef } from 'react';

/**
 * This hook is usefully for preventing a rerender of function in useEffect.
 * @returns A callback that will trigger once.
 */
function useOnce() {
  const flag = useRef(true);
  const saveLoadCB = useRef<AnyFun[]>([]);
  const load = (cb: AnyFun) => {
    saveLoadCB.current?.push(cb);
  };

  const lock = () => {
    flag.current = false;
  };
  const trigger = useCallback((cb: AnyFun) => {
    if (flag.current) {
      cb();
      lock();
    }
  }, []);

  return {
    trigger,
    lock,
    flag,
    load
  };
}

export default useOnce;
