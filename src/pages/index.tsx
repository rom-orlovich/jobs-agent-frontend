import Head from 'next/head';

import styles from '@/styles/Home.module.css';

import UserQuery from '@/components/UserQuery/UserQuery';
import DynamicInput from '@/components/Inputs/DynamicInputs/DynamicInputs';
import Profile from '@/components/Profile/Profile';
import MinMaxSelect, { MinMaxSelectOption, MinMaxSelectProps } from '@/components/Profile/MinMaxSelect';
export default function Home() {
  const formStyle = {
    form: 'w-[20rem]'
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <form className={formStyle.form}>
          <Profile />
          <UserQuery />
          <DynamicInput<MinMaxSelectProps, MinMaxSelectOption>
            firstElement={{
              min: 0,
              max: 1,
              title: 'javascript'
            }}
            Render={({ setValue }) => (
              <>
                <MinMaxSelect options={['javascript', 'react', 'typescript']} setValue={setValue} />
              </>
            )}
          >
            {(values) => {
              return (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(values);
                  }}
                >
                  Submit
                </button>
              );
            }}
          </DynamicInput>
        </form>
      </main>
    </>
  );
}
