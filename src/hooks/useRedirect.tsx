/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReturnCreateToastCBWithData } from '@/lib/utils';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useOnce from './useOnce';

/**
 * If the data is not found redirect to the provided url. Default : '/'.
 * @param {ReturnCreateToastCBWithData} ToastCBWithData object that contains a callback that trigger a toast execution and the data to be return.
 * @returns {R} The data itself.
 */
//
function useRedirect<D>({ data, cb }: ReturnCreateToastCBWithData<D>, url = '/'): D {
  const router = useRouter();
  const { trigger } = useOnce();
  const { trigger: triggerOnRouteChange } = useOnce();

  const handle = () => {
    triggerOnRouteChange(() => {
      !router.query.noMessage && cb();
    });
  };
  router.events.on('routeChangeComplete', handle);
  useEffect(() => {
    if (!data) trigger(() => router.push(url, url));
  }, [router, trigger, url, data]);
  return data as D;
}

export default useRedirect;
