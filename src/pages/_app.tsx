import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { Roboto } from '@next/font/google';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Layout from '@/components/Layout/Layout';
import { classNameGenerator } from '@/lib/utils';
import { ToastContainer } from 'react-toastify';
const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin']
});
type AppPropsWithSession = AppProps & { session: Session };
const contextClass = {
  success: 'bg-success-primary',
  error: 'bg-error-primary',
  info: 'bg-info',
  warning: 'bg-warning',
  default: 'bg-success-primary',
  dark: ''
};

export default function App({ Component, pageProps, session }: AppPropsWithSession) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then((res) => res.json())
        }}
      >
        <Layout>
          <main className={classNameGenerator(roboto.className)}>
            <Component {...pageProps} />
            <ToastContainer
              position="bottom-left"
              autoClose={2000}
              toastClassName={(props) =>
                contextClass[props?.type || 'default'] +
                ' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
              }
              bodyClassName={() => 'text-sm font-white font-med block p-3'}
            />
          </main>
        </Layout>
      </SWRConfig>
    </SessionProvider>
  );
}
