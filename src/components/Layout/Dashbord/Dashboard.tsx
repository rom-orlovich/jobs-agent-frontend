import React, { PropsWithChildren } from 'react';
const dashboardStyle = 'flex min-h-[85vh] flex-col justify-center';

function Dashboard({ isAuthenticated, children }: { isAuthenticated: boolean } & PropsWithChildren) {
  return <section className={dashboardStyle}>{isAuthenticated && children}</section>;
}

export default Dashboard;
