import { AnyFun } from '@/lib/types/types';
import { delayFun } from '@/lib/utils';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import useOnce from './useOnce';

/**
 * If not jobs were found return to the home page (search page).
 * @param {AnyFun} cb A callback to call before the redirect.
 */
function useRedirectHome(cb: AnyFun) {
  const router = useRouter();
  const triggerOnce = useOnce();
  const cbMemo = useCallback(() => cb, [cb]);
  useEffect(() => {
    cbMemo();

    triggerOnce(() => delayFun(() => router.push('/', '/'), 1000));
  }, [cbMemo, router, triggerOnce]);
}

export default useRedirectHome;
