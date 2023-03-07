import { ReturnTypeUseScannerHooksProps } from '@/hooks/useScannerController';
import React, { createContext, PropsWithChildren, useContext } from 'react';

export const context = createContext({} as ReturnTypeUseScannerHooksProps);
//
function ScannerContext(props: { authData: ReturnTypeUseScannerHooksProps } & PropsWithChildren) {
  return <context.Provider value={props.authData}>{props.children}</context.Provider>;
}

/**
 * @returns get the context of ScannerContext that provides the current scanner state.
 */
export function useScannerContext() {
  return useContext(context);
}

export default ScannerContext;
