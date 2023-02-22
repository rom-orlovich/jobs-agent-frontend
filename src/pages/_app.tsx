import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { Roboto } from '@next/font/google';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Layout from '@/components/Layout/Layout';
import { classNameGenerator } from '@/lib/utils';

import Toasts from '@/components/Toasts/Toasts';
const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin']
});
type AppPropsWithSession = AppProps & { session: Session };
export default function App({ Component, pageProps, session }: AppPropsWithSession) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then((res) => res.json())
        }}
      >
        <Layout>
          <main
            className={
              (classNameGenerator(roboto.className), 'flex min-h-[85vh] flex-col justify-center')
            }
          >
            <Component {...pageProps} />
            <Toasts />
          </main>
        </Layout>
      </SWRConfig>
    </SessionProvider>
  );
}
