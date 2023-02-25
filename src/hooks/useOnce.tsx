import { AnyFun } from '@/lib/types/types';
import { useCallback, useRef } from 'react';

/**
 * This hook is usefully for preventing a rerender of function in useEffect.
 * @returns A callback that will trigger once.
 */
function useOnce() {
  const flag = useRef(true);

  const unlock = () => {
    flag.current = true;
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
    unlock,
    lock,
    flag
  };
}

export default useOnce;
