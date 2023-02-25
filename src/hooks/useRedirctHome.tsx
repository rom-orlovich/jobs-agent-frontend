import { delayFun } from '@/lib/utils';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import useOnce from './useOnce';

/**
 * If not jobs were found return to the home page (search page).
 * @param {AnyFun} cb A callback to call before the redirect.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useRedirectHome(cb: (...args: any[]) => boolean) {
  const router = useRouter();
  const { trigger } = useOnce();
  const cbMemo = useMemo(() => cb(), [cb]);
  useEffect(() => {
    if (cbMemo) trigger(() => delayFun(() => router.push('/', '/'), 1000));
  }, [cbMemo, router, trigger]);
}

export default useRedirectHome;
