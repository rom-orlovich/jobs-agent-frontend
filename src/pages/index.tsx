import Head from 'next/head';

import styles from '@/styles/Home.module.css';

import UserQuery from '@/components/UserQuery/UserQuery';

import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';
import DynamicInput from '@/components/Inputs/DynamicInputs/DynamicInputs';
import Profile from '@/components/Profile/Profile';
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
          <DynamicInput
            firstElement={{
              title: 'sasdas',
              value: 'max'
            }}
            Render={({ onClick, setValue }) => (
              <>
                <button onClick={onClick}> Add </button>
                <Autocomplete
                  options={[
                    {
                      id: '1',
                      title: '22wdsad',
                      value: 'asdsdasd'
                    },
                    {
                      id: '2',
                      title: '22wdsasd',
                      value: 'assdas'
                    }
                  ]}
                  setValue={setValue}
                />
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
