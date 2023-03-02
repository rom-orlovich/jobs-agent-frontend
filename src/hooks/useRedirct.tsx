import { delayFun } from '@/lib/utils';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import useOnce from './useOnce';

/**
 * If not jobs were found return to the home page (search page).
 * @param {AnyFun} cb A callback to call before the redirect.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useRedirect<R>(cb: (...args: any[]) => R | undefined, url = '/'): R | undefined {
  const router = useRouter();
  const { trigger } = useOnce();
  const cbMemo = useMemo(() => cb(), [cb]);
  useEffect(() => {
    if (!cbMemo) trigger(() => delayFun(() => router.push(url, url), 1000));
  }, [cbMemo, router, trigger, url]);

  return cbMemo;
}

export default useRedirect;
