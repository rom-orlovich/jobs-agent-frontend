import Head from 'next/head';

import styles from '@/styles/Home.module.css';
import UserForm from '@/components/UserForm/UserForm';
import { useState } from 'react';
import { API_ENDPOINTS } from '@/lib/endpoints';
export default function Home() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <UserForm />
        <button
          className="mr-2"
          onClick={async (e) => {
            e.preventDefault();
            setLoading(true);
            // Const res = await fetch('http://localhost:5000/api/hello');
            // // /api/jobs-agent/start/
            try {
              const res = await fetch(
                `http://localhost:5000/${API_ENDPOINTS.SCANNER_START}/1?activeQuery=true`
              );
              const data = await res.json();
              console.log(data);
              setLoading(false);
            } catch (error) {
              setLoading(false);
              console.log(error);
            }
          }}
        >
          Load
        </button>
        <button
          onClick={async (e) => {
            e.preventDefault();
            setLoading(true);
            // Const res = await fetch('http://localhost:5000/api/hello');
            // // /api/jobs-agent/start/
            try {
              const res = await fetch(
                `http://localhost:5000/${API_ENDPOINTS.SCANNER_DOWNLOAD}/1?activeQuery=false`
              );
              setLoading(false);
              res.blob().then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'jobs';
                a.click();
              });
            } catch (error) {
              setLoading(false);
              console.log(error);
            }
          }}
        >
          Download
        </button>
        {loading && <p>loading</p>}
      </main>
    </>
  );
}
