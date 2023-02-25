import { AnyFun } from '@/lib/types/types';
import { useRef } from 'react';

/**
 * This hook is usefully for preventing a rerender of function in useEffect.
 * @returns A callback that will trigger once.
 */
function useOnce() {
  const flag = useRef(true);

  return (cb: AnyFun) => {
    if (flag.current) {
      cb();
      flag.current = false;
    }
  };
}

export default useOnce;
