import React, { PropsWithChildren } from 'react';
import Sidebar from './Sidebar/Sidebar';
const dashboardStyle = {
  mainContainer: 'min-h-[100vh]'
};

function Dashboard({ isAuthenticated, children }: { isAuthenticated: boolean } & PropsWithChildren) {
  if (!isAuthenticated) return <></>;
  return (
    <section className={dashboardStyle.mainContainer}>
      <Sidebar />
      <section className="w-full p-8"> {children} </section>
    </section>
  );
}

export default Dashboard;
