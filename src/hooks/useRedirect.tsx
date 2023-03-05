/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyFun } from '@/lib/types/types';
// import { delayFun } from '@/lib/utils';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import useOnce from './useOnce';

/**
 * If not jobs were found return to the home page (search page).
 * @param {AnyFun} cb A callback to call before the redirect.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useRedirect<R>(cb: (...args: any[]) => { data: R; cb: AnyFun }, url = '/'): R | undefined {
  const router = useRouter();
  const { trigger } = useOnce();
  const cbMemo = useMemo(() => cb(), [cb]);
  useEffect(() => {
    if (!cbMemo.data) {
      router.push(url, url);
      // trigger(() => delayFun(() => router.push(url, url).then(() => cbMemo?.cb()), 0));
    }
    router.events.on('routeChangeComplete', () => {
      trigger(() => cbMemo?.cb());
    });
  }, [cbMemo, router, trigger, url]);
  return cbMemo.data;
}

export default useRedirect;
