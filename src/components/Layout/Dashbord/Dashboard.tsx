import React, { PropsWithChildren } from 'react';
import Sidebar from './Sidebar/Sidebar';
const dashboardStyle = {
  mainContainer: 'flex min-h-[100vh] flex-col justify-center'
};

function Dashboard({ isAuthenticated, children }: { isAuthenticated: boolean } & PropsWithChildren) {
  if (!isAuthenticated) return <></>;
  return (
    <section className={dashboardStyle.mainContainer}>
      <Sidebar />
      <section> {children} </section>
    </section>
  );
}

export default Dashboard;
