import useScannerController, { ReturnTypeUseScannerHooksProps } from '@/hooks/useScannerController';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import { useAuthContext } from './AuthContext';

export const context = createContext({} as ReturnTypeUseScannerHooksProps);
//
function ScannerContext(props: PropsWithChildren) {
  const { user } = useAuthContext();
  const scannerController = useScannerController(user?.id || '');
  return <context.Provider value={scannerController}>{props.children}</context.Provider>;
}

/**
 * @returns get the context of ScannerContext that provides the current scanner state.
 */
export function useScannerContext() {
  return useContext(context);
}

export default ScannerContext;
