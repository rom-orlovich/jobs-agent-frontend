import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Layout from '@/components/Layout/Layout';
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
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </SessionProvider>
  );
}
