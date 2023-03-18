import Spinner from '@/components/Spinner/Spinner';
import { useScannerContext } from '@/context/ScannerContext';
import React, { PropsWithChildren } from 'react';
import Sidebar from './Sidebar/Sidebar';
const dashboardStyle = {
  mainContainer: 'min-h-[100vh] overflow-x-hidden'
};
function Dashboard({ children }: PropsWithChildren) {
  const { scanner } = useScannerContext();
  return (
    <section className={dashboardStyle.mainContainer}>
      <Sidebar />
      <section className="w-full py-4 pl-4 pr-6">
        {children}
        <Spinner isLoading={scanner.isMutating} />
      </section>
    </section>
  );
}

export default Dashboard;
